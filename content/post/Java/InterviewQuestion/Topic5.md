+++
title = 'Topic 5'
date = 2024-12-24T09:17:01+05:30
url = "/post/java/interviewquestion/topic5/"
tags = ['interviewQuestion', 'java']
+++

<h3 style="text-align: center;">Question. Difference between HashSet and TreeSet.</h3>

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


<h3 style="text-align: center;">Question. Difference between HashMap and TreeMap.</h3>

| Feature                     |HashMap| TreeMap                                               |
|-----------------------------|-------------------------|-------------------------------------------------------|
| **Performance**             | O(1)                                          | O(logn)                                               |
| **Order**                   | No fixed order.                               | Maintain key in sorted order natural or comparator.   |
| **Null Key**                | Allows one null key and multiple null values. | Does not allow null keys allows multiple null values. |
| **Internal Data structure** | Hash Table                                    | Red Black Tree self balancing binary tree.            |


<h3 style="text-align: center;">Question. Difference between HashMap and HashTable.</h3>

| Feature           | HashMap                                                                                                                                                              | HashTable |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Thread safety** | Not thread-safe (needs external synchronization). <br/>Must use external synchronization (e.g., Collections.synchronizedMap()) if used in multithreaded environments |Thread-safe (synchronization is built-in for all methods)|
| **Null value**    | Allow one null key andmultiple null values.                                                                                                                          |Does not allow null key or null values throws NullPointerException.|
| **Performance**   | Faster due to no synchronization.                                                                                                                                    |Slower due to synchronization overhead.|
| **Package**       | Introduced in Java 1.2 part of Java Collection Framework and part of java.util package. Use in modern code.                                                          |Legacy class exists since Java 1.0 and part of java.util package. Not recommended in new code.|
| **Usage**         |Preferred in single threaded or externally synchronized multithreaded environment.|Rarely used in modern application replaced by `ConcurrentHashMap` for thread safety.|

<h3 style="text-align: center;">Question. Difference between Map and FlatMap in streamAPI.</h3>

MAP.

Purpose: Transforms each element in the stream into another element.
Output: Produces a new stream of the same size but with transformed elements.
Behavior: Applies the given function to each element, and the result is a stream of transformed values.
Use Case: When you need to transform each element into a single element.

```java
List<String> list = Arrays.asList("apple", "banana", "cherry");

list.stream()
    .map(String::toUpperCase)  // Transforms each string to uppercase
    .forEach(System.out::println);  // Outputs: APPLE, BANANA, CHERRY
```

FLATMAP.

Purpose: Transforms each element into a stream of elements and then flattens these multiple streams into a single stream.
Output: Produces a new stream where each element may expand into multiple elements (or none).
Behavior: Each element is mapped to a stream, and the resulting streams are merged into a single stream.
Use Case: When you need to handle nested structures or when each element can be expanded into multiple elements (like splitting strings or unwrapping lists).
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

<h3 style="text-align: center;">Question. Difference between normal stream and parallel stream.</h3>

<h3 style="text-align: center;">Question. Difference between stream and collection.</h3>

<h3 style="text-align: center;">Question. Difference between ConcurrentHashMap and SynchronizedHashMap.</h3>

<h3 style="text-align: center;">Question. Difference between StringBuilder and StringBuffer and String.</h3>

<h3 style="text-align: center;">Question. Difference between default and static method.</h3>

<h3 style="text-align: center;">Question. Difference between Interface and Abstract class.</h3>

<h3 style="text-align: center;">Question. Difference between REST and SOAP and which scenario to use it.</h3>

<h3 style="text-align: center;">Question. Difference between synchronized and volatile.</h3>

<h3 style="text-align: center;">Question. Difference between process and thread.</h3>