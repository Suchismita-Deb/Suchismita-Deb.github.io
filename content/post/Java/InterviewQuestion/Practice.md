+++
title = 'Practice'
date = 2024-10-29T13:51:06+05:30
tags = ['interviewQuestion']
categories = ['java']
+++

Design Pattern - Behavoiral, Creational and Structural.

| Creational       | Behavioral              | Structural |
|------------------|-------------------------|------------|
| Singleton        | Template                | Adapter    |
| Builder          | Mediator                | Composite  |
| Factory          | Chain of Responsibility | Proxy      |
| Abstract Factory | Observer                | Flyweight  |
| Prototype        | Strategy                | Facade     |
|                  | Command                 | Bridge     |
|                  | State                   | Decorator  |
|                  | Visitor                 |            |
|                  | Interpreter             |            |
|                  | Iterator                |            |
|                  | Memento                 |            |

### Creational Design Pattern.

**Singleton Design Pattern** - A design pattern that allows you to ensure that a class has only one instance while providing a global access point to the instance.

**Builder Design Pattern** - It simplifies the creation of complex objects by breaking the creation process into steps. It is useful when the constructor has many parameters instead of creating many constructor the builder encapsulated the construction logic within itself.

**Factory Design Pattern** - It creates an object without exposing the creation logic to the client and the created object is referred to using a common interface. It provides an interface to create and object in a superclass and allows the subclass to alter the type of object. It hides the instantiation process and returns the instance of the class as an interface which represents the newly created object.

**Abstract Factory Design Pattern** - It provides an interface for creating families of related or dependent objects without specifying their concrete class. It provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete class.

**Prototype Design Pattern** - It create a clone of an existing object rather than creating a new one, for performance reasons.

### Behavioral Design Pattern.

**Template Design Pattern** - It provides the skeleton of an algorithm in the superclass and then allows the subclass to override the steps in the algorithm without changing its structure.

**Mediator Design Pattern** - It is used to reduce communication complexity between multiple objects or classes. The pattern provides a mediator class that handles all the communications between different classes.


**Chain of Responsibility** - It allows the request to pass through a chain of handlers where they process it or pass to the next handlers. 

**Observer Design Pattern** - It defines a one to many dependency between objects so that when one object changes state all its dependents are notified and updated automatically.

**Strategy Design Pattern** - It uses a group of algorithm and encapsulates each one and makes them interchangeable. It let the algorithm vary independently of client that use it. It allows to select an algorithm at runtime. It helps in eliminating or avoiding complex conditional statements.

**Command Design Pattern** - It allows to encapsulate the request as an object there by letting users parameterize
clients with queues, requests and operations.

**State Design Pattern** - It allows an object to change the behaviour when its internal state changes. The object will appear to change its class.

**Visitor Design Pattern** - It represents and operation to be performed on the elements of an object structure without changing the classes on which it operates.

**Interpreter Design Pattern** - It defines a grammar for a language and uses an interpreter to interpret the sentence on that language making it useful for designing simple language processors or evaluators.

**Iterator Design Pattern** - It provides the way to access the elements of an aggregate objects sequentially without exposing its underlying representation.

**Memento Design Pattern** - It captures and stores an objects internal state allowing it to restored later without exposing its implementation details which is useful for undo or rollback functionality. 

### Structural Design Pattern.

**Adapter Design Pattern** - It allows classes with incompatible interfaces to work together by wrapping its own interface around that of an already existing class. It involves a single class adapter which is responsible for communication between two independent or incompatible interfaces.

**Composite Design Pattern** - It let use to create an object in tree structure and work with the structure as if they are individual objects. It is useful for representing a part-whole hierarchies.

**Proxy Design Pattern** - It provides a surrogate or placeholder for another object to control access to it.

**Flyweight Design Pattern** - It minimise memory usage by sharing common parts of state between multiple objects thus reducing the overhead of creating large number of similar objects.

**Facade Design Pattern** - It provides a simplifies interface to a complex subsystem, making it easier to interact with that subsystem by hiding its complexities and providing a higher level interface.

**Bridge Design Pattern** - It decouples an abstraction form its implementation so that the two can vary independently.

**Decorator Design Pattern** - It is also called wrapper. It wraps an object and add new behaviour to it. It provides an enhanced interface to the original objects.