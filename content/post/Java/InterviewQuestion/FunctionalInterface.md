+++
title = 'FunctionalInterface'
date = 2024-06-11T08:18:15+05:30
tags = ['interviewQuestion']
categories = ['java']
+++

# Functional Programming using Lambda Stream.

### New Java 8 Features.

Lambda and Functional Interface.
JavaStream API.
forEach() method in iterable iterface.
default and static method in interface.
Java date and time api.

### Lambda Expression.

Anonymous function that can be passed to another function as an argument. A function can be created without belonging to another class. This also enables the programming language to be as a functional programming language.

### How to call or invoke the function without the name called lambda.

Every lambda function is backed by the functional interface. Java implemented functional programming or lanbda epressions using interfaces to keep the language backward compatibility intact.

### Lambda Expression.

Creating a Thread extend the thread class.
Using the Runnable Interface. Pass the runnable object in the thread class contructor to create the thread.

```java
public class LambdaDemo{
    class MyRunnable implements Runnable{
        @Override
        public void run(){
            System.out.prinln("Thread sarted.");
        }
    }
    public static void main(String args[]){
        MyRunnable runnable = new MyRunnable();
        Thread t = new Thread(runnable); // Creating the thread and in this constructor will pass the Runnable.
        t.start();
    }
}
```

Using lamba we can do it by passing in the parameter.

```java
public class LambdaDemo{
    public static void main(String args[]){
        Runnable runnable = new Runnable(){
            @Override
            public void run(){
            System.out.prinln("Thread sarted.");
        }
        };
        Thread t = new Thread(runnable); // Creating the thread and in this constructor will pass the Runnable.
        t.start();
    }
}
```

We can only use the lambdas for the interfaces with only one abstract method. Then only compiler will understand the return type.

```java
public class LambdaDemo{
    public static void main(String args[]){
        Runnable runnable = () -> System.out.println("Thread started.");
        Thread t = new Thread(runnable);
        t.start();
    }
}
```

The interface with only one abstract method is called functional interface.

### Convert the function to lambda.

```java
public void myName(){
    System.out.println("Hello");
}
```

```java
() -> System.out.println("Hello");
```

```java
public void add(int a, int b){
    System.out.println(a+b);
}
```

```java

(a,b) -> System.out.println(a+b);
```

```java
public int lengthString(String s){
    return s.length();
}
```

```java
(s) -> return s.length();
// Dont need the return keyword.
s -> s.length();
```

### Functional Interface.

One abstract method and there can be other static method.

```java

public clas FunctionalInterfaceDemo{
    // functional interface behind every lambda.
    public static void main(String args[]){

        MyFunctionalInterface inter = () -> System.out.println("Hello");
        // Here we have only one method so no need to write the method name and all other thing.
        inter.meMethod();
        // We implemented the method in the lambda function.
    }
}

@FunctionalInterface
interface MyFunctionalInterafce{
    public abstract void myMethod();
}
```

### What is the difference between anonymous class and lambda expression.

The compiler create a class file for each anonymous inner class. Like all class it needs to be loaded and verified at startup. For the lambda the jvm uses invoke dynamic to call teh lambda so no extra class files are generated.

### Name few functional interfaces that are already there in Java 8 to use.

There are 40+ predefined functional interfaces in java.
Some of the important functional interfaces are
**Consumer** - (This consumes the input) Having the abstract method accept (Object obj).
**Predicate** - (This is used to test some condition) having abstart method test(Object obj)
**Supplier** - only supplies does not accept, or return something back having method get().
**Function** - Functional interface is used to apply some operation and return the object back, having method object apply(Object obj).

### :: Method Reference.

:: Operator is used if we want to use an existing method available as lambda.

Example in string the toUpperCase() method is function interface like takes something and retirns something.

```java
public static void main(String args[]){

    String s = "HelloWorld";
    Function<String,String> fun = String::toUpperCase;
    // Check the method signature of the method and it is Function type.
    String newString = fun.apply(s);
    // Function in the Functional Interface has an apply method.
    System.out.println(newString);
}
```

### Functional Programming.

In functional programing, function are the first class citizen, can be passed to another functions and can be returned from another functions.

Functional Programming mainly supports
Methods compositions (one function returns another).
Passing the method or behaviour dynamically.
Pure function.
Higher Order Function.

### Pure Function.

The return value of the pure function solely depends on its arguments. Calling the pure function with same sets of arguments will always get the same return value.
They donot have any side effect like network or db call and they do not modify the class level or the object level variables which are passed to them.
We can use the pure function with multithreaded programming as they will never modify the shared state or variable.

Example.
Pure Function.

```java
public static int sum(int a, int b){
    return a+b;
}
```

Impure function - It violates the first rule.

```java
public static int sum(int a, int b){
    return new Math.Random().nextInt()+a+b;
}
```

Impure function - It violates the second rule.

```java
public static int sum(int a, int b){
    writeSomethigFile();
    return a+b;
}
```

### Functional Composition or Higher Order Functions.

The functions that returns another function is called Higher Order FUnctions and applyingthese functions one by one like Fluid operations are called Functional Composition.

```java
public static Comparator<String> reverse(Compator<String> comp){
    return (x,y)->comp.compare(y,x);
}
```

```java
public class FunctionalComposition{
    public static void main(String args[]){
        Function<Integer,Integer> multiply = (value)->value*2;
        Function<Integer,Integer> add = (value) ->value+3;
        Function<Integer,Integer> multipleThenAdd = multiple.andThen(add);
        // This will again return a function.
        // We can put the function name after the .andThen();
        Integer result = multipleThenAdd.apply(3);
        System.out.println(result);
        // First multiple and the add.
    }
}
```

### Stream.

Stream is a sequence of objects that supports various methods which can be pipelined to produce the desired result. Stream connects to the data source and convert that into a flow of object that can be processed using methods one by one.

```java
public class StreamDemo{
    public static void main(String args[]){
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,10);

        List<Integer> evenList = list.stream().filter(e -> e%2 == 0)
        .collect(Collectors.toList());
        // filter takes predicte and it checks for condition.
    }
}
```

### Pileline of operation.

To perform a sequence of operations over the elements of the data source and process and get the results, there are three things required
Data Source - Dataset or collection to which the stream will be created.
Intermediate operation(s) - filter(), map(), flatMap(), distinct(), sorted(), peek(), limit(), skip().

Intermediate operations are lazy and will not be called until the Termina operation is called.

To identify if the operation is interediate or not we can check - If the operation is returning another stream then it is called intermediate operation.

Terminal operation - The terminal operation is the final operations that will be called after triggering the intermediate operations. Some of the terminal operations are - toArray(), collect(), count(), reduce(), forEach(), forEachOrdered(), min(), max(), anyMatch(), allMatch(), noneMatch(), findAny(), findFirst().

### Lazy Evaluation.

Lazy evaluation is the intermediate operation that is not executed until required and JVM intelligently calls intermediate operation.

```java
public class LazyEvaluation{
    public static void main(String args[]){
        List<Person> persons = new ArrayList<>();
        persons.add(new Person("Rohan",36));
        persons.add(new Person("Manish",36));
        persons.add(new Person("Bob",36));
        persons.add(new Person("Alex",36));
        persons.add(new Person("Robert",36));
        List<Person> stream = persons.stream().filter((e)->e.age<=36).collect(Collectors.toList());
    }
}
public class Person{
    String name;
    int age;
    Person(String name, int age){
        this.name = name;
        this.age = age;
    }
    public String toString(){
        return "Person [name = "+name+", age ="+age+ "]";
    }
}
```

Parallel Stream and Sequential Stream.

### Default methods in Java 8.

For making functional interfaces more functional to support composition and higher order functions. Functional interfaces needed to have methods inside but java cant do that because of backward incompatability.

If they could have add a method in existing interfaces all the application using those interfaces had to implemeny that.

That is why java introduces default methods. Others can override it.

### Parallel Stream.

By default stream is sequential.
We can use Parallet Stream code by using the parallelStream() method on a collection and parallel() method on stream.
The data coming from parallel stream should be same as sequential stream.

The data should be **Stateless** - state of one element does not affect another element.
**Non-interfering** - data source is not affected while operation.
**Associative** - one operation result is not affected by the order of data under processing.

```java
public class ParallelStreamDemo{
    public static void main(String args[]){
        long time1, time2;
        List<Employee> eList = new ArrayList<>();
        for(int i=0;i<100;i++){
            eList.add(new Employee("John",20000));
            eList.add(new Employee("Bob",90000));
            eList.add(new Employee("Alex",80000));
            eList.add(new Employee("Robert",50000));
            eList.add(new Employee("Brad",70000));
        }

        // Sequential Stream.
        time1 = Ststem.currentTimeMillis();
        System.out.println("Sequential Stream Count =" + eList.stream().filter(e->e.salary>70000));
        time2 = Ststem.currentTimeMillis();
        System.out.println(time2-time1);

        // Parallel Stream.
        time1 = Ststem.currentTimeMillis();
        System.out.println("Sequential Stream Count =" + eList.parallelStream().filter(e->e.salary>70000));
        time2 = Ststem.currentTimeMillis();
        System.out.println(time2-time1);
    }
}
// First time and second time will be very different.
// Employee class has name and age and a constructor.
```
