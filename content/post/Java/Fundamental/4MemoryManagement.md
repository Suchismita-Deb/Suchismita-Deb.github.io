+++
title = 'Memory Management in Java'
date = 2024-12-22T09:33:26+05:30

url= "/post/java/fundamental/memoryManagement"
tags = ['interviewQuestion', 'java']
+++
Memory management in Java involves the allocation,use, and de allocation of memory resources during the runtime of an application. Java provides an automated memory management system through Garbage Collection (GC), which frees developers from manually managing memory reducing memory leaks and errors like invalid memory access.

Java divides memory into two main regions: Heap and Stack. These areas are further subdivided to optimize storage and retrieval of data.

### Heap Memory.

**Purpose** - Used for storing objects and JRE classes.

**Characteristics** - Global and shared across threads. Managed by the Garbage Collector.

It is divided into parts.

**Young Generation** - Stores newly created objects. It is further divided into Eden Space and Survivor Space.  
**Eden Space** - All new objects are created here.  
**Survivor Spaces (S0 and S1)** - Holds objects that survive GC cycles in the Eden space.  
**Old Generation (Tenured)** - Stores long-lived objects that survive multiple GC cycles.  
**Metaspace (Java 8+)** - Replaces PermGen and holds metadata about classes and methods.
```xmlHeap Memory
├── Young Generation
│   ├── Eden Space
│   ├── Survivor Space (S0)
│   └── Survivor Space (S1)
├── Old Generation
└── Metaspace
```

### Stack Memory.

**Purpose** - Used for method execution and local variables.  
**Characteristics** -
Thread-specific (not shared).
Stores primitive variables, method call stack, and references to objects in the heap.
Follows the LIFO (Last In, First Out) principle.
Automatically freed when a method finishes execution.

### Memory Management Workflow.

Main part is Object Creation, Garbage Collection and Memory Deallocation.

Object Creation.  
Objects are allocated memory in the heap (Eden space).   
Variables pointing to objects are stored in the stack.

Garbage Collection.  
Removes unused objects to free heap memory.  
Process involves - Identifying reachable objects via reference chains (roots). Collecting unreferenced objects.  
Types of Garbage Collectors -   
Serial GC - Suitable for single-threaded environments.  
Parallel GC - Uses multiple threads for GC. Good for throughput.

Memory Deallocation.  
Stack memory is automatically cleared when methods exit.  
Heap memory is managed by the GC, which periodically removes unused objects.


### Key Concepts.
**References**  
Java uses references to manage object lifecycles.  
Strong Reference - Prevents an object from being garbage-collected.  
Weak Reference - Does not prevent GC, useful for caches.  
Soft Reference - GC collects only if memory is low.  
Phantom Reference -  Used for cleanup actions after GC.

**OutOfMemoryError**.  
Occurs when - Heap memory is exhausted. Stack memory overflows (e.g., recursive calls).

```java
public class MemoryManagementExample {
    public static void main(String[] args) {
        // Stack memory allocation for local variables
        int localVariable = 10;

        // Heap memory allocation for objects
        MemoryManagementExample example = new MemoryManagementExample();
        
        // Object eligible for GC
        example = null;

        // Force garbage collection (not guaranteed)
        System.gc();
    }

    @Override
    protected void finalize() throws Throwable {
        // Custom cleanup logic
        System.out.println("Object finalized and garbage collected");
    }
}
```