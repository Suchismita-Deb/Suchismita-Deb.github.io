+++
title = 'Kafka Stream 101'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/confluentKafka/KafkaStream101"
tags = ['spring', 'kafka']
+++
Kafka Streams plays a role.
Filter message in the topic. Read one topic and enrich with data in another. Merge topics together into a third topic. 

Kafka Stream is a functional Java API for doing stream processing on the data stored in Kafka.  
### Basic Operation.
Apache Kafka is an event streaming platform, distributed and fault tolerant as it replicate data across the storage nodes called broker. 

The main part of broker is the log that holds the events and records and it is append only.

One Exmaple where we can sue KAfka Stream.  

Widget application and getting all the detail in JSON.
```json
{
"reading_ts": "2020-02-14T12:19:27Z",
"sensor_id": "aa-101",
"production_line": "w01",
"widget_type": "acme94",
"temp_celcius": 23,
"widget_weight_g": 100
}
```
Npw the requirement is to make the red color widget in a different topic. Say there is one producer and one consumer and the data of the red widget are storing in another topic. Using default Kafka work.
```java
public static void main(String[] args) {
  try (Consumer<String, Widget> consumer new KafkaConsumer <> (consumer Properties());
    Producer<String, Widget> producer new KafkaProducer<> (producer Properties())) {
      consumer.subscribe (Collections.singletonList("widgets"));
      while (true) {
        ConsumerRecords<String, Widget> records = consumer.poll(Duration.ofSeconds (5));
          for (ConsumerRecord<String, Wigdet> record records) {
            Widget widget = record.value();
            if (widget.getColour().equals("red") {
                Producer Record<String, Widget> producerRecord = new ProducerRecord<> (
"widgets-red", record.key(), widget);
                producer.send (producer Record, (metadata, exception)-> {......} ); // Widget Topic.

// There should be another block for error handling.
```
The code will be long to get the details and try catch and then see all the event to add to the topic only to filter one data.

Using the Kafka Stream the code will be easy.
```java
final StreamsBuilder builder = new StreamsBuilder();
// First thing is to use the StreamsBuilder object.
builder.stream ("widgets", Consumed.with(stringSerde, widgets Serde))
.filter((key, widget) -> widget.getColour.equals("red"))
.to ("widgets-red", Produced.with(string Serde, widgets Serde));
```
Create a stream from the Widget topic. 

Kafka Stream works on event stream. When there are same key it update the value and store the new one. It is not same in Kafka stream as there are event and one key has no relation with other event.

When defining a Kafka Stream application we are defining a Processor Topology. Kafka Streams Processor Topology are the DAG which has the processing node and the edges that ignifes the flow of the streams.
```java
StreamBuilder builder = new StreamBuilder();
KStream<String, String> firstStream =
builder.stream (inputTopic, Consumed.with (Serdes. String(), Serdes. String()));
```
First create an instanec of StreamBuilder class. Using it create a KStream building unit of kafka streams. The builder stream will take the input topic and the consumed figuration object. Taking the type of the key and value of the record.

Tranform the data - Mapping operation.  
Filtering in kafka Stream.


```java
public class BasicStreams (
  public static void main(String[] args) throws IOException {
    Properties streamsProps = new Properties();
    try (FileInputStream fis = new FileInputStream(name:"src/main/resources/streams.properties")) {
      streamsProps.load(fis);
}
    streamsProps.put(StreamsConfig.APPLICATION_ID_CONFIG, "basic-streams");
    StreamsBuilder builder = new StreamsBuilder();
    final String inputTopic = streamsProps.getProperty("basic.input.topic");
    final String outputTopic = streamsProps.getProperty("basic.output.topic");
    // Retrieve the name of the input and output topics from the properties. 
    final String orderNumberStart = "orderNumber-";
    KStream<String, String> firstStream = builder.stream(inputTopic, Consumed.with(Serdes.String(), Serdes.String()));
    firstStream.peek((key, value) -> System.out.println("key key + value + value)) // print the key and value as it in topology.
.filter((key, value) -> value.contains(orderNumberStart)) // filter to drop record where the value does not contain orderNumberString.
mapValues(value-> value.substring(value.indexOf("-")+1)) // mapValue operation to extract the number after the '-' character.
.filter((key,value) _> Long.parseLong(value)>1000) // filter to drop the record where the value is not more than 1000. In filter we put the record which we will pass.
.peek((key,value) -> System.out.println("key" + key + " value " + value))
.to(outputTopic, Produced.with(Serdes.String(), Serdes.String())); // the output topic to write the data.
KafkaStreams kafkaStreams = new KafkaStreams(builder.build(), streamsProps);
TopicLoader.runProducer(); // It create the required topic on the cluster and produces some sample records.
```

### **KTables.**
```java
StreamBuilder builder = new StreamBuilder();
KTable<String, String> firstKTable =
builder.table (inputTopic,
Materialized.with (Serdes. String(), Serdes. String()));
```
Unlike KStream, KTable can be only subscribed to a single topic a once time. Table represents the latest value of each record. IN stream when new data appear with the update then new event is added here in ktable it will update the value inplace.

KTable will update thevalue so it needs to store the value and backed by state store. State Store are the copy of the events that are in the topic that the table is built from.

KTable we more care about like what is the latest value of the record. Data store in cache and it flushed to the table and the new value updated. Default value to commit.interval is 30 sec. 

There are map, filter operator in KTable.

GlobalKTable - There is special kind of KTable.
```java
StremBuilder builder = new StreamBuilder();
GlobalKTable<String, String> globalKTable = builder.globalTable(inputTopic, Materialized.with(Serdes.String(), Serdes.String()));
```
KafkaStream dealswith one partition at a time. GlobalKTable hold all the record across all the partition. Useful when want the data across the topic. Good for the data that does not update frequently like zip code, country code.

Example.
```java
public class BasicStreams (
  public static void main(String[] args) throws IOException {
    Properties streamsProps = new Properties();
    try (FileInputStream fis = new FileInputStream(name:"src/main/resources/streams.properties")) {
      streamsProps.load(fis);
}
    streamsProps.put(StreamsConfig.APPLICATION_ID_CONFIG, "ktable-application");
    StreamsBuilder builder = new StreamsBuilder();
    final String inputTopic = streamsProps.getProperty("basic.input.topic");
    final String outputTopic = streamsProps.getProperty("basic.output.topic");
    // Retrieve the name of the input and output topics from the properties.
    final String orderNumberStart = "orderNumber-";
    KTable<String, String> firstKTable = builder.table(inputTopic, Materialized.<String, String, KeyValueStore<Bytes, byte[]>> as("ktable-store").withKeySerde(Serdes.String()).withValueSerde(Serdes.String()));

// Filter to remove content which does not have orderNumber value.
firstKTable.filter((key, value) -> value.contains(orderNumberStarts))
.mapValues(value -> value.substring(value.indexOf("-")+1))
.filter(key,value)-> Long.parseLong(value)>1000)
.toStream()
.peek((key,value)->System.out.println("Output record - key+" value "+value)).to(outputTopic, Produced.with(Serdes.String(), serdes.String()));
KafkaStreams kafkaStreams = new KafkaStreams(builder.build(), streamsProps);
TopicLoader.runProducer();
kafkaStreams.start();
}
}
```

### **Data Serialization.**
Kafka broker only understand the record as bytes.  
Any object will be send to the byte for. Butes to Object - Deserialize. Object to Bytes - Serialize.

In Kafka Streams we work with Serdes for reading input bytes into expected object types. 
```java
StreamsBuilder builder = new StreamsBuilder();
KStream<String, String> firstStream = builder.stream(inputTopic, Consumed.with(Serdes.String(), customObjectSerde));
```
Here the Serdes.String() will understand that there is the key value which is in String and the value is customObject there should be an implementation of Serde in customObject.

KStream for the sink node to produce in outputTopic we use the Produced.with and for the source we add Consumed.with and take the parameter key and value.
```java
KStream<String, CustomObject> modified Stream =
stream.filter( (key, value) -> value.startsWith("ID5"))
.mapValues (value -> new CustomObject (value));
modifiedStream.to ("output-topic", Produced.with (Serdes. String(), customObjectSerde);
```
StateStore we use the Materialized object to specify the Serde and useful when writing in to the local disk.
```java
Serde<T> serde = Serdes.serdeFrom(new CustomSerializer<T>, new CustomDeserializer<T>);
```
In Serde we need to pass the CustomeSerializer and CustomDeserializer andto make the custome serializer and deserializer We have to implement the serializer and deserializer.

Kafka provides many serde by default and no need to implement.
Pre-existing serdes - String, Integer, Double, Long, Float, Byte, ByteArray, ByteBuffer, UUID, Void.

Additional Sedes available for working with Avro, Protobuf, JsonSchema.  
_Avro_ - SpecificAvroSerde, GenericAvroSerde.  
_Protobuf_ - KafkaProtobufSerde.  
_JSONSchema_ - KafkaJsonSchemaSerde.
Schema Registry provide all the Serde in Kafka Stream.

### __JOINS__

Kafka Stream join requires the record in the join should have same key.  

**Stream-Stream joins.**    
Combine two event streams into a new event stream.  
Join of events based on a common key.  
Records arrive within a defined window of time.  
Possible to compute a new value type.  
Keys are available in read-only mode can be used in computing the new value.  

**Stream-Table joins.**   
KStream-KTable.  
KStream-GlobalKTable.  

**Table-Table joins.**  




