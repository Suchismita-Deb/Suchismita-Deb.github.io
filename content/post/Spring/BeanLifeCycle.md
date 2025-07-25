+++
title = 'BeanLifeCycle'
date = 2024-05-05T12:25:01+05:30

url= "/post/spring/fundamental/beanLifeCycle"
tags=["spring"]
+++


Playlist. Bean and its lifecycle.

*Bean is a Java object which is managed by Spring Container also known as IOC container.*
IOC container(Inversion of Control) contains all the beans which get created and also manage them.

### 2 ways to create a Bean
- `@Component` Annotation.
- `@Bean` Annotation.

### Creating Bean using @Component Annotation.

It follows **convention over configuration** approach - means spring boot will try to auto configure based on conventions reducing the need for explicit configuration.

`@Controller`,`@Service` all internally tells spring to create beans and manage it. When we go inside the controller will see the component.

Spring automatically used its autoconfigure and it will use default constructor to create its object. It is not mentioned in the code.
```java
@Component
public class User{
    String username;
    String email;
    
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email1){
        this.email = email1;
    }
}
```
When we create a specific constructor in this code. Now we used the @Component and also used the specific constructor.

```java
@Component
public class User{
    
    String username;
    String email;
    // Using a specific constructor.
    public User(String username, String email){
        this.username = username;
        this.email = email;
    }
    
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email1){
        this.email = email1;
    }
}
```
When we add our own constructor then java will not use the default constructor.
We have used the @Component so spring wil use the default constructor but here it will not able to get it. Spring does not know what to pass in the constructor parameter. So the **Application failed to start**.

Here we can use @Bean and we provide the configuration details (external configuration) and tells spring boot to use it while creating a Bean.

### Creating Bean using @Bean Annotation.
```java
public class User{
    
    String username;
    String email;
    // Using a specific constructor.
    public User(String username, String email){
        this.username = username;
        this.email = email;
    }
    
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email1){
        this.email = email1;
    }
}
```
No @Component annotation and we will make another class.

```java
@Configuration
public class AppConfig {
    // We can make any method the return type is important as we have to make the User object.
    @Bean
    public User createUserBean(){
        return new User("anyUserName","anyEmail");
    }
}
```

*When use compoennet and also bean and also put default constructor then what spring will choose? First priority to the Bean meaning external configuration.*

*When we have multiple Bean to create the same object?
```java
@Bean
    public User createUserBean(){
        return new User("anyUserName","anyEmail");
    }

@Bean
public User createUserBeanAnotherOne(){
        return new User("newUserName","newEmail");
        }
```
Spring will go one by one and create objects. Both object will be managed by IOC.

### How spring Boot find these Beans?

We have all the component and bean in like 50 - 60 files. How does Spring finds the beans.
**One approach.**
Using the @ComponentScan annotation, it will scan the specified package and sub-package for classes annotation with @Component @Service.
```java
@SpringBootApplication
@ComponentScan(basePackages = "com.learning.springBoot")
public class SpringbootApplication{
    public static void main(String args[]){
        SpringApplication.run(SpringbootApplication.class,args);
    }
}
```
When we donot provide the `@ComponentScan` it will still work.
`@SpringBootApplication` also has compoennt internally.
First it will go to the main package and then it will start from the package and goes to the sub-packages.

**Another approach**.
Spring also looks for the `@Configuration` class. Then it will make all the bean it contains in the class.

### At what time the bean is created?

2 ways - **Eager Initialization** and **Lazy Initialization**.

### Eagerness.
Some beans are created when we start our application.
Example - Bean with Singleton Scope.

### Lazy.
Some beans are created lazily means when they actually needed.
Example - Beans with Prototype Scope or bean with @Lazy annotation.

### LifeCycle of Bean.

{{<figure src="/images/LifeCycleBean.png" alt="LifeCycleBean." caption="LifeCycle Bean.">}}
When the application starts it will start the IOC. IOC scans for the beans with `@Component` and `@Lazy` annotation.

{{<figure src="/images/SystemDesign/InvokingIOCContainer.png" alt="Invoking IOC Container." caption="Invoking IOC Container.">}}

`Initializing Spring Embedded WebApplicationContext` meaning invoking the IOC container.

When we make any singleton bean it will create the Bean. In this case the User bean will be created.
{{<figure src="/images/SystemDesign/InitializeSpring.png" alt="Initialize Spring." caption="Initialize Spring.">}}

**Inject the dependency** - Say one Bean is User and another is Order. User is single ton so created in the beginning and the Order is lazy. When will cteate the User it will craete teh Order.
```java
@Component
public class User{
    @Autowired
    Order order;
    
    public User(){
        System.out.println("Initializing user");
    }
}
```
```java
@Lazy
@Component
public class Order{
    public Order(){
        System.out.println("Lazy: initializing Order.");
    }
}
```
{{<figure src="/images/SystemDesign/InitializingUser.png" alt="Initializing User." caption="Initializing User">}}
`@Autowired` first looks for the bean of the required type.

If Bean found spring will inject it. Different was of the injection - **Constructor, Setter and Field Injection.**

If Bean is not found then spring will create one and then inject it.

`@PostContruct` when the bean is already creted.
```java
@Component
public class User{
    @Autowired
    Order order;
    
    @PostConstruct
    public void initialize(){
        System.out.println("Bean has benn constructed and dependencies has been injected.");
    }
    
    public User(){
        System.out.println("Initializing user");
    }
}
```
We can also add @PreDestroy annotation and it will work before the destroy of the bean.
