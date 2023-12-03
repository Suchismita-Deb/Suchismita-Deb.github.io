+++
title = 'Introduction to Multithreading.'
date = 2023-12-03T15:52:06+05:30
+++



There are two ways to define Thread - 
- By extending Thread class.
- By implementing Runnable Interface.

Other important topic.
- Thread Priorities.
- Methods to prevent thread execution.
  - yield()
  - join()
  - sleep()
- **Synchronization**
- InterThread Communication. 
  - Notify()
  - NotifyAll()
- Deadlock.
- Daemon Thread.
- Multithreading Enhancement.

### Multitasking.
Executing multiple tasks simultaneously.
Example Classroom student is always multitasking.
- Listening to the class.
- Taking notes.
- Checking phones.

Other works simultaneously.

Multitasking can be divided in two categories.
  - **Process Based Multitasking**.
    - Executing several task simultaneously where each task is a separate independent process. 
    - Example - Coding and listening to music from same system and downloading file from internet. Process Based multitasking is the best suitable for OS level not in programming level.
    - In this example there are 3 independent process.
  - **Thread Based Multitasking**.
    - Executing several task simultaneously where each task is a separate independent task of the same program.
    - Example - One program with 5000 lines of code and takes 10 hours to execute. First part and second part is independent to each other. They can run simultaneously. Now when first part and second part running simultaneously the program takes 6 hours to execute.
    - In this example there is only one program and two independent paths are there.
    - Each independent part is called Thread.

