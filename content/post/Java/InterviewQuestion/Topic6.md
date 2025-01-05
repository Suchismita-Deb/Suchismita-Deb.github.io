+++
title = 'Topic 6 Java'
date = 2024-12-26T17:59:30+05:30
url= "/post/java/interviewquestion/topic6/"
tags = ['interviewQuestion', 'java']
+++

### Generics.

Wildcards in Java are a feature of generics that provide flexibility in specifying the type of elements a generic class or method can operate on. Wildcards allow you to relax the type constraints when working with generics, enabling more flexible and reusable code.

Types of WildCard.

Unbounded Wildcard.

Syntax - <?> - Represents any type. Useful when the type is not required and it is just reading data or calling methods that don't depend on the type.
```java
public void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}

List<Integer> intList = List.of(1, 2, 3);
List<String> strList = List.of("A", "B", "C");
printList(intList); // Works
printList(strList); // Works
```

Upper-Bounded Wildcard.

Syntax - (<? extends Type>) - Restricts the unknown type to be a subtype (or the same type) of the specified class or interface. Useful when you want to read data of a specific type or its subtypes but do not want to modify the collection.
```java
public double sumOfNumbers(List<? extends Number> list) {
    double sum = 0;
    for (Number num : list) {
        sum += num.doubleValue();
    }
    return sum;
}

List<Integer> intList = List.of(1, 2, 3);
List<Double> doubleList = List.of(1.1, 2.2, 3.3);
System.out.println(sumOfNumbers(intList));     // Outputs: 6.0
System.out.println(sumOfNumbers(doubleList));  // Outputs: 6.6
```

Lower-Bounded Wildcard

Syntax - <? super Type> - Restricts the unknown type to be a superclass (or the same type) of the specified class or interface.
<br>Useful when you want to write data of a specific type or its subtypes into a collection.<br/>
```java
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}

List<Number> numberList = new ArrayList<>();
addNumbers(numberList);  // Works
System.out.println(numberList); // Outputs: [1, 2]
```

WildCard Use Cases.

Generic Class.
```java
class Box<T> {
    private T value;
    public void setValue(T value) { this.value = value; }
    public T getValue() { return value; }
}
Box<? extends Number> box = new Box<>();
```
Generic Method.
```java
public static void copy(List<? super Integer> dest, List<? extends Integer> src) {
    for (Integer i : src) {
        dest.add(i);
    }
}
```
PECS Principle (Producer Extends, Consumer Super).

Producer: Use extends when you want to fetch data from a collection (Producer Extends)
<br/>Consumer: Use super when you want to insert data into a collection (Consumer Super)

```java
List<? extends Number> producer = List.of(1, 2, 3); // Produces data
List<? super Integer> consumer = new ArrayList<>();  // Consumes data
```