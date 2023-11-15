+++
title = 'Strategy Design'
date = 2023-11-12T03:05:52+05:30
+++



### UML Class Diagram

![img.png](/images/img3.png)

The example of the Strategy Design Pattern.

![img.png](/images/img4.png)

When the child class inherits the parent class property then it is good. When the child class write its own property and two or more class has the same property then there is duplication of code.

This code is not reusable. There can be many method like *speed limit*, *fuel capability*, *seat capability*, *display* then we have to write for all the child classes.

When child override the method and other child also have the same method then there is code duplicate issue. This is solved by **Strategy Design Pattern**.

![img.png](/images/img5.png)

Previously all the functionality we were putting in the base class. Now we will not define in the base class. We will say that the **Vehicle HAS - A drive interface** 

In the base class we just defined the Drive Strategy Object. The type of the drive strategy like normal or special that will be defined by the child class.

We created one constructor in the vehicle which will put the value to the object. This is **Constructor Injection**.
The functionality will be given by the child class will be passed in the constructor. It will be assigned by the constructor.

In the drive method will only call obj.drive() this will call the drive method of the object.

### Without the Strategy Pattern.
```java
public class Vehicle {
    public void drive(){
        System.out.println("Normal Drive Functionality.");
    }
}
```
```java
public class SportsVehicle extends Vehicle{
    @Override
    public void drive() {
        System.out.println("Special Functionality.");
    }
}
```
```java
public class OffRoadVehicle extends Vehicle{
    @Override
    public void drive() {
        System.out.println("Special Functionality.");
    }
}
```
```java
public class PassengerVehicle extends Vehicle{
}
```
### Using the Strategy Pattern
In a strategy package, there is DriveStrategy, NormalDriveStrategy and SpecialDriveStrategy.
```java
public interface DriveStrategy {
    void drive();
}
```
```java
public class NormalDriveStrategy implements DriveStrategy{
    @Override
    public void drive() {
        System.out.println("Normal Drive Strategy.");
    }
}
```
```java
public class SpecialDriveStrategy implements DriveStrategy{
    @Override
    public void drive() {
        System.out.println("Special Drive Strategy.");
    }
}
```

In the Vehicle class.
```java
public class Vehicle {
    DriveStrategy driveObject;
    // Will not make like new NormalDriveStrategy. It is only the object of DriveStrategy.

    // Constructor Injection.
    Vehicle(DriveStrategy driveObj){
        this.driveObject = driveObj;
    }

    public void drive(){
        driveObject.drive();
        // It will call the drive method of the driveObject.
    }
}

```
```java
public class PassengerVehicle extends Vehicle{
    PassengerVehicle(){
        super(new NormalDriveStrategy());
    }
}
```
`super(new NormalDriveStrategy())` is calling the constructor of the superclass `Vehicle` and passing an instance of `NormalDriveStrategy` to it.
```java
public class OffRoadVehicle extends Vehicle{
    OffRoadVehicle(){
        super(new SpecialDriveStrategy());
    }
}
```
```java
public class SportsVehicle extends Vehicle{
    SportsVehicle() {
        super(new SpecialDriveStrategy());
    }
}
```
In the main class.
```java
public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new SportsVehicle();
        vehicle.drive();
    }
}
```