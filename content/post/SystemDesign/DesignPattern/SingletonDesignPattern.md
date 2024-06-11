+++
title = 'SingletonDesignPattern'
date = 2024-03-07T13:13:10+05:30
tags = ['system design']
categories = ['low level design','system design']
+++

It is used when we have to create only one instance of the class.
Only one object like DB connection.

**4 ways to achieve.**
- Eager.
- Lazy.
- Synchronized Method.
- Double Locking.

### Eager Initialization.

We need to restrict the creation of the object. Constructor handle the creation of the object. We need to restrict it.

```java
public class DBConnection{
    private static DBConnection conObject = new DBCOnnection();

    private DBConnection(){

    }

    public static DBConnection getInstance(){
        return conObject;
    }
}
```
```java
public class Main{
    public static void main(String args[]){
        DBConnection conObject = DBCOnnection.getInstance();
    }
}
```
The constructor is made as private.
so that outside the class no one should call the constructor.

On public method `getInstance` so that other class can call it as it is static.
- Here we created one instance variable and it is static as it related to a class.
- If the variable is static then any object can call the varible. It is initialized at the time of calling the class.


### Lazy Initialization.
- Instead of the load time we created the object when ever the method is called.
- Default it is initialized with null. If it is null then only created the object.
 ```java
 public class DBConnection{
    private static DBConnection conObject;

    private DBConnection(){

    }

    public static DBConnection getInstance(){
        if(conObject==null)     conObject = new DBConnection();
        return conObject;
    }
}
```
- One problem with the lazy initialization. When two thread comes simultaenously and they will found that the null they will create the object.
- This is solved by synchronized.

### Synchronized Method.

```java
public class DBConnection{
    private static DBConnection conObject;

    private DBConnection(){

    }

    synchronized public static DBConnection getInstance(){
        if(conObject==null)     
            conObject = new DBConnection();
        return conObject;
    }
}
```
- The synchronized is like a lock when two thread comes in it wll put a lock and only one can go inside the if block.
- The synchronized is an expensive operation and say 5 threads comes first there will be a lock and create an object and later all have a lock.

### Double Locking.
```java
public class DBConnection{
    private static DBConnection conObject;

    private DBConnection(){

    }

    public static DBConnection getInstance(){
        if(conObject==null) {
            synchronized (DBCOnnection.class) {
                if (conObject == null) {
                    conObject = new DBConnection();
                }   
            }
        }
        return conObject;
    }
}
```

- If two thread comes together at the first if and as they are null they will come inside the first if block and as it is synchronized only one will go inside the block. First it is null so it will create the object. Then for the next thread it will simply return.
- We are checking 2 times.