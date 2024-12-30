+++
title = 'Practice3'
date = 2024-12-29T22:13:34+05:30

url = "/post/spring/interview/topic3/"
tag = ["spring", "interview question"]
+++
## ApplicationContext in Spring.

ApplicationContext is the central interface in the Spring Framework for accessing the Spring IoC (Inversion of Control) container. It provides configuration information and manages the lifecycle of beans in the application.

### Key Feature.

**Bean Management** - Manages the life cycle of the bean(creation, initialization, destruction).  
Bean are created based on the configuration provided (XML, annotation, Java-based).

**Dependency Injection** - Automatically wires beans together using annotations like `@Autowired`, `@Qualifier`, and `@Resource`.

**Event Handling** - Supports event publishing and handling via listeners (ApplicationEvent and ApplicationListener).

**Environment Abstraction** - Provides access to environment properties (system properties, environment variables, and application properties).

**Built-in Context Hierarchies** - Supports parent-child contexts for modular applications.

### Types of ApplicationContext Implementations.

**AnnotationConfigApplicationContext** - For standalone applications with Java-based configuration (@Configuration classes).

**ClassPathXmlApplicationContext** - For XML-based configuration loaded from the classpath.

**WebApplicationContext** - Specialized for web applications.  In Spring Boot, AnnotationConfigApplicationContext is the default context.

### How ApplicationContext is Initialized in Spring Boot.

Spring Boot simplifies the initialization of the ApplicationContext through the SpringApplication.run() method. Internally it follows the steps.

**Bootstrap Phase** - Spring Boot starts by calling the SpringApplication.run() method. This method sets up the default configuration, environment, and logging.

**Create and Configure ApplicationContext** - Spring Boot creates an instance of ApplicationContext.

The specific type depends on the application  
`AnnotationConfigApplicationContext` for non-web applications.  
`AnnotationConfigServletWebServerApplicationContext` for web applications.

**Scan for Components** - Spring Boot scans the application for components, services, and configurations using annotations like @ComponentScan, @Component, @Service, and @Configuration.

**Load Properties** - Configuration properties are loaded from application.properties or application.yml.

**Register Beans** - Beans are registered in the context. This includes custom beans and framework-provided ones (like DataSource or JpaRepositories).

**Initialize Beans** - Beans are instantiated and their dependencies are injected. Post-processors like BeanPostProcessor and @PostConstruct methods are executed.

**Publish Application Events** - Events like ContextRefreshedEvent are published to allow beans to react to context initialization.

**Run Embedded Web Server** (For Web Applications) - If the application is a web application, Spring Boot starts an embedded web server (like Tomcat or Jetty) and initializes the web environment.

### Accessing the applicationContext.

```java
@Component
public class MyService {

    @Autowired
    private ApplicationContext applicationContext;

    public void listBeans() {
        String[] beanNames = applicationContext.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
```

In the main class file.

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(DemoApplication.class, args);
        String[] beanNames = context.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
```