+++
title = 'Multithreading and Concurrency - Thread Process and Memory Model - Thread Creation, Thread Lifecycle and Inter Thread Communication. '
date = 2024-12-19T09:47:59+05:30

url= "/post/java/fundamental/Multithreading"
tags = ['interviewQuestion', 'java']
+++
### Multithreading and Concurrency.

Multithreading is a technique that allows for concurrent (simultaneous) execution of two or more parts of a program for maximum utilization of a CPU. As a really basic example, multithreading allows you to write code in one program and listen to music in another.

Programs are made up of process and thread.

Concurrency is the ability of your program to deal (not doing) with many things at once and is achieved through multithreading. Concurrency is different from parallelism which is about doing many things at once.

https://www.educative.io/blog/multithreading-and-concurrency-fundamentals


https://medium.com/@lakshyachampion/a-comprehensive-guide-to-multithreading-and-concurrency-in-java-9bf8a0a0bb82

https://www.educative.io/blog/top-five-concurrency-interview-questions-for-software-engineers

### What is Thread and Process.

Process is an instance of a program that is getting executed. In process we have thread.

There is one program.

```java
public class Test{
    public static void main(String[] args){
        System.out.println("Hello");
    }
}
```

Compile the class `javac Test.java` - It will generate the bytecode that can be executed by JVM.

Execution `java Test` - The bytecode needs to be executed. JVM starts the new Process, here the Test is the class that has the main method.  

**Process says it is an instance of a program that is getting executed.**

It has its own resource like memory, thread. OS allocates these resources to process when its created. When one process is created it creates its own heap memory.


When we execute a program a process is created and own heap memory is created and two process donot connect with each other.


Thread is known as **lightweight process**. It is called as the smallest sequence of instruction that are executed by CPU independently.

One process can have multiple thread. When a process is created it starts with one thread and that initial thread known as "main thread" and from that we can create multiple threads to perform task concurrently.

```java
public class Multithreading{
    public static void main(String args[]){
        System.out.println("Thread name - " + Thread.currentThread().getName());
    }
}
```

Output - `Thread name - main`.

JVM has - heap, stack, core segment, data segment, register, program counter.

Heap and stack are the only part were we need the garbage collector.

### How Java execute the program.

When a new program execute a new JVM instance is created.  
New JVM has its own heap memory and how much memory allocated to the process can be adjusted by the command.
`java -Xms256m -Xmx2g MainClassName`

- **Xms(size)** - It will set the initial heap size here it is set to 256MB.

- **Xmx(size)** - It is max heap size process can get, it is set to 2GB, if tries to allocate more memory then "OutOfMemoryError" will occur.

There can be multiple process using the heap memory the total is set to 2Gb.

![alt text](image-7.png)

Image - Register, Stack, Counter - The thread does not share any resource. Thread share the code segment and data segment.

### Code Segment.

Contains the compiled BYTECODE of the Java program.  
It is read only.   
All threads within the same process shares the same code segment.

### How the process execute?

`java Main` - It creates the process is created, JVM instance is created and it is used to interpret or JIT compiler to machine code.
It create the thread assign the stack, register and counter are assigned. It will save the machine code in the code segment.

The counter points to the address in the code segment where the thread start the execution.
CPU will execute the machine code.

Thread 1 will use the register store the data and send to the CPU to execute. OS schedule the JVM scheduler and it sechdule and manage the assignment of the thread to the CPU. The CPU will get the code part from the code segment and then run the thread. There are limit say 1 sec for a thread when it is done the result say done half is stored into the register of the thread the intermediate data is stored in the register and it is called **Context Switching** and CPU solve the next thread.

Again when the thread comes it will come with the data and continue the execution.

When there are 2 CPU (2 core or 8 core) then threads run parallely.

### Data Segment.

Contains the GLOBAL and STATIC variable.
All treads within the same process, share the same data segment.
Threads can read and modify the same data.
Synchronization is requires between multiple treads.

### Heap.

Objects created at runtime using the new keyword are allocated in the heap. Process are not sharing the same heap. The thread inside the process share the same heap.
Heap is shared among all teh threads of the same process but not within process.
Treads can read and odify the heap data.
Synchronization is required between multiple threds.

### Stack.

It manages method calls and local variable.

### Register.

When JIT(Just-in time) compiles converts the bytecode into native machine code its uses register to optimized the generated machine code.
Also helps in context switching.

### Counter.

It is program counter and it points to the instruction which is getting executed.
Increments its counter after successfully execution of the instruction.
Code segment has the machine code. Each thread are running a part of the code the counter point the address of the section.

## Multithreading.

Allows a program to perform multiple task at the same time. Multiple threads share the same resource such as memory space but still can perform task independently.  
It improves performance by task parallelism.
It does resource sharing.  
It has concurrency issues like deadlock, data inconsistency.
Needs synchronization and lock.
Testing and debugging is difficult.

### Difference between multitasking and multithreading.

Multiple process running is Multitasking and multiple thread running inside the process is Multithreading.

### Ways to create a thread.

- Implementing Runnable interface.

- Extending Thread class.

Interface - we can implement multiple interface.

Runnable is a functional interface. The thread class implements runnable and it has all teh methods like creation of thread, run(), sleep(), start(), stop(), interrupt().

### Implementing runnable.

Implement the Runnable Interface.

```java
public class MyClass implements Runnable{
    @Override
    public void run(){
        System.out.println("The code executed by thread: " + Thread.currentThread().getName());
    }
}

public class MyClass implements Runnable{
    Thread t1 = new Thread(()->{
        System.out.println("The code executed by thread - " + Thread.currentThread().getName());
    })

    // Functional interface is using the lambda.
}
```

It is not a thread. It is a class implementing Runnable. Now we have to invoke a thread to call the run method.

Create an instance of the class that implements Runnable -> Pass the runnable object to the thread constructor -> Start the thread.

```java
public class Main{
    public static void main(String args[]){
        System.out.println("Going inside the main method - " + Thread.currentThread().getName());
        MyClass runnableObj = new MyClass();
        Thread thread = new Thread(runnableObj); // Thread is created.
        thread.start(); // It will call the run method inside the Thread class. Inside the run() method there is target.run and the target is the runnable object. The run() of the runnable object will start.
        System.out.println("Completed the main method - " + Thread.currentthread().getName());
    }
}
```

The output.

```xml
Going inside the main method - main.
Completed the main method - main.
The code is executed by thread - Thread-0
```

The main thread is going and one new thread is created.

One class can extend one class and implement multiple interface and the class is not the thread. It can do other work and also create thread.

### Extending the Thread class.

```java
public classMyClass extends Thread{
    @Override
    public void run(){
        System.out.println("Code is executed by thread - " + Thread.currentThread().getName());
    }
}
// Initiate and start the thread.

public class Main{
    public static void main(String args[]){
        System.out.println("Going inside the main method - " + Thread.currentThread().getName());
        MyClass thread = new MyClass(); // No need to create the thread class.
        thread.start();
        System.out.println("Finish main method - " + Thread.currentThread().getName());
    }
}
```

### Thread Lifecycle.

Image.
![alt text](image-8.png)

Runnable and running comes under same state and running state meaning waiting for the CPU and when got the CPU it is in running and when there is context switch then again it is in runnable state.

| Lifecycle State   | Description                                                                                                                                                                                                                                                    |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **New**            | Thread has been created but not started. Its just an object in memory.                                                                                                                                                                                         |
| **Runnable**      | Thread is ready to run. Waiting for CPU time.                                                                                                                                                                                                                  |
| **Running**       | When thread start executing its code.                                                                                                                                                                                                                          |
| **Blocked**       | Different scenarios where runnale thread goes into the Blocking state - I/O blocking like readinf from a file or databse. -Lok acquired - If thread want to lock on a resource which is locked by other thread,it has to wait. Releases all the MONITOR LOCKS. |
| **Waiting**       | Thread goes into this state when we cal the wait() method, makes it non runnable. It goes back to runnable, once we call notify() or notifyAll() method. Releases all the MONITOR LOCKS.                                                                       |
| **Timed Waiting** | Thread waits for specific period of time and comes back to runnable state, after specific conditions met like sleep(), join(). Do not release any MONITOR LOCKS.                                                                                               |
| **Terminate**     | Life of the thread is completed, it cannot be started back again.                                                                                                                                                                                              |

In the runnable time it put the MONITOR LOCK.

### Monitor Lock.

It helps to make sure that only 1 thread goes inside the particular section of code(a synchronous block or method).

```java
synchronized void method1(){
// It is a lock and only one thread will go at a time.
}
```

One object calls the method the synchronized will put a lock on object and when the task is finished then other lock will come and perform the task.

```java
public class MonitorLockExample{
    public synchronized void task1(){
        try{
            System.out.println("Inside Task1.");
            Thread.sleep(10000);
        } catch(Exception ex){

        }
    }
    public void task2(){
        System.out.println("Task2, before synchronized.");
        synchronized(this){
            System.out.println("Task2, inside synchronized.");
        }
    }
    public void task3(){
        System.out.println("Task3");
    }
}

public static void main(String args[]){
    MonitorLockExample obj = new MonitorLockExample();

    MonitorLockRunnable runnableObj = new MonitorLockRunnable(obj);
    Thread t1 = new Thread(runnableObj);

    Thread t2 = new Thread(()->obj.task2());
    Thread t3 = new Thread(()->obj.task3());

    t1.start();
    t2.start();
    t3.start();
}
```

```java
public class MonitorLockRunnable implements Runnable{
    MonitorLockExample obj;
    MonitorLockRunnable(MonitorLockExample obj){
        this.obj = obj;
    }
    @Override
    public void run(){
        obj.task1();
    }
}
```

t1 will start and task1 is synchronized and it will put a monitor lock by t1 on obj.

Now t2 print the first line and now waiting the obj is in sleep for 10 sec. It is the same obj so waiting. Monitor lock will make sure only one thread works.

T3 will work and print.

When t1 is complete the task then it will go to t2 and print the line.

The output.

```xml
inside task1
task3
task before synchronized
task1 completed. // Waited for 10 sec to complete the task.
task2 inside synchronized
```

When two thread works in the same object then only we put the lock inside the object.

### Example of the Thread lifecycle.

```java
public class InventoryProduct{
    boolean itemAvailable = false;

    // synchronized put the monitor lock.
    public synchronized void addItem(){
        itemAvailable = true;
        System.out.println("Iteam added by - " + Thread.currentThread().getName() + " add invoke all thread");
        notifyAll(); // All the thread waiting for the object will invoke.
    }

    public synchronized void consumeItem(){
        // It will make the item available false and if not available then it should wait.

        System.out.println("Consume method invoked by - " + Thread.currentThread().getName());
        while(!itemAvailable){
            try{
                System.out.println("Thread " + Thread.currentThread().getName());
                wait(); // It releases the monitor lock.
            }
            catch(Exception ex){

            }
        }
        System.out.println("Item consumed by " + Thread.currentThread().getName());
        itemAvailable = false;
    }
}
```

The ProductTask and ConsumeTask is using the Runnable. We can use Lambda.

```java
public class ProduceTask implements Runnable{
    // Adding the task and sleep for 5 sec.

    SharedResource sharedResource;

    ProduceTask(SharedResource resource){
        this.sharedResource = resource;
    }

    @Override
    public void run(){
        System.out.println("Producer thread - " + Thread.currentThread().getName());
        try{
            Thread.sleep(5000);
        } catch(Exception ex){

        }
        sharedResource.addItem();
    }
}
```

```java
public class ConsumerTask implements Runnable{
    SharedResource sharedResource;
    ConsumerTask(sharedResource){
        this.sharedResource = sharedResource;
    }
    @Override
    public void run(){
        System.out.println("Consumer Thread - " + Thread.currentThread()getName());
        sharedResource.consumeItem();
    }
}
```

```java
public class Main{
    public static void main(String args[]){
        System.out.println("Main method started.");
        SharedResource sharedResource = new SharedResource();


        // Producer thread.
        Thread producerThread = new Thread(new ProducerTask(sharedResource));
        Thread consumerThread = new Thread(new ConsumerTask(sharedResource));

        // Using Lambda.
        // Thread consumerThread = new Thread(()-> {
        // System.out.println("ConsumerThread - " + Thread.currentThread(0.getName()));
        //sharedResource.consumeItem(); });

        // In both the thread there are same object.
        producerThread.start();
        consumerThread.start();

        System.out.println("Main method end.");
    }
}
```

Practice.

Two thread, producer and consumer share a common fixed size buffer as a queue. The producers job is to generate the data and put it into the buffer while the consumers job is to get the data from the buffer.

The problem is to make sure the priducer wont product data if the buffer is full, an wont consume the data if the buffer is empty.

```java
public class ProducerConsumerExample{
    Queue<Integer> q ;
    int size ;
    public ProducerConsumerExample(int size){
        q = = new LinkedList<>();
        this.size = size;
    }

    public synchronized void addData(int data){
        if(q.size()==size){
            // Queue is full wait for the consumer to consume the item.
            System.out.println("Buffer is full, wait for the consumer to consume item.");
            wait();
        }
        q.add(data);

        System.out.println("Produced " + data);

        notify();
    }

    public synchronized int getData(){
        if(q.size().isEmpty()){
            System.out.printn("Buffer is empty, Consumer is waiting for producer.");
            wait();
        }
        int top = q.poll();
        notify();
        return top;
    }
}
```

The Producer will add the data in the queue.

The Consumer will not get the when it is empty.

The main class.

```java
public class Main{
    public static void main(String args[]){
        ProducerConsumer p = new ProducerConsumer(5);

        Thread t1 = new Thread(()->{
            System.out.println("The Producer Thread - " + Thread.currentThread().getName());
            for(int i=0;i<=6;i++)
            p.addData(19);
        });
        t1.start();

        Thread t2 = new Thread(() -> {
            System.out.println("The Consumer Thread - " + Thread.currentThread().getName());

            for(int i=0;i<=6;i++)
            p.getData();
        });
        t2.start();
    }
}
```
### Thread Joining, Daemon Thread, Thread Priority.

Why Stop, Resume, Suspended method is deprecated.

wait - it releases the lock and make the thread free so that other can acquired the lock.

Stop.
Terminates the thread abruptly, no lock release no resource clean up happens.

Suspend - Put the thread on hold (suspend) for temporarily. No lock us release too.

Resume - Used to resume the execution of suspended thread.

The operations can led yto issue like deadlock.

Wait make the thread in wait state and it comes to active state when notify(). In wait() it releases the monitor lock and other thread can use.

Suspend and resume is like wait and notify. In wait it will realise the lock.

When use suspend and no resume then there is an issue and no lock release.
When one thread is dependent on other and it goes to suspend and the lock is not released the thread will not able to continue.

### Thread join.

When join method is invoked on a thread object, Current thread will be blocked and waits for the specific thread to finish.

It is helpful when we want to coordinate between threads or to ensure we complete certain task before moving ahead.

Say main thread started thread1 and main thread end and thread 1 continue, when we use thread1 join then main thread will not stop and thread 1 will complete.

## Thread Priority.

1 - low priority.
10 - high priority.

Even we set the thread priority while creation, it is not guaranteed to follow any specific order it is just a hint to thread scheduler which to execute next it is not a strict rule.

When new thread is created, it inherit the priority of its parent thread.

We can set custom priority using the `setPriority(int priority)` method.

## Daemon Thread.

Something running in async manner.

There is user thread. Daemon thread is alive when the user thread is alive and when it is not alive the daemon thread will stop.

### Locks and Semaphores.

synchronized is on object.
When object 1 is using the method lock then monitor lock is on object1 and when object 2 is using the lock method then monitor lock is assigned to method 2.

Any number of object can come to the method only one object can go inside the method. When all object are of same type then monitor lock can be used.

There are 4 types of custom locks.

## ReentrantLock.

```java
public class SharedResource{
    boolean isAvailable = false;

    public void producer(ReentrantLock lock){
        // Only the lock is there no need to see for same object or different object.
        try{
            lock.lock(); // start the lock
            System.out.println("Lock acquired by - " + Thread.currentThread().getName());
            isAvailable = true;
            Thread.sleep(4000);
        }
        catch(exception ex){

        }
        finally{
            lock.unlock(); // release the lock.
            System.out.println("Lock release by - "+Thread.currentThread().getName());
        }
    }
}

public static void main(String args[]){
    ReentrantLock lock = new ReentrantLock();
    SharedResource resource1 = new SharedResource();
    Thread th1 = new Thread(()->{
        resource1.producer(lock);
    });
    SharedResource resource2 = new SharedResource();
    Thread th2 = new Thread(()->{
        resource2.producer(lock);
        // Different object depends on the same lock.
    });
    th1.start(); // Passing different object.
    th2.start(); // In synchronized we can pass same object. Here we pass different object.
}
```

The output.

```xml
Lock by thread 1.
Release by Thread 1.
Lock by Thread 2.
Release by Thread 2.
```

Shared Lock and Exclusive Lock.

More than one thread can put shared lock in one resource. When one thread put shared lcok in one resource then another one cannot put exclusive lock.
Exclusive lock is only taken when no lock is on the resource.

In shared lock we can only read the resource and with exclusive lock we can also write on the resource.

### ReadWriteLock.

ReadLock - More than 1 thread can acquire the read lock.
WriteLock - Only 1 thread can acquire the write lock.

```java
public class SharedResource{
    boolean isAvailable = false;
    public void producer(ReadWriteLock lock){
        try{
            lock.readLock().lock();
            System.out.println("Read lock acquired by - "+ Thread.currentThread().getName());
            isAvailable = true;
            Thread.sleep(8000);
        }
        catch(Exception ex){

        }
        finally{
            lock.raedLock().unlock();
            System.out.println("Read lock is release by - "+Thread.currentThread().getName());
        }
    }
    public void consume(ReadWriteLock lock){
        try{
            lock.writeLock().lock();
            System.out.println("Write lock acquired by - "+ Thread.currentThread().getName());
            isAvailable = false;
        }
        catch(Exception ex){

        }
        finally{
            lock.writeLock().unlock();
            System.out.println("Write lock release by - "+ Thread.currentThread.getName());
        }
    }
}

public class Main{
    public static void main(String args[]){
        SharedResource resource = new SharedResource();
        ReadWriteLock lock = new ReentrantReadWriteLock();
        // ReadWriteLock is an interface.
        // ReentrantReadWriteLock is an implementation.
        Thread t1 = new Thread(()->{
            resource.producer(lock);
        });
        Thread t2 = new Thread(()->{
            resource.producer(lock);
        });
        // t1 is shared lock and t2 is shared lock.
        // Shared lock can be start with more than one thread.
        SharedResource resource1 = new SharedResource();
        Thread t3 = new Thread(()->{
            resource.consume(lock);
        });
        // Shared lock by t1 and t2 and t3 is exclusive lock. It is not allowed.

        t1.start();
        t2.start();
        t3.start();
    }
}
```

The output.

```xml
Read lock acquired by Thread 0.
Read lock acquired by Thread 1.
Read lock released by Thread 0.
Read lock released by Thread 1.
Write lock acquired by Thread 2.
Write lock released by Thread 2.
```

When the read is much higher than write then we have to use ReadWriteLock.

### Stamped Lock.

Locks of two type - Optimistic and Pessimistic.

Pessimistic is like the shared lock and all.

Optimistic it does not put any locks and say in the tablethere is id, name and version when two thread come and read the id and say the vrsion is 123 then they update the name and version. In the time another thread working together coe an dsee the id and version is not 1 so it donot proceed again start the reading. In optimistic lock we have to share the state or version.

// Code

OPtimistic lock.

There we read the stamp value and validate that when we read and when we will write the row number or version number is same.

// Code.

### Semaphore.

Thread can go and work and it put lock. There is a permit say when it is permit 2 meaning 2 thread can go and work on the method.

It will fix the value say at a time only 5 thread can come.

// Code.

When we are using the lock and not synchronized then there is inter thread communication.

In synchronization there is monitor lock and wait and notify is used.

In custom lock we have await and signal same as wait and notify.

// Code.

### Lock Free Concurrency. Atomic and volatile variable.

Concurrency can be achieved using 2 ways - Lock Based Mechanism and Lock Free Mechanism.

### Lock Based Mechanism.

Synchronized.  
Reentrant.  
Stamped.  
ReadWrite.  
Semaphores.

### Lock Free Mechanism.

CAS Operation (Compare and Swap)

AtomicInteger.  
AtomicBoolean.  
AtomicLong.  
AtomicReference.

### Lock Free Mechanism.

It uses CAS technique.

It is a low level operation. It is atomic.  
All modern processor supports it.

It involves 3 main part.

Memory location - Location where variable is stored.  
Expected Value - Value which should be preseny at the memory. ABA problem is solved using version or timestamp.  
New Value - Value to be written to memory. The current value matches the expected value.

OPtimistic lock is for db and CAS is for CPU.

### Atomic.

It means all or nothing.

```java
class Main{
    public static void main(String args[]){
        SharedResource resource = new SharedResource();
        for(int i=0;i<10;i++){
            resource.increment();
        }
        System.out.println(resource.get());
    }
}

public class SharedResource{
    int counter;
    public void increment(){
        counter++;
    }
    public int get(){
        return counter;
    }
}

public class Main{
    public static void main(String args[]){
        SharedResource resource = new SharedResource();

        Thread t1 = new Thread(()->{
            for(int i=0;i<100;i++){
                resource.increment();
            }
        });

        Thread t2 = new Thread(()->{
            for(int i=0;i<100;i++){
                resource.increment();
            }
        });
        t1.start();
        t2.start();
        try{
            t1.join();
            t2.join();
        }catch(Exception ex){

        }
        System.out.println(resource.get());
    }
}
```

The counter is not atomic so thread will read the same value and the counter value is not correct. In the counter there are 3 steps happening like read the counter value, modify and then update the counter value.

There are two ways to make it synchronous.

Using lock like synchronized.  
Using lock free operation like AtomicInteger.

In synchronized we can put lock in the method synchronized.  
In AtomicInteger.

```java
public class SharedResource{
    AtomicInteger counter = new AtomicInteger(0);
    public void increment(){
        counter.incrementAndGet();
    }
    public int get(){
        return counter.get();
    }
}
```

CPU store the value in L1 cache and every CPU has L1 cache and all L1 cache has combined to store the data in L2 cache and it store in memory.

Say one int x=10, now thread in l1 read x=10 and did x++ and put in L1 cache and now thread t2 from another CPU will read from memory and in memory the value of x is 10.  
The value is not correct.

The solution is to use volatile x=10. It read and write the data in memory. It will not store anything in cache and it will store in memory and read the data memory.

Volatile will show any chnage done by one thread visible to other thread.

Atomic is thread safe. Volatile is not related with thread.

### Thread Pool.

Thread pool is a collection of thread (workers) which are available to perform the submitted tasks.  
Once task completed, orker thread get back to Thread Pool and wait for new task to assigned.  
Means threads can be reused.

### What is the advantage of Thread Pool.

Thread Creation can be saved.  
When each thread created, space is allocated to it (stack, heap, program counter) and this takes time.  
With thread, this can be avoided by reusing the thread.

Overhead of managing thethread lifecycle can be removed.  
Thread has different state like running, witing, terminating and managing thread state includes complexity.  
Thread pool abstract away this management.

Inceased the performance.  
More threads means more Context Switching time, using control over thread creation excess context switching can be avoided.

There are 2 CPU and there are multiple thread, it not separate when there are more thread working it is mainly the context switching.

The framework is in java.util.concurrent package.

Image.
The interface Executor has the method execute()  
ExecutorService has more method like manage(), shutDown().

### ThreadPoolExecutor.

It helps to create a customizable ThreadPool.

Process and Flow of the ThreadPoolExecutor.

Total of 5 task came to the thread pool executor and There are 3 thread inside the pool amoung the 5 task, 3 of the task is assigned to the thread in the thread pool. Task 1 - thread 1, Task 2 - thread 2, Task 3 - thread 3.  
The next 2 task are inside the queue a total of say 5 queue size is given and inside the queue there is task 4 and task 5.

Now another 5 task came to the executor. Queue size 5, task 4 and task 5 is in the queue. Queue will take 3 task from the new task slot.  
Now all the thread are working and queue is full. Now say another 3 task came to the executor.

The task will not be rejected it will first see the max thread size. The min thread size was 3 and the max thread size is 5. There are 2 thread that can work. The task 9 and task 10 are assigned to the thread 4 and thread 5.
The pool is filled and the queue is filled and the max thread is also working.  
Any other task will be rejected.

```java
public ThreadPoolExecutor(
    int corePoolSize,
    int maximumPoolSize,
    long keepAliveTime,
    TimeUnit unit,
    BlockingQueue<Runnable> workQueue,
    ThreadFactory threadFactory,
    RejectedExecutionHandler handler
)
```

**corePoolSize** - Number of threads are initially created and keep in the pool, even if they are idle.  
**allowCoreThreadTimeOut** - If it is set to TRUE(default is FALSE) idle thread kept alive till time specific by KeepAliveTime.  
**keepAliveTime** - Thread which are idle get terminated after this time.  
**maxPoolSize** - Maximum number of thread allowed in a pool. If number of thread are equal to the corePoolSize and queue is also full then new threads are created till its less than maxPoolSize. Excess thread will remain in pool, this pool is not shutdown or if `allowCoreThreadTimeOut` set to true then excess thread get terminated after remain idle for `KeepAliveTime`.  
**TimeUnit** - TimeUnit for the KeepAliveTime millisecond, second, hour.  
**BlockingQueue** - Queue used to hold task, before they got picked by the worker thread.  
|--**BoundedQueue** - Queue with FIXED capacity. `ArrayBlockingQueue`.  
|--**UnboundedQueue** - Queue with No Fixed capacity. `LinkedBlockingQueue`.  
**ThreadFactory** - Factory for creating new thread. `ThreadPoolExecutor` use this to create new thread the factory provide the interface to give custom thread name, thread priority.  
**RejectedExecutionHandler** - Handler for tasks that cannot be accepted by thread pool.  
Generally logging logic can be put for debugging purpose.  
There are few type of hanlders.  
new ThreadPoolExecutor.AbortPolicy - throws RejectedExecutionException  
new ThreadPoolExecutor.CallerRunsPolicy - Executed the rejected task in the caller thread (thread that attempted to sunmit the task)  
new ThreadPoolExecutor.DiscardPolicy - Silently discard the Rejected task without throwing any exception.  
new ThreadPoolExecutor.DiscardOldestPolicy - discard the oldest task in the queue to accomodate new task.

Lifecycle Of ThreadPoolExecutor.

Running - Executor i in running state and submit() method will be used to add new task.

Shutdown - Executor do not accept new tasks, but continue to process existing tasks, once existing taks finished, executor moves to terminate state. Method used shutdown().

Stop (force shutdown) - Executor do not accept new tasks.  
Executor forcefully stops all the tasks which are currently executing.  
And once fully shutdown moves to terminate state.  
Method used shutdownNow()

Terminated - End of life for particular ThreadPoolExecutor.  
isTerminated() method can be used to see if particular thread pool executor is terminated or not.

Example.

MinSize = 2, MaxSize = 4, Queue size = 2, Tasks = 4.

```java
public class Main{
    public static void main(string args[]){
        ThreadPoolExecutor executor = new ThreadPoolexecutor(2,4,10,TimeUnit.MINUTES, new ArrayBlockingQueue<>(2), new CustomThreadFactory(), new CustomRejectHandler());
        // In the threadFactory we can use the Executors.defaultThreadFactory().

        // In the RejectHandler we can put new ThreadPoolExecutor.DiscardOldestPolicy().

        // Task count 4.
        for(int i=0;i<=4;i++){
            executor.submit(()->{
                try{
                    Thread.sleep(5000);
                }catch(Exception ex){

                }
                System.out.println("Task processed by - "+Thread.currentThread().getName());
            });
            // The submit takes the runnable an dwe have to use lambda.
        }
        executor.shutdown();
    }
}

class CustomThreadFactory implements ThreadFactory{
    @Override
    public Thread newThread(Runnable r){
        Thread th = new Thread(r);
        th.setPriority(Thread.NORM_PRIORITY);
        th.setDaemon(false);
        return th;
    }
}

class CustomRejectHandler implements RejectedExecutionHandler{
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor){
        System.out.println("Task Rejected - " + r.toString());
    }
}
```

The output.

```xml
Task processed by - Thread 1.
Task processed by - Thread 0.
Task processed by - Thread 1.
Task processed by - Thread 0.
```

Task 5 and Task 6 will be assigned to new thread.
Task 7 will be rejected.

### Why the core pool size is 2.

It depends on various factor - CPU size (CPU core is 2 and there are total of 100 thread then more context switch will be happening and it is not useful.)  
JVM memory.  
Task Nature - CPU intensive(less thread and cpu is busy in doing the task) or IO intensive (more thread can be assigned).  
Conurrency requirement (want high, medium or low concurrency)  
Memory required to process a request.  
Throughput.

Its better to do and test which value is more efficient.  
Formula for number of thread.  
Max number of thread = Number of CPU core \* (1+(request waiting time/procesing time))

Number of CPU core - 64.  
Request waiting time (IO task)= 50ms.  
Processing time (CPU task)= 100ms.

64 + (1\*50/100) = ~64 approx.

It is only focussing on the task nature, CPU core and throughput.

It does not consider the Memory and the JVM total memory.

JVM = 2GB.  
Heap Space = 1 GB. Code cache space = 128 MB. perThreadSpace = 5MB\*Number of threads(include ThreadStack space) JVM Overhead = 256MB.

Total = 128+1000+256+x = 2000
x = 500mb of thread space.

1 thread say takes 5 MB.
Total thread count = 500/5 = 100 thread.

Per Request requires 10 MB space to fulfill the request.

When there is 100 thread then total memory space = 100\*10 Mb = 1000Mb.

Heap space = 1Gb. entire 1 Gb cannot be used say 600Mb can be used. 60% of heap memory can be used in thread.

So thread count = 60\*10Mb = 600Mb.

So thread can be 60 to 64 (based on request and CPU).

### Future, Callable and CompletableFuture.

In the threadpool executor if the main method wants to know the status of the thread. It is completed or failed.

In the code there is no way to get the status. Main thread will call the thread in async mode and continue.

The submit methos returns future. When calling the submit method we can store in future and get the detials in the future.

### Future.

Interface which represents the result of the async task.

Means it allows to see if computation is complete. Get the result. Take care of exception if any.

```java
public static void main(String args[]){
    ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(1,1,1,TimeUnit.HOURS,new ArrayBlockingQueue<>(10),Executors.defaultThreadFactory(),new ThraedPoolExecutor.AbortPolicy());
    Future<?> futureObj = poolExecutor.submit(()->{
        System.out.println("The task is executed by thread.");
    });
    // Caller can see the status of the thread it is created.
    System.out.println(FutureObj.isDone());
}
```

In Future there are 5 methods.

| Methods in Future Interface | Purpose |
| ---------------- | --- |
|**boolean cancel(boolean mayInterruptIfRunning)**|Attempts to cancel the execution of the task. Returns false, if task can not be cancelled(as task already completed) returns true otherwise.|
|**boolean isCancelled()**|Returns true is the task was cancelled before it gets completed.|
|**boolean isDone()**|Returns true if this task completed. Completion may be due to normal termination an exception or cancellation all of these cases, this method will return true.|
|**V get()**|Wait of required, for the completion of task. The main thread will wait the task will complete then it will continue. After task is completed retrieve the result when available.|
|**V get(long timeout, TimeUnit unit)**| Wait if requiered for at most the given timeout period. Throws `TimeOutException` if timeout period finished and task is not yet completed.|


```java
public static void main(String args[]){
    ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(1,1,1,TimeUnit.HOURS, new ArrayBlockingQueue<>(10), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());

    Future<?> futureObj = poolExecutor.submit(()->{
        try{
            Thread.sleep(7000);
            System.out.println("Task is executed by thread.");
        }catch(Exception ex){

        }
    });

    System.out.println("is done" + futureObj.isDone());
    try{
        futureObj.get(2,TimeUnit.SECONDS);
    }catch(Exception ex){
        System.out.println("TimeOutException.");
    }
    catch(Exception ex){

    }
    try{
        futureObj.get();
    }
    catch(Exception ex){

    }
}
```

futureObj.get(2,TimeUnit.SECONDS) it will wait for 2 sec and see the task is not completed and then it will throw the exception.

futureObj.get() will wait till the task is completed.

submit() can be submit(Runnable), submit(Runnable, T), submit(Callable<?>)

### Callable

Callable represents the task which need to be executed just like
runnable. Difference is Runnable donot have any return type. Callable has the capability to return a value.
### CompletableFuture.

Introduced in Java 8.
Advanced version of Future providing additional capability like chaining.
**CompletableFuture.supplyAsync** - `public static<T> CompletableFuture<T> supplyAsync(Supplier<T> supplier)`  
`public static<T> CompletableFuture<T> applyAsync(Supplier<T> supplier, Executor executor)`

supplyAsync method initiates an Async operation.  
'supplier' is executed asynchronously in a separate thread.  
If we want more control on Threads we can pass Executor in the method.
By default it uses shared Fork-Join Pool executor. It dynamically adjust its pool size based on the processors.

```java
public static void main(String args[]){
    try{

        ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(1,1,1,TimeUnit.HOURS, new ArrayBlockingQueue<>(10), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());

        CompletableFuture<String> asyncTask1 = CompletableFuture.supplyAsyc(()->{
            return "Task completed";
        }, poolExecutor);
        System.out.println(asyncTask1.get());
    }
    catch(Exception ex){

    }
}
```

**thenApply and thenApplyAsync**

Apply a function to the result of previous Async computation.  
Return new CompletableFuture object.
```java

CompletableFuture<String> asyncTask1 = CompletableFuture.supplyAsync(()->{
    return "Java and ";
}, poolExecutor).thenApply((String val) -> {
    return val+"DSA";
});
```
thenApply will execute after teh supplyAsync.

thenApply is a synchronous execution and it uses same thread which completed the previous async task.

thenApplyAsync method is a asynchronous execution. It uses different thread (from 'fork-join' pool, if we donot provide the executor in the method) to complete the function.

If multiple thenApplyAsync is used ordering cannot be guarantee, then will run concurrently.

**thenCompose and thenComposeAsync** - chain together dependent Async operations.

Means when next async operation deends on the result of the previous we can tied them together.
For async tasks, we can bring some ordering using it.

```java
CompletableFuture<String> asyncTask1 = CompletableFuture
.supplyAsync(()->{
    System.out.println("Thread name which run 'supplyAsync'" + Thread.currentThread.getName());
    return "Java and ";
}, poolExecutor)
.thenCompose((String val)->{
    return CompletableFuture.supplyAsync(()->{
        System.out.println("Thread Name which run thenCompose"+ Thread.currentThread.getName());
        return val+"DSA";
    });
});
```
thenCompose - same thread will work. theComposeAsync - new thread.

When there are multiple thenComposeAsync then also the order will be maintained.

**thenAccept and thenAcceptAsync** - Last part in the async operation. It does not return anything.

```java
CompletableFuture<Void> asyncTask1 = CompletableFuture.supplyAsync(()->{
    System.out.println(Thread.currentThread.getName());
    return "Java and ";
},poolExecutor)
.thenAccept((String val)->System.out.println("All steps completed."));
```

**thenCombine and thenCombineAsync** - Used to combine the result of 2 completable future.

```java
CompletableFuture<Integer> asyncTask1 = CompletableFuture.supplyAsunc(()->{return 12},poolExecutor);

CompletableFuture<String> asyncTask2 = CompletableFuture.supplyAsync(()->{return "Java"},poolExecutor);

CompletableFuture<String> combinedFutureObj = asyncTask1.thenCombine(asyncTask2, (Integer val1, String val2) -> val1+val2);
```

### Difference between Future and CompletableFuture.

|Future|CompletableFuture|
|---|---|
|