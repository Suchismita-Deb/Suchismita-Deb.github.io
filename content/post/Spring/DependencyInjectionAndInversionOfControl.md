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