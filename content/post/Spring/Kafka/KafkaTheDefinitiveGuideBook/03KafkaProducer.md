+++
title = 'Kafka The Definitive Guide - 03 Kafka Producer.'
date = 2025-07-27T20:03:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide03"
tags = ['spring', 'kafka', 'KafkaTheDefinitiveGuide']
+++
Kafka us used a queue, message bus or data storage platform. It has some build in APIs that developer can use to develop application.

Create _KafkaProducer_ and _ProducerRecord_, how to send record and handle error, use diff partitioning methods and serializers and own serializers and partitioners.

> Kafka has a buildin client and binary wired protocol. Application can directly read and write to Kafka by sending the correct byte sequence to Kafka's network port. Used in Java, C++, Python.


A wide variety of data send to Kafka - every message critical? can there be any loss tolerated? can the data duplicate allowed? Credit card transaction latency can be low 500 ms can be tolerated but througput very high - millions of message per second. Online shopping data latency high as long as not impacted to the user.  

Produce the message by creating _ProducerRecord_ - It can include topic name, value, key, partition, timestamp, collection of headers. It first serialised the key and value object to byte array. If explicitly partition is not mentioned then data is sent to partitioner based on the producerrecord key. Data is added to the record of the partition of the topic. A separate thread is responsible for sending those batch of records to the Kafka broker broker than receipt sent back a response if successfully written it will return a record metadata object with the topic partition on the offset of the record within the partition. He failed it will return an error to the producer and it will retry few more times before returning an error.

{{<figure src="/images/Spring/Kafka/KafkaTheDefinitiveGuide/03KafkaProducer/KafkaProducerComponent.png" alt="UserRequest." caption="">}}

Writing message to Kafka - Create a poducer object. Kafka producer has three mandatory properties.  
bootstrap.servers - List of host:port pairs - producer use to establish connection to the Cluster. No need to include all brokers, producer will get all detail after the first connection. Include 2 broker in case one goes down.

key.serializer - Name of the class used to serialize the key of the record - Kafka expect byte array as key and values - Java object can be used and the producer should know how to convert the object to byte arrays - `key.serializer = org.apache.kafka.common.serialization.Serializer`
Kafka client package includes ByteArraySerializer, StringSerializer, Integer Serializer - common are available no need to implment own serializer.  
Setting key.serialzer is required even if only sending values void type for the key and the voidSerializer.

value.serializer - Name of the class used to serialzier he value of the record.

Code to create a producer with the mandatory parameter.
```java
Properties kafkaProps = new Properties();
// Properties object and set the key and value.
kafkaProps.put("key.serializer","org.apache.kafka.common.serialization.StringSerializer");
kafkaProps.put("value.serializer","org.apache.kafka.common.serialization.StringSerializer");
producer = new KafkaProducer<String, String>(kafkaProps);
```

The producer is started and it can send the message. There are 3 primary methods of sending messages.

**Fire-and-forget** - Send the message to the server - in case of non retriable errors or timeout message will get lost and the application will not get any information or exception.

**Synchronous send** - Kafka message is asynchronous - send() return a Future object - use get() to wai on the Future and see if the send() is successful or not before sending new record.

**Asynchronous send** - We call send() with a callback function, which get triggered when it receives a response from the Kafka broker.

The example is using single thread, a producer object can be used by multiple threads to send messages.

```java
ProducerRecord<String, String> record = new ProducerRecord<>("CustomerCountry", "Precision Products","France");
try {
  producer.send(record);
} catch (Exception e) {
  e.printStackTrace();
}
```
The producer accept ProducerRecord objects with the name of the topic, key and value.  
The type of key and value must match with the key and value serializer.

The send() method to send the ProducerRecord - the message will first placed in a buffer and will be sent to the broker in a separate thread - The method return a Java Future object with RecordMetadata - since we ignored the return value then there is no way to know message send successfully or not.

Ignore error tht occur when sending the message to the Kafka broker it will still get an exception if the producer encountered errors before sending message - SerializationException, BufferExhaustedException or TimeoutException when buffer is full or InterruptException when sending thread was interrupted.

__Sending Message Synchronously.__
It allow producer to catch exception when kafka responds to the produce request with an error or when send retries were exhausted - Tradeoff is performance - Depending on how busy Kafka cluster broker can take around 2ms to few sec to respond. The sending thread will wait leading to poor performance.
```java
ProducerRecord<String, String> record = new ProducerRecord<>("CustomerCountry", "Precision Products", "France");
try {
  producer.send(record).get();
} catch (Exception e) {
  e.printStackTrace();
}
```
Future.get() - wait for a reply - it will throw an exception if the record is not sent - no error it will get a RecordMetadata object that can be used to retrieve the offset the message was written to and other metadata.

Any errors before or while sending the record to KAfka - we will get an exception.

KafkaProducer has 2 types of error.  
Retriable errors - try again after the connection reestablished. "Not leader for partition" error can be resolved when a new leader is electedfor the partition and the client metadata is refreshed - Kafka will retry automatically - application code will get the retriable exception only when the number of retries was exhaused and the error was not resolved.
Non-retriable error - "Message size too large" - KafkaProducer will not attempt to retry and return an exception.

__Sending message asynchronously.__
Network round trip between application and kafka cluster is 10 ms. Sending 100 message and waiting for reply will take 1 sec and not waiting will not ake any time. 

Kafka send back the topic, partition and offset of the record after it was written - not required for the sending app. 
We need to throw exception, log an error and write in error file when message not send completely.

The producer supports callback when sending a record.
```java
private class DemoProducerCallback implements Callback {
@Override
  public void onCompletion(RecordMetadata recordMetadata, Exception e) {
    if (e != null) {
      e.printStackTrace();
    }
  }
}
ProducerRecord<String, String> record = new ProducerRecord<>("CustomerCountry", "Biomedical Materials", "USA");
producer.send(record, new DemoProducerCallback());
```
__Configuring Producer.__  

Parameters in the producer are - bootstrap.servers, serializers, client.id.

_client.id_
Identifies by broker to see the message send by the client.

_acks_ 
How many prt


133 page.


