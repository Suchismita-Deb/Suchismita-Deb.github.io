+++
title = 'Interview Google 1'
date = 2025-07-10T11:30:58+05:30

url= "/post/interviewExperience/Google/Interview1"
tags = ['Interview Experience','Google']
categories = ['Interview Experience','Google']
+++


### SDE 1. Aug 20, 2025.
Link.  
https://leetcode.com/discuss/post/7101066/google-interview-experience-trie-questio-6d7r/   
https://leetcode.com/discuss/post/7102706/google-interview-experience-median-range-bdso/
Round 1.
The question was about hierarchical strings (think domains/paths) with values, where each entry contributes to itself + all its ancestors, and we had to compute the total for every leaf.

The neat way to do this is with a Trie (insert reversed parts and then sum while traversing)

Round 2.  
The question was to design 2 APIs/functions for insert into a data stream and return any number between the nearest powers of 2 of the current median

I started with a multiset + iterator to the median approach.

But then the interviewer reminded me it’s an infinite stream, so O(N) space won’t work.

Then I thought in terms of ranges instead of storing elements. I wrote down buckets like [2^0,2^1], [2^1,2^2], …, [2^63,2^64] and realized I could just maintain the bucket index of the median. Took me a bit of struggle, but with hints from the interviewer, I came up with an O(1) space solution. Finally coded it up.