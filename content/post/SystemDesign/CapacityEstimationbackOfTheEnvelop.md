+++
title = 'Capacity Estimation Back Of The Envelop'
date = 2024-02-13T19:59:08+05:30
tags=['system design']
categories = ['low level design','system design']
+++

|Metric System|Value|
|---|---|
|1 Million|${10^6}$|
|1 Billion|${10^9}$|
|1 Trillion|$10^{12}$|

---

| Data Storage Unit | Value       | Byte       |
|-------------------|-------------|------------|
| 1 KB              | $10^{3}$ B  | $10^{3}B$  |
| 1 MB              | $10^{3}$ KB | $10^{6}B$  |
| 1 GB              | $10^{3}$ MB | $10^{9}B$  |
| 1 TB              | $10^{3}$ GB | $10^{12}B$ |
| 1 PB(PetaByte)    | $10^{3}$ TB | $10^{15}B$ |
| 1 EB              | $10^{3}$ PB | $10^{18}B$ |
| 1 ZB              | $10^{3}$ EB | $10^{21}B$ |
| 1 YB              | $10^{3}$ ZB | $10^{24}B$ |

---

| Two Power | Value |
|-----------|-------|
| $2^{0}$   | 1     |
| $2^{1}$   | 2     |
| $2^{2}$   | 4     |
| $2^{3}$   | 8     |
| $2^{4}$   | 32    |
| $2^{5}$   | 64    |
| $2^{6}$   | 128   |
| $2^{7}$   | 256   |
| $2^{8}$   | 512   |
| $2^{9}$   | 1024  |
| $2^{10}$  | 2048  |

**Generally for a large scale system we count as 1 Million request per day.**

$10^{12}$

1 Million/day = 

[//]: # ($\frac{10^{6}}{24hrs*60min*60sec}$)
≈ 11.57 ≈ 12Bytes/sec.

##### Storage Estimation/Bandwidth Estimation - Incoming(Ingress) Outgoing(Egress)

### People in world = 8 billion.
### People in India = 1.4 billion.

> DAU Daily Active User.
> 
> MAU Monthly Active User.

## Capacity Estimation Example.
### Whatsapp.
DAU ≈ 2B ≈ 100B message every day.

Average message size ≈ 100 Bytes.

1 day of message = 100 * $10^{9)$ * 100 Bytes ≈ $10^{13}$ ≈ 10TB

- 100B = 100 * `$10^{9)$` B  

5 years of message = 10TB * 365 * 5 ≈ 20PB.

1 day of message ≈ 10TB.

Bandwidth Estimation = 10TB/day 
```
10Tb/day ≈ 10 * `$10^{6}$` * `$10^{6}$` B/day 
         ≈ 10 * `$10^{6}$` * 12 B/sec
         ≈ 120 MB/sec.
```

10TB ≈ `$10^{12}$`B.
`$10^{6}$` B/day = 1Million/day ≈ 12/sec.

#### Twitter.
DAU ≈ 200M.
Read:Write ≈ 150M:100M

Storage Estimation.
- 140 char per tweet.
- 2 bytes to store char.
- 20 Bytes to store the metadata(ID, UserId, timestamp).
Total Storage for a single tweet = (140 char * 2 Bytes) + 20 Bytes metadata = 280 Bytes ≈ 300Bytes.

Write Estimates.
Daily 100M tweet.
100M * 300Bytes = 3 * `$10^{10}$` B/day ≈ 30GB/day.


> Every 5th tweet has a image ≈ 200 kb.
> Every 10th tweet has a video ≈ 2MB/video.

Total space = `$\frac{100M tweets}{5}&`*200kb +  `$\frac{100 M tweets}{10}$` * 2MB

= ((20M*200KB) + (10M*2MB)) /day 

= (20 * `$10^6$` * 200 * `$10^{3}$`) + (10 * `$10^{6}$` *2 * `$10^{6}$`) B/day
= (4 * `$10^{12}$`) + (20 * `$10^{12}$`) B/day
= (4TB + 20TB) /day
= 24 TB/day. (Ingress Incoming Bandwidth)
= 24 * `$10^{6}$` MB/day (1TB = $10^{6}$)
= `$\frac{24 * `$10^{6}$`}{`$10^{5}$`}$` MB/sec
≈ 300 Mb/sec.

Read Estimates.
DAU = 200M.
Each people see 150 tweets.

Total size of a simple tweet = 200M * 150 tweets * 300 Bytes = 30 * `$10^{3}$` * `$10^{6}$` * 300 = 9TB/day = 9 * `$10^{6}$` MB/day = 9 * `$10^{6}$` * 12 Bytes/sec = 100 MB/sec.

Every 5th tweet contains image. `$200M*150$` tweets are read daily.
Total size of the tweets contains image = `$\frac{200*150}{5}$` *200KB/day = (6000M * 200KB)/day = 12 * `$10^{5}$` * `$10^{6}$` KB/day = 1.2 TB/day.

Every 10th tweet contains image. `$200M*150$` tweets are read daily.
Total size of the tweets contains image = `$\frac{200*150}{10}$` *2MB/day = (3000M * 2MB)/day = 6 * `$10^{3}$` * `$10^{6}$` * `$10^{3}$` KB/day = 6 * `$10^{12}$` KB/day  6TB/day.


All the pics and video and text are egress requests.

