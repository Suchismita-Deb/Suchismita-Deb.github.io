+++
title = 'Topic2'
date = 2025-02-11T14:43:06+05:30

url = "/post/Cloud/GCP/InterviewQuestion/Topic2"
tags = ['interviewQuestion', 'java']
+++
### How to deploy application to Google Cloud.

First add teh app engine plugin into maven.

Open console.
Select create a project.
Give a project name.
Note the project Is.
Enable billing for the project.

App Engine. Select the language. Then set the region.  
Install the Google Cloud SDK.
Open sdk in terminal - Set the project `gcloud config set project projectId`
See the project is in same cloud configure - `gcloud config list`

In gcloud we need to set the environment we are using and the jdk version.

There should be one yml file in the appEngine folder.
Inside the app.yml file.
```yml
runtime: java
env: flex
runtime_congif:
    jdk: openjdk8
handlers:
    url: /.*
    script: this field is required, but ignored
```
Maven build appEnginedeploy in the application.

### Spring Boot Application in MYSQL and GCLOUD - Cloud SQL.

In console - Hamburger - SQL - In Cloud SQL we need to make the instance. Create the instance and version.

There will be a option called open cloud shell. In the cloud shell we need to create the db connect - `gcloud sql connect INSTANCE_NAME --user=PWD --quiet`

Now there will be a SQL query like `Create Database Products` and `Use Products`

In the sidebar under the SQL there is Database there we can see the database product.

In the application.yml file we need to set the url. In the url there is connection name and it is cloud sql instance and there is socketFactory.

In Pom we need the mysql connector dependencta nd the mysql socket factory dependency.

Now we build the project and the jar file is created and in the project directory we get the jar file and connect to the SDK login with user and select the project where to deploy the application. In the same directory open cmd and `gcloud app deploy JAR_FILE_NAME.jar`. When deployment is done there is a url like sonic-passkey copy the url and the link in the url and there will be response.

### Spring Boot Application and GCLOUD and Cloud Spanner.

Create the instance and db in Spanner.

Configure the service account in GCloud.  
In IAM and Admin - Create a new Service Account to access the spanner.

Then there is an option to create a key and get the key and put in the resource folder of the application.


What is bucket.

GKE.

Compute Engine.

Cloud computing helps in computing, networking and storage and security. 

What libraries and tools are provided by GCP.