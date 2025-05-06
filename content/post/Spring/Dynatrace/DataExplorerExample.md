+++
title = 'DataExplorerExample'
date = 2025-05-06T09:52:40+05:30

url= "/post/spring/dynatrace/dataExplorerExample"
tags = ['dynatrace', 'spring', 'kafka-confluent']
+++
```sql
(confluent_kafka_server_received_records
  :filter(
    and(
      or(
        in("dt.entity.prometheus:confluent_kafka_topic", 
           entitySelector("type(prometheus:confluent_kafka_topic),entityName.contains(~\"dlq~\")")
        ),
        in("dt.entity.prometheus:confluent_kafka_topic", 
           entitySelector("type(prometheus:confluent_kafka_topic),entityName.contains(~\"dlt~\")")
        ),
        in("dt.entity.prometheus:confluent_kafka_topic", 
           entitySelector("type(prometheus:confluent_kafka_topic),entityName.contains(~\"error~\")")
        )
      )
    )
  )
  :splitBy("dt.entity.prometheus:confluent_kafka_topic")
  :sort(value(auto,descending))
)
:filter(
  eq("dt.entity.prometheus:confluent_kafka_topic", CUSTOM_DEVICE-CF707F1B308F5901)
)
```

`confluent_kafka_server_received_records` -	Metric showing the number of records received by a Confluent Kafka server.  
`filter(...)` - Applies filtering logic to narrow down entities.  
`in(..., entitySelector(...))` - Used to filter Kafka topics matching name patterns (like dlq, dlt, or error).  
`entityName.contains(~"dlq~")` - Filters topics whose names contain "dlq" (likely Dead Letter Queue).  
`splitBy("dt.entity.prometheus:confluent_kafka_topic")` - Group the results per Kafka topic (dimensions).  
`sort(value(auto, descending))` - Sort the results by record count, in descending order.  
`Final filter(...)` - Further narrows down the result to only one specific Kafka topic, identified by ID CUSTOM_DEVICE-CF707F1B308F5901.

The drop to 0 might suggest that the selected topic (CF707F1B308F5901) stopped receiving messages — possibly the reason for the problem alert shown above (P-250466249).

This Dynatrace chart shows Kafka topics (error, dlq, dlt) and monitors how many messages they received. You're specifically monitoring one Kafka topic (`CUSTOM_DEVICE-CF707F1B308F5901`). A sudden drop in records could indicate a misconfiguration, consumer failure, or a message production halt — possibly triggering a Dynatrace problem alert.