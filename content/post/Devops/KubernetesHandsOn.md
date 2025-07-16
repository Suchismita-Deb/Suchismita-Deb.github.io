+++
title = 'Kubernetes Hands On'
date = 2025-07-15T21:52:53+05:30

url= "/post/Devops/Course/HandsOn"
tags=["devops", "kubernetes"]
+++
# Module 6.


### **Networking in Kubernetes.**
Single node Kubernetes Cluster - the node has an IP address say 192.168.1.2 and ip address is used to access the Kubernetes node.

When using minikube setup then the ip is the mini cube virtual machine inside the hypervisor. The laptop have a different Ip and the minikube has different IP.

Single node cluster there is a single pod. Pod hosts container.

In docker the IP address is assigned to the docker container and in Kubernetes the ip address is assigned to a pod.

Each pod in the Kubernetes gets its own internal IP address. In this case, it's in the range 10.244 series and the IP assigned to the pod is 10.244.0.2. 

