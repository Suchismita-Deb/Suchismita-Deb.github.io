+++
title = 'Design Idempotent Concurreny Handling'
date = 2025-01-02T01:45:20+05:30

url= "/post/systemdesign/HLD/designIdempotentConcurrentHandling"
tags = ['high level design','system design']
categories = ['system design']
+++



Concurrency - One resource and multiple user access the resource.  
Booking a seat in movie ticket and multiple user are trying to book the same seat.

Idempotency - It helps us to take care of the duplicate resources. Idempotency enables the clients to safely retry an operation without worrying the side effect of the operation can cause.

Example - User want to add one item in cart and make a post request. The operation makes a new row in the db. When there are same operation then it will create row and it will impact.

By default - get, put, delete is Idempotent.

Post is not idempotent and we have to make it idempotent.

How the post can make duplicate value.

When one client make one request some time out and server processed the value. User making another request then it should not impact.

When multiple post requests came at same time then it will create error.
How to handle the idempotency data.

There should be an Idempotency key. There are two aggrement with the client.

Client should generate the Idempotency key and for each operation new Idempotency key should be generated.

Client -> send a post and generate a IK and set in the request header -> It will call the server -> Server made the POST /addItem and it will get the IK in the header -> Server will validate if the IK is not present then HTTP 400 error and if present then server will read the IK in the db and if not present then add the data and put the IK in the db and operate the addItem and change the Ik to consume and HTTP 201 and if IK present (say there is a server timeout and user made the request and user created a duplicate request) then IK will be same and it will be in db and it will see the IK status (consumed means when it is already used and request is completed and created means not completed and it is still in processing HTTP 409 conflict some resource is lareday processing)

IK lifecycle - Created/Acquired -> Consumed/Closed.


What is the process in parallel user and more user calling the process and post item.  
Both request will read the IK form the db and it will get the value no then bothe will create the IK and then it will consume it. The requests will create and it will create a duplicate value.

It is solved by using the mutual exclusion lock. Identify the critical section. Ways to create a lock like mutex and semaphore.

Acquire the lock and release the lock.

Follow Up -- what will happen to the lock when the data is in different db and one request store in one db and another request stored in another?
Using cache and cache synchronization is in sec and db synchronization is in minute. The lock set on the cache and the data will be taken with one thread.