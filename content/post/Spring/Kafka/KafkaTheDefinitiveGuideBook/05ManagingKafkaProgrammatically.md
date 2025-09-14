+++
title = 'Kafka The Definitive Guide - 05 Kafka Program.'
date = 2025-07-27T20:11:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide05"
tags = ['spring', 'kafka', 'KafkaTheDefinitiveGuide']
+++
### **Chapter 5 - Managing Apache Kafka Programmatically.**

Apache Kafka added AdminClient in 0.11 to provide programmatic API for administrative functionality done in cmd like - listing, creating, deleting topics and describing the cluster and managing ACLs and modifying configurations. Imp task like managing the topic, consumer group and entity configuration.

Example - Application need to produce an event to the topic. First the topic need to exists. Before adminClient options are UNKNOWN_TOPIC_OR_PARTITION exception from the producer.send() and let user know that topic does not exist or Kafka cluster to enable automatic topic creation. 

Using AdminClent see if the topic exist and if not create on the spot.
