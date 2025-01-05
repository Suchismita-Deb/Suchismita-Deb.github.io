+++
title = 'Discussion'
date = 2025-01-04T21:57:50+05:30

url= "/post/systemdesign/discussion"
tags = ['interview question', 'system design']
+++
## Patterns and Style.

### Requirements.  

Get the specific requirement - It not the entire system get the one that is most difficult or the interviewer wants to know.  
Design video streaming platform - then its like video upload and video see and not entire.

### Back of the envelope calculation.
When the interviewer wants to know about it.  
Get the estimate of number of read and number of write. The system is read optimize or write optimize.  
The storage is more then need to use partitioning and replication.
### API Design.
The main functions.

### Architectural Design.
The design of the component.
## Table of Content.

Database fundamentals.  
Data SerializationFrameworks.  
Replication.  
Sharding.  
Batch Processing.  
Stream Processing.  
Types of Storage.  
Caching.  
Load Balancing.  
Contending Updates.  
Change Data Capture.  
Fan Out/PreComputation.  
Location Based Search.  
Job Scheduling.  
Idempotence.  
Durable Data.

Majority system design falls under the bucket.

## Database Fundamentals.

### How the database works.

Database is a system that store the application state. Data is typically stored on hard disk so it is persistent.

Sequential read and write are always cheaper than random read and write.  
Keep the data that are frequently read together.  
Keep the data that are frequently written together.

Data stored in sorted manner will be easier to read - Database Index.

Index are feature supported by many database that allow us to speed up certain read queries and often at the expense of slowing down write queries.  
If we did not have an index, each database write could just be done sequentially in a "write ahead log". We would have to do a sequential scan over the entire table to find our row. x=5,y=10,z=15, x=20 . It continue the x=20 in a sequential manner and did not change the first one. When read it will see from the latest value. The read is O(N).

Index improves the read.
3 type of Index - Hash Index and B+ Trees and LSMTree and SSTable.

### Hash Index.

Keep all keys in memory in a hashmap with their corresponding address on disk.

Memory
x - 0x0345 y - 0xa23d

Disk
0x0345 - "Hello" 0xa23d - "World"

Pros - O(1) for read and write.

Cons - Keyset need to fit in memory. Poor support for range queries. Data in disk is not ordered by its indexed key.

### B+ Trees.

Organize a tree of keys on disk. Follow tree structure to get to your key and its corresponsing data on disk.

Pros - O(log N) read and write. Data from adjacent keys is stored adjacently on disk allowing for easier range queries. (Meaning reading data from 1 to 5 then here it is present in all adjacent place.)

Cons - Slower single jey read than the hash index.

### LSM Trees + SSTable.

Writes goes to the in memory binary search tree and it flushed to immutable sorted tables on disk when it gets too big. Reads for a key and first performed from the tree, and if not present we see each SSTable file from the newest to oldest.

It can be made faster by merging theSSTable th eprocess is Compaction. Need data structure like sparse index, bloom filter to make it faster.

BST are sorted so are SSTable - this index supports range queries.

O(log N) for writes and reads. Fast write to in memory.

Cons - Fairly slow reads due to having to see multiple different places for the value for a given key.

### Transaction.

Its an abstration supported by some databases - ACID.

- **Atomic** - Put all writes in a "write ahead logs" before writing them to their actual location on disk, mark them as committed in the write ahead log is complete (so if a write is uncommitted and the database fails we can replay the log entry).
- **Serializable** - It appears to the writer as if all transactions ran ona single thread, no need to worry about the race condition.

There are multiple ways of ensuring serializability in a database.

**Actually running on a single thread.**

**Pessimistic concurrency control**.  
Hold locks on all read-from and written-to database rows to prevent concurrent updates for the duration of the transaction, others must wait

**Optimistic concurrency control**.  
Allow transactions to proceed with no locks and abort any transactions that see that the data that they've read or written to has been modified.  
Since aborting is expensive, this tends to be better only in situations where there is very little contention across transactions

Row and Col data.
Image.
Column - Not taking the data in a row and put in disk, we take come column data and store it in disk.

Data serialization.
Image.

There is couple of data and we need to store in disk with 0 and 1. We can use protocol buffer.
