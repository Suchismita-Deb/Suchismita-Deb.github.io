+++
title = 'Practice 2 Spring'
date = 2024-12-29T22:13:20+05:30

url = "/post/spring/interview/topic2/"
tag = ["spring", "interview question"]
+++
## What is Servlet?

A Servlet is a Java class used to process HTTP requests and generate HTTP responses in web applications. It runs on a web server (Servlet container) and acts as a middle layer that handles client requests, processes them, and sends back the response. Servlets provide the foundation for building dynamic web applications in Java. They are part of the Java EE (Enterprise Edition) specification.

The Servlet Lifecycle consists of four main phases:

**Loading and Instantiating** - The servlet is loaded by the web container when a request is received or when the server starts. The servlet class is instantiated by the container.  
**Initialization (init())** - The init() method is called once when the servlet is created. It is used for servlet initialization, such as reading configuration parameters or initializing resources (e.g., database connections).  
**Request Handling (service())** - The service() method is called for every request made to the servlet.
Based on the HTTP method (GET, POST, etc.), specific methods like doGet(), doPost(), doPut(), etc., are invoked to process the request.  
**Destruction (destroy())** - The destroy() method is called when the servlet is destroyed, typically when the servlet container shuts down. It is used to release resources and perform any necessary cleanup (e.g., closing database connections, file streams).

### Question 1. What is the pom file in maven apart form the dependencies.

In Maven, the POM file (Project Object Model) is the central configuration file (pom.xml) for a Maven project. Apart from managing dependencies, it provides the following functionalities:

**Project Information**

Defines basic metadata about the project. It includes:

**groupId**: A unique identifier for your organization or project (e.g., com.example).

**artifactId**: The project's name, which is usually the name of the generated JAR/WAR file (e.g., my-project).

**version**: Indicates the current version of your project. A typical format is major.minor.patch (e.g., 1.0.0).

These attributes help Maven identify your project uniquely within a repository.
```xml
<groupId>com.example</groupId>
<artifactId>my-project</artifactId>
<version>1.0.0</version>
<name>My Maven Project</name>
<description>A sample Maven project</description>
<url>https://example.com/my-project</url>
```
**Build Settings**

Customizes the build process.

**Source Directory**: Specifies where the source code is located (default: src/main/java).

**Resources**: Defines non-code files (e.g., configuration files) needed during the build.

**Plugins**: Enables customization of the build process by using Maven plugins, such as maven-compiler-plugin for setting Java version compatibility.

This ensures compatibility with Java 1.8 during compilation.
```xml
<build>
    <sourceDirectory>src/main/java</sourceDirectory>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```
**Repositories**.

Specifies custom or additional repositories for dependencies.

If your dependencies are not available in Maven Central, you can specify additional repositories to search for them. For instance, if  company has a private repository we can set it.
```xml
<repositories>
    <repository>
        <id>central</id>
        <url>https://repo.maven.apache.org/maven2</url>
    </repository>
</repositories>
```
**Plugin Management**.

Configures and manages Maven plugins. This section centralizes plugin configurations.

It defines plugin versions and settings so that they can be reused in the <build> section without redefining configurations each time.
```xml
<pluginManagement>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
        </plugin>
    </plugins>
</pluginManagement>
```
**Profiles**.

Defines profiles for environment-specific configurations.

You can activate a profile using the -P flag in Maven commands. Running `mvn clean install -Pproduction` activates the production profile.
```xml
<profiles>
    <profile>
        <id>development</id>
        <properties>
            <env>dev</env>
        </properties>
    </profile>
    <profile>
        <id>production</id>
        <properties>
            <env>prod</env>
        </properties>
    </profile>
</profiles>
```
**Properties**.

Declares reusable properties for the project. Properties are reusable variables that make your POM file cleaner and easier to manage. They can be used in various parts of the file with `${property-name}`.
```xml
<properties>
    <java.version>1.8</java.version>
    <encoding>UTF-8</encoding>
</properties>
```
**Parent POM**.

Inherits configuration from a parent project.
The parent tag allows a project to inherit configurations from a parent POM file. This is particularly useful in multi-module projects to centralize dependency and plugin configurations.

All child modules automatically inherit dependencies and plugins defined in the parent POM.
```xml
<parent>
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0.0</version>
</parent>
```
**Modules**.

Configures a multi-module project structure.
Modules define a multi-module project, where a parent POM can manage multiple sub-projects (modules). These modules are listed in the <modules> tag.
```xml
<modules>
    <module>module-one</module>
    <module>module-two</module>
</modules>
```
**Dependency Management**.

Manages and centralizes dependency versions. Dependencies defined here are not added to the build unless explicitly included in the `<dependencies>` section of the child POM. This ensures that all modules use the same version of spring-core.
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.10</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```
**Licenses and Developers**.

Includes project contributors and license details.
```xml
<developers>
    <developer>
        <id>john</id>
        <name>John Doe</name>
        <email>john@example.com</email>
    </developer>
</developers>
<licenses>
    <license>
        <name>Apache 2.0</name>
        <url>http://www.apache.org/licenses/LICENSE-2.0</url>
    </license>
</licenses>
```
**Reporting**.

Configures project reporting tools. Maven can generate project documentation using the <reporting> section, which specifies plugins that provide information about the project (e.g., code coverage, Javadocs).
```xml
<reporting>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-site-plugin</artifactId>
        </plugin>
    </plugins>
</reporting>
```
The POM file is a comprehensive configuration file that governs the project's lifecycle, build, and other settings. It centralizes everything needed for consistent builds and dependency management.