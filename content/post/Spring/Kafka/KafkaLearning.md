+++
title = 'Kafka Learning'
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
### Consuming the message.
```java
bin\windows\kafka-console-consumer.bat --topic user-topic --from-beginning --bootstrap-server localhost:9092
```

Take the topic name properly. One can pen multiple instance of CMD and can subscribe the same topic and will get the message.

### Making a Spring Project to use the Kafka Messaging Queue.
Making one Spring project to update the location and other to receive the update location message.
One project by name endUser and other by the name location.

- For producing the message we need a topic. Create a config package for the Configuration class.

- Message updated when we hit the url with post request.
- ![img_1.png](/images/img31.png)
- From the cmd we can get the message.
- In the producer yml file, in location project we need to write.
```java
#Producer configuration
spring.kafka.producer.bootstrap-servers=localhost:9092
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
```
- In the consumer yml file, in the endUser project we need to write.
```java
server.port=8081
spring.kafka.consumer.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=group-id
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
```