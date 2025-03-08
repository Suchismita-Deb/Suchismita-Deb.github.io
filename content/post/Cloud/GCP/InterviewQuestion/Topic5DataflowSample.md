+++
title = 'DataFlow Project.'
date = 2025-03-08T15:20:29+05:30

url = "/post/Cloud/GCP/InterviewQuestion/Topic5/"
tags = ["Spring", "interviewQuestion"]
+++
Login to the GCP.

Activate the services that are needed - Cloud Storage, Cloud Build, Artifact Registery, Data Flow.

DataFlow Api - Enable from API services.

In cloud storage create a new bucket - crosscutdata

Cloud Build Api - Enable.

Artifact registery API enabled.

Inside the Artifact Registery the repository created - crosscutdata-repo.

Install **gcloud cli** - It helps to connect local to gcp. It will help in build the template and run the template.

Creating a pipeline that read from cud storage and write to ckoud storage.

pom file - dependeny.

beam-sdk-java-core - beam core dependency.

beam-sdk-java-io-google-cloud-platform - dataflow dependency. Gcp dependency for beam generic.

beam-runners-google-cloud-dataflow-java - specific to dataflow.

In the build there are few plugins like the maven-compiler, maven-shade and maven-execution.

There are two class StreamingPipeline, Options.

StreamingPipeline class.

```java
public interface Options extends DataflowPipelineOptions{}
```

In the gcloud cli create a new project and then inside the cloud storage create a bucket.

```java
public class StreamingPipeline {
	public static void main(String[] args) { 
		Options options = PipelineOptionsFactory.fromArgs(args).withValidation().as(Options.class); 
		Pipelinep p = Pipeline.create(options); 
// This example reads from a public dataset containing the text of King Leac 
		PCollection<String> input = p.apply("Read", TextIO.read().from("gs://apache-beam-samples/shakespeare/kinglear.txt")); 
		PDone done = input.apply("Write", TextIO.write().to("gs://crosscutdata-bucket/dataflow/output.txt"));
		PipelineResult result = p.run(); 
		try { 
			result.getState(); 
			result.waituntilfinish(); 
		} catch (UnsupportedOperationException e) { 
		 // do nothing 
		} catch (Exception e) {
			e.printStackTrace(); 
		}
	}
}
```

Build the template and deploy the template in the dataflow.



One project in python./
Input -> Transformation -> Output.
In Apache Beam it is called PTranformation. The entire thing is called PCollection.
PCollection is an immutable varibale that can store any amount of data.
PCollection A=[1,2,3,4,5]
PTranformation A>2
PCollection A1 is the new PCollection and A1=[3,4,5]
It create new Pcollection and not modify the existing one.


pip install apache_beam.

import apache_beam as beam

Here everything is defined in a pipeline, read any file, write anything all are pipeline.

pipe = beam.Pipeline()

Upload the file.

ip = ( pipe
|beam.io.ReadFromText("PathofTheFile", skip_header_lines=True)
|beam.Map(lambda x:x.split(","))
|beam.filter(lambda x:x[1]=="123")
|beam.Map(print)
)

| = apply function.
the header contains the column name we can skip the header.
CSV file here read as a Text and need to convert to the csv file. Map, filter are the common function.
The map will make the entire row in one list.
The filter will take one value of the list and condition.

All are lazy so need to run.

pipe.run()


|beam.filter(lambda x:x[1]=="123")
|beam.Map(print)

It will print the list.

|beam.filter(lambda x:x[1]=="123")
|beam.combiners.Count.Globally()
|beam.Map(print)
