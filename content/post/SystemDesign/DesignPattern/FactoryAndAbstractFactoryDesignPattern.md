+++
title = 'FactoryAndAbstractFactoryDesignPattern'
date = 2024-03-07T13:16:50+05:30
draft = true
+++


Continue of Builder Pattern.

We have the Builder with all same parameters and methods with Builder return type and build method which finally returns the `Student`.

- There is director layer. The Builder only has the set and can be called in any order so we need director method to call the methods.

```java
public class Director{
    StudentBuilder studentBuilder;
    Director(StudentBuilder studentBuilder){
        this.studentBuilder = studentBuilder;
    }
    public Student createStudent(){
        if(studentBuilder instanceof EngineeringStudentBuilder){
            return createEngineeringStudent();
        }
        else if(studentBuilder instanceof MBAStudentBuilder){
            return createMBAStudent();
        }
        return null;
    }
    private Student createEngineeringStudent(){
        return studentBuilder.setRoll(1).setAge(22).setName("SDeb").setSubject().build();
    }
    private Student createMBAStudent(){
        return studentBuilder.setRoll(1).setAge(23).setName("SD").setSubject().build();
    }
}
```

- The Director will make the EngineeringStudent with the sequence calling the methods.
- Client will call the director.

```java
public class Client{
    public static void main(String[] args) {
        Director director1 = new Director(new EngineeringStudentBuilder());
        Director director2 = new Director(new MBAStudentBuilder());
        
        Student engStudent = director1.createStudent();
        Student mbaStudent = director2.createStudent();

        System.out.println(engStudent.toString());
        System.out.println(mbaStudent.toString());
    }
}
```

- From client, we just call the createStudent and it will call the eng and the mba. The director will call the specific methods and make the object.

---
Builder Design pattern is creational and is used to create the object.
Decorator Design pattern is structural and is used to create complex object.

BuilderDesignPattern can not handle dynamic parameter. Here we cannot able to add caStudentBuilder. We need to make the builder for caStudent.

Example.
For Pizza we have crust(mandatory) and other optional like cheese, mushroom. `Pizza` class has all the parameters. The `PizzaBuilder` has 2 section like `BasePizza and Cheese` and `BasePizza and Mushroom` and one director to call addCheese(), addMushroom() and then build() the object.

But with the Builder Pattern we cannot be able to create dynamic parameter object. We will not able to create object like `Pizza with Cheese and Mushroom`. In that case we need the Decorator Pattern as it support the dynamic input.
