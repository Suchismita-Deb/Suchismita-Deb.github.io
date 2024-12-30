+++
title = 'Topic 3'
date = 2024-12-17T22:29:01+05:30

url= "/post/java/interviewquestion/topic3/"
tags = ['interviewQuestion', 'java']
+++

### Collection Heirarchy.

![CollectionHierarchy.png](/images/Java/InterviewQuestion/CollectionHierarchy.png)

### Question 2. String Interning.

String interning is a process of reusing strings to optimize memory usage. Strings are immutable in java in order to
avoid the duplicate string with same value, Java uses string pool. String pool is a special area in the heap memory.

**How string intern works**.

A pool of unique string literals is maintained in the JVM. This pool is part of the heap memory often called the String
Intern Pool or String Constant pool.
We can manually ensure a string is part of the pool using the `String.intern()` method. String already present in the
pool then the intern() returns a referenced to the pooled string. Not present then the string is added to the pool and
the referenced to the pooled string is returned.

```java
String str = "hello"; // Added to the pool
String str1 = "hello"; // Refering to the same object as str.
// str and str1 points to the same object inside the pool.
String str3 = new String("hello");
// String object is created inside the heap memory outside the pool.
// We can move it to the pool.
str3 = str3.intern(); // Add str3 to the pool or returns reference to the pooled string.

```

Comparison.

```java
String s = "hello";
String str = new String("hello");
System.out.println(s==str1); // false different reference pool and heap.

str =str.intern(); // Now str is pointing to the pool string.
System.out.println(str1==str3);
```

When the string is interned then == is faster and string not interned then we have to use .equals

### Question 3. How the `@Autowired`, `@Resource` and `@Inject` differs from each other.

Used for dependency injection and they differs in terms of usage, behaviour and source.

| `@Autowired`                                                                                              | `@Resource`                                                                                                                                                                                                                                                            | `@Inject`                                                                  |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Spring Specific and it does not works outside. Comes from Spring Framework. Works by **type**(bean type). | Java Standard and works both in spring and Java EE frameworks. Works by **name** first and then by type.                                                                                                                                                               | Java Standard and works with Java framework and Spring. Works by **type**. |
|Behaviour - Spring attempts to match the bean type for injection. If multiple beans of the same type exists, it requires additional qualifiers(@Qualifier) to resolve ambiguity. Can be used on contructors, fields or setter method. Required Behaviour - By default @Autowired is required. If no matching bean is found it throws an exception. `@Autowired(required = false)` to make it optional. | When the name is specified (`@Resource(name = "beanName")`) then it searched for the bean with that name. No name is specified then it falls back to the field name. When not resolved then it falls back to teh type based injection. It does not supports @Qualifier. | Optional and no bean is found then it does not throw an exception by default. Does not supports @Qualifier but works with the @Named qualifier for ambiguity.|