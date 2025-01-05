+++
title = 'Topic 7 Java'
date = 2024-12-26T22:22:05+05:30
url = "/post/java/interviewquestion/topic7/"
tags = ['interviewQuestion']
+++

### Explain the polymorphism.

Compile-time Polymorphism - Achieved using method overloading (methods with the same name but different parameter
lists).  
The method to be called is determined at compile-time.

Runtime Polymorphism - Achieved using method overriding (methods with the same name and signature in a parent and child class).  
The method to be called is determined at runtime, based on the object’s actual type. It is Dynamic Binding.

### Question 5. Method Overloading.

More than one method with same name as long as the method has different parameter lists (different number of parameter
or different types of parameters). It is a compile time polymorphism.

Return type can be same or different, method signature (name and parameter) should be unique. Java determines which
method to call based on the method signature at compile time.

### Explain Encapsulation.

Encapsulation is the concept of bundling data (fields) and methods (functions) that operate on the data into a single unit, typically a class. It also involves restricting direct access to some of the object's components, ensuring data security and integrity. Getter and setter.
