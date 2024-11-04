+++
title = 'Dependency Injection and Inversion Of Control.'
date = 2023-11-17T18:56:59+05:30
+++



We have Food Interface and it is implemented by Burger Class.
```java
public interface Food{}
```
```java
public class Burger implements Food{}
```
These two are used by the Chef class.
```java
public class Chef{
    private Food burger;
    
    public Chef(){
        burger = new Burger();
    }
    
    public void prepareFood(){
        // Code 
        // Prepare the Burger.
    }
}
```

The Chef class is dependent on the Burger class as without putting in the constructor it cannot work.

Now another Chef exerienced in pizza.
```java
public class Pizza implements Food{}
```

Now to implement Pizza in the Chef class we have to get rid of the Burger or duplicate the code.
```java
public class Chef{
    private Food burger;
    
    public Chef(){
        pizza = new Pizza();
    }
    
    public void prepareFood(){
        // Code 
        // Prepare the Burger.
    }
}
```
```java
public class Chef{
    private Food burger;
    
    public Chef(){
        burger = new Burger();
        pizza = new Pizza();
    }
    
    public void prepareBurger(){
        // Code 
        // Prepare the Burger.
    }

    public void preparePizza(){
        // Code 
        // Prepare the Pizza.
    }
}
```

Spring IOC inversion of control.

In controliocer we need the object of the srevice. So we can create he object usingthe new keywrod then we have to manage the object reation, object delete.

When creating an object we now have the DI dependency injection so that we just work on the business logic and not the object creation part.

IOC is the principle and the dependency injection is the design pattern.

In spring we just inject the object.

There are 3 ways to do the dependency injection.

Without the Dependency injection.

```java
public class Controller{
    private Service service;
    public void handleRequest(){
        servcie.doSomething();
    }
}

public class Service{
    public void doSomething(){
        System.out.println("doing something");
    }
}
```

Constructor Injection.

```java
public class Controller{
    private Service service;
    public Controller(Service service){
        this.service = service;
    }
    public void handleRequest(){
        servcie.doSomething();
    }
}

public class Service{
    public void doSomething(){
        System.out.println("doing something");
    }
}
```

Setter Injection.

```java
public class Controller{
    private Service service;
    public void setService(Service service){
        this.service = service;
    }
    public void handleRequest(){
        servcie.doSomething();
    }
}

public class Service{
    public void doSomething(){
        System.out.println("doing something");
    }
}
```

Field Injection.
Loose Coupling.

```java
public class Controller{
    @Autowired
    private Service service;
    public void handleRequest(){
        servcie.doSomething();
    }
}

public class Service{
    public void doSomething(){
        System.out.println("doing something");
    }
}
```
