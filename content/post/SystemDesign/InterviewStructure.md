+++
title = 'Interview Structure in System Design.'
date = 2025-01-12T18:42:05+05:30
url= "/post/systemDesign/interviewStructure"
tags = ['interview question', 'system design']
+++

## Replication.

The database may and will fail. When a system has only one database and the read and write througput is limited to the single node.

We should have multiple copies of the data. Replication can allow us to - Witstand hardware failures.  
Improve our database performance.

Replicas will send data to one another via a "replica log", which is very similarto write ahead log.

### Replication - Synchronous and Asynchronous Replication.

Syynchronous Replication (Strong Consistency) - On a write all replica must process the data before the write is considered committed.

Pros - Any read to a replica will return up to date data.
Cons - A single replica is down we cannot commit any writes.

Asynchronous Replication(Eventual Consistency) - On a write, only a subset replicas must process the data before the write is considered committed. Other replicas will be backfilled in the background.

Pros - Writes can tolerate some node failures. Wrires are faster.  
Cons - Reading from certain nodes can return stale(old) data.

Discussing about the asynchronous replication.

### Single Leader.

All writes go to one leader database, which are asynchronous replicated the followers databases. Reads can come from either the leader or follower.

Pros - Simple to implement.  
Cons - Write throughput limited to the lead

### Database Indexing.

B+ Tree and DataPage.

### How table data rows are actually stored?

DBMS creates Data Pages generally one data page is 8KB but depends upon Db to Db.  
Each data page can store multiple table rows in it.

Image of Datapage.

There is a header and data records and offset.

Data records are the row.

### What type of Indexing present?

### Understand the data structure used for indexing.
