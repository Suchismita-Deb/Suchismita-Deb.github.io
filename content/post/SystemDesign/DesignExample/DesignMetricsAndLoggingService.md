+++
title = 'Design Metrics And Logging Service'
date = 2025-01-02T08:28:37+05:30
url= "/post/systemdesign/designexample/designmetricloggingsystem"
tags = ['interview question','system design']
categories = ['low level design','system design']
+++
### Design a metrics and logging service.

Requirements.

Are these event tracking the user using the product.

Takes the event and takes the data that we care about from user and show it to the business decision person.

The system is isolated from any platform.

Functional Requirement - User interacting with the product. The features of the product. Here we are storing the data and we will make th functions of storing all variety of data and all data.
Non Functional Requirement - Let the system perform well.

Functional Requirement.

It is going to be useful to store all the data in all correct ways.

Use filling one form then say the form is long and user dropped in the middle.
Signup is taking too long and user dropped in middle.
Need to show all the data in the application.

It should not be dependent on any platform.

Visualization.

Non Functional.
High available.
Low latency(near real time).
Validation of data.

Payload - It will store the user data.

```json
"page":"",
"timeStamp":"",
"events":[
    "click":"",
    "scroll":"",
    "error":[
        "stackTrace":""
    ]
],
"user":"",
"location":""
```

the even will store the entire details of the user activity and the data will have user detials and any error like internal error or anything.

User(s) -> send the data -> LoadBalancer -> queue -> validation/scrubbing the service -> data enrichment -> making the data and the user detail and making the data properly -> the user details and events will be different for all user can use NOSQL -> Visualization of the data from the nosql.

There will be 1000s of data and we have to collect the data and that will be too big. It is better to go with **sampling** meaning in one distributed section will be giving some data and not collecting all data.

There should be some data retention policy like 90 days.

