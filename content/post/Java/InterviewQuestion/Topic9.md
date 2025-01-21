+++
title = 'Topic 9 Java'
date = 2025-01-12T19:13:58+05:30
url = "/post/java/interviewquestion/topic9/"
tags = ['interviewQuestion', 'java']
+++

## Stream problems.

```java
int num[] = {1,2,3,4,4,5,6,7,8};
int sum = Arrays.stream(nums).filter(n->n%2==0).sum();
System.out.println(sum);
```

### Count the occurrence "apple" in the list.

```java
List<String> list = Arrays.asList("apple","banana","orange","apple","apple");
long count = list.steam().filter(word->words.equalOrIgnoreCase("apple")).count();
System.out.println(count); // 3
```

### Given a list of list put all the elements in the same list.

```java
List<List<String>> skills = Arrays.asList(
    Arrays.asList("java","Spring","SpringBoot"),
    Arrays.asList("React","Kafka","Microservice"),
    Arrays.asList("MVC","Design Pattern");
);
List<String> allSkills = skills.stream().flatMap(skillsSets -> skillsSet.stream()).collect(Collectors.toList());
// With stream first will get one list, flatmpa will combine the list in one list.
System.out.println(allSkills);
```

### Find the skills starting with character 's'.

```java
List<String> skillsStartsWithS = allSkills.stream().filter(s -> s.charAt(0)=='s').collect(Collectors.toList());
List<String> skillsStartsWithS = allSkills.stream().filter(s -> s.startsWith("S")).collect(Collectors.toList());
System.out.println(skillsStartsWithS);
```

### Age of an employee above 30.

```java
List<Integer> l = Arrays.asList(1,2,3,4,5);
List<Integer> list - l.stream().filter(x->x>3).collect(Collectors.toList());
System.out.println(list);
```

### Count to get the frequency of the string in the list.

```java
List<String> list = Arrays.asList("Hello","Hello","World");

// Output - "Hello" - 2, World - 1.
```

### Reverse a list using stream.
