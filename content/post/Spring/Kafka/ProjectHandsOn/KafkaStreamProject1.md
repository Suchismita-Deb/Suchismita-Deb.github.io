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
