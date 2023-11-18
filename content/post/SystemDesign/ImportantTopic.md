+++
title = 'Important Topic'
date = 2023-11-18T14:19:48+05:30
tags=["system design"]
+++



# System Design Concepts.

### Vertical Scaling.
Single server accepting and fulfilling the request from the user. Now we have more users. One way we increase the resources like RAM and upgrade CPU. This is vertical scaling. Its easy but limited.
### Horizontal Scaling.
Another way to use replicas of server. Each server can handle subset of request. Its more powerful. It can scale more and we donot even need good machine.

It adds fault tolerance and redundancy. If one server goes down other can fulfill the request. This eliminates the single point of failure.
### Load Balancer.
In horizontal scaling we need to ensure that one server donot get overloaded while others are idle.
Load Balancer is a server known as **Reverse Proxy**. It directs incoming request to the apt server.

We can use algorithm like **Round Robin** which will balance traffic by cycling through the pool of servers.

Other approach like **Hashing** the incoming request. Target is to get equal amount of load to the server.

If the server located in other country then with Load Balancing we can redirect the request to the nearby server.
### CDN Content Delivery Network.
When we just send static file like image, video, HTML, CSS, Js file then we can just add CDN.

It is the network of server located all around the world. CDN takes the file hosted in the original server and copy the fie to the other CDN server.

CDN is one technique for Caching.
### Caching.
Creating copy of data which can be refetched faster in future.

Mking network request is expensive. So browser cache the data in the disk.

Reading from the disk is expensive so computer copy it in memory RAM.

Reading memory is expensive so OS copy a subset of it in L1,L2 and L3 CPU cache.
### IP Address.

### TCP/IP.
Internet PRotocol Suite.
> It includes IP, TCP, UDP.

When Sending file it is send as a packets. When arrived then the packets gets arranged as a number. If one packets is missing TCP ensures the packet is resend.

Other protocol like HTTP, WebSockets are build on top of TCP.
### DNS.
It is a decentralized service. Converts the domain to an IP address.

When we buy the Domain from the DNS Registrar we can create a DNS A record which is the address and then set the IP address for the server.

When we search for any website the request makes a DNS query to get the IP address and it will use the A record mapping to get the IP address then the OS will cache it. So it does not have to make the DNS query every single time.
### HTTP.
TCP is low level. We donot have to take care of the packets. We have **Application level Protocol** HTTP.

We send the request and contains 2 parts *Request Header* and *Request Body*

With HTTP we can follow multiple API patterns like REST, GraphQL, gRPC.
### REST.
It makes the HTTP stateless and consistent guideline like 200 code 400 code.
### GraphQL.
Introduced by Facebook in 2015.

Instead of making another request for every single time like REST. In GraphQL we make a single request like single query and you can choose the resource we want to fetch.
### gRPC.
It is considered as Framework. Released by Google in 2016.

It is RPC framework. It is mainly used for the server to server communication.

It is gRPC web which allows using gRPC from the browser.

The performance boost come from the **Protocol Buffers**. REST API uses JSON.

In Protocol Buffer the data is serialized into a binary number. Storage efficient and can be send faster.
### WebSockets.
It is an Application Layer Protocol.

In chat application we get the real time message. If it uses HTTP then we need to use Polling and everytime check if any data present. This will take time.

Websocket uses bidirectional messaging. When get the message it immediately push to the receiver.
### SQL.
### NoSQL.
Types of NoSQL.
> Key-VAlue Store - DynamoDB.
>
> Document Stores - MongoDB.
>
> Graph Database - Neo4J.


### Sharding.
If we donot have to enforce any foreign key then we can break up the database and scale horizontally to the machine. This is Sharding.

Using shard key we decide which portion of the data will be present in which machine. Shard key can be the ID. Simple Approach is replication.
### Replication.
### CAP Theorem.
### Message Queues.
