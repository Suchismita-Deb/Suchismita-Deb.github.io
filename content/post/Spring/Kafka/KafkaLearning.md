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