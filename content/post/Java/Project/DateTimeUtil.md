+++
title = 'Date Time Util'
date = 2025-02-08T13:18:51+05:30

url = "/post/java/project/DateTimeUtil/"
tags = ['interviewQuestion', 'java']
+++
# Different Types of TimeStamp in Java.

Java provides different types of timestamp. Important date time representation involves LocalTime, UTC Time, TimeZone Information.

### LocalDate.

```java
LocalDate today = LocalDate.now();
System.out.println("LocalDate " + today);
// LocalDate 2024-02-08
```

### LocalTime.
```java
LocalTime now = LocalTime.now();
System.out.println("LocalTime: " + now);
// LocalTime: 14:45:30.123456
```
### LocalDateTime.
```java
LocalDateTime now = LocalDateTime.now();
System.out.println("LocalDateTime: " + now);
// LocalDateTime: 2024-02-08T14:45:30.123456
```
### ZoneDateTime.
```java
ZonedDateTime zonedNow = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
System.out.println("ZonedDateTime: " + zonedNow);
// ZonedDateTime: 2024-02-08T20:15:30.123456+05:30[Asia/Kolkata]
```
### Instant, EpochBased.
It is always in UTC.
```java
Instant now = Instant.now();

System.out.println("Instant (Epoch Time UTC): " + now);
// Instant (Epoch Time UTC): 2024-02-08T14:45:30.123456Z
```
### Epoch Time.
Seconds & Milliseconds Since 1970-01-01 00:00:00 UTC.
```java
long epochSeconds = Instant.now().getEpochSecond(); // Epoch in seconds
long epochMillis = Instant.now().toEpochMilli(); // Epoch in milliseconds
        
System.out.println("Epoch Seconds: " + epochSeconds);
System.out.println("Epoch Milliseconds: " + epochMillis);
// Epoch Seconds: 1707382200
// Epoch Milliseconds: 1707382200123
```
|Type|Contains|Example|
|---|---|---|
|LocalDate|Date (YYYY-MM-DD)|2024-02-08|
|LocalTime|Time (HH:MM:SS)|14:45:30.123456|
|LocalDateTime|Date + Time|2024-02-08T14:45:30.123456|
|ZonedDateTime|Date + Time + Zone|2024-02-08T20:15:30.123456+05:30[Asia/Kolkata]|
|Instant|Epoch-Based UTC Time|2024-02-08T14:45:30.123456Z|
|Epoch Time|Seconds/Milliseconds since 1970|1707382200 (seconds), 1707382200123 (milliseconds)|

### Conversion.
|Type|Method|
|---|---|
|LocalDate to LocalDateTime|date.atTime(LocalTime.now())|


| Format      | Example Code                                                                                                                                       |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Inline Code | `System.out.println("Hello, World!");`                                                                                                             |
| Block Code | {{< highlight java >}}public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } } {{< /highlight >}} |

