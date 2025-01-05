+++
title = 'Design Distributed Message Queue'
date = 2025-01-04T21:55:32+05:30

url= "/post/systemDesign/designexample/designdistributedmessagequeue"
tags = ['interview question', 'system design']
+++
Cons - Makes it harder to deal with other service failure. What to do with faied request? retries?

Is there too many request ?

When I need the other microservice to give the response faster.

Queue - Producer and Consumer microservice.
Producer send data into the queue and the consumer gets the data.

Queue and topic are different.
In topic message is send to all the subscriber.
In case of queue message is recieved by only one consumer.

In making message queue.
Functional Requirement - sendMessage(messageBody) and receiveMessage()  
Additional - deleteMessage() and ordering the message and noDuplicateMessage() functionality.

Non Fuctional Requirement.  
Scalable - handle load increases, more queues and messages.
Highly Available - survives hardware or network failures.
Highly performant - single digit latency for main operation.  
Durable - once submitted data is not lost.

Not completed.