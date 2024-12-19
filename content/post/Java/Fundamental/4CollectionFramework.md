+++
title = 'CollectionFramework'
date = 2024-12-19T09:47:46+05:30
url= "/post/java/fundamental/CollectionFramework"
tags = ['interviewQuestion', 'java']
+++
Java Collection Framework.

Introduced in Java 1.2

Collections are group of object. It is present in java.util pacakge.
Framework provides the architecture to manage the "group of objects" that is add, update, delete, search.

### Multithreading and Concurrency.

Introduction to Multithreading.
Java Memory Model of Process and Thread.

### What is Thread and Process.

In process we have thread.

Process is an instance of a program that is getting executed.

There is one program.

```java
public class Test{
    public static void main(String[] args){
        System.out.println("Hello");
    }
}
```

Compile the class. `javac Test.java` - It will generate the bytecode that can be executed by JVM.

The byte code need to execute.
Execution. `java Test` - JVM starts the new Process., here the Test is the class that has the main method.
Process says it is an instance of a program that is getting executed.

It has its own resource like memory, thread. OS allocates these resources to process when its created.

When one process is created it creates its own heap memory.

When we execute a program a process is created and own heap memory is created and two process donot connect with each other.