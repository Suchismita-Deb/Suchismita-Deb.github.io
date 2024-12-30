+++
title = 'Topic 4'
date = 2024-12-24T08:43:39+05:30

url= "/post/java/interviewquestion/topic4/"
tags = ['interviewQuestion', 'java']
+++

## What is finally, finalise and final.

### finally

Definition: A block in a try-catch statement that always executes, regardless of whether an exception is thrown or not.
Purpose: Used for cleanup actions like closing files, releasing resources, or disconnecting from a database.
Key Points:

The finally block executes even if the try block contains a return statement.
It does not execute if the JVM terminates abruptly (e.g., with System.exit())

```java 
public class FinallyExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // Will throw ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Exception caught: " + e.getMessage());
        } finally {
            System.out.println("This block always executes.");
        }
    }
}
```
The output.
```
Exception caught: / by zero
This block always executes.
```

finalize:

Definition: A method in the Object class that can be overridden to clean up resources before an object is garbage collected.
Purpose: Used for resource management (like closing files or releasing memory), though it's not recommended for modern applications.
Deprecated: As of Java 9, finalize() is deprecated due to performance issues and unpredictability.
Key Points:

Called by the garbage collector before the object is destroyed.
Not guaranteed to execute promptly or even at all.

```java
public class FinalizeExample {
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Finalize method called.");
    }

    public static void main(String[] args) {
        FinalizeExample obj = new FinalizeExample();
        obj = null; // Make the object eligible for garbage collection
        System.gc(); // Suggest garbage collection
        System.out.println("End of main method.");
    }
}

```
The output
```
End of main method.
Finalize method called.
```

final:

Definition: A keyword that can be applied to variables, methods, or classes to restrict their behavior.
Purpose: Used to define constants, prevent method overriding, and prevent inheritance.
Key Points:

Final Variables: Once assigned, their value cannot change.
Final Methods: Cannot be overridden in subclasses.
Final Classes: Cannot be extended by other classes

```java
public class FinalVariableExample {
    public static void main(String[] args) {
        final int CONSTANT = 10;
        // CONSTANT = 20; // Compilation error: cannot assign a value to final variable
        System.out.println("Final variable value: " + CONSTANT);
    }
}
```


Path sum binary tree.
Linked list.
Kadane.
Graph.
