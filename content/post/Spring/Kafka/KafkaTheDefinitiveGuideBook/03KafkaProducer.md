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

Kafka producer has three mandatory properties - Bootstrap server Boat bears producer reviews to establish initial connexion to the Kafka cluster it  is recommended to include at least two broker so that producer can be able to connect to the cluster
