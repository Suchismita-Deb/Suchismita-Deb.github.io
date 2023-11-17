+++
title = 'Decorator Design Pattern'
date = 2023-11-12T03:05:21+05:30
tags = ['system design','low level design']
+++


### Food Delivery App Notification Service.

The service notifies our customer some important event like delivery departure, arrival, receipt.

We have one class Notifier and we have one single send method which send message through email. This method accept single message in args and send in email.
```java
public class Notifier {
    private final String userName;
    
    public Notifier(String userName){
        this.userName = userName;
    }
    public void send(String message){
        System.out.println("Sending " + message + " in mail " + mail);
    }
    public String getUserName(){
        return userName;
    }
}
```
The email is retrieve from the db service.
```java
public class Notifier {
    private final String userName;
    protected final DatabaseService databaseService;
    
    public Notifier(String userName){
        this.userName = userName;
        databaseService = new DatabaseService();
    }
    public void send(String message){
        String mail = databaseService.getMailFromUsername(userName);
        System.out.println("Sending " + message + " in mail " + mail);
    }
    public String getUserName(){
        return userName;
    }
}
```

In the DatabaseService class
```java
public class DatabaseService {
    public String getMailFromUsername(String userName) {
        return userName + "@mail.com";
    }
}
```
Now say the customer expect more than just email notification. Like they want whatsapp notification and facebook notification.

We can use Inheritance extend Notifier class to WhatsappNotifier and FacebookNotifier class.

Client will instantiate the desired notifier class like WhatsappNotifier or FacebookNotifier and use it while notifying the particular customer.

In the WhatsappNotifier class.
```java
public class WhatsappNotifier extends Notifier{
    public WhatsappNotifier(String userName){
        super(userName);
    }
    @Override
    public void send(String message) {
        String phoneNbr = databaseService.getPhoneNbrFromUserName(getUserName());
        System.out.println("Sending " + message + " in whatsapp on " + phoneNbr);
    }
}
```
In the FacebookNotifier class.
```java
public class FacebookNotifier extends Notifier{
    public FacebookNotifier(String userName){
        super(userName);
    }

    @Override
    public void send(String message) {
        String fbName = databaseService.getFbNameFromUserName(getUserName());
        System.out.println("Sending " + message + " on Facebook to " + fbName);
    }
}
```
In the DatabaseService class.
```java
public class DatabaseService {
    public String getMailFromUsername(String userName) {
        return userName + "@mail.com";
    }

    public String getFbNameFromUserName(String userName) {
        return userName + "@phone";
    }

    public String getPhoneNbrFromUserName(String userName) {
        return userName + "@Facebook";
    }
}
```
Now if the client wants to get Message from whatsapp and facebook both then we have to make another combination of WhatsappAndFacebookNotifier class. In this way if client want message in SMS in phone then there will be another class.

For every option there will be another class and there will ba a combination like **Whatsapp + SMS**, **SMS + Facebook** or **Whatsapp + Facebook + SMS** There will be many class and it is diffiult to manage in this way.

Decorator Design Pattern helps in this cases.
> Decorator Design Pattern is a Structural Design Pattern.

> It lets us **attach new behaviour** to an object by placing this object inside a **special wrapper** that contains these behaviour.


In our example the main component app is intact and we will change the FacebookNotifier and WhatsappNotifier class.

Will rename the FacebookNotifier as **FacebookDecorator** and **WhatsappDecorator** and it will extend the **BaseNotifierDecorator** class.

> The BaseNotifierDecorator is the wrapper or container of the initial Notifier.

The BaseNotifierDecorator.
```java
public abstract class BaseNotifierDecorator{
    private final iNotifier wrapped;
    protected final DatabaseService databaseService;

    BaseNotifierDecorator(iNotifier wrapped){
        this.wrapped = wrapped;
        databaseService = new DatabaseService();
    }
    public void send(String message){
        wrapped.send(message);
    }
    public String getUserName(){
        return wrapped.getUserName();
    }
}
```
The FacebookDecorator and WhatsappDecorator should look like.
```java
public class FacebookDecorator extends BaseNotifierDecorator{
    public FacebookNotifier(iNotifier wrapped){
        super(wrapped);
    }

    @Override
    public void send(String message) {
        super.send(message);
        String fbName = databaseService.getFbNameFromUserName(getUserName());
        System.out.println("Sending " + message + " on Facebook to " + fbName);
    }
}
```

The class should implement the interface iNotifier.
```java
public interface iNotifier{
    void send(String message);
    String getUserName();
}
```
This interface will be used by all the classes including the wrapper classes.

Decorator are wrapper for the core object. Wrapping changes the inheritance we are using to composition.

In composition, we can substitute the object with one another as all belong to the same interface. This allows to change teh behaviour of the container at runtime.

Tha main class.
```java
public static void main(String[]args){
    iNotifier notifier = new FacebookDecorator(
                            new WhatsappDecorator(
                               new Notifier("SDEB")
        )
    );
    notifier.send("This is the message");
}
```

In this code we can see, the wrapped object provided to the FacebookDecorator is itself a whatsappDecorator with simple Notifier.

FacebookDecorator's super.send method call will invoke the whatsappDecorators's send that wil invoke the base email Notifier send call.

The output looks like.
```java
This is the message by mail to SDEB@mail.com.
This is the message by Whatsapp on SDEB@Phone.
This is the message on Facebook to SDEB@Facebook.
```
![Alt Text](/images/img1.png)

**iNotifier** - common behaviour for wrappers and wrapped object.

**Notifier** - wrapped class, it defines the basic behaviour which can be altered by decorators.

**BaseDecorator/BaseNotifierDecorator** - reference the wrapped object via the interface so it can reference both the concrete component and its decorator.

**ConcreteDecorator** - The BaseDecorator is extended by the concreteDecorator. It is the FacebookDecorator and WhatsappDecorator class. 

**Client** - Wraps component in layers of decorators it should work with component.

> It applies Single Responsibility and Open Close Principle.