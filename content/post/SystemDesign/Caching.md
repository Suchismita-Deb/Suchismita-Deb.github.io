+++
title = 'Caching'
date = 2023-11-29T09:48:54+05:30
+++



### Caching every developer should know.
Caching enhance system performance and reduce response time.

![img.png](/images/img14.png)

From the front end to the back end, caching plays a crucial role in improving the efficiency of various applications and systems.

![img.png](/images/img15.png)

A typical system architecture involves several layers of caching.

At each layer, there are multiple strategies and mechanisms for caching data, depending on the requirements and constraints of the specific application.

![img.png](/images/img16.png)


Let’s first look the cache in the computer hardware.
* The most common hardware cache are L1, L2, and L3 caches.

* L1 cache is the smallest and fastest cache, typically integrated into the CPU itself. It stores frequently accessed data and instructions, allowing the CPU to quickly access them without having to fetch them from slower memory.

* L2 cache is larger but slower than L1 cache, and is typically located on the CPU die or on a separate chip.

* L3 cache is even larger and slower than L2 cache, and is often shared between multiple CPU cores.

Another common hardware cache is the **Translation Lookaside Buffer (TLB)**.

* It stores recently used virtual-to-physical address translations.

* It is used by the CPU to quickly translate virtual memory addresses to physical memory addresses, reducing the time needed to access data from memory.

![img.png](/images/img17.png)

At the operating system level, there are **page cache** and other **file system caches**.

* Page cache is managed by the operating system and resides in main memory.

![img.png](/images/img18.png)

* It is used to store recently used disk blocks in memory. When a program requests data from the disk, the operating system can quickly retrieve the data from memory instead of reading it from disk.

There are other caches managed by the operating system, such as the **Inode cache**.

* These caches are used to speed up file system operations by reducing the number of disk accesses required to access files and directories.

###  Caching in a typical application system architecture.

On the application front end, web browsers can cache HTTP responses to enable faster retrieval of data.

* When we request data over HTTP for the first time, and it is returned with an expiration policy in the HTTP header; we request the same data again, and the browser returns the data from its cache if available.

* **Content Delivery Networks (CDNs)** are widely used to improve the delivery of static content, such as images, videos, and other web assets.

* One of the ways that CDNs speeds up content delivery is through caching. When a user requests content from a CDN, the CDN network looks for the requested content in its cache. If the content is not already in the cache, the CDN fetches it from the origin server and caches it on its edge servers. When another user requests the same content, the CDN can deliver the content directly from its cache, eliminating the need to fetch it from the origin server again.



![img.png](/images/img19.png)


* Some load balancers can cache resources to reduce the load on back-end servers. When a user requests content from a server behind a load balancer, the load balancer can cache the response and serve it directly to future users who request the same content. This can improve response times and reduce the load on back-end servers.

Caching does not always have to be in memory. In the messaging infrastructure, message brokers such as Kafka can cache a massive amount of messages on disk. This allows consumers to retrieve the messages at their own pace. The messages can be cached for a long period of time based on the retention policy.

![img.png](/images/img20.png)

Distributed caches such as Redis can store key-value pairs in memory, providing high read/write performance compared to traditional databases.

![img.png](/images/img21.png)

Full-text search engines like Elastic Search can index data for document search and log search, providing quick and efficient access to specific data.

Even within the database, there are multiple levels of caching available.

![img.png](/images/img22.png)

* Data is typically written to a write-ahead log (WAL) before being indexed in a B-tree.

* The buffer pool is a memory area used to cache query results.

* The materialized views can precompute query results for faster performance.

* The transaction log records all transactions and updates to the database.

* The replication log tracks the replication state in a database cluster. 
