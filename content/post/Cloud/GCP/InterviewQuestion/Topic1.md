+++
title = 'Topic 1'
date = 2025-02-11T05:23:30+05:30

url = "/post/Cloud/GCP/InterviewQuestion/Topic1/"
tags = ['interviewQuestion', 'java']
+++
### VPC - Virtual Private Network.

Google Cloud VPC (Virtual Private Cloud) is a logically isolated network that allows you to securely connect, manage, and control communication between resources within Google Cloud. The Virtual Private Cloud gives users a great deal of wiggle room in terms of regulating regional and global workload connectivity. Without having to rely on the public internet, virtual private networks (VPCs) make it possible for multiple regions to communicate with one another.  
Google Cloud VPC is a global, highly scalable virtual network.  
It enables secure, private communication between resources.  
Supports multi-region deployments, hybrid connectivity, and fine-grained access control.

Key Features.

**Global Networking.**    
Google Cloud VPC is global, meaning a single VPC can span across multiple regions.  
Unlike AWS, where VPCs are region-specific, GCP VPC enables cross-region communication without requiring VPC peering.

**Subnetworks (Subnets).**  
A VPC contains subnets, which define the IP range and region.  
Each subnet can exist in only one region, but all subnets belong to a single global VPC. 

**Private & Public Communication.**  
Internal Communication: VM instances in the same VPC can communicate using private IPs.  
External Communication: VM instances can communicate with the internet through Cloud NAT (without needing public IPs). 

**VPC Peering & Shared VPC.**  
VPC Peering: Allows private connectivity between VPCs without requiring external IPs.  
Shared VPC: Enables multiple projects to share a single VPC, allowing better resource management.

**Firewall Rules.**  
Every VPC has firewall rules that define which traffic is allowed or blocked.  
Rules can be set based on IP ranges, protocols, and ports.

**Cloud Interconnect & VPN.**  
Cloud VPN: Securely connects on-premises networks to a GCP VPC over the internet.  
Cloud Interconnect: Provides dedicated private connections between GCP and on-premises data centers.

### Explain the Google Cloud and all of its different levels.

There are four separate tiers of the Google Cloud Platform, and they are as follows:

IaaS is an abbreviation for "Infrastructure as a Service," which describes the most fundamental component of a cloud computing environment.  
The "platform as a service" (PaaS) model, which serves as the second tier, is responsible for providing the underlying infrastructure as well as the application development tools.  
Users get access to the cloud services offered by the provider through the third layer, which is known as "Software as a Service," or SaaS.  
Despite the fact that business process outsourcing (BPO) is not a technical solution, it is considered to be the final layer because of its essential role in outsourcing business operations. In the context of cloud computing services, business process outsourcing (BPO) refers to the practice of entering into a contract with a third party in order to manage the requirements of the end user.

The ability to create your own machine types, complete with arbitrary configurations for the CPU, RAM, and storage devices.  
When resizing a disc in situ, there is no requirement for maintenance or downtime to be taken.  
The many different tools that are pre-installed with GCP can be used to manage a wide variety of different operations.  
There are two different web hosting options available, and you have the option to select either one of them. App Engine gives users the option of using a Platform as a Service, whereas Compute Engine gives users the chance to utilize an Infrastructure as a Service.

### Google Compute Engine and Google App Engine

The product that Google offers in the category of infrastructure as a service (IaaS) is referred to as Google Compute Engine, whereas the product that Google offers in the category of the platform as a service (PaaS) is referred to as Google App Engine.  Google Compute Engine offers scalable virtual machines that operate within Google's data centers

Autoscaling in Google Compute Engine, start by setting up instance groups. Define autoscaling policies based on relevant metrics such as CPU utilization and load balancing usage. This configuration ensures that the system scales up during high demand to maintain performance and scales down during low demand to optimize cost efficiency.

### Main in GCP.


Compute Engine, Kubernetes Engine, Cloud Storage, BigQuery, Cloud SQL, and Pub/Sub.

Identity and Access Management (IAM): Understanding IAM roles, permissions, custom roles, service accounts, workload identity federation and how to manage user access within GCP.   
Data Storage and Databases: Knowledge of Cloud Storage, Cloud SQL, Cloud Spanner, Firestore, and Bigtable, including their use cases and configurations.  
Serverless Computing: Familiarity with Cloud Functions, Cloud Run, and App Engine, and how to deploy and manage serverless applications.  
Compute and Scaling Solutions: You should have a thorough understanding of Compute Engine, Kubernetes Engine, and App Engine, including concepts such as autoscaling, load balancing, and resource optimization.  
Monitoring and Logging: Proficiency with Google Cloud's Operations Suite (formerly Stackdriver), including Monitoring, Logging, Trace, Debugger, and Error Reporting to ensure system reliability and performance.  
Networking: It is essential to be familiar with Virtual Private Cloud (VPC), VPC Peering, Shared VPC, and VPNs, as well as the configuration and management of subnets, firewalls, routes, VPNs, and load balancing.   
DevOps and CI/CD Practices: Knowledge of Cloud Build, Container Registry, and CI/CD pipeline automation is important for efficient development and deployment practices.  
Security and Compliance: You should be aware of GCP’s security offerings, including encryption methods, security key management, and adherence to compliance standards.  
Big Data and Analytics: A good grasp of BigQuery, Data Studio, Dataprep, and Looker is necessary for large-scale data analysis and visualization tasks.

### What are the Google Cloud Storage Classes?

Google Cloud Storage offers four main storage classes -    
Standard Storage for frequently accessed data with high performance.  
Nearline Storage for data accessed less than once a month at a lower cost.  
Coldline Storage for data accessed less than once a year at an even lower cost.  
Archive Storage for long-term data archiving and backup with the lowest cost.

Give some real world data like the profile image, real life, activity log.

### What is Google Cloud Pub/Sub?

Pub/Sub is designed for real-time messaging and event-driven architectures to support asynchronous communication between services. Some of its typical use cases include logging systems, data ingestion pipelines, real-time analytics, and integrating microservices.

### What is a BigQuery and how does it handle large datasets?

BigQuery is Google’s serverless data warehouse and is designed to handle large datasets efficiently with SQL. It uses columnar storage, which stores data on disk in columns instead of rows, to optimize for read-heavy operations. It also leverages parallel processing, allowing for task distribution across multiple machines to process data simultaneously. This enables BigQuery to run fast queries, even on petabytes of data. Additionally, it integrates with other GCP services like Dataflow for data processing and Pub/Sub for real-time data ingestion. BigQuery also includes features like BigQuery ML for performing machine learning directly within the platform.

### Advantage of GCP.

