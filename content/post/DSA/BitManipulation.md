+++
title = 'Bit Manipulation'
date = 2024-12-20T18:08:41+05:30

url= "/post/dsa/bitManipulation"
tags=['dsa']
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

### See the ith bit is set or not.

n=13 i=2  
(1101) = true.  
`1<<i`  
1101 & 0100 != 0 means true.  
`n>>i` Right shift.  
n=0011 then we can do & with 1.

### Set the ith bit.

`1<<i`
`n|1<<i`

## Swap 2 Number.

Using XOR.

a = a^b
b = a^b
(a=a^b b=(a^b)^b)
a = a^b
(b=a, a=a^b a=(a^b)^a)

a = 5, b = 3
a = a+b = 8
b = a-b = 8-3 = 5
a = a-b = 8-5 = 3

### Clear the ith bit.

`n&(~(1<<i))`
1101 and clear the bit = 1001
1101 & 1011 = When there is 1 then the value present going to be same when we do & with 1.

`1<<i` i=3 and val=0100
I want 1011.
~val not on the val.

## Extract the ith Bit.

## Get the ith bit.

## Toggle the ith bit.

`n^(1<<i)`

1101 and when there is 1 set to 0 and when 0 set to 1.
Xor with 1 1101 ^ 0100 = 1001

## Remove the last set bit.

n=16 10000
n=15 01111

n=84 1010100
n=83 1010011

When we have a number and when we do the n-1 then till the rightmost set bit all are same the rightmost set bit become 0 and all in the right is 1.

84 (1010)1(00)
83 (1010)0(11)
Rightmost set bit is 0 and all in the irght is 1.

To remove the rightmost set bit `n&(n-1)`
1010100 & 1010011
1010000

15 n = 01111
14 n-1 = 01110

## Check if power of 2.

One set bit then power of 2.
When we have 16 10000 and 15 01111
When we do n&(n-1) ==0 then there is only one 1 in the answer.

10000 & 01111 = 00000

## Count the number of set bit.

2|13 1
2|6 0
2|3 1
|1

When we got the val as 1 then we can stop.

```java
while(n>1){
    if(n%2!=0) {
        counter++;
    }
    n/=2;
}
if(n==1) counter++;
```

```java
n>>1;
counter += n&1;
```

(low+high)/2 = (low+high)>>1

We can keep on removing the last set bit.

```java
while(n!=0){
    n=n&(n-1);
    counter++;
}
```
