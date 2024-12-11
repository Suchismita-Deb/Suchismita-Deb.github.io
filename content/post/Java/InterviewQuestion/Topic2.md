+++
title = 'Topic 2'
date = 2024-12-08T21:34:45+05:30

tags = ['interviewQuestion', 'java']
+++

### Question 1.

What is the output?

```java
public static void main(String[] args) {
    Integer num = 10;
    modify(num);
    System.out.println(num);
}

public static void modify(Integer num) {
    num = 200;
}
```

The output is 10.
Java is pass by value. Primitive are pass by value. Wrapper class will work but not Integer as Integer is immutable.
Wrapper class with immutable like `AtomicInteger` or custom Wrapper class will work.

We can reassign. The object will be created. We cannot see the memory of the object. The hashcode is the unique for the
object.

```java
public static void main(String[] args) {
    Integer num = 10;
    modify(num);
    System.out.println(System.identityHashCode(num)); // 617901222
    num = 100;
    System.out.println(System.identityHashCode(num)); // 1159190947
    System.out.println(num);
}
```

## Question 2.

What are the steps to create a Singleton class?

Create the private constructor og the class. static instance variable. Public static method to return the single instance of the class. Multi threaded environment hen double check lock.

Link - https://github.com/Suchismita-Deb/LowLevel_HighLevel_SystemDesign/blob/main/src/main/java/org/example/DesignPattern/CreationalDesignPattern/SingletonDesignPattern/notes.md
