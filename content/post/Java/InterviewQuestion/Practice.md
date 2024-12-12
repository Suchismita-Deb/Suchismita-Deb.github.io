+++
title = 'Practice Java'
date = 2024-10-29T13:51:06+05:30
tags = ['interviewQuestion']
categories = ['java']
+++

### Design Pattern.

Behavoiral, Creational and Structural.

| Creational       | Behavioral              | Structural |
| ---------------- | ----------------------- | ---------- |
| Singleton        | Template                | Adapter    |
| Builder          | Mediator                | Composite  |
| Factory          | Chain of Responsibility | Proxy      |
| Abstract Factory | Observer                | Flyweight  |
| Prototype        | Strategy                | Facade     |
|                  | Command                 | Bridge     |
|                  | State                   | Decorator  |
|                  | Visitor                 |            |
|                  | Interpreter             |            |
|                  | Iterator                |            |
|                  | Memento                 |            |

### Creational Design Pattern.

**Singleton Design Pattern** - A design pattern that allows you to ensure that a class has only one instance while
providing a global access point to the instance.

**Builder Design Pattern** - It simplifies the creation of complex objects by breaking the creation process into steps.
It is useful when the constructor has many parameters instead of creating many constructor the builder encapsulated the
construction logic within itself.

**Factory Design Pattern** - It creates an object without exposing the creation logic to the client and the created
object is referred to using a common interface. It provides an interface to create and object in a superclass and allows
the subclass to alter the type of object. It hides the instantiation process and returns the instance of the class as an
interface which represents the newly created object.

**Abstract Factory Design Pattern** - It provides an interface for creating families of related or dependent objects
without specifying their concrete class. It provides a way to encapsulate a group of individual factories that have a
common theme without specifying their concrete class.

**Prototype Design Pattern** - It create a clone of an existing object rather than creating a new one, for performance
reasons.

### Behavioral Design Pattern.

**Template Design Pattern** - It provides the skeleton of an algorithm in the superclass and then allows the subclass to
override the steps in the algorithm without changing its structure.

**Mediator Design Pattern** - It is used to reduce communication complexity between multiple objects or classes. The
pattern provides a mediator class that handles all the communications between different classes.

**Chain of Responsibility** - It allows the request to pass through a chain of handlers where they process it or pass to
the next handlers.

**Observer Design Pattern** - It defines a one to many dependency between objects so that when one object changes state
all its dependents are notified and updated automatically.

**Strategy Design Pattern** - It uses a group of algorithm and encapsulates each one and makes them interchangeable. It
let the algorithm vary independently of client that use it. It allows to select an algorithm at runtime. It helps in
eliminating or avoiding complex conditional statements.

**Command Design Pattern** - It allows to encapsulate the request as an object there by letting users parameterize
clients with queues, requests and operations.

**State Design Pattern** - It allows an object to change the behaviour when its internal state changes. The object will
appear to change its class.

**Visitor Design Pattern** - It represents and operation to be performed on the elements of an object structure without
changing the classes on which it operates.

**Interpreter Design Pattern** - It defines a grammar for a language and uses an interpreter to interpret the sentence
on that language making it useful for designing simple language processors or evaluators.

**Iterator Design Pattern** - It provides the way to access the elements of an aggregate objects sequentially without
exposing its underlying representation.

**Memento Design Pattern** - It captures and stores an objects internal state allowing it to restored later without
exposing its implementation details which is useful for undo or rollback functionality.

### Structural Design Pattern.

**Adapter Design Pattern** - It allows classes with incompatible interfaces to work together by wrapping its own
interface around that of an already existing class. It involves a single class adapter which is responsible for
communication between two independent or incompatible interfaces.

**Composite Design Pattern** - It let use to create an object in tree structure and work with the structure as if they
are individual objects. It is useful for representing a part-whole hierarchies.

**Proxy Design Pattern** - It provides a surrogate or placeholder for another object to control access to it.

**Flyweight Design Pattern** - It minimise memory usage by sharing common parts of state between multiple objects thus
reducing the overhead of creating large number of similar objects.

**Facade Design Pattern** - It provides a simplifies interface to a complex subsystem, making it easier to interact with
that subsystem by hiding its complexities and providing a higher level interface.

**Bridge Design Pattern** - It decouples an abstraction form its implementation so that the two can vary independently.

**Decorator Design Pattern** - It is also called wrapper. It wraps an object and add new behaviour to it. It provides an
enhanced interface to the original objects.

### Practice.

XML - Extensible MarkUp Language.

In XML the tag <bean> is used to define a bean. it specifies the class or the interface to be instantiated as bean and
provides additional configuration options.

In XML `<component-scan base-package="com.example"/>` is used to create component scanning. The attribute base-package
is used to specify the package to scan for annotated components.

In XML defining the property placeholder.

```xml
<context: property-placeholder>
```

It allows to specify properties fro external files or system properties.

How can you register an event listener in Spring XML configuration?
Using the `<listener>` tag.
Using the `<event-listener>` tag.
Using the `<application-listener>` tag.
Using the `<bean>` tag with the ApplicationListener interface.

Answer - We can register an event listener in XML configuration by using the <bean> tag with the ApplicationListener interface.

XML configuration for spring bean compared to annotation based configuration - XML offers better maintainability, flexibilty but can become bulky for larger project. Annotation offers consise code but it is less readable for complex configuration.

Spring supports both XML and annotation based configurations for defining beans and wiring dependencies.

Spring depends on third party Maven and Gradle for the dependency management. These tools handle the dependenciesand build configuration for Spring boot applications.

Microservice is a software architectural style in which a large application is build as a collection of small ,
independent and scalable services.

Spring Boot simplifies the configuration process and scans the class path and autoconfigure the beans and dependencies following convention over configuration principles. It simplifies the development of Spring application. Its primary
goal is to create a stand-alone production grade application with minimal configuration. Spring Boot simplifies the
configuration and deployment of microservices by providing a set of preconfigured templated and reducing the amount of
boilerplate code.

Spring Boot application can be packages in JAR, WAR and ZIP file for the deployment.

Spring is a framework for Java application where Spring Boot is an extension that simplifies the process by providing
sensible defaults, autoconfigure and embedded servers.

Spring Core is a submodule of Spring Framework. Important feature of spring core are DI and IOC. Dependency Injection is
used to loosely couple making them easier to test and maintain and better code reusability.

Default logging implementation in Spring Boot - Logback it is an implementation of SLF4J.

**Service Registry** - It facilitates communication by providing a central directory where the services can register and
discover each other dynamically. It enables services to find and interact with each other without the need of hardcoded
address. It ensures high availability through health checks enables load balancing.
**Service Discovery** - Neiflix Eureka, Consul. Eureka is a REST-based service registry for Java applications developed by Netflix. Consul provides both service discovery and key-value storage capabilities. Eureka and Consul both support health checks to monitor service availability.

Prometheus is responsible for collecting and storing metrics from various sources, while Grafana is used to create dashboards and visualize these metrics.

Handling distributed tan in microservice application - Two-Phase Commit (2PC) coordinates distributed transactions to ensure atomicity, though it may be less fault-tolerant. Sagas decompose transactions into smaller, compensatable steps, making them more resilient to failures.

**Polyglot persistence** - Using different database technologies for different servcie based on their specific
requirements and characteristics.

REST APi are a common way to handle inter servcie communication in microservices providing a standardized, stateless
interface for services to interact.

**Prometheus** - It is a tool used for monitoring and managing microservices, providing metrics collection, querying and
alerting capabilities.

**Resilience4j** - It is used to provide resilience and fault-tolerant mechanism. It helps to handle failure gracefully and improve the stability and reliability of the system. It provides resilience features like Circuit breaker, rate limiter , time limiter, bulkhead, retry.

HTTP and HTTPS are the common used protocol. Another commonly used protocol is gRPC for high performance and low latency
scenarios, it uses HTTP/2 for transport, supports multiple languages and provodes efficient binary serialization. gRPC is a lightweight protocol as it is efficient with large scale system.

**Event driven architecture** - It refers to using the events to trigger changes in the system, promoting decoupling and
asynchronous communication between services.

**Spring Cloud Config** - It provides centralized configuration management, allowing for external configuration of
microservices across different environments. It enables you to manage configurations across multiple servers. It enhances the deployment process by enabling centralized and version controlled configuration updates. This allows manage and update configurations across all services seamlessly, improving
deployment efficiently and reducing the risk of inconsistencies.

**Hystrix** - It is used to implement the Circuit breaker pattern in the Spring boot microservies application helping to
manage failures and provide fallback mechanisms.

**Orchestration Pattern** - It is sommonly used to manage the lifecycle of microservices, coordinating the execution of
different servcies to achieve a business goal.

**SAGA Pattern** - It is commonly used for handling data consistency in microservcies, coordinating distributed
transaction by breaking them into smaller manageable steps.

**Sidecar Pattern** - It offloads common funtionality like logging, monitoring and configuration from the main servcie
to a separate sidecar container, promoting separation of concerns.

**Spring Cloud Sleuth and Zipkin** - It provides distributed tracing and logging helping to track requests across
multiple microservices for debugging and monitoring purposes.

**Spring Boot Actuator** - It provides production-ready features such as monitoring, metrics, health-checks, helping to
manage and monitor microservices in a production environment.

Spring Boot 3 needs Java version 17.

PUT completely updates an existing resource, while PATCH modifies only the fields specified in the request.

**Spring Cloud Gateway** - It is used in dynamic routing and load balancing. It can route the requests to the
microservice based on various criteria and balance the load among multiple instances of a service improving reliability
and performance. It provides a single entry point for client requests, routing them to the appropriate microservices and
handling cross-cutting concerns like security and rate limiting.

**Kubernetes** - It is a tool used for container orchestration managing the deployment, scaling and operation of
containerized applications in a microservices architecture.

Doubts in docker and docker compose.

**DispatcherServlet** - It handles the incoming requests and delegated them to controllers.

Bean definition is the blueprint specifies how to create a bean (class, properties, dependencies) and a bean instance is the actual object created from it.

Spring IOC container is responsible for instantiating, configuring, managiing the lifecycle of bean.

Spring AOP - uses aspects(containing advices) that applies to specific jointpoints(method call, fiel access) with target objects.

Ways to create a bean lifecycle - Using annotation, by implementing interfaces provided by spring, by xml configurtion. Bean is singleton by default.

Interface to perform destruction of a bean DisposableBean. Spring allows bean to perform destroy callback method by implementing DisposableBean interface.

A BeanFactory interface is capable of maintaing the registry of differet beans and their dependencies. It holds bean definition and inistantiate beans whenevr asked by the application. It is capable of creating associations between dependent objects while instantiating them. It does not support the annotation based DI whereas the Applicationcontext a superset of BeanFactory does.

In the application.properties the use of the code.

```java
spring.application.name=service-a
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

It will enable the application to register with the Eureka serevr for service discovery. It sets the application name and
url provides the URL of the Eureka server where the application registers itself and can discover other services.

Understand the code.

```java

@FeignClient(name = "service-b")
public interface ServiceBClient {

    @GetMapping("/serviceB")
    String getServiceBResponse();
}
```

It defines a REST client for interacting with Service B using the Feign to simplify the HTTP communication. Load balancing starategies implemented by Ribbon and OpenFeign are - Round robin - distributes evenly across available instance, least Connextion routes the requests to the instance with the fewr active Connection, random - Select a random instace to handle each requests.

Stateless and Stateful services in Microservices - Stateless services donot store session informtion ans stateful services use external storage or databases to persist session state.

Understand the code.

```yml
ADD target/myapp.jar myapp.jar
```

It adds the application JAR file from the target directory on te host to the Docker container and renames it to the
myapp.jar
Understand the code. It the code written using SpEL(Spring Expression Language).

```java
@Value("#{myBean.myProperty != null ? myBean.myProperty : 'default'}")
```

What is the shorter representation using the Elvis operator.

```java
@Value(“#{someBean.someProperty ?: ‘default’}”)
```

To access the bean property using the SpEL expression - `#{beanName.propertyName}`. SpEL uses the `#{}` syntax to access the bean properties.

Retrieve a bean from the Spring ApplicationContext - Using the ApplicationSontext.getBean() method. It takes the bean name or its class as a parameter.

Which scope in spring ensures that object exis between every request in HTTP Session - Session.

In order to enable SpEL in spring bean which annotation is used - `@ExpressionLanguage`, `@EnableSpEL`, `@SpEL`, `@Value` - Answer - `@Value`.

To be eligible for the Spring Even Handling mechanism which interface should a class implement - `EventListener`, `ApplicationListener`, `EventHandler`, `EventSubscriber`.

Answer - `ApplicationListener` interface. A class should implement the ineterface. It permits the class to receive and handle application events.

In Spring JDBC, which method we use to execute the SQL query that can map the result to a java object.
`executeQueryForObject()`, `fetchObject()`, `executeForObject()`, `queryForObject()`.

Answer - `queryForObject()` method is used to execute a SQL query and map the result to a java object in JDBC. It is used to retrieve a single result.

Spring project helps in building Microservices - Spring MVC, Spring Batch, Spring Cloud, Spring JDBC.

Answer - Spring Cloud. It provides a suite of tools for building and working with microservices.

Which spring cloud component helps in managing and handling application sensitive information in microservice setup.
Spring Cloud Security.
Spring Cloud Vault.
Spring Cloud config.
Spring CLoud stream.

Answer - Spring Cloud Vault. It is designed for managing and handling sensitive application data liek passwords, API keys and other secrets. It ensures these details are securely stored, retrieved and managed.

How does Spring support creating JMS(Java Message Service) application?
By using the spring-boot-starter-jms dependency.
Through manual configuration of JMS providers.
By requiring a separate messaging server.
Through XML configuration.

Answer - By using the spring-boot-starter-jms dependency. It somplifies the integration with JMS prociders like ActiveMQ or Artemis.

How is internalization (i18n) typically implemented in spring.
By using a dedicated internationalization service.
Through properties files for different locales.
By harcoding strings in the Java code.
Using an external translation API.

Answer - Through properties file for different locales example - messages_en.properties, messages_fr.properties. This allow for easy translation and localization of application messages.

Which embedded servlet container is not supported by default in spring boot.
Tomcat, Jetty, Undertow, Apache HTTP Server.

Answer - Apache HTTP Server. The default is the Tomcat embedded servlet container.

How does Spring Boot simplify maven configuration.
By providing a parent POM for dependency management.
By eliminating the need for the pom.xml file.
By automatically generating the Maven build script.
By replacing Maven with its iwn build system.

Answer - By providing a parent POM for dependency management. It simplifies Maven configuraion by offerent a parent POM (spring-boor-started-parent) which privides dependency management and sensible defaults.

Which pattern helps in avoiding network calls by using the latest known state?
Sage. Circuir Breaker. API Gateway. CQRS.

Answer - CQRS - avoid the network calles by using the most recent known state. The read side often uses cached or replicated data, enabling retrieval of the latest known state without making additional network calls to the primary database.

How are the static resource serves in a Spring Boot Web application?
Through a dedicated controller.
By placing them in the /static or /public directory.
Using a specialized static server.
By manual configuration in the application.properties file.

Answer - By placing them in the /static or /public directory. Static resource llike the CSS or image can be served in the /static or .public sirectory. Spring boot configures these as static resource location.

Which component is responsible for handling view resolution in spring?
JDBC Template.
ViewResolver.
DataSource.
WebMvcConfigurer.

Answer - ViewResolver. The component resolves views by name and determines which view technology to use for rendering the UI.

how can you enable transaction management in a Spring Boot application.
By using the @Transactional annotation.
Through XML configuration.
By manually managing transactions in the service layer.
By using a specialized transaction management server.

Answer - By using the @Transactional annotation.

How does spring boot supports database migration?
Using the @Entity annotation.
Through the Spring data JPA.
By integrating with tools like Flyway or Liquibase.
By providing its own database migration tool.

Answer - By integrating with tools like Flyway or Liquibase.

Which component in Spring boot auto configues a datasource based on the classpath settings.
Datasource Config.
DataSourceAutoConfiguration.
JdbcTemplate.
HibernateTemplate.

Answer - DataSourceAutoConfiguration. It is used to auto-configues a datasource bean based on the classpath settings and the properties defined in the application.properties file.

How to enable automatic schema generation for the JPA entities?
By using the @AutoSchemaGeneration annotation.
By setting spring.hibernate.ddl-auto property.
Through XML configuration.
By manual schema creation in the database.

Answer - By setting spring.hibernate.ddl-auto property.

How can you define custom query methods in a Spring Data repository?
By using the @QueryMethod annotation.
Through XML configuration.
By declaring methods in the repository interface.
By manually implementing the repository methods.

Answer - By declaring methods in the repository interface. Custom query methods in a Spring Data repository can be defined by declaring methods in the repository interface. Spring Data derives the query from the method name or uses the provided `@Query` annotation.

How can you customise the banner in a spring boot application?
Modifying the application.properties file.
Adding a banner.txt file in the classpath.
Writing custom Java code.
Using the Spring Boot CLI.

Answer -Adding the banner.txt file in the classpath.

What is class serves as the default implementation of the JpaRepository interface.
SimpleJpaRepository, JpaRepositoryImpl, CustomJpaRepository, DefaultJpaRepository.

Answer - SimpleJpaRepository.

Spring is compatible with Grdle 7.x (7.5 or later).

In JDBC, the `NamedParameterJdbcTemplate` class supports for executing SQL statements with named parameters. It allows to specify parameters by name instead of their positional index.

Which is helpful in passing the data from a controller method to view in Spring MVC.
HttpRequest object.
HttpServletResponse object.
HttpSession object.
ModelAttributes to the Model object.

Answer - ModelAttributes to the Model object.

Which of the following is used to hold the model data and view information in Spring Mvc.
ViewResolver.
ModelModelAttribute.
ModelAndView.

Answer - ModelAndView.

In Spring Security 5.6 we have the `@EnableMethodSecurity` in place of `@EnableGlobalMethodSecurity`.
In order to use `@Secured` we need to provide additional attribute `@EnableMethodSecurity(securedEnabled=true)`

**After Advice** - It is executed regardless of the method execution outcome, irrespective of the method is eecuted normally or any exception occurs.

How does Spring Boot supports reactive data access?
By using the R2DBC API.
Through the JdbcTemplate class.
By manual reactive programming.
Through XML-based configuration.

Answer - By using the R2DBC(Reactive Relational Database Connectivity) API. It provides a non blocking and reactive programming support for the relational databases.

Which pointcut expression is correct - “Any method with zero or more parameters inside EmpDao class”

`public * com.dev.dao.EmpDao.*( )`, `public * com.dev.dao.*.*(..)`, `public * com.dev.dao.EmpDao.*(..)`, `public Integer com.dev.dao.EmpDao.*( )`

Answer - `public * com.dev.dao.EmpDao.*(..)`.

In pointcut expression - `()=>` indicate zero paramter or without paramter. `(..) =>` indicate any number or type of paramters.

`@Secured(“ROLE_MANAGER”,”ROLE_ADMIN”)` - It can be also written as - `@PreAuthorize(“hasRole(‘ROLE_MANAGER’) or hasRole(‘ROLE_ADMIN’)”)`

Cron expression in Spring Scheduling that executes a task every year on Feb 14th 9:00:00 PM, if given day(14th) is Sunday or Tuesday only.

Answer - `0 0 21 14 2 SUN,TUE`

In Spring 5.3 the improves cron expression of `0 0 0 * * 0` can be also `@weekly`.

Cron expression in Spring Scheduling that executes a task every year to wish Happy Birthday on 24th March - `0 0 0 24 3 *`

### Annotation.

`@SpringBootApplication` - It indicates a configuration class that declares one or more `@Bean`methods and trigger
autoconfiguration and component scanning. It is a convenient annotation equivalent to declaring `@Configuration` (it indicate s that the class can be used by the IOC container as a Spring configuration class for bean definitions, `@SpringBootConfiguration` is an alternate of the annotation),
`@EnableAutoConfiguration` (it is used to automatically configure spring application context. It does not directly manage dependencies it enables the application to include necessary dependencies based on the classpath contents) and `@ComponentScan` (it enables component scanning so that spring can find and regiter veans within the specified package).

`@ConfigurationProperties` - It is used to bind external configuration properties to a Java object.

`@SpringBootTest` - It is used for thr integration testing. It loads the application context and makes it ideal for
testing the entire application.

`@WebMvcTest` - It is used to unit test the Spring MVC controllers in isolation without loading the entire application
context.

`@RequestBody` - It is used to bind a method parameter to a web request body. It is used with post and put http method.

`@RequestParam` - It is used to bind a method parameter to a web request parameter. It is used with GET request.

`@RequestMapping` - It is used to map web requests to handler methods in controller classes.

`@ResponseBody` - It is used to send the returned object as the response body.

`@GeneratedValue` - It is used to automatically generate primary key values. It is typically used in conjunction with the @Id annotation.

`@DataJpaTest` - It is used to test the repository layer in Spring Boot, providing the necessary components like an in memory database and initializing Spring Data Jpa for repository testing.

`@Version` - It is used to enable optimistic locking by marking a field as a version column.

`@Lob` - It is used in a JPA entity to define a large object LOB field in the database like the BLOB(Binary Large Object) or CLOB(Character Large Object).

`@ControllerAdvice`, `@ExceptionHandler`, `@ResponseStatus` - It is used for the exception handling. `@ControllerAdvice`
for the global exception handling, it offer to define global exception handling method throughout multiple controllers, `@ExceptionHandler` for handling specific exceptions and `@ResponseStatus` for
sending appropriate HTTP response codes.

`@PathVariable` - It is used to bind the values from the URL path to method parameter.

`@MethodAttribute` - It is used to bind the method parameter to named model attributes.

`@JsonInclude` - It is used to include specific fields in JSON serialization. It allows specifying which filed should be included in the JSon output.

`@JsonIgnore` - It is used to ignore the fileds during JSON serialization and deserialization preventing them to include in the JSOn output.

`@JsonView` - It is used to define a different views of a JSON serialized object. It allows specifying which properties of an object are included in the JSON output for different scenarios.

`@Profile` - It is used to conditionally load beans based on the active profile. It can be configured for different
environments like development, testing, production.

`@Async` - It is used to make the method asynchronous allowing it to run in a separate thread without blocking the main
execution flow.

Doubt.

`@EnableAsync`- It is used to enable asyncronous method execution in Spring.

`@Transactional` - It is used to manage the database transactions automatically. When applied to a method or class it
ensures that all database operations within the method are executed within a single transaction. If any exception
occurs, the transaction is rolled back ensuring data consistency. It simplifies transaction management in application.

`@EnableTransactionManagement` - Spring Transaction support is not enables by default. It is used in a `@Configuration` annotated class to enable transaction related support in Spring. It activates the infrastructure for declarative transaction management in Spring.

`@Autowired` - It marks the field, constructor, setter method for the automatic dependency injection. It allows spring
to automatic associate the dependencies without the need for explicit configuration.

`@EnableAspectJAutoProxy` - It is used to enable spring AOP support. t activates the proxy based AOP infrastructure,
allowing the use if aspect oriented programming.

`@Bean` - It is used to declare a method that returns an instance bean. It is invoked by spring to create the bean and
manage its lifecycle.

`@Query` - It is used to define a JPA query for a repository method. It allows custom query definitions directly on repository interface methods.

`@Valid` - It is used in controller methods to ensure that data passed to the method is valid, often used in combination with Java Bean Validation API.

`@ModelAttribute` - It is used to bind method parameters to named model attributes.

`@JsonBackReference` - It is used to handle recursive relationships in JSON serialization and deserialization. `@JsonManagedReference` - It is also used for the same purpose.

`@Value` - It supports spring expression language. It is generally used for injecting values into configuration variables. It is used to default values to variables and method arguments. It supports the SpEL. It offers to evaluate the SpEL expressions and inject the result into a bean property.

`@EnableEurekaClient` - It is used to enable Eureka client functionality in a spring Boot application allowing it to register with a Eureka server.

`@EnableConfigServer` - It used to enable Spring Cloud Config Server functionality allowing the application to serve configuration properties to other microservices.

`@EnableZuulProxy` - It is a configuration class enables the Zuul proxy functionality setting up an API gateway that can route the requests to various microservices.

`@FeignClient` - It declare a REST client that uses Feign which simplifies HTTP communication between microservices by providing a declarative approach.

`@LoadBalanced` - It is used to configure the REST template bean forclient side load balancing, distributing requests across multiple instances of a service.

Annotation can be used to inject dependencies in spring bean - `@Inject`, `@Autowired`, `@Resource`. `@Autowired` and `@Inject` can be sued interchangebly.

Annotation used to specify a class as a Bean - `@Service`, `@Component`, `@Controller`.

`@Qualifier` - It is used with the `@Autowired` in the context of autowiring. It resolves the ambiguity when multiple beans of the same type are present.

`@Lazy` - It is used to configyre the bean for lazy initialization. It enables the bean is created only when it is first requested.

`@EnableCaching` - It is used to enable method-level caching in Spring.

`@Order` - It is used to define the order of bean initialization. It allows to assign a value to indicate the desired order of bean creation.

`@EnableWebMvc` - It is used to support the Spring Mvc.

`@EnableScheduling` - It is used to enable Spring scheduling support.

`@FixedRate` - It is used to schedule a method to execute at fixed intervals. It defines the interval between method invocations in milliseconds.

`@CrossOrigin` - It is used to enable cross-origin resource sharing CORS in spring Mvc. It enables a cross-origin requests on specific haandler classes or handler methods allowing resources to be accessed from a domain other than the domain where the resource originated.

`@Scope("prototype")` - It is used to define a bean scope as prototype, a new instance will be reated wach time the bean is requested.

`@Controller` handles both request and response datawhile te `@RestController` assume Json or serialize data for the response and removes tge need to explicit `@ResponseBody` annotation on method.

`@EmbeddedId` - In hibernate the annotation is used for the column to represent that an entity has a composite key. `@Embedded` is not allowed at class level and `@Embeddable` is not allowed at field level.

`@Temporal` - It converts the date and time values from Java object to compatible database type abd retrieves back to the application.

`@PreDestroy` - It is used to mark a method that should be invoked before destroying the bean.

### TODO

Implement Zuul, FeignClient, Spring Cloud Server, Spring Cloud config, Spring Cloud Gateway, Service discovery, microservcie distributed tracing - zipkin, jaeger. Spring AOP, Hibernate and table, Spring transaction.

Annotation for the caching @Cachebale, @EnableCaching.
Annotation @Priority, @Retry, @Retryable.
Understand SpEL - Spring Epression Language, one docker file, pointcut expression, Entity relation and orm.

Asynchronous, cache, cloud.

Bean creation and initialization. Bean type like prototype

---

---

Key principles of Microservices
Monolithic vs Microservices
gRPC for efficient binary communication
API Gateway pattern
Asynchronous communication (Message Queues like Kafka, RabbitMQ)
OpenFeign for REST clients
Load balancing strategies (Ribbon, OpenFeign Load Balancer)
Database per service pattern
Event sourcing and CQRS patterns
Handling distributed transactions (Sagas, Two-Phase Commit)
Data consistency (eventual consistency, strong consistency)
Caching mechanisms (Redis, Memcached)
Circuit Breaker Pattern (e.g., using Resilience4j)
Retry mechanisms
Bulkhead pattern
Timeout handling
Distributed tracing (Zipkin, Sleuth)
Docker for containerization of microservices
Service discovery with Eureka or Consul
Load balancing strategies (Client-side, Server-side)
API Gateway patterns (Netflix Zuul, Spring Cloud Gateway)
JWT (JSON Web Token)
Role-Based Access Control (RBAC)
Security practices for inter-service communication
Distributed logging (ELK Stack: Elasticsearch, Logstash, Kibana)
Monitoring (Prometheus, Grafana)
Distributed tracing (Zipkin, Jaeger)
Health checks (Spring Boot Actuator)
Jenkins or GitLab for Continuous Integration
Horizontal vs vertical scaling
Stateless vs stateful services
Autoscaling in Kubernetes
Load testing and tuning (Apache JMeter)
Event streaming with Kafka
Event Sourcing and Command Query Responsibility Segregation (CQRS)
Async messaging patterns

### Practice based on code snippet.

Which is wrong Get mapping.

```java
@GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
```

```java
@RequestMapping(value = "/emp/{id}", method = GET)
```

```java
@GetMapping(consumes = {"text/plain", "application/*"})
```

```java
@GetMapping("/")
```

Answer -

````java
@GetMapping(consumes = {"text/plain", "application/*"})
``` is wrong as it does not specify the path.
````

Prototype scope in a bean named 'Person' - `<bean id="person" class="com.test.Person" scope ="prototype"/>` scope and prototype should be in small case.

Define a request scope of a bean.

```java
@RequestScope
public class Product {
    // some properties & methods
}
```

```java
<bean id="product" class="com.test.Product" Scope="request"/>
```

```java
@Scope("request")
public class Product {
    // some properties & methods
}
```

Ways to create session scope.

```java
@Component
    @Scope("session")
    public class Product {
     //some methods and properties
    }
```

```java
@Component
    @SessionScope
    public class Product {
     //some methods and properties
    }
```

In hibernate there are 2 classes Employee and Name.

```java
public class Employee {
   private int id;
   private Name name;
   private double salary;
   // getters & setters
}

public class Name {
   private String firstName;
   private String lastName;
   //getters & setters
}
```

Create a table employee into the database with 4 columns - id, firstName, lastName, salary using the ORM.
Answer -

```java
@Entity
    public class Employee {
       @Id
       private int id;
       @Embedded
       private Name name;
       private double salary;
       // getters & setters
    }

    @Entity
    public class Name {
       private String firstName;
       private String lastName;
       // getters & setters
    }
```

Define a REST client using OpenFeign in the application.

```java
@FeignClient(name = "example-service")
public interface ExampleClient {
    @GetMapping("/endpoint")
    String getEndpointData();
}
```

The application has 2 entity - Student and Address. One student can have multiple addresses and one address can accomodate multiple students in a bidirectional relationship - Here @OneToMany or @ManyToOne can be used. MappedBy can be used with @OneToMany

### Cron Job