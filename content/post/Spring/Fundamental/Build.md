+++
title = 'Build Learning.'
date = 2025-07-02T23:55:51+05:30

url= "/post/spring/fundamental/build"
tags = ['interviewQuestion', 'spring']
+++

### Build Workflow.

```bash
buildscript {
    repositories {
        maven {
            url = "https://nexus.cardinalhealth.net/repository/maven/"
        }
        mavenCentral()
        maven {
            url = "https://packages.confluent.io/maven"
        }
    }
}

plugins {
//    id "com.gorylenko.gradle-git-properties" version "2.5.0"
//    id "com.zoltu.application-agent" version "1.0.14" // QoL plugin for javaagent configuration
    id 'eclipse'
    id 'idea'
    id 'io.freefair.lombok' version '8.14'
    id 'io.spring.dependency-management' version '1.1.7'
    id 'jacoco'
    id 'java-library'
    id 'maven-publish'
    id 'org.springframework.boot' version '3.4.5' //'3.5.3'
    id 'pmd' // code quality tool
}

java {
    sourceCompatibility = '17'
}

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    maven {
        url = uri('https://nexus.cardinalhealth.net/repository/maven/')
    }
}

ext {
    set('mockitoVersion', "3.10.0")
    set('springCloudGcpVersion', '6.0.+')
    set('springCloudVersion', "2024.0.0")
}

sourceSets {
    integration {
        java.srcDir "$projectDir/src/integration/java"
        compileClasspath += sourceSets.test.runtimeClasspath
        runtimeClasspath += sourceSets.test.runtimeClasspath
    }
}

dependencies {
    implementation 'com.google.code.gson:gson:2.+'
    implementation 'com.jayway.jsonpath:json-path:2.9.0'
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0' // purely for the debug controller
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'org.springframework.kafka:spring-kafka'
    runtimeOnly 'org.postgresql:postgresql'

    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

    implementation 'com.zaxxer:HikariCP:6.0.0'
    implementation 'com.google.cloud.sql:postgres-socket-factory'
    implementation 'com.google.cloud:spring-cloud-gcp-starter'
    implementation ('com.google.cloud:spring-cloud-gcp-starter-sql-postgresql'){
        exclude group: 'org.postgresql'
    }
    compileOnly 'org.postgresql:postgresql:42.7.7'
    runtimeOnly 'org.postgresql:postgresql:42.7.7'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.kafka:spring-kafka-test'
    testRuntimeOnly "org.mockito:mockito-inline:${mockitoVersion}"

    // Provides annotation based getter,setter and constructors
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}

dependencyManagement {
    imports {
        mavenBom "com.google.cloud:spring-cloud-gcp-dependencies:${springCloudGcpVersion}"
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}

group = 'com.cardinalhealth.coredb-legacy'
version = '0.0.1-SNAPSHOT'
java.sourceCompatibility = JavaVersion.VERSION_17


test {
    useJUnitPlatform()
    finalizedBy jacocoTestReport
}

publishing {
    publications {
        maven(MavenPublication) {
            from(components.java)
        }
    }
}

tasks.withType(JavaCompile).configureEach {
    options.encoding = 'UTF-8'
}

jar {
    enabled = false
}

jacocoTestReport {
    dependsOn test
    reports {
        xml.required = true
        xml.outputLocation = layout.buildDirectory.file('reports/jacoco/test/jacocoTestReport.xml')
    }

    afterEvaluate {
        classDirectories.setFrom(files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                    "com/cardinal/eqms/kafka/pl/vendorconsumersvc/entity/**",
            ])
        }))
    }
}

plugins.withType(JacocoPlugin).configureEach {
    tasks.named("test") {
        finalizedBy 'jacocoTestReport'
    }
}
```


It installs the dependencies from the link and build the project.

### **Command to run in terminal.**

`_./gradlew clean build --refresh-dependencies_` - Install the dependencies.

`./gradle build` - Build the project.

`./gradlew dependencies` - It will show the list of the dependencies and also the internal dependency that are coming through other dependencies.

In the plugin{} block we can see multiple plugins and when the plugin not install then it gives plugin not found error we can use a fallback, you can use Lombok directly via dependencies. Similarly one fallback plugin is an option.

```groovy
dependencies {
    compileOnly 'org.projectlombok:lombok:1.18.32'
    annotationProcessor 'org.projectlombok:lombok:1.18.32'
}
```
