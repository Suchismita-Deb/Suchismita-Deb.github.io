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

Find employee with higest salary using Java 8.

```java
Opional<Employee> empWithHigestSalary = empList.stream().sorted(Comparator.comparingDouble(Employee::getSalary).reversed()).findFirst();
```

Find employee with second highest salary.

```java
Opional<Employee> empWithHigestSalary = empList.stream().sorted(Comparator.comparingDouble(Employee::getSalary).reversed()).skip(1).findFirst();
```

Stream are called lazy because intermediate operations are not evaluated unless terminal operation is invoked. They are only evaluated when a terminal operation is invoked. The operations are lazy, meaning they do not executed immediately.

### How does streams work in Java 8?

Java Stream is a pipeline of functions that can be evaluated. Java Stream is not a data structure and cannot mutate data, they can only transform data. Streams are built around its main interface, the Stream interface which was released in JDK 8.  
Three phases - Splitting, Applying and Combining.  
Elements of a stream is processed individually and then tey finally get collected.

### What is Zookeeper in Kafka.

Storig metadate - Zookeeper stores essential data for running a Kafka cluster, such as registered brokers, topic configuration and the current controller.

Providing distributed coordination - Zooker acts as a centralized service that provides distributed coordination for applications deployed in a distributed system.

Maintaining configurayion information - Zookeepers keeps tract of data related to Kafka topics, brokers, consumers.

Fault tolerant - Zookeeper is highly available and can tolerate node failures.

Consistency - Zookeper offers a cosistent view of the cluster to all clients.

### How many partition we can create in kafka.

Not fixed, max pqrtitions per broker - 4000 partitions per broker.

Under the cluster there is broker.

Max partition per cluster - 200000 partitions per cluster.

Minimum partitions per topic - 1 partition per topic.

### What are nodes and how it scales up with number of nodes.

There are nodes inside Kafka.

Node are server that can be added to a cluster to scale up processing power and capacity.

Scaling Up - Adding new nodes to a Kafka cluster increaes processing power, throughput, reduces latency. This is known as horizontal scaling.

Scaling Down - Removing nodes from a Kafka cluster decreases processing power.

Node Ids - Strimzi automatocally assigns node Ids starting from 0 and incrementing by one. You can also assign node Id ranges for each node pool.

Node pools - You can configure node pools usng a custom resource called KafkaNodePool. This resource supports configuration options such as the number of replicas, storage configuration and resource requirements.

Managed disk - You can use multiple disks to achieve 16Tb for each node in the cluster.

### What is Insync Replica?

In kafka way to achive data consistency and fault tolerance is by using replication to make sure tat messages are not lost if a broker fails. Every partition of a Kafka topic is replicated across multiple brokers. An insync replica ISR is a set of replicas that are fully in sync and replica with the leader replica of a partition. To put it simple, ISRs are replicas that have fully uptodate with the leader and have the same data as the leader.

Kafka replication models has leaders, followers, replication factor, ISR list.

### How do you decide on how much memory your application will require on production?

To find application memory usage with JMeter you can -
Go to Free Memory to check memory usage in a test
Use the PerfMon Metrics Collector Listener to monitor more than 75 PerfMon metrics, including memory
Calculate memory usage using the formula: (Used Memory/Total Memory) * 100
You can also use JMeter to: Identify an application's maximum operating capacity, Find bottlenecks, and Determine which element is causing system degradation
