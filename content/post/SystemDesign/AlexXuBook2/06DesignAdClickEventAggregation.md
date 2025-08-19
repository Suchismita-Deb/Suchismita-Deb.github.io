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
It shows how online advertising process works. The speed of RTB is important as it occurs in less than a second.  
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

### __High Level Design.__

{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/AggregationWorkFlow.png" alt="UserRequest." caption="AggregationWorkFlow">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/EndToEndExactlyOnce.png" alt="UserRequest." caption="EndToEndExactlyOnce">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/Top100AggregationService.png" alt="UserRequest." caption="Top100AggregationService">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/MapOperation.png" alt="UserRequest." caption="MapOperation">}}
{{<figure src="/images/SystemDesign/DesignExample/AdClickSystem/ReduceNode.png" alt="UserRequest." caption="ReduceNode">}}
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
