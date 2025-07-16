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
