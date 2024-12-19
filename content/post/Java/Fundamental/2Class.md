+++
title = 'Class'
date = 2024-12-19T09:43:44+05:30
url= "/post/java/fundamental/Class"
tags = ['interviewQuestion', 'java']
+++
Types of class in Java.
Concrete Class.
Abstract Class.
Super Class and Sub Class.
Object Class.
Nested Class.
-- Inner Class (Non static nested class)
-- Anonymous Inner Class.
Member Inner Class.
Local Inner Class.
Static Nested Class/Static Class
Generic Class.
POJO Class.
Enum Class.
Final Class.
Singleton Class.
Immutable Class.
Wrapper Class.


Singleton Class.

The class objective is to create only one object like DB connection and only one instance should be created.

Different ways of creating a singleton class.

Eage Initialization.
Lazy Initialization.
Synchronization Block.
Double Check Lock.
Bill Pugh Solution.
Enum Solution.

### Eager Initialization.

```java
public class DBConnection{
    private static DBConnection conObj = new DBConnection();
    // private - not making it accessible to other class.
    // static - it is not realted to object and it is only realated to class.
    private DBConnection(){
    }
    // constructor is private - no one is allowed to create the object using the new keyword.
    public static DBConnection getInstance(){
        return conObj;
    }
    // one public method is others calls the object then they will call the method.
}
```

Eager Initialization - When the application starts all the static variable are preloaded into the memory. The object will be created even when no one called the object.

### Lazy Initialization.

When 2 threads comes in parallel and both will find it null and two object will created.
It is handled by sunchronized.

### Synchronized Initialization.

It is added in method level. Say there are 100 places where we are creating the object then in all the cases it will put lock in method level and every time there will be lock and unlock.

It is handled by Double Checked Locking.

### Double Checked Null.

There are multiple core in CPU and each core has a cache L1 and they have access to common memory.

Thread 1 is created in core 1 and thread2 has created in core 2.

It is stored in cache and not in memory and the data are not same in the cache so two objects are created.

Volatile solve it - When there is a variable volatile then the read are write is done from memory and not with cache.

It is a bit slow as it is volatile and using memory and not cache and also synchronous. It is solved by Bill Pugh Solution.

### Bill Pugh Solution.

```java
public class DatabaseConnection{
    private DatabaseConnection(){}
    private static class DBConnectionHelper{
        private static final DatabaseConnection INSTANCE_OBJECT = new DatabaseConnection;
    }
    // It is inside the nested class. The nested class donot gets loaded at the time initilization.
    public static DatabaseConnection getInstance(){
        return DBConnectionHelper.INSTANCE_OBJECT;
    }
}
```

### Enum

All value are private.

```java
enum DBConnection{
    INSTANCE;
}
```

In JVM only one snapsort of ENUM is present. By default ENUM is singleton.

### Immutable Classes.

We cannot change the value of the object once it is created.
Declare the class as final so that it cannot be extended. No subclass is allowed.
All class member sould be private. SO that direct access can be avoided.
Class member are initialized only once usng constructor.
There should not be any setter methods, which is generally use to change the value of the member.
Just the getter method and returns the copy of the member variable.

```java
final class ImmutableClass{
    private final String name;private final List<Object> petNameList;

    ImmutableClass(String name, List<object> petNameList){
        this.name = name;
        this.petNameList = petNameList;
    }
    public String getName(){
        return name;
    }
    public List<Object> getPetNameList(){
        // this is required as making List final means you cant now point it to new list but still can add, delete value in it so we send the copy of it.
        // Now the copyis with the original one. When we add we can add it to the list but it is immutable and we should not change so return the copy of the original list.
        return new ArrayList<>(petNameList);
    }
}
public class Main{
    public class void main(String args[]){
        List<Object> petNames = new ArrayList<>();
        petNames.add("FirstName");
        petNames.add("LastName");

        ImmutableClass obj = new ImmutableClass("name",petNames);
        obj.getPetNameList().add("hello");
        System.out.println(obj.getPetNameList());
        // The output = ["FirstName","LastName"]
    }
}
```