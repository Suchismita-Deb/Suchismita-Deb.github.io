+++
title = 'Kafka Project Kafka Stream'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProjectKafkaStream"
tags = ['spring', 'kafka']
+++
Dependency - Kafka, Kafka Streams.

Application name - spring-kafka-stream-tutorial
In the main application file first enable kafka and stream. Adding annottaion @EnableKafka and @EnableKafkaStreams.  
__Adding the properties file.__

Adding the application.properties file like the producer and consumer.
```yml
spring:
  kafka:
    streams:
      bootstrap-servers: "172.21.206.230:9092"
      application-id: spring-kafka-stream-id // Same as the project name. These are the mandatory poperties.
```
__Create the StreamsConfigBean.__
Now we have to create the Streams Config Bean.
Inside the config package there will be Config.java and create the bean.
```java
@Configuration
public class Config{
  @Bean
  public StreamsConfig streamsonfig(KafkaProperties properties){
    return new StreamsConfig(properties.buildStreamsProperties()); // The streamsConfig need the properties related to the Kafka Streams.
  }
}
```
The details we added in the application.properties like the spring.kafka.bootstrap-server and aplication-id are all part of teh KafkaProperties class and all teh value are mapped to the value in the class. 

We can autowire the KafkaProperties class in the config class.
__Create the Stream Processor Topology.__
In the package Processor create a new class `EventStreamProcessor`
```java
@Component
public class EventStreamProcessor{

  @Autowired
  private StreamBuilder streamBuilder;

  public void streamTopology(){
    // To build the topology we need the abstraction called StreamBuilder. StreamBuilder object by default created when there is stream property in the application.yml file.

    KStream<String, String> kStream = streamBuikder.stream("spring.boot.kafka.stream.input.topic", Consumed.with(Serdes.String(), Serdes.String())); // Input topic then the key and the value serializer.

    // When the KStream is created the data will be coming from the topic.

    kStream.filter((key,value)->value.startsWith("Hello"))
           .mapValue((key, value)->value.toUpperCase())
           .peek((key, value) -> System.out.println("key" + key+" Value = "+value))
           .to("spring.boot.kafka.stream.output.topic", Produced.with(Serdes.String(), Serdes.String()));

    // Message starts with Hello will only be kept and other will be discarded and on the selected object will be mapped and transformed to uppercase.
    // peek will log the message and carry the other operation.
    // to operator will put the data in the output topic.
  }
}
```

StreamTopology is a real time method and it should start as soon as the application starts adding the annotations @Bean or @PostConstruct.

Start the application then it will start the consumer.  
Kafka stream is build on top of consumer and it will act consumer.

Adding some value to the input topic of any text and few message starting with Hello and there will be output in console.
# Joins in Kafka Stream - Project.

There are account 1 topic and account 2 topic. Inner join to find user with account 1 and account 2. New stream will publish to other topic.  

Application Name - spring.kafka.stream.join
application.yml.
```yml
spring.kafka.bootstrap-servers=pkc-xrnewx.asia-south2.gcp.confluent.cloud:9892
spring.kafka.properties.schema.registry.url=https://psrc-x77pq.us-centrall.gcp.confluent.cloud
spring.kafka.properties.basic.auth.credentials.source=USER_INFO
I
spring.kafka.properties.basic.auth.user.info = E0V74F5KH45J21Y5:qinJ+znfpQA9mjl1lBxPXJ0U9qeMonGMw9NOWAMq3ALYhY8w4k2uhcZvRrnIgXg
spring.kafka.properties.sasl.jaas.config=org.apache.kafka.common.security.plain. PlainloginModule required username="JUK37QLRBVAMXXEB
spring.kafka.properties.sasl.mechanism=PLAIN
spring.kafka.properties.security.protocol=SASL_SSL
spring.kafka.properties.ssl.endpoint.identification.algorithm=https
spring.kafka.streams.autoüffsetReset=earliest
spring.kafka.streams.application-id=spring-kafka-stream-join-ops
spring.kafka.streams.auto-startup=false
spring.kafka.producer.keySerializer=org.apache.kafka.common.serialization.LongSerializer
spring.kafka.producer.valueSerializer=io.confluent.kafka.serializers.KafkaAvroSerializer
spring.kafka.abc.bank.topic=dev.v1.abc.bank.customer.accounts
spring.kafka.xyz.bank.topic=dev.v1.xyz.bank.customer.accounts
server.port=9195
```
The bootstrap-server and the schema registery are connected in confleunt by the api key and secret.

abc and xyz are the topic to publish the data.

There are package like Producer, Joiner(AccountValueJoiner), Processor(customerAccountStreamProcessor), Avro, Util.

In the CustomerAccountStreamProcessor file.
```java
@Service
public class CustomerAccountStreamProcessor {
  @Value("${spring.kafka.abc.bank.topic)")
  private String abcBankAccount Topic:
  @Value("${spring.kafka.xyz.bank.topic}")
  private String xyzBankAccount Topic:
  @Autowired
  private StreamsBuilder streamBuilder;
  @Autowired
  private KafkaProperties kafkaProperties;
  @PostConstruct
  public void joinCustomerAccounts() {
    // KStream for two topics.
    KStream<Long, AccountDetail> xyzKStream = StreamBuilder.stream(xyzBankAccountTopic,Consumed.with(Serdes.Long(),this.getSpecificAvroSerde(new SpecificAvroSerde<>())));
    // Key and value of the topic is long and avro schema.
    // To register the avro we need to call the method getSpecificAvroSerde and passing parameter to register new schema.

    KStream<Long, AccountDetail> abcKStream = StreamBuilder.stream(abcBankAccountTopic,Consumed.with(Serdes.Long(),this.getSpecificAvroSerde(new SpecificAvroSerde<>())));

    // Stream-Stream join and xyz in the left.
    KStream<Long,MergedAccountDetil> joinedStream = xyzKStream.join(abcKStream, new AccountValueJoiner(),JoinWindows.of(Duration.ofSeconds(10)), StreamJoined.with(Serdes.Long(), this.getSpecificAvroSerde(new SpecificAvroSerde<>()), this.getSpecificAvroSerde(new SpecificAvroSerde<>())));

    // SteamJoined(key, value of the topic, value of the mergedTopic).
    joinedStream.peek((key, mergedAccountDetail) -> System.out.println("Key = " + key + " Value = " + mergedAccountDetail.toString()));

    // Start the stream we need to create the topology of the stream.
    Topology topology=streamBuilder.build();

    KafkaStreams streams = new KafkaStreams(topology,new StreamConfig(kafkaProperties.buildStreamsProperties())); // parameter topology and streamsconfig.
    streams.start();
    // In application spring.kafka.streams.auto-startup=false when true then stream will start when the application will start.
    // When want to start manually then there should be start().
  }

  <T extends SpecificRecord> SpecificAvroSerde<T> getSpecificAvroSerde (SpecificAvroSerde<T> serde) {

  //It is used to register all the avro schema with the schema registery.
  HashMap<String, String> map = new HashMap<>();
  map.put(AbstractKafkaAvroSerDeConfig.SCHEMA REGISTRY URL_CONFIG, kafkaProperties.getProperties().get("schema.registry.url"));
  map.put(AbstractKafkaAvroSerDeConfig.BASIC_AUTH CREDENTIALS_SOURCE, "USER_INFO");
  map.put(AbstractKafkaAvroSerDeConfig.USER_INFO_CONFIG, kafkaProperties.getProperties().get("basic.auth.user.info"));
  serde.configure(map, false);
  return serde;
  }
}
```

In the AccountValueJoiner file.
```java
public class AccountValueJoiner implements ValueJoiner<AccountDetail, AccountDetail, MergedAccountDetail>{

  @Override
  public MergedAccountDetail apply(AccountDetail accountDetail, AccountDetail accountDetail2){
    return MergedAccountDetail.newBuilder().serAccountHolderNAme(abcAccount.getAccountHolderName()).build();
  }
}
```

Left data added to the topic and it will wait for 10 sec to get the data in the right side topic.

There is one Producer class and it will generate the data with the same key and different key.
```java
class EventProducer{
  @Autowired
  private KafkaTemplate<Long, AccountDetail> abcBankKafkaTemplate;

  @Autowired
  private KafkaTemplate<Long, AccountDetail> xyzBankKafkaTemplate;

  private Random random = new Random();

  @GetMapping(value="/generateAccounts")
  public void publish() throws InterruptedException {
    for (int i = 0; i < 100; i++) {
      Long key random.longs(randomNumberOng 9999, randomNumberlound: 99999999).findAny().getAsLong();
      if (1% 2 == 0) {
        xyzBankKafkaTemplate.send(xyzBankAccountTopic, key, BankUtils.generateXyzBankAccount(key, 1));
        Thread.sleep(milli 9000);
        abcBankKafkaTemplate.send(abcBankAccountTopic, key, BankUtils.generateAbcBankAccount(key, 1));
      } else {
        key random.longs(randomNumberOrigis 9999, randomumbound 99999999).findAny().getAsLong();
        xyzBankKafkaTemplate.send(xyzBankAccountTopic, key, BankUtils.generateXyzBankAccount (key, 1));
        key random.longs(randomNumberOriginx 9999, randomNumberBound 99999999).findAny().getAsLong();
        abcBankKafkaTemplate.send(abcBankAccountTopic, key, BankUtils.generateAbcBankAccount(key, 1));
      }
    }
  }
}
```
  

https://youtu.be/Sej3L8fPxA4?si=k4dkzBDJsuCtGT_i
