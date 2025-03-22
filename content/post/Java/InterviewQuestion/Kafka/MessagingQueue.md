+++
title = 'Messaging Queue1'
date = 2025-03-20T17:27:52+05:30

url="/post/Java/InterviewQuestion/Kafka1"
tags = ['interviewQuestion', 'java']
categories = ['Interview Question']
+++


Kafka topics are specific streams of data within the Kafka Cluster. Kafka cluster can have as many topics.  
In the new Kafka there is no need of zookeeper, and there can be millions of topic and partition. Kafka topic can have names like logs, purchases, tweets.
A kafka topic is like a table in the database.  
A topic is identified in the kafka cluster by its name.

Partitions and offset.

Topic is divided into partitions. Each partition can be located on different broker which will help to horizontally scale upward. Each topic can be made up of hundreds of partitions, more partitions you have more parallelism and high throughput can achieve.  
The message posted is going to be stored into each of the partitions, say partition 1 will store all the messages within user id, starting from 0 to increment by one.  
Similarly, when message stored to partition 2, then the message ID will go from 0 to implement by one similarly when the data is stored into partition 3 then the user id will go from zero to M. Each message gets an incremental id called an offset.  
Kafka topic is immutable, meaning when the data is written into the partition, it cannot be changed.  
Going to stay for a period of time, and default is one week. It can be changed off. set are specific to a partition. offset has different. opposite can be reused even if the previous muscle is getting deleted from the buffer topic, it will continue to increase by 1. the order of the messages are going to be guaranteed when only within the partition. So each partition can have offset ID from zero to N.



Kafka cluster is a collection of cuffs for brokers and cuff for brokers with the server where the kafka is running.
Costco producing, which produces the content and stored into the copper cluster.
Kappa consumer takes the data from the copper cluster.
Kapka connect it manages the source on the sink of the data, meaning declarative type of integration, where we just tell from where to get the data, meaning the source.
Tapestry helps us modify the data. Suppose we get the data from the cluster and modify the data and again store the data into the kafka cluster.

When installed kafka. then in the windows, there are couple of batch files. And there we can start the producer, consumer and zookeper.

First start the zookeeper people then start the Kafka Server. Zookeeper takes moniters the health of the Kafka Server.
The third command to create the topic, the 4th command to put the name of the topic and the 5th command to consume the topic.

Into the partition with gear without key. When it is sent with key, ordering will be obtained as they will be in the same partition. Without key, we cannot guarantee the ordering of messages as consumer pulls the message from all the partitions at the same time.

Feel the retirees sent as 123 4 then it will be sent to the partitions in the round robin fashion.
When the data is sent with a key value, then save it. Then say, for all the keys with. hello on. will be stored into one partition and on the key with world another partition.


Kafka managed by the Confluent company. Here we can select the particular service provider in AWS or GCP and then start up application.

What is Kafka?  
Kafka is a distributed event streaming platform designed for high throughput and fault tolerant.
Distributed and Scalable - Kafka handles massive data volumes by partitioning topics across brokers.  
Pull-based Consumption - Consumers pull messages at their own pace.  
Persistent Storage: Messages are persisted on disk for a configurable retention period.  
Consumer Groups: Kafka allows multiple consumers in a group to process messages in parallel.  
Decoupled Producers and Consumers: Producers and consumers operate independently.


### Core components of Kafka.
**Topic** - It is like a folder or stream of data, where producers write and consumers read. Each topic can have multiple partitions to distribute load. Topics are identified by a unique name across the Kafka cluster. Example: In a food ordering system, you might have topics like order-placed, payment-success, and delivery-updates.  
Retention Period: Determines how long messages are stored (log.retention.hours).  
Replication Factor: Ensures fault tolerance by replicating topic data across brokers.
```java
// Create a new topic using Kafka AdminClient (Java)
NewTopic newTopic = new NewTopic("order-placed", 3, (short) 2); // 3 partitions, 2 replicas
adminClient.createTopics(Collections.singletonList(newTopic));
```










Kafka internals like the log replication, leader election, durability, prtitions and consumers group and use cases.