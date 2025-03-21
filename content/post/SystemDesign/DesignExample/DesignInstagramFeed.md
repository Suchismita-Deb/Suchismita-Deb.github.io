+++
title = 'Design Instagram Feed'
date = 2025-03-16T17:27:52+05:30

url= "/post/systemdesign/HLD/designInstagramFeed"
tags = ['interview','system design']
+++
Requirements.
Upload images.
User follows other users.
Generate a feed of image - For simplicity let us assume the feed is built by aggregating friends post in reverse chronological order.
Scale - 10 M users.
Daily user uploading 2 photos and each photos 5 MB.
10^7*2*5Mb = 10^8 MB = 100 TB.

### Data model.
User data.
Posting data.
User following other users the relationship.

User Table.  
There is a relation between the users.  
One user can follow many users and many users can follow one-users.

Relational db.
User table.  
id - primary key, int, serial.  
name - string.  
location - string.

Photo Table.
id - primary key, int, serial.
user_id - foreign key referencing user_id
caption - string
location - string
path - string


follow table.

One directional. User 1 can follow user 2 and user 2 does not follow user 1.

### Api.


Design instagram.
follow table.
unidirectional.
from -> foreign key user_id
to -> foreign key referencing user_id.

In facebook one friend connected and birectional.
In instagram one user follow another user and the other user may not follow back.

Metadata Db.

There is the distributed object storage S3.
Metadata will be connected to the S3 to get the file path.

More read heave there will be replica of the db and the write data will be different.
There is a cache in the server and the metadata db. The write through cache like the data update in the main db will update the cache. Redis. When a user publishes a post. corresponding data is written into the cache and the DB.

There is a load balancer and it will direct to the app server. The system is best for the horizontal scaling and in the location there are multiple server.



API design.

two. main feature includes photo publisher Pi. API and photo retrieval api.

Photo publish API.

`v1/me/feed`
POST.
Param - Content, auth_token.

`v1/me/feed`
GET.
Param - auth_token.


Fan of service push new content to friends Feed. new data is stored into the crash for fast retrieval.

Notification system. It informs the friend that new content is available and send out a push notification.
