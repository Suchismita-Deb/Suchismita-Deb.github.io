+++
title = 'Topic 1'
date = 2024-12-10T21:27:14+05:30

tags = ['interviewQuestion', 'java']
+++

### Question 1. What are the steps to create a Singleton class?

Create the private constructor og the class. static instance variable. Public static method to return the single
instance of the class. Multithreaded environment hen double check lock.

Link - https://github.com/Suchismita-Deb/LowLevel_HighLevel_SystemDesign/blob/main/src/main/java/org/example/DesignPattern/CreationalDesignPattern/SingletonDesignPattern/notes.md

### Question 2. What are the new features introduced in Java 8.

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
**Difference between lambda and anonymous class.**

Lambda - Short ideal for single method implementations of functional interfaces like Runnable, Callable, Comparator.
`Runnable r = () -> System.out.println("Lambda Example");`
It donot create a new class file. It use invoke dynamic bytecode instruction for functional interface implementation.
Lambda expressions work only with functional interfaces, they can't be used to extend classes or implement multiple methods.
Lambda in inline comparator.
```java
Collections.sort(names, (o1, o2) -> o2.compareTo(o1)); // Reverse alphabetical order
System.out.println(names); // Output: [Zara, John, Jane, Adam]

Collections.sort(names, Comparator.reverseOrder());
```


Anonymous class - Verbose code. It is used to implement interfaces with multiple methods or extends classes.
```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Anonymous Class Example");
    }
};
```
Anonymous class extend class.
```java
class Animal {
    void sound() {
        System.out.println("Some generic animal sound");
    }
}

Animal dog = new Animal() {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
};
dog.sound(); // Output: Dog barks
```
Anonymous class in sorting comparaators.
```java
import java.util.*;

List<String> names = Arrays.asList("John", "Jane", "Adam", "Zara");

Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        return o2.compareTo(o1); // Reverse alphabetical order
    }
});

System.out.println(names); // Output: [Zara, John, Jane, Adam]
```
It creates a separate inner class file at runtime.

### Stream API.

Provides a functional approach to process collections, making operations like filtering, mapping and reduction easier.

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 4, 56, 6, 7, 78, 89);
list.stream().filter(x->x%2==0).forEach(System.out::println);
```
**Default and static method in interfaces.**
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
It encourages functional programming like map, filter, ifPresent.
```java
// Empty optional.
Optional<String> empty = Optional.empty();
// Non Empty Optional.
Optional<String> name = Optional.of("John");
// Optional with Nullable value.
Optional<String> nullableName = Optional.ofNullable(null);
```

Methods in Optional.

isPresent() and ifPresent()
```java
Optional<String> name = Optional.of("John");

// Check if value is present
if (name.isPresent()) {
    System.out.println("Name: " + name.get());
}

// Perform action if value is present
name.ifPresent(value -> System.out.println("Name: " + value));
```
orElse() and orElseGet() and orElseThrow()
```java
String value = nullableName.orElse("Default Name");
System.out.println(value); // Output: Default Name

String lazyValue = nullableName.orElseGet(() -> "Generated Default Name");
System.out.println(lazyValue);

String value = nullableName.orElseThrow(() -> new IllegalArgumentException("Value is missing!"));

```
get(), filter(), map() and flatMap().
```java
String nameValue = name.get(); // It throws NoSuchElementException.

Optional<String> filtered = name.filter(n -> n.startsWith("J"));
filtered.ifPresent(System.out::println); // Output: John

Optional<Integer> length = name.map(String::length);
length.ifPresent(System.out::println); // Output: 4

Optional<Optional<String>> nestedOptional = Optional.of(Optional.of("Nested Value"));
Optional<String> flattened = nestedOptional.flatMap(value -> value);
flattened.ifPresent(System.out::println); // Output: Nested Value
```

Example of using Optional.
```java
public String getName(Person person) {
    if (person != null) {
        Address address = person.getAddress();
        if (address != null) {
            return address.getCity();
        }
    }
    return "Unknown";
}
```
Using Optional.
```java
public String getName(Person person) {
    return Optional.ofNullable(person)
                   .map(Person::getAddress)
                   .map(Address::getCity)
                   .orElse("Unknown");
}
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


### Question 3. Difference between flatmap and map.

Map transform each item in a collection into something else and produces a collection of the same size.
Transforms each element of the stream into another form (1-to-1 mapping). The result is a Stream of Streams if the transformation returns a Stream.
```java
List<String> words = Arrays.asList("hello", "world");
List<Stream<Character>> result = words.stream()
                                       .map(word -> word.chars().mapToObj(c -> (char) c))
                                       .collect(Collectors.toList());
// Result: [Stream[h, e, l, l, o], Stream[w, o, r, l, d]]
```
Use when you want to transform each element independently, and the transformation results in a single output per input. Example: Converting a list of strings to their lengths.
```java
List<String> words = Arrays.asList("hello", "world");
List<Integer> lengths = words.stream()
                             .map(String::length)
                             .collect(Collectors.toList());
// Result: [5, 5]
```

Flatmap transforms each item but can combine items from nested collections into a single flat collections.
Transforms each element into a Stream and flattens all these Streams into a single Stream (1-to-many mapping).
```java
List<String> words = Arrays.asList("hello", "world");
List<Character> result = words.stream()
                              .flatMap(word -> word.chars().mapToObj(c -> (char) c))
                              .collect(Collectors.toList());
// Result: [h, e, l, l, o, w, o, r, l, d]
```
Use when each element needs to be transformed into multiple elements (or a stream of elements) and you want a flat result. Example: Splitting a list of sentences into words.
```java
List<String> sentences = Arrays.asList("hello world", "java streams");
List<String> words = sentences.stream()
                              .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
                              .collect(Collectors.toList());
// Result: [hello, world, java, streams]
```

### Question 3. Stream Operation.
Finding sum, min, max, concatenate string.
It combines two operations and produce a single result.
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
// Using reduce() to sum the numbers. 
int sum = numbers.stream().reduce(0, (a, b) -> a + b); // Adding the number with 0.

int max = numbers.stream()
        .reduce(Integer.MIN_VALUE, (a, b) -> a > b ? a : b);

System.out.println("Max: " + max); // Output: Max: 5


List<String> words = Arrays.asList("Java", "Stream", "Reduce");
String result = words.stream()
        .reduce("", (a, b) -> a + " " + b);

System.out.println("Concatenated String: " + result.trim());
// Output: Concatenated String: Java Stream Reduce


int product = numbers.stream()
        .reduce(1, (a, b) -> a * b); // Starting from 1.

System.out.println("Product: " + product); // Output: Product: 120

```

### Question 4. Internal work of hashmap.
HashMap implements the **Map** interface and allows the storage and retrieval of data using hashing.
**Arrays of Bucket** - The data structure used is array and the index is called a **Bucket**.
Each bucket can store multiple entries via linked list.

**Node** - Each key value pair is stored in a node object which contain **hash** - the hashcode of the key, **Key** - the actual key, **Value** - the value associated with the key, **Next** - Referenced to the next node in the same bucket.

**Insertion**.

**Hash Calculation** - 
`put(key,value)` The hashcode() method of the key is called to generate the hash code. The hashcode is compressed `(hash^(hash>>>16))` to reduce the collision.

**Bucket Index** - The index of the array is determined by `index=hash&(n-1)` n is the size of the array(power of 2).

**Collision Handling** - When the bucket is empty then it is directly added, and it contains a value then it is stored in linked list and if the number of entries in bucket exceeds limit(8 by default) then linked list is converted to a balanced red-black tree.

**Key Comparison** - When two key has same hash code the equal() is used to see the equality and if the key matched the existing key then the value is added or replaced based on logic.

**Retrieval**.

The hash code of the key is computed and compressed to find the bucket index. The bucket is searched for the node using the hash and then equal() to compare key. When the key is found then return the value else null.

### Question 5. Method Overloading.

More than one method with same name as long as the method has different parameter lists (different number of parameter or different types of parameters). It is compile time polymorphism.

Return type can be same or different, method signature should be unique. Java determines which method to call based on the method signature at compile time.