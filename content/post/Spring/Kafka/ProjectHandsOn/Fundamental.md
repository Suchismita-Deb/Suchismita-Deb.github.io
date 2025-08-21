+++
title = 'Kafka Project Fundamentals'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProject/Fundamental"
tags = ['spring', 'kafka']
+++
Confluent Cloud is enterpise software.  
Making personal Project then use Open source Apache kafka.

Zookeeper port - 2181. Then Kafka Server port 9092.
Apache Kafka latest bin zip download and put in C drive then open cmd from the bin path. In different folder then the cmd throw the error like the input line is long error.  


First start the zookeeper and then the kafka server.
```bash
C:\kafka_2.12-3.9.1>bin\windows\zookeeper-server-start.bat config\zookeeper.properties

C:\kafka_2.12-3.9.1>bin\windows\kafka-server-start.bat config\server.properties
```
Producer say on port 9191.
Consumer say port on 9292.
### __Create a topic__
```bash
 C:\kafka_2.12-3.9.1> bin\windows\kafka-topics.bat --create --topic demo_topic_1 --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```
Topic name - demo_topic_1  
Bootstrap-server port - localhost:9092
### __List of all the topic in a bootstrap server.__
```bash
C:\kafka_2.12-3.9.1> bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```
### __Describe one topic__
```bash
C:\kafka_2.12-3.9.1>bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic demo_topic_1
```
The output.
```bash
Topic: demo_topic_1     TopicId: 0pv0RmQqSiClY81hFOWdGQ PartitionCount: 1       ReplicationFactor: 1    Configs:
Topic: demo_topic_1     Partition: 0    Leader: 0       Replicas: 0     Isr: 0  Elr: N/A        LastKnownElr: N/A
```

Kafka Consumer offset is one software where we need to add the port and then can see the topic details.  
{{< figure src="/images/Spring/Kafka/KafkaConsumerOffset.png" alt="KafkaConsumerOffset" caption="Kafka Consumer Offset Cluster." >}}  
In Offset Explorer connect the cluster.


### __Delete one topic__
```bash
C:\kafka_2.12-3.9.1>bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --delete --topic topic-Name
```

### __Produce message and Consume Message__

```bash
C:\kafka_2.12-3.9.1>bin\windows\kafka-console-producer.bat --topic demo_topic_1 --bootstrap-server localhost:9092
> Hello
> World

## When there are multiple broker list.
C:\kafka_2.12-3.9.1>bin\windows\kafka-console-producer.bat --topic demo_topic_1 --bootstrap-server broker1:9092,broker2:9092,broker3:9092
```

Consumer command in a terminal.
```bash
C:\kafka_2.12-3.9.1>bin\windows\kafka-console-consumer.bat --topic demo_topic_1 --bootstrap-server localhost:9092 --from-beginning
C:\kafka_2.12-3.9.1>bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic TOPIC_A --partition 0 --from-beginning
```

When produce multiple message say one file of data to produce in the topic.
```bash
Produce a large file in the message - C:\kafka_2.12-3.9.1>bin\windows\kafka-console-producer.bat --topic demo_topic_1 --bootstrap-server localhost:9092 <filePathInSystem>
```
filePathInSystem can be like Users/Download/File.csv

### __Bootstrap server Cluster Endpoints.__
The bootstrap server of confluent looks like `lkc-3r55qm-6k5r02.us-central1.gcp.glb.confluent.cloud:9092` 
In the confluent cloud set the env like dev, prd, stg then there will be cluste and in the cluster settings we can see the bootstrap server.
{{<figure src="/images/Spring/Kafka/Cluster.png" alt="Cluster" caption="Cluster." >}}  

### __Dependency Needed__
Kafka Streams, Kafka Avro Serializer, Apache Kafka.
One thing the confluent io dependency not present in the springinitilizer platform. Then search for the dependency in Maven.
```yaml
<!-- https://mvnrepository.com/artifact/io.confluent/kafka-avro-serializer -->
<dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-avro-serializer</artifactId>
    <version>7.8.0</version>
</dependency>
```

In gradle project we need to modify the dependency like `groupId:artifactId:version` like `io.confluent:kafka-avro-serializer:7.8.0` 

In the build.gradle we need to add the dependency.
```yaml
dependencies {
  implement io.confluent:kafka-avro-serializer:7.8.0
}
```
