+++
title = 'Devops Introduction'
date = 2025-06-14T21:52:17+05:30

url = "/post/DevOps/DevopsIntroduction"
tags = ['devops', 'work']
categories = ['devops', 'work', 'low level design', 'system design', 'high level design']
+++

{{<figure src="/images/Devops/Devops.png" alt="Devops.">}}

### TechStack Involved.
{{<figure src="/images/Devops/TechStack.png" alt="TechStack.">}}

### **What is the difference between the DevOps and SRE?**

Developers had little understanding of the operation side they write the code and give to the operator to make it work in production.  
Developers want to deploy features faster and the operator wanted to make it slow to increase stability and it causes tension in between the team.

DevOps - culture to work the developer and operation in same team. It breaks the barriers.  
DevOps is a philosophy then SRE is a way to accomplish it.  
### **`class SRE implements DevOps`**
**SLI** - Service Level Indicator - Metrics like request latency, throughput requests per second, failures per requests.  
They are aggregated over time and add a percentile like 99.9% or median and get a concrete threshold to define the good number for the system.
Example - A good SLI might be saying - "Is the 99% tile latency of requests received in the past 5 mins less than 300 ms?" or "Is the ratio of errors to the total requests received in the past 5 mins less than 1%?"

**SLO** - Service Level Objectives - Its like cumulative number. When there is SLI - at any moment in time whether the service if the service available or down - Integrated all over a longer period of time like in a year 99.9% over a year to see if the total amount of down time is more or less than 9 hours.

**SLA** - Service Level Agreement - Its an agreement like here is what I will do when I dont meet the expectation. Business agreements between a customer ad service provider typically based on SLOs.

Make SLA more lenient than SLO so you get early warning before you have to break user experience.  
SLI drive SLO which informs SLA.

{{<figure src="/images/Devops/SLISLOSLA.png" alt="SLI SLO SLA.">}}


|SLI| SLO                                                                 |SLA|
|---|---------------------------------------------------------------------|---|
SLI are service level indicator or metrics over time which inform about the health of a service.| Objectives agreed upon bounds for how often those SLI must be met.  | SLA are business level agreements which defines the service availability for the customer and the penalties for failing to deliver the availability.|
95th percentile latency of homepage requests over past 5 mins>300ms| 95th percentile homepage SLI will succeed 99.9% over trailing year. |Servcies credits if 95th percentile homepage SLI succeeds less than 99.5% over trailing year.|