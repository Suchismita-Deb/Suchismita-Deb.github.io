+++
title = 'Java Interview Experience.'
date = 2023-12-05T19:54:30+05:30
+++



### Round 1
30 MCQ on Java.
6 coding question. 2 from DP, 1 from String.

https://www.geeksforgeeks.org/count-ways-build-street-given-constraints/

https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/

Some of the multiple choice sample.

```java
String test="a1b2c3";
String[] tokens =test.split("\\d");
for(String s : tokens)
System.out.println(s+ " ");
```
- The split() method divide the string into substring and the delimiter here is any digit `\\d`. The output is 
- `a b c `.

```
Character ch = new Character('A');
System.out.println(ch+"\t"+(int)ch);
```
- `A  65`

```java
String str1= "XYZ";
System.out.println(str1.equals(new Volkswagen()));
```
- This will not compile as we are trying to compare string with one instance of an object.

```java
final char ch='A';
switch(65)
{
case ch:
System.out.println("65"); //65
case 66:
System.out.println("66"); //66
}
```
- The output is `65 66`.

```java
float f= 1.00f/0.00f;
System.out.println(f);
```
- The output is `Infinity`. The divide with zero gives Infinity. This is special for floating point numbers. For other numbers it will give Arithmetic Exception.


### Round 2.
**Started with OOPS and continued with Spring-Boot, Hibernate, JPA.**

#### *Explain HAS-A-Relationship and IS-A-Relationship*
**IS-A Relationship (Inheritance):**

- The "IS-A" relationship represents inheritance, where one class is a specialized version of another. It's also known as the "subclass" and "superclass" relationship.

```java
// Superclass
class Vehicle {
    // Properties and methods common to all vehicles
}

// Subclass inheriting from Vehicle
class Car extends Vehicle {
    // Additional properties and methods specific to cars
}

```
- In this example, Car is a subclass of Vehicle, implying that a car "IS-A" vehicle. The Car class inherits properties and behaviors from the Vehicle class.

**HAS-A Relationship (Composition):**

- The "HAS-A" relationship represents composition, where one class has an instance of another class as a part of its state.
```java
class Engine {
    // Properties and methods related to an engine
}

class Car {
    // Car has an Engine as one of its components
    private Engine carEngine;

    public Car() {
        this.carEngine = new Engine(); // Creating an Engine object when a Car is instantiated
    }

    // Other methods and properties of a Car
}
```
- In this example, Car has an instance of Engine (carEngine) as one of its properties. It signifies that a Car "HAS-A" relationship with an Engine. This composition allows a Car object to utilize the functionalities provided by the Engine class.

#### *What is Loose Coupling and Tight coupling?*
Coupling refers to the degree of dependency between different parts of a system.

**Tight Coupling:**
- When two or more components or classes are highly dependent on each other, they are tightly coupled. This means that changes in one component may require changes in the other, making the system less flexible and harder to maintain.
```java
class A {
    void doSomething() {
        // Some functionality
    }
}

class B {
    A objA = new A();

    void doSomethingElse() {
        objA.doSomething(); // Class B directly depends on Class A
    }
}
```
- In this case, Class B is tightly coupled with Class A because it directly creates an instance of A and calls its method.

**Loose Coupling:**
- When components or classes are less dependent on each other, they are loosely coupled. This means that changes in one component don’t necessarily require changes in the other, making the system more flexible and easier to maintain.
```java
interface Functionality {
void doSomething();
}

class A implements Functionality {
public void doSomething() {
// Some functionality
}
}

class B {
private Functionality obj;

    public B(Functionality obj) {
        this.obj = obj;
    }

    void doSomethingElse() {
        obj.doSomething(); // Class B depends on the interface, not a specific class
    }
}
```
- In this example, Class B is loosely coupled with Class A through an interface Functionality. Class B depends on the Functionality interface rather than a specific implementation (Class A). 
- This allows flexibility - B can work with any class that implements the Functionality interface without needing changes within B itself.

#### *Explain Interfaces and Abstract class in Details ?*
- Interfaces and abstract classes are essential concepts in object-oriented programming, providing structures for designing and organizing code.

**Abstract Class:**
- An abstract class is a class that cannot be instantiated on its own and often serves as a base for other classes to inherit from. It may contain abstract methods (methods without a body) that must be implemented by its subclasses.

```java
abstract class Shape {
    // Abstract method without a body
    public abstract void draw();

    // Non-abstract method with a body
    public void display() {
        System.out.println("Displaying shape");
    }
}

class Circle extends Shape {
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle extends Shape {
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}
```
- In this example, Shape is an abstract class with an abstract method draw(). Circle and Rectangle are concrete classes that extend Shape and provide implementations for the draw() method. An abstract class can have both abstract and non-abstract methods.

**Interfaces:**
- An interface is a contract that specifies a set of methods that a class implementing the interface must provide. It defines a blueprint of methods that must be implemented by the implementing class.

```java
interface Printable {
    void print();
}

class Document implements Printable {
    public void print() {
        System.out.println("Printing document");
    }
}

class Image implements Printable {
    public void print() {
        System.out.println("Printing image");
    }
}
```
- In this example, Printable is an interface with a method print(). Both Document and Image classes implement the Printable interface, providing their own implementation of the print() method.


**Instantiation:** Abstract classes cannot be instantiated on their own, while interfaces cannot be instantiated at all. A class can implement multiple interfaces, but it can extend only one abstract class.

**Method Implementation:** Abstract classes can have concrete methods along with abstract methods, whereas interfaces can only have abstract methods (prior to Java 8, default and static methods were introduced in interfaces).

**Purpose:** Abstract classes are used to define a common base for related classes, while interfaces are used to define a contract that classes can adhere to, allowing for multiple types of inheritance.

#### *Can we extend two class at a time? – Ans is NO*

#### *Why Marker interface does not have any methods.?*
