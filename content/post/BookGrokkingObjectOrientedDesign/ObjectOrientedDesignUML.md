+++
title = 'Object Oriented Design UML'
date = 2023-12-02T15:17:19+05:30
+++



# Grokking the Object-Oriented Design.

The process of OO analysis and design can be described as:
1. Identifying the objects of a system.
2. Defining relationships between objects.
3. Establish an interface of each object.
4. Making a design, which can be converted to executables using OO languages.

We need a standard method/tool to document all this information - we use UML.

UML diagrams are a representation of object-oriented concepts only.

# UML DIAGRAM - Unified Modeling Language.
There are 14 kinds of UML Diagram. It is organized in 2 distinct groups -
**Structural Diagram** -  structure of a system or process.
**Behavioral or Interaction Diagrams** - behavior of the
system, its actors, and its building components.

### Structural UML diagrams

- **Class diagram** - Describe structure and behavior in the use cases. This diagram provides a conceptual model of the system in terms of entities and their relationships
- Object diagram.
- Package diagram.
- Component diagram.
- Composite structure diagram.
- Deployment diagram.
- Profile Diagram

### Behavioral UML diagrams

- **Use case diagram** - Describe a set of user scenarios. It illustrates the functionality provided by the system.
- **Activity diagram** - Used to model the functional flow of control between two or more class objects.
- **Sequence diagram** - Sequence diagrams describe interactions among classes in terms of an exchange of messages over time.
- State diagram.
- Communication diagram.
- Interaction overview diagram.
- Timing diagram.

## Use Cases Diagram.
- Describes the set of actions or use cases that a system can perform with the users or actors.
- It describes high level functional behaviour of the system.

Example - The actors on the left and right side and the use cases in circle shape.
![img.png](/images/img27.png)
**Include** - This means one function is called by others.

**Extend** - The extended functionality will work like the base cases with some extra functions.

## Class Diagram.
- Shows how different entities are connected. It shows the static structure of the system.
- Shows the attributes and the operations of the class.
- It can be directly mapped to object-oriented code.
- It is shown as a box with 3 section. First section is **class name**, the middle section is the **properties** of the class and the last section is the **class methods**.

---
## There are different types of relationship in a classes.
### *Association* 

- When one class is associated with other class then we represent with an arrow with the direction of navigation.
- By default, the association is bidirectional. Both the class know about each other. Example the `Pilot` and `FlightInsurance` both class know each other exists.
- The uni-directional association means when one class knows about the other 

### *Multiplicity*
- Indicates number of instance of the class is there in the relationship.
- Example One FlightInstance will have two Pilots, while a Pilot can have many FlightInstances.

![img.png](/images/img28.png)







### Designing System Design.

System Requirement.

Use Cases Diagram.

Class Diagram.

Activity Diagram.