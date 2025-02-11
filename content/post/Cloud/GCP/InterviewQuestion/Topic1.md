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