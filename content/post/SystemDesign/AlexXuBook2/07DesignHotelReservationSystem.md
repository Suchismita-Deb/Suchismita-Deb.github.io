+++
title = 'Design Hotel Reservation System.'
date = 2025-07-28T10:10:46+05:30
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
API design is not the crutial it is an entire system. There are feature like search for room based on many large array to include all criteria. The API for the search feature is not implemented.

__Hotel Related API.__

> GET - **/v1/hotels/ID** - Get the information about the hotel.
>
> POST - /v1/hotels - Add new hotel. Only to the admin.
>
> PUT - /v1/hotels/ID - Update hotel information. Only to the admin.
>
> DELETE - /v1/hotels/ID - Delete a hotel.

__Room Related API.__

> GET /v1/hotels/ID/rooms/ID Get the detailed information about the room.
>
> POST /v1/hotels/ID/rooms Add a room. Only to the admin.
>
> PUT /v1/hotels/ID/rooms/ID Update room information. Only to admin.
>
> DELETE /v1/hotels/ID/rooms/ID Delete a room. Only to admin.

__Reservation Related API.__
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/ReservationRelatedAPI.png" alt="UserRequest." caption="Reservation Related API">}}

The requets to make a new reservation - POST - /v1/reservations - the request parameter.
```json
{
  "startDate":"2023-04-28",
  "endDate":"2023-04-30",
  "hotelId":"245",
  "roomId":"U12345",
  "reservationID":"13422445"
}
```
The reservationID is used as an Idempotency key to prevent double booking - meaning multiple reservation made for the same room on the same day.

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
### High Level Design.
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/UniqueConstraints.png" alt="UserRequest." caption="UniqueConstraints">}}
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/RaceCondition.png" alt="UserRequest." caption="RaceCondition">}}
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/PessimisticLocking.png" alt="UserRequest." caption="PessimisticLocking">}}
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/OptimisticLocking.png" alt="UserRequest." caption="OptimisticLocking">}}
{{<figure src="/images/SystemDesign/DesignExample/HotelReservationSystem/HotelReservationSystemSummary.png" alt="UserRequest." caption="HotelReservationSystemSummary">}}
221 page.
