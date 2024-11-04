+++
title = 'Introduction to Spring Security.'
date = 2024-09-08T19:51:03+05:30

tags = ['spring', 'Spring Security']
+++

Web server has the security build in. Here we are talking about the application security.

All OS level security, JVM level security, app server level security is all handled.

In application level security, we need to think what the user can do in the context of the application, the data that
will allow and expose to the user and the person here we are talking about the security.

Spring Security is an application framework that helps you to do application level security.
Login and logout functionality.
Only two url to be publicly accessible to the logged in user. Allow or block access to the URLs to logged in users.

Only the url accessible to user who is not only logged in but has specific role. Allow or block access to URLs to logged
in users and with certain roles.

By adding spring security in the application we can handle common vulnerabilities like.

Session fixation.
Clickjacking.
Click site request forgery.

Sprinf security can ask for the user and password authentication.
SSO OKTA LDAP.
App level authorization.
Intra App Authorization like OAuth - Applications authorize with other applications.
Microservice security using tokens, JWT - Microservcie talking to each other checking if it is exposed to one
microservice and not others.
Method level security.

### 5 core concepts in spring security.

Authentication.

Who are you ? - ID.
User id and password.
It is knowledge based authentication.
There is position based authentication. Like phone or text message, Key vards and badge, access token device.
Knowledbased and possession based authentication firts the authentication then text message 2 factor authentication.

Authorization.

What do you want? Can this user do what they want to do?

Boolean reply they can do or not.

Principal.

Currently logged in user.
When logged in then the system remember the principal and remembers it.
We just need to authenticate once and we donot need to authenticate for every request.

Granted Authority.
Authority given to the user. It is fine grained.

Roles.

Roles are the group of authorities that are assigned together. It is very coarse grained.

### Adding spring security to a spring boot application.

Using the dependency spring-boot-starter-security.
