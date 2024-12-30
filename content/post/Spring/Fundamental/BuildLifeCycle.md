+++
title = 'Build Life Cycle'
date = 2024-12-23T23:55:51+05:30

url= "/post/spring/fundamental/buildLifeCycle"
tags = ['interviewQuestion', 'spring']
+++

## Lifecycle of Maven.

Maven is a project management tool not just build management tool.

It helps in build generation, dependency resolution and documentation.

Maven uses POM(Project Object Model) to do it. When maven command given it looks pom and get the configuration.

In the pom file there is some xml and then parent and every pom is a child of some other pom. When in the pom file no parent tag present then the pom is a child of superPom.xml The groupId, artifactId, version and project name are the unique identifier of the project. There is a properties tag and it is a key value pair where java.version is the ket and the version is the property. In the repository tag we send the link from where maven will download the dependencies. Then there is the build tag.

### Build lifecycle.

**Validate**.

**Compile**.

**Test**.

**Package**.

**Verify**.

**Install**.

**Deploy**.

When we want to run the package phase then all the first phase is executed. Each phase has multiple tasks.

When we want to add task in one phase then with the build tag we can add the task in plugin.

In the install step it will install the .jar pacakge in local maven repository which is in home directory.

@RestController = @Controller + @ResponseBody.

@ResponseBody Meaning the return type is the http response.

@RequestParamter - In the path there is ? and & and contain the value.

@RequestBody - Data in the body will be mapped to the dto.


















Why Spring Boot even needed.

Initially we used to work with Servlet and it is very difficult to work with Servlet.

Example of a servlet.

```java
@WebServlet('/demoservletone')
public class DemoServlet1 extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
        String requestPathInfo = request.getPathInfo();
        if(requestPathInfo.equals('/')){
            // do something.
        }
        else if(requestPathInfo.equals('/firstendpoint')){
            // do something.
        }
        else if(requestPathInfo.equals('/secondendpoint')){
            // do something
        }
    }
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response){
        // do something.
    }
}
```

One servlet can have one doGet, doPut, doDelete. We can have more than one servlet.

In web.xml
<servlet>
<servlet-name>DemoServlet1</servlet-name>
<servlet-class>DemoServlet1</servlet-class>
</servlet>
<servlet-mapping>
<servlet-name>DemoServlet1</servlet-name>
<url-pattern>/demoservletone</url-pattern>
<url-pattern>/demoservletone/firstendpoint</url-pattern>
<url-pattern>/demoservletone/secondendpoint</url-pattern>
</servlet-mapping>

<!-- my second servlet configuration below-->
<servlet>
    <servlet-name>DemoServlet2</servlet-name>
    <servlet-class>DemoServlet2</servlet-class>
</servlet>
```

The web.xml is the most difficult one. In the servlet-mapping We are saying that the demoservlet1 will handle all the request.

![alt text](image-1.png)

Servlet Image.

Tomcat is also knows as the servlet container.

To solve the issue Spring MVC introduced.

SpringFramework solves the challenges exists with Servlets.

### The importance of Spring Framework.

Removal of web.xml - Spring framework introduces annottaion based configuration.

Inversion Of Control - Servlet depends on servlet container to create object and maintain its lifecycle. IOC is more flexible way to manage object dependencies and its lifecycle (through Dependency Injection).

Without the DI.

```java
public class Payment{
    User user = new User();
    void getSenderDetails(String userId){
        sender.getUserDetails(userId);
    }
}

public class User{
    public void getUserDetails(String id){
        // do something.
    }
}
```

The code is tight coupled. When we want to test for the method and then we can mock the other service class here we cannot mock the service class as we are making a new Object.

With Dependency Injection we are using the Autowired.

```java
@Component
public class Payment{
    @Autowired
    User sender;
    void getSenderDetails(String userId){
        sender.getUserDetails(userId);
    }
}

@Component
public class User{
    public void getUserDetails(String id){
        // do something.
    }
}
```

@Component - It manages the class or bean.

@Autowired - Adding the dependencies.

Unit Testing is much harder in servlet and it is easy in spring framework.

Handling the HTTP methods and request parameters and path mapping is difficult. Spring MVC provides an organised approach to handle the requests and it is easy to build restful apis.

Spring Image.
![alt text](image-3.png)

In the Tomcat servelt container we have to deploy the WAR file.

Servlet container pass to the dispatcher servlet and it will decide which controller to pass.

Spring MVC.

```java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.SpringCourse")
// Only under the package the files are there.
public class AppConfig{
    // add the configuration.
}

```

In DispatcherServlet class.

```java
public class My ApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer{
    @Override
    protected Class<?>[] getRootConfigClasses(){
        return null;
    }
    @Override
    protected Class<?>[] getServletConfigClasses(){
        return new Class[]{AppConfig.class};
    }

    @Override
    protected String[] getServletMappings(){
        return new String[]{"/"};
    }
}
```

We need to override the methods. Mention the requests it needs to handle.

We need the DispatcherServlet and Config.

### Why Spring Boot is needed.

It solves the challenges exists in MVC.

**Dependency Management** - No need to manage the dependency separately and also their compatible version. In the interval pom file we donot need to mention the version.

**AutoConfiguration** - No need to separately configure the 'DispatcherServlet','AppConfig','EnableWebMvc','ComponentScan'. Spring boot adds internally by default.

It has only one annotation @SpringBootApplication and it contain all the other annotation like webMvc, componentscan and if we need to change any thing then we need to specify.

**Embedded Server** - In mvc we need to create the war of the application containing the applications class and jsp pages, configuration files, dependencies and then deploy it to a servlet containers like Tomcat. In spring boot servlet container is already embedded we donot have to do all the stuff. Just the application will easily deploy in the local.

It supports Convention over configuration.

JAR - Java Archive.

WAR - Web Archieve.

Stand alone Java application - we just need to start the application then JAR.
When we need to complete web application like the HTML, CSS, JS then WAR.

Each microservice is a standalone application and we can use JAR.

Spring Boot use the layered architecture.

DTO - Client gave data in the body like {"id":1,"roll":1}. There will be request dto and response dto. The client request is mapped to the request dto and it wil prevent any change like later the id changed to Number then we can map it.

Controller layer does the mapping from the request parameter to the dto.

Service layer will do the value coming from db and map it to the response dto.

Entity - Direct representation of the table. When servcie enter a data then it will put the value in the entity and repository will add the value.

### Lifecycle of Maven.

Maven is a project management tool not just build management tool.

It helps in build generation, dependency resolution and documentation.

Maven uses POM(Project Object Model) to do it. When maven command given it looks pom and get the configuration.

In the pom file there is some xml and then parent and every pom is a child of some other pom. When in the pom file no parent tag present then the pom is a child of superPom.xml The groupId, artifactId, version and project name are the unique identifier of the project. There is a properties tag and it is a key value pair where java.version is the ket and the version is the property. In the repository tag we send the link from where maven will download the dependencies. Then there is the build tag.

### Build lifecycle.

**Validate**.

**Compile**.

**Test**.

**Package**.

**Verify**.

**Install**.

**Deploy**.

When we want to run the package phase then all the first phase is executed. Each phase has multiple tasks.

When we want to add task in one phase then with the build tag we can add the task in plugin.

In the install step it will install the .jar pacakge in local maven repository which is in home directory.

@RestController = @Controller + @ResponseBody.

@ResponseBody Meaning the return type is the http response.

@RequestParamter - In the path there is ? and & and contain the value.

@RequestBody - Data in the body will be mapped to the dto.

### Lifecycle of Bean.

Bean ia a Java object which is managed by spring container also known as IOC container.

2 ways to createthe bean @Component and @Bean.

@Component - Convention over configuration. Asking spring to make th object and manage it.

It uses the default constructor to create the bean.

@Controller and @Service ask the spring to do that internally with the @Component.

Bean - When user add the contructor and pass the parameter to create the bean.

### How spring boot finds the bean.

In the application @ComponentScan is used to scan teh package and sub package classes annotated with @Component, @Service.

It also see that there any class with @Configuration and there it will create the bean.

At what time the bean is created.

Eagerness - Beans are created at the time we start our application.

Bean with Singleton scope are eagerly initialized.

Lazy - Bean get created lazily means when they actually needed. Ban with scope like Prototype are lazily initialized.

![LifeCycle of BEan](image-4.png)

### Dependency Injection.

When we create a new object then we are dependent on the object and when we change the class to interface or anything then we have change the main class. So we use @Autowired.

```java
@Component
class Order{}
```

When we use the objet of order then it will first see if the Order bean is creted if not then it will create and then inject.
There are 3 ways - Field injection, Constructor injection, Setter Injection.

Mainly we are using the constructor injection.

When start the application the IOC will see the the component it need to create. It create the bean. It uses Reflection to see the dependent bean and then create the bean.

Issue with the Autowired. It cannot be made as final.

Java uses Reflection and it dont see the final and update the value. Reflection breaks a lot of principle in Java.

Issue - It is managed by java and we cannot control and we cannot mock the object and we have to use mockito.

Setter Injection.

Dependency is set into the field using the setter method. We annotate the method using the @Autowired.

Advantage - We can change the dependency when required.

```java
public class User{
    public Order order; // It is not final.
    public User(){
        System.out.println("User initialized");
    }
    @Autowired
    public void setOrderDependency(Order order){
        this.order = order;
    }
}
```

Issue - We cannot make it as final.

Constructor Injection.

```java
@Component
public class User{
    Order order; // It can be final.
    @Autowired
    public User(Order order){
        this.order = order;
        System.our.println("User initialized.");
    }
}
```

The bean is creted at the time of making the User class and we are not making the bean after the object creation.
When only one dependency then we donot have to use the @Autowired.

Issue - When more dependency then need to add in the constructor. Then first look the design and make it good.

Issue with Dependency Injection.

Circular Dependency - Class order depends on Invoice and class Invoice is dependent on Order.

Take the common code and make the class use the common code. Use the @Lazy annotation then the class will not create at the time of start and it will be created at the time of invoke.\

Another is @PostConstruct in the method it will create the bean afterthe first is created.
Issue - Unsatisfied Dependency.

When there is one interface Order and OnlineOrder and OfflineOrder implements the intreface and one class crete the dependency for the Order and not to any specific class then it will show Unsattisfied Dependency.

Here we can use the OnlineOrder with the annotation @Primary so it will be seen first.

Another way to use @Qualifier and wecan assign a name.

```java
public interface Order{}

@Qualifier("onlineOrderObject")
@Component
public class OnlineOrder implements Order{}

@Qualifier("offlineOrderObject")
@Component
public class OfflineOrder implements Order{}

public class User{

    @Autowired
    @Qualifier("onlineOrderObject")
    Order onlineOrder;

}
```

### Bean Scope.

Scope - Singleton, Prototype, Request, Session.

Singleton - Default scope. Only one instance created per IOC. Singleton are eagerly initialized by IOC ( means at the time of application startup, object gets created ).

```java
@Component
@Scope('singleton')
public class User{
    // Repo.
}
```

First in making the class it see the constructor and then see the dependency object then it will create the object.

When a same object used in two different places then it will see if the object is present then it will use the object in singleton.

Prototype.

Each time new object is created and it is lazily initialized.

Request.

New object is created for each HTTP request.
Lazily initalized.

Add the cscope in controller and it is lazy and when call it will create the bean and it can be used by prototype scope as well and it is also laze. When the controller hit then the bean is created.

When the prototype bean is hit it will again create a new bean and when the request scope is hit it will see the existing bean and then create the one.

There is one singletin class and it wants to access the dto and the dto scope is reqyest
Hw to

Here we donot have to change the versi on or pom.So we will sork th the teo. Here we will use tge proxyMode0 = roxyModel, Scope Taregt,.

Session.

New object is created for each HTTP session.
Lazily initialized.
When user access any endpoint, session is created.
Remains active, till it does not expires.

@ConditionalOnProperty - Bean is created conditionally.
Say one bean is only going to be created if the order is online.

```java
@Component
@ConditionalOnProperty(prefix='online', value='enabled', havingValue ='true', matchIfMissing=false)
public class Online{}
```

In the main file.

```java
public class User{
    @Autowired(required =false)
    Online online;
}
```

In application property the part `online.enabled=true`.

havingValue is for matching if the string value match then true the bean will create.
