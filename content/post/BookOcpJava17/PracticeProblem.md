+++
title = 'Practice Problem'
date = 2023-11-27T19:28:39+05:30
+++



### Sample Question
```java
public class A1 {
    public static void addToInt(int x, int amountToAdd) {
        x = x + amountToAdd;
    }

    public static void main(String[] args) {
        var a = 15;
        var b = 10;
        A1.addToInt(a,b);
        System.out.println(a);
    }
}
```
The output of the code.
- [ ] 15
- [ ] 25

> The method is getting the value and not the reference so the value of the varaiable will not change.