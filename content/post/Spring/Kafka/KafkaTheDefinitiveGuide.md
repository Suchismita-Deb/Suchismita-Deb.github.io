+++
title = 'Kafka The Definitive Guide'
date = 2025-07-24T19:59:08+05:30

url= "/post/spring/kafka/KafkaTheDefinitiveGuide"
tags = ['spring', 'kafka']
+++
### **Chapter 6 - Kafka Internals.**

Topics relevant to Kafka Partitioners - Kafka Controllers, How Kafka Replication works, How Kafka Handles requests from producers and consumers, How Kafka handles storage such as file format and indexes.

**Kafka uses Zookeeper to maintain the list of brokers in the cluster.** Every broker has a unique identifier. One cluster can have multiple broker.

Everytime a broker process starts it regster itself with the ID Zookeeper by creating a *ephemeral id*. Broker, Controller subscribe to the `/brokers/ids` path in Zookeeper where brokers are registered so that they get notification when broker are added.

Boker with same id can not be added as there is already zookeeper with the same broker id. When beoker loss connectivity to Zookeeper(broker stopped, network partition, long garbage-collection pause) then the ephmeral node is removed. Components will be notified that the broker is removed.


The node representing the broker is removed but the id is still used and list of replica of each topic include the id. When new broker with the id of the old one join the cluster start with the same partitions and topic assigned to the old one.
### The Controller.
One of the Kafka Broker that is responsible for electing partition leaders. The first broker that starts in the cluster become controller create the ephemeral node in Zookeeper called `/controller`. Other broker also try to cretae the node but the get the `node already exists` exception. The other brokers create a _Zookeeper watch_ on the controller node so they get notified of change to the controller. Cluster will always have one controller.

When the controller broker is stopped and the client used by the controller stop sending hearbeat to Zookeeper for longer than `zookeeper.session.timeout.ms` the ephemeral node disappear and the other broker want to become the controller and the first one become the controller.

Each time a controller is elected it receives a new higher `controller epoch` number through the Zookeeper conditional increment operation. The broker knows the current controller epoch and any message from old epoch is ignored.  

Controller can disconned from Zookeeper due to long garbage collection pause and new controller will be elected and when the old one resume it will start the operation and send message to the broker and now it will be considered as zombie.

When controller first start working it read the latest replica state map from Zookeeeper before it start managing cluster metadata and leader election.  The loading process uses async API and pipelines the read request to Zookeeper to hide latencies.

When controller notices that the broker left the cluster by watching the Zookeper path or bacause it recieves a `ControlledShutdownRequest` from the broker it knows all teh partition that has leader on the broker will need new leader. It select the new leader - the next replica in the replica list of that partition.  

It persist the new state to the Zookeeper using the pipelined async requests to reduce latency and send `LeaderAndISR` request to the broker that contain replica to the partition.

The requests are batched and contain the information of the leader and the followers of the partition.
Every broker in the cluster has a `MetadataCache` that includes a map of all the brokers and all the replicas in the cluster, the controller sends all brokers information about the leadership change in an `UpdateMetadata` request to update the cache.
A same way it happens when a broker starts back up - only difference - all replica in the broker starts as followers and need to catch up to the leader before they eligible to be electd as leader by themself.

> Kafka uses Zookeepers ephemeral node to elect the controller and notify when node join or leave the cluster.
>
> The controller is responsible for electing the leader among the partitions and replicas.
>
> The controller uses the epoch number to prevent a 'split brain' where multiple node believe each other the current controller.
