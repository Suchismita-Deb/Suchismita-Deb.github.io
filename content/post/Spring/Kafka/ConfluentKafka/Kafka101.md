+++
title = 'Kafka101'
date = 2025-05-11T18:03:07+05:30

url= "/post/spring/kafka/confluentKafka/Kafka101"
tags = ['spring', 'kafka']
+++

Apache Kafka is an event streaming platform used to collect, process, store, and integrate data at scale. It has numerous use cases including distributed logging, stream processing, data integration, and pub/sub messaging.

**Event**.

An event is any type of action, incident, or change that's identified or recorded by software or applications. For example, a payment, a website click, or a temperature reading, along with a description of what happened.

In other words, an event is a combination of notification and state.

Notification - the element of when-ness that can be used to trigger some other activity.

State - Usually fairly small (<mb)  or so, and is normally represented in some structured format, say in JSON or an object serialized with Apache Avro or Protocol Buffers.

**Kafka and Events.**

Kafka is based on the abstraction of a distributed commit log. By splitting a log into partitions, Kafka is able to scale-out systems.

Kafka models events as key/value pairs. Internally, keys and values are just sequences of bytes, but externally in the programming language it is a structured objects.

Kafka famously calls the translation between language types and internal bytes serialization and deserialization. The serialized format is usually JSON, JSON Schema, Avro, or Protobuf.

Values are typically the serialized representation of an application domain object or some form of raw message input, like the output of a sensor.

Keys can also be complex domain objects but are often primitive types like strings or integers. The key part of a Kafka event is not necessarily a unique identifier for the event, like the primary key of a row in a relational database would be. It is more likely the identifier of some entity in the system, like a user, order, or a particular connected device. Crucial for how Kafka deals with things like parallelization and data locality.

### Work with Kafka.

First need a Kafka cluster. Confluent cloud is a great resource for the kafka cluster.

Log in, Create a cluster, Options like - Basic or Standard or Dedicated cluster.

Basic an Standard are serverless offerings and the free confluent cloud usage will only be exhausted based on the use.

Create the cluster and name like **DemoCluster**. In the account side add the promocode KAFKA101 to get the free credit to play with Kafka.

Kafka is a collection of immutable append only logs. The primary component of storage in Kafka is called a topic and it represents a data entity.

Create a topic.

Select the Topic option in the left side of the panel and create a topic. Give a topic name like `poems` and the default partitions is 6.

![TopicsProducerAndConsumer.png](/images/Spring/Kafka/ConfluentKafka/TopicsProducerAndConsumer.png)



{{<figure src="/images/Spring/Kafka/ConfluentKafka/TopicsProducerAndConsumer.png" alt="Subset" caption="Subset tree execution">}}




Hello There
