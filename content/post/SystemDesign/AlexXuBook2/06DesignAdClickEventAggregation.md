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


{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationWorkFlow.png" alt="UserRequest." caption="AggregationWorkFlow">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/EndToEndExactlyOnce.png" alt="UserRequest." caption="EndToEndExactlyOnce">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/Top100AggregationService.png" alt="UserRequest." caption="Top100AggregationService">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/MapOperation.png" alt="UserRequest." caption="MapOperation">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/ReduceNode.png" alt="UserRequest." caption="ReduceNode">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregateTheNumberOfClicks.png" alt="UserRequest." caption="Aggregate The Number Of Clicks">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/LambdaKappaArchitecture.png" alt="UserRequest." caption="LambdaKappaArchitecture">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/RecalculationService.png" alt="UserRequest." caption="RecalculationService">}}

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
