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


After the try phase $1 is deducted from account A and account C remains unchanged. The sum of account balance in A and C will be $0 which is less than at the beginning of TCC. Its fundamentally rule of accounting that some should remain the same after the transaction.

The transitional guarantee is given by TCC. Comprises several independent local transactions. Driven by application so application can see all the intermediate results between the local transaction. Aadhaar hand database transaction are the two PC version of the distributed transaction was maintained by the database that are invisible to the high level applications.

There are always data discrepancies between the execution of distributed transaction. The discrepancy might be transparent to us because low level systems such as database already fix the discrepancies if not we have to handle it by ourselves.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/UnbalancedState.png" alt="Subset" caption="Unbalanced State.">}}

Valid operation orders.  

Try phase choices.| Account A.| Account C.| 
|---|---|---|
|Choice 1|-$1|NOP|
|Choice 2|NOP|+$1|
|Choice 3|-$1|+$1|

All of these choices look plausible, But some are not valid.

For choice too if the dry face on account says successful but has failed on account ANOP the wallet service needs to enter the cancel state. There is a chance that somebody else may jump into end and move that $1 away from account C. Later when that wallet service tries to deduct $1 from accounts it will find nothing which violates the transaction guarantee of a distributed system.

For choice three if $1 is deducted from account in Aditya Country concurrently it introduces lot of complications for example $1 is added accounts but it fails to deduct the money from account a.

Choice 2 and choice 3 are flawed choices and only choice 1 is valid.

Out-of-order execution.

One of the side effect of TCC is the out of order execution. Use that example where $1 is transferred from accounting to accounts. Dry face the operation is against account a fails and it returns a failure to the wallet service which then enters into the cancel face and send the cancel operation to both account A and account C. Let's assume that the database that handles account C has some network issue and it receives the cancel instruction before the try instruction in that case there is nothing to cancel.

The out of order execution is handled by ensuring each node allowed to cancel a TCC without receiving a try instruction by enhancing the existing logic with the following updates.

The out-of-order Cancel operation leaves a flag in the database indicating that it has seen the cancer operation but it has not seen the dry operation yet.

The Try operation is enhanced so it always cheque whether there is an out of order flag and it returns a failure if there is failure. That is why there is an out of order flag to the phase table.

Distributed transaction saga.

Linear Order Execution.

One popular distributor transaction solution is saga. Is a defect standard in macro service architecture. Idea of saga is simple.

All operations are ordered in a sequence. Operation is an independent transaction on its own database.

Operations are executed from first to the last. When one operations has finished the next one is triggered.

When an operation has failed the entire process starts to roll back from the current operation to the first operation in rivers order using compensating transactions. So if a transaction has N operations we need to prepare to an operations N operations for the normal cases and another N operations for the compensating transactions during rollback.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/SagaWorkFlow.png" alt="Subset" caption="SagaWorkFlow.">}}

The top horizontal line shows the normal order of execution. The two vertical lines shows what system should do when there is an error. When it encounters and errors the transfer operation are rolled back and the client receives an error message. As mentioned in the valid operation order section we have to put the deduction operation before the addition operation.

**How do we coordinate the operations?**

There are many two ways.

Choreography - In a Microsoft architecture all the services involved in the Saga distributed transaction do their job by subscribing to other services events. So it is fully decentralized coordination.

Orchestration - A single coordinated instructs all services to do their jobs in the correct order.

The choreography solution the service communicate in a fully asynchronous way so each services has to maintain an internal state machine in order to understand what to do when other services emit an event. It can become hard to manage when there are many services.

The orchestration solution handles complexity well so it is usually the preferred solution in digital wallet system.

Comparison between TCC and saga.

TCC and saga are both application level distributed transaction.


|Feature|TC/C|Saga|
|---|---|---|
|Compensating action.|In Cancel phase.|In rollback phase.|
|Operation execution order.|Yes.|Yes (orchestration mode).|
|Parallel execution possibility.|Yes.|No (linear execution).|
|Could see the partial inconsistent status.|Yes.|Yes.|
|Application or database logic.|Application.|Application.|


TC/C Vs Saga.

Which one should be in practice?

The answer depends on the latency requirement. In the table we can see that the operation in saga have to be executed in linear order but it is possible to execute them in parallel in TCC. Decision depends on the few factors.

If there is no latency requirement or there are very few services such as our money transfer example we can choose either of them. New trend to go with Saga.

If the system is latency sensitive and contains many services or operations TCC might be better option.

To make the balance transfer transactional we replace that redis with the relational database and use TCC or saga to implement the distributed transaction . It will work in the distributed transaction solution but there might be cases where it will not work for example user might enter the wrong operation at the application level. This case the money we specified might be incorrect we need to trace back the Root Cause of the issue and audit all account operations.

**Event sourcing.**

In real life a digital wallet provider may be audited. This external auditors might ask some challenging questions like

Do we know the account balance at a given time ?

How do we know the historical and current account balances are correct?

How do we prove that the system logic is correct after the code change?

The design philosophy that systematically answered these patients is event sourcing which is developed in domain driven design.

There are four important terms in event sourcing command event state and state machine.

Command a command is the intended action from the outside world for example if you want to transfer $1 from client 8 to client see them as money transfer request is a command. In event sourcing it is very important that everything has an order so command are usually put into a fifo queue.

Event command is an intention and not a fact because some command may be invalid and cannot be fulfilled for example the transfer operation will fail if the account balance becomes negative after the transfer. A command must be validated before we do anything about it once the command passes the validation it is valid and must be fulfilled. Result of the fulfillment is called an Event.

There are two major differences between command and event. Event must be executed because they represent a valid fact. In practise we usually use the past tense for an event. Command is transfer $1 from A to C the corresponding event will be transferred $1 from A to C.

Commands may contain randomness or io but events must deterministic. Events represent historical facts.

There are two important properties of the event generation process.

One command may generate any number of event. Could generate zero or more events.

Event generation may contain randomness meaning it is not guaranteed that command always generates the same events. Event generation may contain external io or random numbers.

the order of events must follow the order of commands so event reboxes token to the fifo queue as well.

State State is what will be changed when an event is applied. In the wallet system state is the balance of all client accounts which can be represented with a mapped data structure. The key is the account name or it and the value is the account balance. Key value store are usually used to store the map data structure. Rational database can also be viewed as a key value store where keys are primary key and the values are table rows.

State machine drives the event sourcing process. It has two major functions validate commands and generate events and apply events to update state.

Event sourcing required the behaviour of the state machine to be deterministic therefore a state machine itself should never contain any randomness. Something it should never read anything random from outside using IO or using a random numbers. It should always generate the same result.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/StaticViewOfEventSourcing.png" alt="Subset" caption="Static View Of Event Sourcing">}}

This image shows the static view of event sourcing architecture. State machine is responsible for converting the commands to an event and for applying the event. The state machine has two primary function we usually draw two state machines 1 for validating command and another for applying events.


{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/DynamicViewOfEventSourcing.png" alt="Subset" caption="Dynamic View Of Event Sourcing">}}

If you add the time dimension the image shows the dynamic view of event sourcing the system keeps receiving command and processing them one by one.

Wallet Service Example.

In the wallet service the commands are balance transfer request.


{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CommandQueue.png" alt="Subset" caption="Command Queue">}}

The state the account balance was stored in a relational database. Mission examines each command one by one in the fifo order for example for each command it takes whether the account has a sufficient balance if yes the state machine generate an event for each account for example if the command is eight to $1 to C the state machine will generate two events a $1 and C $1

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/HowStateMachineWorks.png" alt="Subset" caption="How State Machine Works.">}}

The image shows how state machine works in five step.

Read commands from the command queue. Balance date from the database. The command if it is valid generate two event for each of the accounts. Next event. Apply the event by updating the balance in the database.

Reproducibility.

The most important advantage that event sourcing has over other architecture is reproducibility.

In the distributed transaction solution that is mentioned earlier the wallet service saves up the updated account balance the state into the database it is difficult to know why the account balance was changed. The historical balance information is lost during the update operation.

In the event sourcing design all changes are saved first as immutable history. Database is only used as an updated view of what balance looks like at any given point in time. We could always reconstruct historical balance states by replaying the event from the very beginning. The event list is immutable on the state machine logic is deterministic it is guaranteed that the historical states generated from each reply are the same.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/ReproduceState.png" alt="Subset" caption="Reproduce State">}}

This image shows how to reproduce the states of the wallet service by replying the event.

Reproducibility helps us to answer the difficult questions that auditor ask.

Do we know the account balance at a given time yes we could answer it by replaying event from the startup to the point of the time where we would like to know the account balance.

Do we know the historical and the current account balance are correct we could verify the correctness of the account balance calculating it from the event list. Do we prove the system logic is correct after the court change we can run different version of the code against the event and verify that their results are identical.

Because of this audit Capability event sourcing is often chosen as the defector solution for the wallet service.

CQRS.

The design of this wallet service is done which only focuses to move money from one account to another. The client still does not know what the account balance is. Needs to be a way to publish state balance information so the client which is outside of the event sourcing framework can know what the state is.

We can create a read only copy of the database historical set and share it with the outside world even sourcing answer these questions in a slightly different way. Rather than publishing the state balance information events sourcing publishers all the events. World could rebuild any customised state itself. Design philosophy is called CQRS. Insecure there is one state machine responsible for the right part of the state but there can be many read only state machines which are responsible for building views of the states. News could be used for queries.

Is read only state machines can derive different state representations from the event queue for example client may want to know their balance and read only state machine could save state in the database to serve the red balance query. Another state machine could wield state for a specific time. Investigate issues like possible double charges paid listed information is an audit trail that could help to reconcile the financial records.

The read only state machine lags behind to some extent but will always catch up. Architectural design is eventually consistent.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/CQRSArchitecture.png" alt="Subset" caption="CQRSArchitecture">}}
In this design we have used cable sourcing architecture to make the whole system reproducible. All valid business records are safe in an Immutable event queue which could be used for correctness verification.

The problem with this one that the event sourcing architecture only handles 1 event at a time and it needs to communicate with several experiences. We need to make it faster.

Design Deep Dive.

We deep dive into techniques for achieving high performance, reliability and scalability.

High performance event sourcing.

Kafka was used as a command and event stored on the database as a state store now we will be optimising further.

File-based command and event list

The first optimization is to save commands and events to a local disc rather than a remote store like Kafka. This avoids the transit time across the network. The event list uses an append only data structure. Appending is a sequential write operation and it is fast. It works well even for magnetic hard drives because the operating system is heavily optimised for sequential reads and writes. Sequential disc access can be faster than random access in some cases.

The second optimization is to cash recent commands and events in memory. The The command and events are processed after they are persisted. We cashed them in the memory to save the time of loading them from the local disk.

Let's deep dive into the implementation details. A technique called M map is great for implementing the optimization mentioned. Map can write to a local disc and cash recent content in memory at the same time. Appset disc file to memory as an array. System caches certain sections of the file in memory to accelerate the read and write operations. For append only file operations it is almost guaranteed that all data are saved in memory which is very fast.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/FileBasedCommandAndEventStorage.png" alt="Subset" caption="File Based Command And Event Storage">}}
File based state.

In the design the state balance information is stored in relational database. Environment database usually runs in a state alone server that can only be accessed through networks. To optimizations we did for command and event state information can also be saved in the local disc as well.

More specifically we can use SQLite which is a file based local relational database or use RocksDb which is your local file based key value store.

Brock's tb is chosen because it uses a log structured merged tree lsm which is optimised for write operations. Performance the most recent data is cached.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/FileBasedSolutionForCommandEventAndState.png" alt="Subset" caption="File Based Solution For Command, Event and State">}}

Snapshot.

When everything is file based we now have to accelerate the reproducibility process.

When we first introduced the reproducibility the state machine had to process events from the very beginning every time what we could optimize is to. Of the state machine and save the current state into a file. This is called a snapshot.

A snapshot is an imitable view of historical state. Snapshot is saved the state machine does not have to restart from the very beginning anymore it can ret data from a snapshot verify where it left off and resume processing from there.

The finance team often require a snapshot to be taken at a 0000 so that they can verify all transaction that happened during the daytime. Week introduced the secivaries of even sourcing the solutions was to set up a read only state machine that read from the beginning until the specified timing is met. With snapshots a read only state machine only needs to load one snapshot that contains the data.

A snapshot is a giant binary file and a common solution to save it in object storage solutions such as HDFS.

The image shows the fine waste event sourcing architecture. Is file based the system can fully utilise the maximum IO throughput of a computer hardware.

We could reflect the design of event sourcing show the command list event list state and snapshot all are saved in the file. Processes the event less in a linear manner which fits well with the design of our disc and operating system cache.

The performance of the local file based storage is better than the system that requires accessing data from remote Kafka and databases. Is another problem because data is saved from the local disc server is not stateful and becomes a single point of failure.

**How do we improve the reliability of the system.**

Reliable high performance event sourcing.

First you need to understand the part of the system that need the reliability guarantee.

Reliability analysis.

Everything a note does is around two concept data and computation. Details durability is easy to recover the computational results by running the same code on another note. We only need to worry about the reliability of the data because if the data is lost it is lost forever. System is mostly about the reliability of the data. Foot type of data in our system file based command file based event file based state and state snapshot.

State and snapshot can always be Regionality by replying the event list. Reliability of state and snapshot we just need to ensure the event list has strong reliability.

Command. On the face of it event is generated from command. Think providing a strong reliability guarantee for command should be sufficient. Seems to be correct at first class but it misses something important. Event generation is not guaranteed to be deterministic and also it may contain random factors such as random numbers external IO etc so command cannot guarantee reproducibility of events.

Event. Event represents historical facts that introduce changes to the state account balance. Is immutable and can be used to rebuild the state. From the analysis we conclude that event data is the only thing that required a high reliability guarantee.

Consensus.

To provide high reliability we need to replicate the event released across multiple notes. Bring the replication process we have to guarantee the following properties like no data loss and relative order of data within a log file remains the same across nodes.

To achieve those guarantee consensus based replication is a good feat the consensus algorithm make sure that multiple nodes reach a consensus on what the event list is. We will be using the raft consensus algorithm.

The raft algorithm guarantees that as long as more than half of the nodes are online the append only lists on them have the same data. If we have five notes and use the raft algorithm to synchronise this data as long as at least three nodes are up the system can still work properly as a whole.

I not can have three different role in the raft algorithm leader candidate fun follower.

In raft at most one node is the leader of the cluster and the remaining nodes are followers. There is responsible for receiving external commands and replicating data reliably across nodes in the cluster. Where the rough algorithm the system is reliable as long as the majority of the nodes are operational for example if there are three nodes in the cluster it could tolerate the failure of 1 node and if the refined node nodes it can tolerate the failure of two nodes.

Reliable solution.

With replication there wont be a single point of failure in our file based event sourcing architecture.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/RaftNodeGroup.png" alt="Subset" caption="Raft Node Group">}}

This image shows the event sourcing architecture with the reliability guarantee. Here there are three event sourcing notes these notes use the raft algorithm to synchronise the event less reliably.

The leader takes incoming command request from external user convert them into event and append the event into the local event list we did the left algorithm replicates newly added even to the followers.

All nodes, including the follower and processes the event list and update the state. Algorithm ensures the leader and the follower have the same event list while event sourcing guarantees all state are the same as long as the event lists are the same.

A reliable system needs to handle failures gracefully so now we have to explore how nodes crashes are handled.

If the leader rushes the raft algorithm automatically set a new leader from the remaining healthy notes. Newly elected leader takes the responsibility for accepting commands from the external sources. Cluster at the hole can provide continuous service when the note goes down.

When later crashes it is possible that the crash happened before the commander list is converted to event. This case the client would notice the issue either by a timeout or by receiving an error response. Need to resend the same command to the newly elected leader. And trust the follower crashes are much easier to handle if a follower crashes request sent to it will fail raft handle failure by retrying indefinitely until the crash nodes is restarted or a new replica replaces it.

In this decision we have used the raft consensus algorithm to replicate the event less across multiple nodes. Receives Kamal and replicates event to other notes. Now the system is more reliable and fault tolerant.

**In order to handle 1 million of TPS one server is not enough make the system more scalable?**

Distributed event sourcing.

We have implemented a reliable high performance event sourcing architecture. Reliability issues but it has two limitations.

When a digital wallet is updated we want to receive the updated result immediately. The cqrs design the request response flow can be slow. Because the client doesn't know exactly when a digital wallet is updated and the client may need to rely on periodic polling.

The capacity of a single rubbed group is limited. A certain scale we need to shut the data and implement distributed transaction.

Let's solve this limitations.

Pool versus push.

In the pull model and external user. Execution status from the read only state machine. Model is not real time and may overload the wallet service if this polling frequency is set to high.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/PeriodicPulling.png" alt="Subset" caption="Periodic Pulling">}}

The image shows the pulling model.

The naive pull model can be improved by adding a reverse proxy between the external user and the event sourcing note. In this design the external user sends a command to the reverse proxy which forward the command to event source in nodes and periodically polls the execution status. This design simplifies the client logic but the communication is still not real time.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/PullModelReverseProxy.png" alt="Subset" caption="Pull Model Reverse Proxy">}}

When we have the reverse proxy we could make the response faster by modifying the real only state machine. The read only state machine could have its own behaviour for example one behaviour could be that the read only state machine pushes execution status back to the reverse proxy as soon as it receives the event. This will give the user a feelings of real time response.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/PushModel.png" alt="Subset" caption="Push Model">}}

Distributed transaction.

Once synchronous execution is adapted for every sourcing nodigroup we can reuse the distributed transaction solution this is your saga assuming we partition the data by dividing the hash value of key by 2.


{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/FinalDesignInNumberedSequence.png" alt="Subset" caption="Final Design In Numbered Sequence.">}}




### Summary.

The design is to support 1 million payment commands per second and in the estimation we understood that few 1000 nodes are required to support such load.

In the first design a solution using in memory key store radius is proposed the design is that data is not durable.

In the second design the in memory cache is replaced by transaction and database to support multiple nodes different transaction protocols such as stupid CTCC and Sagar proposed. The main issue with transactional B story solution is that we cannot conduct a data audit easily.

Next event sourcing is introduced we first implemented event sourcing using an external database and queue but it is not performant. Improved performance by storing command events and state in the local note.

A single node means a single point of failure. The system reliability we use the raft consensus algorithm to replicate the event list on to multiple notes.

The last enhancement we made was to adapt the secures features of event sourcing. Sports proxy to change the asynchronous event sourcing framework to asynchronous one for external users. The TCC or saga control is used to coordinate command executions across multiple node groups.

{{<figure src="/images/SystemDesign/DesignExample/DigitalWallet/Summary.png" alt="Subset" caption="Summary.">}}