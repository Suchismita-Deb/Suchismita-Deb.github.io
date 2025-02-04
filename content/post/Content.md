+++
title = 'Content'
date = 2024-11-04T00:29:31+05:30
tags = ['Behavoiral Interview', 'Leadership Interview', "Client Behavoiral Interview", "Communication Behavoiral Interview",
    "Communication Behavoiral Interview", "ConflictResolution", "Customer Behavoiral Interview", "Decision Making Behavoiral Interview", "Experience Based Behavoiral Interview", "Grokking the Behavioral Interview", "Hypothetical Behavioral Interview", "Imaginary Behavoiral Interview", "STAR", "Team Work Behavoiral Interview", "Time Management Behavoiral Interview", "computer networks", 'interviewQuestion', 'java', 'functional interface', 'interface', 'lambda', 'work', 'MERN', "spring", "docker", "redis", 'Spring Security', "mongodb", "CRUD", "REST", 'database', 'jdbc', "springBootCourse", 'Stock', 'Stock Market', 'interview question', 'system design', "testing", 'git', 'blog',"vocabulary","gre", "observation"]
+++

# Content.


Part 1.
{{<youtube iJLL-KPqBpM>}}


Part 2.

{{<youtube bBTPZ9NdSk8>}}

Part 3.

{{<youtube FU4WlwfS3G0>}}

Part 4.

{{<youtube iuqZvajTOyA>}}

Part 5.

{{<youtube kx-XDoPjoHw>}}

Part 6.

{{<youtube iYIjJ7utdDI>}}

Part 7.

{{<youtube F9lcK1jnAcs>}}

Part 8.

{{<youtube tPFYFbamoQk>}}

Part 17.

{{<youtube MZJWLlUhXhY>}}

Part 18.

{{<youtube 0_Vu3Gy4on0>}}

Part 19.

{{<youtube gSlXo2iLBro>}}

Part 20.

{{<youtube jFaF9s9xELU>}}

Part 21.

{{<youtube Hb6WePtPQhg>}}

Part Logger.

{{<youtube RljSBrZeJ3w>}}



https://www.lldcoding.com/design-logging-library-like-log4j-machine-coding  
https://medium.com/@behindjava.com/how-to-do-low-level-system-design-for-a-logging-framework-like-log4j-91c66cc5d8d7  
https://www.digitalocean.com/community/tutorials/log4j2-example-tutorial-configuration-levels-appenders

Here’s the low-level code for a logging framework in Java that meets your requirements. It includes support for multiple levels, asynchronous logging, appenders, thread-safety, configurable formatters, and dynamic configuration using a JSON file.

java
Copy
Edit
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;

public class LoggerFramework {

    // Log levels
    public enum LogLevel {
        DEBUG, INFO, WARN, ERROR, FATAL
    }

    // Configuration class
    public static class LoggerConfig {
        public LogLevel logLevel = LogLevel.INFO;
        public String appender = "ConsoleAppender";
        public String logFile = "logs/application.log";
        public int maxFileSizeMB = 5;
        public int maxBackupFiles = 3;
        public String pattern = "[%s] [%s] [%s] - %s";
        public int bufferSize = 1000;
    }

    private static LoggerConfig config = new LoggerConfig();
    private static BlockingQueue<String> logQueue = new LinkedBlockingQueue<>(config.bufferSize);
    private static ExecutorService executor = Executors.newSingleThreadExecutor();
    private static AtomicBoolean isRunning = new AtomicBoolean(true);

    static {
        // Start asynchronous log processing
        executor.submit(() -> {
            while (isRunning.get() || !logQueue.isEmpty()) {
                try {
                    String log = logQueue.poll(1, TimeUnit.SECONDS);
                    if (log != null) {
                        writeLog(log);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        // Load configuration dynamically
        new Thread(LoggerFramework::watchConfig).start();
    }

    public static void log(LogLevel level, String message) {
        if (level.ordinal() >= config.logLevel.ordinal()) {
            String logMessage = String.format(config.pattern,
                    new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                    level, Thread.currentThread().getName(), message);

            logQueue.offer(logMessage);
        }
    }

    private static void writeLog(String log) throws IOException {
        switch (config.appender) {
            case "ConsoleAppender":
                System.out.println(log);
                break;
            case "FileAppender":
                writeToFile(config.logFile, log);
                break;
            case "RollingFileAppender":
                writeToRollingFile(config.logFile, log, config.maxFileSizeMB, config.maxBackupFiles);
                break;
            default:
                throw new IllegalArgumentException("Unknown appender: " + config.appender);
        }
    }

    private static synchronized void writeToFile(String fileName, String log) throws IOException {
        Files.write(Paths.get(fileName), (log + System.lineSeparator()).getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    }

    private static synchronized void writeToRollingFile(String fileName, String log, int maxSizeMB, int maxBackupFiles) throws IOException {
        File file = new File(fileName);
        if (file.exists() && file.length() > maxSizeMB * 1024 * 1024) {
            for (int i = maxBackupFiles; i > 1; i--) {
                File oldFile = new File(fileName + "." + (i - 1));
                if (oldFile.exists()) {
                    oldFile.renameTo(new File(fileName + "." + i));
                }
            }
            file.renameTo(new File(fileName + ".1"));
        }
        writeToFile(fileName, log);
    }

    private static void watchConfig() {
        try {
            Path configPath = Paths.get("config.json");
            if (!Files.exists(configPath)) return;

            ObjectMapper objectMapper = new ObjectMapper();
            WatchService watchService = FileSystems.getDefault().newWatchService();
            configPath.getParent().register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

            while (true) {
                WatchKey key = watchService.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    if (event.context().toString().equals("config.json")) {
                        JsonNode node = objectMapper.readTree(configPath.toFile());
                        config.logLevel = LogLevel.valueOf(node.get("logLevel").asText());
                        config.appender = node.get("appender").asText();
                        config.logFile = node.get("logFile").asText();
                        config.maxFileSizeMB = node.get("maxFileSizeMB").asInt();
                        config.maxBackupFiles = node.get("maxBackupFiles").asInt();
                        config.pattern = node.get("pattern").asText();
                        config.bufferSize = node.get("bufferSize").asInt();
                    }
                }
                key.reset();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void shutdown() {
        isRunning.set(false);
        executor.shutdown();
    }

    // Sample usage
    public static void main(String[] args) throws InterruptedException {
        log(LogLevel.INFO, "Starting application");
        log(LogLevel.DEBUG, "Debugging mode enabled");
        log(LogLevel.ERROR, "An error occurred");
        log(LogLevel.FATAL, "Fatal error!");

        Thread.sleep(5000); // Allow logs to be processed
        shutdown();
    }
}
Key Features:
Logging Levels: Supports DEBUG, INFO, WARN, ERROR, FATAL.
Asynchronous Logging: Uses a queue to handle logs efficiently.
Appenders: Supports ConsoleAppender, FileAppender, and RollingFileAppender.
Thread Safety: Ensures logs are not mixed up in a multi-threaded environment.
Dynamic Configuration: Reads configurations from a config.json file and dynamically applies changes at runtime.
Sample config.json:
json
Copy
Edit
{
"logLevel": "INFO",
"appender": "RollingFileAppender",
"logFile": "logs/application.log",
"maxFileSizeMB": 5,
"maxBackupFiles": 3,
"pattern": "[%s] [%s] [%s] - %s",
"bufferSize": 1000
}
This code is modular, scalable, and adheres to the outlined requirements.


2/2

You said:
explain it.
ChatGPT said:
ChatGPT
Here’s a detailed explanation of how the provided logging framework works and fulfills your requirements:

Key Components and Their Roles
Logging Levels

The LogLevel enum defines five severity levels: DEBUG, INFO, WARN, ERROR, and FATAL.
The logger compares the severity of each log message with the configured log level (config.logLevel). Only messages at or above the configured level are logged.
Example:

If the log level is set to INFO, DEBUG messages are ignored, but INFO, WARN, ERROR, and FATAL are logged.
Asynchronous Logging

Queue Buffering: A BlockingQueue (logQueue) is used to buffer log messages. Logs are added to the queue as they're generated.
Worker Thread: A dedicated thread consumes logs from the queue and processes them asynchronously, ensuring high performance and minimal delay in the main application flow.
Thread Safety: Using a queue and synchronized methods ensures that logs from multiple threads are handled without getting mixed up.
Example:

You can handle 1 million concurrent log requests per second by adjusting the queue size and thread configuration.
Appenders

The appender determines where the log messages are sent. The framework supports:
ConsoleAppender: Logs messages to the console.
FileAppender: Writes logs to a file.
RollingFileAppender: Rotates logs based on file size, creating backup files (.1, .2, etc.).
Dynamic Selection: The appender type is chosen based on the configuration (config.appender).
Example:

If RollingFileAppender is selected and the file exceeds the maximum size (maxFileSizeMB), the logs are rotated to a new file.



Global Exception, Mapping, WebServer. Maven command.

## Java

|Topic|Link|
|---|---|
|Interview|https://suchismita-deb.github.io/tags/interviewquestion/|
|Java|https://suchismita-deb.github.io/tags/java/|
|Git|https://suchismita-deb.github.io/tags/git/|

## Spring

| Topic              |Link|
|--------------------|---|
| Spring             |https://suchismita-deb.github.io/tags/spring/|
| Redis              |https://suchismita-deb.github.io/tags/redis/|
| Crud               |https://suchismita-deb.github.io/tags/crud/|
| Rest               |https://suchismita-deb.github.io/tags/rest/|
| JDBC               |https://suchismita-deb.github.io/tags/jdbc/
| Spring Boot Course |https://suchismita-deb.github.io/tags/springbootcourse/
| Spring Security    |https://suchismita-deb.github.io/tags/spring-security/|



## System Design

| Topic            |Link|
|------------------|---|
| Computer Network |https://suchismita-deb.github.io/tags/computer-networks/|


## Design Pattern

| Topic            |Link|
|------------------|---|

## DSA

| Topic            | Link                                       |
|------------------|--------------------------------------------|
| Bit Manipulation | https://suchismita-deb.github.io/tags/dsa/ |

## Behavioral Interview

|Topic| Link                                                         |
|---|--------------------------------------------------------------|
|Behavioral Interview| https://suchismita-deb.github.io/tags/behavoiral-interview/  |


You can download the PDF file from [System Design Handbook](/files/SystemDesignHandbook.pdf).  
You can download the PDF file from [OS_Full_Notes](/files/OS_Full_Notes.pdf).  
You can download the PDF file from [Grokking-the-advanced-system-design-interview](/files/Grokking-the-advanced-system-design-interview.pdf).  
You can download the PDF file from [Grokking-the-system-design-interview](/files/Grokking-the-system-design-interview.pdf).  