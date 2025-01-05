+++
title = 'Topic 2 Java'
date = 2024-12-08T21:34:45+05:30

url= "/post/java/interviewquestion/topic4/"
tags = ['interviewQuestion', 'java']
+++

### Question 1.

What is the output?

```java
public static void main(String[] args) {
    Integer num = 10;
    modify(num);
    System.out.println(num);
}

public static void modify(Integer num) {
    num = 200;
}
```

The output is 10. Java is pass by value. Primitive are pass by value. Wrapper class will work but not Integer as Integer
is immutable. Wrapper class with immutable like `AtomicInteger` or custom Wrapper class will work.

We can reassign. The object will be created. We cannot see the memory of the object. The hashcode is the unique for the
object.

```java
public static void main(String[] args) {
    Integer num = 10;
    modify(num);
    System.out.println(System.identityHashCode(num)); // 617901222
    num = 100;
    System.out.println(System.identityHashCode(num)); // 1159190947
    System.out.println(num);
}
```

### Question 2.

```java
class Employee {
    Address address;
    String name;
    int age;
}

class Address {
    String streetNAme;
    String place;
    int pinCode;
}
```

Write the employee based on the PinCode.

```java
public static void main(String[] args) {
    // Sample Data
    List<Employee> employees = Arrays.asList(
            new Employee("John", 28, new Address("1st Main", "CityA", 560001)),
            new Employee("Alice", 32, new Address("2nd Cross", "CityB", 560002)),
            new Employee("Bob", 45, new Address("3rd Lane", "CityA", 560001)),
            new Employee("Eve", 25, new Address("4th Street", "CityC", 560003))
    );

    // Group employees by pinCode
    Map<Integer, List<Employee>> groupedByPinCode = employees.stream()
            .collect(Collectors.groupingBy(e -> e.address.pinCode));

    // Print grouped employees
    groupedByPinCode.forEach((pinCode, employeeList) -> {
        System.out.println("PinCode: " + pinCode);
        employeeList.forEach(System.out::println);
        System.out.println();
    });
}
```

The output.
```md
PinCode: 560001
Employee{name='John', age=28, address=Address{streetName='1st Main', place='CityA', pinCode=560001}}
Employee{name='Bob', age=45, address=Address{streetName='3rd Lane', place='CityA', pinCode=560001}}

PinCode: 560002
Employee{name='Alice', age=32, address=Address{streetName='2nd Cross', place='CityB', pinCode=560002}}

PinCode: 560003
Employee{name='Eve', age=25, address=Address{streetName='4th Street', place='CityC', pinCode=560003}

```

### Question 3.

```java
class Employee{
    String address;
    String name;
    int age;
}
class Address{
    String streetNAme;
    String place;
    int pinCode;
}
```

Group the employee based on the age.
```java

    Map<Integer, List<Employee>> groupedByAge = employees.stream()
            .collect(Collectors.groupingBy(e -> e.age));

    // Print grouped employees
    groupedByAge.forEach((age, employeeList) -> {
        System.out.println("Age: " + age);
        employeeList.forEach(System.out::println);
        System.out.println();
    });
```

### Question 4.

Array contains duplicate element. Print the distinct element.
```java
list.stream().distinct().collect(Collectors.toList());
```

### Question 5.
What is the output?
```java
public class A1 {
    public static void addToInt(int x, int amountToAdd) {
        x = x + amountToAdd;
    }

    public static void main(String[] args) {
        var a = 15;
        var b = 10;
        A1.addToInt(a,b);
        System.out.println(a);
    }
}
```

The output of the code - 15.

The method is getting the value and not the reference so the value of the varaiable will not change.