+++
title = 'KafkaLearning'
date = 2023-12-24T22:31:38+05:30
+++


First step to install the tar file from the quickstart page and extract and open the cmd from the path which has the bin folder.
```java
bin\windows\zookeeper-server-start.bat config\zookeeper.properties
```
Open another cmd from the same path and then run the server.
```java
bin\windows\kafka-server-start.bat config\server.properties
```
### Create a topic in kafka.
```java
bin\windows\kafka-topics.bat --create --topic user-topic --bootstrap-server localhost:9092
```
We created the topic by the name user-topic.
### List of the topic created.
We need --bootstrap-server r --zookeeper to see the list of the topic.
```java
bin\windows\kafka-topics.bat --bootstrap-server=localhost:9092 --list
```
Other command.
```java
bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```
Both giving the output user-topic.
### Creating message inside the topic.
Consumer subscribed to the topic will get the message. We create the message in the producer.
```java
bin\windows\kafka-console-producer.bat --topic user-topic --bootstrap-server localhost:9092
```
Here we can write the message.
### 