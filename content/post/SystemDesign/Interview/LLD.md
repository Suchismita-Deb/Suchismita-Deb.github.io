+++
title = 'Design Pattern LLD'
date = 2024-12-08T20:34:34+05:30

tags = ['interview question', 'system design']
+++

Sample interview Question in LLD.

Part 1.

Implement and verify the implementation of the following 3 classes.

The Customer class should have - id and name.
The Transaction class should be immutable and should have two mandatory fields and one optional ones.
Mandatory Field - details, amount, timestamps.
Optional Field - channel.

Te optional field can be increased later part. The mandatory field is not present then it should generate the error.
The TransactionRegistry class is a singleton. Its purpose is to store the relationship between Customer and Transaction.
```java
void registerTransactionForCustomer(Customer c, Transaction trx){}
```
```java
List<Transaction> getTransactions(Customer c){}
```
Additional Requirements.

Only the unique transactions can be stored per customer - unique pairs of details and timestamp.

getTransactions method should returns the tranactions ordered from the oldest one.


```java
@Getter
@Setter
@AllArgsConstructor
public class Customer{
    private String id;
    private String name;
}
```