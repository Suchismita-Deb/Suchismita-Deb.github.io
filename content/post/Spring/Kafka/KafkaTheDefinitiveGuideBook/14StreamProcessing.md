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
Immutable data records - Event once occurred can never be modified. The difference between db and data stream - delete or update record the data in the table and all are additional data. _binlog_, _WALs_, or _redo logs_ when insert data and delete it, the table will not include the record but the redo log will contain 2 record - insert and delete.  
Event Streams are replayable - non replayable stream TCP(packets streaming through socket are non replayable). Business requirement to replay the stream occurred months or year back.  

The data in the event stream or data stream can be small or large XML file with multiple headers, unstructured key-value or semistructures JSON or structured Avro or ProtoBuf.  

**Stream Processing refers to the ongoing processing of one or more event stream.**

Request-Response.  
Low Latency.  
Response time ranging from submilliseconds to few milliseconds. App send the request and wait for the response.  
In db it is refered as OLTP. 

Batch Processing.   
High latency or high throughput.  
Procesing time is like every day fixed time, once in an hour.  

Stream Processing.  
Continuous and non blocking option.  
Network activity, tracking delivery of the package all are the example of continuous and non blocking processing.

Stream Processing is very similar to data processing - receive the data, do some modifycation(transformation, aggregates, enrichments) and place the result. There are some key concept that are different in stream processing and data processing. 


