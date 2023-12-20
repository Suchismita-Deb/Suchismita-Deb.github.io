+++
title = 'Bit Manipulation'
date = 2023-12-09T13:57:05+05:30
+++



We store and use the short, int, long datatype for the numbers. There is no binary datatype. We print binary number by `Integer.toBinaryString(5)` and we represent binary number in a variable like `int num = 0b111`. This will give the binary number.

The binary representation of negative numbers is done by *2's complement*. 
**2's complement - Invert the binary number + 1**

- Int 5 = 101
- Reverse is 010
- Adding 1 = 011
- So -5 = 011

Numbers are represented in 32 bits size and negative number has 1 in the most significant place and rest all places are also 1. 

For positive number rest all numbers are 0.

> Shortcut for the 2s complement is Flip all the bits after the First 1 from LSB (rightmost Setbit), Go Left to Right

### Finding the LSB value.
```java
int num = 0b10101;
int x = num&1;
System.out.println(x);
```
The output is 1.

### Flip/unset the Right most Set bit.
```java
int n = 0b110010101;
System.out.println(n&(n-1));//404 This will be in integer form. 
// We need to convert to binary form.
System.out.println(Integer.toBinaryString(n&(n-1)));//1.
```
### Isolates/Extract the rightmost 1-bit of n and sets all other bits to 0.
```java
int n = 0b110010101000;
System.out.println(Integer.toBinaryString(n&~(n-1)));// 1000
```

### Set the nth bit.
```java
int n = 10;// Binary representation is 1010.
int setBit = 2;// Set the 2nd bit to 1. Index starts from 0 from the lsb. The output should be 1110.
int res = n|(1<<setBit);// (1<<setBit) is placing 1 in the setbit place.
System.out.println(Integer.toBinaryString(res));// 1110. Res is 14.
```

### XOR.
```java
int n = 10;
System.out.println(n^(~n));
```