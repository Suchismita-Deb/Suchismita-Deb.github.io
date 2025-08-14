+++
title = 'Kafka Avro Schema Project'
date = 2025-08-11T15:03:07+05:30

url= "/post/spring/kafka/KafkaAvroSchemaProject"
tags = ['spring', 'kafka']
+++
In the project springKafkaAvroMain project first create the Schema and using the Maven plugin create the avro class. Then the producer and consumer and serializer and deserializer and the schema registery.  
The avro object need schema registery.

In the resource package create the avro folder and create one file employee.avsc  
One sample avro file.
```yml
{
  "namespace": "com.kafkaProject.dto", # Package to put the generated class.
  "type": "record", // type is avro record.
  "name": "Employee",
  "fields": [
    {
      "name": "id",
      "type": "string"
    },
    {
      "name": "firstName",
      "type": "string"
    },
    {
      "name": "middleName",
      "type": "string",
      "default": ""
    },
    {
      "name": "lastName",
      "type": "string"
    },
    {
      "name": "emailId",
      "type": "string",
      "default": ""
    }
  ]
}
```