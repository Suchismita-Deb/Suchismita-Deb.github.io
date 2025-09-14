+++
title = 'Design S3 Object Storage.'
date = 2025-07-28T10:07:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignS3ObjectStorage"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++

Object Storage Service - Amazon Simple Storage Service S3.  
The service provide by AWS that provide object storage through a RESTful API based interface.

2006: 🚀 S3 launched

2010–2011: 🔐 Key features added — versioning, bucket policy, multipart upload support, encryption, multiobject delete, object expiration.

2013: 📦 2 trillion objects milestone

2014–2015: 🔁 Lifecycle, notifications, cross-region replication

2021: 💥 100 trillion objects stored

### **Storage System Understanding**
Storage system falls in 3 broad categories - Block storage, File storage, Object storage.

### Block Storage.
In 1960s, common devices like Hard Disk Drive and Solid State Drive that are physically atatched to the server.  
Block storage can be connected over high speed network using Fibre Channel FC and iSCSI. 
It presents a raw block to the server as volumes. Raw block - unstructured form of data. Combined together form a volume which is container that the server can use.  
The flexible and versatile form of storage and can be used by server as file system or anything.

🧠 Quick Mnemonic: “RAW = Ready, Adaptable, Writable”
Ready for formatting or direct use

Adaptable to different workloads

Writable by server or application logic.

### File Storage.
Build on top of block storage and provide a ligher level of abstraction to easy the file and directories.  
File storage could be made accessible by a large number of servers using common file level network protocols like SMB/CIFS and NFS. 

The most easy way to manage the storage. The server accessing fiel storage so not need to deal with teh complexity of managing the blocks, formatting volumes.

### Object Storage.
Object stirage stores all data as object in a flat structure. No hierarchical directory structure. Data access is normally providede by RESTful APIs.
Object stirage makes a tradeoff to high durability, vast scale and low cost.  
It target cold data ns mainly used for archival and backup.  
Slow compared to other storage type.  

Example - AWS S3, Google Object Storage, Azure Blob Stirage.

{{<figure src="/images/SystemDesign/DesignExample/ObjectStorageS3/DifferentStorageStructure.png" alt="KafkaCluster." caption="Different Storage Structure">}}

### _Comparison_
|Topic|Block Storage|File Storage|Object Storage|
|---|---|---|---|
|Update Content|Y|Y|N(object versioning possible but no in-place update).|
|Cost|High|Medium|Low|
|Performance|Medium to high, very high|Medium to high.|Low to Medium.|
|Data Access|SAS/iSCSI/FC|Standard file access CIFS/SMB and NFS.|RESTful API.|
|Scalability|Medium Scalability.|High Scalability.|Vast Scalability.|
|Application|VM, high performance application like database.|General purpose.|Binary data, Unstructured data.|

### **Object Storage Understanding.**

**Bucket** - A logical container for objects. It is globally unique. To upload data in S3 first create a bucket.

{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/HighLevelDesign.png" alt="UserRequest." caption="High Level Design">}}

{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/ObjectVersioning.PNG" alt="UserRequest." caption="Object Versioning.">}}

{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/Summary.png" alt="UserRequest." caption="Summary.">}}




253 to 

