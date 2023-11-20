+++
title = 'Spring Boot Testing using Mockito and JUnit'
date = 2023-11-20T20:49:24+05:30
tags=["testing"]
+++


When we write test cases without using Mockito then the control flows from Controller, Service, Repository. It will call the db for the testing. We donot need to call db for testing.

With Mockito we can mock the data. We donot need to hit the db.