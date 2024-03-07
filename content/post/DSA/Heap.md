+++
title = 'Heap'
date = 2024-01-18T20:12:54+05:30
+++



Heap is implemented by PriorityQueue. 
- Mainly 3 methods are useful `peek`, `add`, `remove`.
- The priority queue takes the minimum element in the peek. We can also specify to put max element in the peek.
- Heap stores the element inside it in random manner. Like hashmap we cannot be able to maintain how the element will be stored in the heap.
```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
  int[] rank = {22,11,12,8,3};
  for(int i=0;i<rank.length;i++){
     pq.add(rank[i]);
  }
  while(pq.size()>0){
      System.out.print(pq.peek()+" ");
      pq.remove();
  }
```
This will show the output in ascending order. The minimum element will be in the peek.

- For storing in reverse order we need to write `Collections.reverseOrder()`.
```java
PriorityQueue<Integer> pqRev = new PriorityQueue<>(Collections.reverseOrder());
```


---
## Binary Heap.
