+++
title = 'Design Nearby Friend.'
date = 2025-07-28T10:14:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignNearbyFriend"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++
User who gives permissions to access their location The mobile client presents a list Our friends who are geographically nearby.
Major differences between the nearby friends and the proximity service the address here is not fixed it is more dynamic because user location changes frequently.
### Understand the problem.
The nearby here is referred as five miles also the number can be configurable.
The distance is calculated as the straight line between two users example a river in between the users resulting a longer travel distance.
Assuming one billion users for the application and 10% of them uses the nearby frien feature.

We can store the location history that will be useful for the machine learning purposes.
We can assume a friend who is inactive for more than 10 minutes will disappear from the nearby friend list.

Functional requirement.
Users should be able to see the nearby friend on their phone app. Each entry in the nearby friend list has a distance and a timestamp indicating when the distance was the last updated.
Nearby friend lists should be updated every few seconds.
Non functional requirement.
Low latency it's important to receive location update from friends without too much of delay. Reliability. Eventual consistency the location data store does not need strong consistency a few second delay in receiving the location data is acceptable.

Back of the envelope estimation.
Nearby friends are defined as friends whose locations are within 5 mile radius.
The location refresh interval is 32nd.
On average 100 million users use the nearby friend feature every day.
assume the number of concurrent users is ten percent of D a u So the number of Conker and user is 10 million.
On average user has 400 friends. Rap displays 20 nearby friends per page and may load more nearby friends upon request.

100 million da U.
Concurrent US equals to 10% into hundred 1,000,000 equals to 10 million.
User report their location every 30 seconds.
Location update qps equals to


Propose high level design.
In this section we will discuss the high level design api design and data model.
The communication protocol between client and server might not be a straightforward http protocol as we need to push location data to all friends.

High level design.
At the high level the problem is basically asking to design with efficient message passing. Any user would like to receive the location of this from every active friend nearby pdr it could be in theory be done purely pure to pure that is a user could maintain a persistent connexion to every other active user in the vicinity.
Image.

This solution is not practical for a mobile device with sometimes flaky connexions and a tight power consumption budget but the idea is giving some light on the general design direction.
We can design a shared backend system.
Image below.
Go to the responsibilities of the back end.

This is the location updates from all the active users for each location update find all active friends who should receive it and forward it to those users device. If the distance between two users is over a certain threshold do not forward it to the recipients device.
The issue in this design is that it is not scalable when we have like 10 millions of active users then with each user updating their location after every 30 seconds then there will be around 334K updates per seconf.
If on an average each user has 400 friends and we assume that the roughly 10% of those friends are online and nearby then every second the back end forwards around 334K X 400 X 10% = 14 M location updates per second.

Proposed Design.
Let's first design the backend for the lower scale application.
Load balancer.
The load balancer sits in front of the restful api server and the state fool bidirectional websocket server. It distributes traffic across those servers to spread out load heavenly.

Press full api server's.
Its a cluster of stateless http servers that handles the typical request response traffic. The API request flows in From mobile to http to load balancer to the api server and then to the user database. This api layer handles auxiliary tasks like adding or removing friends updating user profile.

Websocket servers.
Its a cluster of stateful servers that handle the near real time update of friends location. Each client maintains one persistent web socket connexion to one of the server when there is a location update from a friend who is within that search radius the update is sent on this connexion to the client.
Websocket server is used to handle client initialisation for the nearby front feature. It sees the mobile client with the location of all nearby online friends.

Redis location cache.
Reddys is used to store the most recent location data for each active user this is a time to leave TTL set on each entry in the cache.
When the detail expires the user is no longer active and the location data is removed from the cache. Update refreshes the ttl. Other KV stores that supports TTL can also be used.

User database.
The user database stores user data and user friendship data. Relational database or an ocular database can be used for this case.

Location history database.
Its not the user's historical location data is not directly related to the nearby friends feature.

Redis Pub Sub Server.
Redis Pub/Sub Lightweight massage bus. A modern ready server with GP of memory can hold million sub channels also known as topic.

Image. Redis Pub Sub.

In the image we can see that the location update receives via websocket server and published into the user's own channel into the Redis Pub Sub Server. A dedicated websocket connexion handle for each active friend subscribers to the channel. When there is a location update this websocket handler functions get invoked and for each active user the function recomputes the distance.
The new miss distance is within the research radius the new location and timestamp are sent via the Web Server connexion to the front client.

Understand what will happen when users location changes from the system's perspective.

### Periodic Location Update.
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/PeriodicLocationUpdate.png" alt="UserRequest." caption="">}}

The mobile phone updates. Locations over the persistent loop socket connection.
Lets understand the entire flow.

Image. High level design.
In step one the mobile client sends location up to the road balancer and then step to the location road balancer forward the location update to the persistent connexions on the websocket server for that client.
3 the Websocket Server saves the location data to the location history database. Exline iv the Websocket Server update the new location in the location cash the update refreshers the ttl the websocket server also saves the new location in a variable in the user's websocket connexion handlers or subsequent distance calculations.
The Web sucker serves pomplishes a new location to the Wizards Channel in the Redis Pub Sub Server step 3 and 5 can be executed in parallel. Next slide when the Reddy's pops up receives the location abir on a channel it broadcasts up to all the subscribers in this case the subscribers are all the online friends of the user spending the sending the update. Subscriber that is for each unit of the user's friend its web server connexion handler would receive the user's locations update. On receiving the message the website server on which the connexion handler leaves computer distance between the users sending and the relocation and the subscriber the location data is stored in a variable with web circuit connexion handler for the subscriber.
if the distance does not exceed the surge radius the new location and the last updated timestamp are sent to the subscriber's client else the update is dropped.

Let's examine the entire flow with an example. Make some of the assumptions.
User 1's friends - User 2, User 3, User 4.
User 5's friends - User 4 and User 6.

{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/SendLocationUpdateToFriends.png" alt="UserRequest." caption="">}}

When User 1's location changes their location is sent to the websocket server which holds the user wants connexion.
The location is published to the user 1's channel in Redis pub sub server.
Redis Pub/Sub server broadcasts the location update to all the subscribers. In this case, subscriber are websocket connection handlers (User 1's friends).
If the distance between the users sending the location user 1 and the subscriber user 2 does not exceed the search radius the new location is sent to the client which is user 2

This computation is repeated for every subscriber to the channel. There are 400 friends on average and we assume that 10% of those friends are online and nearby there are about 40 location updates to forward for each users location update.

### API Design.
WebSocket - User send and receive location updates through the websocket protocol.


|Function.|Request.|Respond.|
|---|---|---|
|Periodic location update.|Client sends latitude, longitude and timestamp.|
|Client receives location update.|Data send Friend location data and timestamp.||
|Websocket initialization.|Client sends latitude, longitude and timestamp.|Client receives friends location data.|
|Subscribe to a new friend.|Web socket server sends friend ID.|Friends latest latitude longitude and timestamp.|
|Unsubscribe a friend.|Websocket server sends friend ID.|No response.|

HTTP request.  
The API servers handling tasks like adding or removing friends updating user profiles.

### Data Model.
There is UserDb, location cache and location history database.

### Location Cache.
The location cache stores the latest location of all active users who have has the nearby friends featured turned on. Redis to get the cache key value pair `key - user_id, value -{latitude, longitude, timestamp}`

_Why dont use the db to store the location data?_

The nearby front feature only cares about the current location of the user so for only one user we need to store 1 location. Redis is an excellent choice because it provides fast read and write operations.
It supports TTL which we use to auto purge users from the cash we are no longer active.  
The current user's location do not need to be durably stored. In case the Redis instance goes down we can replace it with an empty new instance and let the cache be filled as new location updates stream in. the active users could miss location updates from friends for an update cycle or two while the new cache warms. It is an acceptable tradeoff.

### Location History Database.
The location history database stores users historical location data and the schema. The system Has the database that handles the heavy right workload well and can be horizontally scaled. Cassandra is a good option. We can also use relational database. In the relational database the historical data will not fit in a single instance so we need to start the data. the most basic approach is to start by user id. the sharding schema ensures that load is evenly distributed among all the shards in operational it is easy to maintain.


## Design Deep Dive.

The high level design works really well in most of the systems but it will break at Our scale.

_How well does each component scale?_
API Servers - The Restful API are stateless servers And there are many ways to auto scale the cluster based on the cpu usage load or IO .

Websocket server Next slide Websockets cluster will auto scale based on usage. however the websocket server are stateful so extra care must be taken when removing existing nodes. Before a note is removed all existing connexions should be allowed to drain.

To achieve it we can mark a note as draining at the load balancer so that no new web server connexions will be routed to the draining server. once all the existing connexions are closed Or after a reasonable long wait the server can be removed Private
Releasing a new version of the application software on the websocket server requires the same level of care. it is worth noting that effective auto scaling of stateful servers is the job of a good load balancer . Most famous cloud load balancers can manage this work really well.

Client initialization

The mobile phones on startup establishes a persistent websocket connexion with one of the websocket server instances. each connexion is long running. most modern languages are capable of maintaining many long running connexions with reasonably small memory footprint.  
When a websocket connexion is initialised the client sends the initial location of the user and the server performs the following task in the websocket connexion handler Previous

It updates the users location and the location cache And save the location in a variable of the connexion handler for subsequent calculations.

It loads all the users friends from the user database. It makes a batch request to the location cash to fetch the location for all the friends. Theres a ttl on each entry the location cache to match our inactivity timeout. If your friend is inactive then the location will not be in the location cache  
Each location returned by the cache the server computes the distance between the user and the friend at the location. if the distance is within the search radius the friend's profile location and last updated timestamp are returned over the websocket connexion to the client.

Each friend the server subscribes to the friends channel in the Ready's pop sub server . creating a new channel is cheap the user subscribers to all active and inactive friends. the inactive friends will take up a small amount of memory on the redis pups of server but they will not consume any cpu or IO since there is no push or publish updates until they come online.  
Next slide Next slide  
It sends the users current location to the user's channel in the Redis Pub Sub Server.

### User Database.
The user database holds two distinct set of data user profile like user id, username, profile url and friendships. The data set at our design scale will likely not fit in a single relationship database instance.   
The data is horizontally scalable by sharding based on the user ID.

The scale of the system we are designing the user and the friendship datasets will likely be manages by a dedicated team and available via the internal API.

The websocket server will use the internal API in place of the querying the database directly to fetch the user and friendship related data.
Accessing via API or direct query does not make any difference in terms of functionality or performance.

### __Location Cache.__
Redis to cache the most recent location of all the active users. We can set a TTL on each key and it will be renewed upon every location update.  
It puts a cap in the max amount of memory used and 10 million of active users at peak and eac location taking no more than 100 bytes a single modern Redis server with many GBS of memory are able to hold the information for all users.

10 million estimated user and updating every 30 seconds the Redis server will have to handle 334K updates per second.   
It is a little too high even for a modern high end server One advantage is that the cash data is easy to shard.

The location data for each user is independent and we can even describe the load among several ready servers by sharding the location data based on user id. To improve availability we could replicate the location data on each chart to a standby node. If the primary note goes down the standby could be quickly promoted to minimise downtime.

### __Redis Pub/Sub Server.__

The Pub/Sub server is used as a routing layer to direct message location update from one user to all the other online friends.  
We choose Pub/Sub because it is very lightweight to create new channel. A new channel is created when someone subscribes to it.    
When a message is published to a channel that has no subscriber the message is dropped placing very little load on the server.  
When a channel is created Redis uses a small amount of memory to maintain a hash table and a linked list to track the subscribers. In case there is no update on a channel when a user is offline no cpu cycles are used after a channel is created.  
We will take advantage of this in our design in the following ways.

Assign unique channel to every user who uses the "nearby friends" features. A user open app initialisation subscribe to each friends channel whether the friend is online or not

It simplifies the design since the backend doesn't need to handle subscribing to a friend's channel when the friend become active or handling unsubscribing when friend become inactive

The trade Of the design His attitude is more memory . the memory use is unlikely to be the bottleneck. trading higher memory use for a simpler architecture is worth in this case.

How many ready pups subserver do we need  
Memory usage - A channel is allocated to each user who uses the nearby front feature so we need around 100 million channels (1 billion * 10%). Assuming that on average a user has 100 active friends using this feature that includes friends who are nearby or not and it takes around 20 bytes of pointer in the internal hash table and linked list to track each subscriber It will need around 200GB (100 million * 20 bytes * 100 friends/10^9 = 200 GB) to hold all the channel. A modern server with 100 GB of memory We need around 2 Redis Pub/Sub server to hold all the channels.

_CPU Usage._

The pops up server pushes about 14 million updates per second to the subscriber. even though its not easy to estimate a with any accuracy how many message a modern ready server could push a second without actually benchmarking but it is safe to assume that a single reservoir will not be able to handle that load.  
A modern server with a gigabit network could handle around 100,000 subscriber pushes per second. given how small our location update message are this number is likely to be conservative. using this conversive estimation We need to distribute the load among 14 million/100,000 = 140 Redis server. This number is likely to conservative and the actual number of servers could be much lower.

Using this math we can conclude that the bottleneck of Reddy's pops up server is the cpu usage and not the memory usage period to support our skill we need to distribute Reddy's pops up cluster.

### Distribute Redis Pub/Sub server cluster.
How do we distribute the channel to hundreds of ready server?


The channel are independent to each other. it makes it relatively easy to spread the channel among multiple pups of server by sharding based on the publishers user id. practically speaking with 100 of pops up server we could go into a bit more details on how this is done so that operationally it is somewhat manageable As server can go down time to time.

We can introduce a service discovery component to the design. there are many service discovery packages available like etc and zookeeper among the most popular 1. The need of service discovery component is very basic. we need these two features .

The ability to keep a list of server in the service discovery component and a simple ui over api to update it pdf fundamentally a service discovery is a small key value store for holding configuration data The key and value for the hash ring could look like Key /config/pub_sub_ring and value ["p_1","p_2","p_3"].   
The ability for **client** in this case the Websocket Server to subscribe to any update to the **value** in this case the Redis Pub Sub Server.


Another key component mentioned Quizno's hashtag of all the active readies pops up server in the service discovery component . the hatch string is used by the publisher and subscriber of the Reddys Pub Sub Server to determine the pubs up server to talk to for each client Example channel 2 lives in Redis Pub/Sub server 1.
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/ConsistentHashing.png" alt="UserRequest." caption="">}}
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/FigureOutTheCorrectRedisPubSubServers.png" alt="UserRequest." caption="FigureOut The Correct Redis Pub/Sub Servers">}}

The Websocket Server consult the hash link to determine the Redis Pub/Sub server to write to.The source of truth is stored in service discovery but for efficiency a copy of the hash ring could be cached on each websocket server.  
The WebSocket Server subscribes to any update on the hash leaving to keep its local in memory copy up to date.  
Websocket server publishes the location update to the users channel on that Redis Pub/Sub Server.   Subscribing to a channel for location updates uses the same mechanism.

### Scaling considerations for Pub/Sub servers.

How should we scale the Redis Pub/Sub server cluster? Should it be scaled up and down based on the traffic?

It is a very common practise for stateless servers because it is a lower risk and saves cost. To answer this question lets examine some of the properties of the Redis Pub/Sub server cluster.
Messages sent on a pub subchannel are not persisted in memory or on desk. they are sent to all the subscribers of the channel and removed immediately after. When there are no subscribers the message had just dropped in that sense the data going through the pops up channel is stateless

There are indeed states stored in the pops up server for the channels which is specifically the subscriber list for each channel is a key piece of the states tracked by the pub sub server.  
Where a channel is moved that can happen when the channel Pub/Sub server is replaced or if a new server is added or on ols server removed on the hash ring then every subscriber of the moved channel must know about it so they could unsubscribe from the channel on the old server and resubscribe to the replacement channel on the new server. In this sense a pubs up server is stateful and coordination with all subscribers to the server must be orchestrated to minimise service interruptions.


For all these reasons we should treat the reddish pups of cluster more like a stateful cluster similar to how we handle a storage cluster  
With stateful cluster scaling up or down has some operational overhead and rest so it should be done with careful planning. the cluster is normally over provisioned to make sure it can handle daily peak traffic With some comfortable headroom to avoid unnecessary resizing of the cluster.
When we have to scale we have to be mindful of the potential issues - When we decide the cluster mini channel will be moved to different server on the hashtag. when the service discovery component notifies all the websocket server of the hash ring update there will be a tonne of resubscription requests. during these massive resubscription requests some location update might be missed by the client. all the occasional misses are acceptable for our design we should minimise the occurrences.
Because of this potential interaction resurgence should be done while usage is at its lowest in the day .


How is resizing done actually?
It follows the some steps.
> Determining the new size and if scaling up provisioning enough new servers.
>
> Update the key of the hash ring with the new content.
>
> Monitor your dashboard there should be some spike in cpu usage in the websocket survey.

Using the hash ring key if we Two new notes AP5 and P6 the hash link key should be updated like Old - [p1,p2,p3,p4] and New - [p1,p2,p3,p4,p5,p6]



### Operational considerations for the Redis Pub/Sub servers.

The operational risk of replacing an existing Redis Pub/Sub server is much lower and does not cause a large number of channels to be moved.
Only the challenge on the server being replaced with Will need to be handled  
Its good as servers inevitably go down and need to be replaced regularly. when a pups up server goes down the monitoring software should alert the on call operator. The on call operator updates the hash ring key in service discovery to replace the dead node with a fresh standby note.



The Websocket Server are notified about the update and each one of them notifies its connexion handlers to re subscribe to the channels on the new pupsub server. Each website handler keeps a list of all channels it has subscribed to And upon receiving the notification from the server it see each channel against the hash ring to determine if a channel needs to be resubscribed on a new server.

Using the hash ring we can see that if P 1 went down and we replaced it with P1_new The hash ring should be updated like old [p1,p2,p3,p4] and New - [p1_new,p2,p3,p4,p5,p6]


{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/RestfulAPIRequestFlow.png" alt="UserRequest." caption="">}}
### Adding or removing friends.
What should the client do when the user adds or removes a friend?  
When a new friend is added the client's websocket connexion handler on the server needs to be notified and so it can subscribe to the new friends pops up channel.  
The nearby friend feature is within the ecosystem of a larger app we can assume that the nearby front feature could register a call back on the mobile client whenever a new friend is added. Call the couple invocation sends a message to the website server to subscribe to the new fronts pop subchannel. The Websocket Server also returns a message containing the new friend's latest location and timestamp if they are active.  
The client could register a callback in the application whenever a friend is removed. The callback would send a message to the website server to unsubscribe from the friends pubsub channel.

This subscribe and unsubscribe callback good also be used whenever a friend has opted in or out of the location update.

### Users with many friends.
We need to take a look on the one scenario where user with many friends are causing any performance hotspot in our design.

There is a cap on making number of friends facebook has a cap of 5000 friends for example Friendship or bidirectional We are not talking about follower model in which celebrity could have millions of followers. Next time  
In the scenario with thousands of friends the bubs have subscribers will also be scattered among many websites servers in the cluster. the update load would be spread among them and it's unlikely to causeway any hotspot.  
The user would place a bit more load on the Pub/Sub server where their channel leaves period since there are over 100 pubs sub servers these Big user should be spread out among pub sub servers and the incremental load should not overwhelm any single one.


### Nearby random person.

Enhancement Update the design to show random people who opt in to location sharing  
One way to do this using our own design is to add a pool of pups up channels by Geohash NGO hash the area is divided into four grades and a channel is created for each grid.
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/RedisPubSubChannel.png" alt="UserRequest." caption="RedisPubSubChannel">}}
Anyone within the grid subscribes to the same channel.
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/PublishLocationUpdateToRandomNearbyPerson.png" alt="UserRequest." caption="PublishLocationUpdateToRandomNearbyPerson">}}
Here when user to update their location the website connexion handler computes The users geohash ID and sends the location to the channel for that Geohash.

Anyone nearby who subscribes to the channel excluding the sender will receive a location update message.

To handle people who are close to the border of the jio hash agreed every client should subscribe to the jio hash the user is in And the eight surrounding geohash grid.













### Alternative to Redis Pub/Sub.
Alternate to Redis Pub/Sub - Erlang is a great solution for this particular problem.   
Erlang is a general programming language And runtime environment bill for highly distributed and concurrent applications . We are specifically talking about Erlang ecosystem. It include the language component like Erland or Elixir and the runtime environment and libraries like the Erland virtual machine called BEAM and the Erlang runtime libraries called OTP.

The power of Erlang lies in its lightweight processes. an airline process is an entity runtime Running on the beam V M.
It is several order of magnitude cheaper to create than a Linux process. A minimal Erlang process takes about 300 bytes and we can have millions of this processes on a single modern server.

If there is no work to do in an Erlang process it just sit there without any CPU cycle at all. In other words it is extremely cheap to model each of the 10 million active users in our design as an individual Erlang process.

Erlang is very easy to distribute among many Erlang servers. The operational overhead is very low and there are great tools to support debugging live production issues safely. The deployment tools are also very strong.

_How would we use Erlang in the design?_

We can implement the websocket services in Erlang and also replace the entire cluster of Redis Pub/Sub within distributed Erlang application. In the application each user is modelled as Erlang process.

The user process would receive updates from the website server when a user's location is updated by the client. the user process also subscribes to update from the err lung processes of the user's friend. Subscription is native in Erlang/OTP and its easy to build. This forms of mesh of connexions that would efficiently route location updates from one user to many friends.

### Summary.
The core components involve the websocket for the realtime communication between client and server the Redis for fast read and write of location data redis pups up routing layer to direct location updates from one user to all the online friends.

First discussing the high level design at a lower scale and then discussing the challenges to scale  Up . next night We need to scale restful api servers websocket servers data layer Redis Pub/Sub server alternate tool Redis Pub/Sub server.
There might be a potential bottleneck when an user has many friends and we propose a design for a nearby random person feature.
{{<figure src="/images/SystemDesign/DesignExample/DesignNearByFriend/Summary.png" alt="UserRequest." caption="Summary">}}
