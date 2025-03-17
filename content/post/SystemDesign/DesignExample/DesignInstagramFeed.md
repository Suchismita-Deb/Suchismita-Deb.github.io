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



