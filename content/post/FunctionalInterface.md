+++
title = 'Functional Interface'
date = 2023-11-14T18:26:08+05:30
tags = ['functional interface','interface','lambda']
+++


Functional Interface has one method. **SAM - Single Abstract Method.**

We can only use lambdas for the functional interface.
To specify the functional interface we can use the annotation `@FunctionalInterface`
```java
@FunctionalInterface
interface A{
    void show(); // public abstract method. Only one method.
}
// If do not write the annotation then we can put more than one method.
class B implements A{

    @Override
    public void show() {
        System.out.println("In show.");
    }
}

public class F1 {
    public static void main(String[] args) {
        A funcInterface = new B();
        A funcInterface1 = new A() {
            // We can instantiate the interface by defining the interface here.
            @Override
            public void show() {
                System.out.println("In the main method.");
            }
        };
        funcInterface.show();// In show.
        funcInterface1.show();// In the main method.
    }
}
```
We can shorten the code. We can write in other way. Using lambda expression. We can use lambda expression only with functional interface.

The new method name is always same for any reference type so we can avoid writing that.
```java
A obj = () -> System.out.println("In the main method.");
obj.show();
```

For multiple statement we need to write the {} and for return  and multi line also we need to write the {}. For single line we donot need {}. 

When we have parameter.
```java
// When the abstract method has one parameter.
@FunctionalInterface
interface A{
    void show(int a);
}
public class F1 {
    public static void main(String[] args) {
        A obj = (i) -> System.out.println("The value is " + i);
        obj.show(98); // The value is 98.
    }
}
```

When there is a return type. When it is only one return statement then
```java
// When the abstract method has one parameter.
@FunctionalInterface
interface A{
    int show(int a,int b);
}
public class F1 {
    public static void main(String[] args) {
        A obj = (i,j) -> {
            return i+j;
        };
        System.out.println(obj.show(98,988));
        // If it is only return statement then we can do that without the {}.
        A obj1 = (i,j) -> i+j;
        System.out.println(obj1.show(98,989));
    }
}
```

### Method Accepting the Lambda.
Method that accept the functional Interface can use the lambdas.
Foreach can use the lambda expression.
```java
List<Integer> list = Arrays.asList(1,4,6,8,9,7,5,3,2);

//Implemenation via anonymous inner class
list.forEach(new Consumer<Integer>() {
    @Override
    public void accept(Integer i) {
        System.out.println(i);
    }
});
```

We can remove the obvious thing and only keep the args and the method body.
```java
list.forEach(i -> System.out.println(i));
```

This can be changed by using the Method Reference.
```java
list.forEach(System.out::println);
```