+++
title = 'Method and Constructor'
date = 2024-12-22T09:33:14+05:30

url= "/post/java/fundamental/method"
tags = ['interviewQuestion', 'java']
+++
### Method in Java

**Access Modifiers** - Defines the accessibility of the method, who can use the method.
There are 4 types of access specifiers in Java Methods.

**Public** - It can be accessed through any class in any package.  
**Private** - It can be accessed by method only in the same class.  
**Protected** - It can be accessed by other classes in same package or other sub classes in different package.  
**Default** - It can be only be accessed by classes in same package. If we donot mention anything then default access specifier is used by Java.

### Types of Method.

**System Defined Methods** - Methods which are already defined and ready to use in Java like Math.sqrt().

**User Defined Methods** - Method which the programmer create based upon the program necessity.

**Overloaded Method** - More than one method with same name is created in same class. Overloaded method only gets differentiated by arguments and return type is not considered.

**Overridden Method** - Subclass or child class has the same method as the parent class.

**Final Method** - Final method cannot be overridden in Java. It is so because final method means its implementation cannot be changed. If child class cannot change its implementation then no use of overridden.

**Abstract Method** - It is defined only in abstract class. Only method declaration is done. Its implementation is done in child class.

**Static Method** - These methods are associated with the class. Can be called wth class name. Static method cannot access non static instance variable and methods. Static methods cannot be overridden.
When to declare a method static - Method which donot modify the state if the object. - Utility method which donot use any instance variable and compute inly on arguments.

Example - Factory design pattern.

### Variable Arguments Varargs.

Variable number of inputs in the parameter.
Only one variale argument can be present in the method.
It should be the last argument in the list.

```java
public class Calculation{
    public int sum(int a, int ... variable){
        return 1;
    }
}
```

### Constructor.

It is used to create an instance or initialize the instance variable.

Constructor canot be static or final or abstract, synchronized.

new keyword tells java to call the constructor.

Why constructor name is same as of class name?

It is easy to identify there is no return type because implicitly java adds class as return type.

Why constructor has no return type.

There can be methods with same name and even class as return type but they cannot be called constructor as they donot obey the rules of constructor that is same name without return type.

Why constructor cannot be final.
It is different from different method and cannot be inherited. So it does not make any sense to make them final as final is used to prevent overriding. When it cannot be inherited then there is no need to make it final.

Why constructor cannot be abstract?

In abstract method the clild class should ipleent the method. Consturctor cannot be inherited so no point of making it abstract.

Why constructor cannot be static?
Static method can only access static variable and other static methods so it would not be able to initualize teh instance variable. We also woud not be able to use the conctructor chaining called super().

Can we define constructor in interface.
No as we cannot create object so no point of constructor.

### Types of constructor.

**Default Constructor** - When we donot define a constructor, java internally provides a cnstructr which is known as default constructor. Default constructor also set default values for all the insatnce variable. It is added only when we donot define a contructor.

**No argument Constructor** - Contructor with no argument. It is very similar to default constructor but we are defining it instead of java.

**Parameterized Constructor** - It takes argument and assign the instance variable with those parameters. We can initalize one or multiple instance variable using a parameterised constructor.For the variables where we donot provide any argument, they will be instantiated with default values.

**Constructor Overload** - We can create multiple constructor with different parameters.

**Private Constructor** - We can create private constructor and no one outside the class will be able to call the constructor. It is used in singleton design pattern. To crete an object of the class having private constructor we can create another static method to create the object and then call the method using class name.

**Constructor Chaining** - We can cal one constructor in other constructor. This is done using this() and super(). To chain a constructor within the same class this() is used.

```java
public class Calculation{
    String name;
    int empId;
    Calculation(){
        this(10);
    }
    Calculation(int empId){
        this("sj",empId);
    }
    Calculation(String name, int empId){
        this.name = name;
        this.empId = empId;
    }
}
```

Here we called other constructor within a constructor using this().

Using super() - The contructor of the child class always invokes the constructor of parent class first and then invokes its own constructor. This is done using super() so if we explicitely dont add super() in child constructor then java adds it internally.

```java
public class Person{
    Person(){
        System.out.printn("Inside the person constructor.");
    }
}
public class Manager extends Person{
    Manager(){
        System.out.println("Inside the manager class.");
    }
}
public class Main{
    public static void main(String args[]){
        Manager obj = new Manager();
        // It will create the object and call the person constructor.
        // Output - Inside the person constructor. Inside the manager class.
    }
}
```

super() - call default constructor of the class. When there is a parameter then we need to pass parameter inside super().
this() and super() is used for constructor chaining.

If the parent class has a parameterised then we will have to mandatorily pass an argument to super() to call the paret class parameterised constructor.
