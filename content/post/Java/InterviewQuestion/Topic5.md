+++
title = 'Topic5'
date = 2024-12-24T09:17:01+05:30
url = "/post/java/interviewquestion/topic4/"
tags = ['interviewQuestion', 'java']
+++

### Question. Difference between HashSet and TreeSet.

The HashSet and TreeSet classes in java are the implementation of Set interface.
|HashSet|TreeSet|
|---|---|
|Faster (O(1))|Faster (O(1))|
|Unordered|Sorted Natural or custom order. The order depends on: The natural ordering of elements (via the Comparable interface). <br/> A custom comparator provided at the time of TreeSet creation.|
|Iterates in no specific order.| Iterates in ascending sorted order of elements (or the order defined by a custom
comparator).|
|Allows one null value|Does not allow null|
|It uses hashmap internally for storage.|It uses a Red-Black Tree (a self-balancing binary search tree) internally.|
|Custom sorting Not Supported| Custom sorting supported via comparator.|

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

### Question. Difference between HashMap and HashTable.

### Question. Difference between Map and FlatMap in streamAPI.

### Question. Difference between normal stream and parallel stream.

### Question. Difference between stream and collection.

### Question. Difference between ConcurrentHashMap and SynchronizedHashMap.

### Question. Difference between StringBuilder and StringBuffer and String.

### Question. Difference between default and static method.

### Question. Difference between Interface and Abstract class.

### Question. Difference between REST and SOAP and which scenario to use it.

### Question. Difference between synchronized and volatile.

### Question. Difference between process and thread.