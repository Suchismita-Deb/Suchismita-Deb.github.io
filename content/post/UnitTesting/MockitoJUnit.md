+++
title = 'Spring Boot Testing using Mockito and JUnit.'
date = 2023-11-20T20:49:24+05:30
tags=["testing"]
+++


When we write test cases without using Mockito then the control flows from Controller, Service, Repository. It will call the db for the testing. We donot need to call db for testing.

With Mockito we can mock the data. We donot need to hit the db.

## Argument Matchers

---

We mock the data by any value if the data return string we need to put some string like `"string123"`. In this case we can use **Argument Matchers**.

`any()` - It is generic. `anyString()` will generate any random string. 
- If we donot know the type of data then we can use `any()` as it will generate Map or list or any type. 
- They are more lenient, allowing matching for any argument of the specified type.

## @ExtendWith(SpringExtension.class) uses.

---

```java
@ExtendWith(SpringExtension.class) // Enable Spring integration with JUnit 5
@SpringBootTest // Load the Spring Boot application context
```

Then we use `@Autowired`. If `@Autowired` not working then we can use `@InjectMocks`. We can use either of the two.

***The service class that we are testing should have `@Autowired` or `@InjectMocks`. The DB that we mock the data should have `@Mock` for Unit testing or `@MockBean` for Integration Testing while using `@SpringBootTest`.***

## Unit Testing with @ExtendWith(MockitoExtension.class):

---
* Unit testing using Mockito for mocking dependencies. 
* Enables Mockito for mocking objects during tests. 
* Focuses on isolating and testing specific components or classes.
* We use `@Mock` annotation. It does not start Spring container it focuses in unit testing.

## Spring Testing Annotation

---
*When we use `@SpringBootTest` it will turn on the Spring boot container.*

When we write `@SpringBootTest` it will do **integration test** and it will not do Unit test. It will run the Spring container to test. This gives a bit more coverage.


* **@Mock with Unit Test. @MockBean Integration test**

Unit test only tests the method and it does not test the entire class.

- When we create the data we need to create from the JSON value. That will cover the *DTO* classes.
- Get the data from UI and put in a file and read it from there instread of creating own mock data.
- Here we use `@MockBean`.

```java
@SpringBootTest
class MyIntegrationTest {

    @Autowired
    private MyClass myClass;
    // Autowired for the class. We can also use @InjectMocks

    @MockBean
    private ExternalService externalService;
    // for SpringBootTest we need to se @MockBean.
}
```

When using `@SpringBootTest` it is better to use `@ExtendWith(SpringExtension.class)`

> In running any report it was passing in the local as the entire flow was not disturbed. It was able to make a connection in the local.
> 
> It was not able to make in the deploy time so the build failed.
> 
> The mock data should mock properly and it will not call the Db. In the output we can see the sectionName and query so it is calling the db. If it calls the db then it will not pass.

*When Mockito cannot able to make the call locally it will use the Autowired.*

## Mocking the data from the file.

---
```java
List<Map<String, Object>> mockDataFromApi = getMockResponseFromFile("response/my-data/dataOrders.json");
```
This is applicable for the Payloadable types.
- We get the data from the file.
```java
List<Map<String, Object>> mockProviderResponse = new ArrayList<Map<String, Object><>();
```
* This is empty data.

```java
//Get the actual Query data as JSON from DB while debugging
List<Map<String, Object>> mockDataFromApi = getMockResponseFromFile("response/my-data/dataOrders.json");
// This file has data.

List<Map<String, Object>> mockProviderResponse = new ArrayList<Map<String, Object><>();
// This is empty.

// Mock the behavior of the two DB calls
when(reportsBigQueryServiceMock.getRecordFromView(anyString(), anyString(), anyMap()))
     .thenReturn(mockDataFromApi)//mocking the DB Call of getDataForTreatmentOrder
     .thenReturn(mockProviderResponse);
//mocking the DB Call of private getOrderProvidersFormattedNamesByIds
```
