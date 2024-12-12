+++
title = 'Topic 1'
date = 2024-12-10T21:27:14+05:30

tags = ['interviewQuestion', 'java']
+++

### Question 1.

What are the steps to create a Singleton class?

Create the private constructor og the class. static instance variable. Public static method to return the single
instance of the class. Multithreaded environment hen double check lock.

Link - https://github.com/Suchismita-Deb/LowLevel_HighLevel_SystemDesign/blob/main/src/main/java/org/example/DesignPattern/CreationalDesignPattern/SingletonDesignPattern/notes.md

### Question 2.

**What are the new features introduced in Java 8.**

The new features revolutionizes how java applications are written and optimized. Key features involved -

### Lambda Expression.

Enable functional programming with concise code for implementing functional interfaces.

It has 3 parts - Parameters, Arrow tokens, Body.

```java
List<String> list = Arrays.asList("Java", "Spring");
list.forEach(name->System.out.println(name));
```

It works in Functional Interfaces example Runnable, Callable, Comparator. 

Java 8 introduces `@FunctionalInterface` to
enforce it.

```java

@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

// Lambda implementation
MathOperation addition = (a, b) -> a + b;
System.out.println(addition.operate(5, 3)); // Output: 8
```

Before Java 8 there was anonymous inner class to implement functional interface.
```java
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running in a thread");
    }
};
new Thread(runnable).start();
```
New one.
```java
Runnable runnable = () -> System.out.println("Running in a thread");
new Thread(runnable).start();
```

### Stream API.

Provides a functional approach to process collections, making operations like filtering, mapping and reduction easier.

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 4, 56, 6, 7, 78, 89);
list.

stream().filter(x->x%2==0).forEach(System.out::println);
```
### Default and static method in interfaces.
```java
interface MyInterface {
    default void show() {
        System.out.println("Default Method");
    }
}
```

### Optional Class.

Provides a container to handle nullable values and avoid NullPointerException.
```java
Optional<String> optional = Optional.ofNullable("Hello");
optional.ifPresent(System.out::println);
```

### Date and Time API.
It is in java.time.Package It replaces the outdated `java.util.Date` and `java.util.Calendar` package.

```java
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
```

### Parallel Array Sorting.
Adds the Arrays.parallelSort() method for faster sorting using multiple thread.
```java
int[] array = {3, 2, 1};
Arrays.parallelSort(array);
```
### Adding new collector in Stream API.

Add utilities like `Collectors.toMap`, `Collectors.groupingBy`, and `Collectors.partitioningBy` for aggregations.
```java
Map<Boolean, List<Integer>> partitioned = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));
```
### Concurrency Enhancement.

Introduces CompletableFuture for Asynchronous programming.

```java
CompletableFuture.runAsync(() -> System.out.println("Running in a separate thread"));
```

### Base 64 encoding and decoding.
Provides utility classes for Base 64 encoding and decoding.
```java
String encoded = Base64.getEncoder().encodeToString("Java8".getBytes());
```
