+++
title = 'Proxy and Reverse Proxy'
date = 2024-12-24T00:02:16+05:30
url= "/post/systemDesign/fundamental/proxyReverseProxy"
tags = ['interview question', 'system design']
+++

## Proxy and Reverse Proxy.

Client or group of client gives the request to the proxy server and it gets the respond from the server.

Proxy server sits between server and client and no request directly goes to the server.

### Type sof proxy server.

**Forward Proxy** - Simple proxy.

Client - Proxy - Server. It hides the client network. Server dont know about the client. Forward proxy hide the client from the server. When one client Ip makes a request then the forward proxy makes the request with different IP.

It makes the client and network anonymous. It helps in group of the request say 5 client ask for google and the proxy ask it one time. It helps in caching. When got one request it see that it does not have the respond and then itget the respond and stor in cache.

It works on behalf of client. No server can talk directly to the client.

Disadvantage - It works in application level. When there are 10 application then we have to set the proxy at each application level.

**Reverse Proxy** - Backward Proxy.

It works on behalf of server. No client can talk to the server.
Client will talk to the reverse proxy.

In cse of DDOS attack attackers can only talk to the reverse proxy.

Example of Reverse Proxy - CDN.

One use on USA, UK and India and the server is in Australia. The local CDN are present in the region so when data not presentin CDN then it goes to the server. It helps in caching and latency.

Reverse Proxy helps in loadbalancer.

### Difference between proxy and vpn.

| Topic             | Proxy                                                                                           | VPN                                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Functionality** | Proxy only hide the IP address. It is used for accessing georestricted content hiding location. | VPN can do the encryption and decryption. It encrypts all the internet traffic and route it through a secure server. It provides secure server, provides anonymity, security and access to restricted content. |
| **Scope**         | Works on appication level. It only affects traffic for the application.                         | Works on the system level and ecrypt all traffic regardless of application. There is vpn client and vpn server and the requests goes to the tunnel. The vpn server then goes to the server.                    |
| **Security**      | Offer minimal security and it can hide your IP but doesnot protect your data.                   | Encrypts your data ensuring secure communication even on public Wifi network.                                                                                                                                  |

### ReverseProxy and loadbalancer.

When one server then also we need reverse proxy. Reverse proxy can be load balancer and the reverse is ot true.

### Reverse Proxy and Firewall.

In Firewall there are some rules and each rule defines what data can pass to the outside world. It can do packet scan and it will see the header, ip address of source and destination.