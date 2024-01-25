+++
title = 'Important Topic'
date = 2024-01-25T21:41:29+05:30
tags=['java']
+++


**How hashmap works internally**

Implementations of Maps.
- The classes *HashMap* and *Hashtable* implements *unordered map* and *LinkedHashMap* implements *ordered map*.
- ![img.png](/images/img32.png)
- HashMap implements similar to hashset the inserting and deletion is O(1). The ordering is not there and in LinkedHashMap we have the ordering. 
- TreeMap is the implementation of the sorted map.
- In hashMap we can have one null key and is not thread safe. The HashTable class is thread-safe and permits only non-null values and keys.
- Hashmap work on hash method implementation. It works on equal method and hashcode.
- LinkedHashMap maintains its element in the order the elements are accessed from least recently accessed to most recently accessed. It finds its usage in the LRU cache. It comes with performation penalty.
- Operations like adding, removing, finding an entry based on key is in constant time as it has hash method. Finding an entry on the value is of liner time as it needs to search for all the elements.

In HashMap we tore in key and value. Like the character count of a word `ships` is the key and `5` is the value. We can also store the count of number in an array like `1,2,2,2,3,4,5,5` then we can store in hashmap like `1->1, 2->3, 3->1, 4->1, 5->2`.
- We can put the elemenst ion the form of `List<Pair>` we can make a Pair class. 
- ```java
class Pair{
int key;
int value;
}
```