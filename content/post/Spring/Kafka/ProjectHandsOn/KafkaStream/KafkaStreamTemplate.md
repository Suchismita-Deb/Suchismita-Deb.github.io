+++
title = 'Kafka Stream Template Project.'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaProject/KafkaStreamTemplateProject"
tags = ['spring', 'kafka']
+++
Template for using Kafka Streams to consume from an input topic, perform transformations, and then produce to an output topic.

Dependency Needed - Apache Kafka, Kafka Stream, Avro serializer, Avro. 

See the [Fundamentals Page](https://suchismita-deb.github.io/post/spring/kafka/KafkaProjectFundamental/) to add the dependency in gradle.

The application.properties will have the details like the input-topic, dlt-topic, output-topic.
```yml
topics.input-topic=EDA_SAMPLE_TOPIC
topics.output-topic=EDA_SAMPLE_STREAMS_TOPIC
topics.dlt-topic=EDA_SAMPLE_TOPIC_DLT

server.port=8080
spring.application.name=eda-ccloud-kstreams-template

client.id=eda-ccloud-kstreams-template
bootstrap.servers=lkc-1jr5dz-61m326.us-central1.gcp.glb.confluent.cloud:9092
sasl.mechanism=PLAIN
# Stored in GCP Secret Manager and imported into environment variables via ArgoCD
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username='USERNAME' password='CHANGEIT';
security.protocol=SASL_SSL
schema.registry.url=https://psrc-30dr2.us-central1.gcp.confluent.cloud
basic.auth.credentials.source=USER_INFO
# Stored in GCP Secret Manager and imported into environment variables via ArgoCD
basic.auth.user.info=SCHEMA_REGISTRY_API_KEY:CHANGEIT
specific.avro.reader=true
auto.register.schemas=false
use.latest.version=true
key.serializer=org.apache.kafka.common.serialization.StringSerializer
value.serializer=org.apache.kafka.common.serialization.StringSerializer
application.id=eda-kstreams-springboot-template-group
default.key.serde=org.apache.kafka.common.serialization.Serdes$StringSerde
default.value.serde=io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde
default.deserialization.exception.handler=com.cardinalhealth.edaccloud.kstreams.exceptionhandler.CustomDeserializationExceptionHandler
processing.exception.handler=com.cardinalhealth.edaccloud.kstreams.exceptionhandler.CustomProcessingExceptionHandler
```


