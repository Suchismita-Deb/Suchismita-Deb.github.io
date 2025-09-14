+++
title = 'Design Hotel Reservation System.'
date = 2025-07-28T10:09:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignHotelReservationSystem"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++
Similar to other booking system - Airbnb, Flight Reservation System, Moviw Ticket Booking system.  
### __Understand the Problem.__
Ask valid question to the interviewer.  

Scale of the system - Buiding a website for a hotel chain with 5000 hotels and 1 Million rooms in total.  
Payment by customer during resrevation or after arrival - Customer pay the full when they make the reservation.  
Rooms only booked by the hotel website or other website - Only hotel website. Customer can cancel reservation.

Other thing - 10% over booking - meaning sell more rooms than they have - customer will cancel their reservation.  
Hotel room search is not in scope.



Show the hotel-related page.  
Show the room detail page.  
Reserva a room.  
Admin panel to CRUD hotel or room info.  
Support overbooking feature.

Hotel price change dynamically depending on how full th hotel is expected to be on a day. Price will be differnt each day.

__Non-Functional Requirement__  
High Concurrency - In peak hours people will book same room.  
Moderate latency - Ideal to have fast response when customer book but acceptable to take time to process the request.

__Back-of-the-envelope Estimation.__  
5000 hotels and 1 million rooms in total.  
Assume 70% of the rooms are occupied and the average stay duration is 3 days.  
Estimated daily reservation = (1 million \* 0.7)/3 = 233,333 ~ 240K bookings.  
Reservation per second = 240K/10^5 seconds in a day ~ 3.  
The average reservation transaction per second(TPS) is not high.

The calculation of Query per second QPS of all pages in the system. 

There are 3 steps in the customer flow.  

View hotel or room page(query).  
View the booking page. User can confirm the booking detail like date, number of guests, payment information befor ebooking(query).  
Reserve a room. (transaction).

Assume 10% user reach the final step and 90% drops of the flow before reaching the final step.

No prefetching feature - prefetching the content before the user reached the next step is implemented. The final reservation TPS is 3 so we can work backward along the data.

View hotel         = QPS = 300   
Order booking page = QPS = 30.  
Reserve room       = QPS = 3.

### __High Level Design.__

### API Design.
API design is not the crucial it is an entire system. There are feature like search for room based on many large array to include all criteria. The API for the search feature is not implemented.

__Hotel Related API.__

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/HotelRelatedAPI.png" alt="UserRequest." caption="Hotel Related API">}}

__Room Related API.__

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/RoomRelatedAPI.png" alt="UserRequest." caption="Room Related API">}}

__Reservation Related API.__
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/ReservationRelatedAPI.png" alt="UserRequest." caption="Reservation Related API">}}

The requests to make a new reservation - POST - /v1/reservations - the request parameter.
```json
{
  "startDate":"2023-04-28",
  "endDate":"2023-04-30",
  "hotelId":"245",
  "roomId":"U12345",
  "reservationID":"13422445"
}
```
The reservationID is used as an Idempotency key to prevent double booking - meaning multiple reservation made for the same room on the same day. The idempotency key can be anything and here the reservation_id is matching the design.

### Data Model.

The data access and the requierement the db should support like - View detail information about the hotel, Available room types in a date range, record a resrevation, look ip a reservation or past hostory of reservation.

The scale is not large but need to handle traffic surge in event. We can go ahead with relational database.

A relational db work well with read heavy and write less workflow - number of user in the website is higher than those who make the reservation. No SQL is optimised for writes and SQL is optimized for the read-heavy workflow.

Relational db provides ACID properties - it is helpful to prevent negative balance, double charge, double reservation. The structure of the data is very clear and the relationship between different entities is stable. It is easy to model in the relational database.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/DatabaseSchema.png" alt="UserRequest." caption="Database Schema.">}}


The status field in the reservation table can be pending, paid, refunded, canceled, rejected.


The design is good for Airbnb as room_id is already given when users make reservations. It is not the case for hotel. A user reserve a type of room in a hotel instead of specific room like standard, king size, queen size. Room number id given when user check in and not at the time of reservation. Updated design is added.
### __High Level Design.__

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/HighLevelDesignHotelReservationSystem.png" alt="UserRequest." caption="HighLevelDesignHotelReservationSystem.">}}
User booking from mobile or laptop. Admin perform task like refunding customer, cancel reservation. Public Api fully managed services support rate limiting, authorization. Internal API are accisible to admin. They are protected by a VPN.  
Hotel Service provide detailed information on hotels and room and static can be cached.  
Rate Service provides room rates for different future date depending on the demand.  
Resrevation Service reserve the room. It also tracks room inventory as reservation are canceled.  
Payment Service update the reservation as paid once payment is succeeded or rejected if fails.  
Hotel Management Service only to teh admin to view the record of upcoming reservation, reserve a room for a customer, cancel a reservation.
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/ConnectionBetweenServices.png" alt="UserRequest." caption="Connection Between Services.">}}
There are many relation between the service. Reservation Service queries Rate servie for room rates. It compute the total number of room charge for a reservation.

In Production system, inter-service communication managed by Remote Procedure Call RPC like gRPC. 

### __Design Deep Dive.__

Imp things to notice -  
Improved data model.  
Concurrency Issues.  
Scaling the system.  
Resolving data inconsistency in the microservice.

__*Improved data model.*__
We will select the type of room and not room. The API should change and the roomId should be replaced by roomTypeId in the request parameter.  
POST /v1/reservations  The parameter.  
```json
{
  "startDate":"2023-04-28",
  "endDate":"2023-04-30",
  "hotelId":"245",
  "roomTypeId":"12345",
  "reservationID":"13422445"
}
```
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/UpdatedSchema.png" alt="UserRequest." caption="Database Schema.">}}
room - contains informaion regarding room.
room_type_rate - price for a room typr on specific dates.  
reservation - records guest reservation data.  
room_type_inventory - store inventory data about hotel rooms. It is importantfor reservation system. The column inside the table - total_inventory - the total room minus those that are temporarily taken off the inventory. Some might be under maintenance.  
total_reserved - total number of rooms booked for the hotel_id, room-type_id, date.

Other way we can design the room_type_inventory table - one row per date is easy to to manage reservations within date range and queries. The hotel_id, room-type_id, date is a composite primary key.  
The row of room_type_inventory is prepopulated by quering the inventory data across all future date within 2years. Daily job that prepopulate the data when the date advance.

Assume 5000 hotels and each has 20 types of rooms.  
5000*20 types of rooms * 2 years * 365 = 73 million row.  
A single database is enough to store it. To increase availability the database is replicated across multiple regions or availability zones.


{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/SampleData.png" alt="UserRequest." caption="Sample Data of the room_type_inventory table.">}}
The table is used to verify if a customer can reserve a specific room type or not.

Input - startDate(2023-07-01), endDate(2023-07-03), roomTypeId, hotelId, numberOfRoomsToReserve.  
Output - True (user can book it).
```sql
SELECT date, total_inventory, total_reserved 
FROM room_type_inventory
WHERE room_type_id = ${roomTypeId} AND hotel_id = ${hotelId}
AND date between ${startDate} and ${endDate}
```
The query data will give output.
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/Inventory.png" alt="UserRequest." caption="">}}
Each entry the application condition is used.
`if((total_reserved+${numberOfRoomsToReserve}) <= total_inventory)`

10% overbooking.
`if((total_reserved+${numberOfRoomsToReserve}) <= 110 * total_inventory)`


Counter Question - _Reservation date is too large for a single database._

Store only current and future reservation date. Reservation history is not frequently used. They can be archived and some can be moved to cold storage.  
Database sharding - The most frequent queris - making a reservation and looking up reservation by name - the hotel name is first thing. Sharding key - hotel_id. The data is sharded by `hash(hotel_id)%number_of_servers`

### __Concurrency Issue.__  
Another important part - double booking.  

The same user clicks on the book button multiple times.  
Multiple user try to book the same room at the same time.
### Two reservation made concurrently.
Client Side Implementation - Grey out, diable the button once request is sent. It is not reliable - user can disable javascript thereby bypassing the client check.  

Idempotent APIs - Add an idempotency key in the reservation API request. The idempotency key `reservation_id` to avoid the double-reservation issue.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/UniqueConstraints.png" alt="UserRequest." caption="UniqueConstraints">}}


1. Generate the reservation order - customer enter the room type, check_in date, check-out date and click on continue and it is generated by reservation service.  

2. The system generate the order, the reservation_id globally unique ID and return.

3a. Submit reservation 1. The reservation_id - included in the requests is the primary key for the table.  

3b. User click "Complete Booking" second time reservation2 is submitted. The reservation_id is the primary keyof the table and we can rely on the unique constraint of the key to ensure no double booking happens.
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/UniqueConstraintViolation.png" alt="UserRequest." caption="Unique Constraint Violation.">}}

_What will happen when multiple user book at the same time when one room left?_

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/RaceCondition.png" alt="UserRequest." caption="RaceCondition">}}
User 1 and 2 is booking the last one room. Assume the database isolation level is not serializable.

Transaction 1 and 2 see if room available by the consition `total_reserved + rooms_to_book)<=total_inventory` Since 1 left it return true. Transaction 1 reserves the room and update the inventory. Then transaction 2 reserves the room. The isolation property in ACID - database transaction must complete the task independently from other transactions.  

The data changes by transaction 1 is not visible to transaction 2 until the transaction is completed. T2 see the room available and reserves the room and update the inventory. Now both user booked the same room and commit the changes - The solution is locking mechanism. 

There are - Optimistic locking, pessimistic locking and database constraints.  
The SQL code to reseve a room.
```sql
-- Step 1 Check room inventory.
SELECT date, total_inventory, total_reserved 
FROM room_type_inventory
WHERE room_type_id = ${roomTypeId} AND hotel_id = ${hotelId}
AND date between ${startDate} and ${endDate}

-- For every entry returned from Step 1.
if((total_reserved + ${numberOfRoomsToReserve})>110% * total_inventory){
	Rollback
}

-- Step 2 - Reserve rooms.
UPDATE room_type_inventory
SET total_reserved = total_reserved+${numberOfRoomsToReserve}
WHERE room_type_id = ${roomTypeId}
AND date between ${startDate} and ${endDate}

COMMIT
```
### __Pessimistic Locking.__
Pessimistic Concurrency control - prevent simultaenous update by placing a lock on a record as soon as one user starts to update it - other will wait until the first user has released the lock or commit the change.

In Mysql, `SELECT ... FOR UPDATE` - lock the row returned by a selection query. Transaction 1 started and the other user need to wait for the transaction 1 to finish as it locks the row. After the transaction 1 finish no room to book. 
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/PessimisticLocking.png" alt="UserRequest." caption="PessimisticLocking">}}

Pros.

Prevent updating data that is being or has been changed.  
Easy to implement and avoids conflicts by serializing updates.  
It is useful when data contention is heavy.

Cons.

Deadlock occurs when multiple resources are locked. Writing deadlock-free application code is challenging.  
It is not stable. Any transaction lock for took long other cannot access the resource. It will impact database performance - when transaction are long-lived or involve a lot of entities.  
Not recommended.


__Optimistic Locking.__ 

Optimistic concurrency control allows multiple concurrent users to attempt to update the same resource - 2 ways to implement optimistic locking  - version number and timestamp. Version locking better as server clock can be inaccurate over time.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/OptimisticLocking.png" alt="UserRequest." caption="Optimistic Locking Success case and Failure case.">}}

A new column  called version added. Prior to any modification in db row the bersion number is read.  
When user update the row the application increases the version number by 1and write back to db.  
A database validation check is put in place the next version should exceed the current version by 1. The transaction aborts if the validation fails and again retry.

It is faster than pessimistic lock no lock in database, the performance drop dramatically when concurrency is high.  
Example - When many client try to reserve a hotel room at the same time - no limit on how many client can read the room count all read back the same room count and the current version number.  
When different clients make reservation and write back the results to the database only one succeed and rest will rceive a version failure. They will retry. IN retries there is only one successful client and the rest will retry. The end result is correct but repeated retries cause unpleasant experience.

Pros - It prevents application from editing stale data. No locking of database resource. It is on the application to handle the logic with the version number.  
It is used when the data contention is low. When conflicts are rare and transaction can complete without any expense of managing locks.

Cons - Performance is poor when data contention is heavy.

It is good for hotel reservation since the QPS is not high.

__Database Constraints.__

Similar to optimistic locking. In the room_type_inventory table add the constraints.
```sql
CONSTRAINT `check_room_count` CHECK((`total_inventory-total_resreved`>=0))
```
When user 2 tries to reserve a room, total_reserved exceeds inventory count and the transaction is rolled back.
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/DatabaseConstraint.png" alt="UserRequest." caption="Database Constraint.">}}
Pros.

Easy to implement. It is good when data contention is minimal.

Cons.

Like the optimistic locking when data contention is heavy it can result in a high volume of failures. User can see room available but when they will book they will get "no rooms available" - experience is compromised.  
The database constraints cannot be version-controlled like the application code.  
Not supported by all db. 

Data contention of teh design is not high (low QPS) - good option.

### __Scalability.__

The load of hotel reservation is not high. Follow up question.  

_What is the hotel resrevation system is used not just in hotel chain but for a popular travel site like booking.com or expedia.com?_

The QPS is 1000 times higher.  
System load is high - there are some bottelneck.   
All the services are stateless, they can be easily expanded by adding more servers. The database contains all teh state and cannot be scaled by adding more database.

__Database Sharding.__

One way to scale the db - Database sharding - split the data into multiple databases so that each contain a portion of data.  
We need to consider how to distribute the data - In the data model section - most queries need to filter by `hotel_id` - we can shard data by hotel_id.   
The load can be spread among 16 shards - QPS 30,000 - Each shards handles 30,000/16 = 1.875 QPS - it is under single Mysql servers load capacity.

### __Caching.__
The data has an interesting characteristics - current and future hotel inventory data are meaningful - customer only book rooms in near future.

In the storage - we will have the time-to-live TTL mechanism to expire old data automatically. Hostorical data can be queries in a different database.

Redis is a good choice for the TTL and LRU cache evixtion policy helps us to make optimal use of memory.  
Loading speed and database scalability becomes an issue - we can add a cache layer on top of the database and move the check room inventory and reserve room logic to  the cache layer.  
In the design only small request hit the inventory database as most ineligible requests are blocked by the inventory cache.

One important thing - Even when there is enough inventory shown in Redis - we need to re-verify the inventory at the database side as a precaution. The database is the source of teh truth of the inventory data.

__Reservation Service__ - The inventory API - query the number of room availabel for the given hotel, room type and data range. Reserve a room by execution total_reserved+1. Update inventory when a user cancels a reservation.

__Inventory cache__ - All inventory management query are moved to the inventory cache Redis and we need to prepopulate the inventory data to the cache. The cache is a key-value store with the structure.
```json
key: hotelId_roomTypeID_{date}
value: the number of available rooms for the given hotel ID, room type Id and date.
```
The read to see room availability is more than write. Most read are answered by cache.

__Inventory Db__ - Store the inventory data as the source of truth.

### __New challenges posed by the cache.__
Adding cache increases the system scalability and throughput. New issue How to maintain data consistency between the database and the cache.  
When user book a room - 2 operations are executed in happy path - 

Query room inventory to find room available - runs in the inventory cache.  
Update inventory db - The change is then propagated to the cache asynchronously by the application code which update the inventory cache adter data is saved to the database or using change data capture CDC. CDC is the mechanism that read data changes from the database and applies the changes to another data system. Common solution - Debezium uses a source connector to read changes from the database and applies them to cache solutions like Redis.

Data updated in db forst and cache migh not reflect the latest data. Teh inconsistency between inventory cache and database doesnot matter - as long as teh database does the final inventory validation check.

Example - Cache says room available and database say no and user book it and the request reaches the inventory database - the database does the validation and find no room left and user get the error indicating someone just booked the last room. 

When user refresh the page no room left as the database has synchronised inventory data to the cache.

Pros.

Reduced database load as the read are in cache layer.  
High performance - Read queries are very fast as result are fetched from memory.

Cons.

Maintaining data consistency is hard. 

### __Data Consistency among services.__
In monolithic service - a shared database is used to ensure data consistency. In the microservice design - here it is hybrid by reservation servcie handle both reservation and inventory API so that the inventory and reservation database table are stored in the same relational database. 

The arrangement allows us to leverage the ACID properties of the relational database t ohandle many concurrency issues that arise during the reservation flow.

Interviewer can focus on microservice and each microservice has its own database. 


The design introduces many data inconsistency issue. Issue - In real world there will be many microservcies in the company and in monolithic architecture different operation can be wrapped in a single transaction to ensure ACID properties.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/MonolithicArchitecture.png" alt="UserRequest." caption="HotelReservationSystemSummary">}}
Microservice - each service has its own db - one logical atomic operation can span multiple services. We cannot use a single transaction to ensure data consistency.   
If update ipeartion fails in the reservation database - rollback the resreved room count in the inventory database. There is only one happy path and many failure cases could cause data inconsistency.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/MicroserviceArchitecture.png" alt="UserRequest." caption="HotelReservationSystemSummary">}}
To address the data inconsistency - high level of production system.  

Two-phase commit - 2PC - a database protocol used to guarantee atomic transaction commit across multiple nodes, either all node succeed or all node failed. 2PC is a blocking protocol a single node failure blocks the progress until the ndoe has recovered. It is not performant.

Saga - A Saga is a sequence of local transactions. Each transaction updates and publishes a message to trigger the next step. One step fails - saga executes compensating transaction to undo the changed that were made by preceding transactions. 2PC works as a single commit to perform ACID transactions while Saga consists of multiple steps and relies on eventual consistency.

The complexity is very much for teh design. In this system it is not worth it so decided to go with more pragmatic approach of storing reservation and inventory data under the same relational database.

{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/HotelReservationSystemSummary.png" alt="UserRequest." caption="HotelReservationSystemSummary">}}
