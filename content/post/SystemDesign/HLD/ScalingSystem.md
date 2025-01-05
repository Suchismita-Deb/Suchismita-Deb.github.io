+++
title = 'Scaling System'
date = 2025-01-03T14:39:32+05:30

url= "/post/systemDesign/hld/scalingSystem"
tags = ['interview question', 'system design']
+++

Scale a system from 0 to mil.

Ways to scale a system.

Single Server.  
Application and Db Server Separation.  
Load Balancer and Multiple App Server.
Database Replication.  
Cache.  
CDN.
Data Center.  
Messaging Queue.  
Database Scaling.

System Development.

User and data all in same server. Service and data in same server. - Single server.

There is one additional server and application and server is different and there are middle tier - Application and DB server Separation.

Load Balancer - Adding the load balancer to redirect to the specific server based on load. There are multiple application server to handle request.

Database Replication - The database will have master and slave db and the wrie operation will go to the master db and the read operation will go to the slave db. The db will be in sync and when one master db is not responding then one of the slave db will work as master db.

Cache - Adding cache and storing the data in the cache and data not present then go to db to read the data. DB operation is most expensive operation. When application set the Cache then it define the TTL - TimeToLive(24 hours).

CDN - CDN does caching and which does caching is not CDN. CDN has the functionality of caching. User in USA and datacenter in India. Data taking time. CDN node is present in all country. CDN does the caching of static data, video, html page. When request comes it will go to the CDN and then get the data. When the data not present then it will go to neighbour cdn and then to db. Client directly go to the CDN if did not get the data then it will go to the load balancer.

Data center - One data center store the application and data server. Now with more data center all of the data center will have the application server and data server.

Messaging Queue.

Exchange - Producer send the message and the routing key and there is a Binding between Exchange and Queue. Exchange see the routing key and bonding and send the data to the specific queue. Subcribers listening to the queue will get the data.

There are different way to connect with exchange and queue.

Direct - When the routing key coming from producer matches with the binding key then it will send to the queue.

FanOut - Exchange will send the same messgage to all the queue and the subscriber will get the data.
Topic - Can send to more than one queue with conditions.

Messaging queue is async in nature.

Database Scaling - Horizontal and Vertical.

Vertical increase the capacity of the CPU.

Horizontal increase the number of CPU. Implementation - Sharding.

Sharding is of two type - Horizontal and Vertical.

Horizontal Sharding - There is one table with 10000 rows. Divide in multiple table row wise and t1 - 0 to 100 and t2 101 to 500.  
Vertival Sharding - Divide the column of the table. and say c1 to c10 in one table and table 2 c11 to c30.

When horizontal sharding say one table storing all names with A to S and another storing from T to Z then say t1 has more data then again sharding on the t1 so it will continue.
Now rows are divided and we will not able to join so we can denormalize the table to avoid join.


Multiple table is creating we solve using consistent hashing.