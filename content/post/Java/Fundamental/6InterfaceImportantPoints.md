+++
title = 'Interface Important Points'
date = 2023-11-14T09:27:14+05:30
url= "/post/java/fundamental/Interface"
tags = ['interviewQuestion', 'java']
+++

Interface is used to hide the internal implementation of the feature and only shows the main functionality. Both interface and abstract class are used for abstraction.

- All the data members by default in interface are **public static final**. We cannot define private or protected for the data member in interface.
- We donot create object of the Interface using the new keyword. We create a reference of the Interface and it is the object of the implemented class.
- An interface can extend another interface. An interface cannot implement another interface.
- We can define class inside an interface. We can add enum (class) inside the interface.
- We cannot put **final** method inside the interface. Then we will not able to override the method in the implemented class. 
- While overriding the method in the class we cannot change the visibility of the method. They are by default public.

### Difference between Interface and Abstract Class.
|Feature| Interface                                                                                                                                                         | Abstract Class                                                                                                            
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|**Purpose**| To define a contract that classes can implement.                                                                                                                  | To define common behavior that classes can inherit or override.                                                           |
|**Method**| All methods are abstract by default(Java 8 allows default and static method).                                                                                     | Can have both abstract and concrete method.                                                                               |
|**Inheritance**| A class can implement multiple interface.                                                                                                                         | A class can inherit from only one abstract class.                                                                         |                 
|**Field**| It cannot have constructor.<br/> Can only have public static final variable (constants). <br/> Methods are implicitely public and cannot be private or pretected. | It can have constructor. <br/>It can have instance variable (non final). <br/> Methods can be public, private, protected. |
|**Inheritance of Behaviour**|No method implementation(except the default method) just a contract.| Can provide the method implementation (shared behaviour).|


Example of Interface.
```java
interface I {
    int i=10; // They are public static final. We will not able to change the value assigned to the variable(final).
    // Many class will be implementing the interface there will be conflict in the value.
    void display(); // They are public abstract.
    // Public access from all the classes. Abstract not implementing the method.
}
public class InterfaceExample implements I{
    @Override
    public void display() {
        System.out.println("The display method is updated.");
    }

    public static void main(String[] args) {
        I a = new InterfaceExample(); //Reference type variable for the interface. Instantiate with the interface implemented class.
        System.out.println("Interface");
        //a.i=20; // This will give error we cannot modify the value.
        System.out.println(a.i);
    }
}
```
Example of the Abstract Class.
```java
abstract class AbstractClass{
    protected int i=0; // There can be any type of access modifiers in the abstract class.
    static final int f1=10;// Method can be static and can be non static.
    abstract void show(); // We can have both abstract method and concrete method. The abstract keyword should be used.
    void display(){
        System.out.println("Non abstract method.");
    }
}

public class AbstractClassExample extends AbstractClass{
    // Class can not extend more than one abstract class. Multiple inheritance is not supported in Java.
    // Class can implement more than one interface.
    @Override
    void show() {
        System.out.println("This is the show method of the abstract class.");
    }

    public static void main(String[] args) {
        AbstractClass a = new AbstractClassExample();
        a.show();
        a.display();
        a.i = 20; // We can change the value.
        //a.f1=20; // It is final.
        System.out.println(a.i);
    }
}
```
### When to use Interface and Abstract Class?
Interface - We donot know the implementation logic of the method. We know the requirement clarification then we use the Interface.

Abstract Class - We know the implemnetation logic of few class and not all. Then we create the abstract class.

### Why a class can not extend multiple class but an interface can extend multiple interface?
Java does not allow multiple inheritance. An interface is a pure abstraction model so it does not have any inheritance hierarchy like class.

### Uses of interface in Java.
- An interface is used to achieve fully abstraction.
- Using interfaces is the best way to expose our project’s API to some other project.
- Programmers use interface to customize features of software differently for different objects.
- By using interface, we can achieve the functionality of multiple inheritance.

### What is a Marker Interface in Java?
An interface that does not have any data members and methods is called Marker Interface.  It is used to "mark" a class with some metadata or a specific property. It serves as a tagging mechanism to signal to the compiler or JVM that a class possesses a certain characteristic or capability.  

Example of Marker Interface.  
**Serializable** - Marks a class as serializable, allowing its objects to be converted into a byte stream.  
**Cloneable** - Indicates that a class supports cloning via the Object.clone() method.  
**Remote** - Marks a class as capable of being accessed remotely in a distributed system.

**How the Marker Interface works?**

Marker interfaces rely on runtime type identification. The presence of the interface allows:

Compiler-Level Checks - The compiler can identify whether a class has implemented the interface.  
Runtime Reflection - APIs or frameworks can check if a class implements the marker interface and perform operations accordingly.  
For example, the `ObjectOutputStream` class in Java checks whether a class implements the Serializable interface before serializing its objects:

```java
if (!(obj instanceof Serializable)) {
throw new NotSerializableException(obj.getClass().getName());
}

```

### Nested Interface.
Interface inside an interface. By default it is static in nature. It is also called static interface.
```java
interface outerInterface{
    void method1();
    interface innerInterface{
        void method2();
    }
}
class MyClass implements outerInterface, outerInterface.innerInterface {
    @Override
    public void method1() {
        System.out.println("Method 1.");
    }

    @Override
    public void method2() {
        System.out.println("Method 2.");
    }
}

public class I1 {
    public static void main(String[] args) {
        MyClass oI = new MyClass();
        oI.method1();
        oI.method2();
    }
}

```