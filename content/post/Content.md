+++
title = 'Content'
date = 2024-11-04T00:29:31+05:30
tags = ['Behavoiral Interview', 'Leadership Interview', "Client Behavoiral Interview", "Communication Behavoiral Interview",
    "Communication Behavoiral Interview", "ConflictResolution", "Customer Behavoiral Interview", "Decision Making Behavoiral Interview", "Experience Based Behavoiral Interview", "Grokking the Behavioral Interview", "Hypothetical Behavioral Interview", "Imaginary Behavoiral Interview", "STAR", "Team Work Behavoiral Interview", "Time Management Behavoiral Interview", "computer networks", 'interviewQuestion', 'java', 'functional interface', 'interface', 'lambda', 'work', 'MERN', "spring", "docker", "redis", 'Spring Security', "mongodb", "CRUD", "REST", 'database', 'jdbc', "springBootCourse", 'Stock', 'Stock Market', 'interview question', 'system design', "testing", 'git', 'blog',"vocabulary","gre", "observation"]
+++

# Content.


Part 1.
{{<youtube 4aYvLz4E1Ts>}}

Part 1.
{{<youtube QmX2NPkJTKg>}}

Part 2.
{{<youtube S2y9_XYOZsg>}}

Part3.
{{<youtube EpASu_1dUdE>}}

Part 4.
{{<youtube vNDz6jqtR40>}}

Part 5.
{{<youtube F9lcK1jnAcs>}}

Part 6.
{{<youtube 2811UT5r5Jk>}}

{{<youtube XMpchIp746s>}}

Part 7.

{{<youtube s9Qh9fWeOAk>}}

Design bulk file processing system.
Design promotional notification system.

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

You can download the PDF file from [System-design-interview-an-insiders-guide-volume2-1-100](/files/System-design-interview-an-insiders-guide-volume2_compressed-1-200-1-100.pdf).  
You can download the PDF file from [System-design-interview-an-insiders-guide-volume2-100-200](/files/System-design-interview-an-insiders-guide-volume2_compressed-1-200-100-200.pdf).  
You can download the PDF file from [System-design-interview-an-insiders-guide-volume2-201-427](/files/System-design-interview-an-insiders-guide-volume2_compressed-201-427.pdf).

You can download the PDF file from [Jonathan-Livingston-Seagull](/files/Jonathan-Livingston-Seagull.pdf).  
You can download the PDF file from [Deep Work_ Rules for focused success in a distracted world](/files/Deep_Work_Rules.pdf).  
You can download the PDF file from [Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_Final](/files/Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_Final.pdf).  
You can download the PDF file from [GM-The-Secret-LOA-Power-of-Intention-eBook](/files/GM-The-Secret-LOA-Power-of-Intention-eBook.pdf).  
You can download the PDF file from [How-To-Win-Friends](/files/How-To-Win-Friends.pdf).

|Company|YOE|Base|
|---|---|---|
|TOP Product Based|1 YOE|15 to 25.|  
|Medium Comapny|1 YOE|8 to 15.|  
|Top product Based|2YOE|20 to 35.
|Medium Company|2 YOE|12 to 22.
|Top Product Based|3 YOE|25 to 45.
|Medium Company|3 YOE|15 to 30.


System Design.
https://github.com/SweetCodey/system-design-masterclass/tree/main


```java
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureMockMvc
class ArtistApplicationTests {
@Autowired
private ArtistRepository artistRepository;
@Autowired
private MockMvc mockMvc;
private static final ObjectMapper om = new ObjectMapper();

    @BeforeEach
    public  void setup() {
        artistRepository.deleteAll();
    }

    private ArtistRequest createSamplePlayListRequest() {
        return new ArtistRequest(
                "Henry",
                "Kaldera"
        );
    }

    @Test
    void testCreatePlayList() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist actualRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);
        assertTrue(artistRepository.findById(actualRecord.getId()).isPresent());
    }

    @Test
    void testListOfTracks() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();

        for (int i = 0; i < 5; i++) {
            om.readValue(mockMvc.perform(post("/v1/artists")
                            .contentType("application/json")
                            .content(om.writeValueAsString(sampleArtistRequest)))
                    .andDo(print())
                    .andExpect(jsonPath("$.id", greaterThan(0)))
                    .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);
        }

        List<Artist> actualResult = om.readValue(mockMvc.perform(get("/v1/artists"))
                .andDo(print())
                .andExpect(jsonPath("$.*", isA(ArrayList.class)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString(), new TypeReference<List<Artist>>() {
        });

        assertEquals(5, actualResult.size());
    }

    @Test
    void testListOfTracksEmpty() throws Exception {
        mockMvc.perform(get("/v1/artists"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void testPlayListDeleteById() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist expectedRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);

        mockMvc.perform(delete("/v1/artists/" + expectedRecord.getId())
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isNoContent());

        assertFalse(artistRepository.findById(expectedRecord.getId()).isPresent());
    }

    @Test
    void testGetPlayListById() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist actualRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);

        Artist expectedRecord = om.readValue(mockMvc.perform(get("/v1/artists/" + actualRecord.getId())
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString(), Artist.class);

        assertTrack(actualRecord, expectedRecord);
    }

    @Test
    void testGetPlayListByID_NotFound() throws Exception {
        long nonExistentId = 999L;
        mockMvc.perform(get("/v1/artists/" + nonExistentId)
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }


    private void assertTrack(Artist actualRecord, Artist expectedRecord) {
        Assertions.assertTrue(new ReflectionEquals(actualRecord).matches(expectedRecord));
    }
}
```



"Grilled on OOPs
String concatenation
Operator precedence
memory model
multithreading
garbage collection
concurrent data structures
design patterns
simple questions on DBMS
HLD concepts
Springboot annotations.
Predict the output type of questions."

Difference between mutex and semaphore
What is sleep and wait in Java
Optimistic locking vs pessimistic locking
What is tomcat server?
How LSI and GSI work in dynamodb?
Why protobuf was used for serialization?
What protocol are we using to communicate?
How HTTPS works?

PayPal Interview Experience – Technical Round (3-4 Years Experience, 45 mins)

Core Java & Data Structures -
Explain the internal working of ConcurrentHashMap. How does it achieve thread safety, and what are its performance trade-offs?
Describe the differences between WeakHashMap and HashMap. When would you use each?
Given a large dataset (millions of records), how would you efficiently search for duplicate transactions?
How does the Java Memory Model impact multi-threaded applications?
Design an in-memory key-value store that supports TTL (time to live) for entries.

Multithreading & Concurrency
How would you design a thread pool from scratch?
Explain how Java handles false sharing in multi-core processors.
What are the main drawbacks of using synchronized methods? How does ReentrantLock improve performance?
Implement a multi-threaded rate limiter that handles API requests.
How would you handle thread starvation in high-throughput applications?

Spring Boot & Microservices
How does Spring Boot’s auto-configuration determine which beans to load?
What is Circuit Breaker, and how does it prevent cascading failures in microservices?
How would you handle blue-green deployments in a Spring Boot microservices setup?
Explain Eventual Consistency. How would you ensure data consistency across distributed services?
Implement a rate-limited API in Spring Boot that handles 10,000 requests per second.

APIs & RESTful Services
How would you design an API Gateway to handle dynamic routing and security policies?
Explain the challenges of handling pagination in REST APIs for massive datasets.
How would you manage API timeouts and retries in a distributed system?
What’s the best way to implement WebSockets in a fintech application?
How would you enforce idempotency in payment APIs?

System Design Basics
Design a high-throughput, low-latency order-matching system for a stock exchange.
How would you ensure data integrity in a multi-region database setup?
Explain Leader Election. How would you implement it in a microservices-based system?
What are the trade-offs between CQRS and traditional CRUD-based systems?
How does a Distributed Message Queue (like Kafka) handle backpressure?


Design a URL shortener (like Bit.ly).  
Design a distributed rate limiter.  
Design a key-value store (like Redis).  
Design a global notification system.  
Design a load balancer.  
Design a scalable search engine.  
Design a messaging queue (like Kafka).  
Design a sharding strategy for a database.  
Design an API Gateway.  
Design a real-time chat application (like WhatsApp).  
Design a distributed file storage system (like Google Drive).  
Design a content delivery network (CDN).  
Design a ride-sharing service (like Uber).  
Design a Youtube.  
Design a Amazon.  


Tic Tac Toe Game.  
Parking Lot.  
ATM.  
Snake Game.  
Loggin System.  
Hashmap Internals..  
Book My Show.  
Splitwise.  
Uber.  
Chess Game.  
File Systems.  
Message Queue.  
Inventory Management System.  
Calendar.  
Stack Overflow.  