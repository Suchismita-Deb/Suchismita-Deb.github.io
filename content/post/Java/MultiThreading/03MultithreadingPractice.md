+++
title = 'Multithreading Concurrency.'
date = 2025-07-28T10:08:46+05:30
url= "/post/java/multithreading/concurrency"
tags = ['multithreading','java','concurrency']
+++

### Multithreading and Concurrency.

Print In Order. https://leetcode.com/problems/print-in-order/

Suppose we have a class:
```java
public class Foo {
public void first() { print("first"); }
public void second() { print("second"); }
public void third() { print("third"); }
}
```
The same instance of Foo will be passed to three different threads. Thread A will call first(), thread B will call second(), and thread C will call third(). Design a mechanism and modify the program to ensure that second() is executed after first(), and third() is executed after second().

Note:

We do not know how the threads will be scheduled in the operating system, even though the numbers in the input seem to imply the ordering. The input format you see is mainly to ensure our tests' comprehensiveness.



Example 1:

Input: nums = [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously. The input [1,2,3] means thread A calls first(), thread B calls second(), and thread C calls third(). "firstsecondthird" is the correct output.
Example 2:

Input: nums = [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls third(), and thread C calls second(). Thread B (third) starts before Thread C (second), which starts after Thread A (first). The order should be same "firstsecondthird" is the correct output.

The array mainly for the testing purpose. This setup ensures that your synchronization logic inside Foo is robust against any permutation of thread launch order. The code should make the first second and third called in order. The number can be any in the array.

The third thread should ensure the second called and closed. The Foo class has 3 method and each method is called by a separate thread and the order should be same regardless the thread are launched in order.

The concurrent programming where the execution of the program is conducted in multiple processes or threads. 

The concurrency can cause the 3 types of problem - race condition, deadlocks and resource starvation.

### __Race Condition.__

Race-condition - The program ends with an undesired output, resulting from the sequence of execution among the processes. Race condition occurs when multiple threads or processes access shared resources or execute logic concurrently. The final outcome depends on the timing and the sequence of the execution.  
More threads are racing to execute and who wins the race determines the result.


In the problem without synchronization the 3 methods first(), second() and third() will execute in any order and the result can be thirdsecondfirst.

### __Deadlock.__

The concurrent processes wait for some necessary resources from each other. As a result, none of them can make progress.

A deadlock occurs when two or more threads are waiting for each other to release resources. Each holds the resource the other needs. 

No progress. No exit. Just waiting forever.

### __Resource Starvation.__


A process is perpetually denied necessary resources to progress its works.
It happens when a thread or process is *ready to run* but is *repeatedly denied access to the resource* it needs - as the other process keeps taking priority. 

The process is stuck in a queue where the other keep cutting the line forever.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);

Runnable highPriority = () -> { /* runs fast, gets rescheduled often */ };
Runnable lowPriority = () -> { /* rarely gets CPU time */ };

for (int i = 0; i < 1000; i++) {
    executor.submit(highPriority); // floods the pool
}
executor.submit(lowPriority); // gets starved
```

The lowPriority task is ready but the pool is filled with highPriority task. The low will never run or run after many time.

Example in Cafeteria VIP keep getting attention first and the regular customer is waiting. Everytime they are about to serve a VIP cuts in. The regular customer is **starved**, even though they’re **not blocked** and not doing anything wrong.

**Prevent Starvation**

Use *fair locks* `ReentrantLock(true)` ensure FIFO. Avoid priority inversion. Use *aging* gradually increasing the priority of the waiting thread.





### _Race condition._

Function called `withdraw(amount)` - deduct amount of money from the balance. 
```java
int balance = 500;
int withdraw(int amount) {
  if (amount < balance) {
    balance -= amount;
  }
  return balance;
}
```

It will work good when the thread doing one task. The issue arise when two thread invoke the function at the same time with different input. T1 calls withdraw(400) and T2 calls withdraw(300) and tha balance is 500.

{{<figure src="/images/Java/Multithreading/Leetcode/RaceConditionExample.png" alt="UserRequest." caption="">}}
At the end the balance will end up in negative and it is not desired output. In single thread it will work but multithreading need synchronization.
```java
public class Race {
    public static int balance = 500;
    private static class BankAccount {
        public synchronized int withdraw(int amount) {
            if (amount < balance) {
                System.out.println(Thread.currentThread().getName() + " is withdrawing " + amount);
                try {
                    Thread.sleep(100); // Simulate delay
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                balance -= amount;
                System.out.println(Thread.currentThread().getName() + " completed withdrawal. Remaining balance: " + balance);
            } else {
                System.out.println(Thread.currentThread().getName() + " cannot withdraw " + amount + ". Insufficient balance.");
            }
            return balance;
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount();

        // Thread T1 tries to withdraw 400
        Thread t1 = new Thread(() -> account.withdraw(400), "T1");
        // Thread T2 tries to withdraw 300
        Thread t2 = new Thread(() -> account.withdraw(300), "T2");
        t1.start();
        t2.start();
    }
}
```
The output will be like.
```
T1 is withdrawing 400
T1 completed withdrawal. Remaining balance: 100
T2 cannot withdraw 300. Insufficient balance.
```

_Race Free Concurrency._

The concurrency problem share one common characteristics - multiple thread share the same resource(balance) We cannot restrict the resource sharing so the solution is to _coordinate the resource sharing_.  
The solution to the race condition becomes clear: we need certain mechanism that could enforce the exclusivity of certain critical code section, i.e. at a given time, only one thread can enter the critical section. 

Use __lock__ to restrict the access to the critical section.  
{{<figure src="/images/Java/Multithreading/Leetcode/Lock.png" alt="UserRequest." caption="">}} 


At timestamp 3 the thread T2 is in the critical section. At the end the threads can run concurrently and the data is maintained.

The critical section is released, it would be nice to notify the waiting threads. For instance, as soon as the thread #2 releases the critical section at the timestamp #5, the thread #1 got notified to take over the critical section.

Solution to prevent race condition in concurrency - Access control on the critical section and Notification to the blocking threads.

_Pair Synchronization._

The problem ask to complete 3 jobs in order and all running in a separate thread. To enforce the sequence create some dependencies between pairs of jobs. The second job depends on the completion of the first job.

The shared variable firstJobDone to coordinate the first and second job and the secondJobDone to coordinate the second and third job.
```java
class Foo {

  private AtomicInteger firstJobDone = new AtomicInteger(0);
  private AtomicInteger secondJobDone = new AtomicInteger(0);

  public Foo() {}

  public void first(Runnable printFirst) throws InterruptedException {
    // printFirst.run() outputs "first".
    printFirst.run();
    // mark the first job as done, by increasing its count.
    firstJobDone.incrementAndGet();
  }

  public void second(Runnable printSecond) throws InterruptedException {
    while (firstJobDone.get() != 1) {
      // waiting for the first job to be done.
    }
    // printSecond.run() outputs "second".
    printSecond.run();
    // mark the second as done, by increasing its count.
    secondJobDone.incrementAndGet();
  }

  public void third(Runnable printThird) throws InterruptedException {
    while (secondJobDone.get() != 1) {
      // waiting for the second job to be done.
    }
    // printThird.run() outputs "third".
    printThird.run();
  }
}
```
The second() function will wait for the variable to turn 1 then to execute. The incrementAndGet is a method in AtomicInteger class it increment the value by 1 and return the value.

