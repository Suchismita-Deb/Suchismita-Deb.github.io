+++
title = 'Learning'
date = 2023-12-22T21:30:38+05:30
+++



### Leetcode Learnings.

### Find digits of the number.
When we need digits of a number we
- Using while loop and get digits. Store in array for other use.
- Converting the num to string and get the digit.

### User input.
```java
Scanner scn = new Scanner(System.in);
int n = scn.nextInt();
String str = scn.next();
```

### Individual element from the string.
```java
Char ch = str.charAt(0);
```

### ASCII value of the character.
```java
int chAscii = (int) ch;// cch is the char.
System.out.println(chAscii);// Ascii value of the character.
```

> The ascii value of A - 65 to Z - 90 and a - 97 to z - 122.

### Converting a char to int.
```java
Character ch = "1";
System.out.println(Character.getNumericValue(ch));
// The output is 1.
```

### Converting int to char
```java
char c1 = (char)chAscii; 
```

```java
int REDIX =10;
char c2 = Character.forDigit(n11,REDIX);
System.out.println(c2);
```

- For printing two char as a string we cannot just add them. We need to convert the char to string then concat.
- When it is not adding then convert to string.

### Converting string to char.
```java
String s = String.valueOf(ch);
```

### Converting String to character array.
```java
String s = "aAAaAAbBBNn";
char[] ch = s.toCharArray();
for(char c:ch){
    System.out.print(c);
}
```
### Printitng arrays in Java.
```java
int nums[] = {1,0,1,0,1,0,1,1,1,0,1};
System.out.print(Arrays.toString(nums));
```
### Matrix problem
Say max 2X1 box can be obtained from MXN matrix. Example - 3X3 matrix then we can get 4 box. 2X4 matrix we will get 4 box.
- Think of formula obtained from m and n.
- In this case (m*n)/2.

### Check between two string ignoring the cases.
```java
String s = "Yes";
// s="YES" or anything. If the string is yes then it will print the line.
if(s.equalsIgnoreCase("Yes")){
     System.out.println("YES");
}
```

Naresh Matrix - Matrix - Playlist.
### String Hashset
Putting character in the string in the set.
```java
String s = "aAAaAAbBBNn";
HashSet<Character> hset = new HashSet<>();
for(char c : s.toCharArray()){
    hset.add(c);
}
for(char c:hset){
    System.out.print(c);
}
```
The output is `aAbBNn`.

### Making ListofList
```java
List<List<String>> listOfLists = new ArrayList<>();
```
**Adding elements**
```java
List<List<String>> listOfLists = new ArrayList<>();
listOfLists.add(Arrays.asList("Hello","World"));
System.out.println(listOfLists);
```
Other way
```java
listOfLists.add(Arrays.asList("Hello","World"));
```

### Checking for 3 consecutive odd.
```java
for(int i=0;i<nums.length-2;i++){
    if(nums[i]%2!=0 && nums[i+1]%2!=0 && nums[i+2]%2!=0){
        System.out.println("true");
    }
}

//Other way.
int count=0;
for(int i=0;i<nums.length;i++){
    if(nums[i]%2==0){count=0;
}
else{
    count++;
    if(count==3){
        System.out.println("true");
    }
}
```

we can also write in one line.
```java
else if(++count==3)return true;
```

### Matrix Print.
```java
int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
for(int i=0;i<matrix.length;i++){
    for(int j=0;j<matrix[i].length;j++){
        System.out.print(matrix[i][j]);
    }
    System.out.println();
}
```
Copyting the matrix.
```java
int[][] m1 = matrix;
```