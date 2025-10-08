+++
title = 'Design Distributed Email Service.'
date = 2025-07-28T10:08:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignDistributedEmailService"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++

Designing a large scale email services like Gmail, Outlook, Yahoo.


A modern email service is a complex system with many features. 

### __Understand the Problem.__

Get the feature to design.  
DAU - 1 billion.

The important features are - Send and receive emails, Fetch all emails, Filter emails by read and unread status, Search emails by subject, sender and body andAnti spam and anti virus and authentication.

How do user connect with mail servers?  
Traditionally user connects with mail servers through native clients like SMTP, POP, IMAP and vendor specific protocol. Those protocol are legacy still very popular. In the interview lets assume HTTP is used for client and server communication.

Can email have attachments?  
Yes.

Non Functional Requirements.  

Reliability - Not lose email data.  
Availability - Email and user data shoul dbe replicated across multiple nodes to ensure availability.The system should continue to function despite partial system failure.  
Scalability - The system should be able to handle the increasing number of users and emails.

Flexibility and Extensibility - The system allow to add new features or improve performance by adding new components. Traditional email protocol like POP and IMAP have limited functionality. Custom protocol can be created to satisfy flexibility and extensibility.

### _Back Of the Envelope._
User 1 billion.  

The average number of email the person sends per day is 10. QPS for sending email = (10^9 * 10)/10^5 = 100,000.

The average number of emil a person receives in a day 40 and the average size of the email metadata is 50 kb. Metadata contains everything related to the email excluding the attachment files.

### High Level Design.

Email server basics and the high level design of the distributed email servers. 

_Email Server Knowledge._    
There are many email protocols used to send and receive emails. Traditionally most mail server used email protocol like POP, IMAP and SMTP.  


**Email Protocol**.

SMTP - Simple Mail Transfer Protocol is a standard protocol for sending emails from one mail server to another. The most popular protocols for retrieving emails are Post Office Protocol POP and the Internet MAil Access Protocol IMAP.

Pop is a standard male protocol to retrieve and download emails from a remote Mail server to a local email client . Emails are downloaded to computer They are deleted from the email server which means The user can only access email on that computer. POP requires male clients to download the entire email . it can take time if an email contains large attachment .

IMAP - It is a standard male protocol for receiving emails from a local email client. When user read an email it is connected to an external mail server and the details transferred to your local device . IMA Only downloads a message when the user click on it and the email are not deleted from the mail server meaning user can access email from multiple devices . IMAP is the most widely used protocol for individual email account it works well when the connexion is slow as only the email headed information is downloaded until it opened .

HTTPS - It is not a male protocol but it can be used to access the mailbox particularly for web based email. For example its common for Microsoft outlook to talk to mobile devices over https on a custom made protocol called ActiveSync.

**Domain name Service Dns.**    
A dns server is used to look up the mail exchanger record mx record but the recipient's domain . 
When running ADNS lookup for Gmail com from the command line User will get mx records  
 
The priority number indicates preferences where the male server with a lower priority number is more preferred.   

`gmail-smtp-in.1.googl.com` - used first as pririty 5.
A sending mail server with attempt to connect and send message to these male first . While the connexion fails the sending mail server will attempt to connect to the mail server with the next lowest priority alt1.


**Attachment.**
An email attachment is sent along with email message commonly with page 64 encoding. There is generally a size limit for an attachment outlook and Gmail limit the size to 20 to 25 MB.

MultiPurpose Internet Mail Extension MIME - Is a specification that allows the judgement to be sent over the internet .  
Traditional mail server.

Traditional mail server then the distributed server.
It will help us to understand how to scale an email server system . Traditional mail server is good when there are limited email user usually a single server.

### Traditional Mail Server Architecture.

_Traditional mail servers._

{{<figure src="/images/SystemDesign/DesignExample/EmailServices/TraditionalMailServers.png" alt="UserRequest." caption="Traditional Mail Servers.">}}

Alice logs into the outlook client compose an email and press the send button the email is then sent to the outlook mail server the communication protocol between the client and the mail server is smtp  
 
Outlook mail server queries the dns to find the address of the recipients smtp server. In this case it is Gmail SMTP Server . it transfers the email to the Gmail mail server . the communication protocol between the mail server is SMTP  
 
The Gmail Server stores the mail and makes it available to Bob the recipient . Gmail plant fetches new email through imap or pop server when Bob logs in to Gmail .

### Storage.
In traditional mail server email were stored in local file directories and each email were stored in a separate file with a unique name . Each user maintain a user directory to store configuration data and mailboxes Mail DIR was a popular way to store email messages on the mail server .

Find directories work well when the user base is small but it was challenging to retrieve data and backup billions of emails. When the email grows in volume the file structure becomes more complex and disc IO become a bottleneck. The local directories also dont satisfy the high availability and reliability requirement the disc can be damaged and server can go down We will be now shifting to the distributed storage layer . 
  
Email functionality has Evolved as moved from text based format to rich features like multimedia threading search labels and many more The email protocol POP, IMAP, SMTP for invented long time ago and they were not designed to support this new features India scalable to billions of users. 

_Distributed Mail Servers._
Distributed mail service are designed to support modern use cases and solves the problem of scale and resilience .  
Email API.
Email api can mean very different things for different mail client . example Smtp Pop IMAP Apis for native mobile clients. smtp communication between sender and receiver mail servers. restful api over http for full feature and interactive web based email applications . 
Important apis for webmail. 

POST /v1/messages - Send a message to the recipients in to To, Cc, Bcc headers.

GET /v1/folders - Return all folders of an email account. 
Response.
```
id:string // Unique folder identifier.
name:string // Name of the folder. According to RFC the default folders can be one of the option - All, Archive, Drafts, Flagged, Junk, Sent, Trash.
user_id:string // Reference to the account owner.
```

GET /v1/folders/{:folder_id}/messages
Return on messages under the folder keeping in mind that this is simplified api in reality it will support pagination.

GET /v1/messages/{:message_id}
Get all information about the specific message. messages are called building blocks for an email application continue information about the send and recipient message subject body attachment.

A messages object.

```
{
  "user_id": string // Reference to the account owner.
  "from": name: string, "email": string // <name, email> pair of the sender.
  "to": [name:string, email:string]  // A list of <name, email> pair.
  "subject": string // Subject of the email.
  "body": string // Message body.
  "is_read": boolean // Indicate if a message is read or not.
}
```
### Distributed email server architecture  
Traditional email servers were designed to work with a single server copy only synchronising data across servers can be a difficult task and keeping emails from being misclassified as spam by recipients mail server is challenging.

The high level design of the system.
{{<figure src="/images/SystemDesign/DesignExample/EmailServices/HighLevelDesign.png" alt="UserRequest." caption="The High Level Design.">}}
Webmail - Users web browser to receive and send emails.
Web servers - Web servers are public facing request response services used to manage features such as login sign up as a profile . in the design all email api requests such as sending an email loading mail folder loading all mails in a folder goes through web server .  
Next one  
Real time servers - Responsible for pushing new email updates to client in real time. real time servers are stateful services because they need to maintain their persistent connexions To support real time communications we have few options such as long polling websockets. websocket is the most elegant solution But one drawback Is browser compatibility. a possible solution to establish a websocket connexion whenever possible And use long polling as a fall back .  
 
Example of a real time mail server Apache James that implements Json meta application protocol jmap Subputable over websocket .


Metadata database The database stores male metadata including male subject body from user to user etc.

Attachment store Objects today such as Amazon simple storage services SI as an attachment store is chosen here S3 scalable storage infrastructure that is written for storing large files such as image video files etc Attachment can be up to 25MB in size. No sql column family database like Cassandra might not be a good fit for this following reasons -   
Even though Kassandra supports blob data type and its maximum theoretical size for a blob is 2GB the practical limit is less than 1MB. Another problem with putting attachment in Cassandra is that we cannot use a row cache as attachments take too much memory space 

Distributed cash The most recent emails are repeatedly loaded by the client caching recent email in memory significant improves the load time. we can use redis here because it offers which features such as less than it is easy to scale.  
 
Search store It is a distributed document stored. it uses data structure called inverted index that supports very fast full text searches. 
The components of the distributed mail servers are discussed next the main two workflow that we will focus on Email sending flow email receiving flow .

### Email Sending Flow.


{{<figure src="/images/SystemDesign/DesignExample/EmailServices/EmailSendingFlow.png" alt="UserRequest." caption="The High Level Design.">}}

User writes an email on webmail and press the send button at the request sent to the load balancer. The load balancer makes sure it does not exceed the rate limit and route the traffic to the particular web server. 

Web server responsible for basic email validation. each incoming email is checked against predefined rules such as email size limit See if the domain of the Recipient's email address is the same as the sender . in that case the Web server ensured the mail data is spam and virus free If so email data is inserted into the sender's sent folder and recipients inbox folder. Recipient can fetch the email directly via restful api . No need to do the next steps.

Message Q If basic email validation succeeds the email data is passed to the outgoing queue. If the attachment is too large to fit into the queue we should store the attachment in the object store and save the object reference in the queued message. If the basic validation fails the email is put into the error queue.

Smtp outgoing workers pull messages from the outgoing queue and make sure email are spam and virus free.  
The outgoing email is sent in the sent folder of the storage layer. Smtp outgoing workers sent the email to the recipient's mail server.  
Each message in the outgoing queue contains all the middle generated Play To create an email. A distributed message queue is a critical component that allows asynchronous maid processing By decoupling SMTP outgoing workers from the Web server we can scale smtp outgoing workers independently .

We monitor the size of the outgoing queue very closely if there are many Indian stuck in the queue we need to analyse the causeway of the issue There can be the possibility of The recipient's main server is unavailable in that case we need to retrace sending the email at a later time Exponential backup might be a good retry strategy. not enough consumers to send email in this case we may need more consumers to reduce the processing time  .

### Email Receiving Flow.

{{<figure src="/images/SystemDesign/DesignExample/EmailServices/EmailReceivingFlow.png" alt="UserRequest." caption="Email Receiving Flow.">}}
Incoming email arrives at the smtp load balancer and it distributes the traffic among the smtp servers Email acceptance policy can be configured and applied at the smtp connexion level. example invalid emails are bounced to avoid unnecessary email processing. 
If the attachment of an email is too large to put into the key we can put into the attachment store is S3.  
Emails are put in the incoming email queue. the queue decouples made processing workers from smtp server so that can be scaled independently. moreover the queue serves as a buffer in case of email volume surges .   
Male processing workers are responsible for a lot of tasks including filtering of spam emails stock team viruses. the following steps assumes An email passed the validation. The email is stored in the mail storage cash and object at a store. if the receiver is currently online female is pushed to real time servers realtime servers are web service servers that allows clients to receive new emails in real time. for offline users emails are stored in the storage layer When the user comes back online the webmail client connects to web servers via restful API.

Web servers pull new email from the storage layer and return them to the client .

### Design Deep Dive.

Key components to scale the system metadata database search deliverability  And scalability  
  
Metadata database.  

The characteristics of email metadata choosing the right database data model and converse conversation threads .  

Characteristics Email metadata.   

Email headers are usually smaller frequently accessed and email body sizes can range from small to big but infrequently accessed User normally only read an email once again Most of the male operations such as fetching email and marking and email as you read and searching are isolated to our individual user care in other words males owned by a user are only accessible by that user and all the mail operations are performed by the same user .

Data recently impacts data usage. users usually only read the most recent events 82% of the read queries are for the data younger than 16 days. Data has high reliability requirements data loss is not acceptable.

Choose a third database.

At Gmail or outlook scale the database system is usually custom made to reduce input or output operations per second iops as they can become a Major constraint in the system.

 Considering all the options that we have For the designing of the system We have to come to the conclusion to choose the right database.

Relational database The main motivation Behind this database is to search emails efficiently. we can build indexes for email body and header With index simple search queries will be faster.

The relational database certificate optimised for small chunks of data entries and not for the idle for larger ones. A typical email is usually larger than few jbs are easily can be over 100 kb When HTML is important we can argue to use the PLOP data type in designing to support large data entries but the search queries over unstructured pob data type are not that efficient. so relational databases such as Bicycle or poster sequel are not good fit .

Distributed object storage Another potential solution is to store raw email in cloud storage such as Amazon S3 which can be a good option for backup storage but it is hard to efficiently support six features such as marking email as read Searching emails based on keyword threading emails etc .

No sequel database Google Big table is used by Gmail so it is definitely a viable solution however big table is not open source and How email search is implemented remains a mystery  Cassandra might be a good option as well but we haven't seen any large email providers use it yet.

Very few existing sources seems to be fit for our system . large email service provider tends to build their own highly customised databases however not designing the distributed database and the system should need databse that supports the feature - A single column can be a single digit of MB. strong data consistency design to reduce test IO it should highly Be available and fault tolerant. it should be easy to create incremental backups.

Data model.
One way to store the data is to use user _id as the partition key so data for one user is stored on a single shot. 1 limitation for the data model is that messages are not shorted among multiple users.

Defining the table the primary Key contains two components the partition key and the clustering key. partition key responsible for distributing data across nodes. as a general rule we want to spread the little. clustering key responsible sorting data within a partition.

At a high level an email service needs to support the following queries of the data layer The first query is to get all folders for the user The second pair is to display all teammates for a specific folder the 3rd query is to create delete or get a specific email here the 4th query is to fetch all read or unread emails. In case time permits we can discuss about the conversation threads.


### Query one get all folders for a user.
User _ID is the partition key supporters owned by the same user are located in one partition.
Image 
### Todo.
### Display all emails for a specific folder  
Open user loads their inbox email solution is shorted by the timestamp showing the most recent one at the top. in order to store all emails for the same folder in one partition composite to my partition key user id folder id is required . another column to note is email id. it data type is time into id and it is the clustering key used to sort emails in chronological order.

Image.
### Todo.

### Create delete or get an email.
 An email can have multiple attachments and these can be retrieved by the combination of email id and file name fields.  
Image.  
### Todo.

### Fetch all lead or unread emails.  
In case the domain model was relational database then the query to fetch all read emails would look like the given one.
### TODO.
The query to fetch all unread emails would look very similar to British need to change his red equals to ease red equals false in the above query.

 Our data model is designed for no sql. and no sequel data is normally only supports queries on partition and clustering key. Since is _rate in the email buy _folder table is neither of those most noticeable database will reject this query.

One way to get around this limitation is to fetch the entire folder for a user and perform the controller in the application field this could work for small health services but in the larger scale this will not work. the problem is commonly solved with denormalization in Nosql We will support the read by all unread queries we denormalize the email_by_folder data in two table.

read_emails - It stores all emails that are in good status . 

unread_email - It stores all emails that are in unique status.

To mark an unread email as read the email is related from unreal _emails and then insert it in read _emails period to fetch all unveiled emails for specific folding we need to run the query.

Image.
### TODO.

Denormalization Is a common practise. it makes the application code more complicated and harder to maintain but it improves the rate performance for the queries at scale. 

Conversation thread.

Threats are a feature supported by many Indian clients behaviour with group email replies with their regional message. this allows us to reach a volume associated to our conversations in one place Traditionally a threat is implemented using algorithms such as JWZ Read We will just see the core idea behind this algorithm. An email header generally contains the common fields.

Image.
### TODO.

With these field and email client can reconstruct male conversations from messages economy solutions and reputation are preloaded. 

Consistency trade off. 
Distributed databases that relax under applications for high availability that make a fundamental trade off between consistent and availability. correctness is very important for email systems so by design we want to have single primary for Any given mailbox. In the event of a failure the mailbox is inaccessible by the client so that Sync Our update operations is false until failover ends speed elite trades availability in favours of consistency.

Email Deliverability.
It is easy to setup a male server and start sending emails. the hard part is to get emails actually delivered to the users inbox. if an email ends up in the spam folder it means there is a high chance of the recipient quantum in. emails panel. according to Research more than 50% of an email sent are spam. if you set a new email server most likely our emails will end up into this mam folder because a new email server has no reputation. there are couple of factors to consider to input email deliverability. Next  
 
Dedicated IP It is recommended to have a dedicated IP address for sending emails. email providers are less likely to accept emails from new ip address that have no history .  
 
Classify emails Send different categories of emails from different IP address for example you may want to avoid sending marketing and other important emails from the same server because it might make isp mark all emails as promotional.

Email sender reputation - World of new email server IP addresses slowly to build a good reputation so big providers such as office 365 Gmail Yahoo mail etc are less likely to put our email in the spam folder according to Amazon simple email service It takes about two to six minutes to warm up a new ip address.

Banks spammers quickly Slammers should be banned quickly before they have a significant impact on the servos reputation. 
Feedback processing It is important to set up feedback loops with isp so we can keep the complaint rate low and band spam accounts pvt email fails to develop for a user complaints one of the following outcomes offers heartbounce this means an email is rejected by isp because the recipient's email address is invalid. 

Soft bounce - Assaff gun syndicates an email failed to deliver due to temporary conditions such as ISP being two BC. complaints this means recipient click the reports spam button .

The image shows the process of collecting and processing bounces of complaints. we can use separate queue for softcounts hardbounds and complaints so that they can be managed separately.

Image.
### TODO.

Email authentication - The fishing and pretesting email represented on 93% of the breaches. some of the common techniques to combat fishing are sent in policy framework domain key identified mail dkim domain based message authentication and reporting and DAARC.  

Sample image of a header of a Gmail message authenticated by all of  SPF, DKIM, DMARC. Remember only one no need to remember all.

Image.
### TODO.

It is important to understand that getting an email is not only the case of domain knowledge but it also needs a good relationship with the ISPs.

Search.
Basic mail search refers to searching for email that contains any of the entered keywords in the Subject or body More advanced features includes filtering by from subject unread or other attributes on the other hand whenever an email is sent receiver or the deleted we need to perform re indexing. 
One part is the search query is only run when the user press the search button failure this means the search feature in the email system has a lot more right than read. by comparison with Google search email search has quite different characteristics .

Image.
### Todo.

### Elastic Search.
The high level design for Indian search using elasticsearch is given to this image periods are mostly performed on the users own email servers we can prove underlying documents to the same node using user_id as the partition key.

{{<figure src="/images/SystemDesign/DesignExample/EmailServices/ElasticSearch.png" alt="UserRequest." caption="Elastic Search.">}}

Open music click on the search button the user waits until the search response is received. the search request is synchronous. 

When events such as sent email received email or debit email attribute nothing related to search needs to be returned to the client. the green texting is required and it can be done with offline jobs. kafka is used in the design to decouple services that triggers reindexing from services that actually perform reindexing.  


Elasticsearch is the most popular search in G database and it supports full text search of emails very easily one challenge of using electric search is to keep our primary email store in sync with it.
### Custom Search solution.

Large scale email providers usually develop their own custom search engines to meet their specific requirements.
We can discuss a little bit about the disc are your bottleneck the primary challenges we'll face for custom search engines. The size of the meditation and the touchment added daily is at the petabyte BB level. an email account can easily have over half a million emails . the main bottleneck for the index server is usually disc IO. the process of building the index is right heavy a good strategy might be to use a log segment structured merge tree lsm Period to structure the index data on disc. the right path is optimised by only performing sequential rights. lsm tree Core data structure behind databases such as bigtables cassandra and rocks db. Where a new email arrives It is first added to level zero in memory cache and when data size is in memory reaches are the predefined threshold data is merged to the next level. Another reason to use lsm is to separate data that change frequently from that does not change frequently. example email data usually doesn't change but folder information tends to change more often due to different philtre rules. in this case we can separate them into two different sections so that if a request is related to the folder change we can only Change the folder and leave the email data.



Further research can be done and relate and learn from The search works in Microsoft Exchange Servers. 

Image.
### TODO.

Each approach has a prose and a cos.

Image.
### TODO.

A general rule of thumb is that for a smaller scale email system elasticsearch is a good option as it is easy to integrate and doesn't require significant in an engineering effort. for a larger scale elastic search might work, A dedicated team to develop And maintain the email search infrastructure period to support an email system at Gmail or outlook skill it is might not be a good idea It's going to be a good idea to have a native search embedded in the database as opposed to separate indexing approach.  
 
Scalability and availability.
The data access pattern of individual users are independent of one another we expect most component in the systems are horizontally scalable. for better availability data is replicated across multiple data centres Used communicate with a mail server that is physically closer to them in the network topology. network partitions user can access messages from other data centres 

{{<figure src="/images/SystemDesign/DesignExample/EmailServices/MultiDataCenterSetUp.png" alt="UserRequest." caption="Multi Data Center SetUp.">}}


### Summary.

In case time permits then we can do further additional discussions on few points.

Font tolerance many part of the systems can fail and we can talk about how to handle the node failures network issues and event glaze. 

Compliance email service workers all around the world and their illegal regulations to comply with. for instance we need to handle and store personally in identifiable information pii from Europe in a way that complies with general data protection regulation gdr . a legal intercept is another typical feature in this in the area.

Security and security is important because email contains sensitive information and Gmail provides safety features such as phishing protection safe browsing proactive alerts and account safety confidential mode and email encryption. 

Optimization sometimes the same email is sent to multiple recipient and the same email attachment is stored several times in the object storage S3 in the group email. one optimization we could do is to cheque the existence of the attachment in the storage before performing the expensive save operations.













{{<figure src="/images/SystemDesign/DesignExample/EmailServices/EmailServiceSummary.png" alt="UserRequest." caption="">}}



228 - 250
