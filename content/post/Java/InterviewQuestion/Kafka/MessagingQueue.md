+++
title = 'Messaging Queue1'
date = 2025-03-20T17:27:52+05:30

url="/post/Java/InterviewQuestion/Kafka1"
tags = ['interviewQuestion', 'java']
categories = ['Interview Question']
+++


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


## Core components of Kafka.
**Topic** - Kafka topics are specific streams of data within the Kafka Cluster. Kafka cluster can have as many topics. It is like a folder or stream of data, where producers write and consumers read. Each topic can have multiple partitions to distribute load. Topics are identified by a unique name across the Kafka cluster.  
Example - In a food ordering system, you might have topics like order-placed, payment-success, and delivery-updates.
A topic is identified in the kafka cluster by its name.  
**Retention Period** - Determines how long messages are stored _log.retention.hours_.  
**Replication Factor** - Ensures fault tolerance by replicating topic data across brokers.
```java
// Create a new topic using Kafka AdminClient (Java)
NewTopic newTopic = new NewTopic("order-placed", 3, (short) 2); // 3 partitions, 2 replicas
adminClient.createTopics(Collections.singletonList(newTopic));
```
```java
// Kafka Config (Application Configuration)
spring:kafka:bootstrap-servers: localhost:9092
spring:kafka:topic:orderPlaced: "order-placed"
```
Kafka topic name is given based on the business logic.  
The name structure is like the domain.serviceName.eventType like ecommerce.order.created.

**Partition** - Topic can have multiple partitions. Messages in each partition are ordered, but Kafka does not guarantee ordering across partitions.  
Each message is assigned to a partition (based on a key or round-robin if no key).  
Partitions allow Kafka to scale horizontally. Each partition can be consumed independently.
Keyed Messages ensure that messages with the same key always go to the same partition.
```java
// Send message with key to ensure ordering in one partition
kafkaTemplate.send("order-placed", "order123", "New Order Received");
```
**Producers** - Producers are clients that send data to Kafka topics. They handle partitioning, serialization, and retries.

Producers can be configured for delivery semantics.  
At least once - Ensures no message loss but may result in duplicates.  
At most once - No duplicates, but messages can be lost.  
Exactly once - No duplicates, no loss (more complex setup).
```java
@Autowired
private KafkaTemplate<String, String> kafkaTemplate;

public void sendMessage(String message) {
    kafkaTemplate.send("order-placed", message);
}
```

**Consumers** - Consumers read data from Kafka topics. Multiple consumers in a consumer group can read from the same topic, with each partition assigned to only one consumer in the group at any time.

Kafka tracks each consumer's offset (the position of the last message read).  
If a consumer crashes, Kafka reassigns its partitions to another consumer.

```java
@KafkaListener(topics = "order-placed", groupId = "order-service")
public void listen(String message) {
    System.out.println("Order Received: " + message);
}
```

**Broker** - A broker is a Kafka server that handles message storage, delivery, and replication.

A Kafka cluster has multiple brokers for load balancing and fault tolerance.  
Each broker is responsible for a subset of partitions.

Brokers register themselves with ZooKeeper (or KRaft in newer versions).

```java
spring:
  kafka:
    bootstrap-servers: localhost:9092,localhost:9093,localhost:9094
```

**Zookeeper** - ZooKeeper manages the cluster metadata (like broker information).

Leader election for partitions and failure detection like reassigns leaders when brokers fail.  
Kafka 2.8+ introduced KRaft (Kafka Raft), eliminating ZooKeeper and simplifying cluster management.

```java
zookeeper.connect=localhost:2181
```
**Leader and Replicas** - For each partition one broker acts as the leader and handles all read and write requests. Other brokers hold replicas (backup copies).

If the leader fails, Kafka promotes a replica to leader. In `replication.factor=3`, Kafka creates 3 copies of each message across different brokers.

**In-Sync Replicas (ISRs)** - The set of replicas that are fully caught up with the leader.

If a replica falls behind, it’s removed from the ISR set.

Kafka only acknowledges writes when all ISRs confirm receipt, ensuring durability.

**acks=0** - No acknowledgment. The producer doesn’t wait for confirmation.

**acks=1** (default) -  Leader writes the message to its log and sends an acknowledgment.


**acks=all** (or acks=-1) - Leader waits for all in-sync replicas (ISRs) to acknowledge before confirming.
```yml
acks: all  # Ensures data is replicated to all ISRs before acknowledging.
```
**Offset** - Kafka maintains an offset for each consumer, representing the last consumed message. Consumers can control this:

earliest: Start from the oldest message.

latest: Start from new messages only.

none: Fail if no previous offset is found.
```java
@KafkaListener(topics = "order-placed", groupId = "order-service")
public void listen(String message, @Header(KafkaHeaders.OFFSET) long offset) {
    System.out.println("Received: " + message + " at offset: " + offset);
}
```
**Log Segment and Retention**.
Kafka stores data in logs on disk before ack it to the producer.

Logs are split into segments for faster access.

Messages are retained based on time (log.retention.hours) or size (log.retention.bytes)
```yml
log:retention:hours: 72  # Retain messages for 72 hours
```

Rebalancing
A rebalance occurs when:

A consumer joins/leaves the group.

Partitions are reassigned to ensure balanced processing.

This can cause delays, so Kafka introduced Sticky Partition Assignment to minimize rebalancing.

Connectors and Streams
Kafka Connect: Integrates Kafka with other systems like databases.

Kafka Streams: Processes data directly in Kafka using stream processing.

**Monitoring** - Tools like Confluent Control Center, Prometheus, or Grafana monitor Kafka metrics like:

Consumer Lag  
Broker Health  
Partition Distribution.


### How does Kafka ensure message durability?

**Replication Across Brokers**.  
**Persistent Storage** (Log-Based Storage) - Store in disk. Even if brokers restart, messages aren’t lost — they’re safely stored on disk..  
**Acknowledgment Mechanism.  
In-Sync Replicas (ISRs).  
Minimum ISR Configuration.  
Fault-Tolerance with Leader Election.  
Consumer Offsets in Durable Storage.  
Retention Policies.  
Write-ahead log (WAL)** – Messages are first recorded on logs before they are persisted to the disk. This means if a broker crashes before a message is fully written to the disk, it can be recovered from the log.











Kafka internals like the log replication, leader election, durability, partitions and consumers group and use cases.