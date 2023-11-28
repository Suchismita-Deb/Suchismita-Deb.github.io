+++
title = 'TopicDoubtClearing'
date = 2023-11-28T09:25:19+05:30
+++


### Topic from System Design.

### 1. Why the diagram shown the DNS is called by an API?
When we hit the site it called the DNS to get the IP address. The API can also calls the DNS.

You have a website and in one page you want to show to top 10 comments from the fb page of your site. The comment is dynamic to get the comment we need to hit the api and it will hit DNS of the fb page.

We cannot just get the api link from the network tab as we need authentication to enter to the page and show the comment. That we can subscribe or pay. We will get the userid and password to get the page.

So we can hit the site name that will go to the DNS. When our site hit another page like fb or linkedin then the api will also hit the DNS.

In fb say we have a separate microservice for the comments. One page can call multiple MS. All the call is done by API we communicate with the API.

### When there is loadbalancer to handle the request from the client. Do we need any other loadbalancer to handle the request for the Slave DB?

No. Loadbalancer is only used to handle request from the client.

### How the slave Db is getting the data in sync with the Master Db.
* One way is to bulk update the slave db with a batch job. In payslip generation we need that once in a month and in bulk amount like for 50000 employee. We can ru the batch job and if it fails for one person we can run the job later for that person.

It has some drawbacks like for stock market data, it changes within minutes we cannot hold things and wait for the batch job.


* Updating through **Messaging Queue** like *Kafka* any chnage in the master db it gives message to the kafka queue and the slave DB are subscribed to the kafka queue.