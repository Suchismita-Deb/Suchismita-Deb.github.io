+++
title = 'BuildingBlocks'
date = 2023-11-26T21:05:08+05:30
+++



### Major component of Java.

The **Java Development Kit JDK** contains the minimum software required for the Java development.

Important things included in the JDK.

- The compiler **javac** - Converts the .java file to the .class file.
- The launcher creates the virtual machine and executes the program.
- java: Executes the program.
- jar: Archiver command. Packages files together.
- javadoc: The API documentation command. Generates documentation .

> The javac program generates instructions in a special format called **bytecode** that the java command can run.

The Java then launches the JVM before running the code. The JVM knows how to run the java code, the `.class` file in the machine it is running.

---
### JRE

In previous version of Java we can download the **JRE(Java Runtime Environment)** only that is the subset of **JDK** that was used for running the program but cannot compile it.

* In folder structure the JRE is a sub directory of the JDK.
* From Java 11 JRE cannot be used as a stand alone and there is no subdirectory for the JRE.
* Need JDK to run the program.
* Now developers can supply an executable that contains the required pieces that would have been in the JRE. The `jlink` command creates this executable.

---
1. Java is Object oriented means all code is inside a class. Languages can be **procedural** means there are routines or methods but no classes.
2. Java is an **interpreted language** that gets compiled to the bytecode.
3. A key benefit is that Java code gets compiled once rather than needing to be recompiled for different operating systems. This is known as “write once, run everywhere.”
4. The portability allows you to easily share pre-compiled pieces of software.
5. Java code runs inside the JVM. This creates a sandbox that makes it hard for Java code to do evil things to the computer it is running on.

---
### Understanding the Java class structure.

* Classes are the basic building blocks. An object is the runtime instance of a class in memory. An object is an instance since it represents a single representation of the class.
    * A reference is a variable that points to an object.
    * Other building blocks are enum, interface, records.

* Java has 2 primary elements - methods (other language called it as procedure or function) and fields (also known as variable).
    * Together these are called members.
    * Variables hold the state of the program, and methods operate on
      that state.


> The method name and parameter types are called the **method signature**.
>
> The **method declaration** consists of additional information such as the
return type.


---

### Classes and Source File.
* Most of the time, each Java class is defined in its own `.java` file. It is usually public which can be used from other class.
* Even in one file we can have more than one class. In that case atmost one file can be public.
```java
public class Animal{
    String name;
}
class Animal1{
}
```
* If there is more than one class in a same file then the file name should be same as the class which is public. In this case the file name should be Animal.
* If there is a public class it should be matched with the file name.

---
### Writing a main() method.
* A Java program begins execution with its main() method. It is the starting point that the JVM looks for when it begins running a new program.
* The main example.
```java
class Zoo{
public static void main(String[] args) {

    }
}
``` 
* To run the program we need to type.
```java
javac Zoo.java
java Zoo
```
* In the main method we can write
```java
String[] args
String args[]
String... args
```
* The `...` is called the `varargs` means variable argument lists.

* The `args` name can also be different. This is also allowed.
```java
String[] options
String options []
String... options
```


---
### Passing parameters to the main method.

We can modify the Zoo program to print out the first two arguments passed in.
```java
public class Zoo {
    public static void main(String[] args) {
        System.out.println(args[0]);
        System.out.println(args[1]);
    }
}
```
To run the method we need to write.
```java
javac Zoo.java
java Zoo "Royal Bengal Tiger" Lion
```
If the argument contains space then we need to pass in quotes. The output is
```java
Royal Bengal Tiger.
Lion.
```

* The JDK contains a compiler. Java class files run on the JVM and therefore run on any machine with Java rather than just the machine or operating system they are running.


    Single-File Source Code. 
In place of writing the `javac` and `java class` all the time we can do this in one line like `java Zoo.java Tiger Zoo`.
* This feature is called launching single-file source-code programs and is useful for testing or for small programs. This will only work when the program is for one file. If program has two `.java` file then we need to run javac file.

* If there is any syntax error in the file and we use the single line to run the program then it will give compilation error. As with this one line it will compile the code in memory. Java is still a compiled language. It will get compiled.

|Fully running command|Single-file source-code command|
|:---|:---|
|Produce the class file.|Fully in memory|
|For any program.|For program with one class.|


Continuation from page 91.
Part 4.