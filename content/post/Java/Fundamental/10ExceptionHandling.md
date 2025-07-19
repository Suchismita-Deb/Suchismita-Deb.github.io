+++
title = 'Exception Handling in Java.'
date = 2023-11-12T15:56:18+05:30

url= "/post/java/fundamental/ExceptionHandlingInJava"
tags=['interviewQuestion', 'java']
+++



**What is an Exception?**

- It is an **event** that occurs during the execution of the program.
- When executing the program the event will disrupt the program normal flow.
- When an exception happens the runtime system creates an **Exception object** which contains the information about the error like 
    - Its type of exception and message.
    - Stack trace.
- Runtime system use this exception object and find the class which can handle it. 

When exception comes then internally one exception object is created.

Example - Program starts from main. Main calls Method 1 -> Method 2 -> Method 3.
There is an exception in Method 3 then internally it will create an Exception Object.

Now the runtime use the Exception Object and it will check the class that can handle the exception.

First it will check Method 3 if it can handle the exception. Then it will go to Method 2 to handle the exception. Similarly it will ask main. If the exception is not handled then the runtime will terminate the program abruptly.
<br>
```java
public class ExceptionHandling {
    public static void main(String[] args) {
        method1();
    }
    
    private static void method1(){
        method2();
    }

    private static void method2() {
        method3();
    }

    private static void method3() {
        int a = 8/0;
    }
}
```

The output should look like
```java
Exception in thread "main" java.lang.ArithmeticException: / by zero
        at designPattern.ExceptionHandling.method3(ExceptionHandling.java:20)
        at designPattern.ExceptionHandling.method2(ExceptionHandling.java:16)
        at designPattern.ExceptionHandling.method1(ExceptionHandling.java:12)
        at designPattern.ExceptionHandling.main(ExceptionHandling.java:8)
```

The Exception shows the type of Exception and exception message.
The type of Exception is `Arithmetic Exception` the message is `/ by zero` Then the details and it contains the stack trace.

The first line in the output shows the exception and the next lines shows the stack trace. Stack Trace - Starting the place where exception to the main.

When exception happened in one method say 3 then it see the method declaring the method 3 say method 2 if it can handle then good else it will go to the method that declared method 2 say method 1.

{{<figure src="/images/SystemDesign/ExceptionHierarchy.png" alt=" Exception Hierarchy." caption="Exception Hierarchy">}}

### Error and Exception
Object is parent of all and its child class is Throwable and it has Error and Exception

Error - You cannot control. Like **OutOfMemoryError**, **StackOverflowError**.
These are related to JVM issue. Like JVM can not able to create any new object in heap and heap is full then OutOfMemoryError. Error is unchecked exception as it will compile when running I will get the out of memory error.


```java
public class ExceptionHandling {
    public static void main(String[] args) {
        String[] arr = new String[900000000 * 90000000 * 900000000 * 90000000];
    }
}
```
The output is OutofMemoryError.
```java
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at designPattern.ExceptionHandling.main(ExceptionHandling.java:9)
```

Error is JVM issue and we cannot able to control that. Exception is on the basis of our code. We can handle Exception.

### Types of Exception.
**Unchecked Exception RunTime Exception.** The program will compile and throws exception while running.

**Checked Exception Compile Time Exception.** The program will not compile.

*Error is an **Unchecked Exception**. At run time this error comes.*
### Runtime Exception.
These occurs in runtime and compiler does not force us to handle it.
```java
public class check {
    public static void main(String[] args) {
        method1();
    }

    private static void method1() {
        throw new ArithmeticException();
    }
}
```
ArithmeticException is a runtime exception. We need to put that in try and catch. The program will compiler proper lyand there will be class file while running we get the exception.

### ClassCast Exception.
```java
public class Main{
    public static void main(String args[]){
        Object val = 0;
        System.out.println((String) val);
    }
}
```
The exception Integer cannot be thrown as string.
### Arithmetic Exception.
```java
public class Main {
    public static void main(String args[]) {
        int val = 5/0;
    }
}
```
Arithmetic exception / by 0 at Main.
### IndexOutOfBound Exception.
```java
int arr[] = ne wint[2];
System.out.println(arr[3]);
```
The exception ArrayIndexOurOfBound.

### Null Pointer Exception.
