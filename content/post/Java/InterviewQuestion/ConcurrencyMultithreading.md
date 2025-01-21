+++
title = 'Concurrency Multithreading'
date = 2024-06-11T08:18:37+05:30


url = "/post/java/interviewquestion/multithreading/"
tags = ['interviewQuestion', 'java']
+++


mvn command 
mvn clean install and mvn clean install package.

Concurrent collection.

Concurrent hashmap. - hashmap is not threadsafe. When making and modify the same map then concurrent exception. In concurrent hashmap there will not get the exception and reading and modifying the hashmap is alright.

It looks into the map as a bucket and dont see the entire map.

How to connect two data base in the spring boot.

When there is two database then will first add the db drivers in the pom. Then add the db url and password in the properties file. There is no need to do much from application as we will use jpa and all to connect.

rest api call db then return the row from the data.

controller get api then service repository the transaction will be in repo layer and the format is done in service layer.

Moniter the spring boot - spring actuator. /health. spring boot admin server.

deploy the spring boot application.

In local tomcat embedded server we can deploy.

how many instance we can deploy.

Why use microservices.

What are microservices in your project.

Index in sql.

Normalization in sql.

Foreign key in sql.

### Shallow copy and deep cody.

The difference between a shallow copy and a deep copy lies in how the data of an object is duplicated when creating a copy.  
Shallow Copy - It creates a new object that refernces the same memory locations as the original object. Changes made to the data in one object will be reflected in the other object.  
Deep copy creates a new object with entirey new copies of all the data within the original object. Changes made to the data in one object will not affect the other object.

By implementing the Clonable interface and overriding the clone() method, you can create a deep copy of the objects. Within the clone() method we perform deep copy of all field, including the referenced objects.



### Difference between sleep and wait in multithreading.

### Username and UserPassword is given. You need to autowire them and explain in terms of dependency inversion use Qualifier.

Implement two rest template with timeout 30 and 50s.

What is cyclic dependency and how I can resolve using spring.

How to extract unique key from json object. Return type is set of string.

Implement code for comparable and comparator.

exception handling.

methos hiding in code. What method will this code invoke.

kafka - How to handle bulk messages. How will you handle if the messge hits a limit, in rabbit mq if the queue hits the limit.How do you handle when consumer cont handle messages. In rabbit mq if the queue is down how will you handle the process.

How do you do logging in the project?

What is concurrent exception and how to fix it.

Design pattern.
What is the differenct between Factory and Abstract Factory design pattern.

If there is a multithreaded environment how will you achieve synchronization. Locking.

Why cache threadpool is used? When multiple request comes then how it handles it.
Threadpool.

Configuration to deploy a service.

How to make hashmap synchronised. Internal work of hashmap.

Couny occurrence of each character in a string using stream API.

How to make object unreferenced for garbage collection.

depoyent in spring.

Http status code for deleting one content - 204 - No content and no outpur shown.

What will hppen if we use the @Repository annotation in service and @Service annotation in Repository.

### Project Explain

API Gateway - It will go to the microservice like Microservice1, Microsevice2.
/api/reports
/api/details

One microservice is calling the other microservice internally then it will use service discovery like Eureka. The name suggests that it will discover the service and call the service.
microservice1 calls microservice 2 then eureka will decide service.
Calling the microservcie can be of Sync and Async where the sync meaning the services should be up and wait for the reply and in async there the service will be continue and then when reply coms it will work with the result.

Loadbalancing is handled by client side anothet is server side loadbalancing. In client side load balancing say microservcie 1 calling microservice 2 and microservice 2 has two parts and it is big so when the call comes from the service 1 it will see the load of the service and then call microservice 2. Annotation - @LoadBalanced. Servcie discovery knows about all the parts like eureka, consule.

Failure like if microservice 2 is down.
Circuit Breaker.
If one fails it will do the retry 3 calls then wait for 10 min and then again retry.

### 2 interface A and B and they contains the same default method. Class implements both interfaces. Print the value inside the default method then how JVM will know which method to print.

Diamond problem. Two same interface and class implements same method then it will give the compile error and we have to override and call. We need to call like interfaceA.super() then it will work.

Why there is private method in interface.

default and static method and the logic gets bigger then we make a logic which is duplicated we can put inside private. Only accessibe to the interface.

What is the difference between the default and static call. Why use default and static.
default - backward compatibility. When you can use your own and also use the existing.
static - class implementing cannot override the class. We need to call like the className.methodName.
What is Variable Argument.
In method we accept any number of parameter and not sure which is send by client then ... to get the value. It is stored as array and with forEach we get the value.

public sttic void main(String args[])

Can we cahneg the string args[] we se the varibale argument.

In the documentation it is mentioned to use string args[].

Class Test and has a sttaic method and we are creatong teh object with a null reference. TestObject = null.
Now if we call TestObject.staticMethod will that work.

NPE.
We are calling using null object. It is static method so we can call object.

# Need to see.

What is the difference between the base class and abstract class.

Base class - create and object and intance creating.
Abstract class - Cannot instantiated. Can contains or may not contains interface.

Marker Interface.
Empty interface - Serializable. Teh class object needs to convert in byte stream.
Define the empty interface and ine class to implement marker interface and another class to see if a class implements a marker interface.
We can use instanceOf.

# Need to see.

Volatile keyword.

It is used in multithreading. There multiple thread are using the variable. It should not take the cache value. When a variable is volatile then any read of the variable is using the latest value.

Can we write functional interface without abstract method.
Exactly one abstract method.

TreeSet and adding null and abc.
Print the treeSet - We will get runtime exception. TreeSet uses comparator internally which use compareTo and when we do null compare with other value.

When added return statemnet in trye and catch block will the finally still exceute?
System.exist();

# Need to see.

### Fault isolation.

Design in distributed stsrem.
Fault in one component willnot stop other component and faulty component will not stop the system.

Maven build lifecycle.
Validate, compile, test, package, clean, install, deploy.

Default scope in maven - compile.

Maven plugin - plugin assembly.

settings.xml - local repository location.

Clustered index and Nonclustered index.

View and different than table.
Joins.
Stored Procedure.

Use of spring boot - Embedded server - Tomcat server. Set up production level sytem. Removes the boiler plate code. Actuator. Spring boot and spring cloud. Service discovery.

Logging and monitoring - ELK Elastic Search, Log stack and Kibana.
Monitoring - Prometheus and Grafana.

Database transaction in microservcie.
It has multiple database so transaction is diggouly than monolithic servie. Here we acn sue the SAGA pattern - Oscrestration and Choroegraphy pattern.

Setter injection.

Te value are added after the object creation.

# Need to see.