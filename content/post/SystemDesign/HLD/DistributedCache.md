+++
title = 'Distributed Cache'
date = 2024-12-24T00:04:11+05:30
url= "/post/systemDesign/hld/distributedcache"
tags = ['interview question', 'system design']
+++

## Distributed Cache and Caching Strategies - Cache Aside, Read-Through.

Cachig is a technique to stpre frequently used data ina fast access memory rather than accessing data every time from slow access memory.

Ram is faster than harddisk and db.

It makes the system fast. It helps to reduce the latency. It also helps to achieve the fault tolerance.

There are different types of caching present at different layer of the system like -
Client Sied Caching (Browser caching).
CDN(used to store the static data).
Load Balancer.
Server side Application Caching (Redis).

Redis sits between server and db.
Image.

### Distributed Cache.

App server1, App Server 2, App Server 3 all uses the same cache then it is single point failure.

Solution - use Distributed Cache.
There is cache pool and there are lots of cache server. There are also cache client.

Each app server has its own cache client and it connects with one cache server. It gets one cache server using the consistent hashing.

### Caching Startegy.

Cache Aside.

Read Through Cache.

Write Around Cache.

Write Through Cache.

Write Back Cache.

### Cache Aside.

Application first see the cache.

If data found in cache it is called Cache Hit and data is returned to the client.

When data not found in cache its called Cache Miss.

Application fetch the data from the DB store back to cache and data is returned to the client.

PROS.
Good in read heave application.
Even cache is down request willnot fail and it will fetch the data fro db.
Cache document data structure can be differnet from the data present in db. Db can store the details in different table and structure cache can store in other stiructure and enployee in one table. The data stired in db and cache may not be in same structure. Application is taking care to write the data in cache.

Cons.
For new data read there will be always a CACHE MISS first(We can resolve this by pre- heat the cache.)
Without appropriate caching is not used during Write operation. There is a chance of inconsistency between cache and db.

### Read Through Cache.

The cache libarary itsef fetch the data from the DB store it back to the cache and return to the application.

Image.

Pros - Logic of fetching the data from db and updating cache is separated from the application.

Cons - In new data there will be cache-miss (to resolve this generally we can pre heat the cache).

Without appropriate caching is not used during write operation. There is a chance of inconsistency between cache and db.
Cache document structure should be same as db table.

### Write Around Cache.

Directly writes the data into the db.
It donot update the cache. It make the cache invalidate and when new read comes to the cache it get the data from db then update the cache.

Pros - Resolves inconsistency problem between cache and db.

Cons - In new data there will be cache miss and it is resolved by pre heat the cache. db down then operation will fail.

### Write Through cache.

First write the data into cache then in synchronous manner write the data into the db.
Pros - Cache and db always consistent. Cache ht chance increases a lot.

Cons - Alone its not useful it will increase the latency. It is always used with cache aside or read through cache.

2 phase commit needs to be supported with this. Try maintain the transactional property.

Db is down write operation will fail.

### Write Back or Behind Cache.

Write the data into the cache. In asynchronous write data into the db.

Pros - Good in write heavy application.

Improves the write operation latency writing in the db happens asynchronously.

Cache hit chance increases a lot. Gives much better performance when used with read through cache.

Cons - Even when DB fails write operation will still works.

If data is removed from cache and db write still not happens then there is achance os an issue. It is handes by keeping the TAT of cache little higher than 2 days.
