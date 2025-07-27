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

> Kafka uses Zookeepers **ephemeral node** to elect the controller and notify when node join or leave the cluster.
>
> The controller is responsible for electing the leader among the partitions and replicas.
>
> The controller uses the epoch number to prevent a 'split brain' where multiple node believe each other the current controller.

### KRaft New Raft Based Controller.

In 2019 Kafka moved away from the Zookeeper based controller to the Raft Based Controller quoram. Kafka cluster will be able to run both in Zookeeper based controller or KRaft.  

**WHY??** - The way Kafka uses Zookeeper to store the topic, partitiion, replica information it became clear that it will not scale to the number of partition we want Kafka to support.  
Metadata update are written to Zookeeper synchronously and send to broker asynchronously. Receiving update from Zookeeper is asynchronous. It leads to the metadata inconsistent to the broker, controller, zookeeper.  
Controller restart it needs to tead all the metadata for all brokers and partitions from the Zookeeper and send metadata to all brokers. It is a bottleneck as number of partition increased restarting the controller beacame slow.  
The internal metadata operation was not good some operation done by controller, some by broker and some by zookeeper.

Zookeeper as main 2 function - elect the controller and store the cluster metadata - registered broker, configurations, topics, partitions and replicas.  
Controller itself manages the metadata - it elect the leader, create and delete topics and reassign replicas.

The core idea in new design - Kafka has a log-based architecture where user represents state as a stream of events. Multiple cnsumer can catch up to the same latest state by replaying the events. The log establish a clear ordering ofteh event and ensures consumer always move to a single timeline. The new controller bring teh smae benefit in the management of Kafka metadata.  

The controller node are a Raft quorum that manages log of metadata event. This log contains change to the cluster metadata. Everything that is stored in Zookeeper - topics, partitions, ISR, configuration are stored in logs.







**The new architecture.**

Using the Raft algorithm the controller node will elect the leader called the active controller. It handles all RPCs made from the broker. The followers controller replicates the data written on the active one and act like hot standby and track the latest state and now it fails then it will not take long time to reload a new controller to transfer all the state.  


Controller will not push update to other broker andbokers will fetch the update form the active controller via the `MetadataFetch` API. Its alike a fetch request broker will track the offset of the latest metadata change they fetch and only request to the newer updates from the controller. Broker will persist the data in disk which will allow them to start up quickly even with millions of partitions.

Broker will be registered with the controller quorom until unregistered by admin and once shut down it is offline and still regstered. Broker online and not uptodate with the latest metadata are fenced and will not serve the client. It will prevent the case where client produce event to broker which is not a leader and out of data to aware that it is not a leader.

All operations that was previously involved with the client or broker communicating with Zookeeper will be routed via controller.


Detail design on how the raft protocol adapted for Kafka, new controller quorom, cli interacting with cluster meatdata - Further study.

### **Replication.**

> Kafka is termed as **a distributed, partitioned, replicated commit log service**.
>
> Data in Kafka is organized by topic. Each topic is partitioned and each partition can have multiple replicas.
>
> The replicas are stored in broker. Each broker can have hundred of replicas belonging to different topics and partitions.

Replication is imp as it guarantee the availability and durability when one node fail.  

There are 2 types of Replicas - **Leader and Followers Replicas.**  
Leader Replicas - Each partition has a single replica as leader. All produce request go through the eader to guarantee consistency. Clinet canconsume from lead replica or its follwoers.  
Followers Replicas - All other than leader. Unless configured they dont server client they just replicate messages and stay up-to-date with the leader. If one leader replica for a partition crash it will become the new leader.
