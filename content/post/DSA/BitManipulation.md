+++
title = 'BitManipulation'
date = 2024-12-20T18:08:41+05:30


+++

### Number of set bits.

```java
public static void main(String[] args){
    int x = 4;
    int setBit =0;
    while(x!=0){
        setBit += x&1;
        // 1&1 is only one.
        x>>=1;
        // Moving the number to the right and checking the least bit one by one.
    }
    System.out.println(setBit);
}
```

Double .valueOf(“l. 23”), Boolean. valueOf(true), Integer .parseInt(“42”),Float.toString(-l. 23).

Double. compare (x, 1.23) == 8 rather than x == 1.23