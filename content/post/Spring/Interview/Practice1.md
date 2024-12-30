+++
title = 'Practice Spring 1'
date = 2024-10-29T13:11:38+05:30

url = "/post/spring/interview/topic1/"
tag = ["spring", "interview question"]
+++
![Process.png](/images/Spring/Interview/Process.png)

## What is Spring Bean?

A Spring Bean is an object managed by the Spring IoC (Inversion of Control) container. In the Spring Framework, beans
are the backbone of your application, and they are created, configured, and assembled by the container.  
It is defined in a configuration file (XML, Java-based annotations, or Java Config) or discovered through component scanning.


A bean's lifecycle involves creation, initialization, use, and destruction, all managed by the Spring container.

The IoC container instantiates the bean from the bean’s definition in the XML file.
Spring then populates all of the properties using the dependency injection as specified in the bean definition.
The bean factory container calls setBeanName() which take the bean ID and the corresponding bean has to implement BeanNameAware interface.
The factory then calls setBeanFactory() by passing an instance of itself (if BeanFactoryAware interface is implemented in the bean).
If BeanPostProcessors is associated with a bean, then the preProcessBeforeInitialization() methods are invoked.
If an init-method is specified, then it will be called.
Lastly, postProcessAfterInitialization() methods will be called if there are any BeanPostProcessors associated with the bean that needs to be run post creation.

![img.png](../../../../images/Spring/Interview/BeanLifeCycle.png)

### Scope of Bean.
Beans can have different scopes that determine how and when they are created.
|Bean Scope|Function|
|---|---|
|Singleton (default) |Only one instance of the bean is created for the entire Spring container.|
|Prototype |A new instance is created every time the bean is requested.|
|Request |A new instance is created for each HTTP request (web applications).|
|Session |A new instance is created for each HTTP session (web applications).|
|Global Session |Scoped to a global HTTP session (portlet applications).|

Beans can be configured via.
XML configuration files.
Java-based configuration using @Configuration and @Bean annotations.
Annotation-based configuration using @Component, @Service, @Repository, and @Controller.

```java
@Component
public class MyBean {
    public void printMessage() { 
        System.out.println("Hello, Spring Bean!"); // Default is Singleton.
    }
}

```

```java
@Configuration
public class AppConfig {
    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}

```

```java
public static void main(String[] args) {
    ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
    MyBean bean = context.getBean(MyBean.class);
    bean.printMessage();
}

```

Spring beans support dependency injection, where their dependencies are injected by the container rather than instantiated directly. This promotes loose coupling and enhances testability.

### Advantages of Spring Bean.

|Feature|Purpose|
|---|---|
Centralized Management |Beans and their dependencies are managed by the container, ensuring consistent configuration and lifecycle management.
Decoupling |Promotes loose coupling through DI, making it easier to test and maintain.
Customization |Developers can customize bean behavior using annotations, initialization methods, and destruction callbacks.
Scalability |Supports different scopes to optimize memory usage and performance.
Integration |Seamless integration with other Spring features, such as AOP, Security, and Transactions.

Creating bean scope.

```java
@Configuration
public class AppConfig {

    @Bean
    @Scope("singleton")
    public MyBean singletonBean() {
        return new MyBean();
    }

    @Bean
    @Scope("prototype")
    public MyBean prototypeBean() {
        return new MyBean();
    }

    @Bean
    @Scope("request") // Only works in a web application
    public MyBean requestScopedBean() {
        return new MyBean();
    }

    @Bean
    @Scope("session") // Only works in a web application
    public MyBean sessionScopedBean() {
        return new MyBean();
    }

    @Bean
    @Scope("globalSession") // Only works in a portlet application
    public MyBean globalSessionScopedBean() {
        return new MyBean();
    }
}

// Testing Singleton and Prototype Scopes
public class ScopeDemo {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println("Testing Singleton Scope:");
        MyBean singleton1 = context.getBean("singletonBean", MyBean.class);
        MyBean singleton2 = context.getBean("singletonBean", MyBean.class);
        System.out.println("Are singleton beans same? " + (singleton1 == singleton2));

        System.out.println("\nTesting Prototype Scope:");
        MyBean prototype1 = context.getBean("prototypeBean", MyBean.class);
        MyBean prototype2 = context.getBean("prototypeBean", MyBean.class);
        System.out.println("Are prototype beans same? " + (prototype1 == prototype2));

        context.close();
    }
}
```

The output.
```java
Testing Singleton Scope:
MyBean instance created: com.example.MyBean@1d44bcfa
Are singleton beans same? true

Testing Prototype Scope:
MyBean instance created: com.example.MyBean@266474c2
MyBean instance created: com.example.MyBean@6f94fa3e
Are prototype beans same? false
```

## Why is the Spring Bean configuration file necessary?

The spring Bean Configuration file is XML file. It is the fundamental to how the Spring Framework operates because it provides metadata about the application’s beans and their relationships. This file serves as the blueprint for the IoC (Inversion of Control) Container, allowing Spring to manage bean creation, wiring, and lifecycle effectively.

## Inner Bean.

Inner Beans are beans defined within the <bean> tag of another bean in a Spring configuration file. They are used to encapsulate dependency details when a bean is used as a property or dependency of another bean, and the inner bean is not intended to be shared across the container.

### Important points of Inner Bean.

|Feature|Purpose|
|---|---|
Defined Inside Parent Beans | Inner beans are created within the <property> or <constructor-arg> tag of another bean. They do not have an id or name.
Not Accessible by Other Beans | Inner beans are anonymous and can only be used within the parent bean they are defined in. They cannot be reused elsewhere in the Spring container.
Lifecycle | The lifecycle of an inner bean is tied to the lifecycle of the parent bean. When the parent bean is destroyed, the inner bean is also destroyed.
Encapsulation | Inner beans encapsulate dependency details and keep the configuration concise for single-use beans.

```xml
<bean id="outerBean" class="com.example.OuterBean">
    <property name="innerBean">
        <bean class="com.example.InnerBean">
            <property name="value" value="Hello, Inner Bean!" />
        </bean>
    </property>
</bean>

```
`outerBean` depends on innerBean. The `innerBean` is defined inside the property tag of outerBean.

## What is Autowiring in Spring?

Autowiring is a feature in the Spring Framework that enables the automatic injection of dependencies into a bean. Instead of explicitly configuring the dependencies in a Spring configuration file, the container automatically resolves and injects them based on a specified strategy.

**Uses**.

**Reduces Boilerplate Code** - Eliminates the need to manually specify bean dependencies.  
**Simplifies Configuration** - Container automatically manages relationships between beans.  
**Improves Readability** - Makes the code cleaner and easier to maintain.

Types of Autowiring Modes.

**no (Default)**  
No autowiring is performed. Dependencies must be explicitly defined using property or constructor-arg.
```xml
<bean id="userService" class="com.example.UserService">
<property name="userRepository" ref="userRepository" />
</bean>
```
**byName**  
Autowires a bean by matching its property name with a bean name in the configuration.
```xml
<bean id="userService" class="com.example.UserService" autowire="byName" />
<bean id="userRepository" class="com.example.UserRepository" />
```
**byType**  
Autowires a bean if a single bean of the matching type exists in the container.
```xml
<bean id="userService" class="com.example.UserService" autowire="byType" />
<bean id="userRepository" class="com.example.UserRepository" />
```
**constructor**  
Autowires dependencies by matching constructor parameters with bean types in the container.
```xml
<bean id="userService" class="com.example.UserService" autowire="constructor" />
<bean id="userRepository" class="com.example.UserRepository" />
```
**autodetect (Deprecated in Spring 4.3)**  
Spring attempts to autowire using constructor. If that fails, it falls back to byType

Modern Spring applications prefer annotations over XML for autowiring.

`@Autowired` - Automatically injects the required bean by type.  
`@Qualifier` - Resolves conflicts when multiple beans of the same type exist by specifying the bean name.  
`@Primary` - Marks a bean as the primary candidate for autowiring when multiple beans of the same type exist.

Tradeoffs of Autowiring.  

**Ambiguities** - Can cause issues when multiple beans of the same type exist.  
**Hidden Dependencies** - Makes it harder to track bean relationships.  
**Testing Challenges** - Autowired dependencies may complicate unit testing.  

## What is Bean Factory?

The BeanFactory is the fundamental interface in the Spring Framework that provides the basic support for managing and instantiating beans. It is the core of Spring's Inversion of Control (IoC) container.

While modern applications typically use the ApplicationContext, the BeanFactory remains the foundation of all Spring IoC containers.

|Feature|Purpose|
|---|---|
Core Container Interface | Manages the lifecycle and configuration of beans. Creates beans on demand, ensuring efficient memory usage.
Lazy Initialization | Beans are created only when they are requested, unlike ApplicationContext, which initializes beans during container startup.
Supports Dependency Injection | Facilitates setter injection, constructor injection, and autowiring.
Lightweight | Ideal for scenarios where memory and startup time are critical.