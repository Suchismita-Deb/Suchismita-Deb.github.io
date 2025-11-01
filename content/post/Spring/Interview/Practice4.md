+++
title = 'Practice 4 Spring'
date = 2024-12-29T22:13:20+05:30

url = "/post/spring/interview/topic4/"
tags = ["Spring", "interviewQuestion"]
+++
## Annotations.


### `@SpringBootApplication`.
A meta-annotation that combines three core Spring annotations - 
`@Configuration` - Marks the class as a source of bean definitions.

`@EnableAutoConfiguration` - Enables Spring Boot’s auto-configuration mechanism based on classpath settings, beans, and property configurations.

`@ComponentScan` - Enables component scanning so that Spring can discover and register beans in the application context.

🔍 Effect - It bootstraps the entire Spring Boot application.
### `@EnableRetry`  

Enables Spring Retry functionality.

🔍 Effect:

Allows methods annotated with @Retryable to be retried automatically on failure (e.g., transient network issues).

You can configure retry attempts, backoff policies, and exception types.

🧠 Use case: Retrying failed API calls, database operations, or message consumption in a resilient way.