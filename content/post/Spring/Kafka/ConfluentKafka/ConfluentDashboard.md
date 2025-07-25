+++
title = 'Confluent Dashboard'
date = 2025-07-15T21:52:53+05:30

url= "/post/Spring/Kafka/ConfluentKafka/ConfluentBasics"
tags=["devops", "confluent", "kafka"]
+++
### **Networking.**

Inside the environment and inside the cluster there is a networking tab.

It contains the Associated Network and **PSC Network** (Private Service Connect Network)

{{< figure src="/images/Spring/Kafka/ConfluentKafka/ClusterNetwork.png" alt="Cluster Network." caption="Cluster Network." >}}

### **Private Service Connect.**


{{< figure src="/images/Spring/Kafka/ConfluentKafka/PrivateServiceConnectNetwork.png" alt="Private Service Connect Network." caption="Private Service Connect Network." >}}

**Service Account needs to be selected in creating the managed connector.** 

### **Ingress Connections.**

The ingress connection is showing the GCP Private Service Connect.

{{< figure src="/images/Spring/Kafka/ConfluentKafka/IngressConnection.png" alt="Ingress Connection" caption="Ingress Connection." >}}

### **Egress Connections.**



In any topic there will be an option called Action and there we can send one new message to the topic. One new message in the topic. Get thepayload of the topic from any one of the existing data in the confluent.

Set the HTTP header in the confluent to make a managed connector - Content-Type: application/json

{{< figure src="/images/Spring/Kafka/ConfluentKafka/EgressConnection.png" alt="Egress Connection." caption="Egress Connection" >}}

**The DNS Record in the connection.**

{{< figure src="/images/Spring/Kafka/ConfluentKafka/CreatingCustomEndpoint.png" alt="Creating Custom Endpoint." caption="Creating Custom Endpoint." >}}
