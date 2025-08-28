+++
title = 'Introduction'
date = 2024-04-19T20:02:30+05:30
tags=["springBootCourse"]
+++


Transaction Management across Distributed System. 2 major patterns like the SAGA Pattern and the 2 phase commit.
Orchestration based implementation of the SAGA Pattern.

### What is Build System?
When we want to run the java file then we have use java compiler. In terminal `javac fileName.java` this will create a `fileName.class` file. Then we can run `java fileName` to execute the code.


When there is many file in the folder then even if we import and compile the other file the final file will not execute. As when we only create a folder it dows not means a java package.

Say there is one folder Introduction and inside that we have main class and another folder Implementation. 

Introduction
* Introduction
  * Main.java
  * Implementation
    * Helper.java

The Main.java file.
```java
import Implementation;
public class Main{
    public static void main(String args[]){
        Helper.getString();
    }
}
```
The Helper.java.
```java
public class Helper{
    public void getString(){
        System.out.println("Hello");
    }
}
```

In the terminal if we write `javac Main.java` and `javac Helper.java` and then we write `java Main` then it will not execute. Here the implementation is only a directory and a folder and it is not a java package.

We need to create a Java package.
When we use intellij then we get the build system like gradle and there we have a lot of folder structure like `org.example/Main.java` and any other folder even in this case if we compile individual file from terminal then also it will not work. 


In the build system they compile all the files and completes the structure where it checks for the file and compile then check for the other file that is dependent and then compile.
So we need a build system.

In build system we get the final executable file to build.
One build system can support multiple languages.

Build can take more time sometimes like 5 mins for the project. 
In labs team only the build takes 3 mins. Some inhouse builds system can be fast. Google has their own inhouse build system called `Bazel`. Bazel is fast as it has the cache system and when build once it stores some value in it.


Making a gradle project in the ide and then though cmd going to the folfer location and run command. `gradle build` or `gradlew build`.

{{<figure src="/images/Spring/Introduction/GradleBuild.png" alt="UserRequest." caption="Gradle Build.">}}

We can write the command `gradle jar` this will make a jar file in the `build/libs` folder. Jar is a simple zip java file and we can get all the code from the jar file.

When we write the command `java -jar build/libs/Introduction-1.0-SNAPSHOT.jar` then we will hget teh error no main manifest.

In the `build.gradle` we need to add manifest. In groovy we need to add the command.
```java
jar {
        manifest {
        attributes(
        'Class-Path': configurations.runtimeClasspath.files.collect { it.getName() }.join(' '),
        'Main-Class': 'org.example.Main' // take the package name from the top of the main file and add the file name.
        )
    }
}
```
{{<figure src="/images/Spring/Introduction/CreateJar.png" alt="UserRequest." caption="Create Jar.">}}

When we have one jar file we can see what is the code indide we can upload the jar file online like `decompile java file` *Decompile meaning converting the class file to the java file.*