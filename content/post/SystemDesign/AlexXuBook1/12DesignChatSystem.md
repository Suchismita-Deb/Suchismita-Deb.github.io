+++
title = 'Design Chat System.'
date = 2025-07-28T10:05:46+05:30
url= "/post/systemdesign/AlexXuBook1/DesignChatSystem"
tags = ['interview question','system design', "systemDesignAlexXuBook1"]
+++

Understand the problem statement - Interviewer might want the group chat system or the one on one chat.


## Understand the problem statement.
It should support both the one on one and group chat and it should be a web app and mobile app.  
DAU = 50 million.  
Group chat limit total 100 members in the group.  
Imp feature to take care - one on one chat, group chat, online status, only text message.    
Text message should be 100000 characters long and the text should stay forever. Additional feature - Encryption.


Chat app with the main point - one on one chat with low delivery latency, small group chat max of 100 people, online presence, multiple device support and push notification.
## Happy Path Flow High Level Design.
First present the happy path flow high level design then proceed with the deep dive.  

Client do not connect with each other and they connect to a chat service which supports all the features. The chat service must support - Recieve message from other clients.    
Find the right recipient for each message and relay the message to the recipients.   
If the recipient not online or active then hold the message on the server until its online.
```
Sender - message - Chat Service(Store message, relay message) - message - Receiver.
```
Client connect to the chat service using one or more network protocol. It uses he time-tested HTTP protocol, its a common web protocol. In this scenario, the client opens a HTTP connection with the chat service and sends the message, informing the service to send the message to the receiver. The keep-alive is efficient for this because the keep-alive header allows a client to maintain a persistent connection with the chat service. It also reduces the number of TCP handshakes. HTTP is a fine option on the sender side, and chat applications such as Facebook used HTTP initially to send messages.

HTTP is client-initiated, it is not trivial to send messages from the server. Over the years, many techniques are used to simulate a server-initiated connection: **_polling, long polling, and WebSocket_**.

### Polling.

Polling is a technique that the client periodically asks the server if there are messages available. Depending on polling frequency, polling could be costly. It could consume precious server resources to answer a question that offers no as an answer most of the time

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/Polling.png" alt="Polling." caption="Polling.">}}

### Long Polling.

Client holds the connection open until there are actually new messages available or a timeout threshold has been reached. Once the client receives new messages, it immediately sends another request to the server, restarting the process.

Drawbacks -   
Sender and receiver may not connect to the same chat server. HTTP based servers are usually stateless. If you use round robin for load balancing, the server that receives the message might not have a long-polling connection with the client who receives the message.  
A server has no good way to tell if a client is disconnected.  
It is inefficient. If a user does not chat much, long polling still makes periodic connections after timeouts.
{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/LongPolling.png" alt="Polling." caption="LongPolling.">}}

### WebSocket.

WebSocket is the most common solution for sending asynchronous updates from server to client.
{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/WebSocket.png" alt="Polling." caption="WebSocket.">}}

Websocket connection is initiated by clients and it is bidirectional and persistent. It starts its life as a HTTP connection and could be “upgraded” via some well-defined handshake to a WebSocket connection. Through this persistent connection, a server could send updates to a client. WebSocket connections generally work even if a firewall is in place. This is because they use port 80 or 443 which are also used by HTTP/HTTPS connections. Sender side HTTP is a fine protocol to use, but since WebSocket is bidirectional we can use it in the sender side.

WebSocket connections are persistent, efficient connection management is critical on the server-side.

### High level Design.

Websocket is the main communication protocol. Other things like login, sign up are dne using traditional request/response.   
The chat system is broken down into three major categories - stateless services, stateful services, and third-party integration.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/ChatService.png" alt="Polling." caption="ChatService.">}}

**_Stateless Service_** - Public facing requests/response services used to manage the login, signup, user profile. Stateless services sits behind the Load balancer who routes the Rick West to the correct services based on the request path. These services can be monolithic or individual microservices. No need to create this stateless services as we can integrate them using other 3rd party solution. We will mainly look into the service discovery its mainly used to give the client a list of DNS host name of chat servers that the client could connect to.

Stateful service - The only stateful service is the chat service It is stateful as each client maintains a persistent connexion To the chat server In the surface of client normal doesn't switch to another chat server as long as the server is still available. The service discovery coordinates closely with the chat service to avoid server overloading .  
 
3rd party integration - In a chat application push notification is the most important 3rd party integration. It's a way to inform user when new messages has arrived even when application is not running.

Scalability In small scale all services listed above can be fit into one server At scale we design The application it is in theory possible to fit  all users connections in one modern cloud server. The number of concurrent connections that a server can handle will most likely be the limiting factor. In our scenario, at 1M concurrent users, assuming each user connection needs 10K of memory on the server  it only needs about 10GB of memory to hold all the connections on one box.

Single server is a single point of failure. It is fine to start with a single server and then upgrading.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/HighLevelDesign.png" alt="Polling." caption="High Level Design.">}}


### **_Online Presence._**
An online presence indicator is an essential feature of many chat applications. In the high-level design, presence servers are responsible for managing online status and communicating with clients through WebSocket. There are a few flows that will trigger online status change.

**_UserLogin_** - The user login is mentioned in the service discovery. After a WebSocket connection is built between the client and the real-time service, user A’s online status and last_active_at timestamp are saved in the KV store. Presence indicator shows the user is online after she logs in.
{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/UserLogin.png" alt="Polling." caption="User Login.">}}
**_UserLogout_** - When user log out online status is changed to offline in the KV store. The presence indicator shows a user is
offline.
{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/UserLogout.png" alt="User Logout." caption="User Logout.">}}

**_User disconnection_** - When a user disconnects from the internet, the persistent connection between the client and server is lost. A naive way to handle user disconnection is to mark the user as offline and change the status to online when the connection re-establishes. The approach has a flaw. There can be a case whn