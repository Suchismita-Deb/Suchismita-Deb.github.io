+++
title = 'Kafka101'
date = 2025-05-11T18:03:07+05:30

url= "/post/spring/kafka/confluentKafka/Kafka101"
tags = ['spring', 'kafka']
+++

Apache Kafka is an event streaming platform used to collect, process, store, and integrate data at scale. It has numerous use cases including distributed logging, stream processing, data integration, and pub/sub messaging.

**Event Driven Architecture (EDA)** A flexible software architecture for publishing, storing, and processing events data in real-time using events to trigger and communicate between decoupled (independently functioning) software services and applications. When something happens, everybody who needs to know about it is notified.


**Event** - An event is any type of action, incident, or change that's identified or recorded by software or applications. For example, a payment, a website click, or a temperature reading, along with a description of what happened. Events travel from one system to another system, carrying the state changes that happened. An Event Stream represents related Events in motion.

In other words, an event is a combination of notification and state.

Notification - the element of when-ness that can be used to trigger some other activity.

State - Usually fairly small (<mb)  or so, and is normally represented in some structured format, say in JSON or an object serialized with Apache Avro or Protocol Buffers.

**Kafka and Events.**

Kafka is based on the abstraction of a distributed commit log. By splitting a log into partitions, Kafka is able to scale-out systems. Kafka is an event messaging system for real-time data analysis and data streaming. Kafka works on multiple servers in a distributed architecture, enabling use of the processing and storage of various systems. 

Confluent Kafka is an enterprise grade version. Apache Kafka is open source.

Kafka models events as key/value pairs. Internally, keys and values are just sequences of bytes, but externally in the programming language it is a structured objects.

Kafka famously calls the translation between language types and internal bytes serialization and deserialization. The serialized format is usually JSON, JSON Schema, Avro, or Protobuf.

Values are typically the serialized representation of an application domain object or some form of raw message input, like the output of a sensor.

Keys can also be complex domain objects but are often primitive types like strings or integers. The key part of a Kafka event is not necessarily a unique identifier for the event, like the primary key of a row in a relational database would be. It is more likely the identifier of some entity in the system, like a user, order, or a particular connected device. Crucial for how Kafka deals with things like parallelization and data locality.

### Work with Kafka.

First need a Kafka cluster. Confluent cloud is a great resource for the kafka cluster.

Log in, Create a cluster, Options like - Basic or Standard or Dedicated cluster.

Basic an Standard are serverless offerings and the free confluent cloud usage will only be exhausted based on the use.

Create the cluster and name like **_DemoCluster_**. In the account side add the promocode KAFKA101 to get the free credit to play with Kafka.

Kafka is a collection of immutable append only logs. The primary component of storage in Kafka is called a topic and it represents a data entity.

Create a topic.

Select the Topic option in the left side of the panel and create a topic. Give a topic name like `poems` and the default partitions is 6.

{{< figure src="/images/Spring/Kafka/ConfluentKafka/TopicsProducerAndConsumer.png" alt="Subset" caption="Subset tree execution" >}}

**Topic** - Kafka Topics are logs that hold messages and Events in logical order like a **_folder_** or **_file_** system. If you wish to send a message, you send it to a specific Topic and if you wish to read a message, you read it from a specific Topic.

**Partitions** - Kafka Topics are divided into Partitions - the smallest storage unit that **_holds a subset of records within in a Topic_**. Each Partition is a single log file where records are written to it. Message records are ordered with a unique number (called an offset).

**Broker** - A Broker is a Kafka server which is in charge of message storage for a Kafka Topic. A Broker (server) accepts Events from Producers and makes them available by subscription to Consumers.

**Kafka Cluster** - A Kafka Cluster is a system of several Brokers (servers), Topics, and Partitions working together. Kafka Clusters manage and replicate data messages, so if the primary Cluster goes down, other Kafka Clusters can deliver the same service without delay.

**Kafka Connectors** - Kafka Connectors are ready-to-use components, which can help import data from external systems into Kafka Topics and export data from Kafka Topics into external systems. Source Connectors collect data from a system. Sink Connectors deliver data from Kafka Topics into other systems.

**Stream Processing** - Stream Processing is the ability to formulate multiple data streams into outbound data objects using aggregation, transformation, and other techniques required for consumption by multiple downstream entities, all in real-time.

**Kafka Connect** - Kafka Connect is a tool for streaming data between Kafka and other systems. It’s a streamlined architecture that makes defining Connectors and moving huge volumes of data into and out of Kafka straightforward and rapid.

**Single Message Transforms (SMTs)** - SMT is a Kafka API that provides a simple interface for manipulating records as they flow through your data pipeline. SMTs are a perfect solution for things like manipulating fields, changing topic names, conditionally dropping messages, and more.

**Kafka Streams** - Kafka Stream is an easy data **processing** and **transformation** library within Kafka. Kafka Streams offers a framework and clutter-free mechanism for building streaming services that are fully secure with integrated Kafka Security.

**KTable** - A KTable organizes a Kafka topic stream of records into unique entries on a continual basis. For example, if you wanted an ongoing record of customers from Utah, you could capture these unique data entries in a KTable.

**Kafka REST Proxy** - Kafka REST Proxy is a web API to link different systems for administrative operations and to make message production and consumption easier. It is useful for developers who wish to utilize their preferred development framework. This is a Confluent Kafka feature.

**ksqlDB** - ksqlDB is a database for creating stream processing applications on top of Kafka. You can use ksqlDB to build event streaming applications from a Kafka topic by using only SQL statements and queries. KSQL is the previous version. These are Confluent Kafka features.


**Schema Registry** - A schema is a definition that specifies the structure and type information about data in a Kafka Topic (for maintaining consistency). Schema Registry is a server process for maintaining a database of all of the schemas that have been written into topics. Collibra, the enterprise metadata repository and lineage management tool, will use Schema Registry to maintain metadata about all Kafka Topics. Schema Registry is a Confluent Kafka feature.
