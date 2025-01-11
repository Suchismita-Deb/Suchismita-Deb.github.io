+++
title = 'Topic 5 Java'
date = 2024-12-24T09:17:01+05:30
url = "/post/java/interviewquestion/topic5/"
tags = ['interviewQuestion', 'java']
+++

### Question. Difference between HashSet and TreeSet.

The HashSet and TreeSet classes in java are the implementation of Set interface.

| Feature                    | HashSet                                                    | TreeSet                                                                                                                                                                                          |
|----------------------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Performance**            | Faster (O(1))                                              | Faster (O(logn))                                                                                                                                                                                 |
| **Order**                  | Unordered. No guarantee of order depends on hash function. | Sorted Natural or custom order. <br/> The order depends on: The natural ordering of elements (via the Comparable interface). <br/> A custom comparator provided at the time of TreeSet creation. |
| **Iteration**              | Iterates in no specific order.                             | Iterates in ascending sorted order of elements (or the order defined by a custom comparator).|
| **Null Values**            | Allows one null value.                                     |Does not allow null.|
| **Internal Data structure** | It uses hashmap internally for storage.                    |It uses a Red-Black Tree (a self-balancing binary search tree) internally.|
| **Sorting**                | Custom sorting not supported                               | Custom sorting supported via comparator.                   |

```java
TreeSet<Integer> treeSet = new TreeSet<>((a, b) -> b - a); // Descending order
        treeSet.add(10);
        treeSet.add(5);
        treeSet.add(20);
System.out.println(treeSet); // Output: [20, 10, 5]

TreeSet<String> treeSet = new TreeSet<>();
        treeSet.add("Apple");
        treeSet.add("Banana");
        treeSet.add("Orange");
System.out.println("TreeSet: "+treeSet); // Sorted order

HashSet<String> hashSet = new HashSet<>();
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Orange");
System.out.println("HashSet: "+hashSet); // Order not guaranteed
```


### Question. Difference between HashMap and TreeMap.

| Feature                     |HashMap| TreeMap                                               |
|-----------------------------|-------------------------|-------------------------------------------------------|
| **Performance**             | O(1)                                          | O(logn)                                               |
| **Order**                   | No fixed order.                               | Maintain key in sorted order natural or comparator.   |
| **Null Key**                | Allows one null key and multiple null values. | Does not allow null keys allows multiple null values. |
| **Internal Data structure** | Hash Table                                    | Red Black Tree self balancing binary tree.            |


### Question. Difference between HashMap and HashTable.

| Feature           | HashMap                                                                                                                                                              | HashTable |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Thread safety** | Not thread-safe (needs external synchronization). <br/>Must use external synchronization (e.g., Collections.synchronizedMap()) if used in multithreaded environments |Thread-safe (synchronization is built-in for all methods)|
| **Null value**    | Allow one null key andmultiple null values.                                                                                                                          |Does not allow null key or null values throws NullPointerException.|
| **Performance**   | Faster due to no synchronization.                                                                                                                                    |Slower due to synchronization overhead.|
| **Package**       | Introduced in Java 1.2 part of Java Collection Framework and part of java.util package. Use in modern code.                                                          |Legacy class exists since Java 1.0 and part of java.util package. Not recommended in new code.|
| **Usage**         |Preferred in single threaded or externally synchronized multithreaded environment.|Rarely used in modern application replaced by `ConcurrentHashMap` for thread safety.|

### Question. Difference between Map and FlatMap in streamAPI.

MAP.

**Purpose**: Transforms each element in the stream into another element.  
**Output**: Produces a new stream of the same size but with transformed elements.  
**Behavior**: Applies the given function to each element, and the result is a stream of transformed values.  
**Use Case**: When you need to transform each element into a single element.

```java
List<String> list = Arrays.asList("apple", "banana", "cherry");

list.stream()
    .map(String::toUpperCase)  // Transforms each string to uppercase
    .forEach(System.out::println);  // Outputs: APPLE, BANANA, CHERRY
```

FLATMAP.

**Purpose**: Transforms each element into a stream of elements and then flattens these multiple streams into a single stream.  
**Output**: Produces a new stream where each element may expand into multiple elements (or none).  
**Behavior**: Each element is mapped to a stream, and the resulting streams are merged into a single stream.  
**Use Case**: When you need to handle nested structures or when each element can be expanded into multiple elements (like splitting strings or unwrapping lists).
```java
List<String> list = Arrays.asList("apple", "banana", "cherry");

list.stream()
    .flatMap(s -> Arrays.stream(s.split("")))  // Splits each string into a stream of characters
    .forEach(System.out::println);  // Outputs: a, p, p, l, e, b, a, n, a, n, a, c, h, e, r, r, y
```
Using map and flatmap.
```java
List<String> list = Arrays.asList("apple", "banana");

// Using map to convert each word to uppercase
list.stream()
    .map(word -> word.toUpperCase())
    .forEach(System.out::println);  // APPLE BANANA

// Using flatMap to split each word into its individual characters
list.stream()
    .flatMap(word -> Arrays.stream(word.split("")))
    .forEach(System.out::println);  // a p p l e b a n a n a
```


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


### Question. Difference between normal stream and parallel stream.
| Feature               | Normal Stream                                                                                                                                                                                                                                 | Parallel Stream                                                                                                                                                                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Execution**         | Operations on a normal stream are processed sequentially, one element at a time, in the order they appear in the source.                                                                                                                      | Operations on a parallel stream are processed concurrently by splitting the source into multiple chunks, which are processed in parallel by multiple threads.                                                                   |
| **Performance**       | Suitable for smaller datasets or operations where parallelization overhead outweighs the performance gain.                                                                                                                                    | Can provide performance benefits for large datasets or computationally expensive operations by utilizing multiple CPU cores. However, the overhead of managing parallelism may lead to slower performance for smaller datasets. |
| **Thread Management** | Runs in a single thread, typically the main thread.                                                                                                                                                                                           | Uses a common ForkJoinPool to manage threads for parallel execution, where the default pool uses as many threads as there are available CPU cores.                                                                              |
| **Order**             | Maintains the order of elements as they appear in the source.                                                                                                                                                                                 | May not guarantee the order of elements, unless explicitly handled (e.g., using forEachOrdered).                                                                                                                                |
| **Usage**             | Best for simple, small operations where parallelism isn't needed.                                                                                                                                                                             | Best for large collections or time-consuming operations that can benefit from parallel execution.                                                                                                                               |
|**Processing**|Processes all elements in the order they appear.<br/>Always uses the main thread (Thread.currentThread().getName() is main).|Processes elements concurrently using multiple threads from the ForkJoinPool.<br/>The thread names (ForkJoinPool.commonPool-worker-*) indicate parallel execution.|

The example of a normal stream.

```java
List<String> items = Arrays.asList("A", "B", "C", "D", "E");
System.out.println("Normal Stream:");
items.stream()
     .forEach(item -> {System.out.println(Thread.currentThread().getName() + " processes " + item);
});
```
The output is given.
```xml
Normal Stream:main processes A main processes B main processes C main processes D main processes E
```
```java
System.out.println("\nParallel Stream:");
// Parallel Stream (Multi-Threaded)
items.parallelStream()
     .forEach(item -> {System.out.println(Thread.currentThread().getName() + " processes " + item);
});
```
The output.
```java
Parallel Stream: ForkJoinPool.commonPool-worker-1 processes A main processes B ForkJoinPool.commonPool-worker-3 processes C ForkJoinPool.commonPool-worker-2 processes D main processes E.
```

### Question. Difference between stream and collection.

|Feature| Stream                                                                                                                                           | Collection                                                                            |
|---|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
|**Nature**| A stream is a sequence of elements supporting sequential and parallel operations.                                                                | A collection is a data structure that holds objects in memory (e.g., List, Set, Map). |
|**Storage**| Streams do not store data; they operate on the source (e.g., collections, arrays).                                                               | Streams do not store data; they operate on the source (e.g., collections, arrays).    |
|**Operation**| Streams do not store data; they operate on the source (e.g., collections, arrays).                                                               | Collections are manipulated through traditional methods (e.g., add, remove, get).     |
|**Lazy Evaluation**| Stream operations are lazy; computation happens only when terminal operations are invoked.                                                       | Collections are eagerly evaluated; data is stored and accessible immediately.         |
|**Consumption**| Streams can be consumed only once; a new stream must be created for re-use.                                                                      | Collections can be accessed multiple times without re-creation.                       |
|**Parallelism**| 	Streams can be easily processed in parallel using parallelStream().	                                                                            | Collections do not have built-in parallel processing capabilities.                    |
|**Use Case**	| Streams are designed for data processing and transformations (e.g., filtering, mapping).	| Collections are designed for storing and managing data.                               |

### Question. Difference between ConcurrentHashMap and SynchronizedHashMap.


|Feature| ConcurrentHashMap                                                                                                                                                           | SynchronizedHashMap                                                                        |
|---|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
|**Synchronization Mechanism**| 	Uses a segment-based locking (in Java 7) or bucket-level locking (in Java 8 and later).                                                                                    | 	Entire map is locked for each operation using synchronized blocks.                        |
|**Concurrency**	| Allows concurrent read and write operations by multiple threads. Only writes to the same bucket are blocked.                                                                | 	Allows only one thread to access the map at a time.                                       |
|**Performance**| 	Higher performance in multi-threaded environments due to finer-grained locking.                                                                                            | 	Lower performance due to coarse-grained locking (locks the entire map).                   |
|**Null Values**	| Does not allow null keys or values.                                                                                                                                         | 	Allows a single null key and multiple null values.                                        |
|**Thread-Safety**	| Thread-safe for concurrent access with better scalability.	                                                                                                                 | Thread-safe, but less efficient in high-concurrency scenarios.                             |
|**Locking Granularity**| 	Fine-grained locks improve throughput by reducing contention.	                                                                                                             | Coarse-grained lock blocks all threads attempting access, even for independent operations. |
|**Iteration Behavior**| 	Does not throw ConcurrentModificationException during iteration but reflects changes made by other threads.	                                                               | Throws ConcurrentModificationException if the map is modified during iteration.            |
|**Use Case**| 	Best suited for high-concurrency applications where reads and updates are frequent.| 	Suitable for low-concurrency scenarios where simplicity is preferred over performance.    |

**ConcurrentHashMap**.

The ConcurrentHashMap class is part of the Java Collections Framework and extends the AbstractMap class. It implements the ConcurrentMap and Serializable interfaces. Below is the hierarchy:
```
java.lang.Object
   └── java.util.AbstractMap<K, V>
     └── java.util.concurrent.ConcurrentHashMap<K, V>
        ├── ConcurrentMap<K, V> (Interface)
        └── Serializable (Interface)
```
**How ConcurrentHashMap Works Internally?**

It works on mainly 3 parts.

**Segmented Locking** - The map is divided into segments (buckets) internally.
<br/>Locking occurs at the segment level rather than the whole map, ensuring high concurrency.

**CAS (Compare-And-Swap)** - Used for atomic updates without locks. Improves performance in high-concurrency scenarios.

**Read-Write Operations** - Reads are generally lock-free, allowing for high throughput. Writes use fine-grained locking or CAS to minimize blocking.

**Explain CAS**

Compare-And-Swap (CAS) is an atomic operation used in concurrent programming to achieve synchronization without locks. It enables threads to update shared variables safely without the overhead and contention caused by traditional locking mechanisms.

**Memory Location** - CAS reads the value at the memory location. 

**Expected Value** - It compares the read value with the expected value.
If the current value matches the expected value, CAS updates the variable with the new value.
If the current value does not match the expected value, CAS fails, and no update occurs.

**New Value** - The operation returns a status indicating whether the swap was successful.

Example - Thread A. Memory location 5. Value = 5. Expected value = 5. New Value = 10. The value is updated to 10.

<br/>Example - Thread B. Memory location 6. Value = 5. Expected value = 10. New Value = 15. The value is not updated as current value is 10.

**Advantages of CAS**.

Non-blocking - CAS ensures only the thread that successfully updates the variable proceeds. Other threads retry until they succeed, avoiding the need for locks.

High Performance - Eliminates contention and overhead associated with locking. Particularly useful in high-concurrency scenarios.

Atomicity - The comparison and update occur as a single, indivisible operation. Ensures thread safety.

**Disadvantages of CAS**.

ABA Problem - If a variable changes from value A to B and back to A, CAS may incorrectly assume nothing changed.
Solution: Use a version number or timestamp alongside the variable.

Busy-Waiting - If many threads are competing, repeated retries can cause performance degradation.

Limited Use - Works well for single variable updates but becomes complex for larger data structures or multiple variables.


Iteration in ConcurrentHashMap does not throw a `ConcurrentModificationException` even if the map is modified during the iteration.

```java
public static void main(String[] args) {
    ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
    map.put("A", 1);
    map.put("B", 2);
    map.put("C", 3);
    // Thread to modify the map
    new Thread(() -> map.put("D", 4)).start();
    // Iterating over the map.
    // It can modify the map while iterating.
    for (String key : map.keySet()) {
        System.out.println("Key: " + key + ", Value: " + map.get(key));
        // Simulate adding a new key during iteration
        if (key.equals("B")) {
            map.put("E", 5); // Adding during iteration
        }
    }
    System.out.println("Final Map: " + map);
}
```

Synchronized HashMap.

Iteration in SynchronizedHashMap requires explicit synchronization when accessed by multiple threads. Modifying the map during iteration will throw a ConcurrentModificationException unless you use explicit synchronization.

```java

public static void main(String[] args) {
    Map<String, Integer> map = Collections.synchronizedMap(new HashMap<>());
    map.put("A", 1);
    map.put("B", 2);
    map.put("C", 3);
    // Thread to modify the map
    new Thread(() -> {
        synchronized (map) {
            map.put("D", 4);
        }
    }).start();
    // Iterating over the map
    synchronized (map) { // Explicit synchronization required
        for (String key : map.keySet()) {
            System.out.println("Key: " + key + ", Value: " + map.get(key));
            // Attempting to modify during iteration
            if (key.equals("B")) {
                map.put("E", 5); // This may throw ConcurrentModificationException
            }
        }
    }
    System.out.println("Final Map: " + map);
}
```
### Question. Difference between StringBuilder and StringBuffer and String.

**String**.

Immutable. Any change will create a new String.
<br/>Not Thread safe and not synchronized.
<br/>Slower as it will create new string.

**StringBuilder**.

Mutable. Allows in place modification in string.
<br/>Not thread safe and not synchronized.
<br/>Faster than StringBuffer as no synchronization.
<br/>Used in single threaded environment with frequent string modification.

**StringBuffer**.
<br/>Mutable and Thread safe. Synchronization ensures thread safety.
<br/>


### Question. Difference between default and static method.

|Feature| Default Method                                                                                   | Static Method                                                                 |
|---|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
|**Definition**| A method with a body in an interface, invoked on an instance.                                    | A method declared with the static keyword, invoked on the class.              
|**Purpose**| To provide a default implementation for methods in interfaces, ensuring backward compatibility. Default methods work with instance variables and methods. | To define utility or helper methods unrelated to instance-specific behavior. Static methods work only with static data and do not access instance variables or methods. |
|**Inheritance**| Can be inherited and overridden by implementing classes.                                         | Cannot be overridden but can be hidden (if declared in a class).              |

Default Method.

```java
interface Vehicle {
    default void start() {
        System.out.println("Vehicle is starting...");
    }
}

class Car implements Vehicle {}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start(); // Output: Vehicle is starting...
    }
}
```

Static Method.
```java
interface Utility {
    static void log(String message) {
        System.out.println("Log: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Utility.log("This is a static method."); // Output: Log: This is a static method.
    }
}
```


### Question. Difference between REST and SOAP and which scenario to use it.

### Question. Difference between synchronized and volatile.

### Question. Difference between process and thread.