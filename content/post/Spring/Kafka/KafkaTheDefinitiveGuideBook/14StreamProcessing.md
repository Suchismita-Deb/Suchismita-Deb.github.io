+++
title = 'Kafka The Definitive Guide - 14 Stream Processing.'
date = 2025-07-27T20:14:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide14"
tags = ['spring', 'kafka', 'KafkaTheDefinitiveGuide']
+++

Kafka was initially seen as a message bus - deliver streams of message without any processing and transformation.  
Steam Processing systems - Apache Storm, Spark, Flink, Samza are build with Kafka. Starting from 0.10.0 Kafka data stream using stream processing library as part of its client libraries Kafka Stream. It allows to consume, process and produce events using Kafka without any external framework.

### **Stream Processing.**

Data Stream / Event Stream / Streaming Data - An abstraction representation an unbounded dataset. Unbounded means growing as more data are coming. Attributes od event stream model -  
Unbounded nature.  
Event streams are in order - It is one of the difference between an event stream and db table - record in db are not considered to be in unordered and order by is not part of relational model it is added to assist in reporting.  
Immutable data records.  
Event Streams are replayable.  
Request-Response.  
Batch Processing.  




