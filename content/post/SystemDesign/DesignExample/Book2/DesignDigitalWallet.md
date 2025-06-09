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



{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/In-memorySolution1.png" alt="Subset" caption="In-Memory Solution">}}


Here we have three ready notes. Sri Client AB and C. Record balance revenge is spread across the three reddish node. Two wallet service node in this example that handles the balance transfer request. Of the wallet service not receives the transfer amount which is to move $1 from client A to client B it issues 2 command to two Redis Node.

For the Redis node that contains client ‘s account, The wallet service deduction $1 from the account. For the client B the wallet service adds $1 to the account.

In this particular design the account balance is spread across multiple readies notes and zucchini is used to maintain the starting information. Necklace wallet service uses the sharding information to locate the Redis note for the clients and update the account balance accordingly.

This design works but then it does not support the correctness requirement. The wallet service update the two ready store for each transfer. Is no guarantee that both updates would succeed. The wallet service note crash after the first update and the second update is not done it would result to an incorrect transfer. The two update needs to be in a single atomic transaction.

Distributed transaction.

Database Sharding.

**How do we make the update to two different storage notes atomic?**

The first step is to replace each ready note with transactional relational database node. Time the client ABNC are partitioned into three direction and databases rather than 3 Redis nodes.

Usually a transaction database only solves a part of the problem its very likely that one transfer command will need to be updated to accounts into different databases. No guarantee that two updated operation will be handled at exactly same time. The wallet service restarted right after it updated the first account then the second account will not be updated.

**Distributed transaction - Two-phase commit.**

Indian distributed system a transaction may involve multiple processes on multiple nodes. To make a transaction atomic the distributed transaction might be the solution. There are two ways to implement a distributed transaction a low level solution and a high level solution.

The low level solution relies on the database itself. Commonly used teleport rhythm is a two phase commit 2PC. As the name implies it has two phases.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/2PC.png" alt="Subset" caption="2 Phase Commit">}}

The coordinator that is the wallet service performs read and write operation on multiple databases as normal. Both database A and B are locked.

When the application is about to commit the transaction the coordinator asks call database to prepare for the transaction.

In the second phase the coordinator collect replies From all databases and perform the following operations if all database reply with a yes the coordinator ask all database to commit the transaction they have received. Any data mis replies with another coordinator ask all database to abort the transaction.

It is a low level solution because the prepared step requires a special modification to the database transaction.

There is an ex by Open XA standard that coordinates heterogeneous database to achieve two BC.

The biggest problem is 2PC is that it's not performant as lock can be held at a very long time while waiting for a message from the other notes. Another issue with two PC is that the correlator can be a single point of failure.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CoordinatorCrashes.png" alt="Subset" caption="Coordinator Crashes.">}}

Distributed transaction try confirm cancel.

TC/C Is a type of compensating transaction that has two step.

In the first phase the correlated asks all databases to reserve resources for the transaction. In the second phase the correlator collects replies from all the databases.

If old database replies with ES the coding are called database to confirm the operation which is a try confirm process.

If any database replies with no The coordinator asks all database to cancel the operation which is a try cancel process.

It is important to note that the two phases in 2PC are wrapped in the same transaction but in TC/C each phase is a separate transaction.

**TC/C Example.**

It is very easy to explain how TCC works in real life. lets say you want to transfer one dollar from account eight to account c.

|Phase|Operation|A|C|
|---|---|---|---|
|1|Try|Balance change -$1|Do nothing.|
|2|Confirm|Do nothing|Balance change +$1|
|2|Cancel|Balance change -$1|Do nothing.|

First phase dry.

In the try phase the wallet service which act as the coordinator sends two transaction commands to two databases.

For the database that contains account A the coordinator starts a local transaction that reduces the balance of a by dollar 1 but the database that contains account C the coordinator gives it an op number operation to make the example adaptable for the scenario at searching that the coordinator sent this to the database in AP command the database does nothing for nop command and always replies to the coordinator with the success message.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/TryPhase.png" alt="Subset" caption="Try Phase.">}}

Second phase confirm if both databases reply yes the wallet service starts the next confirmed phase. Amount ace balance has already been updated in the first phase the wallet service does not need to change its balance here. Amount C has not yet received that $1 from amount a in this confirmed face the wallet service has to add $1 to the account C’s balance.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/ConfirmPhase.png" alt="Subset" caption="Confirm Phase.">}}

Cancel Phase.

**What if the first try phase fails?**

In the example NOP Operation on account C always succeeded but it may feel in that case the distributed transaction must be cancelled and we have to clean up. Now the balance in account has already been updated in the transaction in the dry phase so it is impossible for the wallet service to cancel the complete transaction. It can again start another transaction that revert the effect of the transaction in the dry phase which is to add $1 to account a. Account C was not updated in the dry phase the wallet service just needs to send an nop operation to account C’s database.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CancelPhase.png" alt="Subset" caption="Cancel Phase.">}}

**Comparison between 2PC and TCC.**

In two PC all local transactions are not done when the second phase starts while in TCC all local transaction are done when the second phase starts.

The second phase of 2PC is About completing an unfinished transaction such as an abort or commit violence TCC the second phase is about using a reverse operation to offset the previous transaction result when an error occurred.

|Type|First Phase.|Second Phase - success|Second Phase - fail|
|---|---|---|---|
|2PC| Local transaction are not yet done.|Commit all local transactions.|Cancel all local transactios.|
|TC/C|All local transactions are completed either committed or cancelled.|Execute new local transaction if needed.|Reverse the side effect of the already committed transaction or called undo.|


Table 2PC vs TC/C

TC/C is also called as distributed transaction by compensation. High level solution because the compensation is implemented in the business logic. The advantage is it is database agnostic as long as the database support transaction TC/C will work the disadvantage is that we have to manage the details and handle the complexity of the distributed transaction in a business logic at the application layer.

**Phase vs Table.**

**What is the wallet service restart in the middle of the TCC? When it will restart all previous operation history might be lost on the system May not know how to recover?**

We can store the progress of TCC as a phase status in the transactional database. The phase status indicates at least the following information like

The ID and the content of the distributed transaction.

The status of the try phase for each database. The status could be *not send yet,* *has been sent* and *response received*.

The name of the second phase. Would be *Confirm* or *Cancel*. We calculated using the result of the try phase.

The status of the second phase.

An out-of-order flag(”out-of-order Execution”).

**Where to put the phase stable status?**

We put the phase status in the database that contains the wallet account from which money is deducted.


{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/PhaseStatusTable.png" alt="Subset" caption="Phase Status Table.">}}

**Unbalanced state.**







{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/FinalDesignInNumberedSequence.png" alt="Subset" caption="Final Design In Numbered Sequence.">}}




### Summary.

The design is to support 1 million payment commands per second and in the estimation we understood that few 1000 nodes are required to support such load.

In the first design a solution using in memory key store radius is proposed the design is that data is not durable.

In the second design the in memory cache is replaced by transaction and database to support multiple nodes different transaction protocols such as stupid CTCC and Sagar proposed. The main issue with transactional B story solution is that we cannot conduct a data audit easily.

Next event sourcing is introduced we first implemented event sourcing using an external database and queue but it is not performant. Improved performance by storing command events and state in the local note.

A single node means a single point of failure. The system reliability we use the raft consensus algorithm to replicate the event list on to multiple notes.

The last enhancement we made was to adapt the secures features of event sourcing. Sports proxy to change the asynchronous event sourcing framework to asynchronous one for external users. The TCC or saga control is used to coordinate command executions across multiple node groups.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Summary.png" alt="Subset" caption="Summary.">}}