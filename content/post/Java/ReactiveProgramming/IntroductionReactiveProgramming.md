+++
title = 'Introduction Reactive Programming'
date = 2023-12-20T21:30:05+05:30
+++



### Spring Reactive.

[comment]: <> (Java Brains and Java Techie Playlist)

Reactive Programming is a declarative programming paradigm concerned with data streams and propagation of change.
- Imperative means where we write everything.
- Declarative means we just say what we need and it is done by default.

Reactive Programming is not async programming. It can be synchronous.

Use cases of Reactive Programming.
- User Events. When user clicks on the button you execute some function. We react to the button click.
- I/O Interaction. When some output is given based on the input.

Event Driven Programming. Some function trigger when button click.
```java
@GetMapping("/users/{userId}")
public User getUserDetails(@PathVariable String userId){
    User user = userService.getUser(userId);
    UserPreferences prefs = userPreferenceService.getPreferences(userId);
    user.setPreferences(prefs);
    return user;
        }
```

In this code we are calling two methods and waiting for the first one to complete to start the next one. It is blocking. They are **Unnecessarily Sequential**.

The first thread will complete then the second thread will begin.

When web server gets a request it calls a thread. When it takes more time to respond to the request it means there are more threads. If we just call a thread and wait then it will increase the thread conuntand after a pointit cannot make new thread as it depends on hardware.




Reactive Programming with Spring Boot | A Beginner's Guide
