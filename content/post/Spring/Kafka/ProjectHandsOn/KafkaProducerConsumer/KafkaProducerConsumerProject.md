+++
title = 'Kafka Producer Consumer Project.'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProject/KafkaProducerConsumerProject"
tags = ['spring', 'kafka']
+++
Starting a producer.

> There will be a topic name.   
> There will be KafkaTemplate autowired. 
>
> ```java
> @Autowired
> private KafkaTemplate<String, Employee> template; 
> ```
> 
> The parameter are key and value. The Employee can be an avro object or an Generic object or String the value of the topic.   
> There will be a send or produce method and the parameter will be the Topic data.
> 
> ```java
>    public void sendMessage(String topic, Object message) {
>        CompletableFuture<SendResult<String, Object>> send = kafkaTemplate.send(topic, message);
>        send.whenComplete((result,ex)->{
>            if(ex==null){
>                System.out.println("Sent message = [ " + message +
>                    " ] with offset = [ " + result.getRecordMetadata().offset() + " ]");
>            } else {
>                System.out.println("Unable to send message = [ " +
>                        message + " ] due to - " + ex.getMessage());
>            }
>        });
>    }
> ```
> Only in the send method the topic name is placed.



When there will be a Kafka  Producer then there should be a configuration map properties to inform how and where to send the data.

It will contain the connection of the connection settings like the bootstrap server and serialization and acks, batch.size, linger.ms, compression.type  
It can be in a configuration file and another way to define in the application.yml file. Not much of configuration then the yaml file of the producer and consumer config is good.

```java
public class SimpleKafkaProducer {

    public static void main(String[] args) {

        // 1. Configure the Producer
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092"); // Kafka broker
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        // Reliability configs (optional but recommended)
        props.put(ProducerConfig.ACKS_CONFIG, "all"); // strongest delivery guarantee
        props.put(ProducerConfig.RETRIES_CONFIG, 3); // retry if message send fails
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true"); // ensure no duplicates
        // 2. Create the Producer
        Producer<String, String> producer = new KafkaProducer<>(props);

        // 3. Send a few sample messages
        String topic = "my-topic"; // make sure this topic exists
    }
}
```
In the application configuration file the producer and consumer details should be added as an alternate.
```yml
spring:
  kafka:
    bootstrap-servers: "127.0.0.1:9092" 
    producer:
      keySerializer: "org.apache.kafka.common.serialization.StringSerializer"
      valueSerializer: "io.confluent.kafka.serializers.KafkaAvroSerializer" # Value serializer is the avro kafka serializer.
    consumer:
      group-id: "groupid-new"
      keyDeserializer: "org.apache.kafka.common.serialization.StringDeserializer"
      valueDeserializer: "io.confluent.kafka.serializers.KafkaAvroDeserializer"
      autoOffsetReset: "earliest"
```
Kafka provides KafkaTemplate to send messages.

### __Sending the key and value pair.__
Project and producer will have the key and value and there will be some hash function to put the elements to the same key or the key can be string.

Creating the topic with 2 partition.
```bash
 C:\kafka_2.12-3.9.1> bin\windows\kafka-topics.bat --create 
 --topic demo_topic_1 
 --bootstrap-server localhost:9092 
 --partitions 2 
 --replication-factor 1
```

To enable sending full key-value pair from the command line we need to use 2 properties -   
`parse.key` - default false, true then message is mandatory.  
`key.separator` - the separator of the key and value.


When producing the data in the command line we have to mention the properties. With key and value the producer command in the command line.

```bash
C:\kafka_2.12-3.9.1>bin\windows\kafka-console-producer.bat 
--topic demo_topic_1 
--bootstrap-server localhost:9092
--property "parse.key=true"
--property "key.separator=:"

> 1001:"Mobile,100",
> 1002:"Mouse,50",
> 1003:"Computer,1500"
```

In Kafka logs we can see the topic name and the partitions. In the log we can see the key with 1001 is in partition 1 and key 1002 and 1003 are in partition 1.

### __Producer Acknowledgement.__


The `acks` parameter controls how many partition replicas must receive the record before the producer can consider the write successful. 

`acks=0` - the producer will not wait for a reply from the broker before assuming the message was sent successfully. Broker goes offline, exception happens broker did not receive the message - the producer will not know about it and the message will be lost.

`acks=1` - the producer will receive success response from the broker the moment the leader received the message. Leader crashed, new leader not elected - get the error message and producer will retry sending the message - avoiding loss of data.

`acks=all` - Producer will receive success response from the broker only when all the n-sync replicas receive the message.