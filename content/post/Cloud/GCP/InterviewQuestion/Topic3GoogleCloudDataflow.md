+++
title = 'Topic 3 Google Cloud Dataflow'
date = 2025-02-13T21:57:18+05:30

url = "/post/Cloud/GCP/InterviewQuestion/Topic3/"
tags = ["Spring", "interviewQuestion"]
+++
# Dataflow.

Dataflow is a fully managed stream and batch processing service that executes Apache Beam pipelines. It is commonly used for real-time data processing, ETL and event-driven applications.  

Key features.  
**Unified Stream & Batch Processing** – Uses Apache Beam’s unified model to process both real-time streaming and batch data.  
**Auto-scaling & Dynamic Work Rebalancing** – Efficient resource allocation based on workload demand.  
**Fault-tolerance & Exactly-once Processing** – Ensures data consistency and reliability.  
**Integrations with GCP Services** – Works seamlessly with BigQuery, Cloud Storage, Pub/Sub, Bigtable, and more.  
**Flexible SDKs** – Supports Java, Python, and SQL through Apache Beam. 

### How the Dataflow Works.
Dataflow pipeline lifecycle.
Define a pipeline using Apache Beam SDK(Java/Python).  
Pipeline is submitted to dataflow which compiles it to a DAG.  
Dataflow automatically scales and optimizes the execution and process the streaming and batch data.  
The processed and the resulted data is stored in Bigquery, CloudStorage, Pub/Sub, Spanner.

Pipeline reads the data from Cloud Storage and converts to uppercase and store it back in cloud storage.
```java
PipelineOptions options = PipelineOptionsFactory.create();
Pipeline pipeline = Pipeline.create(options);

pipeline.apply("ReadData", TextIO.read().from("gs://bucket/input.txt"))
        .apply("TransformData", ParDo.of(new DoFn<String, String>() {
            @ProcessElement
            public void processElement(ProcessContext c) {
                c.output(c.element().toUpperCase());
            }
        }))
        .apply("WriteData", TextIO.write().to("gs://bucket/output.txt"));

pipeline.run().waitUntilFinish();
```

Packaged and submitted to Dataflow.
```mvn
mvn compile exec:java \
 -Dexec.mainClass=com.example.DataflowJob \
 -Dexec.args="--runner=DataflowRunner --project=my-project --region=us-central1"

```
Job Execution and Optimization - Dataflow compiles the pipeline into DAG. Optimizes job execution using Fusion Optimization - Merges smaller task into larger and efficient one. Dynamic Work Rebalancing and Autoscaling.

### Key components of Dataflow.  
**Apache Beam SDK** - Apache Beam is an open source unified programming model for defining data processing pipelines. Use to construct the pipeline using SDK in Java, Python.  
A SDK is a Software Development Kit is a set of tools, libraries, APIs that developers used to build pipelines for processing and transforming data. We import the sdk package.
```java
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.values.PCollection;
```  
The pipeline structure in Apache Beam.  
**PCollection** - The dataset(either bounded or unbounded).  
**PTransform** - The transformation(map, filter, group, windowing).  
**Pipeline Runner** - Defines how and where the pipeline runs (DataflowRunner for GCP).

**Dataflow Service** - The dataflow service is a fully managed execution engine.  
It optimizes pipeline execution (Using Fusion and Dynamic Rebalancing), Manages resources(Scale UP and Scale Down automatically), Provides Monitoring Tools(Cloud Logging and Monitoring).

**Workers and Executors** - Data flow runs pipeline on distributed workers in Google Cloud. Workers - Virtual Machines executing the pipeline tasks. Executors - Handles tasks like reading, processing and writing data.

**DAG** - Nodes - Operations(Transformation) and Edges - Data flow between transformation.

**Storage and Connectors** - Dataflow integrates with multiple cloud storage system.  
Cloud storage - Stores raw files(CSV, JSON).  
BigQuery - Stores structured and analytical data.  
Pub/Sub - Message ingestion for streaming pipelines.  
BigQuery/Spanner - Low latency database storage.  
Kafka, Redis - External data connector via Apache Beam IO.

## Difference between Batch and Straeming Processing.
| Batch Processing                                     | Streaming Processing                    |
|------------------------------------------------------|-----------------------------------------|
| Finite dataset and run once.                         | Infinite Dtasets and runs continuously. |
| High latency(minutes/hours)                          | Low latency(millisecods/seconds|
| It is used for the ETL and historical data analysis. |Itis used for real time analytics, fraud detection.
| Windowing is ntot needed.                            |Windowing is needed to handle rea time data.|
| Triggers not needed.                                 |Requires to decide when to emit results.|

Batch pipeline reading from cloud storage and writing in Bigquery.
```java
Pipeline p = Pipeline.create();

p.apply("Read CSV", TextIO.read().from("gs://bucket/input.csv"))
 .apply("Transform Data", MapElements.into(TypeDescriptors.strings()).via(String::toUpperCase))
 .apply("Write to BQ", BigQueryIO.writeTableRows()
     .to("project:dataset.table")
     .withSchema(schema)
     .withWriteDisposition(WriteDisposition.WRITE_APPEND));

p.run().waitUntilFinish();
```

Streaming pipeline reading from Pub/Sub and writing in Bigquery.
```java
Pipeline p = Pipeline.create();

p.apply("Read PubSub", PubsubIO.readStrings().fromSubscription("projects/my-project/subscriptions/my-sub"))
 .apply("Transform Data", ParDo.of(new DoFn<String, String>() {
     @ProcessElement
     public void processElement(@Element String input, OutputReceiver<String> output) {
         output.output(input.toUpperCase());
     }
 }))
 .apply("Write to BQ", BigQueryIO.writeTableRows()
     .to("project:dataset.table")
     .withSchema(schema)
     .withWriteDisposition(WriteDisposition.WRITE_APPEND));

p.run();
```
### What are the different windowing strategies in Dataflow.

|Windowing Type.|Description.|Use Cases.|
|---|---|---|
|Fixed  Window|Divides stream into fixed intervals(every 5 mins).|Web analytics, periodic reporting.|
Sliding Window.|	Overlapping windows with a slide interval (e.g., 10 min window, slides every 5 min).|	Trend detection.|
Session Window.|	Based on user-defined inactivity (e.g., 30 min of user inactivity).|	User sessions in web tracking.|
Global Window.|	Treats all elements as one infinite window.|	Batch processing or no windowing needed.|
Fixed window with time fo 5 mins.
```java
PCollection<KV<String, Integer>> windowedCounts = input
    .apply(Window.into(FixedWindows.of(Duration.standardMinutes(5))))
    .apply(Count.perElement());
```
### How does dataflow handles autoscaling.
Dataflow dynamically scales workers based on load.  
**Batch Mode** - Scales workers at the start and scales down after job completion.  
**Streaming Mode**: Continuously adjusts worker count to handle data spikes.  
**Dynamic Work Rebalancing**: Redistributes work when load is uneven.
