+++
title = 'Content'
date = 2025-03-16T12:38:14+05:30

url= "/post/systemdesign/content"
tags = ['interview','system design']
+++

System Design - Book 1 and 2 completely. All video - ByteByteGo, Jordan, Hello interview. Get practice leetcode discuss in lld and hld. Concept and coding LLD and github repo.

Design System.

Volume 1.  
Designer Rate Limiter.  
Design consistent hashing.  
Design a key value store.  
Design A unique ID generator in distributor system.  
Design A URL shortener.  
Design a web crawler.  
Design a notification system.  
Design news feed system.  
Design a chat system.  
Design a search auto complete system.  
Design YouTube.  
Design Google Drive.  

Volume 2.  
Design Google map.  
Design message queue.  
Design metrics monitoring and alerting system.  
Design at click events aggregator.  
Design hotel reservation system.  
Design distributed e-mail service system.  
Design S3 like object storage.  
Design real time gaming leaderboard system.  
Design payment system.  
Design digital wallet.  
Design Stock Exchange.  

Design Spotify.  

Design Uber.  
Design hotstar.  
Design top k YouTube videos.  
Design Redis.  

Hello Interview.  

Design a ticket booking system.  
Design a file storage system like Dropbox.  
Design a local delivery service like gopuff.  
Design Facebook news feed.  
Design a dating app like Tinder.  
Design A coding platform like leetcode.  
Design local business review site like Yelp.  
Design A fitness tracking app.  
Design an online auction platform.  
Design a Facebook live comment.  
Design Facebook post search.  
Design photo sharing app like Instagram.  
Design A collaborative document editor like Google Docs.  
Design A distributor job scheduler like air flow.  
Design a web crawler.  

Link.
Design Twitter.  
Design Amazon.  
Design Airbnb.  
Design food delivery app.  
Design tiktok.  
Design Reddit.  
Design code deployment system.  
Design notification service.  
Design notification service.  
Design distributed cache.  
Design a parking garage.  
Design a flight booking system.  
Design online code editor.


Design Recommendation System.  
Design Food delivery App.  
Design Note Taking Application.  
Design email service.  
Design weather forecasting application.  
Design file synchronization system.  
Design calendar application.  
Design a basic online quiz platform.  
Design user authentication system.  

Design distributed file system like Hadoop HDFS.  
Design CDN like Cloudflare.  
Design scalable search engine like Google.  
Design collaborative document editing like docs.  
Design a fault tolerant distributed database system.  
Design task scheduling system.


https://www.educative.io/blog/system-design-interview-questions

https://www.geeksforgeeks.org/most-commonly-asked-system-design-interview-problems-questions/

https://dev.to/somadevtoo/top-50-system-design-interview-questions-for-2024-5dbk

https://www.reddit.com/r/leetcode/comments/1aqw7vo/system_design_interview_coming_up_read_this/

https://igotanoffer.com/blogs/tech/system-design-interviews

https://www.linkedin.com/pulse/top-20-system-design-interview-questions-answers-soma-sharma-g0pqc/

System design of a ledger system. where they want to store all transactions done by multiple services. Db design entity design fields. in the entity services how the services will communicate with the entities. Api structure.

Design Bookmyshow lld and hld.
write in all the features. Design the table and the class. do the mapping one on one or one to many Do the DB design. It should follow the DB normalization. Do the api design. Then do the HLA.

Design a flight booking system. Start with hldra w the components justification for picking up those components. Db, message broker, Circuit Breaker. Sink flow, or a sink flow gateway. Proxy index stored. Db design data. modeling.

Designer calculator with basic functionalities that can store the last five operations and allow users to modify any stored operations.

Design Spotify.
api design schema design schema relation database and indexing.

Machine Coding Round.
Designed a task planner. different types of tasks are present. Bug feature story. Sprint, which is a collection of tasks. A person should be able to create a sprint, add a task in this print, change assignee or status of the task. Show all the task in the particular Sprint and the task assigned to the user.

Design a computer system with multiple level of cash. There are 311L1L2L3. We can add more or remove level if required. Each. cache has its distinct capacity, read time, write time and evictions. The cash should support two primary operations. Command behavior. Get. key. Start with the lowest tier. L1 If exist. then the value upward. If not found, then go to the deeper level. L2. set key. Check the lowest level. L1 If exists If not, add it there and proceed to deeper level If already in deeper level bounce back from there. Stats. average read time of last in operation. Average right time of last 10 operation. Free capacity and total eviction count.

Design a wallet system. requirement user need to register on Flipkart to use the wallet next time. The user can load money into his wallet via various sources like credit card or debit card
minimum amount of load money should be greater than zero. Assumption no need for integration from a source can be implemented just success acknowledged the user can send money to other user from his wallet. The minimum transaction should always be greater than zero. The user must have a sufficient balance in his wallet while doing the transaction. The user can fetch their wallet balance at any point of time. This should consider both credit and debit type of transaction the user can get transaction history based on. sort their all transaction history based on amount("amount"), Based on transaction date time.("time")
Filter transaction history based on sent or receive amount. Assumption consider single filter or sorted field.

### All Design Pattern.

| Creational Design Pattern |Uses|
|---------------------------|---|
| Singleton                 |Ensures the class has only one instance.|
| Factory                   |Creates objects without specifying the exact class.|
|Abstract Factory|Creates families of related objects.|
|Builder|Separates construction and representation of complex objects.|
|Prototype|Creates new objects by copying an existing object.|


|Structural Design pattern | Uses                                                 |
|---|------------------------------------------------------|
|Adapter (Wrapper)| Bridges incompatible interfaces.                     |
|Bridge| Separates abstraction from implementation.           |
|Composite| Composes objects into tree structures.               |
|Decorator| Adds new behavior to objects dynamically.            |
|Facade| Provides a simplified interface to a complex system. 
|Flyweight| Shares common parts to reduce memory usage.          |
|Proxy| Controls access to another object.                   |


| Behavioral Design Pattern   |Uses|
|-----------------------------|---|
| Chain of Responsibility |Passes requests along a chain of handlers.|
| Command                     |Encapsulates requests as objects.|
| Interpreter                 |Defines a grammar and interprets sentences.|
| Iterator                    |Sequentially accesses elements without exposing the structure.|
| Mediator                    |Centralizes communication between objects.|
| Memento                     |Captures and restores object states.|
| Observer (Pub-Sub)          |Notifies observers when state changes.|
| State                       |Manages state-specific behavior.|
| Strategy                    |Selects behavior at runtime.|
| Template Method             |Defines a skeleton of an algorithm with steps overridden by subclasses|
| Visitor                     |Adds new operations to existing object structures.|


Concurrency Patterns — Manage multi-threaded applications.  
Thread Pool — Limits the number of threads.  
Producer-Consumer — Separates data production and consumption.  
Read-Write Lock — Manages concurrent read/write access.  
Semaphore — Controls access to resources.  
Future/Promise — Handles results of asynchronous operations.  

### Architectural Patterns — High-level solutions for large systems.

**MVC (Model-View-Controller)** — Separates concerns into three components.  
**MVVM (Model-View-ViewModel)** — Similar to MVC but binds View and ViewModel.  
**Microservices** — Splits applications into loosely coupled services.  
**Service-Oriented Architecture (SOA)** — Organizes services for distributed systems.  
**Layered Architecture** — Organizes code into layers (UI, Business, Data).  
**Hexagonal (Ports and Adapters)** — Isolates core logic from external systems.  
**Event-Driven Architecture** — Reacts to events asynchronously.  
**Pipeline** — Breaks down processing into discrete stages.  

### Advanced Patterns — For complex distributed systems. 

**Saga** — Manages distributed transactions with compensating actions.  
**CQRS (Command Query Responsibility Segregation)** — Separates read and write models.  
**Event Sourcing** — Stores state as a sequence of events.  
**Circuit Breaker** — Prevents cascading failures in distributed systems.  
**API Gateway** — Central entry point for APIs in microservices.  
**Bulkhead** — Isolates failures by partitioning resources.  
**Outbox Pattern** — Ensures message delivery in distributed systems.  
**Retry Pattern** — Retries failed operations automatically.  
**Rate Limiting** — Controls request rate to prevent overload.  

**Choreography** — Decentralized flow where services react to events independently, enhancing scalability but making tracing harder.  
**Orchestration** — Centralized controller manages the workflow, simplifying error handling but creating a single point of control.  
**Compensating Transaction** — Rolls back completed operations when a failure occurs in a multi-step process, ensuring consistency in distributed systems.  
**Bulkhead Pattern** — Isolates service components to prevent failures from spreading across the system, improving resilience.  
**Outbox Pattern** — Ensures reliable event publishing by persisting events in the database as part of the local transaction, preventing message loss.  
**Strangler Pattern** — Incrementally replaces legacy system components with new services, enabling gradual modernization.  
**Process Manager** — Coordinates long-running business processes across multiple services, tracking each step and ensuring proper execution or rollback.  


Book - 1 and 2.   
General all video anddetail in main folder.  
Design Pattern - LLD and Pattern and LLD Example.  
Design Example - Practice Design Example.  
HLD - Topic learning.