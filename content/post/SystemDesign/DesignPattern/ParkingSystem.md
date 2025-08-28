+++
title = 'Parking System'
date = 2024-02-13T20:02:12+05:30
tags=['system design']
+++


# Functional Requirement
- Multilevel Parking Lot.
- Multiple Category of parking space. (Hatchback, Sedan, Suv, electric vehicle separate slot so that they can charge, bus or big vehicle all type of car.)
- Multiple Entry and Exit(Concurrency).
- Should not allow more vehicle than allocated space for each category.
- Charge should be hourly basis.
- Display the available number of parking for each category at the entry time.

User will go to the ticket counter to collect the ticket.
The guy in the counter will entry the vehicle number and the category of the car and see if the space is allocated for the car using the `spaceAllocationService`
The `ticketCounterService` is also there in the exit time which will take the ticket from the user and see the entry time and calculate the payment. The api will call the `paymentService`. The payment will be done. We will only build the charge system.
Basic classes that is going to be there.
- Class for the `parkingLot`-> `parkingFloor`
- `parkingFloor` will be composed as part of the `parkingLot`.
- Each floor has some lots. These lots are actual parking space.



Model should contain `ParkingSlotType`, `Vehicle`, `VehicleCategory`.

In th Address.java.
```java
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@Builder
public class Address {
    String street;
    String block;
    String city;
    String state;
    String country;
}
```
In ParkingFloor.java
```java
public class ParkingFloor {
    String name;
    // Name of each floor like floor 1, F1 or alphabet.
    Map<ParkingSlotType,Map<String,ParkingSlot>> parkingSlots;
    // The map will contain the type of the parking and the map of name of the parkingslot and the ParkingSlot object.
    // ParkingSlotType is an enum.
    // In place of map we can use list also but we need to search so map will be faster.
    // Constructor.
    public ParkingFloor(String name, Map<ParkingSlotType,Map<String,ParkingSlot>> parkingSlots){
        this.name = name;
        this.parkingSlots = parkingSlots;
    }
}
```
In ParkingSlot.java.
```java
@Getter
@Setter
public class ParkingSlot {
    // The actual parkingSlot where the vehicle will be parked.
    String name;
    @Builder.Default
    boolean isAvailable = true;
    Vehicle vehicle; 
    ParkingSlotType parkingSlotType;
    // This will tel which vehicle will be parked in which slot.

    // Constructor.
    public ParkingSlot(String name, ParkingSlotType parkingSlotType){
        this.name = name;
        this.parkingSlotType = parkingSlotType;
    }

    // We have two methods for the parkingslot like addVehicle and removeVehicle. Only the two things can be done in ParkingSlot individually.
    protected void addVehicle(Vehicle vehicle){
        this.vehicle = vehicle;
        this.isAvailable = false;
    }
    protected void removeVehicle(Vehicle vehicle){
        this.vehicle = null;
        this.isAvailable = true;
    }
}
```
In ParkingSlotType.java
```java
public enum ParkingSlotType {
    TwoWheeler{
        public double getPriceForParking(long duration){
            return duration*1;
        }
    },
    Compact{
        public double getPriceForParking(long duration){
            return duration*1.5;
        }
    },
    Medium{
        public double getPriceForParking(long duration){
            return duration*1.75;
        }
    },
    Large{
        public double getPriceForParking(long duration){
            return duration*2;
        }
    };
    public abstract double getPriceForParking(long duration);
    // We have the abstract method to calculate the price.
}
```
In ParkingSystem.java
```java
public class ParkingSystem {
    private String nameOfParkingLot;
    private Address address; // To get the address of the parkinglot.
    private List<ParkingFloor> parkingFloors; // ParkingLot should contain lists of parking floor.
    // This will tell how many floors are present in the parking lot.
    private static ParkingSystem parkingSystem=null;

    private ParkingSystem(String nameOfParkingLot, Address address, List<ParkingFloor>parkingFloors){
        this.nameOfParkingLot = nameOfParkingLot;
        this.address = address;
        this.parkingFloors = parkingFloors;
    }

    public static ParkingSystem getInstance(String nameOfParkingLot, Address address, List<ParkingFloor> parkingFloors){
        if(parkingSystem==null){
            parkingSystem = new ParkingSystem(nameOfParkingLot, address, parkingFloors);
        }
        return parkingSystem;
    }
    // Method is getInstance, there should be only one instance as it is singleton.
    // There is only one ParkingLot.
    // Adding more florrs to the parkinglots.
    public void addFloors(String name, Map<ParkingSlotType,Map<String,ParkingSlot>> parkSlots){
        ParkingFloor parkingFloor = new ParkingFloor(name, parkSlots);
        parkingFloors.add(parkingFloor);
    }

}
```
In Vehicle.java
```java
@Getter@Setter
@EqualAndHashCode
public class Vehicle {
    String vehicleNumber;
    VehicleCategory vehicleCategory;
    // Similar to the parkingSlot category there is a vehicle category.
}
```
In VehicleCategory.java
```java
public enum VehicleCategory {
    TwoWheeler,
    HatchBack,
    Sedan,
    SUV,
    Bus
}
```