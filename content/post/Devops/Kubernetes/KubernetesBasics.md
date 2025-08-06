+++
title = 'KubernetesBasics'
date = 2025-07-15T21:52:53+05:30

url= "/post/Devops/Kubernetes/Basics"
tags=["devops", "kubernetes"]
+++

Kubernetes is an open source container orchestration platform, It automates the deployment, scaling and management of containerized application.

{{<figure src="/images/Devops/Kubernetes/KubernetesArchitecture.png" alt="Kubernetes Architecture" caption="Kubernetes Architecture.">}}

A kubernetes cluster is a set of machine called nodes and used to run containerized application. There are two main part in kubernetes cluster - Control plane and the set of worker nodes.

Control plane - It is responsible for the managing the state of the cluster.

{{<figure src="/images/Devops/Kubernetes/ControlPlane.png" alt="ControlPlane Architecture" caption="Control Plane.">}}

In production environment the control plane runs on multiple nodes that span across several data center zones.

{{<figure src="/images/Devops/Kubernetes/KubernetesWorkflow.png" alt="Kubernetes Workflow Architecture." caption="Kubernetes Workflow Architecture.">}}

### **Kubernetes Egress.**

Egress in Kubernetes means traffic that exists the cluster. The communication that goes out of the cster from the pod to an external endpoint.

Pod inside the cluster need to talk to the database or another api endpoint that egress traffic. By default, pods in the kuernetes cluster are isolated from the xternal network and cannot initiate outbound connections.

There is specific rules to configure the egress traffic. **Egress Network Policies** define which external endpoints pods can access. These policies function similarly to a firewall controlling outbound traffic. 

The other way using **Egress Gateway** network component that route all outbound connection through a pecific service proxy before they reach the destination. Tools like **Istio** provide an egress Gateway for managing egress traffic.

### **Kubernetes for Absolute Beginners.**

