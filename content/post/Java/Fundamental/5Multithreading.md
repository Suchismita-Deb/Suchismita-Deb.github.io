+++
title = 'Multithreading'
date = 2024-12-19T09:47:59+05:30

url= "/post/java/fundamental/Multithreading"
tags = ['interviewQuestion', 'java']
+++

Java Collection Framework.

Introduced in Java 1.2

Collections are group of object. It is present in java.util pacakge.
Framework provides the architecture to manage the "group of objects" that is add, update, delete, search.

### Multithreading and Concurrency.

Introduction to Multithreading.
Java Memory Model of Process and Thread.

### What is Thread and Process.

In process we have thread.

Process is an instance of a program that is getting executed.

There is one program.

```java
public class Test{
    public static void main(String[] args){
        System.out.println("Hello");
    }
}
```

Compile the class. `javac Test.java` - It will generate the bytecode that can be executed by JVM.

The byte code need to execute.
Execution. `java Test` - JVM starts the new Process., here the Test is the class that has the main method.
Process says it is an instance of a program that is getting executed.

It has its own resource like memory, thread. OS allocates these resources to process when its created.

When one process is created it creates its own heap memory.

When we execute a program a process is created and own heap memory is created and two process donot connect with each other.


Thread is known as lightweight process. It is called as the smallest sequence of instruction that are executed vy CPU independently.

One process can have multiple thread. When a process is created it starts with one thread and that initial thread known as "main thread" and from that we can create multiple threads to perform task concurrently.

```java
public class Multithreading{
    public static void main(String args[]){
        System.out.println("Thread name - " + Thread.currentThread().getName());
    }
}
```

Output - Thread name - main.

JVM has - heap, stack, core segment, data segment, register, program counter.

Heap and stack are the only part were we need th garbage collector.

### How Java execute the program.

When a new program execute a new JVM instance is created.
New JVM has its own heap memory and how much memory allocated to the process can be adjusted by the command.
`java -Xms256m -Xmx2g MainClassName`

-Xms<size> - It will set the initial heap size here it is set to 256MB.

-Xmx<size> - it is max heap size process can get, it is set to 2GB, if tries to allocate more memory then "OutOfMemoryError" will occur.

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

The counter points to the address in th code segment where the thread start the execution.
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

### Multithreading.

Allows a program to perform multiple task at the same time.
Multiple threads share the same resource such as memory space but still can perform task independently.
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

Runable is a functional interface. The thread class implements runnable and it has all teh methods like creation of thread, run(), sleep(), start(), stop(), interrupt().

### Implementing runnable.

Implement the Runanble Interface.

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

It is not a thread. It is a class implementing Runnable.

Now we have to invoke a thread to call the run method.

Create an instance of the class that implements Runnable. Pass the runnable object to the thread contructor. Start the thread.

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
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NEW**           | Thread has been created but not started. Its just an object in memory.                                                                                                                                                                                         |
| **Runnable**      | Thread is ready to run. Waiting for CPU time.                                                                                                                                                                                                                  |
| **Running**       | What thread start executing its code.                                                                                                                                                                                                                          |
| **Blocked**       | Different scenarios where runnale thread goes into the Blocking state - I/O blocking like readinf from a file or databse. -Lok acquired - If thread want to lock on a resource which is locked by other thread,it has to wait. Releases all the MONITOR LOCKS. |
| **Waiting**       | Thread goes into this state when we cal the wait() method, makes it non runnable. It goes back to runnable, once we call notify() or notifyAll() method. Releases all the MONITOR LOCKS>                                                                       |
| **Timed Waiting** | Thread waits for specific period of time and comes back to runnable state, after specific conditions met like sleep(), join(). Do not release any MONITOR LOCKS.                                                                                               |
| **Terminate**     | Life of the thread is completed, it cannot be started back again.                                                                                                                                                                                              |

In the runnable time it put the MONITOR LOCK.

### Monitor Lock.

It helps to make sure that nly 1 thread goes inside the particular section of code(a synchronous block or method).

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