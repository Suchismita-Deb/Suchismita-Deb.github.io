+++
title = '1OOPS'
date = 2024-12-19T09:34:31+05:30

url= "/post/java/fundamental/OOPS"
tags = ['interviewQuestion', 'java']
+++
### Java OOPS.

| Procedural Programming                                                                       | Object Oriented Programming.          |
| -------------------------------------------------------------------------------------------- | ------------------------------------- |
| Program is divided into parts called functions.                                              | Program is divided into Objects.      |
| Does not provide proper way to hide data, gives importance to function and data move freely. |
| Overloading, Inheritance is not possible.                                                    | Overloading, Inheritance is possible. |
| C                                                                                            | Java                                  |

### Abstraction.

It hides the internal implementation and shows only essential functionality to the user. It can be achieved through interface and abstract class.

Example - Car and break the functionality is not known.

### Encapsulation.

It bundles the data and the code working on the data in a single unit.
It is also known as Data Hiding.

### Overview.

Java is a Object oriented language and it is WORA - Write Once and Run Anywhere.

JDK - has JRE - has JVM.

Java PRogram is platform independent and it compiles to bytecode (.class file is generated) and then JVM converts to the machine code and runs by CPU.

JVM is machine dependent installed for mac or window and it can convert the java program as it has JIT(Just In Time) compiler.

JRE - has the class library and JVM.

### Why there is only one public class in java and main class is inside the public class.

Jvm calls the main method and it calls by the class and the method is static.

It directly calls A.main().

Only one public class as when there will be more public class how JVM will know that which class has the main method.
The public class should be the name of the file.
