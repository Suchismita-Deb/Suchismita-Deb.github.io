+++
title = 'DesignRestaurantManagementSystem'
date = 2025-01-12T18:45:32+05:30
url= "/post/systemdesign/designexample/DesignRestaurantManagementSystem"
tags = ['interview question', 'system design']
+++


## Requiremens for Restaurant Management System.

Here are the main requirements for the RMS.

The restaurant offers a menu with different sections and items.

Waiters can create orders for a table and add items for each person seated.

Each person's order can include multiple menu items.

The system should show available tables for walk-in customers.

The system should allow for table reservations.

The receptionist should be able to search for available tables by date and time and make reservations.

The system should allow customers to make and cancel reservations.

The system should send reminders as the reservation time gets close.

Customers should be able to pay with credit cards, checks, or cash.

Each branch may have different table setups.

### Analysis.

The restaurant offers menu with different section and items.

There only we know that menu section and item class will be there.

Waiters can create orders for a table and add items for each person seated.

There will be one waiter class and it will create order and add item.

Each person's order can include multiple menu items.

Order can include item means it is a list.

Receptionist is also an actor.

Reminder meaning notification so we use observer pattern.

Customers should be able to pay with credit cards, checks, or cash.

It is using inheritance.

Restaurant system is one. There can be multiple restaurant and there will be table.

Actor.

Primary Actor - Customer dealing with Waiter, Receptionist, Manager.

Manager can do the work of waiter and receptionist.

Use Case.

Customer.  
Reserve the table.  
Update the table or cancel the table.  
View Menu.  
Place order.  
Update the order.  
View the order.  
Pay for order.
Extend relationship. Pay by cash. Pay by card.

Use Case of Waiter.

View Menu.  
Order place.  
Update order.  
Cancel order.  
Serve the order.  
Accept the payment.

Use case of receptionist.

Reserve the table.  
Update the table.

Use case of Manager.

Use of waiter and receptionist.  
Resolve issue.  
Update the menu.  
Generate report.

System.
Send notification.  
Manage the restaurant.  
Show reports.

Manager -> generalization relation with waiter and receptionist.

Pay -> extends by pay by cash and card.

Place Order -> Include modify order.

Update the menu item -> Include the menu.

Design Pattern.

System is managing all the restaurant. System doing Singleton Design Pattern.

Notification in reservation -> Observer Pattern.

Menu -> Drinks, Dessert and many more -> Factory Pattern.

When making the it will create the data in db and update the order -> When doing any change and not showing to the user then it is Command Pattern. Making action not visible to user and encapsulate the action we have to use Command Pattern.

Classes.

In the document.

Menu, Menu Section, Menu Item.

Waiter, Manager, Receptionist -> Employee.

Customer.  
Customer and Employee are Person.

Table.
Table Chart.

Order.

reservation.

Payment.

Notification.

Bill.

Order.

OrderItem.

Restaurant System.

ENUM - Order Status, Table Status, Bill Status, reservation status.

Payment - abstract class.
Cash and Card class.

Bill class
Making the Enum and constant class.

```java
public enum AccountStatus {
    ACTIVE,CLOSED,CANCELLED,BLOCKED,NONE
}
public enum OrderStatus {
    RECEIVED,PREPARING,COMPLETE,CANCELLED
}
public enum PaymentStatus {
    UNPAID, PENDING,SUCCESSFUL,REFUND,CANCELLED,FAILED
}
public enum ReservationStatus {
    PENDING,CONFIRMED, CHECKEDIN,CANCELLED
}
public enum SeatType {
    REGULAR,KID,PREMIUM
}
public enum TableStatus {
    AVAILABLE,RESERVED,OCCUPIED
}
```

Making the class.

```java
public class Account {
    private String accountId;
    private String password;
    private String address;
    private AccountStatus status;
    public boolean resetPassword() {
        //dummy
        return true;
    }
}

public class Bill {
    private int billId;
    private float amount;
    private float tax;
    private float tip;
    private boolean isPaid;
    public boolean generateBill() {
        return true;
    }
    public boolean updateBill() {
        return true;
    }
}
```

```java
public class Menu {
    private int menuId;
    private String type;
    private List<MenuSection> sections;

    public boolean updateMenuSection(MenuSection section) {
        return true;
    }
}
public class MenuItem {
    private int id;
    private String title;
    private String description;
    private float price;

    public MenuItem(int id, String title, String desc, float price) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.price = price;
    }
    public boolean updateItemInfo(String title, String desc, int price) {
        return true;
    }
}
public class MenuSection {
    private int sectionId;
    private String title;
    private List<MenuItem> items;
    public boolean updateMenuItem(MenuItem item) {
        return true;
    }
}
```

In factory pattern MenuItem and MenuManager.

```java
public class MenuItemFactory {
    public static MenuItem createMenuItem(int menuItemId, String title, String desc, float price) {
        return new MenuItem(menuItemId,title,desc,price);
    }
}
public class MenuManagement {
    public void addMenuItem(int id, String title, String desc, float price) {
        MenuItem item = MenuItemFactory.createMenuItem(id,title,desc,price);
        //add items to the menu
    }
}
```

```java
public abstract class Payment {
    private int paymentId;
    private float amount;
    private PaymentStatus status;
    private Date timestamp;

    public abstract void startTransaction();
}
public class Card extends Payment{
    private String cardInfo;
    @Override
    public void startTransaction() {
    }
}
public class Cash extends Payment{
    private float cashPaid;
    @Override
    public void startTransaction() {
    }
}
```

```java
public class Person {
    private String name;
    private String email;
    private String phone;
}
public class Customer extends Person {
    private String customerInfo;
}
public class Employee extends Person{
    private int employeeId;
    private Date joiningDate;
    private Account account;
}
public class Manager extends Employee{
    public void updateMenu(Menu menu, MenuItem menu) {
    }
}
public class Receptionist extends Employee{
    public void createReservation(Table table, Reservation reservation, Customer customer) {
    }
}
public class Chef extends Employee{
    public void prepareOrder(Order order) {
    }
}
public class Waiter extends Employee{
    public void takeOrder(Order order) {
    }
}
```

```java
public class Table {
    private int tableId;
    private TableStatus status;
    private int maxCapacity;
    private int location;
    private List<TableSeat> seats;
}
public class TableSeat {
    private int seatNumber;
    private SeatType type;
    public boolean updateSeatType(SeatType type) {
        return true;
    }
}
public class TableChart {
    private int tableChartId;
    private List<Integer> availableTables;
    private List<Integer> reservedTables;
    public void printTableChartInfo() {}
}
```

```java
public class Meal {
    private int mealId;
    private List<MealItem> items;

    public boolean addMealItem(MealItem item) {
        return true;
    }
}
public class MealItem {
    private int itemId;
    private int quantity;

    public boolean updateQuantity(int count) {
        return true;
    }
}
```

```java
public class Branch {
    private String name;
    private int branchId;
    private String location;
    private TableChart tableChart;
    private Menu menu;
    private Kitchen kitchen;

    public boolean addTableChart(TableChart chart) {
        return true;
    }
}
public class Kitchen {
    private int kitchenId;
    private List<Chef> chefs;

    public boolean addChef(Chef chef) {
        return true;
    }
}
```

```java
public class RestaurantSystem {
    private Restaurant restaurant;

    public static RestaurantSystem restaurantSystemInstance = null;
    private RestaurantSystem() {}
    public static RestaurantSystem getInstance() {
        if(restaurantSystemInstance == null) {
            restaurantSystemInstance = new RestaurantSystem();
        }
        return restaurantSystemInstance;
    }
}
public class Restaurant {
    private String name;
    private int id;
    private List<Branch> branchList;

    public boolean addBranch(Branch branch) {
        return true;
    }
}
public class Reservation implements Subject {

    private List<Observer> observers = new ArrayList<>();
    private int reservationId;
    private Date reservationTime;
    private int totalCount;
    private ReservationStatus status;
    private String instructions;
    private Customer customer;
    private Table table;

    public ReservationStatus getStatus() {
        return this.status;
    }
    public void setStatus(ReservationStatus status) {
        this.status = status;
        // notification when the status change.
        notifyObservers();
    }

    @Override
    public void notifyObservers() {
        for(Observer obs: observers) {
            obs.update();
        }
    }

    @Override
    public void removeObserver(Observer obs) {
        //TODO: add a validation here
        observers.remove(obs);
    }
    @Override
    public void addObserver(Observer obs) {
        if(!observers.contains(obs)) {
            observers.add(obs);
        }
    }
    public boolean updateReservation(int count) {
        return true;
    }
}
public class Notification implements Observer {
    private int notificationId;
    private Date creationTime;
    private String content;
    private Reservation reservation;

    public Notification(Reservation reservation) {
        this.reservation = reservation;
        //important
        this.reservation.addObserver(this);
    }


    public void sendNotification() {}
    @Override
    public void update() {
        //Send notification only when the status is confirm.
        // if(reservation.getStatus() == ReservationStatus.CONFIRMED) {
        // System.out.println("Aapki Reservation confirm hogyi h dost");
        // }
        System.out.println("Notification send.");
    }
}

public class Order {
    private int orderId;
    private OrderStatus status;
    private Date orderTimestamp;
    private List<Meal> meals;
    private Chef chef;
    private Waiter waiter;
    public boolean addMeal(Meal meal) {
        return true;
    }
    public boolean removeMeal(Meal meal) {
        return true;
    }
}
```

The observer pattern.

```java
public interface Observer {
    void update();
}

public interface Subject {
    // The Subject is reservation and we are sending notification based on the reservation.
    void addObserver(Observer obs);
    void removeObserver(Observer obs);
    void notifyObservers();
}
```

The command pattern - Order entry in db, update in db.

```java
public class AddEntryCommand implements Command{
    //Singleton Instance of DB to interact with.
    private Database database;
    private Entry entry;

    public AddEntryCommand(Database db, Entry entry) {
        this.database = db;
        this.entry = entry;
    }
    @Override
    public void execute() {
        
        // The add entry and all details will be taken by the interface.
        database.addEntry(entry);
    }
}
public interface Command {
    void execute();
}
public class CommandInvoker {
    private Command command;
    public CommandInvoker(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        if(command != null) {
            command.execute();
        }
    }
}
public class Database {
    public void addEntry(Entry entry) {

    }

    public void deleteEntry(Entry entry) {

    }

    public void modifyEntry(Entry entry) {

    }
}
public class DeleteEntryCommand implements Command {
    //Singleton Instance of DB to interact with
    private Database database;
    private Entry entry;

    public DeleteEntryCommand(Database db, Entry entry) {
        this.database = db;
        this.entry = entry;
    }
    @Override
    public void execute() {
        database.deleteEntry(entry);
    }
}
public class Entry {
}
public class ModifyEntryCommand implements Command{
    //Singleton Instance of DB to interact with
    private Database database;
    private Entry entry;

    public ModifyEntryCommand(Database db, Entry entry) {
        this.database = db;
        this.entry = entry;
    }
    @Override
    public void execute() {
        database.modifyEntry(entry);
    }
}
```