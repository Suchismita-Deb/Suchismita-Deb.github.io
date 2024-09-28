+++
title = 'Design Booking System'
date = 2024-09-27T10:05:46+05:30
tags = ['interview question','system design']
categories = ['low level design','system design']
+++

## How to start with Design.

First the **Use case diagram**. Then the **class diagram** and then the **code**.

Understand the design pattern from the class diagram.
Be comfortable with the design pattern.
To get the idea of the design pattern needs more example and more practice.

## Booking System.
### First the Use case diagram.

> Actor.
>
> Customer.
>
> Fetch flight for a particular src, destination and date.
>
> Reserve a ticket.
>
> Cancel the reservation.
>
> Admin.
>
> Add a flight.
>
> Cancel the Flight.
>
> Seats.
>
> Regular, Extra LegRoom, Emergency Exit.
>
> System.
>
> Fetch flights.
>
> Fix seat.
>
> Cancel Bookings.
### Class Diagram.


In class diagram we have data members and functions.

**Customer.**

> Data Members.
>
> id : String.
>
> name : String.
>
> email : String.
**System.**

System(Instance of system as customer will see the flight and book the flight).
> Method.
>
> fixSeat(Flight flight, Seat seat) : boolean.
>
> cancel Booking(Flight flight) : boolean.
When booking the seat in fixSeat we can have concurrence like user booked 6 seats and 2 of them are already booked then we can pass the seat in the array and return false if we cannot be able to book all the seat.

Else we can book for the remaining and for the 2 seat will ask the user to book other seat.

This is system requirement.

**Admin.**


> id : String.
>
> name : String.
>
> email : String.
>
> System : system.
All these 4 data members are redundant and all other class will use it so we can make a User class and extends the User class in other class.

*When the **data members are only same** then we can use Interface. The **behaviour** is also same then we can use the **class** as it will extends and in interface we need to implement all of them.*

There should be an instance of System. All customer should be able to access the same system. This is used in the **Singleton Design Pattern**.

**System.**

List &lt;Flight&gt; flight;


> Methods.
>
> Fetch flight(src,dest,date) : List<Flight>
>
> fixSeat(Aircraft, seat) : boolean
>
> addingFlight(Flight flight) : boolean.
>
> cancelFlight(Flight flight) : boolean.
When admin add the flight that will add in the db and return boolean.

When flight is cancel then the system will generate refund to all the customer who booked the flight.

**Flight.**
> Date Members.
>
> aircraft: Aircraft.
>
> StartTime:Time.
>
> EndTime:Time.
>
> Src:String.
>
> dest:String.

> Funtions.
>
> CancelForCustomer(customer) : boolean.
One system has so many flights and one flight is using one system. **One to many relation.**
### System 1-* Flight.

Doubt - cancel flight and booking flight should be customer centric here we can see it is system centric?

Mainly system gives some api and functions to perform and the customer workds on those api.

Adding a seat is not in the Flight class it is in the Aircraft class.

Thought Process - A flight going from A to B then admin can send the list of flights. Aircraft will have the seat.

A flight will have the particular Aircraft then this Aircraft cannot be booked by diffrent flight at the same time.

When wants to cancel then it will go to the aircraft and then fetch the flight and it will see the customer data and then the cancel the seat.
**Every flight has its own instance of aircraft.**

** Aircraft.**
> Map<id,seat> seat;
>
> id:String.
>
> fixSeat(Seat,Customer) : boolean.
>
> addSeat(Seat s)
>
**Flight has an instance of aircraft.**

**Seat.**
type:SEAT.
id:String.
Customer:customer.
**Seat belongs to an aircraft and an aurcraft can have n number of seat.**
Seat 1-\* Aircraft.

Which database to use is a part of high level design.

System will be singleton cclass so there will be only one instance.

```java
class System{
    private List<Flight> flights;
    private static System system = null; //( Singleton Design Pattern)

    public Stsrem(){};

    private static System getInstance(){
        if(system==null){
            system = new System();
        }
        return system;
    }

    public List<Flight> fetchFlights(String src, String dst, Date date){
        List<Flight> filteredFlights = new ArrayList<>();
        for(Flight flight:flights){
            if(flight.date == date && (flight.src == src && flight.dst==dst)){
                filteredFlights.add(flight);
            }
        }
        return filteredFlights;
    }

    public boolean fixSeat(Aircraft aircraft, Seat seat){
        aircraft.fixSeat(seat,seat.getCustomer());
    }
    public boolean addFlight(Flight flight){
        // adding the flight in the list and return true.
    }
    public boolean cancelFlight(Flight flight){
        // Get the list of all the seat.
        // Aircraft has the list of all the seat, flight has the instance of the aircraft.
        Map<String, Seat> seats = flight.aircraft.getSeats();
    }
}
```

```java
class Flight{
    public String src;
    public String dst;
    public Date date;
    public Aircraft aircarft;// Every flight has an instane of aircraft and an aircraft has an instance of seat.
    public Time start;
    public Time end;

    public Flight(){};

    public boolean cancelForCutomer(Customer c){
        Map<String, Seat> seats = flight.aircraft.getSeats(); // get the seat and cancel it.
        // Aircraft has the list of seat. We can also put the list of seat in the flight.
        for(Seat seat : seats.values()){
            if(seat.getCustomer() == c){
                seat.setCustomer(null);
            }
        }
        return true;
    }
}
```

```java
class Aircraft{
    private Map<String, Seat> seat;
    public boolean fixSeat(Seat s, Customer c){
        if(s.customer!=null) return false;
        s.setCustomer(c);
        return true;
    }
    public boolean addSeat(Seat s){}
}
```

```java
enum SEAT{
    EMERGENCY,LUXURY,NORMAL
}
class Seat{
    private SEAT type;
    private String id;
    public Customer customer; // Every seat will have a customer. We will get the seat and see the customer name.
    // When booking then will see which seat is empty and will see which seat has a customer and then in the if booke then it will have customer and in the frontend will show the availability.

    // We can have a map of seat and customer.
    private int price;

    public Customer getCustomer(){
        return customer;
    }
    public boolean setCustomer(Customer c){
        customer = c;
        return true;
    }
}
```

```java
class Customer{
    private String id;
    private String email;
    private System system; // Customer will book the ticket and see the seat and it will call the system.
    public boolean fixSeat(Flight flight, Seat seat){
        boolean isBooked = fligt.aircraft.fixSeat(seat,this);
        return isBooked;
    }
    // When booking a seat if the card details and the payment takes time then in that time if any customer booked the seat then it will show not booked for me.
    // The fixSeat will get the customer if !=null then false.
    // One condition in the Aircraft.fixSeat, if it gets the customer and another customer comes then it will get two customer How to handle this case? - Use some locking mechanism, synchronous and locking in the system, enforce ordering of the flow.
    public boolean cancelBooking(Flight flight){
        flight.cancelForCustomer(this);
        return true;
    }
}
```

```java
class User{

}
```

```java
class Admin{

}
```

We can use a Decorator and wrapper in the Seat .
