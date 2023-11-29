+++
title = 'Building Blocks'
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

---
### Packages.
We import packages and then we can use the class inside the package.
```java
import java.util.Random;
public class ImportExample {
    public static void main(String[] args) {
        Random r = new Random(); // DOES NOT COMPILE without the import package.
        System.out.println(r.nextInt(10));
    }
}
```
Java classes are grouped into packages. The import statement tells the compiler which package to look in to find a class.

* If the package name starts with java or javax, this means it came with the JDK.

* If it starts with something else, it likely shows where it came from using the website name in reverse. For example, com.amazon.javabook tells us the code came from Amazon.com.

### Wildcard.
We can `import java.util.*;` that will import everything inside the util package.

* The * is a wildcard that matches all classes in the package.
  Every class in the java.util package is available to this program when Java compiles it. It doesn’t import child packages, fields, or methods; it imports only classes.

* To import other types we have *static import*.

* Including all the classes will not slow down the program. The compiler figures out what’s actually needed.

### Redundant Import.
Everything inside the `java.lang` is automatically imported. We do not have to import it specifically.

### Naming Conflict.

* We use the package so that the class name should not be unique all the time.
* We can have one class present in many packages. Like the `Date` class. There is `java.util.Date` and ` java.sql.Date`
* For one class we can write the util or sql. We need to be careful when we need to use both. When class present in multiple package java gives an compilation error.
```java
import java.util.*;
import java.sql.*;
```

* We can specifically import the date from the util. When we explicitly import a class name, it takes precedence over any wildcards present.
```java
import java.util.Date;
import java.sql.*;
```

* **What does Java do with “ties” for precedence?**
```java
import java.util.Date;
import java.sql.Date;
```
This is not good. In case we really need then we can import one and write another in the main.
```java
import java.util.Date;
public class Conflicts {
    Date date;
    java.sql.Date sqlDate;
}
```
Or we can write both in the same way.
```java
public class Conflicts {
    java.util.Date date;
    java.sql.Date sqlDate;
}
```
### Creating own package.
```java
package packagea;
    public class ClassA {
    }
    
package packageb;
import packagea.ClassA;
public class ClassB {
    public static void main(String[] args) {
        ClassA a;
        System.out.println("Got it");
    }
}
```

* Here we cannot run `java packageB/ClassB.java` This is for single file and ClassB is dependent on ClassA.

### Compiling and running code with packages.

We create a new packageA and classA and another packageB and classB. Then to compile we can directly write like `javac packagea/ClassA.java packageb/ClassB.java`
* When the command will work we will get two file `packagea/ClassA.class` and `packageb/ClassB.class`.
* We can use wildcard to compile the file `javac packagea/*.java packageb/*.java`.
* We cannot use wildcard to include the subdirectories `javac *.java` then the code in the package will not be picked.
* Now that the code is compiled we can write `java packageb.ClassB`
* By default the javac command make the file to the same directory and we can change the directory by the -d command to target the directory.

* The command `javac -d classes packagea/ClassA.java packageb/ClassB.java` will create the class file in the folder name classes. The class file will be created in ` classes/packagea/ClassA.class`.
* To run the program we need to specify the classpath so that Java knows where to find the classes.
```java
java -cp classes packageb.ClassB
java -classpath classes packageb.ClassB
java --class-path classes packageb.ClassB
```
### Compiling with JAR files.
A Java archive (JAR) file is like a zip file of mainly Java class files.
103 and 104 page to be done.
---
First we write the package, import then class.
* A file can have multiple classes but only one public class.


### Sample
1. Which of the following are true statements? (Choose all that apply.)

- [ ] Java allows operator overloading.
- [X] Java code compiled on Windows can run on Linux. (Platform independent)
- [ ] Java has pointers to specific locations in memory.
- [ ] Java is a procedural language.
- [X] Java is an object-oriented language.
- [ ] Java is a functional programming language.

Answer - Java has no operator overloading and pointer. Java does have references to objects, but these are pointing to an object that can move around in memory. It does support some parts of functional programming, these occur within a class.

2. Which of the following are true? (Choose all that apply.)
- [ ] javac compiles a .class file into a .java file.
- [ ] javac compiles a .java file into a .bytecode file.
- [X] javac compiles a .java file into a .class file.
- [X] java accepts the name of the class as a parameter.
- [ ] java accepts the filename of the .bytecode file as a parameter.
- [ ] java accepts the filename of the .class file as a parameter.

Answer - There is no .bytecode file.

3. Which of the following are true if this command completes
   successfully? (Choose all that apply.)
   java MyProgram.java
- [ ] A .class file is created.
- [ ] MyProgram can reference classes in the package com.sybex.book.
- [X] MyProgram can reference classes in the package java.lang.
- [X] MyProgram can reference classes in the package java.util.
- [ ] None of the above. The program needs to be run as java MyProgram.

Answer - This is the single file source code. It compiles in memory rather than creating a .class file. To use this launcher, programs can only reference classes built into the JDK.

4. What can we put in the import place?
```java
package aquarium;
public class Water {
boolean salty = false;
}
package aquarium.jellies;
public class Water {
boolean salty = true;
}
package employee;
INSERT IMPORTS HERE
public class WaterFiller {
Water water;
```
- [X] import aquarium.*;
- [X] import aquarium.Water; import aquarium.jellies.*;
- [X] import aquarium.*;
  import aquarium.jellies.Water;
- [ ] import aquarium.*;
  import aquarium.jellies.*;
- [ ] import aquarium.Water;
  import aquarium.jellies.Water;

Answer - First imports everything. Second one importig specifically more power and also wildcard. Same for the third. 4th both wildcard not allowed of same method. Fifth incorrect because we cannot specify the same class name in two imports.

---
### Constructor
* Same name of the class and no return type.
* Constructor is called when we write `new ClassName()`.
* The purpose of construtor is to initialize the fields. It can be done in any of the process.
```java
public class Chicken {
    int numEggs = 12; // initialize on line
    String name;
    public Chicken() {
        name = "Duke"; // initialize in constructor
    }
}
```
* There is default constructor which does not take and parameter. We can create a new instance without using the constructor or the new keyword.

* Like we can create the instance of `Integer` using the `valueOf` method.
* The constructor runs after all fields and instance initializer blocks have run.

--- 
* Java has 8 primitive data type.

  |Keyword|Type|Example|
    |:---|:---|:---|
  |boolean|true or false |true
  |byte|8-bit integral value –128 to 127|123
  |short|16-bit integral value signed|123
  int|32-bit integral value|123
  long|64-bit integral value|123L
  float|32-bit floating-point value|123.45f
  double|64-bit floating-point value|123.456
  char|16-bit Unicode value|'a'

* When a number is present in the code, it is called a literal. `long max = 3123456789L;` We need to write 'L' for long.

* We can have '_' to make it more readable.
  ```java
  int million1 = 1000000;
  int million2 = 1_000_000;
  ```
* You can add underscores anywhere except at the beginning of a literal, the end of a literal, right before a decimal point, or right after a decimal point. We can even write multiple underscore together.

* Reference type. The today variable is a reference of type Date and can only point to a
  Date object.
```java
java.util.Date today;
String greeting;
```

From Building blocks Java 17 part 6 will continue and first chapter of Java 11.