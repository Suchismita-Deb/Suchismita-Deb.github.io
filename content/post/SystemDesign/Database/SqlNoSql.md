+++
title = 'Sql NoSql'
date = 2025-01-04T21:51:01+05:30

url= "/post/systemDesign/database/sqlNosql"
tags = ['interview question', 'system design']
+++
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