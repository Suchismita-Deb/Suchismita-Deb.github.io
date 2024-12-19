+++
title = 'Stream'
date = 2024-12-19T09:45:23+05:30
url= "/post/java/fundamental/Stream"
tags = ['interviewQuestion', 'java']
+++

Streams is like a pipeline through which the collection elements are passes through.

While elements passes through pipelines, it performs various operations like sorting, filtering.

Useful when doing bulk processing, parallel processing.

First create the stream and then intermediate operations like filter(), sorted(), map(), distinct() are used. The termial operations like collect(), reduce(), count().

Intermediate meaning that the operations transform the stream into another stream and more operation can be done on top of it. It is lazy meaning these opeartions get executed only when terminal operation is invoked.

Terminal Operations triggers the processing of the stream and produce the output means after terminal operation used no more operation can be performed.

```java
list.stream().filter(sal->sal>5000).count();
```

### Different ways to create a stream.

**From Collection**

```java
List<Integer> list = Arrays.asList(1000,2000,3000,4000,5000);
Stream<Integer> streamFromList = list.stream();
```

**From Arrays**

```java
Integer[] salaryArray = {1000,2000,3000,4000,5000};
Stream<Integer> streamFromArray = Arrays.stream(salaryArray);
```

**From Static Method**

```java
Stream<Integer> streamFRomStaticMethod = Stream.of(1000,2000,3000,4000,5000);
```

**From Stream Builder**

```java
Stream.Builder<Integer> streamBuilder = Stream.builder();
streamBuilder.add(1000).add(2000).add(3000);
Stream<Integer> streamFromStreamBuilder = streamBuilder.build();
```

**From Stream Iterate**

```java
Stream<Integer> streamFromIterate = Stream.iterate(1000,(Integer n) -> n+5000).limit(5);

// Start point and the value increment.
```

### Different Intermediate Operations.

filter(), map(), flatMap().

```java
Stream<string> lowerCaseName = list.map((String name)->name.toLowerCase());
// The changed stream will go to the downstream. Use to tranform each element.
// Map is a Function and it takes input and returns an output.
```

flatMap() - Used to iterate over each element of the complex collection and helps to flatten it.

```java
List<List<String>> list = Arrays.asList(
    Arrays.asList("I","play","games.");
    Arrays.asList("It","is","fun.");
);
Stream<String> wordStream1 = list.stream().flatMap((List<String> sentence) ->sentence.stream());
// I play games. It is fun.
Stream<String> wordStream2 = list.stream()flatMap((List<String> sentence)->sentence.stream().map((String value)->value.toLowerCase()));
// i play games. it is fun.
```

distinct() - Removes duplicate from the stream.

### Sequence of Stream.

```java
List<Integer> nums = Arrays.asList(2,1,4,7,10);
Stream<Integer> numsStream = nums.stream().filter((Integer val)->val>=3).peek((Integer val)->System.out.println("After filter :"+val)).map((Integer val)->(val*-1)).peek((Integer val)->System.out.println("After Negating - " + val)).sorted().peek((Integer val)->System.out.println("After Sorted - " + val));
List<Integer> filteredNumberStream = numsStream.collect(collectors.toList());
```

Expected output.

```xml
After filter - 4
After filter - 7
After filter - 10

After negating - -4
After negating - -7
After negating - -10

After sorted - -10
After sorted - -7
After sorted - -4
```

The output is not where all element going through the step at one time.

In filter or map where the operation can be done on individual element then individual element proceed with the execution and all comes and stopped at the sorted part and there we need all the elements.

The output is like this.

```xml
After filter - 4
After negating - -4

After filter - 7
After negating - -7

After filter - 10
After negating - -10

After sorted - -10
After sorter - -7
After Sorted - -4
```

Generally each element processed sequentially and can perform multipl opertions this feature helps stream fast process the task.

Say in array return true when element is greater than 3.
arr = [3,4,1,1,2,2,3,33]
Here one element 4 found then it will stop and it will not go through the entire stream at each operation.

### Terminal Operation.

forEach() - Perform action on each element of the Stream. DO NOT returns any value.
It is a consumer means it will get the value and not return anything and there should be the print or other work inside the method.

reduce() - It is a binary OPeration accumulator.
Reduce on the element of the stream. Perform associative aggregation function.

Array arr[] = {2,1,4,7,8}
The value will become 3,4,7,8 then the value will become 7,7,8 then it will continue.

```java
reducedValue = list.stream().reduce((Integer val1, Integer val2)->val1+val2);
```

### Parallel Stream

It helps to perform operation on stream concurrently taking advantage of multi-core CPU. ParallelStream() method is used instead of regular stream() method.

Internally it does -
**Task splitting** - It uses "spliterator" function to split the data into multiple chunks.
**Task submission and parallel processing** - Uses fork join pool technique.

fork meaning divide and join the output.

```java

```