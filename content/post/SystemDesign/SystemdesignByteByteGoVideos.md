+++
title = 'System Design ByteByteGo Videos.'
date = 2025-07-12T19:59:08+05:30
url= "/post/systemDesign/SystemdesignByteByteGoVideos"
tags = ['interview question', 'system design']
+++

### What happens when you type a URL into a browser?

### Why Kafka is fast?

Kafka is designed for high throughput and it is designed to process large amount of message in a short amount of time.

Design decisions helps Kafka to move large amount of data quickly.

Kafka follows **Sequential IO -** There is a misconception that disk operation is slow compared to memory access. 

It depends on the data access pattern. There are 2 types of disk access patterns - random and sequential.

In hard drives it takes time to physically move the arm to different location on the magnetic disk. It makes the random access slow.

In sequential it gets the data one after the other and it fast.

Kafka takes the advantage of sequential access and using the append only log.

Kafka move data from network to disk and it removes copy. It follows the zero copy principle. 

Kafka send data to the consumer - Data is loaded from disk to the OS cache. Data copied from OS cache into Kafka application. Data copied from Kafka to the socket buffer and from socket buffer to the Network Interface Card NIC buffer. The data is send over the network to the consumer.

{{<figure src="/images/SystemDesign/ReadWithZeroCopy.png" alt="EventStreaming without zero copy." caption="EventStreaming without zero copy.">}}

There are total of 4 copy of data and 2 system calls. Not efficient.

Kafka with zero copy.

The data page id loaded from the disk to the OS cache. With zero copy Kafka uses the system call called `sendfile()` to tell the OS to copy the data from the OS cache to the NIC buffer.


{{<figure src="/images/SystemDesign/ReadWithZeroCopy.png" alt="EventStreaming without zero copy." caption="Kafka with zero copy.">}}

In the process the only copy is from the OS cache to the NIC buffer. 

In the modern network card it is done by DMA - Direct Memory Access. DMA used and CPU is not involved and the process is efficient.

Sequential IO and DMA and zero copy principle are the corner stone of the Kafka high performance.

### How to store password in the database.

Password is not stored in plain text anyone having the database access can easily read the password. 

Open Web Application Security Project - OWASP provides some guidelines on how to store password. 

Using modern Hashing function. It is one way it is impossible to decrypt hash.

There are some common legacy hashing function like MD5, SHA-1 are fast. They are less secure and should not be used.

Another way - SALT the password meaning add a unique random generated string in each password as a part of hashing process. Attackers will access the password using a technique called rainbow tables and database locks hacker can crack the password in seconds.

Password provided by the user and then added a randomly generated salt and then you make a hash function and value of this entire thing. The hash is stored in the database along with the salt.

### Bare Metal, Virtual Machines and Container.

{{<figure src="/images/SystemDesign/BareMetalVirtualizedContainerized.png" alt="EventStreaming without zero copy." caption="Bare Metal Virtualized Containerized.">}}

Bare metal server is a computer that is a single tenant only. Bare metal gives all the hardware resources and the software to run. Bare metal server are physically isolated and the isolation helps in not getting impacted by one network bandwidth with the other high CPU use.

Bare metal is expensive hard to manage hard to scale.

Virtual machine is an emulation of a physical computer. Virtual machine run on a single piece of a bare metal hardware On top of that there is the host operating system and on top of that there is a special software known as the hypervisor.

Hypervisor monitors the virtual machine it creates a layer over the hardware so that multiple operating system can run along side each other. Each virtual machine has its own guest OS. On top of the operating system runs the application.

Bare Metal Hypervisor is different that Bare Metal Hardware.

Bare metal hypervisor controls the hardware directly with relying on the host operating system. It gives the hypervisor full control over the hardware and provide high performance.

{{<figure src="/images/SystemDesign/Virtualized.png" alt="Virtualized" caption="Virtualized.">}}

Hardware that supports Bare metal hypervisor are expensive.

Virtual machines are cheaper to run and share the same hardware allowing much high resource utilization.

Virtual machine is vulnerable for the noisy neighbor problem where one system and application will get impacted by other system being using 100% CPU or 95% network bandwidth. Virtual machine running on the same bare metal hardware shares the same physical cpu core which makes it vulnerable for any attacks.

Container is a lightweight and standalone application with all its dependencies. Continuation is a lightweight version of virtualization. 

Here there is a bare metal hardware with a host operating system But instead of virtualizing the hardware with the hypervisor like in virtualization we virtualize the OS with a special software called the container engine. On top of this container engine they run the container which is an individual applications isolated from each other.

Containers is scalable and portable and there are lightweight to run on the virtual machine. A Bare Metal server can hold more Containers than virtual machines. Containers are easy to deploy.

They share the same underlying operating system and the isolation are the operating system level. Containers are exposed to wider class of security vulnerability.

{{<figure src="/images/SystemDesign/ContainerOnVirtualMachines.png" alt="ContainerOnVirtualMachines" caption="Container On Virtual Machines.">}}

We can run containers inside the Virtual machine and it will increase the security.

After container there is the serverless and edge computing. The server less architecture using the GCP AWS.

### Design a location Based System - Yelp.

Designing a proximity service meaning designing the best restaurant nearby or mapping to the closest gas station.

Functional requirement. 

Given a user location in the search radius as input. Return all businesses within the search radius.

Business owner can add delete update a business. The changes doesnt need to be real time it can appear after one day.

User can view the details of the businesses in that page.

Non-functional requirement.

DAU - 100M.

Business - 200M.

The latency should be low users should be able to find the nearby businesses quickly.

The services should be highly available it should be able to handle traffic spikes during peak hours.

**Assumptions.**

DAU - 100M.

Business - 200M.

The daily active users are making around 5 queries per day.

100 Million DAU * 5 searches per user /100000 seconds in a day = ~5000.

The database storage needed to store 200 million of data to estimate that we need to understand the schema design.

**High-Level Design.**

API design - Restful.

There were two broad api categories one to search the nearby businesses and one to get the details of the business.

GET /v1/search/nearby

|Field|Description|Type|
|—-|—-|—-|
|latitude|Latitude of a given location.|double.|
|longitude|Longitude of a given location.|double.|
|radius|Optional. Default is 5000 meters (about 3 miles)|int|

```json
{
"total": 10,
"business": [{business object}]
}
```

We have shorten the api and can include pagination.

API to manage the business object.

GET /v1/businesses/:id Return detailed information about the business.

POST /v1/businesses Add a business.

PUT /v1/businesses/:id Update details of a business.

DELETE /v1/businesses/:id Delete a business.

{{<figure src="/images/SystemDesign/YelpDbDesign.png" alt="YelpDbDesign" caption="YelpDbDesign.">}}

The store required for the business table - 

200 Million business * 1 KB = 200 * 10^6 * 1KB = 200GB.

The storage required for the nearby search table - 200 million * 24 bytes = ~ 5GB.

This database is very small so when the database is small then we can have wide variety of design and also we can use in memory database as well.

High Level Design.

{{<figure src="/images/SystemDesign/YelpHighLevelDesign.png" alt="YelpHighLevelDesign" caption="Yelp High Level Design.">}}

The load balance distributes incoming traffic across two services based on the api routes.

Boat services are stateless deploying stateless services behind a load balancer is a common design. 

Company can use other setup to distribute traffic to services it could be envoy in a kubernetes cluster or API gateway on AWS.

The location based service has few characteristics - 

Read heavy with no write request at all.

The QPS is high 5000 qps was our earlier estimate.

Service is stateless. It should be easy to scale horizontally.

The business service manages the business details and the qps of the update is not high.

In the recruitment we have understood the changes can reflect after sometime.

The read will be high and the qps is going to be high during peak hours. The data will not be changed frequently so it can be easily cache.

The system is read heavy. 

Read qps is much higher than the writes qps.

The writes don't need to be immediate. 

On this observation we can say that the database cluster can be used with the primary secondary setup.

The primary database will be handling all the right requests and the read replica handles the heavy read request.

Twitter will be first stored into the primary and then it will be replicated to the other database there can be a bit of delay in the updated and consistent data but again the changes does not need to be reflected in real time.

Design Deep Dive.

Database to do the location based search - Geospatial database store and query data in geometric space like location data. Some example of these type of data are Redis GEOHASH and Postgres PostGIS extension.

Understanding how the db works - discuss the common algorithm behind the geospatial index that powers the database.

Intuitive and inefficient way - Draw a circle and find the businesses within the circle.

```sql
SELECT business_id, longitude, latitude 
FROM business 
WHERE (latitude 
BETWEEN {:my_lat} - radius AND {:my_lat} + radius) 
AND 
(longitude BETWEEN {:my_long} - radius AND (:my_long} + radius)
```

The query is not efficient and it search in 200M data.

One way to index the latitude and longitude. Data returned for each dimension is huge. We can retrieve all businesses within a latitude range or longitude range.

To fetch businesses within a search radius we need to find the intersection of those ranges. It is inefficient and each dataset contains a lot of data.

{{<figure src="/images/SystemDesign/YelpGraphDesign.png" alt="YelpGraphDesign." caption="Yelp Graph Design.">}}

The problem with this approach is the index can increase the search in one of the two dimensions.

The follow up is can we map two dimension data into one dimension so we can build a single index on it.

There are 2 approaches in Geospatial indexing - Hash.

{{<figure src="/images/SystemDesign/Index.png" alt="Index." caption="Index.">}}

One way - evenly divide the grid and get the business within the grid. The problem is in few area the return of the businesses will be high and in few areas the business are low.

{{<figure src="/images/SystemDesign/GeoHash.png" alt="GeoHash." caption="GeoHash.">}}

Geohash helps as it stores the two dimensional data into an one-dimensional string of letters and digits. It divides in four quadrant along the prime meridian and equator. Four quadrants are represented by two bits.

{{<figure src="/images/SystemDesign/GeoHashQuadrant.png" alt="GeoHashQuadrant." caption="GeoHashQuadrant.">}}

Each part is again divided into grids. The bits in the sub-grids are appended to the existing bits.

{{<figure src="/images/SystemDesign/GeoHashQuadrantPicture.png" alt="GeoHashQuadrantPicture." caption="Geo Hash Quadrant Picture.">}}

It repeats the subdivision and keeps adding more bits to the Geohash. It stopped the subdividing when the sub grid reaches the specific size.

{{<figure src="/images/SystemDesign/GeoHashBinary.png" alt="GeoHashBinary." caption="Geo Hash Binary.">}}

The example of a grid that contains the Google headquarter Institute of a long one and zero to represent the Jio hash design coded in a base 32 string.

{{<figure src="/images/SystemDesign/GeoHashChart.png" alt="GeoHashChart." caption="Geo Hash Chart.">}}

The base32 string shows the size of the grid the idle size should be 4 5 or 6. If the value is higher than 6 then the grid size is too small and if it is less than 4 then the grid size is too big.

**How do we choose the right precision given a search radius?**

We find the minimal geohash length that covers the whole circle. For example if the radius is 2 km the Geohash length should be 5.

Another property Geohash is a string and searching all business within a geohash is very simple.

{{<figure src="/images/SystemDesign/GeoHashPrefix.png" alt="GeoHashPrefix." caption="GeoHashPrefix.">}}

There are some cases when did you hash might not work properly. These edge cases have to do with how the boundaries are handled. 

When two geohash strings share a long prefix we know they are close. The grid 9q8zn shares the same prefix.

The reverse is not true. Two places could be right next to each other but have no shared prefix a the grid on the either side of the equator or the prime meridian are in different halves of the world. Example two cities in France can be nearby but they are not sharing any common prefix.

Another boundary issue can be the two locations can have long shared prefix but they are in different geohash.

The common solution to bowl of these issues to fetch businesses is not only within the current date but also 8 grids surrounding it.

{{<figure src="/images/SystemDesign/CalculateGeoHash.png" alt="Calculate Geo Hash." caption="Calculate Geo Hash.">}}

Calculating the neighboring geohash is easy and done in constant time using the library.

**Implementing the location best service using a tree based indexing.**

The common tree index is quadtree and googles2.

**QuadTree.**

A Quadtree data structure that partition a two dimensional space by recursively subdividing it into 4 quadrants.

{{<figure src="/images/SystemDesign/QuadTree.png" alt="QuadTree." caption="QuadTree.">}}

The subdivision stops when the greet meets certain criteria.

{{<figure src="/images/SystemDesign/QuadTreeLevel.png" alt="QuadTreeLevel" caption="QuadTreeLevel.">}}

In out case the criteria can be keep dividing unto the number of businesses in a great his no more than similar say 100.

A keyboard for Quadtree or any other tree-base index is that it is an in memory data structure and not a database solution.

It means that the index is built by our own code and runs on the location-based servers.

We use the Geohash as the geospatial index to speed up the location search.

**How do we structure the geospatial_index table?**

It should contains two columns - geohash and business Id. Any relational db can handle geohash. The Geohash column contains the geohash of the right precision for each business.

Converting the latitude and longitude to the geohash is easy and libraries can do it.

{{<figure src="/images/SystemDesign/GeoHashBusinessId.png" alt="GeoHashBusinessId" caption="GeoHashBusinessId.">}}

Two things we should discuss with the table schema - Many business would share the same geohash. It means different business Ids within the same Geohash are stored in different database rows. The geohash and business id columns together form a compound key. 

With the compound key, it makes the removal of a business from the table efficient.

In our application we are only interested in the geohash with precisions 4 to 6. They correspond to different search radii from 0.5km to 20 km.

The geohash column will all have the precision of 6. We use the LIKE operator in SQL to search for shorter prefix length.

{{<figure src="/images/SystemDesign/Query.png" alt="Query." caption="Query.">}}

Using the query we find everything that is within the geohash of ‘9q8zn’.

**Scale the geospatial index table.**

We do not need to scale more than one db table. The column geohash is 6 bit long and business_id is 64 bit like 8 bytes. We can also store the latitude and longitude so it is easy to calculate the distance of each business from the user and its about 16 bytes. Each row is 30 bytes.

200 million business the data is 6GB.

{{<figure src="/images/SystemDesign/Storage.png" alt="Storage." caption="Storage.">}}

The database can be fit inside one server the read QPS is 5000 which is quite high.

The single db not have enough CPI or network bandwidth to handle all the read request.

Increase the speed of read there are two ways - Read replica or sharding.

Sharding is complex. It requires sharding logic in application layer. In the application entire database can be in a single machine there is no reason to use shard.

The better approaches to use the read replica of the geospatial_index table to help the read load. 

**Do we need a caching model in our design?**

Our workload is read heavy and the Geospatial data set is small.

The read performance is bottlenecked then we can use read replicas.

There is another dataset to design - business table.

The data set for the business table with 200 million businesses is in terabyte range. Modern hardware can perform it. The dataset size is on the borderline where sharding might make sense.

The update rate is low and the db is read heavy. We should be able to get away without sharding if we put a cache in front of it.

The cache will take most of the read load of the frequently accessed businesses and it should give the business table quite a bit of headroom to grow.

There are a lot of options for the business table and first one is to use single table and get the product grows and with the help monitoring we can react to the growth and usage pattern and decide later to either shard or add more read replicas or add cache in front of it.

{{<figure src="/images/SystemDesign/YelpHighLevelDesign.png" alt="YelpHighLevelDesign." caption="Yelp High Level Design.">}}

Search workflow.

Bob tries to find the restaurant within 500 meters. The client sends the location and search radius to the load balancer.

The load balancer forward the request to the location based service.

Based on the location and search radius, the service finds the Geohashes precision that matches the search request.

500 meter maps to the geohash length of 6.

This service calculates the neighbouring Geohash. There will be a total of 9 Geohash to query against the geospatial index table.

The service sends a query to the database to fetch the business ids and the latitude and longitude pairs within those geohashes.

The service uses the latitude and longitude pair to calculate the distance between the user and the businesses and rank it and return the business to the client

### UPI scan and pay.

### Consistent Hashing.

Data distributed across multiple server and it is horizontal scaling. 

Data should be evenly distributed in the server and can be done by hash function.

ServerIndex = hash(key) % N. N number of server. 

Hash function return same value for the same key. When the number of server is same the hash function will return the same value for the key.

When the number of server change like the reduced or increased then the data stored in the server is arranged to other server. The new hash function will return new value.

Consistent Hashing main purpose is all object to stay assigned to the same server even as the number of object changes. Hashing the object key and also the server name. The object and the server name are used into the same hashing function to the same range of values.

There is an array of x0 to xN and it is a hash range and the end of the array are connected making a circle.

{{<figure src="/images/SystemDesign/ConsistentHashing.png" alt="ConsistentHashing." caption="ConsistentHashing.">}}

The hash is used to map the data into the ring. The modulo is not used.

To locate the server for a particular object we go clock wise from the location of the object in the ring until a server is found.

k0 to s0, k1 to s1.

Another server added then only k0 will be mapped to s4. The other key are in their place.

{{<figure src="/images/SystemDesign/AddingServer.png" alt="AddingServer." caption="Adding Server.">}}

With simple hashing when a new server is added almost all keys need to be remapped. With consistent hashing adding a new server only requires redistribution of a fraction of the key.

Drawbacks - When all server in a same place then all data will come to the same server.

When one server removed then the entire load come to the next server.

Virtual node helps in it and one server present multiple location in the ring. Each location represents the server in the ring. 

{{<figure src="/images/SystemDesign/VirtualNode.png" alt="VirtualNode." caption="Virtual Node.">}}

The virtual node will be managed by the s0 and s1.

More virtual node the data is more balanced.

More virtual node meaning more storage to store the metadata of the virtual node.

NoSQL db like Amazon Dynamo DB and Apache Cassandra uses consistent hashing for the data partitions.

CDN uses Consistent Hashing to distribute the web content evenly among the server.

Load Balancer like Google Load Balancer use Consistent hashing to distribute persistent connections evenly.

### Why Redis fast?

Reddit is a very popular in memory database.

{{<figure src="/images/SystemDesign/RedisUsesRAM.png" alt="RedisUsesRAM." caption="Redis Uses RAM.">}}

Redis uses RAM and not disk.

{{<figure src="/images/SystemDesign/MemoryAccessFasterThanIO.png" alt="Query." caption="Memory access is faster than Random disk IO.">}}

Memory access is faster than Random disk IO.

Pure memory gives the axis of high read and write throughput and low latency and the trade off is the data set cannot be larger than memory.

Code wise in memory data structure is far more easy to implement than on disk.

{{<figure src="/images/SystemDesign/InMemoryOnDisk.png" alt="InMemoryOnDisk." caption="InMemory On Disk.">}}

Another reason Redis is fast because it is single threaded.

{{<figure src="/images/SystemDesign/SingleThreadedMultithreaded.png" alt="SingleThreadedMultithreaded." caption="Single Threaded Multithreaded.">}}

Multi threaded application requires locks and other synchronisation mechanism.

**How does single threaded code base handle thousands of requests incoming and outgoing ? Won’t the thread gets block waiting for each request to get complete individually?**

{{<figure src="/images/SystemDesign/IoMultiplexingSingleThreadedReadWrite.png" alt="Query." caption="IoMultiplexingSingleThreadedReadWrite.">}}

It's the male function of the IO multiplexing. In multiplexing operating system allows a single thread to wait on many sockets.

On Linux the Epoll is a performant variant of IO multiplexing that support thousands of connection in constant time.

One drawback of the single threaded design is that it does not leverage all the CPU course available into this modern hardware system.

Another reason of red is being fast is that it can use the low level data structure like linked list, HashTable and Skiplist without being thinking about how to persist them to the disk efficiently. 

{{<figure src="/images/SystemDesign/EffectiveDataStructure.png" alt="EffectiveDataStructure." caption="Effective Data Structure.">}}

### HTTP1 HTTP2 HTTP3.

HTTP1.

Every request to the same server requires a separate tcp connection.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Http1.png" alt="Http1." caption="Http1.">}}

HTTP 1.1

Followed the same TCP connection. It follows the “keep-alive”  mechanism and reuse the same tcp connection so that the connection can be used for more than a single request.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Http1.1.png" alt="Http1.1." caption="Http1.1.">}}

HTTP 1 .1 allowed the HTTP pipelining. It allows client to send multiple request before waiting for each response.

The response must be received in same order as it is send. It was tricky to maintain and the support removed from many servers.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/NoPipeliningPipelining.png" alt="NoPipeliningPipelining." caption="NoPipeliningPipelining.">}}

When one packet lost all subsequent request are impacted.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Pipelining.png" alt="Pipelining." caption="Pipelining.">}}

HTTP 2 each comes in stream. It solves the Head of line issue in the application layer but the issue still exists in the Transport layer.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Http2.png" alt="Http2." caption="Http2.">}}

HTTP 2 introduces the PUSH capability to the server when the client new data is available without the client to poll.

HTTP 3 uses QUIC protocol in the transport and not the TCP. It is based on UDP and consider stream as the first class citizen.

QUIC stream shares the same quic connection so no handshake required. It delivers independently and packet loss will not effect others.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Http.png" alt="Http." caption="Http.">}}

The QUIC uses the Connection Id and the connection to move from the IP address and network quickly.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/ClientServer.png" alt="ClientServer." caption="ClientServer.">}}

### What is REST API.

### NOSQL LSM Tree.

NoSQL Database like Cassandra became very popular. The secret sauce for the NoSQL Db is the Log Structure Merge Tree.

LSM Tree is optimized for fast write.

**How data is store in a relational Database.**

In relational database cities generally done by B Tree and B Tree is optimized for reads.

Updating the B Tree relative to expensive as it involves random IO and include updating multiple pages on disk. It limit how fast a B Tree can ingest data.

LSM works differently, writes are batched in memory as they arrive in a structure called a memtable. A memtable is ordered by object key and is usually implemented as a balanced binary tree.

As a memtable reaches a certain size it is flushed to disk as an immutable Sorted String Table.

An SSTable store the key value pair in a sorted sequence. The write are all sequential IO. Fast on any storage media. 

The new SSTable becomes the most recent segment of the LSM tree as more data comes in more and more of this immutable SSTable are created and added to the LSM tree. Each one representing a small chronological subset of the incoming changes.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/SSTable.png" alt="SSTable." caption="SSTable.">}}

Since SSTable is immutable and update to an existing object key does not overwrite an existing SSTable.

Instead a new entry is added to the most recent SSTable which supersede any entries in the old access table for the objective. 

Deleting an object in SSTable we cannot mark anything in the sustainable as deleted. To perform a delete it adds a marker called a tombstone to the most recent SSTable for the object key.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/DeletingSSTable.png" alt="DeletingSSTable." caption="DeletingSSTable.">}}

When we get the tombstone on read we known that the object has been deleted. It is a bit unintuitive that a delete takes up extra space.

To serve a read request we first try to find the key in the memtable then in the most recent SSTable in the LSM tree then the next SSTable.

Since the sustainability sorted the lookup can be done efficiently.

The number of SSTable grows it would take an increasingly long time to look up a key. As the SSTable accumulate the more outdated entries as keys are updated and tombstones are added. It takes disk space.

To fix the issues there is a periodic merging and compaction process running in the background to merge SSTable and discard outdated or deleted values.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/LSMTree.png" alt="LSMTree." caption="LSMTree.">}}

SSTable is sorted so the merging and compaction process is simple and uses mergesort algorithm.

When SSTable are merged they are organized into labels. There are different strategies to determine where and how the SSTable are merged and compacted.

There are two board strategies Size tiered compaction and level compaction. 

Size tiered compaction - Cassandra is optimized for write throughput. 

Level compaction - Rock DB is more read-optimized.

Complexion keeps the SSTable manageable. This is similar organised in levels. 

Each table gets larger as SSTable from the level above are merged into it. 

Compaction contains a lot of IO.

A mistuned compaction could starve the system and slow down both read and write.

**Optimization for the LSM tree.**

There are many optimizations which tries to perform the read operations similar to the B Tree. 

It look up on every label of the SSTable. searching is easy as it is done on the sorted data but then going through all of the data takes a lot of IO.

Many system contains a summary table in each level which contains the min max range of each disc block of every level. 

Another issue to look up a key that does not exists. It looks all the eligible bocks in all the levels. Most system keeps a bloom filter at each level.

A bloom filter is a space efficient data structure that returns a firm no if the key does not exist. It help the system not to look at each level and it improves the IO system.

### Bloom Filters.

Bloom Filter is a space efficient probabilistic data structure.

It would answer with a firm no and probably yes.

Use case can tolerate some false positives but not any false negatives a bloom filter could be very useful.

We cannot removes an item from a bloom filter it never forgets.

NoSql databases use bloom filter to reduce disk read for keys that don't exist. An lsm tree based database searching for a key that doesn't exist requires looking through many files and it's very costly.

CDN like Akamai use bloom filter to prevent caching one-hit-wonders these are web pages that are only requested once.

Akamai data 75% of the pages at one-day-wonders using a bloom filter to track all the urls seen and only caching a page on the second request is significantly reduces the caching workload and increases the caching hit rate.

Web browsers like chrome used to use a bloom filter to identify malicious url. Urls was first checked against a bloom filter. It only performed a more expensive full cheque of the url if the bloom filter returned a probably yes answer. This is no longer used however as the number of malicious urls grows to the millions and a more efficient but complicated solution is needed.

Some password validators use bloom filter to prevent users from using weak passwords sometimes it's wrong password will be a victim or a false positive.

The critical ingredient to a good bloom filter is some good hash functions these hash functions should be fast and they should produce outputs that evenly at randomly distributed, few collisions can be there.

A bloom filter is a large set of buckets where each bucket containing a single bit and they all start with zero.

Example to keep track of the food liked for this example we'll use a bloom filter with 10 buckets (0-9) and we'll use three hash functions.

Putting ribeye into the bloom filter the three hash functions return the numbers 1 3 4 these were set the buckets to one. 

Potato into the boom filter the hashing function returned to number 0, 4, 8 this time set the value to 1.

Ask bloom filter about ribeye since the same input always hashes to the same output ribeye still hashes to the number 1, 3, 4 bloom filter array value 1. Correct.

Asking about chop the value of the hash say 1, 5, 8 and the value 5 is not 1 in the array so the answer is no and it is correct.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Becket.png" alt="Becket." caption="Bucket.">}}

Asking lemon and the hash return 1, 4, 8 and the value are 1 in array and then search happen and lemon not present. It say yes but the value not present. It is a false positive case. 

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Bucket.png" alt="Bucket." caption="Bucket.">}}

The hash function should be good and the size of the array should be proper to avoid less false positive.

### Back Of Envelope Estimation.

### Choose right DB.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/DBName.png" alt="DBName." caption="DBName.">}}

### How does live streaming platform work.

### Latency Numbers.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/MemoryPyramid.png" alt="MemoryPyramid." caption="MemoryPyramid.">}}

Disk access latency has improved HHD to SSD. 

The network latency between countries has not improved as it covers the country and obeys the law of physics.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/TimeUnits.png" alt="TimeUnits." caption="TimeUnits.">}}

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CPURegister.png" alt="CPURegister." caption="CPURegister.">}}

1 ns - Accessing CPU Register is sub-nanosecond range.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CPUClockCycle.png" alt="CPUClockCycle." caption="CPUClockCycle.">}}

A clock cycle of a modern CPU is in sub-nanosecond range.

1-10 ns - L1 and L2 cache access. Some expensive CPU operations are in the range. Example like Branch Mispredict penalty can be 20 CPU clock cycle and it is in the range.

10-100 ns - L3 cache access is in the fast side of the range. For modern processor like Apple M1 referencing main memory is the slow end at the range.

Main memory access in modern CPU is 100 times slower than CPU register access.

100-1000 ns or 1 μs microsecond - System call. In linux making a simple system call takes several hundred nanoseconds. It is a direct call to trap into the kernel and back. It does not account the cost of executing the system calls. 

It takes 200 ns to MD5 hash a 64 bit number.

1-10 μs - It is 1000 times slower than a CPU register access. Context switching in Linus thread takes few micro seconds.

10-100 μs - A network proxy like Nginx would take around 50 microsecond to process a typical http request. Reading 1 MB of data sequentially from a main memory takes around 50 μs. The read latency of SSD takes 100 μs to read 8k page.

100-1000 μs or 1 milliseconds - The SSD write latency is 10 times slower than read latency. Intrazone Network Round trip for modern cloud providers takes few hundred microseconds. A typical name cache already cache operation takes around 1 millisecond.

1-10 ms - Inter zone network round trip of clous takes this range. The seek time of the hard disk drive is about 5 ms.

10-100 ms - The network round trip between US East to US West Coast or the US East Coast and Europe is in this range. Reading of 1 GB sequential from main memory.

100-1000ms - The hash function becrypt is used to encrypt a password and it takes around 300 milliseconds. TLS handshake is in 250-500 ms range. It has several machine round trip so the number depends on the distance between the machines. The network round trip between the US West Coast and Singapore is in this range. Reading 1GB sequentially from SSD is also in this range.

1 s - Transferring 1GB over the network within the same cloud region takes about 10s.

### What are Microservice.

### How Apple pay works.

### Proxy vs Reverse Proxy.

Nginx is called a reverse proxy.

There are 2 common types of proxy a forward proxy and reverse proxy.

Forward proxy is a server and sits  between a group of client machines and Internet. When those clients make request to websites on the Internet the forward proxy acts as a middleman intercepts those requests and talks to the web servers on behalf of those client machines.

Why do we do that?

There are a few reasons - Forward proxy protects the clients online identity, the ip address of the client is hidden from the server only the ip address of the proxy is visible it would be harder to trace back to the client.

Forward proxy can be used to bypass browsing restrictions. Some institutions the governments, schools and big businesses use firewalls to restrict access to the Internet by connecting to a forward proxy outside the firewalls the client machine can potentially get around these restrictions.

Forward proxy can be used to block access to certain content. It is not uncommon for schools and businesses to configure the networks to connect all clients to the web through the proxy and apply filtering rules to disallow sites by social networks.

Forward proxy normally requires a client to configure its application to point to it.

Large institutions they usually apply a technique called transparent proxies to streamline the process.

Transparent proxy works with layer 4 switches to redirect certain types of traffic to the proxy automatically there is no need to configure a client machines to use it.

It is difficult to bypass a transparent proxy when the client is on the institution's network.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/ForwardProxy.png" alt="ForwardProxy." caption="ForwardProxy.">}}

Reverse proxy sits between the Internet and the Web servers. It intercepts the reuqets from clients and talk to the server on behalf of the client. 

Why would a website use a reverse proxy.

There are few good reasons.

A reverse proxy could be used to protect a website the website's ip addresses a hidden behind the reverse proxy they're not revealed to the clients this makes it much harder to target a ddos attack against a website.

A reverse proxy is used for load balancing a popular website handling millions of users every day is unlikely to be able to handle the traffic with a single server a reverse proxy can balance a large amount of incoming request by distributing the traffic to a large pool of web servers and effectively preventing any single one of them from becoming overloaded.

This assumes that the reverse proxy can handle the incoming traffic. Services like Cloudflare put reverse proxy servers in hundreds of locations all around the world this puts a reverse proxy closer to users and at the same time provides a large amount of processing capacity.

A reverse proxy caches static content a piece of content could be cached on the reverse proxy for a period of time if the same piece of content is requested again from the reverse proxy the locally cached version could be quickly.

The reverse proxy can handle ssl encryption ssl handshake is computationally expensive the reverse proxy can free up the origin servers from those expensive operations instead of handling ssl for all clients a website only needs to handle ssl handshake from a small number of reverse proxies.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/ReverseProxy.png" alt="ReverseProxy." caption="ReverseProxy.">}}

Layers of Reverse Proc.

The first layer could be an edge service like Cloudflare. The reverse proxies are deployed to hundreds of locations worldwide closer to users.

The second layer could be an api gateway or load balancer at the hosting provider many cloud providers combine these two layers into a single ingress service.

The user will enter the cloud network at the edge closer to the user and from the edge the reverse proxy connects over a fast fibre network to the load balancer where the request is even a distributed over a cluster of web servers.

### What is API Gateway.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/APIGateway.png" alt="APIGateway." caption="APIGateway.">}}

API Gateway uses - Authentication and security policy enforcement, load balancing and circuit breaking, protocol translation and service discovery, monitoring, logging, analytics and billing, caching.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/APIGateWayParts.png" alt="APIGateWayParts." caption="APIGateWayParts.">}}

### What is GraphQL. REST vs GraphQL.

GraphQL is a query language for API developer by Meta.

It provides a scheme of the data in the api and user can ask what they need.

GraphQL sits between the clients and the backend services. It could aggregate multiple resource requests into a single query. It also supports mutations and subscriptions.

Mutations are GraphQL way of applying data modifications to resources.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/GraphQl.png" alt="GraphQl." caption="GraphQl.">}}

Subscriptions are GraphQL way for clients to receive notification on data modifications.

GraphQL and REST both send HTTP request and receive HTTP response. 

REST centers around resources each resource is identified by a url. It uses `v3/books/123` to fetch a book from the bookstore api.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/GraphQlGetCall.png" alt="GraphQlGetCall." caption="GraphQlGetCall.">}}

The authors field is implementation specific some rest api implementations by break them into separate REST call like `/authors/3` or `authors/5`

In GraphQL it looks different we first define the types in this example we have the book and author types.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/GraphQlClient.png" alt="GraphQlClient." caption="GraphQlClient.">}}

The types describe the kinds of data available. They don't specify how the data is retrieved via GraphQL.

To do that we need to define a query `type Query{ book(id: ID!): Book }`

Now we can send a request to the graph ql endpoints to fetch the same data as we can see rest in graph ql both use http both make a request via a url and both can return adjacent response in the same shape.

REST - GET `/books/123` and GraphQL - GET `/graphql?query={book(id="123"){title,authors{name}}}`

Specify the exact resource book and the field like the title and authors.

In REST the api decided author will be inside a resource. In GraphQL user decide what to include in the response.

GraphQL does not use the URL and it uses the schema.

Rest the work in the client side and say first get the books then the author details and it is a N+1 problem.

Drawback - REST does not need any libraries to consume someone else API. Request can be send using common tools like curl or browser. GraphQL requires heavier tooling support both on the client and server size. 

GraphQL + Apollo  - schema.geaphql, codegen.yaml, operation.graphql

It is more difficult to cache REST users http get for fetching resources and http get has a well defined caching behaviour that is leveraged by browsers, cdns, proxies and web servers. GraphQL has a single point of entry and uses http post by default this prevents the full use of http caching. With care GraphQL could be configured to better leverage http caching the detail is very nuanced.

While GraphQL allows client to query for just the data they need this also poses a great danger. Example where mobile applications shipped a new feature that causes an unexpected table scan of a critical database table of a backend service. This could bring the database down as soon as the new application goes live. It can be solved but it is complex. It should be monitored before choosing GraphQL.

### What is Single Sign On.

SSO is an authentication scheme enables a user to securely access multiple applications and services using a single id.

Integrated into apps like Gmail, Workday or slack it provides a pop up widget or lock in page for the same set of credentials with SSO user can access many apps without having a lock in each time.

SSO is built on a concept called **Federated identity**.

It enables sharing of identity information across trusted but independent systems. 

There are two common protocols for this authentication process - SAML and OpenID.

SAML or Security Assertion Markup Language is an xml based open standard for exchanging identity information between services. It is company found in the work environment.

OpenID connect we use when sign in to Google a box appear. It uses JWT to share identity information between services.

**How SSO works.**

Using protocol SAML, An office worker visits an application like Gmail in SAML terms Gmail in this example is a service provider.

The Gmail Server detects that the user is from the work domain and returns a SAML authentication request back to the browser.

The browser redirects the user to the identity provider for the company specifying the authentication request okta all zero and one logging are subcommon examples of commercial identity providers the identity provider shows the market page where the user enters the log in the passions once the usage is authenticated the identity provided generates a sample response and returns that to the browser this is called a sample assertion the sample assertion is a cryptographically signed xml document that contains information about the user and what the user can access with the service provider the browser forwards the science and constitution to the service provider now the service provider validate that the assertion was signed by the identity provider this validation is usually done with public key cryptography the service provider returns the protective resource to the browser based on what the user is allowed to access as specified in the sample assertion.

SSO integrated application say work day to work day server as in the previous example with Gmail it has to work domain and sends a sample authentication request back to the browser now the browser again we direct the user to the identity provider the user has already logged in with the identity provider it skips the lock in process and instead generates a sample assertion for work day detailing what the users can access there the sample assertion is returned to the browser and forwarded to Woody woody validates the sign assertion and grants user access accordingly the earlier we mentioned that open ID connect is another common protocol the open ID connect flow is similar to Sam but instead of passing sign excel documents around open id connect passes jwt jwt is assigned Json Docket the implementation details are a little bit different but the overall concept is to say so which one of these ssl methods should we use both implementation are secure for an enterprise environment where it is common to outsource identity management to a commercial identity platform the good news is that many of these platforms provide strong support for both so the decision that depends on the application being integrated and which protocol is easier to integrate with if we are writing a new web application integrating with some of the more popular open id connect platforms like Google Facebook we'll get them is probably a safe bet.

### What is a CDN.

### **What is RPC.**

GRPC is an open source remote procedure called framework created by Google in 2016. It was a rewrite of their internal rpc infrastructure that they used for years.

What is an **RPC** or a **Remote Procedure Call**?

A local procedure call is a function call within a process to execute some code a remote procedure called enables one machine to invoke some code on another machine as if it is local function call from a user's perspective.

A GRPC is a popular implementation of RPC many organisations have adopted GRPC as a preferred RPC mechanism to connect a large number of microservices running within and across data centres.

GRPC has a thriving developer ecosystem it makes it very easy to develop production quality and type saving apis that scale well the core of this ecosystem is to use a protocol buffers as its data interchange format.  
Protocol buffers is a language agnostic that platform agnostic mechanism for encoding structured data gfc uses protocol buffers to encode and send data over the wires by default while GRPC could support other encoding formats like Json protocol buffers provide several advantages that makes it the encoding format of choice for GRPC protocol buffer support strongly typed schema definition the structure of the data over the wire is defined in a prototype protocol buffers provide broad tooling support to turn their schema defying the portal file into data access classes for all popular programming languages a gopc service is also defined in a profile by specifying all pc method parameters and return types the same tooling is used to generate grpc client and server code from the profile developers use these generator classes in the client to make rpc calls and in the server to fulfil the rpc request by supporting many programming languages the client and server can independent No he choose the programming language and ecosystem best suited for their own particular use cases this is traditionally not the case for most other C frameworks the second reason why GRPC is so popular is because it is high performance out of the box 2 factors contributes to his performance first is the protocol buffer is very efficient binary encoding format it is much faster than Jason 2nd GMPC is built on top of HGTP 2 to provide a high performance foundation at scale the use of HTTP2 brings many benefits we discussed HTTP2 in an earlier video cheque out the link in the description for more information gfc uses http 2 streams it allows multiple streams of messages over a single long leaf tcp connexion this allows the GRPC framework to handle many concurrent RPC calls over a small number of tcp connexions between clients and servers to understand how.

Very small number of TCP connexions between clients and servers to understand how GRPC works let's walk through a typical flow from AGRPC client to AGRPC server in this example the order service is the grpc client and the payment service is the grpc server when order service makes a gopc call to the payment service it invokes the client code generated by GRPC tooling at build time it's generating client code is called a client stop GOPC encodes the data pass to the client's step in the protocol buffers and sends it to the low level transport layer share PC sends the data over the network as a stream of HTTP2 data freaks because of Binary Encoding and network optimization gfpc is said to be five times faster than Jason the payment service receives the packets from the network decodes them and invokes the server application the result return from the server application gets encoded into protocol buffers and sent to the transport layer the order service receives the packets decoder and sends the result to the client application as we see from the example above GRPC is very easy to implement it is so easy why do we not see widespread use of GRPC between web clients and web servers one reason is that gopc relies on lower level access to HTTP2 primitives no browsers currently provide the level of control require over web requests to support AGRPC client it is possible to make GRPC calls from the browser with the help of a proxy this technology is called GRPC Web however the feature set is not fully compatible with GRPC and its usage remains low compared to GLPC itself so where does G L P C shine UGRPC and his usage remains low compared to GRPC itself so where does GRPC shine and when should we use it GRPC is the inner service communication mechanism of choice between micro services in the data centres his broad support for many programming languages allows services to choose their own languages and developer ecosystems best suited for their own users we also see increasing use of GRPC in the native mobile clients his efficiency and performance makes a lot of sense in the energy and bandwidth constraint involvements that are mobile devices.

### SSL, TLS, HTTPS.

What is so important about these days most websites require it how does https work will answer this question in this video let's type right in without https the communication between the browser and the server is in plain text this means that the password you enter or the credit card number you sent over Internet can be read by anyone who has the ability to intercept it https is designed to solve this problem to make the data sent over Internet unreadable by anyone other than the sender and the receiver https is an extension of the http protocol we discussed http in an earlier video cheque the description you would like to learn more about we've https data is sending an encrypted form using something called tls tls stands for transport layer security if the encrypted data gets intercepted by a hacker all they can see is jumbo data let's take a look at how the tls can shape works there are several steps step one just like in the case for http the browser establishes a tcp connexion with the server step 2 this is where the tls handshake begins the process sends a client hollow to the server in this hello message the browser tells the server the following things one what tls version it can support it could be tls 1.2 tls 1.3 etc 2 what cyber suites it supports the cyber suite is a set of encryption algorithms to use encrypt data after receiving the client hello the server gets to choose the server suite and the tails version to use based on the options it got from the client it sends those in the server halo message back to the client the server then sends the certificate to the client the certificate includes a lot of different things one of the key things is the public key for the server the client uses the public key in something called asymmetric encryption in a symmetric encryption a piece of data is encrypted by public key can only be decrypted by the private key we'll discuss how this is used in it this concludes that too the halo phase of the TLS handshake at this point the client has a service certificate and the client and server have agreed on the TLS version and the cyber suite to use now the step 3 this is a step where the client and the server come up with a share encryption key to use the encrypted data and this is where the symmetric encryption coming to the picture again with a symmetric encryption the data encrypted on the client side using the public key from the server can only be encrypted by the server this is how the client sends an encryption key safely to the server over the wide open internet all this is done in the client key exchange message the exact detail varies depending on the cyber suite used here we use rsa as an example since it is the easiest to understand with rsa the client generates an encryption key also call a session key encrypts it with the server public key and sends the encrypted session key to a server over the Internet the server receives the encrypted session key and decrypts it with this private key now both sides hold the session key and this is where they enter step 4 of the TLS handshake where they use the session key and agree upon cyber suite to send encrypted data back and forth in a secure bidirectional channel now you may ask why don't we just use asymmetric encryption for everything why switch to symmetric encryption at all the main reason is that asymmetric encryption is computationally expensive it is not really suitable for bulk data transmission before we close there are two finite points I would like to discuss first the hashing we talked about applied to tls 1.2 while the latest version is tls 1.3 and tls 1.3 is supported on all major browsers as we can see in our illustration TR is 1.2 takes two network graph trips to complete this is one of the major improvements of tls 1.3 it optimises the handshake to reduce the number of network round trips to one we decided to talk about tls 1.2 because we reviewed tls 1.3 as an optimization as with most optimizations it is a bit harder to explain this is why we chose TRS1.2 instead the core concepts in TLS 1.2 still applies to TLS 1.3 the second final point would like to discuss is that in the explanation about we use RSA for asymmetric encryption to securely exchange the asymmetric session key again we chose the rsa because it is easy to understand however asymmetric encryption is not the only way to share the session key between the client and the server in fact the tls 1.3 rsa is no longer supported and it's the a method for key exchange diffie Hellman is a more common way nowadays for exchanging session keys diffie Hellman is complicated but in a nutshell it uses some advanced math involving large prime numbers to derive a share session key without ever transmitting a public key over the network this is it for https.

### Process vs Thread.

A program is an executable file. It contains the code or a set up processor instructions that is stored as a file on disk. 

When the code in a program is loaded into memory and executed by the processor it becomes a Process.

An active process also includes the resources the program needs to run. These resources are managed by the operating system. Some examples are processor, register, program counter, stack pointer, memory pages assigned to the process for its heap and stack.

Each process has its own memory address space. One process cannot corrupt the memory space of another process. It means when one process malfunction other processes keeps running.

Chrome takes the importance of the process isolation by running each tab in its own process.

A thread is a unit of execution within a process. A process has at least one thread and called the main thread. Each thread has its own stack. Thread within a process share a memory address space. It is possible to communicate between threads using that shared memory space.

One misbehaving thread can bring down the entire process.

{{<figure src="/images/SystemDesign/Process.png" alt="Process." caption="Process.">}}

**How does the OS run a thread or process on a CPU?**

It is handled by context switching.

During a context switch one process is switched out of the cpu so another process can run. 

The operating system stores the state of the current running process so the process can be restored and resume execution at a later point. It then restored the previous state of a different process and resumes execution for that process.

Context switching is expansive it involves saving and loading of registers switching out memory pages and updating various kernel data structure.

{{<figure src="/images/SystemDesign/ContextSwitching.png" alt="ContextSwitching." caption="ContextSwitching.">}}

Switching execution between threads requires context switching but it is faster than switching between processes as it shares the same memory so there is no need to switch between virtual memory.

Contact switching is costly and there are other mechanism to minimise it such as fibers and coroutines.

{{<figure src="/images/SystemDesign/ContextSwitchingStack.png" alt="ContextSwitchingStack." caption="ContextSwitchingStack.">}}

In general they are cooperatively scheduled that is they must yield control for others to run.

In other words the application itself handles task scheduling.

### What is OSI Model.

What does it have to do with the osi model how does tcp ip fit into this let's take a look the osi model or the open systems interconnect model is a theoretical framework that provides one way of thinking about networking.

He splits the network communication between two devices on a network into seven abstraction layers the physical layer is the bottom most layer it is responsible for transmitting raw bits of data across a physical connexion the data link layer is the second layer it takes the raw bits from the physical layer and organises them into frames it ensures that the frames are delivered to the correct destination the Ethernet primarily lives in this layer the network layer is the 3rd layer this is responsible for routing data frames across different networks the ip part of tcp ip is a well known example of this layer the transport layer is the 4th layer it handles end to end communication between 2 nodes this is the layer where tcp and udp live tcp provides reliable end to end communication between devices it does this by dividing the data into small manageable segments and sending each segment individually each segment has a sequence number attached to it the receiving end uses the secret numbers to reassemble the data in the correct order pcp also provides error checking to make sure that the data was not corrupted during transmission udp is another popular protocol in the transport layer it is similar to tcp but it is simpler and faster unlike tcp utp does not provide the same level of error checking or reliability it simply sends packets of data from one device to another the receiving end is responsible for determining whether the packets will receive correctly if an error is detected the receiving end simply discards the packet the remaining layers are session presentation and application layers this is where the osi model loses its usefulness in practise there are two fine grain and do not really reflect reality in general this sufficient to collapse them into a single layer and consider application protocols like http and simply layer 7 protocols now let's go through an example and examine how data moves through the layers when transmitting over the network when a user sends a http request to a Web server over the network the http header is added to the data at the application layer then the tcp header is added to the data it is encapsulated into tcp segments at the transport layer the header contains the source port destination port and sequence number the segments are then encapsulated with an ip header and the network layer the ip header contains the source and destination ip addresses a Mac header is added to the data link layer with the source and destination mac addresses it is worth noting that in the real world this is a bit nuanced the Mac addresses are usually not the Mac address of the sending and the receiving ends the Mac addresses of the routing devices in the next hop of a usually long journey across the Internet the encapsulated frames are sent over the network in raw bits in the physical layer when the Web Server receives the raw bits from the network it reverses the process the headers are removed layer by layer eventually the web server processes the http request to conclude the osi mod is one way of thinking about networks his primary purpose is educational even though the layers don't fit the real world use cases perfectly they are still widely used by networking vendors and cloud providers as a shorthand to describe where the networking products sit in the osi model for example cloud load balances are broadly divided into two categories L4 and L7 and L7 load balancer is a shorthand to mean that the load balancer operates at the application protocol layer like http or https and therefore load balancer on the other hand operates at the tcp level.

### CAP Theorem.

### Kubernetes.

### CI CD.

{{<figure src="/images/SystemDesign/CICD.png" alt="CICD." caption="CICD.">}}

The CICD takes care of the building, testing and deploying the code.

CI - It is a practice to enable automation to enable team to merge code changes into the shared repository. Each commit triggers an automated workflow in a CI server and runs a series of task to make sure the commit is safe to merge.

{{<figure src="/images/SystemDesign/Devops.png" alt="Devops." caption="Devops.">}}

CD - Github Action, BuildKite and Jenkins are commonly used to handle the CD tasks.

There are infrastructure specific tools that will make the CD easier like the ArgoCD in Kubernetes.

https://blog.bytebytego.com/p/a-crash-course-in-cicd

### Data Structure that power Modern Database.

All possible test I write in first step is skip list the skip list is a probabilistic data structure that is used to implement a sort of set it is an alternative to a balance tree this allows for efficient search insertion and deletion operations in an in memory database like Reds a skip message used to implement the order data structure such as sort of set it allows a fast look up range queries and other operations next is hash index the hash index also known as a hash table is used to efficiently map keys to values by using a hash function to generate a hash value for each key the hash value is used to quickly locate the value in the table allowing for fast lookups insertions and Deletions hash index is ubiquitous this obviously is used to implement hash data structures by hashes in redis but it's also widely used internally in all kinds of databases the next two data structures go hand in hand their ss table and lsm tree ss table or soda strain table is used to store data on disc in a sorted order it is a file based data structure that is used to store large amounts of data in a highly compressed and efficient format as a table is a core component of the lsm tree the other core component is a map table mem Table is an in memory data structure that stores recent rights that's a stable and mem table work together to handle a high volume right operations we have an entire video dedicated to the lsm tree cheque out the description below for a link to the video lsm tree is the backbone of popular nosql databases such as Apache Cassandra Rocksdb and level db next up is the B tree family we include AB plus tree in this the B tree family of data structures are used to efficiently store and retrieve large events of data on disc petri is a balanced tree where each node can have multiple children and keeps data sorted people's tree is a specific type of B tree where all data is stored in leaf nodes and internal not only whole keys they are widely used in databases such as Mysql Postgres and Oracle to handle large amounts of on this data next is inverted index and inverted index is usually efficiently searched and retrieved data from a large collection of text documents it creates a mapping of words to documents in which they appear the index is inverted because it maps the words to the documents rather than the other way around in order to indexes the company used in document search engines by elastic search next is suffix tree it is used in databases for efficient text searching it quickly finds all occurrences of a search term within a large collection of documents the last data structure we will discuss is somewhat specialised it is artery and artery is a special index data structure that organises data based on their geometric boundaries such as rectangles or polygons it is used to efficiently store and retrieve spatial data in a database it allows for fast spatial queries and is widely used in spatial databases that post gis mongo db and elasticsearch.

### System Design Interview.

The 4 steps of a framework - Step two proposed high level design and get by in step 3 design deep dive and step 4 is weather this framework works well for a typical 45 to 16 minutes long system design interview session initially the first five minutes is an introduction and the last slide is Q and A to meet up the interview is only about 35 to 45 minutes we suggest allocating about five minutes to step 120 minutes to step 215 minutes to step three and five minutes to step four now keep in mind this is just a rough guideline feel free to adjust as needed let's take a closer look at each of the 4 steps set 1 understand the problem and establish design scope system design questions are usually open ended sometimes they are presented in a way that is deliberately vague this test our ability to organise our thoughts and focus on what is important it's our job to ask as many questions as necessary to understand the problem fully it's a red flag to jump right into a solution without 1st understanding what we're building what questions we ask a goal is to clarify the requirements we want to understand why we are building a system who the users are and what features we need to build for example we are asked to design in China it is important to recognise that there are many different types of chatter in the marketplace they are 1 on 1 and small group chat apps like Whatsapp office chat apps like slag or group chat apps like this one they have different design challenges and constraints the goal is to understand the features we are building in priority order we should focus on the top few features to build make sure the interviewer agrees to the feature list it's also important to ask questions to clarify the non functional requires for system design interviews we suggest focusing on scale and performance these are functional requirements what make a design unique and challenging for example designing a Twitter clone to support a few hundred users is easy while designing it for hundreds of millions of users with some popular accounts having millions of followers is interesting and challenging but the more senior the world is the more important it is for us to demonstrate our ability to handle the non functional requirements but help us get a sense of the scale of the system and the potential challenges and bottlenecks we might do some run back of the inflow calculations here keep in mind that I'm in the potential challenge so the map we do here is a rough estimate the goal is to get a general sense of the scale we want to get the order of the magnitude right but this step should take about 5 minutes at the end we should have a shortlist of features to design for along with the few important non functional requirements to satisfy for sample of a framework we aim to develop a high level design and regional agreement with the interviewer on the design for most designs we will suggest a top down approach and start with the Apis the Apis establish a contract between the end users and the backend systems they should be clear after gathering the requirements what Apis would need unless it is specified otherwise we should follow the restful convention define each api's input parameters and output responses carefully take the time to carefully review the apis verify that they satisfy the functional requirements equally important to remember do not introduce apis that have nothing to do with the functional requirements an additional consideration on api some designs we call for two way communication between client and server but in this scenario websocket is a common solution here two way communication between client and server and in this scenario websocket is a common solution here be mindful that a socket service websocket is usually stay full it's quite challenging to operate a scale the scale is high be prepared to discuss how we would manage the websocket deployment in the deep dive section once we have established apis between the client and the server the next step is to layout the high level design diagram the diagram is a blueprint of the overall design that we can refer back to we should use it to verify that the design satisfies all the feature requirements end to end for many designs we start with a load balancer or an api gateway behind that other services that will satisfy the feature requirements we established earlier with the interview many services require some form of persistence this is where we would run out the design by introducing a data storage layer it's usually not necessary to specify the exact database technology to use at this stage this should be deferred to the deep side section if necessary and only after we have designed the data schema for example for a map service that Google Maps the client often needs to send frequent gps updates to the server we include a designer location data store that a location update service would write to repeat the steps above and complete the high level design diagram for all the major features here's a project while developing the high level design maintaining a list of discussion points for later resist the temptations to take into too much detail too early do not take a self into a hole before we have a full picture of the design the last step with the high level design is to hash out the data modelling schema here we should discuss the data access patterns and the read write ratio and scale data modelling can significantly impact the performance of the design it is simple also discuss the databases to choose and maybe discuss the indexing options here we should make some judgement calls if the data modelling is the key part of the design to satisfy the non functional requirements we might want to defer the discussion to the deep dive section but we are done with the high level design take a step back and review the design make sure each feature is complete end to end here we reach the 3rd step of the framework design deep dive the goal of this section is to demonstrate that we could identify areas that could potentially be problematic and come up with solutions and discuss trade offs we should work with the interview closely to decide what to discuss in the data is wearing on functional requirements make the problem interesting the higher the level the more important this section is the section is really open ended there is no one size fits all approach Who made the world's useful sometimes again who was body language we give away clues that they are dissatisfied with certain aspect of the design this is important to pick up these clues and make sure the issues are addressed one way we can approach it is by asking questions we can list out the reasons for choosing a particular solution and ask if they have any questions or concerns once we pick out a problem or two to dive deeper into we should cover with multiple solutions and discuss trade offs for each option we can use the following meaning guidelines when framing the discussions first we should clearly articulate a problem for example for designing Google Maps the right qps at 1 million per second to the location database is too high for single database to end next we come up with at least two solutions continuing with example above we could propose to reduce the location update frequency per user or choose a number sql database that could handle the right rate 3rd we discussed the trade offs of the solutions remember to use numbers to back up our design finally we pick a solution and discuss it with the interview now repeat this for other problems in a typical interview we should only have time to dive deeper into the top 2 or 3 issues lastly we have reached the last step wrap up we suggest spending a few minutes summarising the design here we should focus on the parts that are unique to the particular situation keep it short and sweet leave enough room at the end of the interview to ask the interviewer questions about the company that's it on the system design interview framework we hope you find it useful

### Top 5 Redis use case.

In this video we discovered a versatility of wealth we talked about the top use cases they have metal testing in production the various companies and the various scales interesting scalability challenges for us hello why is a great tool to know well in our system design tool set let's type right to it first of all what is rabbits and why do people use it president in memory data structure store is most commonly used as a cache it puts many data structures such as strings caches lists sets and soda sets redis is known for speed we made a video to explain why redis is so fast look for the link in the description we would like to watch that video let's dive into the top use cases of Redis the number one use case in Redis is cashing objects to speed up web applications in this case Redis source frequently requested data in memory it allows the web servers to return frequently access data quickly this reduces the low on the database and improves the response time for the application a scale the cache is distributed among the cluster of red servers shotting is a common technique to distribute the caching load even across the cluster other topics you consider when deploying redis as a distributed cache include setting a correct ttl and handling thundering hurt or costar another common use case is to use radis as a session store to share session data about servers when I use the logs into a web application the session data is storing redis along with a unique session id that is returned to the client as a cookie when the user makes a request to the application the session id is included in the request and the status web server retrieves the session data from Redis using the id at least important note the redis is an in memory database the session data stored redis will be lost if the Reddit servers restarts even though Redis provides persistent options by a snapshot at AOF will depend only file the last session data will be saved to disc and reloading the memory in the event of a restart these options often take too long to load to be practical in production replication is usually used instead in this case data is replicated to a backup instance in the event of a crash of the main instance the backup instance is quickly promoted to take over the traffic the next use case is distributed lock distribute the locks are used when multiple nodes in an application need to coordinate access to some shared resource redis is used as a distributor lock with this atomic commands like set annex or set if not exists it allows the caller to set a team only if it is not already exist this is how it works at a high level client one tries to acquire the lock by setting a key with a unique value in a timeout using a set and X Command the key was not already set the set annex command returns one indicating that the lock has been inquired by time 1 time 1 finishes his work and releases the lock by deleting the key but if the key was already set the set annex command returns zero indicating that the lock is already been held by another client in this case client waits and retries a set an X operation until the lock is released by the other client look at this simple implementation might be good enough for many use cases but it's not completely fault tolerant for protection news there are many redis claimed libraries they provide high quality distributed log implementation right off the box next up is rate limited redis can be used as a rate limiter by using incremental command on some counters and setting exploration times on those counters a very basic rate limiting algorithm works this way for each incoming request the request ip or user id is used as a key the number request for the key is increment using the increment domain the current is compared to the allow rate limit if the count is within the rate limit request is process if the count is over the limit the request is rejected the keys are set to expire after specific time window for example a minute to reset the cans for the next time window most sophisticated rate limiters by the leaky bucket algorithm can also be implemented using Redis the last use case we would like to talk about is gaming leader for most games they are not super high scale redis is a delightful way to implement various types of gaming leaders but a fundamental data structure that enables us a solar set is a collection of unique elements associated with it the elements are sorted by score this allows a quick retrieval of elements by score in logarithmic time.

### Debugging.

### What is Cloud Native.

{{<figure src="/images/SystemDesign/CloudNative.png" alt="CloudNative." caption="CloudNative.">}}

Cloud Native was first introduced by Netflix in 2013 in an AWS event when Netflix discussed the web-scale architecture.

Cloud 90 for the blueprint for designing web scale application on the cloud that are more available and scalable.

It promises agility to ship new features quickly without compromising the availability.

Confusion between cloud native and cloud computing?

Cloud computing is running application on computing resources  managed by cloud providers without having to purchase and manage hardware separately.

{{<figure src="/images/SystemDesign/CloudComputing.png" alt="CloudComputing." caption="CloudComputing.">}}

Migrate an application from monolith to on-prem is one way.

Running application to cloud does not make it cloud native. The application to be cloud native should follow 4 pillars.

 Microservices, Containers, DevOps, Cloud Native Open Standards.

Application Architecture - Cloud Native architecture is made up of small interdependent microservices.

Containers - Container orchestration - Application are within the containers and it contains everything to run the microservice. When the number of microservice grows the container orchestration helps to manage the containers. Example - Kubernetes - It controls where containers run, Detect and repair and Balance load between microservices.

DevOps - Development and deployment process.  
Cloud Native Open Standard - Following the components and standards.

Example of some well known standards and application.

{{<figure src="/images/SystemDesign/DevopsApplication.png" alt="DevopsApplication." caption="Devops Application.">}}

Jaeger, Zipkin, OpenTelemetry.

Service Mesh is a core infrastructure layer for managing service to service communication between microservcies.

Istio and Linkerd are some of the example.

{{<figure src="/images/SystemDesign/ControlPlane.png" alt="ControlPlane." caption="ControlPlane.">}}

The principle and the standard architecture refers as a cloud native architecture.

{{<figure src="/images/SystemDesign/CloudNativeArchitecture.png" alt="CloudNativeArchitecture." caption="CloudNativeArchitecture.">}}

### DNS.

### Backend Architecture.

### Types of Memory and Storage.

### Cache system.

### GPT.

### Most used System Pattern.

### Optimize SQL queries.

### Popular API Architecture Styles.

{{<figure src="/images/SystemDesign/PopularAPIArchitecturalStyle.png" alt="PopularAPIArchitecturalStyle." caption="PopularAPIArchitecturalStyle.">}}

**SOAP** is used in financial services and payment gateway where the security and reliability are key.

**REST** is not suitable for real time data or operate with a highly connected data model.

**GraphQL** is not an architectural style and it is also a query language allows client to ask for a specific data. It means no over fetching or under fetching of data.

**gRPC** is modern, high performance and uses protocol buffers. It is used in microservice and Netflix uses gRPC to handle their immense inter-service communication. In browser client gRPC pose a issue due to limited browser support.

**WebSocket** is all about real time bidirectional and persistent connections.

**Webhook** is all about event driven, HTTP callbacks and asynchronous operation. Github uses webhooks to notify other systems whenever a new commit is pushed.

### Most used Deployment Strategies.

{{<figure src="/images/SystemDesign/BigBangDeployment.png" alt="BigBangDeployment." caption="BigBangDeployment.">}}

One of the earliest way to deploy into the production.

Push all the changes at once and it causes a bit of down time as we have to shut down the old system to switch to the new system.

It is sometimes the only choice in case of a database upgrade

{{<figure src="/images/SystemDesign/RollingDeployment.png" alt="RollingDeployment." caption="RollingDeployment.">}}

Rolling diplomat is more like a marathon than a sprint and this let us incrementally update different parts of the system over time. 

Imagine there are 10 servers rolling deployment will take down the first server deploy the new version and continue with the rest of it 1 by 1. It prevents the downtown when one is updating and the other one is still working.

Maintaining two identical production environment like the blue and the green. At a given time one side is active and visible to the user and the other is idle.

The active one is serving the user and the ideal one is where we are doing the updates.

Canary deployment it is named after the ancient use of canaries in the coalmines. Update some of the server on particular location basis to see if that is working fine and monitor the performance of the new version.

Feature toggle is an option where you are making the user choose to update to the new feature or the previous one. Feature deployment can be used with any of the other deployment strategy.

### How discord stores trillions of messages.

### Stack overflow Architecture.

### OAuth 2.

### Netflix API Architecture.

### DevOps SRE Platform Engineering.

### Improve API performance.

API first need to see the bottleneck by load testing and profiling request. Optimization should only be done when the API has some performance issue.

{{<figure src="/images/SystemDesign/ImproveAPIPerformance.png" alt="ImproveAPIPerformance." caption="Improve API Performance.">}}

**Connection Pooling** - This technique involves using a pool of open connections to manage database interaction, which reduces the overhead associated with opening and closing connections each time data needs to be loaded. The pool manages the lifecycle of connections for efficient resource use. Creating a connection uses a handshake protocol and slow down the API. The reuse of connection can greatly improve throughput.

In serverless architecture the connection management is a bit more challenging. Each serverless function instance opens its own database connection. Serverless can scale rapidly and it can potentially lead to a large number of open connections and that can overwhelm the database.

AWS RDS proxy and Azure SQL database are designed to handle the situation and manage the connection pooling for you.

**Avoid N+1 query problem.**

It optimizes the db performance.

Example building an API endpoint to fetch a blog post their comments. The N+1 problem will occur when we first make a query to fetch the post and for each post another query to fetch the comments.

```sql
SELECT id, title FROM posts;

SELECT id, content FROM comments WHERE id=1;
SELECT id, content FROM comments WHERE id=2;
SELECT id, content FROM comments WHERE id=3;
```

There are N post and then there will be 1 query for the post and N queries for the comments - N+1 problem.

To avoid this fetch the data in a single queries or two queries . One to fetch the post and one to fetch all the comments for those posts.

```sql
SELECT posts.id AS post_id, posts_title, comments.id AS comment_id, comments.conten AS comment_content FROM posts LEFT JOIN comments ON comments.post_id = posts.id;
```

**Use pagination.**

**Using lightweight JSON serializer.**

When returning JSON responses the speed of the serializer can make impact in response time.

**Compression.**

Enabling compression on large API response payload can reduce the amount of data transfer over the network.

### Why Google Mono repo.

### Git Merge VS Rebase.

### Top 6 load balancing algorithms.

### Algorithm in System Design.

### Most used Architecture Patterns.

### Apache Kafka.

### System Design Interview.

### Docker.

### HTTP status code.

### Language.

### Deploy code to production.

### Most popular network protocol.

### How git works.

### JWT.

### How does the Linux Boot Process work.

### Vertical vs Horizontal Scaling.

### Most popular type of API testing.

### Client Architecture Pattern.

### Linux File System Explained.

### How Disney captures 1B emojis.

### Tips for API design.

**Use Clear Naming.**

/carts - Collection of carts.

/products - Collection of products.

**Ensure reliability through idempotent API.**

Put is idempotent and it update the data.

Patch update the selected part of the data and it is not idempotent. Like update an array and add value to it and again use the patch command it will again add the value.

**Add versioning.**

v1/carts/123 and used like v2/carts/123. 

Versioning allow the backward compatibility.

**Add pagination.**

Page offset and cursor based.

Page offset pagination uses number based record like page 2 will contain record 11 to 20 and size 10. 

Cursor-based pagination takes a pointer and return the next record.

**Use clear query strings for sorting and filtering API data.**

Sort the data by registered the Url can be `GET/users?sort_by=registered`

Only need color product - `GET/products?filter=color:blue`

User can see the active filters. Additional search and filter can be added without breaking any existing condition.

**Security of the API.**

**Keep cross resource references simple.**

Use clear linking between connected resources. 

Reference item 321 in the cart 123 should be like this `carts/123/items/321` and not `items?card_id=123&item_id=321`

**Plan for rate limiting.**

It protects api from over use. There should be a validation in the source ip address, endpoint and user account. Free user should make 1000 calls and one ip can make 20 calls in a specific time.

### Diagram as Code.

### Webhooks.

### Caching pitfalls.

### Reverse Proxy API Gateway Load Balancer.

### Why Kafka is popular.

### ACID properties in DB.

### Learning SQL.

### API Security.

### Blogs for Engineers.

### Coding Principle.

{{<figure src="/images/SystemDesign/CodingPrinciple.png" alt="CodingPrinciple." caption="Coding Principle.">}}

Comment - Code tells you how and comments tell you why.

Robustness - Code should handle unexpected situations without breaking. The exception to prevents crashing and unpredictable behavior. It should be defensive programming like thinking ahead and handle possible error.

Testing - Good code is not about how it work it is about how easy to test. Design components by thinking testing in mind.

{{<figure src="/images/SystemDesign/CodingPrincipleTesting.png" alt="CodingPrincipleTesting." caption="CodingPrincipleTesting.">}}

Refactor - It is the preventive maintenance for the code base. Solve the issue like duplicate code, improper naming.

Security - It should be taken care of the SQL injection and cross site scripting. To prevent it validate and sanitize user input. Use parameterized queries and output encoding.

{{<figure src="/images/SystemDesign/CodingPrincipleSecurity.png" alt="CodingPrincipleSecurity." caption="CodingPrincipleSecurity.">}}

### Popular API Protocol.

{{<figure src="/images/SystemDesign/APILandscape.png" alt="APILandscape." caption="APILandscape.">}}

REST simple, scalable and works well with web services. It uses standard HTTP method and is a resource based approach and it is easy to use. It is stateless and scaling up is straight forward.

Rest has an issue with over fetching and under fetching data. When needed related data there will be multiple requests which will increase the latency. The graphQL works best.

GraphQL designed by Facebook is more flexible and efficient alternate to REST. All data will be retrieved with a single query and the frontend developers has more control on what data to fetch. It give control to the user by allowing them to make a single request and get the data they need. The data retrieval helps the problem of over fetching and under fetching.

It supports real time update to subscriptions keeping client updated in real time. 

It is very dynamic and caching is difficult and hard to optimize the performance.

Webhooks are custom HTTP callbacks triggered by specific event within an applications. They do the real time communication between the system and removes the constant polling. It saves the computing power and bandwidth. 

Webhooks supports decoupled architecture which supports modularity and scalability of the application.

SOAP has strict standard, strong security including authentication and authorization and encryption. XML based for the enterprise application.

Websocket is another protocol it establishes low latency bidirectional communication over a connection between client and server to facilitate its real time data transfer. It is idle for the applications where instant updates are critical.

gRPC build on the foundation of HTTP2. It uses protocol buffer to define service methods and message formats which allows services to expose custom methods much like functions in a programming language.

{{<figure src="/images/SystemDesign/PopularAPIProtocol.png" alt="PopularAPIProtocol." caption="PopularAPIProtocol.">}}

### How Mobile apps are released.

### KISS SOLID CAP BASE.

### Data Pipeline.

### Kafka vs RabbitMQ vs Messaging Middleware vs Pulsar.

Thus explore air pollution and impact on distributed computing basic software components enable different parts of the system to communicate asynchronously and they receiving messages they act in the middle allowing sender and receivers to work independently business careers are crucial for building scalable loosely coupled and fault tolerance systems they assure reliable communication handle async tasks in process high throughput data streams decoupling senders and receivers allow systems to scale independently and handle failures recently take looper for example when a rider requests a ride the request enters the queue drivers are often matched to these requests this setup decomposed the riders request from the driver's availability enabling efficient handling of numerous requests in real time now let's look at the evolution of message queue architectures ibmmq launched in 1993 pioneer enterprise messaging it provided reliable secure and transactional messaging for critical applications in finance and Healthcare large banks use ibm mq to process financial transactions reliably even during hardware failure IBMF gives the voice persistent and non persistent messaging it ensures that critical messages are involved during system failure it offers robust transactions support to allow multiple messages to be grouped into a single unit of work which can be committed and rolled back as a whole there was a various platforms making it versatile for different enterprise environments rabbit mq releasing 2007 introduced a flexible and dynamic messaging model it supports multiple protocols including amp qp mqtt and stock it offers features like message routing queuing and pops up messaging econverse platforms often use rapid mq for tasks like order processing and inventory updates improving system responsiveness and scalability rabbit empty is plugging system allows user to extend functionality it supports clustering for low distribution and high availability configurations rabbit mq provides fine grain control over message acknowledgement ensuring reliable message processing apache Kafka introduced in 2011 revolutionised message cues example high throughput real time data streaming have go offers a scalable and fault tolerant platform for handling massive data volumes this unique architecture based on a distributed commitment enable event sourcing stream processing in real time Linux latin newscraft process prevails events daily enabling real time notifications in data analytics congress petition log architecture allows horizontal scaling across multiple brokers it ensure data durability and higher visibility through configurable replication congress supports consumer groups of cool automated media of the same topic by multiple consumers it offers optional exactly what semantics to prevent message loss of duplication recently Apache poster developer Yahoo has advanced message cues for posters combine character scalability and performance with the flexibility and rich features of traditional message schemes discard native architecture multi tenancy support and tsorias work well in modern distributed computing environments poser is designed for multi tenants allowing multiple tenants to share the same customer maintaining isolation and security this of course geo replication enabling data replication across multiple data centres for disaster recovery and data locality poster's tier storage allow older data to be offloaded to cheaper sources at Henderson S3 reducing costs while maintaining access to historical data provide lightweight computer capabilities for stream processing the posterio connectors facilitate ec integration with external systems and then evolution of message queue architecture do you like a videos you might like a system design newsletter as well it covers topics in transit.

### Strategies to scale the application.

### Concurrency vs Parallelism.

How grab the headers multiple tasks by processing user input reading the difference between these concepts is essential for building efficient and responsive applications .

That's our concurrency imagine a programme that handles multiple tasks by processing user inputs reading files and making network requests concurrency allows your programme to juggle this task efficiently even on a single cpu core here's how it works the cpu ratios switches between tasks working on each one for a short man of time before moving to the next this process known as context switching creation illusion that tasks are progressing simultaneously though they are not think of it like chef working on multiple dishes they prepare dish for dirt this went to another and keep alternating while the dishes are finished simultaneously progress is made on all of them however contact switching comes with overhead the cpu must say that we store the state of each task which takes time excessive contact switching can hurt performance now let's talk about parallelism this is where multiple tasks executed simultaneously using multiple cpu cores each core handles a different task independently at the same time imagine the kitchen with two chefs 1 chopped vegetables while the other could meet both chaps happen in parallel and the meal is very faster the system design concurrency is great for tasks that involve waiting like IO operations it allows other tasks to progress during the wait improving overall efficiency for example the Web Server can handle multiple requests concurrently even on a single core in contrast parallelism excels at heavy computations like data analysis or rendering graphics these tasks can be divided into smaller independent subtasks and execute simultaneously on different cores significantly speeding up the process let's look at some practical examples web applications use concurrency to handle user inputs database queries and background tasks movefully providing a responsive user experience machine learning leverages parallelism for training large models by distributing the training data across multiple cores or machines you can significantly reduce competition time video rendering benefits from parallelism by processing multiple frames simultaneously across different cores speeding up the rendering process scientific simulations utilise parallelism to model complex phenomena by whether patterns or molecular interactions across multiple processors big data processing frameworks such as Hadoop and spark leverage parallelism to process large studies as quickly and efficiently this is important to note that while concurrency and parallelism are different concepts they are closely related concurrency is about managing multiple tasks at once a lot of parallelism is about executing multiple tasks at once concurrency can enable parallelism by structuring programmes to allow for efficient parallel execution using concurrency we can breakdown a programme into smaller independent tasks make it easier to take advantage of parallelism these concurrent tasks can be distributed across multiple cpu cores and executive simultaneously so while concurrency doesn't automatically lead to parallelism it provides a foundation that make parallelism easier to achieve programming languages with strong concurrency primitives simplify writing concurrent programmes that can be efficiently parallelized concurrency is about efficiently managing multiple tasks to keep your programme responsive especially with IO bank operations parallelism focuses on boosting performance by handling computation heavy tests simultaneously by understanding the differences in interplay between concurrency and terrorism and leveraging the power of concurrency to enable parallelism we can design more efficient systems and create better performing applications.

### Linux Crash Course - Understand file permission.

Permission to maintain the file control in linux environment.

Ownership - Every file has 3 types of owner - **Owner(users), Group and Others.**

**User -** the owner who created the directory. They have the most control over it.

Group - consists of users who share the same permission to access the file or the directory.

Others - who are neither the owner or the members of the group.

To manage access linux uses 3 types of permissions - Read(r), Write(w) and Execute(x).

Read - allows users to open and read file content.

Write - allows modifying and editing file content.

Execute - allows the file to run as a program.

Permissions are represented in three ways **binary**, **octal** and **string** representation.

{{<figure src="/images/SystemDesign/Permission.png" alt="Permission." caption="Permission.">}}

{{<figure src="/images/SystemDesign/ReadWriteExecute.png" alt="ReadWriteExecute." caption="ReadWriteExecute.">}}

Considering the permission rwx - 111 in binary. In octal 7(read 4, write 2 and execute 1).

Using the `chmod 764 sample.txt` command we can set the permission of the file.

{{<figure src="/images/SystemDesign/SpecialPermissionBit.png" alt="SpecialPermissionBit." caption="SpecialPermissionBit.">}}

Special Permission Bit.

The Special permission bit provides additional control over the files and directories.

The `setuid` bit when set on an executable files allows it to run with the permission of the file owner, not the user running the file. This is useful for tasks that require higher privileges.

For example the password command which changes the user password has the `setuid` bit set. This allows regular users to change their password.

```yaml
ls -l /usr/bin/passwd
-rwsr -xr -x. 1 root root 27832 June 10, 2006 /usr/bin/passwd
```

When they `setuid` bit is set the execute bit for the owner shows as s in -rwsr. The bit can be set on files and directories.

The `setgid` bit can be set on files or directories. On an executable file, it allows the file to run with the permission of the group that owns the file. On a directory, it ensures that new files and subdirectories created within the directory inherit the group ownership of the directory.

This is useful for shared project directory ensuring all files created within have the same group ownership, allowing team members the necessary access permissions. When they `setgid` bit is set the execute bit for the owner shows as s in -sr.

```yaml
ls -l /usr/bin/write
-rwxr -sr -x 1 root tty 19536 August 4, 2006 /usr/bon/write.
```

The sticky bit when set on a directory ensures that only the file owner the directory owner Or the root user can delete or rename the file within the directory.

It is commonly used on directory like `/tmp` to prevent users from deleting each others file.

```yaml
dr wx rwx rwt
```

When the sticky bit is set the execute bid for others is shown as t. 

To set the special permission we can use the CHMOD command with specific symbol or numeric representation.

For setuid use u+s or 4

For setgid use g+s or 2

For sticky bit use +t or 1

Example we want to set the setuid bit on an executable file named important_script 

{{<figure src="/images/SystemDesign/Script.png" alt="Script." caption="Script.">}}

In the command 4 set the setuid bit, 7 gives the owner read, write and execute, 5 gives group and others read and execute permissions.

### Session vs JWT.

First let's walk through the flow of session based authentication the user says they're logging credentials to the server the server verifies these credentials if they're valid it creates a new session the server then stores the session data typically in a database or in memory cache like Redis this data may include user id session exploration time and other metadata the server sense packet response with a unique session id usually in the form of a cookie on subsequent requests the clients automatically sends the session id token with each request the server takes the session id looks at the corresponding session data in the session store and uses that data to authenticate and process the request the key point is that recession based authentication the server is responsible for creating and storing the session data it uses the session id as a key to retrieve this data on future requests 1 advantage of sessions is that revoking a session is straightforward since the session data is stored on the server the server can simply delete or invalidate the session at anytime however in a distributed system where your application runs on multiple servers all those servers need access to the same session data this is typically achieved by using a centralised session store that all servers access like Redis or distributor sql database all this works well it does add some complexity and potential in C to each request as the server needs to make a separate trip to the session store now let's look at the flow of job base of the location first the issue says they are locking credentials to the server the server verifies these credentials if they are valid it generates a job the server sides the jot with a secret key this signature ensures the integrity of the token preventing tempering the server that sends back the job to the client typically in the response body the client source to jot usually in local storage or in cookie on subsequent requests the client says to jog in the request headers the server verifies the jot signature it is valid the server trusted data in the token and uses it for authentication authorization the critical difference here is that with jobs the server doesn't store any session state or the necessary data is contained within the token itself.

Which is store on the client this makes charts stainless for signing charts there are several algorithms available with Hmac Rsa and ect being the most common symmetric signing method which means that the same secret key is used to sign and verify the token this is simpler and more efficient but it requires sharing the secret key with any service that needs to verify the token which can be a security concern rsa and ectsa on the other hand are asymmetric signing methods they use a private key to sign a token in a public key to verify it this allows for a more secure architecture where the private keys kept secret and only used for signing while any service can verify the token using the public key however this **** complexity and computational overhead compared to Hmac the choice of signing algorithms depends on your security requirements and system architecture if you have a monolithic application or trust all the services in your system each mac might be sufficient but if you have a microservices architecture or need to share jobs with untrusted 3rd party services rsa or ecdsa provide a more secure solution 1 talent with jobs is handling token exploration if a token is stolen it can be used until it expires to mitigate this you can use refresh tokens in combination with short lived access tokens the access token is the actual job useful authentication on issue request it has a short expiration time typically around 15 minutes the refresh token on the other hand has a much longer expiration time perhaps several days or weeks when access token expires instead of requiring the use of the login again the client can send a refresh token to a special token endpoint on the server the server cheques if the refresh token is valid and hasn't been revoked if everything cheques out the server issues a new access token this process happens behind the scenes without requiring indirection from the user this approach strikes a balance between security and user experience the short lived access token limit the window of potential misuse if a token is stolen while the long lived refresh token allow users to remain authenticated for an extended. Without needing to lock in repeatedly it's important to note that the refresh token is only sent when the access token has expired not on every request the access token is sent on every request that we require authentication so why should you use session based authentication and when adjust a better choice session based authentication is a good fit when you need the ability to revoke sessions instantly if a user reports that can is compromised you can immediately invalidate a session on the server side sessions are a good choice if you already have a centralised data store for other purposes in this case you can leverage that existing infrastructure for session storage as well however it's important to keep in mind that using a centralised session store does **** latency to each request as the server needs to fetch the session data from the store finally sessions keep sensitive data on the server which can be a security advantage on the other hand just a great choice when you need a stylus architecture because just store all the necessary data in the token itself your server doesn't need to keep track of sessions in memory or in the database this makes it much easier to scale your application horizontally across multiple servers charts are also useful when you need to share authentication data with other services for instance in a microservices architecture a chat generated by a authentication service can be verified and trusted by other services without needing to contact the authentication service on each request if you do choose dots consider implementing refresh tokens to balance security and user experience refresh token allows you to use short lived access token to limit the window of potential misuse while still allowing users to remain authenticated for the extended. Ultimately the choice depends on the specific needs and architecture of your applications.

### Papers to understand.

### Linux Performance Tools.

### How Internet works.

The internet started with ARPANET in 1960s. The TCP IP is founded in 1970s. The Email and DNS started in 1980s and WWW in 1990s. In 2000s the mobile internet and social media.

### HTTP1 HTTP2 HTTP3.

{{<figure src="/images/SystemDesign/Http1Connection.png" alt="Http1Connection." caption="Http1 Connection.">}}

There is a TCP handshake security and all happens for every resource, image, file.

### How search works.

### Gen AI.

### Kafka Use cases.

Critical challenges in modern software architecture kafka started as a tool for processing logs in linkedin it has since evolved into a versatile distributed event streaming platform his design leverages immutable append only logs with configurable retention policies these features make it useful for many applications beyond its original purpose let's start with log analysis this has evolved beyond campus original use of linkedin today's log analysis isn't just about processing logs it's about centralising and analysing logs with complex distributed system in real time kafka excels here because you can ingest logs from multiple sources simultaneously think microservices cloud platforms and various applications it handles this high volume while keeping latency low.

What makes modern rock analysis power focus calculus integration with tools like search lock dash icon this is not as an elk stack lock slash post locker it processes them and sends them to plastic search commander then let engineers visualise and analyse these blogs real time the second use case is real time machine learning techniques modern ml systems need to process later quickly and continuously caucus mean processing capabilities to pick it up this acts as a central nervous system for ML pipelines it's just made up of various sources it's gonna be user interaction devices for financial transaction this data flow through counter to ML models in real time for example in a ground detection system capital streams transaction data to models these models selected vicious activities the predicted maintenance by further sensitive data from machines to models the forecast savings campus integration with stream processing framework or spark streaming is clear these tools can reap the captain right complex competition for ML inference the right results back to Kafka for real time it's also worth mentioning counter streams this is countless native stream processing library it allows us to build saleable fault tolerance stream processing applications directly on top of Capco the 3rd use case is real time system monitoring well lock analysis helps investigate past events this use case is different it's about immediate protective system health tracking and adverting.

Dream processing applications continuously analyse it they can compute anomalies or trigger alerts or in real time compass the model shines here multiple specialised consumers can process the same stream of metrics without interfering with each other one might update dashboards and other can manage alerts 1 is 3rd to feed a machine learning model for predictive maintenance also persistence model allows for time travel debugging we can replay the metric stream to understand the system state leading up to an incident this feature can speed up with causeway analysis the 4th use case is change data capture cdc is a better use to track the capture changes in source databases it allows these changes to be replicated to other systems in real time this architecture essential help for streaming changes for source databases to various downstream systems this process begins with the source database system these are the primary databases where data changes occur these databases generate transaction logs more data modifications such as inserts updates and speeds in the order they occur the transaction log feeds into Kafka calculators change events in topics it's allowed multiple consumers to read from them independently this is where captains power is a scalable durable message broker comes into play the wolf data between captain and other systems we use captain connect this framework allows us to build and run various connectors for instance we might have an elastic search connector to stream data to elastic search for powerful search capabilities and a db conductor may replicate data to other databases for backup or sailing purposes the 5th use case is system migration kaka does more than just transfer data immigration it acts as a buffer between O and new systems you can also translate between them this allows a gradual low risk migrations calculus engineers implement complex migration patterns these include strangler fake and parallel run.

### Why Kubernetes popular.

### Scalability Explained.

### Components of Web Applications.

### How SSH really works.

SSH create a secure tunnel between client and server.

SSH2 provides more secure than SSH1.

```markdown
|SSH2|SSH1|
|---|---|
|Separate transport, authentication and connection protocols.|One monolithic protocol.|
|Strong cryptographic integrity check.|Weak CRC-32 integrity check.|
|No server keys needed due to Diffie Hellman Key exchange.|Server ey used for forward secrecy on the session key.|
|Supports public key certificates.|N/A.|
|Algorithms used - DSA, DH, SHA-1, MD5, 3DES, Blowfish, Twofish, CAST-128, IDEA, ARCFOUR.|RSA, MD5, CRC-32, 3DES, IDEA, ARCFOUR, DES.|
|Periodic replacement of session keys.|N/A.|
```

SSH client attempts to connect to a server it begins by establishing a TCP connection on port 22.

TCP connection is in place the client and server start version negotiation this step ensures both parties are speaking the same language agreeing on which version of the ssh protocol they will use for this session.

Next algorithm negotiation here the client is server decide which cryptographic algorithms there is used for key exchange encryption and integrity checking.

{{<figure src="/images/SystemDesign/SSH.png" alt="SSH." caption="SSH.">}}

This negotiation allows ssh to adapt to different security requirements and computational capabilities

We reach a critical step in the SSH handshake Key Exchange.

The client and server using elliptic curve Diffie Hellman method to generate a shared certificate in this process both sides generate ephemeral key pairs and exchange their public key to dynamically create shared secret for encryption. 

{{<figure src="/images/SystemDesign/SSHHandshake.png" alt="SSHHandshake." caption="SSHHandshake.">}}

The use of ephemeral keys provides perfect for secrecy meaning that even if the keys are compromised in the future pass session data were being secured.

{{<figure src="/images/SystemDesign/KeyExchangeAlgorithm.png" alt="KeyExchangeAlgorithm." caption="KeyExchangeAlgorithm.">}}

The shares secret key is then used for symmetric encryption which encrypts all the data transmitted during the ssh session.

Now their client initiates a login request to the server the server then performs a critical security cheque by looking at a matching public key in its authorised key files typically located in .ssh authorised keys on Unix file systems.

This method known as public key authentication is the most common way to verify their clients is allowed to connect to the server. SSH also support password based authentication although it's less secure compared to public key authentication. 

{{<figure src="/images/SystemDesign/SSHClientServer.png" alt="SSHClientServer." caption="SSHClientServer.">}}

If the server finds a matching key it encrypts a random number using the client's public key and sends it back to the client.

This challenge serves two purposes improves that the server has the correct public key and ensures that the client processes the corresponding private key.

The client that decrypts this random number using his private key but successfully decrypting the data and sending it back to the server the client proves his identity.

The server verifies the decryption confirming that the client is who it claims to be.

Once the authentication is complete the SSH session is fully established from this point on all commands sent from the client to the server encrypted with the session key.

The server executes these commands and cribs the result using the same session key and sends them back to the client.

The client then decrypts this result using the session key this encrypted back and forth continues for the duration of the SST session.

{{<figure src="/images/SystemDesign/SSHClientServerCommunication.png" alt="SSHClientServerCommunication." caption="SSHClientServerCommunication.">}}

SSH local forwarding which allows you to turn no other network services through the ssh connection this can be especially useful for accessing services that might otherwise be blocked by Firewalls or for adding a layer of security to an encrypted protocols.

### Big O Notation.

{{<figure src="/images/SystemDesign/BigO.png" alt="BigO." caption="BigO.">}}

{{<figure src="/images/SystemDesign/BigO101.png" alt="BigO101." caption="BigO101.">}}

The real world performance can differ due to caching, memory usage and hardware specifics.

With modern CPU maximizing the cash hit can sometimes be much more beneficial than optimizing the algorithm.

In a traversal the row by row is often faster than column by column. Row access maximize the sequential access and is cache friendly.

{{<figure src="/images/SystemDesign/Row-by-RowAndCol-by-Col.png" alt="Row-by-RowAndCol-by-Col." caption="Row-by-RowAndCol-by-Col.">}}

### API Paginations.

Pagination is a way to split the result into pieces and let client request them one at a time.

Instead of sending thousands of records at a time we sent them in batches of 10 or 100. It helps in the server load and reduces traffic and keeps our application more responsive.

{{<figure src="/images/SystemDesign/APIPagination.png" alt="APIPagination." caption="APIPagination.">}}

There are two main ways to handle pagination **offset based** and **cursor based**. 

Offset based pagination has 2 forms - **Page based and direct offset based**.

**Page based** set how many item we want per page then calculate where to start.

**Direct offset** use the offset and limit parameters directly. Basic offset query looks like `SELECT * FROM table LIMIT 10 OFFSET 20;`

Offset based pagination is easy to build but it has problem with large datasets. 

{{<figure src="/images/SystemDesign/OffsetBasedPagination.png" alt="OffsetBasedPagination." caption="OffsetBasedPagination.">}}

The database has to process every row to the offset before it can return results.

There is another problem when database changes fast then the offset based pagination can miss record or show them same data again the new data added will shift the data around.

Cursor based offset fixed the problem.

First pick an index column like an id as cursor then hash the cursor value for security.

Client sends their last scene cursor value. We use this cursor to filter and fetch the next batch. Send the result and new cursor for the last item. Client uses the new cursor for the next request.

{{<figure src="/images/SystemDesign/CursorBasedPagination.png" alt="CursorBasedPagination." caption="CursorBasedPagination.">}}

Cursor based pagination works really well with large data set as it stays consistent even when new records are added or deleted in between request. It is perfect for some real time feeds or any data that changes often.

Some cursor based implementation are Keyset-based pagination and Time based pagination.

Keyset pagination uses index keys such as primary key to retrieve the next set of result by directly accessing rows without scanning preceding ones.

Time based pagination uses timestamp as cursor to segment and retrieve the data within specific time ranges.

Cursor based methods for large and fast changing data set.

### Apache Kafka Fundamentals.

Kafka is a distributed event store in real time streaming platform it was initially developed at LinkedIn and has become the foundation for data heavy applications.

{{<figure src="/images/SystemDesign/ApacheKafkaArchitecture.png" alt="ApacheKafkaArchitecture." caption="ApacheKafkaArchitecture.">}}

Every piece of data Kafka handles is a **message**. 

Kafka messages three parts - headers which carry metadata, the key which helps the organization and the value which is the actual deploy payload.

**Topic and Partition** - Kafka organizes the messages using the topic and partitions. The structure the data streams within each topic goes a step further by dividing it into partitions. These partitions are key to Kafka scalability because they allow messages to be processed in parallel across multiple consumers to achieve high throughput.

{{<figure src="/images/SystemDesign/ApacheKafka.png" alt="ApacheKafka." caption="ApacheKafka.">}}

Multiple consumers to achieve high pumping capital cross

**Why most company uses Kafka?**

Kafka is creating a handling multiple producers sending data simultaneously without performance degradation. It also handles multiple consumers efficiently by allowing different consumer groups to read from the same topic independently.

Kafka tracks was being consumed using consumer offset store with the counter itself this ensures that consumers can resume processing for where they left on the case of failure.

On top of that Kafka provides this space retention policies to allow us to store messages even after they've been consumed based on time or size limits we define nothing is lost unless we decide it's time to clear it.

Kafka scalability means we can start small and grow as the needs expand.

**Producers** - Applications that create and send messages to Kafka. Producers batch messages together to cut down a network traffic they use partitioners to determine which partition a message should go. No key is provided messages are distributed randomly across partitions if a key is present messages with the same key are sent to the same partition for better distribution.

On the receiving end we have consumers and consumer groups. Consumers within a group share responsibility for processing messages from different partitions in parallel. Each partition is assigned to only one consumer within a group at any given time. If one consumer fails another automatically takes over its workload to ensure an uninterrupted processing.

Consumers in a group divide up partitions among themselves through coordination by Kafka's group coordinator.

{{<figure src="/images/SystemDesign/ConsumerGroup.png" alt="ConsumerGroup." caption="Consumer Group.">}}

When a consumer joins or leaves the group calculus triggers a rebalance to redistribute partitions among the remaining consumers.

The Kafka cluster itself is made up of multiple brokers. This server store and manage of data to keep a data safe each partition is replicated across several brokers using a leader follower model.

If one broker fails another one steps in as new leader without losing any data.

{{<figure src="/images/SystemDesign/FaultTolerantMechanism.png" alt="FaultTolerantMechanism." caption="Broker Resilience at its Finest.">}}

In earlier versions Kafka relies on zookeeper to manage broker metadata and leader election.

{{<figure src="/images/SystemDesign/Zookeeper.png" alt="Zookeeper." caption="Zookeeper.">}}

Newer versions are transitioning to craft a building consensus mechanism that simplifies operations by eliminating zookeeper as an external dependency while improving scalability.

{{<figure src="/images/SystemDesign/Kraft.png" alt="Kraft." caption="Kraft.">}}

**Kafka in real application.**

It's widely used for log aggregation for thousands of servers.

{{<figure src="/images/SystemDesign/LogAnalysis.png" alt="LogAnalysis." caption="LogAnalysis.">}}

The most chosen for real time events streaming for various sources.

{{<figure src="/images/SystemDesign/RealTimeEventStreaming.png" alt="RealTimeEventStreaming." caption="RealTimeEventStreaming.">}}

Change data capture it keeps database synchronize across systems.

It is invaluable for system monitoring by collecting metrics for dashboards and alerts across industries by finance healthcare retail and IOT.

### Most important system design concepts.

{{<figure src="/images/SystemDesign/MostImpSysDesignConcept.png" alt="MostImpSysDesignConcept." caption="Most Important System Design Concept.">}}

Read Heavy System - Use cache. 

Write Heavy - Logging System processing millions of events per second, social media handling users interactions.

Managed in two different ways - Asynchronous write with message queue, LSM Tree based database like Cassandra.

These databases collect writes in memory and periodically flushes them to disk as sorted files. To maintain performance they perform compaction merging files to reduce the number of lookups required during reads. It make the write fast and the read slower as it see multiple files.

System with single database server is a fail. It solved with redundancy and failover. Implementing database replication with primary replica instances. It increases availability but introduces a complexity in consistency management. We must use synchronous replication to prevent data loss and accept higher latency.

Synchronize application to avoid data loss or asynchronous application to improve the performance with a slight risk to lose data during failures.

Some systems even use quorum based replication to balance consistency and availability.

Critical system like payment requires high availability and that may need load balancing and replication together.

Load balancer distribute traffic across surf cluster and read out during failure. Primary replica setup is standard the primary handles the write and the multiple replica handles the read. Failover ensures a replica becomes the leader and become the primary. 

Multiple primary replication is another option for distributed write geographically.

Performance becomes critical when serving users globally. In America user should not wait to load the data from servers in Europe. CDN solves this by caching content closer to user and dramatically reduces the latency.

Static content like videos and images are perfectly with CDN's. For dynamic content solutions like edge computing can complement CDN cache.

Different types of content need different cache control headers longer duration for media files, shorter for user profiles. 

Managing large amount of data brings its own challenges modern platform use two different type of storage **block storage and object storage.**

**Block storage** with its low latency and high IOPS is ideal for databases and frequently accessed small files.

**Object stories** on the other hand cost less and is designed to handle large statistics videos in backup at scale.

Most platform combines these user data goes into block storage and media files are stored into the object storage.

Modern monitoring system like Prometheus collects the log and metrics and Grafana provides a visualization. 

{{<figure src="/images/SystemDesign/MonitoringTool.png" alt="MonitoringTool." caption="MonitoringTool.">}}

Distributed tracing tools like OpenTelemetry helps debug performance bottle neck across components.

{{<figure src="/images/SystemDesign/TracingTool.png" alt="TracingTool." caption="Tracing Tool.">}}

At scale managing this flood update is challenging. 

The key is to sample routine events keep detailed logs for critical operations and setup alerts that trigger only for real problems.

{{<figure src="/images/SystemDesign/Event-Log-Alert-Trigger.png" alt="Event-Log-Alert-Trigger." caption="Event-Log-Alert-Trigger.">}}

The most common issue is monitoring reveals his slow database queries. 

{{<figure src="/images/SystemDesign/MonitoringExecutionTime.png" alt="MonitoringExecutionTime." caption="Monitoring Execution Time.">}}

Indexing is the first line of defense.

Without indexes the database scans every record to find what it needs with index it can quickly jump to the right data. 

**Composite index** for multi column queries can further optimise performance. 

{{<figure src="/images/SystemDesign/CompositeIndex.png" alt="Composite Index." caption="Composite Index.">}}

Every index slow down the write slightly since they need to update as data changes.

**Sharding** splitting the data in to multiple machines using strategies like range based or hash based distribution.

{{<figure src="/images/SystemDesign/Sharding.png" alt="Sharding." caption="Sharding.">}}

### API vs SDK.

{{<figure src="/images/SystemDesign/APIVsSDK.png" alt="APIVsSDK." caption="APIVsSDK.">}}

API - Application programming interfaces are universal translators they let different software applications talk to each other instead of building everything from scratch

API use REST architecture in a way of communicating through http requests.

SDK - Software Development Kits APIs are the raw connection points between services SDK are like prebuilt toolboxes that make those connection easier to use they handle the complex technical details so we can focus on building features.

{{<figure src="/images/SystemDesign/SDK.png" alt="SDK." caption="SDK.">}}

SDK is a complete package it comes with tools, libraries and documentation everything we need to build apps with specific platforms Android or IOS.

A well designed SDK takes all those platform complexities and simplifies them making sure our apps behave consistently across different devices many.

SDK come with pre built api clients that make integration easy these clients handle all the technical heavy lifting they manage authentication, they format request properly, they try complicated responses into data that's easy to use in our code.  

Instagram's SDK instead of writing hundreds of lines of code to connect with Instagram's api the SDK lets us add a shared Instagram feature with minimal effort.

**When should we choose between an API and SDK?**

Direct api integration makes sense when we need  complete control over our project it's a good choice when we want to keep our dependencies minimal and sometimes we might be working with a platform that doesn't have an SDK that's when APIs become our best friend.

SDKs take a different approach they're fantastic when we need to move fast and get a product to market quickly they come back with best practices built right and if we need special features for specific platforms SDKs are often the way to go.

Many successful apps use both SDKs for their main use cases and direct api access for custom features.

Together these tools form the building blocks of modern software development.

### What is Load Balancer.

Load Balancer is a software component that distributes the network and the application traffic across multiple servers.

It helps distribute the workload preventing any single server becoming the bottleneck. 

It enables to scale the application dynamically add and remove server as needed.

It reduce latency and improves response time. 

Distributing the request across multiple server enhances availability by providing redundancy and failover option.

{{<figure src="/images/SystemDesign/TypesOfLoadBalancer.png" alt="TypesOfLoadBalancer." caption="Types of Load Balancer..">}}

{{<figure src="/images/SystemDesign/APICommunicationToAppsSDKToolboxToBuildApp.png" alt="APICommunicationToAppsSDKToolboxToBuildApp." caption="API Communication To Apps SDK Tool Box to Build App.">}}

Hardware Load Balancer - High demand enterprise environments in dedicated data centers.

Load Balancer can also be classified by the network layer in which they operate.

{{<figure src="/images/SystemDesign/LoadBalancerClassifiedByNetworkLayer.png" alt="LoadBalancerClassifiedByNetworkLayer." caption="Load Balancer Classified By Network Layer.">}}

Layer 4 load balancer operate at the transport layer. It take the routing decision based on the IP addresses ports and TCP or UDP. They don’t consider the content of the request so it is faster. It is used for simplicity and efficiency.

Layer 7 load balancer operates at the Application layer at the HTTP and HTTPs. It enables the routing decision based on the content of the topic and content based routing. It can perform the SSL termination at the load balancer itself improving performance by offloading encryption and decryption from backend servers and centralizing SSL certificate management.

Global Server Load Balancing operate at higher level enabling traffic distribution across multiple location. GSLB consider the factor like user proximity to data center and the health of the backend infrastructure across the globe. They can use DNS based routing or any cast routing to direct the user to the nearest available data center.

Load balance to distribute the traffic using any of this selected algorithms.

{{<figure src="/images/SystemDesign/LoadBalancerAlgorithm.png" alt="LoadBalancerAlgorithm." caption="Load Balancer Algorithm.">}}

Load balance distribution algorithm.

Sticky Round Robin ties a client to a specific server by creating a session ID.

Weighted load balancer meaning assigning a weight to the particular server allowing the load balancing to send proportionately high number of requests to the capable server.

IP URL Hash where it is a bit different from the session round Robin where it will use a hash and redirect all the same ip route to the same server.

### Why is Docker important.

{{<figure src="/images/SystemDesign/DockerParts.png" alt="DockerParts." caption="Docker Parts.">}}

**DockerFile** - Defines the environment the application needs. It specify the base image and selecting only what is needed.

Get the light version and combine commands to reduce layers and remove build tools after compilations.

{{<figure src="/images/SystemDesign/DockerWorkflow.png" alt="DockerWorkflow." caption="Docker Workflow.">}}

### How Garbage collector works - Java, Python, Go.

The garbage collection mainly use the simple question like which object in the memory the program still use. It is answered through the concept of Reachability.

{{<figure src="/images/SystemDesign/GarbageCollectorReachability.png" alt="GarbageCollectorReachability." caption="Garbage Collector Reachability.">}}

Every program has GC roots and these are the starting points like Global variables `public int var` and stack references `int sum(int a, int b)`.

Any object that can be reached by following references from these roots is considered alive. Anything other than these are garbage.

{{<figure src="/images/SystemDesign/JVMMemoryGeneration.png" alt="JVMMemoryGeneration." caption="JVM Memory Generation.">}}

To efficiently manage the memory garbage collector Typically implement a generational hierarchy.

{{<figure src="/images/SystemDesign/ESO.png" alt="ESO." caption="ESO.">}}

This design is based on empirical observation. 

In java virtual machine is divided into 3 main areas - Young generation, old generation and meta space.

New objects start the life of the young generation Eden space If they survive multiple collections space they come to the survivor space in the Young generation.

The rare objects that persist even longer on the promotion to the old generation where collection happens less frequently but more thoroughly. The metaspace Java specific use class metadata to help reduce memory footprint in large application.

{{<figure src="/images/SystemDesign/YoungGenerationSurvivorSpace.png" alt="YoungGenerationSurvivorSpace." caption="Young Generation Survivor Space.">}}

Other languages uses each generational collection differently. V8 users for two generation system and .NET Garbage collector typically uses three generation system.

{{<figure src="/images/SystemDesign/YoungGenerationOldGeneration.png" alt="YoungGenerationOldGeneration." caption="Young Generation Old Generation.">}}

The most fundamental garbage collector strategy is the Mark and Sweep algorithm.

It happens in two phases it starts from the marked phase where it traverse all the references starting from the GC root marking each reachable object. In the sweep phase it reclaims memory from any unmarked object.

While effective this basic approach requires the application to completely pause during collection know as stop the world pause which can freeze the application for noticeable period of time.

The boss became more problematic when the heap size grows and application demands better responsiveness.

{{<figure src="/images/SystemDesign/MarkSweepAlgorithm.png" alt="MarkSweepAlgorithm." caption="MarkSweepAlgorithm.">}}

An advanced version is the Tri Color Mark and Sweep algorithm reduces the process by categorizing objects into three sets.

White Object are potential garbage. 

Grey object are known to be reachable but have not been fully explored.

Black object are both reachable and fully processed.

{{<figure src="/images/SystemDesign/TriColorMarkSweepAlgoritm.png" alt="TriColorMarkSweepAlgoritm." caption="TriColorMarkSweepAlgoritm.">}}

By maintaining these 3 distinct state the garbage collector can pause briefly to do initial marking then continuing examining grey object and their references while the application runs.

{{<figure src="/images/SystemDesign/ShortPause.png" alt="ShortPause." caption="ShortPause.">}}

This incremental approach avoids the long pause required by traditional mark and sweep where the entire object graph must be traced at once.

Java offers several GC algorithms - Serial, Parallel, CMS, G1 Heap Allocation.

{{<figure src="/images/SystemDesign/GCAlgorithm.png" alt="GCAlgorithm." caption="GCAlgorithm.">}}

Python uses a combination of reference counting and a cyclic garbage collector. 

The reference counting handles most cases By automatically de allocating objects when their reference drops to 0.

{{<figure src="/images/SystemDesign/CircularReference.png" alt="CircularReference." caption="Circular Reference.">}}

The cyclic collector cleans up circular references which the reference counting can manage.

{{<figure src="/images/SystemDesign/Deallocate.png" alt="Deallocate." caption="Deallocate.">}}

Go uses a concurrent mark and sweep collector which Operates alongside the application to minimise pause times.

{{<figure src="/images/SystemDesign/Go.png" alt="Go." caption="Go.">}}

It uses the tricolor algorithm to handle the reachability.

GC Drawback - Performance overhead and Memory Fragmentation.

GC can produce long pause which does not matter for many application but can cause an issue in latency sensitive systems. 

Some collectors leave gap in memory making allocation slower over time.

Memory management also involves balancing used pool and free pools to ensure efficient allocation and deallocation without fragmentation.

{{<figure src="/images/SystemDesign/UsedPoolFreePool.png" alt="UsedPoolFreePool." caption="UsedPoolFreePool.">}}

With garbage collection we usually lose fine grain controller over when clean up happens and it can lead to long pause.

### **Tips for designing fault tolerant systems.**

**Tips for designing Fault Tolerant System - Replication, Redundant, Fail Over, Load Balancing, Graceful degradation, Monitoring.**

Fault Tolerant meaning system continues to function even when some component fails.

Replication - Each data is stored in several nodes. Cassandra replicates the data into multiple cluster.

Redundancy - Additional component that can take over in case of failure. Active active set up and both component running and load balancer distributing traffic between the component. Active passive set up a backup instance is ready and only works when there is one failure. Storage system like RAID also follow redundancy. RAID 0 split data across disks for performance but offers no redundancy. RAID 1 mirrors the same data across multiple disks and follow redundancy.

System monitor the data and when any failure detected the system redirect the data to the standby server.

Load Balancer to distribute the request to multiple server to avoid the crash of one server. NGINX and HAProxy are some of the famous load balancer.

Even with the strategies there will some failure or the recover takes longer than expected this is where the graceful degradation comes in. Instead of making the entire system stop graceful degradation ensures the most critical feature keeps still functioning.

{{<figure src="/images/SystemDesign/PagerDuty.png" alt="PagerDuty." caption="Pager Duty.">}}

PagerDuty send the alerts any monitoring change.

### Most popular open source AI stack.

{{<figure src="/images/SystemDesign/AIStack.png" alt="AIStack." caption="AIStack.">}}

RAG - Retrieval-Augmented Generation.

### What are AI Agents.

### MCP - Model Context Protocol.

Text protocol on MCP 1 of the most significant investments in LLM integration released by Anthropic in late 2024 so what exactly is MCP that is called the model context protocol is an open standard that enables Seamless integration between AI models and cloud and external data sources of tools this is addressing a fundamental limitation that has helped ai assistance for reaching their potential before mcp connecting models to each new data source we Integration released by Anthropic in late 2024 autocyclod and external data sources of tools is addressing a fundamental limitation that has held back AI assistance for reaching their potential before mcp connecting models to each new data source require custom implementations which can get expensive mcp solve this by providing a universal open centre for connecting ai systems with data sources replacing fragmented integrations with a single protocol this means we can give ai systems access to databases file systems apis and other tools in a standardised way let's breakdown the architecture mcp follows a client server models with three key components hosts clients and servers hose are LLM applications by cloud desktop that provide their environment for connexions clients are components within the host that establish and maintain 1 to 1 connexions with external servers servers are separate processes that provide context tools and prompts to these kinds exposing specific capabilities to the standardised protocol let's I deep printed the five core primitive step power CP these primitives are the building blocks that enable standardised communication between AI models and external systems server supports 3 primitives 1st prompts these are instructions or templates that can be injected into the LLM context they guide how the model should approach certain tasks or data second resources structured data objects that can be included in the LOLMS context window they allow the model to reference external information 3rd tools executable functions that the LLM can call to retrieve information or perform actions outside its context by querying a database or modifying a file but the client side they are two primitive they are equally important 1st the root primitive think of it as creating a secure channel for file access it allows the ai application to safely work with files on your local system by opening documents reading code or analysing data files without giving any restricted access to your entire file system second the sampling primitive this enables a server to request a lm.

### System Design Tradeoffs - Part 1, 2.

{{<figure src="/images/SystemDesign/SystemDesignTopic.png" alt="SystemDesignTopic." caption="System Design Topic.">}}

The application needs to prioritize and pick the correct trade offs.

**Database** - SQL strong consistency, structure schema, query capabilities. It creates issue in the horizontal scaling and scalability. 

NoSQL solve the scaling issue and not maintain the consistency and structure.

In SQL all data are stored in different table to reduce redundancy. Application gets more data the cost of joins becomes more difficult and then denormalization comes into the picture. Normalization optimizes for the data integrity and storage and demoralization optimizes the read and cost of complexity in the query.

**CAP** - Strong consistency and Eventual consistency.

**Data Processing -** There are Batch Processing and Streaming.

Batch processing store the data and process at one go. It handles the computational efficiency and simpler error handling. There is latency and user needs to wait to get the insights.

Stream processing handles the data in real time as it arrives providing immediate results and enabling instant reaction to events. 

The tradeoff here is the efficiency and simplicity vs the immediate and responsiveness.

{{<figure src="/images/SystemDesign/SystemDesignTradeOff.png" alt="SystemDesignTradeOff." caption="System Design Trade Off.">}}

Vertical scaling increasing the power of the server. Horizontal scaling meaning increasing the number of server.

**Stateful and Stateless -** Game server needs to track the gamers position and need the state. Websocket server maintains persistent connections for chat applications. Trading platforms must track the session state for transaction. In these cases the stateful server is needed.

Modern architecture make stateless service for general application and stateful component for real time features.

**Cache -** Read-through and write-through.

{{<figure src="/images/SystemDesign/ReadThroughCache.png" alt="ReadThroughCache." caption="Read Through Cache.">}}

Read-through cache.

Read-through cache when the read is good. When there is new data then the write through cache needed.

{{<figure src="/images/SystemDesign/WriteThroughCache.png" alt="WriteThroughCache." caption="Write-Through Cache.">}}

Write-through cache.

User A update the change and User B will request the data then there can be inconsistency in the data. The inventory system, booking system the data is important.

Write through cache update it by using both the db and cache.

### API explained - 19th May 2025 completed.

{{<figure src="/images/SystemDesign/APILearningRoadmap.png" alt="APILearningRoadmap." caption="API Learning Roadmap.">}}

Application Programming Interface is a set of rules that allows system to communicate with each other.

There are 3 main types of APIs to know - Public API and Private APIs and Partner APIs.

Public API are open to anyone like Twitter or weather services.

Private APIs are connected internally within organization to connect with their systems.

Partner APIs are shared only with specific person who have the credentials.

{{<figure src="/images/SystemDesign/APIProtocol.png" alt="APIProtocol." caption="API Protocol.">}}

Video - API Protocol.

{{<figure src="/images/SystemDesign/HTTPStatus.png" alt="HTTPStatus." caption="HTTP Status.">}}

Http Status.

200 level - Success.

400 level - Something wrong with our request.

500 level - Something wrong at the server level.

Http Header and Cookies - Provide additional context and maintain the state across request.

Security.

Basic Auth - username and password.

Token Based Authentication - It provides temporary access tokens that can be revoked.

JWT - Json Web Token - It include digitally signed encoded user data within the token itself.

OAuth - It is standard for dedicated authorization across services.

Session Based Authentication - It is used in traditional web application by maintaining user state on the server.

API Documentation Tools.

{{<figure src="/images/SystemDesign/APIDocumentationTool.png" alt="APIDocumentationTool." caption="API Documentation Tool.">}}

Swagger and OpenAPI Specs are the online tool to make the documentation.

API Features involves - Pagination, Idempotency, URL Query Path Parameters, API versioning. It enhance visibility and resilience.

API Performance.

{{<figure src="/images/SystemDesign/APIPerformance.png" alt="APIPerformance." caption="API Performance.">}}

Caching to reduce server load and improves response time. 

Rate Limiting - To protect against abuse.

Database index improves query performance for accessed data.

API Gateway services is the centralized entry point for managing all API traffic.

{{<figure src="/images/SystemDesign/APIGatewayService.png" alt="APIGatewayService." caption="API Gateway Service.">}}

They handle request routing, authentication, rate limiting and monitoring. 

{{<figure src="/images/SystemDesign/PopularOptionOfAPIGateway.png" alt="PopularOptionOfAPIGateway." caption="Popular Options Of API Gateways.">}}

Popular options of API Gateway.

AWS API Gateway - Cloud Native applications.

Kong - Open source flexibility.

Apigee - Enterprise grade API management.

{{<figure src="/images/SystemDesign/APIIntegration.png" alt="APIIntegration." caption="API Integration.">}}

API Integrations.

Webhooks - Event driven Integrations.

Batch Processing - large data volumes.

Message queue - Ensure delivery between system.

### Trillions of Page - Google store the Page.

Patterns that enable high scale systems to handle massive data volumes efficiently.

{{<figure src="/images/SystemDesign/GoogleStorePage.png" alt="GoogleStorePage." caption="Google Store Page.">}}

**Data partitioning** - Data partitioning divides data set into smaller more manageable segments. There are mainly 2 approaches for data partitioning - **Vertical partitioning and Horizontal Partitioning**.

**Vertical Partitioning** splits table by column based on access pattern and data characteristics. Most access hot data to be stored separately from rarely accessed cold data. Large text fields and binary objects can be segregated from structured data to optimize storage IO pattern.

{{<figure src="/images/SystemDesign/VerticalPartitioning.png" alt="VerticalPartitioning." caption="Vertical Partitioning.">}}

For example user table can store basic information in one partition and large biography text in another partition.

**Horizontal partitioning -** Horizontal Partitioning divides table by lose typically using a partition key to determine which row belong in which partition. Works well when data can be cleanly divided based on specific attributes such as price range or geographic regions.

{{<figure src="/images/SystemDesign/HorizontalPartitioning.png" alt="HorizontalPartitioning." caption="Horizontal Partitioning.">}}

For example transaction table can be partitioned by month allowing queries for specific time period to access only relevant partitions.

**Database sharding** - Database sharding extends horizontal partitioning to distribute data across multiple independent database instances or server.

Partitioning generally happens on a single database and sharding spans across multiple database often separate physical machines.

Sharding distributes data using partition key and sharding strategies.

**Hash based sharding** applies a hash function to the shard key distributing data evenly but making range queries inefficient.

**Range base sharding** assigns rows to shards based on key ranges which optimizes for range queries but can create hotspot.

**Directory based** **sharing** uses a lookup service to map keys to shards. Flexibility and a added cost of additional complexity.

Major platform handles sharding to handle massive data volumes and write loads that can overwhelm a single database instance.

**Database indexing** creates auxiliary data structure that optimizes inquiry pattern at the expense of additional storage and right overhead. Modern Db implement various index types.

**BTree index** - BTree index are balanced tree maintenance stored data for range queries and point lookups.

**Hash index** - Hash index is provided direct key to location lookups but no range query support. 

**Bitmap indexes** - Bitmap indexes are efficient for low cardinality column like boolean flags or status codes.

**Inverted index** - Inverted index map content to records. Provide full text search capabilities. Placed index can transform a full table scan taking minutes into AB3 traversal completing in milliseconds.

Each additional index imposes some right overhead as the database must maintain the structures during inserts and updates. This is one of the trade off in database design.

**Replication** maintains copies of data across multiple nodes to improve risk in scalability and fault tolerance. 

There are three main approaches. 

**Single leader replication** all rights go to one leader node. The leader processes and stores the data it force this change to all replicas nodes. It creates a clear consistent order of operations.

**Multiple replication** allows right to accept by multiple leaders each student communicates their changes to other leader it improves right availability but introduces the challenging of handling conflict updates which requires complicated conflict resolution mechanisms like Last Write wins, Conflict-free Replicated Data Types CRDTs, Operational Transformation, Application-specific resolution.

**Leaderless system** multiple nodes can accept writes to maintain consistency. System implement quorum where operation succeeds when acknowledged by minimum numbers of nodes and read repair mechanisms that fix outdated data during read operations. When data is written by the leader but has not yet reached all replica we call this replication lag.

In **asynchronous system** this lack typically ranges from milliseconds to seconds depending on network conditions. 

Many system uses a semi-synchronous system a right is considered successful when at least one replica confirms receipt. Approach strikes the balance between performance and data durability.

**Caching** stores frequently access data in a rapid access storage tiers to reduce latency and backend load.

Modern system implement several key caching strategies. Cache aside also called lazy loading has the application check to cache first. When data is not found it fetches from the database and populates the cache for future request.

**Write through** caching synchronously updates both the cache and the database when data changes. This ensures consistency between cache and storage but increases write latency since each operation must complete in both systems.

**Write behind** cache or write back updates the cash immediately but asynchronously flushes changes to the database. It improves the write performance but introduces the risk of data loss during failure before data is persisted.

**Content delivery network or CDN** delivers content from server position close to end user to minimise network latency. The core principle of CDN is geography distribution with intelligent routing. The CDN routes the request to the optimal server through one of the several methods anycast, dns space redirection or http redirects.

**Scalability - Linear Scaling** is ideal scenario doubling the resources doubles the performance. Most system experienced sublinear scaling due to two factors **contentions** and **coherence** penalties. 

**Contentions** happens when components compete for shared resources like locks on network connections.

**Coherence** penalties occurs when the overhead of keeping data consistent across multiple locations. 

{{<figure src="/images/SystemDesign/CICD.png" alt="CICD." caption="CICD.">}}
