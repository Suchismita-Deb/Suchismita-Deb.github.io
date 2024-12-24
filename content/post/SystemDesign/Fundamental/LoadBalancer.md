+++
title = 'LoadBalancer'
date = 2024-12-24T08:26:36+05:30
url= "/post/systemDesign/fundamental/loadbalancer"
tags = ['interview question', 'system design']
+++

## Load Balancer.

It distributes the load to the application and there are two types Application L7 load balance (modern) and Network L4 Load Balancer (faster).

Application is layer 7 in the OSI model and Network is the layer 4 in OSI Model.

There are many algorithm.
Static Algorithm - Round Robin, Weighted Round Robin, IP Hash.
Dynamic Algorithm - Least Connection, Weighted Least Connection, Least Response Time.

### Round Robin.

It will assign the request to one server then to the next one then to the other one. It will simple count and assign the request to the server sequence.

Advantage - Very easy implementation. Equal load distribution to all the servers.

Disadvantage - One server with high capacity and another wit low capacity will be treated the same.
Change that low capacity server will go down because of overload of requests.