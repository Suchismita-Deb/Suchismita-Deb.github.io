+++
title = 'Kafka Terms.'
date = 2025-08-29T23:46:23+05:30

url= "/post/spring/kafka/KafkaInternalArchitecture/KafkaTerms"
tags = ['spring', 'kafka']
+++
## Backpressure.
**Backpressure** is a signal or mechanism in streaming systems that tells producers or upstream systems to slow down when consumers or downstream systems cannot keep up with the incoming data rate.  
If not handled, it can lead to -   
_Consumer lag_ (messages piling up in Kafka)  
_OutOfMemory errors_   
_System crashes or data loss_

The backpressure is mainly caused by following reason -  
__*Producer sending message too quickly.*__  
__*When brokers cant keep up.*__  
__*When consumers process data too slowly.*__

### __Backpressure on the producer side.__  
Producer sending messages to Kafka too fast - producers buffer can fill up.  
Kafka starts retrying o throttling sends.  
There will be high latency or even errors like TimeOutException.  
__*Quick Fix*__  
Tune `linger.ms:10`(producer sends a batch of messages and after 10 millisecond next batch will go) and `batch-size:16384 #16kb`(producer will send 16kb of messages in a batch) to optimize batching. The precedence is given whih parameter reaches fast like the batch size is 16kb in 5ms then the message will be sent.  
Set limits with `buffer.memory`    
monitor broker acknowledgements with the ack setting.  
Add retry logic and delay.

### __Broker level Backpressure.__  
Brokers have to write messages to disk and replicate them. If the disk IO is slow or too many partition the broker becomes a bottleneck. Spring boot apps may see timeouts or increased latencies.  
__*Quick Fix.*__
No code directly - we can monitor using some observability tools like JMX, Micrometer, Grafana, Prometheus and respond.   
Reduce partition count or add more brokers.

### __Backpressure on the consumer side.__    
Consumer is too slow - saving to a slow database or doing heavy computation - they cant keep up with Kafka.  
__*Quick Fix.*__
Pause the consumer when the processing is slow.  
Use backpressure-aware processing like reactive streams.  
Tune concurrency.  
Use manual acknowledgment.

Kafka Backpressure is when consumer cant keep up with producers.  
We can handle it by limiting poll size, increasing concurrency, committing manual and monitoring lag.  

