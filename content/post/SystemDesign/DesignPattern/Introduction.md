+++
title = 'Introduction'
date = 2024-03-07T12:14:32+05:30
url= "/post/systemDesign/designpattern/solid"
tags = ['interview question', 'system design']
+++


![img33.png](/images/img33.png)

![img34.png](/images/img34.png)

S - Single Responsibility Principle - Class should have a single responsibility or purpose.
O - Open-Close Principle - Classes and module should be open for extension and closed for modification. It means that you shoulld be able to extend the behaviour of a class without modifying its exustingcde. We can apply this by using abstration , interfaves and inheritance.

L - Liskov Constitution PRinciple - The LP states that the object if the suerclass should be replacale with ojects of the subclass without affescting the correctness of the program.

I - Interface Segrefation Principle - ISP states that client should not be forces to depend oninterace thet dont use.

D - Dependency Inversion Priciple - DIP - The high level modules or classes should bot depend on low level modules or classes directly.

### UML Class Diagram

![img.png](/images/img3.png)

### Solid Design Principle.

It makes the code Scalable, Maintainable, Testable and Readable.

Single Responsibility Principle - A class should have only one reason to change which means every class should have a single responsibility or single job or single purpose.

Open/Closed Principle

Liskov Substitution Principle

Interface Segregation Principle

Dependency Inversion Principle

Single Responsibility Principle - A baker should only bake the product and should not take care of the inventory, order.
```java
class BreadBaker {
 public
  void bakeBread() { System.out.println("Baking high-quality bread..."); }

 public
  void manageInventory() { System.out.println("Managing inventory..."); }

 public
  void orderSupplies() { System.out.println("Ordering supplies..."); }

 public
  void serveCustomer() { System.out.println("Serving customers..."); }

 public
  void cleanBakery() { System.out.println("Cleaning the bakery..."); }

 public
  static void main(String[] args) {
    BreadBaker baker = new BreadBaker();
    baker.bakeBread();
    baker.manageInventory();
    baker.orderSupplies();
    baker.serveCustomer();
    baker.cleanBakery();
  }
}
```

One class should maintain one thing. It becomes a monolithic block of code that is harder to test and debug.
```java
class BreadBaker {
 public
  void bakeBread() { System.out.println("Baking high-quality bread..."); }
}

// Class for managing inventory
class InventoryManager {
 public
  void manageInventory() { System.out.println("Managing inventory..."); }
}

// Class for ordering supplies
class SupplyOrder {
 public
  void orderSupplies() { System.out.println("Ordering supplies..."); }
}

// Class for serving customers
class CustomerService {
 public
  void serveCustomer() { System.out.println("Serving customers..."); }
}

// Class for cleaning the bakery
class BakeryCleaner {
 public
  void cleanBakery() { System.out.println("Cleaning the bakery..."); }
}

public class Bakery {
 public
  static void main(String[] args) {
    BreadBaker baker = new BreadBaker();
    InventoryManager inventoryManager = new InventoryManager();
    SupplyOrder supplyOrder = new SupplyOrder();
    CustomerService customerService = new CustomerService();
    BakeryCleaner cleaner = new BakeryCleaner();
    // Each class focuses on its specific responsibility
    baker.bakeBread();
    inventoryManager.manageInventory();
    supplyOrder.orderSupplies();
    customerService.serveCustomer();
    cleaner.cleanBakery();
  }
}
```

Similarly the Invoice class should only calculate the invoice.
```java
public class Invoice {

  private Marker marker; // Invoice has a marker.
  private int quantity;

  public int calculatePrice() {
    return this.quantity * marker.price;
  }

  public void printInvoice(){
    System.out.println("Text.");
  }
}
```
It is not maintaining SRP. The PrintClass should be there.

```java
package lld.solid;

public class Invoice {
    private static Marker m;
    private static int quantity;
    public static int calculate(){
        return quantity*m.price;
    }

    public Invoice(Marker m, int quantity){
        this.m = m;
        this.quantity = quantity;
    }

    public static void main(String[] args) {
        Marker marker1 = new Marker();
        marker1.marker = "Pen";
        marker1.price = 10;
        // m = marker1; No Constructor Invoice then refernce to m needed else NullPointerException.
        Invoice i = new Invoice(marker1, 5); // Constructure then can pass the value.
        System.out.print("Marker price - " + marker1.marker+ " " + i.calculate());

    }
}
class Marker{
    String marker;
    int price;
}
```
### Open Close Principle.

Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification which means you should be able to extend a class behavior, without modifying it.

Class Shape has circle and rectangle and when add triangle then there is a need to change the class.
```java
class Shape {
 private
  String type;
 public
  double calculateArea() {
    if (type.equals("circle")) {
      // Circle area calculation
    } else if (type.equals("rectangle")) {
      // Rectangle area calculation
    }
    // Adding a triangle requires modifying this method
  }
}
```
It is not OCP.
```java
abstract class Shape {
  abstract double calculateArea();
  // We can also use an interface instead of an abstract class
}

class Circle extends Shape {
 private
  double radius;
  @Override 
public double calculateArea() {
    return Math.PI * radius * radius;
  }
}

class Rectangle extends Shape {
 private
  double width;
 private
  double height;
  @Override 
public double calculateArea() {
    return width * height;
  }
}
```

Notification Sender is sending message based on Notification Type and when new notification type is added then it needs to change the notification type.
```java
public class NotificationSender {

    public void sendNotifications(List<NotificationType> notificationTypeList){
        for(NotificationType types:notificationTypeList){
            if(types==NotificationType.SMS){
                types.sendSMSNotification();
            }
            else if(types==NotificationType.EMAIL){
                types.sendEmailNotification();
            }
            else if(types==NotificationType.WHATSAPP){
                types.sendWhatsappNotification();
            }
        }
    }
}
public enum NotificationType {

    SMS,
    EMAIL,
    WHATSAPP;

    public void sendSMSNotification(){
        System.out.println("Sending SMS Notification.");
    }

    public void sendEmailNotification(){
        System.out.println("Sending Email Notification.");
    }

    public void sendWhatsappNotification(){
        System.out.println("Sending Whatsapp Notification.");
    }

}
```

General solution - Making class of the type and making the class abstract.

```java
public interface Notification {
    void send();
}
public class EmailNotification implements Notification{
    @Override
    public void send() {
        System.out.println("Email Notification.");
    }
}

public class SmsNotification implements Notification{
    @Override
    public void send() {
        System.out.println("Sms Notification.");
    }
}
public class NotificationSender {
    public void sendNotifications(List<Notification> notifications){
        for(Notification notification:notifications){
            notification.send();
        }
    }
}
```

### Liskov Substitution Principle.

According to this principle Derived or child classes must be substitutable for their base or parent classes. This principle ensures that any class that is the child of a parent class should be usable in place of its parent without any unexpected behavior.
```java
class Vehicle {
 public
  void startEngine() {
    // Engine starting logic
  }
}

class Car extends Vehicle {
  @Override public void startEngine() {
    // Car-specific engine starting logic
  }
}

class Bicycle extends Vehicle {
  @Override public void startEngine() {
    // Problem: Bicycles don't have engines!
    throw new UnsupportedOperationException("Bicycles don't have engines");
  }
}
```

Using the LSP principle the code modified to a abtract class.
```java
abstract class Vehicle {
  // Common vehicle behaviors
 public
  void move() {
    // Movement logic
  }
}

abstract class EngineVehicle extends Vehicle {
 public
  void startEngine() {
    // Engine starting logic
  }
}
abstract class NonEngineVehicle extends Vehicle {
  // No engine-related methods
}
```

### Interface Segregation Principle

Dont use general interface make more client focus interface.


Detailed part that focus on the designing the individual components outlined in the HLD.

It defines how modules, classes, functions to get the functionality.

It is only the code.

Say movie ticket booking - the components like seat sekection. payment processing ad ticket generation.

In the design the class diagram is imp it will help in creating the design of the entity.

Very imp to see where to put the multithreading.

## System Design of APIs and Microservices.

Designing APIs and microservices requires careful planning to ensure scalability, reliability, maintainability, and performance. Here's a step-by-step approach to system design for APIs and microservices.

### Requirements.

**Functional Requirement** - Requirement of the API or microservice. Example - User Authentication, Product Management, Order, Catalog, Inventory.  
**NonFunctional Requirement** - Scalability, Availability, Reliability, Latency, and Throughput.  
**Constraints** - Technology stack, response time, cost limits, or existing system constraints.

### Identify Microservice.

**Single Responsibility Principle (SRP)** - Each microservice should handle one specific business function.  
Example: Separate microservices for user management, inventory, and order processing.

**Domain-Driven Design (DDD)** - Break down the system into bounded contexts and align microservices with these contexts.

**Loosely Coupled Architecture** - Microservices should be independent to avoid cascading failures.

### API Design.