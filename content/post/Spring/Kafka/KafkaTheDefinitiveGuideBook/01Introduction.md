+++
title = 'Kafka The Definitive Guide - 01 Introduction.'
date = 2025-07-27T20:01:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide01"
tags = ['spring', 'kafka', 'KafkaTheDefinitiveGuide']
+++

### **Kafka - Introduction.**
Fast data movemenet makes the application more responsive.  
Pub/Sub system have a broker a central point it publishes the message.
Direct communication will make it more difficult to maintain. 

{{<figure src="/images/Spring/Kafka/KafkaTheDefinitiveGuide/01KafkaIntroduction/CentralSystem.png" alt="CentralSystem." caption="">}}

There should be a single application that act as a broker.
Multiple user is working in multiple part like logs, tracking user activity and individual pub sub for the message is still good but there will be more bugs. 


A centralized single system is imporatant - Introduced Kafka.

Kafka was designed as a publish/subscribe messaging system also called _distributed commit log_ or _distributed streaming platform_.   
The unit of data within Kafka is called message. A message is simple an array of byte it can contain key. Key is used to store the data in the partition. It generate a consistent hasg of the key and thenn select the partition number by doing hash modulo of the total number of partitions in the topic. It ensures message same key will be in same partition when partition count does not change.  
Messages are written into Kafka in batches. A batch is a collection of message all produce to the same topic and partition. There is a trade-off between trouhput and latency the larger the batch more message process but the longer it takes an individual message to propagate. High latency and high throughput. Batches are compressed to improve transfer and storage cost.

Responsive target is low latency and high throughput.


