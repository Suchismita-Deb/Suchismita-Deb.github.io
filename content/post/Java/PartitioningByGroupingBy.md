+++
title = 'PartitioningByGroupingBy'
date = 2023-11-18T15:16:17+05:30
+++



### Partitioning by and GroupingBy

```java
public class Practice16 {
    public static void main(String[] args) {
        List<Integer> arr = List.of(1,34,13,45,56,7,8,56,7);
        Map<Boolean, List<Integer>> collect = arr.stream()
                .collect(partitioningBy(x -> x > 10));
        System.out.println(collect);
        
        // The output is {false=[1, 7, 8, 7], true=[34, 13, 45, 56, 56]} 
        
        //If the list is of any class then we need to get the value.
        List<Student> studentList = List.of(s1,s2,s3);
        Map<Boolean, List<Student>> studentPartitionBy = studentList.stream()
                        .collect(partitioningBy(x -> x.getGrade > 10));
        System.out.println(studentPartitionBy);
    }
}
```

If we do not have any value then in the true section it will be an empty list.

### Grouping By
```java
Map<Object, List<Integer>> groupingByCollect = arr.stream()
        .collect(groupingBy(x -> x%2==0));
System.out.println(groupingByCollect);
```

The output looks like.
```java
{false=[1, 13, 45, 7, 7], true=[34, 56, 8, 56]}
```

Example of GroupingBy
```java
List<Integer> list = Arrays.asList(1,2,1,3,3,4,5,6,7,8,6,5,4,3,2,1);
Map<Integer,Long> map = list.stream()
        .collect(groupingBy(element -> element, counting()));// Function.identity() Equivalent to an i in a for loop
        //.collect(groupingBy(Function.identity(), counting()));//collect takes a COLLECTOR as parameter. any method that returns a collector can be used
System.out.println(map);
```

The output is
```java
{1=3, 2=2, 3=3, 4=2, 5=2, 6=2, 7=1, 8=1}
```