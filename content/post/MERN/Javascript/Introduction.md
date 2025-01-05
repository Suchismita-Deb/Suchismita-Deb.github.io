+++
title = 'Introduction'
date = 2024-01-27T18:58:15+05:30

tags=['MERN']
+++


Everything in Javascript happens in **Execution Context**.
- It has 2 component - Memory Component (Variable Environment) and Code Component (Thread of Execution).
- Memory Component where we store the _variable_ and the _function_ in a _key value pair_.
- In Code Component the code are executed one at a time.
### Javascript is a synchronous single threaded language.
Javascript can execute one command at a time in a sequence manner.

```javascript
var n=2;
function square(n){
    // n is the parameter.
    return n*n;
}
var square2 = square(n);// n is the argument.
var square4 = square(4);
```
- First a global execution context. Inside the memory component first it will store the memory for the variable and function.
- For the variable the memory first stored as `undefined` and for the function it stored the entire function.
- For the square2 and square4 the value undefined will be stored.
- Second part is the `Code Execution`. Now the value of the n will be stored.
- For the `var square2 = square(n);` the function is invoke. For the function an entire new execution context is started inside the global execution context. For this execution context again there will be memory and code execution. Here the memory will be allocated to the variables and functions inside this function. If a funtion calls another function then another execution context will be started.
- Now the return value will be stored in the var square2. After the return statement the execution context for the function will be deleted.

*Every function will create a execution context. So it creates a `callstack` where the global execution context is at the bottom and all the other execution context will be on the top.* 
- CallStack can also be called as Program Stack, Runtime Stack, Control Stack, Machine Stack.

### Hoisting in Javascript.
```json
var x = 3;
function getName(){
    console.log("This is Javascript.")
}
getName();
console.log(x);
```
Output is `This is Javascript. 3`
