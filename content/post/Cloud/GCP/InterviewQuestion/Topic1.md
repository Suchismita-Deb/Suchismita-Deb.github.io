+++
title = 'Topic1'
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

The product that Google offers in the category of infrastructure as a service (IaaS) is referred to as Google Compute Engine, whereas the product that Google offers in the category of the platform as a service (PaaS) is referred to as Google App Engine.