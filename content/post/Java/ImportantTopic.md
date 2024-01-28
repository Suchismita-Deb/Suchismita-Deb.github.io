+++
title = 'Important Topic'
date = 2024-01-25T21:41:29+05:30
tags=['java']
+++


1. In Inheritance the superclass properties is inherited by the subclass.


# Interface
- Interface cannot have constructor, static initializer and instance initializer. The class that is implementing the interface can have constructor. _Static initializers_ are blocks of code that are executed when a class is loaded into the Java Virtual Machine (JVM). _Instance initializers_ are blocks of code that are executed when an instance of a class is created.
- Interfaces can have constant fields (implicitly public, static, and final). We cannot reassign value to the field of teh interface as it is final.
- We can declare interface by abstract keyword but no need as interface are by default abstract.
- Each interface after compilation a `.class` file will be generated.
- We cannot override an interface method other than public. We should not reduce the visibility. All interface methods are public by default.
- Interface cannot extend class, it can extend another interface.
- Classes extends `java.lang.Object` by default. Interface do not extend it.
- From Java 8 interface can have static methods.
- Interface can have class and another interface as its member.

93-107 done.

# Nested Classes.
- There are 2 types of Nested classes, _**Static Nested Classes**_ and _**Non Static Nested Classes or Inner Classes**_.
- Non static Nested classes are of 3 types - _**Member Inner Class**_, _**Local Inner Class**_ and _**Anonymous Inner Class**_.
- We cannot access a nin static member of outer class inside a static nested class.
- 

# How hashmap works internally

Implementations of Maps.
- The classes *HashMap* and *Hashtable* implements *unordered map* and *LinkedHashMap* implements *ordered map*.
- ![img.png](/images/img32.png)
- HashMap implements similar to hashset the inserting and deletion is O(1). The ordering is not there and in LinkedHashMap we have the ordering. 
- TreeMap is the implementation of the sorted map.
- In hashMap we can have one null key and is not thread safe. The HashTable class is thread-safe and permits only non-null values and keys.
- Hashmap work on hash method implementation. It works on equal method and hashcode.
- LinkedHashMap maintains its element in the order the elements are accessed from least recently accessed to most recently accessed. It finds its usage in the LRU cache. It comes with performation penalty.
- Operations like adding, removing, finding an entry based on key is in constant time as it has hash method. Finding an entry on the value is of liner time as it needs to search for all the elements.

In HashMap we tore in key and value. Like the character count of a word `ships` is the key and `5` is the value. We can also store the count of number in an array like `1,2,2,2,5,5,5,2,2` then we can store in hashmap like `1->1, 2->5, 5->3`.
- We can put the elements ion the form of `List<Pair>` we can make a Pair class. 
```java
class Pair{
int key;
int value;
};
```
- The list contains `{(1,1),(2,5),(5,3)}`
- Using array to store the frequency of the element. The index of the array is the element and the value will be the count of the element. The main problem in this that if array is `2,3,2,3,10000,8` then for one element 10000 we need to make array that long. We call this array Bucket array.
- We use hash function. Say we need to store the count of character then in array we need the key `h(ships)` the hash function gives value like `23` and `h(hello)` gives value like `89` called hashcode. This value can be big so we can use `h()%sizeArray` to get the value within the size of the array. This is the `Compression Funtion`.
- Now the hashcode can be same for more than 1 element then there will be `Collision`. We can use the hashcode function in the object class.

*2 ways to deal with Collision - Closed Hashing/Separate Chaining, Open Addressing.*

### Closed Hashing
Every index of the bucket array contains a list where more than one element is stored in list form.
Every index will point to the head of the linkedlist.
- Since Java 1.5 Balanced BST are used in place of LinkedList.

### Open Addressing.
If there is any collision in any index find some alternative index. There are many methods like *Linear Probing*, *Quadratic Probing*, *Double Hashing*.