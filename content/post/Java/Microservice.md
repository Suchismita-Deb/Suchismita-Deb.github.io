+++
title = 'Microservice'
date = 2023-11-19T14:23:06+05:30
+++

Evolution of application design - Monolithic  to multi-tier to microservice based architectures .

Monolithic - All in one code.  It is difficult to maintain big system as everything is tangled together.

The multi-tier  architecture where application components are separated into layers based on technical functions.  

> A common model is the **three tiers architecture**.

It consists of three logical layers.

**The presentation  layer** covers all the code and components responsible for the interaction with users through  visual interfaces.

**The logical layer** encompasses all the business logic and processes relative to the  business functions.

**The data layer** dealing with storing accessing and retrieving data when  needed. 

While separating logic and data in two different layers made things better it was  still a centralized way to designing application

and it didn't address quite well the challenges  associated with complex applications and systems

let's take a look at these challenges  application complexity has been exponentially

growing with the Advent of global high growth  Festival Wing web and mobile applications

maintaining evolving and scaling  very complex applications like  
Amazon e-commerce website or Google search  engine required a design paradigm shift

here again the best way to tackle complexity is  by decomposing it into manageable chunks that is

why software Engineers decided to break apart the  logic and data layers into smaller pieces called

microservices every microservice deals with one  business function end-to-end independently from

other microservices microservices presents simple  easy to understand apis and communicate with each

other through lightweight common protocols such  as HTTP or message queues when an application

is architected as a microservices different teams  can work separately and independently on different

microservices building new functions  and evolving the business capabilities

without impacting other teams and business  functions theoretically teams could even use

different programming languages and deploy their  microservices to different infrastructure however

for cost reduction efficiency Improvement and  operational optimization reasons most organization

limit team choices to a set of approved tools  infrastructure providers and programming languages

as applications continue evolving and growing the  number of microservices inside an organization

could expand to tens hundreds or even thousands  as this happens complexity starts creeping again

for example if a microservice instance fails in  production it could generate Cascade of outages

within other microservices since the architecture  is highly distributed it could become difficult to

identify the root cause and fix it in a timely  manner the software engineering community has

been creating and inventing new tools to tackle  and contain the ever-growing complexity of Highly

distributed microservice based systems some  of the popular tools include containerization

that helps deploy microservices in minimalist  self-contained runtimes such as Docker containers

container orchestration systems that manage  containers life cycles such as kubernetes pipeline

automation for CI-CD asynchronous messaging  that further the couple's microservices by

providing message Brokers and queues application  performance monitoring tools to track microservice

performance login and audit tools that help keep  track of everything happening within the system

we need to understand that microservices  are not a Magic Bullet that fixes all

application design and development  problems applications are still  
designed as monolithic when they are  relatively simple with limited number  
of users and not fast evolving remember  that highly distributed systems are hard