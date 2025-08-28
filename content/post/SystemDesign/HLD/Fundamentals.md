+++
title = 'Fundamentals of System Design.'
date = 2023-11-23T17:57:52+05:30
url= "/post/systemDesign/fundamental"
tags = ['interview question', 'system design']
+++



## Monlith and Microservices.

Monolith doesnot need to be single in terms of number of machine we are running it on.

There can be multiple machines in monolith and the client can connect to any machines.

We can horizontally scale out in Monolith. Client directly talks with the monolith server.

* It is easy for small team and less work.
* Less duplication of code.
* It is faster. No need to make calls ovr the network. Procedure call is faster.
* All in the same machine so faster.

    - Deploment is complex. Any change the entire system needs to deploy.
    - Single point of failure. Multiple monolith server can work for horizontal scaling. So if anything goes wrong the server will be down.

Microservice is a single business unit. All data which are relevant to the service are in one service. We can separate services in pieces.

Like there is 3 Microservice in the system and they talk to the dedicated db.

Client connected to the Gateway and gateway connect to the Microservices.

* Easy to deploy. any new member will find easy to work in specific section.
* Architecture design is imp. If one server S1 is always talking to the other service S2 then there should no rtpc call and it should be only function call.

Cloud computing where the cloud service provider provides some computers for the computational purpose that act as a server.

When we get more request to handle the request we can **Buy bigger machines** means **Vertical Scaling** and **Buy more machines** means **Horizontal Scaling**.

---

|Horizontal Scaling|Vertical Scaling|
|:---|:---|
|LoadBalancing required. More machines which machine will handle which request should be determined by Load Balancing.|Not required.|
|Can handle request when one server fails.|Single point of failure.|
|More network calls(RPC Remote Procedure Calls.) It is slow.|Inter process communication. It is fast.|
|Data needs to travel to all the server and it is loose couple. To make the transaction atomic we need to stop all the other server works and it is not possible. Data inconsistent.|Consistent.
|Scales well.|Hardware Limit.|

---

### LoadBalancing and Consistent Hashing.
Lot of request is coming say the request id is from 0 to M-1.


The request id is send to the server. We take the request id r1 and then we hash it.

There are some hashing algorithm.
Say `h(r1) = m1` then to redirect we `m1%n` n is the number of server we have. Then we send the request to the respective server.

Say we have 4 server and after `h(10) - 3` say the hashing is making the value 3.
Then `3%4 = 3` So teh request will go to the 3rd server.

Hash function is random. So all server will have uniform load.

If there is X request each of the server will have `x/n` load and the load factor is `1/n`.

The request is generally not random it depends on the user id or anything.

Example. Say `h(39) = 15` and `15%4 = 1` Now the request will go to the 1st server.

Now the problem will arise when we want to add another server. Now that the request id is same when we change the n value the server number will change.

Generally for specific request fixed server takes care of it and the data is present in the cache of the server. Now everything is changed.

Now for this example `h(39) = 15` and `15%5 = 0`. Server count is 5.

We can see that in **Consistent Hashing**.

Pie diagram.

## SQL and NoSQL

**Structure** - SQL - RDBMS and table pre determined.  
**Nature** - All the data and the table is in one server and there can be multiple server based on sharding.  
**Scalability** - Vertical is only way and horizontal is not supported. Data stored in different place.  
**Property** - ACID. Data Integrity and Consistency.

NOSQL.

**Structure** - Key-Value Db(DynamoDb) - Search based on key, Document Db(MongoDB) json and search on key and value, Columnwise Db Key and the value is stored in column name and value the number if column can be dynamic, Graph Db node and edge social network and networking.  
**Nature** - Data stored in multiple node and it is distributed in nature.  
**Scalability** - It is mainly horizontal scaling.  
**Property** - BASE (Basically Available, Safe State and Eventual Consistency).

SQL Interview.

### Order of execution in SQL.

FROM - WHERE - GROUP BY - HAVING - SELECT - ORDER BY - LIMIT.

| Clause   | Function                                   |
|----------| ------------------------------------------ |
| FROM     | Choose ad join table to get the base data. |
| WHERE    | Filter the base data.                      |
| GROUP BY | Aggregate the base data.                   |
| HAVING   | Filters the aggregated data.               |
| SELECT   | Returns the final data.                    |
| ORDER BY | Sort the final data.                       |
| LIMIT    | Limit the returned data to a row count.    |

SELECT category, AVG(sales) AS avg_sales FROM SalesData WHERE year>2020 GROUP BY category HAVING COUNT(\*)>10 ORDER BY avg_sales DESC LIMIT 3;

| Category    | Avg_sales |
| ----------- | --------- |
| Electronics | 128       |
| Utensils    | 91        |
| Books       | 89        |

First it will take the FROM then condition and group and condition and order.

### Find monthly sales and sort in desc order.

| Order_date | Sales |
| ---------- | ----- |
| 2021-01-01 | 20    |
| 2021-01-02 | 32    |
| 2021-02-08 | 45    |
| 2021-02-04 | 31    |
| 2021-03-21 | 33    |
| 2021-04-06 | 19    |
| 2021-04-07 | 21    |
| 2021-04-22 | 10    |

Output

| Years | Months | TotalSales |
| ----- | ------ | ---------- |
| 2021  | Feb    | 76         |
| 2021  | Jan    | 52         |
| 2021  | Mar    | 52         |
| 2021  | Apr    | 31         |

SELECT YEAR(Order_date) AS Years, MONTH(Order_date) AS Months, SUM(Sales) AS TotalSales FROM Products GROUP BY YEAR(Order_date), MONTH(Order_date) ORDER BY TotalSales DESC;

### Find the candidate who is proficient in Python, SQL, PowerBi. Write the query to list the candidate who possess all of the required skills for the job. Sort the output by candidate Id in asc order.

| Candidate_id | Skills  |
| ------------ | ------- |
| 101          | PowerBi |
| 101          | Python  |
| 101          | SQL     |
| 102          | SQL     |
| 108          | Python  |
| 108          | PowerBi |
| 108          | SQL     |

Output

| Candidate_id | Skill_count |
| ------------ | ----------- |
| 101          | 3           |
| 108          | 3           |

SELECT Candidate_id, COUNT(skills) FROM Applications WHERE skills IN ("Python","SQL","Power Bi") GROUP BY(Candidate_id) HAVING COUNT(skills)=3 ORDER BY (Candidate_id) ASC;

### What is a Trigger in SQL.

### Normalization.

### What is Truncate, Delete, Drop statement.

### What are rank, dense_rank and row_number.

### What are clustered and non clustered index in SQL.