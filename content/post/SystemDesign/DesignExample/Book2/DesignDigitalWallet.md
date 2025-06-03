+++
title = 'Design Digital Wallet.'
date = 2025-06-03T10:05:46+05:30
url= "/post/systemdesign/designexample/DesignDigitalWallet"
tags = ['interview question','system design']
categories = ['low level design','system design']
+++
Used can store money in the wallet and spend it later. User can use a platform like Amazon Pay, PayPal and directly transfer money to someone else's wallet on the same platform. Direct transfer between the wallet is much more faster and it does not charge any extra fees.

Design the back end of a digital wallet application that supports cross wallet balance transfer operation.

### Functional Requirement.

Focus on the balance transfer operation between two digital wallet.

Total of 1 million transaction per second.

There should be a strict requirement of correctness and the digital wallet should do perform the transactional guarantee.

Providing correctness - Correctness is usually only verifiable after the transaction is complete. Go to verifies to compare our internal records with the statement from the bank. Vetication of reconciliation is that its only show the discrepancies and cannot tell how a difference was generated. So we would like to design a system with reproducibility meaning We could always reconstruct historical balance by replaying the data from the very beginning.

The availability requirement is 99.99%.

We don't need to add foreign exchange in our requirement.

### **Back of the envelope estimation.**

We have to use a transactional database.  
Today any relational database running on a typical data center node can support a few 1000 transaction per second. In some table we can see that the performance benchmark of some of the popular transactional database server.

Let us assume that one database node can support 1000 tps in order to reach one million tps we need 1000 database nodes.

However this calculation is partial each transfer command requires two operation deducting the money from one account and depositing 1 to another account. To support 1 million transaction per second the system should be able to handle up to 2 million transaction which means we need 2000 nodes.

|Pre-node TPS|Node Number|
|---|---|
|100|20,000|
|1000|2000|
|10,000|200|

In this table we can see the total number of nodes required when the “pre-node TPS”(the TPS a single node can handle) changes. Assuming hardware remains the same the more transaction a single node can handle per second the lower the total number of nodes required indicating lower hardware cost. One of our design goal is to increase the number of transaction a single node can handle.

### High Level Design.

**API Design.**

**3 high level design.**  
Simple in memory dissolution.  
Database-based distributed transaction solution.  
Event sourcing solution with reproducibility.


### API Design.
POST `/v1/wallet/balance_transfer` - Transfer balance from one wallet to another.

Request parameter are given.  

| Field          | Description                | Type    |
|----------------|----------------------------|---------|
| from_account   | The debit amount.          | String. |
| to_account     | The credit account.        | String. |
| amount         | The amount of money.       | String. |
| Currency       | The currency type.         | String. |
| transaction_id | ID used for deduplication. | UUID.   |

Sample response body.
```json
{
  "Status": "success",
  "Transaction_id": "UUID"
}
```

The amount type should be string and not double.

### In-memory sharding solution.
The wallet application maintains an account balance for every user account. Credit structure to represent `<user, balance>` relationship is a map which is also called hash table.

For in memory store one popular choice is Redis. One ready snow is not enough to handle 1 million of TPS. To set up a cluster of Reddys not an evenly distributed user accounts among them. This process is called partitioning or sharding.

To distribute the key value data among end partition we could calculate the hash value of the key and divide it by N. The reminder is the destination of the partition. The code below shows the sharding process.

```java
String accountId = "A";
Int partitionNumber = 7;
Int myPartition = accountId.hashCode() % partitionNumber;
```

The number of partitions and addresses of all Redis note can be stored in a centralised place. Zookeeper is a highly available configuration storage solution.

The final component of the solution is a service that handles the transfer commands. We call it the wallet service and it has several key responsibilities.  
Received the transfer command.

Validates the transfer command.

If the command is valid, It updates the account balance for the two users involved in the transfer. Clustered the account balance are likely to be in different Redis nodes.

The wallet service is stateless its easy to scale horizontally.