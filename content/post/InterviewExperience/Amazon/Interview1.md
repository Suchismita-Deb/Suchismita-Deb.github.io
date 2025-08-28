+++
title = 'Interview Amazon 1'
date = 2025-07-10T11:30:58+05:30

url= "/post/interviewExperience/Amazon/Interview1"
tags = ['Interview Experience','Amazon']
categories = ['Interview Experience','Amazon']
+++

# Interview Experience (1/20).
---
### SDE 2. April 2025.
Candidate Info - https://www.linkedin.com/in/scortier/  
Link - https://youtu.be/mfuHYMYNqns?si=zuvrQfDeh5jQR8HG  
Application Type - Recruiter Reach out.

### **📅 Interview Format & Timeline.**
Recruiter share the OA. OA 3 hours to complete. 2 DSA Question(Binary Search and DP) H. Got the result in next day.

2 DSA Round, 1 System Design, 1 Bar Raiser.
### **🧠 Interview Questions Breakdown. Level - M+.**
Round 1 - Binary Search(M) and DP(H). Code + DryRun + Time and Space.  
Round 2 - String Manipulation and Graph.
### **💎 Design System. Level - H.**
Only like Design YouTube.  
You have to come up with the functional requirement, non-functional requirement, small capacity and working design then optimize.  
When drawing the HLD interviewer will stop and go deep dive in one part. Don't stop him. Generally the design round the interviewer stop and you continue the design and when they ask for one thing or hint take it properly. Not providing the detail of that part will lead to rejection.
### **📶 Bar Raiser Round.**
It can be DSA or System Design based on the interviewer.  
In this case it is System Design.  
Design BookMyShow - Deep dive in one part like what will happen when a single user book only one seat.
### **🙋‍♂️ Candidate Experience.**
Highlight - In system design if you are not able to convince the interviewer with your design and the trade-offs then you are rejected.

DP and Graph are Medium and Hard level. Leetcode medium in 15 mins and Hard in 30 mins.  
System Design do you know the open source software and how well you can use it in the system.  
Behavioral Round and give more stories and different stories that you have said in other rounds. It will give them more data points to validate.  
System Design Practice as much questions as possible.
### **✅ Outcome - Accepted.**
Salary = 60-65LPA.  
Base = 40-45LPA.  
Joining = 20LPA.


# Interview Experience (2/20).
### July 2025.
https://leetcode.com/discuss/post/7003971/amazon-sde-2-accepted-india-by-anonymous-fpu2/
### **🧠 Interview Questions Breakdown. Level - M+.** 

https://leetcode.com/problems/insert-delete-getrandom-o1/description/  
https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/description/
### **🌏 Round 2.**  
https://leetcode.com/problems/design-twitter/description/   
Follow Ups - Generate the news feed when one user follows millions of other users and handle millions of such users.
### **💎 Design System. Level - H.**  
Movie Ticket Booking System.  

> First 20 mins LP then 30 mins Design. 
>
> Practice in such a way that you can build a struture solution in 30 mins and lld code as well in 10 mins.

### **💹 Bar Raiser Round.**
A design based DSA question. Design a movie system, and return the top k movies, movies by genre and some other functionalities as well.  
Min-heap based approach to get the top k rated movies and a max-heap approach by heapifying and removing k elements.  
More question on the min heap and removal of the root node.
### **🙋‍♂️ Candidate Experience.**
Passed the interview offer letter yet to come.


### SDE 2. 19th Aug 2025.

Candidate Info - 4 Years Pdt based. 
Link - https://leetcode.com/discuss/post/7098786/amazon-sde-2-interview-by-anonymous_user-eves/
Application Type - OA then loop interview. 2 Medium hard.

### **🧠 Interview Questions Breakdown. Level - M+.**
Interviewer - Senior SDE.
Round 1 - This is a graph reachability problem, to check if we can reach the objects and safely collected.  
This is unique path with obstacles leet code problem( Bit modified).

### **💹 Interview Round 2.**
Interviewer - Senior SDE.
In a binary tree difference between sum of odd levels with sum of even levels. (solve in 15 mins - get this level of confidence).  
Sorted but rotated array, find the minimum element in that array.
### **💎 Design System. HLD.**
Interviewer - SDM.  
Related to subscription service.
### **📶 Bar Raiser Round. LLD**
Interviewer - Principal engineer.  
Asked to implement distributed monitory system which monitors health of servers.


monitoring ~1000 servers' health scalably for CI/CD deploys.
Your approach is solid: sync checks → multithreading → batching (50-100) with dynamic sizing by latency (overall time = sum of max group latencies) → failure enums + polling. Event-based alt is great for efficiency.
My take evolved similarly, but focused on a push model for async reports to decouple and scale:
Assumptions: Binary health (1=healthy, 0=unhealthy); services push reports periodically; aggregator handles transients via buffer (unhealthy only after N consecutive 0s); deployment OK if all critical services are 1.
Components:

HealthReport: { service_id, timestamp, health: int (0/1) }
HealthAggregator: Receives async pushes; per-service buffer of recent reports (e.g., last 5); updates if timestamp newer; flags unhealthy after N zeros.
DeploymentDecisionEngine: Queries latest statuses; returns true if all 1s.
Store: Redis for statuses/buffers/timestamps.

Freshness/Timing: Compare incoming timestamps—update only if newer; ignore stale. Buffers keyed by service_id for independent processing.
Retries/Concurrency: Aggregator-side buffer for transients; fine-grained locks per service_id on updates to avoid races. No global contention.
```java
class HealthAggregator {
private ConcurrentDictionary<string, Queue> _buffers = new(); // Per-service buffer
private const int BufferSize = 5, FailureThreshold = 3;

public async Task ProcessReportAsync(HealthReport report) {
var key = report.ServiceId;
// add lock
// enque
}
return q;
});
}

private void UpdateStatus(string key, int status) { /* Store in Redis */ }
}

class DeploymentDecisionEngine {
public bool IsDeployable(IEnumerable criticalServices) {
return criticalServices.All(s => GetLatestStatus(s) == 1);
}
}
```

another approach by one commented.

Create a function which tells whether All the services are available or not?
(which will be used in CI CD deployment whether new development is deployable or not)
For 1000 servers it should be scalable.

Proposed solution :
```java
class Service
{
List servers;
bool isDeployable()
{
List tasks;
for( int i=0;i < servers.size();i++)
{
var task = IsServerAvailable(servers[i].ServerId);
tasks.Add(task);
}
List results = tasks.whenAll();
for( int i=0;i < servers.size();i++)
{
if( results[i] == Enum.ServerFailure || Enum.FailureDueToNoResponse)
return false;
}
return true;
}
private async bool IsServerAvailable(serverId int) { }
private async APICallToServer() {}
}

```
I proposed solution where for each server api request will be done synchronously( one after another).

Interviewer told to increase the response time - So I proposed multi threading solution.

1000 threads is not a good option. So interview told to optimize it .
   So I proposed batching solution and polling based solution.
   We can create batch of 50 -100 servers.
   And can process server api calls in batch.

How will you decide batch size?
   Based on each server's API turn-around-time .
   Interviewer told latency will be different for each server.
   So I proposed : based on the latency of each server we can set batch size.
   so overall latency will be ( max latency of G1 + max Lagency of G2 … + Gn)


How will you handle the scenario where failure happens and want to check is
   it due to server returns failure  or due to network failure.
   I proposed we can have Enum property called Status :  ( NotCalculated ,Available , FailureFromService , FailureDueToNoResponse).
   And we can have polling based soln.


I told the alternative solution of using event base solution.
   Interviewer told to explain me.
   Assumption : We have exactly one event available : for each server then we just have to process last 1000 servers.
   If we remove assumption  :  we have to start processing the events from end and move backward until we have events for each server at least once.

### **🙋‍♂️ Candidate Experience.**
Highlight - For HLD: HelloInterview - This is so far the best for HLD preparation.  
For LLD: I used Grok to learn the patterns and important questions. Also few github blogs.

### **✅ Outcome - Accepted.**
Selected.