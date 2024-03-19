+++
title = 'CQRS Design Pattern'
date = 2024-03-19T08:04:51+05:30
tags=["spring","redis"]
+++


CQRS stands for Command and Query Segregation.

It segregates the Query responsibility the `read operation` and the command for the `write operation` 

In any ecommerce applicationpeople will come and visit and search the product this is read     operation and they will buy the product this is `write` operation. 

The read(search) operation is high than the purchase(Write) operation. 

In big discount day people will generally purchase so the write operation will be high use than the read operation. 


When we name the read and write separte microservice then it is easier to scale.

![img35.png](/images/img35.png)
The read and write in a separate microservice means separate project and both will be connected with kafka as teh db in two microservice can be different.

For just revision, in the command service the update method to the db.
```java
public Product updateProduct(long id,Product product){
    Product existingProduct = productRepository.findById(id).get();
    existingProduct.setName(product.getName());
    return productRepository.save(existingProduct);
        }
```

Now the query and the command db is different we need the kafka to make the message sync.

First the Kfka dependency added in the pom.xml file. The commnd isteh producer and the query is the consumer.

In the producer microservice in the resource we will make the file application.yml and add the kafka producer details.

