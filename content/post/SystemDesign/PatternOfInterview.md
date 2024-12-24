+++
title = 'PatternOfInterview'
date = 2024-12-24T08:38:06+05:30
url= "/post/systemDesign/interviewPattern"
tags = ['interview question', 'system design']
+++

## Key concepts.

### Core Concepts.

Design Interview Type.
**Product Design** - Designing product like Design SLack, Uber, Chat app, Facebook.
**Infrastructure Design** - Support particular use case - Design rate limiter, message broker, key value store.
**Object Oriented Design** - Design oops with SOLID pattern and entity and class diagram. Amazon is famous for this type of question. Design parking lot, vending machine. Rather than focusing on the service and backend database design we will focus on the class diagram. Grokking the low level design interview.

The main point is the depth of the solution and knowledge.
Mid level should cover the system with 80% breadth and 20% depth.
Senior should cover the system with 60% breadth and 20% depth.

Target - Give your interviewer sufficient point to advocate to hire you. Give to the point answer with additional information.

**Note**
Main failure point - Not able to deliver the working system due to lack of structure.

Break the problem in small pieces and core concept and scalable system and clear design easy to understand.

Know the available technology, best practices and pattern.

Be a good communicator, work with the interviewer.

Make a delivery framework to make the design in structure.
![alt text](image-5.png)

Requirements - 5 mins. Get clear understanding of the system. Functional - core feature. Ask the question like _Does the system need to do X?_ and _User should be able to do ?_ Come to the prioritized list of the core features.

All the systems has hundreds of features we need to prioritize top 3 and make a working system. In the list if there is more requirements then it is not good and interviewer evaluate on the ability to focus what matters.

Desiging twitter - User should be able to post tweets, User should be able to follow the users, Users should be able to see tweets from users they follow.

Non Functional Requirements - System qualities.
Design Twitters - The system should be highly available and availability more than consistency. The system should scale 100M+ DAU. The system should be low latency, rendering feeds under 200ms.

It should be set based on the system - "the system should be low latency" is obvious for all system. The aproach should be specific like "The system should have low ltency search <500 ms"

List of things to consider in non functional requirements. Need to design the top 3-5 imporatnt for the system.

CAP Theorem - System should prioritize consistency or availability. Partition Tolerance is given in distributed system.
