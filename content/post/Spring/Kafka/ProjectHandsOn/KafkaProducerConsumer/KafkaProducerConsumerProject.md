+++
title = 'Kafka Producer Consumer Project.'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProducerConsumerProject"
tags = ['spring', 'kafka']
+++
Starting a producer.

> There will be a topic name.
> 
> There will be KafkaTemplate autowired. 
>
> ```java
> @Autowired
> private KafkaTemplate<String, Employee> template; 
> ```
> 
> The parameter are key and value. The Employee can be an avro object or an Generic object or String the value of the topic.
> 
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

Kafka provides KafkaTemplate to send messages.