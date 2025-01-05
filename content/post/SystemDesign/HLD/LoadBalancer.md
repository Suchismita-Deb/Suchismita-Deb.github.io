+++
title = 'Load Balancer'
date = 2024-12-24T08:26:36+05:30
url= "/post/systemDesign/hld/loadbalancer"
tags = ['interview question', 'system design']
+++

## Load Balancer.

It distributes the load to the application and there are two types **Application L7 load balance** (modern) and **Network L4 Load Balancer** (faster).

Application is layer 7 in the OSI model and Network is the layer 4 in OSI Model.

The main difference between Application and Network Lead Balancer is Application loadbalancer can read the header/session/data/response. It takes dicision to distribute the traffic based on the data. It can also do the caching as it can store the response.  
Loadbalancer can also be used for caching.

Network has the TCP port, IP port and based on it it source the request to the server. It is faster.

There are many algorithm.  
>**Static Algorithm** - Round Robin, Weighted Round Robin, IP Hash.  
**Dynamic Algorithm** - Least Connection, Weighted Least Connection, Least Response Time.

### Round Robin.

It will assign the request to one server then to the next one then to the other one. It will simple count and assign the request to the server sequence.

**Advantage** - Very easy implementation. Equal load distribution to all the servers.

**Disadvantage** - One server with high capacity and another wit low capacity will be treated the same.
Change that low capacity server will go down because of overload of requests.

### Weighted Round Robin.

In round robin the issue was that it assign both for high and low as same. Here we use the weighted as server one can take more request and 3 time more capacity so weighted as 3 and server 2 is weighted as 1.

When request come it will be assigned and 3 requets will assign to server 1 then request will be assigned to server 2.

**Advantage** - Low capacity serevr will get saved from recieving large number fo requests. Easy to implement as weights are static and no dynamic computation.

**Disadvantage** - If request have differet processing time, then its possible that low capacity server get high processing requests and get overburdened.

When the low processing server gets the high processing task then it will wait.

### IP Hash.

Every client has an ip address. Loadbalancer uses the hash to compute the hash number from the IP address and then send the request to the hash number to the server.

Same client goes to the same server.

**Advantage** - Good for use cases, where same client need to connect to the same server.

Easy to implement.

**Disadvantage** - If clients request is coming through PROXY then all teh clients will have the same source IP Address and there will be OVERLOAD on one server.

Cannot ensure equal distribution. The hash number genearted by hash function can give more load to one server.

### Least Connection.

When request comes to the loadbalancer then it see the server and the active connection. Say server 1 has 3 active connection and server 2 has 1 actve connection. When new request comes it wil point to server 2.

Load Balancer will send the request to the server that has less active connection.

**Advantage** - Dynamic. It only consider the load on each server, so chance of overburdened of the server is less when each serevr has equal capacity.

**Disadvantage** - TCP connection can be ACTIVE but possible have no traffic. So purpose is failed.

Say active connection is there and in server 1 there is not much request and one server which has less active connection and more request is coming in that connection. The least connection will connect server 2 then the purpose is failed.

No difference between low capacity and high capacity server. Chance that low capacity server will get over burdened.

### Weighted Least Connection.

There is an assigned weight. It calculate the ratio of the number of active cnnections to its weight. Server with minimum request get the request.

### Least Response Time.

TTFB - Time to First Byte - Time interval between sending a request and receiving the response from the server.

Load Balancer picks the server which has less (Active Connection \* Least TTFB), when the value is same follow round robin.

Say Server 1 - TTFB - 3, Active Connection - 2, Server - 1.

Server 2 - TTFB - 1, Active Connection - 4, Server - 2.

Server 3 - TTFB - 2, Active Connection - 0, Server - 3.

Server 1 has the value 6, Server 2 has the value 4, Server 3 has value 0. The least one meaning Server 3 will get the request.
### Top 6 types of Load Balancer
![img.png](/images/img8.png)
