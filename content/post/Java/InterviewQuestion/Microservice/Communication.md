+++
title = 'Microservice Communication'
date = 2024-09-13T22:02:37+05:30
url= "/post/java/interviewquestion/Microservice/InterCommunication"
tags = ['interviewQuestion', 'java']
categories = ['java','microservice']
+++

Ways to communicate between Microservices.
---


**Synchronous communications** - It is achieved through - 

> **Rest APIs**
> 
> **GraphQl**
>
> **Feign** using Eureka discoveries
>
> **GRPC** (10 times faster than REST APIs) - developed by Google as substitute of REST with many more features.

A synchronous call means that a _service waits for the response_ after performing a request. It is a request response pattern.

**Important Features of Synchronous Communication**.

**Tight Coupling** - It  requires services to be available and responsive in real time.  
**Deterministic** - The caller knows the outcome immediately, making it suitable for workflows needing immediate results.  
**Blocking Nature** - The sender cannot proceed until a response is received.

**When to use the Synchronous Communication**.
  
**Query Operations** - Fetching data or performing lightweight computations.   Example - A user-facing service querying a catalog service for product details.   
**Transactional Workflows** - When atomicity across services is essential.
Example - A payment service calling an inventory service to lock stock before completing a transaction.   
**Low Latency Requirements** - Scenarios demanding immediate feedback where the outcome of the feedback determine the next step. Scenarios demanding immediate feedback. Example - User authentication and authorization workflows.
Example - User authentication and authorization workflows.


**TradeOff using Synchronous Communication**.
  
**Tight Coupling** - Services depend on each other’s availability, increasing the risk of cascading failures.
A failure or high latency in one service directly affects the caller.   
**Scalability Bottleneck** - Synchronous communication can lead to thread exhaustion, especially under high load.
Example: Blocking calls in Spring Boot (e.g., RestTemplate) tie up server resources until a response is received.   
**Latency Impact** - Each hop in a synchronous chain adds latency, degrading the overall user experience.   
**Fault Tolerance Challenges** - Timeouts, retries, and circuit breakers must be explicitly managed (e.g., using Resilience4j or Hystrix).

**Asynchronous communication** in java. 

This communication usually involves some kind of messaging system like
> Active Mqs
>
> Rabbit MQs
>
> Kafka

### What is Asynchronous Communication.

To initiate async communication, a Microservice who wants to send some data to another Microservice `@publishes` a message to a separate component known as a `message broker`. It is responsible for handling the message sent by the producer service and it will guarantee message delivery.

After the message is received by the broker, it's now its job to pass the message to the target service. If the recipient is down at the moment, the broker might be configured to _retry as long as necessary_ for successful delivery.

These messages can be **persisted** if required or stored only **in memory**. In the latter case, they will be _lost when the broker is restarted_ and they are not yet sent to the consumer.

Since the broker is responsible for delivering the message, it's no longer necessary for both services to be up for successful communication. Thus async messaging mitigates the biggest problem of synchronous communication coupling.

A relevant point here is that there, the sender doesn't need to wait for the response. It might be sent back from the receiver later as another asynchronous message.

The intended service receives the message in its own time. The sending service is not locked to the broker. It simply fires and forgets.

### What if the message broker is down or restarted then the data will be deleted.

A message broker is a vital part of the asynchronous architecture and hence must be fault tolerant.
This can be achieved by setting up additional standby replicas that can do failover. Still, even with auxiliary replicas, failures of the messaging system might happen from time to time.

If it's essential to ensure the message arrives at its destination, a broker might be configured to work in at-least-once mode. After the message reaches the consumer, it needs to send back ACK to the broker. If no acknowledgement gets to the broker, it will retry the delivery after some time.

### Types of Async communication

Commonly, there are two options in message-based communication:
> Point to Point
>
> Publisher-Subscriber

### What is PTP Async communication.

PTP-A queue will be used for this type of messaging-based communication.

The service that produces the message, which is called as producer (sender), will send the message to a queue in one message broker and the service that has an interest in that message, which is called a consumer (receiver), will consume the message from that queue and carry out further processes for that message.

One message sent by a producer can be consumed by only one receiver and the message will be deleted after consumed.

If the receiver or an interested service is down, the message will remain persistent in that queue until the receiver is up and consumes the message.

For this reason, messaging-based communication is one of the best choices to make our microservices resilient.

A popular choice for the queueing system is **RabbitMq**, **ActiveMq**.

### What is Publisher-Subscriber Async communication.

In publisher-subscriber messaging-based communication, the topic in the message broker will be used to store the message sent by the publisher and then subscribers that subscribe to that topic will consume that message.

Unlike point to point pattern, the message will be ready to consume for all subscribers and the topic can have one or more subscribers. The message remains persistent in a topic until we delete it.

In messaging-based communication, the services that consume messages, either from queue or topic, must know the common message structure that is produced or published by producer or publisher.

Examples are **Kafka**, **Amazon SNS** etc.

In message based communication the producer and consumer need to know the message format and they both accept the message in same format.

There come the event based communication here we donot need to know the details of the message.

### What is Event Based Async communication.

Unlike messaging-based communication, in event-based communication, especially in event-driven pattern, the services that consume the message do not need to know the details of the message.

In event-driven pattern, the services just push the event to the topic in the message broker and then the services that subscribe to that topic will react for each occurrence event in that topic Each event in the topic will be related to a specific business logic execution.

### Apache Kafka.

Apache Kafka is publish-subscribe based fault tolerant messaging system. It is fast, scalable and distributed by design.

It was initially thought of as a message queue and open-sourced by LinkedIn in 2011. Its
community evolved Kafka to provide key capabilities: Publish and Subscribe to streams of records, like a message queue.

Storage system so messages can be consumed asynchronously. Kafka writes data to a scalable disk structure and replicates for fault-tolerance. Producers can wait for write acknowledgments.

Stream processing with Kafka Streams API, enables complex aggregations or joins of input streams onto an output stream of processed data.

Traditional messaging models are queue and publish-subscribe. In a queue, each record goes to one consumer. In publish-subscribe, the record is received by all consumers.

| Feature          | RabbitMQ | Kafka                                                                                                                                                                                                                                                                                                                                                     |
|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Overview         | It is a traditional messaging system that deals with a small amount of data. With point to point messaging, one or more consumers are connected to the queue, while the broker uses the 'round robin' approach to direct messages to specific consumers.| Kafka is a distributed publish-subscribe message delivery and logging system that follows a publisher/subscriber model with message persistence capability. Producers push event streams to the brokers, and consumers pull the data from brokers. In subscription-based messaging, brokers broadcast messages to all consumers 'subscribed' to the topic. |
 Recommendation   | Use them for exactly once delivery and for valuing messages.| Use Kafka for high-performance monitoring and where losing messages is not important.|
 Throughput       | Lower throughput since each delivery message state is maintained.|Higher throughput since producers dont wait for acknowledgements from brokers. So brokers can write messages at a very high rate. |
 Order of Message |Cannot assure the order of messages to remain the same.|Can assure that the messages retain the order in which they are sent|
Filtering|Work of filtering is done by the JMS API message selector and not by the applications.| No fundamental filters at the brokers. Hence it must be done by consumers or apps.|
Messaging Type| Push type messaging platform where in the provider push the message. |Pull type messaging platform wherein consumers pull the message from the publisher.|
Responsible Stakeholders| Responsibility of producers to ensure delivery of messages.| Responsibility of consumers to consume messages|
Scalability| No chances of horizontal scalability and replication.| Scalable and available because of replication of partitions.|
Performance| Performance slows down as the number of consumers starts increasing. 4K-10K messages per second. | Performance remains effective and good even if there are newer consumers being added. 1 million messages per second.|
Support for synchronous or asynchronous. | Supports both. | Supports asynchronous.|
Message Retention | Acknowledgment based. These messages are removed from the queue once they are processed and acknowledged. | Policy-based (e.g retain only for 30 days). Kafka messages are always forever saved until the retention time expires, the developers have no other option. Kafka is a log.|
Consumer Mode | Smart broker/dumb consumer. The broker consistently delivers messages to consumers and keeps track of their status.| Dumb broker/smart consumer. Kafka doesn't monitor the messages each subscriber has read. Rather, it retains unread messages only, preserving all messages for a set amount of time.|
Payload Size| No constraints.|Default 1MB limit.|
Usage Cases | Simple use cases.| Massive data/high throughput cases.|

### Summary.
Rabbit Mq we use producer and consumer. Consumers delete the message after receiving the message.

In Kafka we use publisher and subscribers. Subscribers do not delete the message as there can be more than one subscribers subscribed to the same publishers.

1 in 100 message in kafka may be lost so if it is very imp then go for rabbitMq.

Kafka initially was a messgae queue and later it was started to as logging system and persist the data.

### Architecture of Kafka.

Big cluster and there is brokers (Fault tolerant we have multiple broker) and inside brokers there is topics. Topics will have the partitions and partitions will have the offset. Each offset will contain single event or message.
There is 1 to 1 mapping between the message and the offset.

One message in one offset in one partition.
Cluster manages all the thing with the help of Zookeeper. Zooker manages the brokers.

Broker will be the interface between the producer and consumer. Broker stores the message in the disk named as topic.


### Topic.
A topic is similar to a folder, and these messages are the files in that folder. Topics are multi-producer and multi-subscriber. Messages can be read as many times as needed, unlike traditional messaging systems, msgs/events in kafka are not deleted after consumption. Instead, you can define for how long Kafka should retain those events/msgs. The message will be stored for the time duration.

Kafka topics are divided into a number of partitions, which contain msgs/events in an unchangeable sequence. Each msg in a partition is assigned and identified by its unique offset. A topic can also have multiple partition. This allows multiple consumers to read from a topic in parallel.

In Kafka, **replication is implemented at the partition level**. The redundant unit of a partition is called a replica. Each partition usually has one or more replicas over a few Kafka brokers in the cluster.

Every partition (replica) has one server acting as a leader and the rest of them as followers. The leader replica handles all read-write requests for the specific partition and the followers replicate the leader. If the lead server fails, one of the follower servers becomes the leader by default.

When a producer publishes a msg to a topic, it is published to its leader. The leader appends the msg to its offset and increments its msg offset.

### Kafka Cluster.

A Kafka cluster is a system that comprises of different brokers topics, and their respective partitions.

### Producers.
 A producer sends or writes data/messages to the topic within the cluster. Before a producer can send any msgs, it has to request metadata about the cluster from the broker. The metadata contains information on which broker is the leader for each partition and a producer always writes to the partition leader.

A producer must know which partition to write to, this is not up to the broker. The producer attach a key to the message and the message goes to the partition. All msgs with the same key will arrive at the same partition. The producer uses the hash function on the key to know the partition to go as there will be multiple partition in the one topic of partition leader. Say there are 5 partitions then it will equally divide the message in the partitions. The partitions has offset and the data fills sequentially in the offset.

A common error when publishing msgs is setting the same key or null key for all msgs, which results in all records ending up in the same partition and you get an unbalanced topic.

### Consumers.

Consumers: A consumer is the one that reads or consumes messages from the Kafka cluster. The beauty of Kafka is that each consumer knows from where it needs to consume the data. 

For such decisions, consumers within a group automatically use a 'GroupCoordinator' (from kafka side) and one 'ConsumerCoordinator'(from consumer group side), which assigns a consumer to a partition. Kafka handles the process.

The consumer reads the data within each partition in an **orderly manner**. It means that the consumer is not supposed to read data from offset 1 before reading from offset 0. Also, a consumer can easily read data from multiple brokers at the same time

The high-level consumer (more known as consumer groups) consists of one or more consumers. Here a consumer group is created by adding the property "groupId" to a consumer. Giving the same group id to another consumer means it will join the same group.

Consumer are smart and brokers are dumb.

Consumers pull messages from topic partitions. The consumers will never overload themselves with lots of data or lose any data since all msgs are being queued up in Kafka. If the consumer is behind during message processing, it has the option to reset the offset it was reading from and read again.

### Broker.

A Kafka server, a Kafka broker and a Kafka node all refer to the same concept. A broker is a bridge between producers and consumers. If a producer wishes to write data to the cluster, it is sent to the Kafka server. A Kafka broker allows consumers to fetch messages by topic, partition and offset. All brokers lie within a Kafka cluster itself. To maintain load balance Kafka cluster typically consists of multiple brokers.

You can start a single Kafka broker using **kafka-server-start.sh** script. Running a single Kafka broker is possible but it doesn't give all the benefits that Kafka in a cluster can give, for example, data replication.

### Partitions.

The data or message is divided into small subparts, known as partitions. Each partition carries data within it having an offset value. The data is always written in a sequential manner. We can have an infinite number of partitions with infinite offset values. However, it is not guaranteed that to which partition the message will be written.

### Zookeeper

For the purpose of **managing and coordinating** Kafka broker uses ZooKeeper.
A ZooKeeper is used to store information about the Kafka cluster and details of the consumer clients. It manages brokers by maintaining a list of them. Management of the brokers in the cluster is performed by Zookeeper. There may be multiple Zookeepers in a cluster.

Brokers/kafka servers are stateless, hence for maintaining the cluster state they use ZooKeeper. Also, a ZooKeeper is responsible for choosing a leader for the partitions.

Also, uses it to **notify producer and consumer about the presence of any new broker** in the Kafka system or failure of the broker in the Kafka system.

As soon as Zookeeper send the notification regarding presence or failure of the broker then producer and consumer, take the decision and starts coordinating their task with some other broker.

ZooKeeper also notifies **Consumer offset value**.

A ZooKeeper is designed to operate with an odd number of Kafka servers.
Zookeeper has a leader server that handles all the writes, and rest of the servers are the followers who handle all the reads.

However, a user does not directly interact with the Zookeeper, but via brokers.

**No Kafka server can run without a zookeeper server. It is mandatory to run the zookeeper server**.
