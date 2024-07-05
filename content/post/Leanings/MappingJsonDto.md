+++
title = 'MappingJsonDto'
date = 2024-06-22T05:47:56+05:30
tags = ['work']
categories = ['Json',"DTO"]
+++

Say I am getting the response like array of object.
```json
"resultsComment": [
        {
            "text":null,
            "detail":""
        }
]
```


In the DTO we are mapping like @JsonProperty(Ignore.NON_NULL) and we are not getting any value and an empty object. 
```json
"resultsComment": [
        {}
]
```
In the case we had to make a new DTO as we cannot change the existing code and then in the DTO we put @JsonProperty(Ignore.NON_EMPTY)

Either we should give empty array or value with null and empty string.
