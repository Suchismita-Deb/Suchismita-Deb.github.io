+++
title = 'Kafka Avro Schema Project'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProject/KafkaAvroSchemaProject"
tags = ['spring', 'kafka']
+++
https://github.com/Suchismita-Deb/Kafka-Avro-Project/tree/main


In the project springKafkaAvroMain project first create the Schema and using the Maven plugin create the avro class. Then the producer and consumer and serializer and deserializer and the schema registery.  
The avro object need schema registery.

In the resource package create the avro folder and create one file employee.avsc  
One sample avro file.

```yml
{
  "namespace": "com.kafkaProject.dto", # Package to put the generated class.
  "type": "record", // type is avro record.
  "name": "Employee",
  "fields": [
    {
      "name": "id",
      "type": "string"
    },
    {
      "name": "firstName",
      "type": "string"
    },
    {
      "name": "middleName",
      "type": "string",
      "default": ""
    },
    {
      "name": "lastName",
      "type": "string"
    },
    {
      "name": "emailId",
      "type": "string",
      "default": ""
    }
  ]
}
```
The field will define all the value in the array. 

Now the avro schema is ready and need the object using the maven plugin.  
In the pom file the dependency needto be added - avro-serializer, kafka-schema-registery-client, avro.

Add the plugin and it will try to get maven repository any error then get confluent repository.

When run the project it will create the package of the dto and it will contain the avro object.

Creating the producer and consumer class.

In KafkaAvroProducer file.

```java
@Service
public class KafkaAvroProducer{
  @Autowired
  private KafkaTemplate<String, Employee> template;

  public void send(Employee employee){
    CompletableFuture<SendResult<String, Employee>> send = template.send("topic-A", employee);
    // Define the topic and auto create.
    // Put in a variable to log the output in console.
    future.whenComplete((result, ex) -> {
      if(ex==null)
        System.out.println("Message = " + employee + " Offset = " + result.getRecordMetadata().offset());
      else
        System.out.println(ex.getMessage());
  }

}
```
In a Kafkaconfig file create the bean of the topic.

```java
@Configuration
public class Kafkaconfig{
  // Create the bean of topic.
  @Bean
  public NewTopic createTopic(){
    return new NewTopic("topic-A",3,(short)1); 
  }
}

```

We can add the name in the application.yml file like `topic:name:"topic-A"`. In the code can autowire the value.
```java
@Value(${topic.name}")
private String topicName;
```
In the KafkaAvroConsumer file we have to read the topic.
```java
@Service
@Slf4j
public class KafkaAvroConsumer {

    @KafkaListener(topics = "${topic.name}")
    public void read(ConsumerRecord<String, Employee> consumerRecord) {
        // read method and parameter are the key and value.
        String key = consumerRecord.key();
        Employee employee = consumerRecord.value();
        log.info("Avro message received for key = " + key + " value = " + employee.toString());
    }
}
```
The controller code will be running on server:port:8181.
The serializer value and the deserializer value and the bootstrap server details should be all in a configuration. One way to do a configuration file and another way to define in the application.yml file.
```yml
spring:
  kafka:
    bootstrap-servers: "127.0.0.1:9092" # Producer and consumer has the same bootstrap server and it is placed in kafka.
    producer:
      keySerializer: "org.apache.kafka.common.serialization.StringSerializer"
      valueSerializer: "io.confluent.kafka.serializers.KafkaAvroSerializer" # Value serializer is the avro kafka serializer.
      properties:
        schema:
          registry:
            url: "http://127.0.0.1:8081"
    consumer:
      group-id: "groupid-new"
      keyDeserializer: "org.apache.kafka.common.serialization.StringDeserializer"
      valueDeserializer: "io.confluent.kafka.serializers.KafkaAvroDeserializer"
      autoOffsetReset: "earliest"
      properties:
        schema:
          registry:
            url: "http://127.0.0.1:8081"
        specific:
          avro:
            reader: "true" # To read the avro messages in the consumer.
```