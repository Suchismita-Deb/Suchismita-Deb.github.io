+++
title = 'PatternMicroserviceImportant'
date = 2024-09-19T20:45:41+05:30
tags = ['interviewQuestion']
categories = ['java', 'microservice']
+++

### Types of Coupling.

| Types                | Description                                                                                |
|----------------------|--------------------------------------------------------------------------------------------|
| **Content Coupling** | One class can access the private member of another class. Java does not allow.             |
| **Common Coupling**  | Two classes access the same shared data that is the global variable and static properties. |
| **Control Coupling** | When a function controls the flow of another function.                                     

### On a white board draw a system based on microservice architecture.

#Todo Image

### What is blast radius in microservices.

The concept of blast radius refers to how badly the entire system will be affected if one microservice crashes or
becomes unavailable.

In monolithic applications the blast radius is 100%.

If part of the application encounters a fatal error, for example, you divide a number to zero. If you don't do any error
handling, your entire application will crash. If the database becomes unavailable, either because it crashes or because
there is a network misconfiguration or it gets overloaded.

For any of those reasons, the entire application is going to stop working in the microservices architecture.

However, we aim at reducing the blast radius with some patterns that are normally called patterns of resilience. Some of
these patterns include independent database for each microservice. We don't share databases across multiple
microservices, each microservice must have its own database and must have all the information that it needs to function,
and that helps with reducing the blast radius.

Timeouts - If you make a point to point API call, you need to apply timeouts and you don't wait forever for that other
microservice to respond.

Backoff strategy is a kind of retries where you make a call to an API. Wait for 2 sec then 4 sec then 8 sec then retry.

Circuit Pattern.

Bulkhead Pattern.

Fallback pattern is basically if you cannot handle a request, you just hand the request over to another microservice
that can handle the request, but not in an ideal situation.

So sometimes we will have like backup microservices that can do few things just to keep the system alive, but they are
not meant to have the full functionality.

Asynchronous communication is preferred because it helps with resiliency and reducing the blast radius.

So if you remember in the previous lecture we mentioned that if there are two services, service A and

Service B, if we call the service B directly from service A, if service B becomes unavailable, then

service A is going to break because obviously you make an API call, the other end doesn't respond in the network and you
get a fatal error.

Asynchronous communication will fix this problem by basically having an intermediate level that mediates between the two
services and microservice A will raise an event.

Microservice B subscribes to the event stream and gets it.

Now if say, Service A was unavailable, the worst thing that could happen was that new users couldn't

be created, but the system would keep working with the existing users in it.

So as you see, it's more resilient compared to when one of the services is unavailable and we expect direct
communication to happen between the two microservices.

### What is Circuit Breaker Pattern?

Applies to the API call like point to point and not in the event streaming services.

We set a threshold for how many times the API call to a given microservice can fail. For example, we can set it to a
number such as three, and then if the API calls fails then we reject any further API calls to that microservice.

And to do that we create a microservice that is basically called the circuit breaker microservice and we put it in front
of the target microservice and that acts as a proxy.

It can have three states open, closed and half open. Closed is the one that we always want. Open means that the circuit
is open and we cannot pass the API calls to the target. Half open means that sometimes we send the request to
microservice, sometimes we reject them and we do that to keep the microservice running but close to the threshold.

![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/OpenCircuitBreaker.png)

Circuit breaker passes the request to supplier and then supplier returns the value to circuit breaker and then circuit
breaker passes it back to client.

So it acts as a proxy.
![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/ClosedCircuitBreaker.png)
In open it respond that there is some error and try again.
In half it send respond to half of the request.

So this is the theory in reality, because if you want to have one circuit breaker per microservice, then there will be
double the number of microservices.

And also having one centralized circuit breaker service is not a good idea because we are going to have one single point
of failure.

Microservices can have circuit breaker built into them.

So the best situation would be when you mix and match two patterns, you would have circuit breaker for key microservices
that they are not supposed to get overloaded by any means. For example, say payment service.

But then for other microservices maybe you just create a built in mechanism for circuit breaking.

### Name some ways or architectural styles of building microservices.

Simple way of deploying microservice.
**Single-tenant micro service** - One micro service on one virtual server. Good for migrating monolith to microservice.
**Containerised Microservice** - Each microservice runs as a docker container. We can containerize microservices using
Docker and deploy them. It need some kind of orchestrator example Google's Kubernetes.

**Serverless** - In this technology there are no servers or there is no containerization. Small microservice deploy them
to your cloud provider, for example, to Amazon Web Services, and then cloud provider runs that code for you in their own
infrastructure and you won't need to maintain any infrastructure for that.

### What is the difference between the event and message?

Message has two parts - Event and Command.

Message in the context of microservices, we are normally talking about commands.
|Event|Command|
|---|---|
|Event is something that has already happened in the past. The order cannot be changed.| Command has not happened. We
ask to be done. Order and priority can be changed. Can be send via API calls or a message broker.|
|Apache Kafka|RabbitMq, ActiveMQ|

![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/KafkaRabbitMqExample.png)

### What is a Distributed Transaction.

Each microservice has its own database and there is no shared database, and because there is no shared database, we
cannot use the traditional transaction also referred to as acid transactions.

We need to make sure the transaction are ATOMIC in all services which means that all the databases at the end of the
transaction will be in a trustworthy transaction state, which means that if you, for example, have an order, the order
is in order service database and its related payment is in the payment database and everything is in a reliable state.

Managing transactions across multiple services is called distributed transaction and also it is referred sometimes to as
eventual consistency because as we said, eventually we want everything to be consistent and atomic.

![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/DistributedTransactionMonolithMicroservice.png)

There are a few ways of handling distributed transaction and two of them are the main ones.

2PC two phase commit transactions. Not recommended.

SAGA Pattern.

### What is Two-Phase commit or 2PC Pattern?

2 phase commit pattern is widely used in database systems because it's a very strong transaction and sometimes it's
useful in microservices only when there are only few microservices involved in building the system.

It has a Prepare Phase and Commit Phase.

So to start the transaction, microservices are asked to prepare for change, and that is called the prepare phase.
Example create a record in the database and set its status field or column to 0.

We make our update and then microservices are asked to make the final and actual change, which is the commit phase.

And in this phase, after making all the actual updates, we set the value of that status field or column to one or to
true, which means that the record is stable and it can be used.

There are multiple microservice in the system and a coordinator microservice is needed in order to maintain the
lifecycle of the entire transaction.

Successful 2PC
![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/Successful2PhaseCommit.png)
Failed 2PC
![alt text](/images/Java/InterviewQuestion/Microservice/PatternMicroserviceImportant/Failed2PhaseCommit.png)
### What is SAGA Pattern?

Saga Pattern is an asynchronous way of managing distributed transactions.

2 phase commit pattern we have to wait for the other microservices to send us acknowledgement and then we determine the
final state of the transaction.

In saga pattern, every microservice is responsible for managing its own transaction and then there is no waiting for the
microservices to finish the transaction.

There are two sub patterns Choreography pattern.
Orchestration patterns.

Choreography pattern - If something goes wrong, microservie have to tell the upstream previous microservices to roll
back the transaction.

Orchestration patterns - A central microservice delivers the message for the roll backs.

### Explain Choreography Pattern.

We do this in the context of managing distributed transactions. In this example, we have order microservice and we have
customer microservice. So order microservice creates an order. And when it does create an order, it manages the
transaction in the traditional way within the database. And once it's done, it raises an event called order created
normally between these two microservices. There will be an event streaming platform such as Apache Kafka. We have
removed that detail just to simplify things and make them more understandable. So once the order created event is
raised, customer microservice is subscribed to that event streaming platform and receives that order created event and
then goes and tries to create a new transaction in its own database, update the fund or balance of the customer and then
finishes the operation.

# Todo Image.

Now if something goes wrong. So order microservice creates the order. It raises the order created event and customer.
Microservice receives that event and tries to update the funds. But then something goes wrong. For example, the customer
doesn't have enough balance. The credit card doesn't work for any reason. The transaction cannot be committed
successfully. In that case, customer microservice has to know of the upstream microservice, which in this case is the
order microservice about the failure and then order. Microservice has to compensate for that problem. Either removes the
record from the database or does something that neutralizes whatever change it had made before. So as you see in
choreography pattern, there is no orchestrator in between these two microservices. They have to communicate directly
somehow, and the logic of managing the transaction is scattered across all the engaged microservices.

