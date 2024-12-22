+++
title = 'Class'
date = 2024-12-19T09:43:44+05:30

url= "/post/java/fundamental/Class"
tags = ['interviewQuestion', 'java']
+++
### Types of class in Java.
Concrete Class.

Abstract Class.

Super Class and Sub Class.

Object Class.

Nested Class.

-- Inner Class (Non static nested class)

-- Anonymous Inner Class.
Member Inner Class.

Local Inner Class.
Static Nested Class/Static Class.

Generic Class.

POJO Class.

Enum Class.

Final Class.

Singleton Class.

Immutable Class.

Wrapper Class.

## Concrete Class.

Class where we can create an instance using new keyword.
All methods in the class have implementation.
A class access modifier can be public or package private(no explicit modifier defined).

```java
public class Person{}
```

## Abstract Class

Show only important feature to users and hide its internal implementation.
2 ways to achieve abstraction.

Class is declared as abstracted through keyword "abstract".
It can have both abstract(method without body) and non abstract method.
We cannot create an instance of the class.
Parent has some features which all child classes have in common, then this can be used.
Constructors can be created inside them and with super keyword from child classes we can access them.

```java
public abstract class Car{
    int milage;
    Car(int milage){
        this.milage - milage;
    }
    public abstract void pressBreak(); // Abstract method.
    public abstract void pressClutch();
    public int getNumberOfWheels(){
        // Non abstract method.
        return 4;
    }
}

public abstract class LuxuryCar extends Car{

    // Abstract class inheriting above abstract class.
    LuxuryCar(int milage){
        super(milage);
    }
    public abstract void pressDualBreakSystem(); // Additional abstract method.

    @Override
    public void pressBreak(){
        // implementation.
    }
}

public class Audi extends LuxuryCar{
    // Concrete class inheriting abstract class.
    Audi(int milage){
        super(milage);
    }
    @Override
    public void pressClutch(){
        // Abstract method implemented.
        // implementation.
    }
    @Override
    public void pressDualBreakSystem(){
        // Abstract method implemented.
        // implementation.
    }
}
```

## Super and Sub Class.

Child class subclass.
In java in the absence of any other explicit superclass, everyclass is implicitly a subclass of Object class.
Object is the topmost class in Java.
It has some common method like clone(), toString(), notify(), wait().

```java
public class ObjectTest{
    public static void main(String args[]){
        ObjectTest obj = new ObjectTest();
        Object obj1 = new Person(1);
        Object obj2 = new Audi(10);

        System.out.println(obj1.getClass());
        System.out.println(obj2.getClass());
    }
}
```

The output is.

```xml
class Person
class Audi
```

Object is parent class of every class and we know that reference of child class can be kept in parent class hence Audi and Person objects can be kept in reference of object.

## Nested Class.

Class within another class is called Nested class.

When one class A will beised by only one another class b then instead of created new file A.java for it, we create nested class inside class B itself and it group logically related classes in one file.

Scope - It scope id same as its Outer class.

It is of two types.
Static Nested Class.
Non Static Nested class.

- Member Inner Class.
- Local Inner Class.
- Anonymous Inner Class.

## Static Nested Class.

It does not have access to the non static instance variable and method of outer class.
Its object can be initiated without initiating the object of outer class.
It can be private, public, protected or package-provate(default, no explicit declaration)

```java
class OuterClass{
    int instanceVariable = 10;
    static int classVariable = 20;
    static class NestedClass{
        public void print(){
            System.out.println(classVariable);
            // System.out.println(instanceVariable); // Cannot use non static variable inside static class.
        }
    }
}
public class ObjectTest{
    public static void main(String args[]){
        OuterClass.NestedClass nestedObj = new OuterClass.NestedClass();
        nestedObj.print();
    }
}
```

Static class can be accessed directly with the name of the class.

The name of the outerclass is needed and the object of the outer class is not needed.

Nested class can be created with any type of access modifiers.

Nested class object can be created within the same class itself.

```java
class OuterClass{
    int instanceVariable = 10;
    static int classVariable = 20;
    private static class NestedClass{
        public void print(){
            System.out.println(classVariable);
        }
    }
    public void display(){
        NestedClass nestedObj = new NestedClass();
        nestedObj.print();
    }
}
public class ObjectTest{
    public static void main(String args[]){
        OuterClass outerClassObj = new OuterClass();
        outerClassObj.display();
    }
}
```

To access the private nested class we had to create an object withikn the class itself then expose.

## Inner class Or Non static Nested Class.

It has access to all the instance variable and method of outer class.

Its object can be initiated on after initiating the object of outer class.

Member Inner Class.
It can be private, public, protected, default.

```java
class OuterClass{
    int instanceVariable = 10;
    static int classVariable = 20;

    class InnerClass{
        public void print(){
            System.out.printn(classVariable + instanceVariable);
        }
    }
}

public class ObjectTest{
    // To invoke we need an object of outer class.
    OuterClass outerClassObj = new OuterClass();
    OuterClass.InnerClass innerClassObj = outerClassObj.new InnerClass();
    innerClassObj.print();
```

## Local Inner Class.

Classes which are defined in any block like for loop, while loop.
It cannot be declared as public, protected, private. Only default access modifier is used.
It cannot be initiated outside of the block.

```java
class OuterClass{
    int instanceVariable = 10;
    static int classVariable = 20;

    public void display(){
        int methodLocalVariable = 30;

        class LocalInnerClass{
            int localInnerVariable = 100;
            public void print(){
                System.out.println(instanceVariable+classVariable+methodLocalVariable+localInnerVariable);
            }
        }
        LocalInnerClass localObj = new LocalInnerClass();
        localObj.print();
    }
}
```

It is invoked only inside the block only. As soon as the scope of bloc ends its scope also ends.

### Inheritance in Nested Class.

One innerclass can inherit another innerclass inside the same outer class.

```java
class OuterClass{
    int instanceVariable = 10;
    static int classVariable = 20;

    class InnerClass{
        int innerClass1 = 3;
    }
    class InnerClass2 extends InnerClass1{
        int innerClass2 = 5;
        void display(){
            System.out.println(innerClass1 + innerClass2 + instanceVariable + classVariable);
        }
    }
}
```

```java
public class Objecttest{
    public static void main(string args[]){
        OuterClass outerClassObj = new OuterClass();
        OuterClass.InnerClass2 innerClass2Obj = outerClassObj.new InnerClass2();
        innerClass2Obj.display();
    }
}
```

Static inner class inherited by different class.

```java
class OuterClass{
    static class NestedClass{
        public void display(){
            System.out.println("Inside Static Nested Class.");
        }
    }
}
```

```java
public class OtherClass extends OuterClass.NestedClass{
    public void display1(){
        display();
    }
}
```

Non static inner class inherited by different class.

```java
class OuterClass{
    class InnerClass{
        public void display(){
            System.out.println("Inside innerclass");
        }
    }
}
```

```java
public class OtherClass extends OuterClass.InnerClass{
    OtherClass(){
        new OuterClass().super();
        // Whe we call the child class constructo then it invoke the parent class constructor.
        // Here the parent is inner class so it is only be accessed by the object of outerclass only.
    }
    public void display1(){
        display();
    }
}
```
## Anonymous Inner Class.

An inner class without a name called Anonymous class.
Why it is used.
When we want to override the behaviour of the method without even creating any subclass.

```java
public abstract class Car{
    public abstract void pressBreak();
}
```

```java
public class Test{
    public static void main(string args[]){
        Car audiCarObj = new car(){
            @Overridepublic void pressBreak(){
                // my audi specific implementation here
                System.out.println("Audi specific break changes.");
            }
        };
        audiCarObj.pressBreak();
    }
}
```

We cannot create an object of the abstract class.

Here we have created the object of the subclass and assigns its reference to the object.

## Generic Class.

It helps us to write the class in generic manner and that helps us to avoid the typecasting that we have to use with object class.

```java
class Print{
    Object value;
    public Object getPrintValue(){
        return value;
    }
    public void setPrintValue(Object value){
        this.value = value;
    }
}
```

Object is parent of every class. The value can be of any type String, Integer. The only issue is that we have to typecast it as per our use.

```java
public class Print{
    Object value;
    public Object getPrintValue(){
        return value;
    }
    publu void setPrintValue(Object value){
        this.value =  value;
    }
}
```

```java
public class Main{
    public static void main(String args[]){
        Print printObj = new Print();
        printObj1.setPrintValue(1);
        Object printValue = printObj.getPrintValue();
        if((int) printValue==1){

        }
    }
}
```

Use <T> T can be anything like A, B, C.
In Generic code.

```java
public class Print<T>{
    T value;
    public T getPrintValue(){
        return value;
    }
    public void setPrintValue(T value){
        this.value=value;
    }
}
// <T> can be any non primitive object.
```

**Generic method**.
Type parameter should be before the return type of the methoc declaration.

Type parameter scope is limitied to method only.

Put the generic type that we want to accept before th return type.

```java
public class GenericMethod{
    public <K,V> void printValue(Pair<K,V> pair1){}
}
```

**Bounded Generics**
Upper Bound(<T extends Number>) means T can be of type Number of its subclass.

```java
public class Print<T extends Number>{}

public classMain{
    public static void main(String args[]){
        Print<Integer> parameterType = new Print<Integer>();
        // Integer is a child class of number.
    }
}
public class Main{
    public static void main(String args[]){
        Print<String> parameterType = new Print<>();
        // Not allowed as String is not a child class of Number.
    }
}
```

**MultiBound**
<T extends SuperClass & Interface> The first is concrete class and the next are interface.

**WildCard**.

## Singleton Class.

The class objective is to create only one object like DB connection and only one instance should be created.

Different ways of creating a singleton class.

Eager Initialization.
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