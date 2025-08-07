+++
title = 'Confluent Kafka Administration'
date = 2025-07-15T21:52:53+05:30

url= "/post/Spring/Kafka/ConfluentKafka/ConfluentBasics"
tags=["devops", "confluent", "kafka"]
+++

Chapter 8 - Kafka Optimization.

Throughput 

Amount of data moving through Kafka per second. Increase the throughput.

Latency 
Low more real time and 0 meaning real time. The delay from the time data is wriiten to the time it is read.

Recovery Time - The time to return to a good state after some failure.

School bus wait to children to onboard and go to the school.  

Waiting so latency high and taking many childrens at a time so the high throughput.

Personal car - No waiting time - less latency but ony one student so low throughput.


Ideal - Low latency and high throughput.

Producer - Seraializer - Paritioner - Accumulator/Buffer - Data shared to the Kafka Cluster.

In buffer there is buffer.memeory default 32 mb. Within the buffer we maintain the logical data based on the partition. 

There is a batch of data and each batch is of ize 16kb. Batch are divided in topic and partition level. The data only flush to the kafka cluster. It is based on a property called _linger.ms_ - How frequently the data is moved to cluster default 0ms send imediately. As soon as teh data come to buffer from partition it will be sent to kafka and immediately so no batch is creaed so low latency and each data is elivered meaning one by one meaning low throughput.

compression.type will compress the batch to get ost data in the same size.

Consumer Side Optimization.

Send the data in batches and read the data in batches.  fetch.min.byte default 1 and fetch.max.wait.ms default 500 and by default the value mainly get the low latency.

Chapter 8b - Produce and Fetch Request Get processed on a Broker.

Producer request gets processed at the broker side. 
Purgatory Map - a storage structure only active when acs = all.Producer  send requet to num.network.thread - Io will process the request and stire the data in page cache and stor map when acks = all else 1 then directly with the page cache it will response queue and 0 need no acks.


Fetch Request.

Same.

Purgatory request -fetch.min.bytes and fetch.max.wait.ms.

Produce requets keeps stalling. Stall for 6-10 secs. enable.idempotence = false. it will help inre moving duplicate message and set to false then we will get duplicate message.  duplicate is only possible when there is acks all or 1.  Leader not available means leader election is happening leader epoch value. 
Dupliacte after the stall means not processed so there are retry and duplicate data processed.


Quotas - They are requeired to handle high volumn client and it monopolarize the broker resource.


### Security in Kafka.

3 main component - Authentication(Confluet RBAC, Mutual SSL, SASL), Authorization(Confluent RBAC, Sinple ACLs), Encryption in Transport(SSL (TLS), Plaintext).

### Kafka Connect.
