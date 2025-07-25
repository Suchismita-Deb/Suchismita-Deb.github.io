+++
title = 'Kafka The Definitive Guide'
date = 2025-07-24T19:59:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide"
tags = ['spring', 'kafka']
+++
### **Chapter 6 - Kafka Internals.**

Topics relevant to Kafka Partitioners - Kafka Controllers, How Kafka Replication works, How Kafka Handles requests from producers and consumers, How Kafka handles storage such as file format and indexes.

Kafka uses Zookeeper to maintain the list of brokers in the cluster. Every broker has a unique identifier.

Everytime a broker process starts it regster itself with the ID Zookeeper by creating a *ephemeral id*. 


