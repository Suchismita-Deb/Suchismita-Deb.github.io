+++
title = 'DesignAmazonRetailSystem'
date = 2025-01-25T18:16:55+05:30
url= "/post/systemdesign/designexample/DesignAmazonRetailSystem"
tags = ['interview question','system design']
categories = ['low level design','system design']
+++
Requirement.

Build a basic implementation of Amazon retail site.  
Allow for concurrent edits of a user cart.  
Deal with inventory management, including whe items go out of stock.

### Capacity Estimates.

Around 1 Billion unique products.  
10 Million orders per day -> 100 order per second.  
Around 1 MB of data per product, 1 Billion \* 1 MB = 1 PB of data, need partition on product table.  
Each product has image and we can use CDN to load it.

### High Level Overview.

A 100 ms delay in load time hurts the convertion rate by 7%. We make the read as fast as possible. Write also where we are able to improve.

Table of Content.

Product Db.  
Cart Service.  
Placing Order.  
Optimising reads.

**Product Db** - Product db is a large db we will partition it as much as possible.  
Only one person writing to a product id at a time.  
Single leader replication should be fine here.  
NoSql is nice here for flexible datamodel.  
B-Tree is (in theory) faster than read.

**Building Cart** - Ideally there will be multiple people at the same time editing a cart, we can do this in a performant manner.

Bad way - Sending full client side list. The data from the Ui and send to update the data. It is blocking when two user will add.

Bad way - Store the cart in list and update the list when one add the data - in this case we have to put lock in list to add some data and user when add the list then it will not add.

We can consider that the list is set of item and we can avoid the locks. In place of adding in list we can get the product id and cart id and add the item.

We dont need a lock unless we want to delete item. The person adds the item in the row and the person delete the item in the row there should be a lock.

One way to avoid lock - Kafka and all item to the broker then we get the list of product - Not good as when we add item and we go to payment the item will not add in cart or it may take time. It should be synchronous.

Another way is to use Multiple databse leader for the cart db - How we will make sure that the multiple db will get the same detials at a time - It will get using a set CRDT - Conflict Free Replicated DataType. Each db will have a copy of the data and it will get the detials of other db in a period.

How can we handle multiple additions and deletings of items in our set CRDT? - Use an Observe Remove Set.