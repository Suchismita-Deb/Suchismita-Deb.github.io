+++
title = 'Design Google Map.'
date = 2025-07-28T10:13:46+05:30
url= "/post/systemdesign/AlexXuBook2/DesignGoogleMap"
tags = ['interview question','system design', "systemDesignAlexXuBook2"]
+++

Google map provides the services like the satellite imagery, street maps, real time traffic conditions and route planning.

DAU - 1 billion, 99% coverage of the world and 25 million updates daily of accurate and real time location.

### Understand the problem.

What features should we focus on? Navigation, Direction and Estimated time of arrival?

The design as of now is focussed on update, navigation, ETA and map rendering.

How large the road data?

We can get the road data from different sources. It is terabyte TBs of raw data.

The system should take traffic condition and it is very imp to accrately time estimate.

The system should support different travel mode like driving, walking, bus.

The system does not need to support multistop direction can be an advanced feature.

Adding of busines photos and how many places photos adding all in advanced features.

The design mainly focus on 3 key features - User location update. Navigatio service, including ETA services. Map rendering.

### Non-functional Requirement.

Accuracy - User should not be given wrong direction.

Smooth navigation - On the client side user can experience very smooth map rendering.

Data and battery usage - The client should use as little data and battery as possible.

Availability and scalability..

**Positioning System.**

Latitude - Measure how far north or south we are.

Longitude - Measures how far east or west we are.

**Going from 3d to 3d.**

The process of traslation the points from a 3d globe to a 2d place is called “Map projection”.

There are different waus to do map projection. Google Map sleected a modified version of Mercator projection called Web Mercator.

https://medium.com/google-design/google-maps-cb0326d165f5

{{<figure src="/images/SystemDesign/DesignExample/GoogleMap/BatchRequests.PNG" alt="UserRequest." caption="">}}