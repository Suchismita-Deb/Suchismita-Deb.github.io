+++
title = 'Spring Boot Testing using Mockito and JUnit.'
date = 2023-12-23T20:49:24+05:30
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

For the service class Test we have to use `@Autowired`
```java
@Autowired
private IdtRoundingQueryService idtRoundingQueryService;
```

***The service class that we are testing should have `@Autowired` or `@InjectMocks`. The DB that we mock the data should have `@Mock` for Unit testing or `@MockBean` for Integration Testing while using `@SpringBootTest`.***

## Unit Testing with @ExtendWith(MockitoExtension.class): 

---
* Unit testing using Mockito for mocking dependencies. 
* Enables Mockito for mocking objects during tests. 
* Focuses on isolating and testing specific components or classes.
* We use `@Mock` annotation. It does not start Spring container it focuses in unit testing.

```java
@Mock
private ReportsBigQueryService reportsBigQueryServiceMock;
```

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

When we use Autowired, Mock, ExtendWith(mock) then we need to use `initMocks`
```java
@BeforeEach
void setUp() {
    MockitoAnnotations.initMocks(this);
    }
```
The `initMocks` will take case to initialize the class and all the mocks that we are doing.

### Example 1.
We want to cover the test for the method `getRecordFromView`.

This method `getRecordFromView` has 3 parameter we are achieving that using the argument matchers.
The `getRecordFromView` method looks like.
```java
 public List<Map<String, Object>> getRecordFromView(String reportName, String sectionName, Map<String, Object> requestEntity) {
    TableResult tableResult = getTableResult(reportName, sectionName, requestEntity);
    return convertor.convert(tableResult);
  }
```
We can create any() or anyMap() for the Map parameter.

In the test file we create the test method.
```java
 @Test
    void getDataByMpi() {

        Map<String, Object> data = getMockResponseFromFile("response/idtws/data_by_mpi.json").get(0);
        when(reportsBigQueryServiceMock
                .getRecordFromView(anyString(), anyString(), anyMap()))
                .thenReturn(Arrays.asList(data)); 
        // the data that we are passing can be created manually or we can use the data from the file created as a json.
        assertNotNull(idtRoundingQueryService.getDataByMpi("active-protocol-order-base-query", patientId));
    }
```

* If the map is correct then in the `when` block will get the data in the proper format. We are getting the actual data from the file in the `data` variable.
* In the mock when block if we are sure then we can use value else argument matcher is best.

### Testing for EmptyList.
---
If the method is checking for emptyList then we can use
```java
private static List<Map<String, Object>> getEmptyListOfMaps() {
        List<Map<String, Object>> mockEmptyData = Collections.emptyList();
        return mockEmptyData;
    }
```

We can use the EmptyList in this way.
```java
@Test
    void getMedicationByPatientId_EmptyListResponse() {
        when(reportsBigQueryServiceMock
                .getRecordFromView(anyString(), anyString(), anyMap()))
                .thenReturn(getEmptyListOfMaps()); // This is the emptyListOfMaps

        List<Map<String, Object>> response = idtRoundingQueryService.getMedicationByPatientId("anySection", "234567", "fac_123");

        assertEquals(0,response.size());
    }
```

We can put in a different variable
```java
List<Map<String, Object>> mockEmptyData = getEmptyListOfMaps();

when(reportsBigQueryServiceMock
    .getRecordFromView(anyString(), anyString(), anyMap()))
    .thenReturn(mockEmptyData);
```

### Example 2.
The method that we are going to test `getOptionsData`.
```java
public List<Map<String, Object>> getOptionsData(String facilityNumber) {
        Map<String, Object> parameters = Map.of(FACILITY_NUMBER, facilityNumber);

        try {
            return reportsBigQueryService.getRecordFromView(IDT_ROUNDING_REPORT_NAME, "idt-options-base-query", parameters);
        } catch (Exception e) {
            log.error("Unable to get IDT options data", e);
            throw new FutureException("Unable to get IDT options data", e);
        }
    }
```


For testing in line that has exception.
```java
@Test
    void testGetOptionsDataWithException(){
            // Mocked exception from ReportsBigQueryService
            ReportDoesNotExistException mockException=new ReportDoesNotExistException("Report does not exist");

            // Mocking the behavior of reportsBigQueryService to throw an exception
            when(reportsBigQueryServiceMock
            .getRecordFromView(anyString(),anyString(),any()))//User argument matchers every where
            .thenThrow(mockException);
    }
```
We use `thenThrow` and mock the exception. 

The method throws `FutureException` so we have to use `Assertions.assertThrows`
```java
    @Test
    void testGetOptionsDataWithException() {
        // Mocked exception from ReportsBigQueryService
        ReportDoesNotExistException mockException = new ReportDoesNotExistException("Report does not exist");

        // Mocking the behavior of reportsBigQueryService to throw an exception
        when(reportsBigQueryServiceMock
                .getRecordFromView(anyString(), anyString(), any()))//User argument matchers every where
                .thenThrow(mockException);

        // Call the method under test
        FutureException exception = Assertions.assertThrows(FutureException.class,
                () -> idtRoundingQueryService.getOptionsData("a"));
        // It takes the exception class under the test and the supplier.
        // assertThrows takes an executable Supplier. 

        // Verify : idtRoundingQueryService.getOptionsData throws : throw new FutureException("Unable to get IDT options data", e);
        assertEquals("Unable to get IDT options data", exception.getMessage());
        assertEquals(mockException, exception.getCause());
    }
```
For getting the data we can store in the resource folder in the test. We can debug the code and get the data in the executor file.

> @Mock -> For java testing.
@MockBean -> For spring testing.


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

### Example 3.
---
For calling the DB. Here we are calling 2 Db one we are mocking and getting the value from the file and another we are mocking and making the value.
```java
    @Test
    void getDataForTreatmentOrderTest_else(){
        //Get the actual Query data as JSON from DB while debugging
        List<Map<String, Object>> mockDataFromApi = getMockResponseFromFile("response/idt-patient-profile/dataForTreatmentOrders.json");

        List<Map<String, Object>> mockProviderResponse = new ArrayList<Map<String, Object>>() {{
            add(new HashMap<String, Object>() {{
                put("PROVIDER_IDENTIFIER", "15034");
                put("provider","John Doe");
            }});
        }};

        // Mock the behavior of the two DB calls
        when(reportsBigQueryServiceMock.getRecordFromView(anyString(), anyString(), anyMap()))
                .thenReturn(mockDataFromApi)//mocking the DB Call of getDataForTreatmentOrder
                .thenReturn(mockProviderResponse);//mocking the DB Call of private getOrderProvidersFormattedNamesByIds


        List<Map<String, Object>> dataForTreatmentOrder = idtRoundingQueryService.getDataForTreatmentOrder("treatment-order-base-query", "234567", "11019");

        assertEquals(1,dataForTreatmentOrder.size());
    }
```

* Here we can see 2 `thenReturn`. We are testing for the method `getDataForTreatmentOrder`. It is calling the db. The method is public and it is calling another private method `getOrderProvidersFormattedNamesByIds` this is also calling the DB.
    * Here there is 2 db call. The first `thenReturn` is the file data and the second `thenReturn` is the data that we are creating `mockProviderResponse`.


**If test fail and in the local it is showing some test covered in the test coverage will it increase in the overall test cases covereage?**

No. It will show test fails. Also the intellije test coverage is not correct. It is better to push and pass the build and check in the sonarcube. The build needs to be passed. 
- Often the build fails even after the cases are running fine in local because the data might not be mocked properly. It happens as in local it connects with the database and runs but it needs to mock the data and then run the test cases.

---

The test cases is for the TreatmentDetailsReportService class.
```java
@Autowired
    private TreatmentDetailsReportService treatmentDetailsReportService;
```

The method we want to test is `getReportPayload` which is only for Pdf and if html request comes it should throw exception. 
The test cases for `getReportPayload` method.
```java
@Override
  public Payloadable getReportPayload(Map<String, Object> requestEntity) {
    throw new UnsupportedOperationException("TDR is PDF only report");
  }
```
TDR is only PDF report. The test cases to handle exception in JUnit 5.
```java
@Test
void getReportPayload() {
    Map<String, Object> requestEntity = new HashMap<>();
    // assertEquals(null, treatmentDetailsReportService.getReportPayload(requestEntity));
    // assertEquals("TDR is PDF only report", treatmentDetailsReportService.getReportPayload(requestEntity));

    // This part will work. Here we have to pass the lambda function and call the method.
    Exception exception = assertThrows(UnsupportedOperationException.class,()->{
        treatmentDetailsReportService.getReportPayload(requestEntity);
    });
    String expectedMessage = "TDR is PDF only report";
    String actualMessage = exception.getMessage();
    assertTrue(actualMessage.contains(expectedMessage));
}
```

Example of any test cases for an exception. It is for the `RuntimeException`.
```java
@Test
public void whenDerivedExceptionThrown_thenAssertionSucceeds() {
    Exception exception = assertThrows(RuntimeException.class, () -> {
        Integer.parseInt("1a");
    });

    String expectedMessage = "For input string";
    String actualMessage = exception.getMessage();

    assertTrue(actualMessage.contains(expectedMessage));
}
```

For any report that is only related to PDF there should be one case for multiple MPI. Like for multiple mpi thereport should generate. When we say that the report should generate means it should not return null we can write `assertNotNull`.


> Object Mapper is used to map the Json data to the Java Object.
More need to continue. Like how to get the pdf read in the test file.


Testing for one method in TDR.
```java
@Override
  public ByteArrayOutputStream generatePdfReport(Map<String, Object> requestEntity) {
    TdrRequestEntity tdrRequestEntity = getSpecificRequestEntity(requestEntity,
        TdrRequestEntity.class);

    switch (TdrReportType.valueOfString(tdrRequestEntity.getType())) {
    case LONG_FORM_TODAY_TREATMENT:
	  return handleTodayRequestMultipleMpi(requestEntity);
    case LONG_FORM_PREVIOUS_TREATMENT:
      return handlePreviousRequest(requestEntity);
    case SHORT_FORM_TODAY_TREATMENT:
      return handleTodayShortFormRequest(tdrRequestEntity);
    default:
      throw new ReportServiceException("Unknown TDR report type: " + tdrRequestEntity.getType());
    }
  }
```
For the switch case we do not mock anything that is not returning anything. We mock only those which return something.
We donot mock the `handleTodayRequestMultipleMpi(requestEntity)` method this part we need to test.

- In this case we need to write three test cases one for each.
- `case LONG_FORM_TODAY_TREATMENT:
  return handleTodayRequestMultipleMpi(requestEntity);` This part is **System Under Test SUT**.
- The main is `Given When Then`. When we mock then we get the expected value.
- For testing any method if it is going to a different class then we mock that part. Only those methods that is inside the SUT is taken care.

In one such private method inside the SUT. It is calling a new service file 
```java
Map<String, PdfDocument> tdrAuditPartPdfMap = tdrAuditPartService.getTdrLongFormPdfs(treatmentIdList, mpis);
```
We have to mock this part as it is outside the SUT class. This method return `Map<String,PdfDocument>` we need to put this in the `then` block.
```java
PdfDocument pdfdocument = mock(PdfDocument.class);
Map<String,PdfDocument> tdrPdfs = tdrAuditPartService.getTdrLongFormPdfs(List.of(TREATMENT_ID,TREATMENT_ID_NODATA),List.of(MPI_!,MPI_2));
Mockito.when(tdrAuditPartService.getTdrLongFormPdfs(anyList(),anylist())).thenReturn(tdrPdfs);
```

- If the private method in the main service is calling another service class then just mock the other service class with proper parameter and return or thenReturn value.

> Thumb Rule - For testing the public method 
> - If there is parameter in the public method then make the parameter. 
>   - If the parameter will be used again then in the top we can make the @MockBean TdrShortForm tdrshortform.
>   - If it is used only in that method then we can write TdrShortFrom tdrShortForm = mock(TdrShortForm.class) inside the method.
> - If it is calling any other private method then we need to assert equal or check with the return of the private method. This is the final test of the method. We need to make the parameter proper and make things so that the private method can be called while running the code. The check will be done without anything.
> - If the private method is calling any other service class then mock the service class with passing parameter(like any(), anyMap()) and thenReturn.

---
In TreatmentDetailsReportService file
```java
private ByteArrayOutputStream handlePreviousRequest(Map<String, Object> requestEntity) {
    return buildPreviousLongForm(tdrShortFormReportService.getTdrShortFormFiles(requestEntity));
  }
```
This `tdrShortFormReportService.getTdrShortFormFiles(requestEntity)` return a `List<TdrShortFormFile>`.
In the service file say we need the list of the TdrShortFormFile which has one or more value. When I created with new keyword it is showing empty list.
```java
List<TdrShortFormFile> tdrShortFormFileList = new ArrayList();
Mockito.when(tdrShortFormReportService.getTdrShortFormFiles(anyMap())).thenReturn(tdrShortFormFileList);
```
We need some value as in one block it is using loop for the value of the list.
```java
tdrFiles.forEach(shortFormFile -> {
        PdfDocument pdfDocument = tdrAuditPartPdfMap.get(shortFormFile.getTreatmentId());
        try (PdfDocument srcPdf = buildPreviousLongForm(shortFormFile, pdfDocument)) {
          merger.merge(srcPdf, 1, srcPdf.getNumberOfPages());
        } catch (Exception e){
          throw new ReportServiceException("Exception in buildPreviousLongForm merger", e);
        }
      }
```


I need to create the List with some value.
```java
List<Map<String, Object>> data = getMapList();
List<TdrShortFormFile> tdrShortFormFileList = new ArrayList();
TdrShortFormFile tdrShortFormFiledata = TdrShortFormFile.builder()
        .facilityNumber("123")
        .treatmentId("123")
        .mpi("123")
        .body(generatePdf(data).toByteArray())
        // new ByteArrayOutputStream().toByteArray()
        .build();
tdrShortFormFileList.add(tdrShortFormFiledata);
```
When we need to add a value we can add it like this way in list.
The `TdrShortFormFile` is a class with values.
```java
public class TdrShortFormFile {

    private String facilityNumber;
    private String mpi;
    private String treatmentId;
    private byte[] body;
}
```

So we did `tdrShortFormFileList.add(tdrShortFormFiledata)` then created a local variable and add all the field.
- `new byte[]` was giving error. We need byte array.
- `new ByteArrayOutputStream().toByteArray()` this was working in passing the value but giving error in the merger method. As the merger involves some pdf, so we pass some pdf data in `Bytearrayoutputstream`. 
- When we call the method `generatePdf(data)` this gives the data in the pdf. Then it is not showing any error in the merge method. As merge method always call the pdf. So we have to pass some data in the list.
---
For any report which has Json and in the service file we have one if(!report.isEmpty()) then in the Json file in the report list we need to add some data. 
- We can check the dto of report to see the field stored then we cann add those in the Json file and check in the JsonViewer.
- If it is a list then one object has value and other is null. This way we can check for the if and else. It will get the value the line will be tested. 
```json
"List":[
{
        "someValue":"string"
},
{
        "someValue":null
}      
]
```
- If it is only object.
```json
"List":{
"someValue":"123"
}
``` 
Then we have to make another list of the same thing and to put null.
```json
"List":{
"someValue":"123"
},
"List2":{
"someValue":null
}
```

- When we need to deprecate any method then we wite the annotation on top of the method `@Deprecated` and `@lombok.Generated`.