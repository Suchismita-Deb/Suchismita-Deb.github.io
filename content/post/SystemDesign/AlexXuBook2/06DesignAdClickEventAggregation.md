+++
title = 'Design Ad Click Event Aggregation.'
date = 2025-07-28T10:09:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignAdClickEventAggregation"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++

Ad Click Event aggregation - meaning tracking ad click in online advertising.  
Digital advertising has a core process called **Real-Time Bidding RTB** in which the digital advertising inventory is brought and sold.      
Based on the data the company can understand which ad is expensive and mostly viewed.
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/RTBProcess.png" alt="UserRequest." caption="RTBProcess">}}
It shows how online advertising process works. The speed of RTB is important as it occurs in less than a second.Ad Click Event aggregator plays an imp role in measuring the effectiveness of ad and impact how much money advertiser pay. Manager control budget or adjust the bidding strategies to target audience group, keyword.    
The key metric used in the online advertising - click through rate CTR and conversion rate CVR.
### __Understand the requirement.__

Input data is a log file in different servers and the latest clikc event are appended. The event has the attribute - _ad_id_, _click_timestamp_, _user_id_, _ip_ and _country_.

Data Volume - 1 billion ad clicks per day and 2 million ads in total. The number of ad click events grows 30% every year.


The system return 3 queries - Return number of click events for a particular ads in M minutes.  
Return top 100 most clicked ad in past 1 minute. Parameter and filtering are configurable. Aggregation occurs every minute.  
Data filtering on the queries by _ip_, _user_id_ and _country_.

Edge Cases - Events arrived later than expected. There might be duplicate events. Different parts of system might be down at any time consider system recovery.

Latency - Latency for RTB is lessthan one second due to the responsiveness and Ad click event aggregation latency a few minutes as it is only for ad billing and reporting.

__Non-Functional Requirement.__
Correctness of data is important as used for RTB and ad billing.  
Properly handle delayed or duplicate events.  
Rebustness - The system should be resilient to partial failures.  
Latency requirement - End-to End latency should be a few minutes at most.

__Back-of-the-envelope Estimation.__
1 billion DAU. Assuming each user click 1 ad per day. 1 billion ad click per day.  
Ad click QPS = (10^9 events)/(10^5 seconds in a day) = 10,000. Peak ad click QPS is 5 times the average number. Peak QPS = 50,000 QPS.  
Single ad click event occupies 0.1KB storage. Daily storage requirement 0.1KB X 1 billion = 100GB. The monthly storage requirement is 3TB.

### __High Level Design.__

__Query API Design.__

The dashboard used by data engineer should give detail of the ad.  

Aggregate the number of click of ad_id in last M minute.  
Return top N most clicked ad_id in last M minute.  
Support aggregation filtering by different attributes.

There will be 2 API and filtering is done vy adding query parameter to the requests.

__*Aggregate the number of ad_id in last M minute.*__

> GET /v1/ads/{:ad_id}/aggregated_count Return aggregated event count of the ad_id.
>
> Request Parameter - _from_ - Start minute - _long_, _to_ - End time - _long_, _filter_ - Identifier for different filtering strategies. Example filter = 001 for non-US clicks - _long_.
>
> Response - _ad_id_ - The identifier of the ad - _String, _count_ - The aggregated count between start and end time - _long_.

__*Return top N most clicked ad_ids in the last M minute.*__

> GET /v1/ads/popular_ads Return top N most clicked ad in M minute.
>
> Request parameter - _count_ - Top N most clicked ads - _int_, _window_ - The aggregatio window size(M) in minutes - _int_, _filter_ - An identifier for different filtering strategies - _long_.
>
> Response - _ad_ids_ - A list of the most clicked ads - _array_

__Data Model__

There are 2 types of data - raw data and aggregated data.  
**Raw Data** - [AdClickEvent] - ad001, 2021-01-01 00:00:01, user 1, 207.149.22.22, USA
List of data fields in a structured way in different application servers.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/RawData.png" alt="UserRequest." caption="RawData.">}}

**Aggregated Data** - Ad click events are aggregated in every minute. Filtering there is filter_id. Record with same ad_id and click_minute are grouped by filter_id.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregatedData.png" alt="UserRequest." caption="Aggregated Data, Aggregated data with filter, Filter Table.">}}

### TODO

_Comparison between storing raw data and aggregated data_
Pros.  
Raw Data - Full Data set. Support data filter and recalculations.  
Aggregated Data - Smaller data set. Fast query.

Cons.  
Raw Data - Huge data storage. Slow query.  
Aggregated Data - Data loss. This is derived data. For example - 10 entries aggregated to 1 entry.

Which one to use? 

Use both.  
Good idea to keep raw data. Anything goes wrong, aggregated data corrupted due to bug then we can recalculate the raw data.   
The data size of raw data is huge the query will be inefficient. To mitigate we need to run queries on aggregated data.  
Raw data serves as backup we only query when recalculation needed and old data can be send to data storage to reduce cost. Aggregated data serves as an active data.  
_Choosing the right database._
To choose the right db we need to evaluate few things in every design.  

What does the data look like? relational or document or blob?  
Workflow read heavy or write heavy?  
Transaction support needed?  
Do the queries rely on many online analytical processing like SUM, COUNT?


Raw data - no need to query but useful for data engineer to study user response nad behaviour and feedback.  
The average QPS is 10,000 the system is write heavy. The read side raw data is used as backup and source for recalculation the read volume is low. RDBMS can do the work. Scaling the write can be challenging. NoSQL like Cassandra and InfluxDB are more suitable as they are optimized for write and time-range queries.  

Another option store in S3 using columnar data formats like ORC, Parquet, AVRO. Put a cap on the size of each file (10GB) and the stream processor responsible for writing the raw data could handle the file rotation when the size cap is reached. Not familier system.


Lets stick to Cassandra.
Aggregated Data - Time-series in nature and the workflow is read and write heavy. In each ad we need to query the db every minute to display the latest aggregation count for customers. This feature is useful for auto-refreshing the dashboard or triggering alerts in a timely manner. There are 2 million ads in total the workflow is read heavy. Data aggregated and written every minute by the affrefation service so it is write heavy. We can use the same type if database to store both raw data and aggregated data.

General design structure - Query design and data model and then the high level design.

__High Level Design.__


In big data processing, the data flows in and out as unbounded data streams. The aggregation service works in the same wat - input is raw data (unbounded data stream) and the output is the aggregated result. 
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationWorkFlow.png" alt="UserRequest." caption="AggregationWorkFlow">}}

__Asynchronous Processing.__

The design is synchronous - The capacity of the producer and consumer is not same when the increase in event then the consumer will give out-of-memory error or stop. One component in synchronous is down then the whole system stops working.  
The most common solution to use the Kafka to decouple the producer and consumers. The process is asynchronous and the producer and consumer can be scaled independently.  

In the design the log watcher, aggregation service and database are decoupled by 2 message queue. The database writer polls data from the message queue, transform the data into teh database format and write to the database.  
First message queue - contains ad click event data - *ad_id*, *click_timestamp*, *user_id*, *ip*, *country*.  
Second message queue - contains 2 types of data.  
Ad click aggregated at per-minute - *ad_id*, *click_minute*, *count*.  
Top N most clicked ads aggregated at per-minute - *update_time_minute*, *most_clicked_ads*.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/EndToEndExactlyOnce.png" alt="UserRequest." caption="End-To-End Exactly Once">}}
We dont write the aggregated data to the database directly. We need the Kafka to achieve end-to-end exactly once semantics(atomic commit).

__Aggregation Service.__

The MapReduce framework is a good option to aggregate ad click events. The DAG is a good model. The key to the DAG is to break down the system into small computing units like Map/Aggregate/Reduce nodes.
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/Top100AggregationService.png" alt="UserRequest." caption="Aggregation Service">}}
Each node is responsible for ne task and send th processing result to the downstream nodes.


__Map Node.__

A Map node reads data from the data source and then filters and transforms the data. A mapndoe sends ads with ad_id%2=0 to node 1 and the other ads go to node 2.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/MapOperation.png" alt="UserRequest." caption="Map Operation">}}

Counter - Why to use Map node. We can set up Kafka partitions or tags and let the aggregate nodes subscribe to Kafka directly. It work but the input data may need to be cleaned or normalized and these operations can be done by the Map node. Another reason the control over how data is producer is not possible and the events with the same ad_id might land in different Kafka partitions.

__Aggregate Node.__

An aggreagate node counts ad click events by ad_id in memory every minute. In the MapReduce paradign, the Aggreagte node is part of the reduce. So the map-aggregate-reduce means map-reduce-reduce.

__Reduce Node.__

A reduce node reduces aggregated result from all "Aggregate" nodes to the final result. There are 3 aggregation nodes and each contain top 3 most clicked ads within the node. The reduce node reduces the total number of most clicked ads to 3.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/ReduceNode.png" alt="UserRequest." caption="Reduce Node">}}

The DAG model represents the MapReduce pradigm. It is designed to take big data and use parallel distributed computing to turn big data to small size data.
In the DAG model intermediate data can be stored in memory and different nodes communicate with each other through TCP(node running in different processes) or shared memory(node runing in different threads).   
Map Reduce use case - Aggregate the number of clicks.
Input events are prtitioned by ad_id (ad_id%3) in Map node and are then aggregated by the Aggregation node.
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregateTheNumberOfClicks.png" alt="UserRequest." caption="Aggregate The Number Of Clicks">}}
Map Reduce use case - Return top N most clicked ads.  
Input events are mapped using ad_id and each aggregate node maintains a heap data structure to get the top 3 ads within the node. In the last the Reduce node give the top 3 most clicked ads every minute.
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/ReturnTopNMostClickedAds.png" alt="UserRequest." caption="Return Top N Most clicked ads.">}}
Map Reduce use case - Data filtering.  
Data Filtering like - "Show me the aggregated click count for ad001 within USA only" - pre-define filtering criteria and aggregate based on them. 
 {{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationResultFilterByCountry.png" alt="UserRequest." caption="Aggregation Result Filter By Country.">}}
This technique is called Star Schema, widely used in data warehouse. The filtering field are called dimensions. This approach has he following benefits -  
The current aggregation service can be reused to create more dimensions in the star schema. No additional component is needed.  
Accessing data based on filtering criteria is fast as the result is pre-calculated.

The limitation it will cerate more buskets and records when we have lot of filtering criteria.

### __Design Deep Dive.__
Deep dive in the following - Streaming vs Batching, Time and aggregation window, Delivery guarantees, Scale the system, Data monitoring and correctness, Final design, Fault Tolerant.

__Streaming vs Batching.__
The high level design is based on the stream processing.
_Comparison between the system._
|Services(Online System)|Batch System(Offline System)|Streaming System(Near Real-Time System)|
|---|---|---|
|Response to client quickly.|No response to the client needed.|No response to the client needed.|
|Input is user request.|Bounded input with large amount of data.|Input has no boundary infinite stream.|
|In output gives response to the client.|In output gives materialized views, aggregated metrics.|In output gives materialized views, aggregated metrics.|
|Performance - availability, latency.|Performance - Throughput.|Performance - Throughput, latency.|
|Example - Online Shopping.|Example - MapReduce.|Example - Flink.|

In the design both stream and batch processing are used.   
Stream processing to process the data as it arrives and generates the aggregated results in near real time. Batch processing for processing the data backup.  
System containing batch and stream simultaenously - the architecture called lambda. Cons - 2 processing path meaning two codebase to maintain.

Kappa architecture combines the batch and streaming in one processing path solves the problem. The key is to handle both real-time data processing and continuous data reprocessing with a single stream processing engine.

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/LambdaKappaArchitecture.png" alt="UserRequest." caption="Lambda and Kappa Architecture">}}
Comparison between the Lambda and Kappa architecture - using the Kappa architecture - the reprocessing of historical data also goes through the real-time aggregation service.

__Data Recalculation.__

There are times when we have to recalculate the aggregated data - historical data replay - any errr in the aggregation service we need to recalculate the aggregated data from the raw data to solve the error.

The flow of the data recalculation -   
The recalculation service retrieves data from the raw data storage - batched job.  
Retrieved data sent to a dedicated aggregated service so no real time data impacted by historical data.   
Aggregated results are sent to the second message queue - then updated in the aggregation database.

The recalculation process reuses the data aggregation service but different data source.
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/RecalculationService.png" alt="UserRequest." caption="RecalculationService">}}

__Time.__


{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/MissEventsInAnAggregationWindow.png" alt="UserRequest." caption="MissEventsInAnAggregationWindow">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/WaterMark.png" alt="UserRequest." caption="WaterMark">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/TumblingWindow.png" alt="UserRequest." caption="TumblingWindow">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/SlidingWindow.png" alt="UserRequest." caption="SlidingWindow">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/DuplicateData.png" alt="UserRequest." caption="DuplicateData">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/RecordTheOffset.png" alt="UserRequest." caption="RecordTheOffset">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/SaveOffsetAfterReceivingAcks.png" alt="UserRequest." caption="SaveOffsetAfterReceivingAcks">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/DistributedTransaction.png" alt="UserRequest." caption="DistributedTransaction">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationService.png" alt="UserRequest." caption="AggregationService">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/Multithreading.png" alt="UserRequest." caption="Multithreading">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AllocateMoreAggregationNode.png" alt="UserRequest." caption="AllocateMoreAggregationNode">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/DataInSnapShort.png" alt="UserRequest." caption="DataInSnapShort">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationNodeFailover.png" alt="UserRequest." caption="AggregationNodeFailover">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/Design.png" alt="UserRequest." caption="Final Design">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AdsAggregationSummary.png" alt="UserRequest." caption="AdsAggregationSummary">}}



Videos.

Hello Interview - https://youtu.be/Zcv_899yqhI?si=DUqLj4VSeW6wqJQs

Jordan - https://youtu.be/6TroztUV3f8?si=Aw8BYXdA2UIOfxLl

ByteMonk - https://youtu.be/6W8FCW2rWNQ?si=nBYAhqdLuElFBIvj

Fight Club - https://youtu.be/_vK53SnrUjk?si=pRBzw6Fnlh6ir8XT
