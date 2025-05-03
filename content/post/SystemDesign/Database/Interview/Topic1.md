+++
title = 'Topic 1 SQL Practice'
date = 2024-12-30T14:10:44+05:30

url= "/post/systemdesign/database/interview/topic"
tags = ['interviewQuestion', 'database']
+++
SQL Interview.

### Order of execution in SQL.

FROM - WHERE - GROUP BY - HAVING - SELECT - ORDER BY - LIMIT.

| Clause   | Function                                   |
|----------| ------------------------------------------ |
| FROM     | Choose ad join table to get the base data. |
| WHERE    | Filter the base data.                      |
| GROUP BY | Aggregate the base data.                   |
| HAVING   | Filters the aggregated data.               |
| SELECT   | Returns the final data.                    |
| ORDER BY | Sort the final data.                       |
| LIMIT    | Limit the returned data to a row count.    |

SELECT category, AVG(sales) AS avg_sales FROM SalesData WHERE year>2020 GROUP BY category HAVING COUNT(\*)>10 ORDER BY avg_sales DESC LIMIT 3;

| Category    | Avg_sales |
| ----------- | --------- |
| Electronics | 128       |
| Utensils    | 91        |
| Books       | 89        |

First it will take the FROM then condition and group and condition and order.

### Find monthly sales and sort in desc order.

| Order_date | Sales |
| ---------- | ----- |
| 2021-01-01 | 20    |
| 2021-01-02 | 32    |
| 2021-02-08 | 45    |
| 2021-02-04 | 31    |
| 2021-03-21 | 33    |
| 2021-04-06 | 19    |
| 2021-04-07 | 21    |
| 2021-04-22 | 10    |

Output

| Years | Months | TotalSales |
| ----- | ------ | ---------- |
| 2021  | Feb    | 76         |
| 2021  | Jan    | 52         |
| 2021  | Mar    | 52         |
| 2021  | Apr    | 31         |

SELECT YEAR(Order_date) AS Years, MONTH(Order_date) AS Months, SUM(Sales) AS TotalSales FROM Products GROUP BY YEAR(Order_date), MONTH(Order_date) ORDER BY TotalSales DESC;

### Find the candidate who is proficient in Python, SQL, PowerBi. Write the query to list the candidate who possess all of the required skills for the job. Sort the output by candidate Id in asc order.

| Candidate_id | Skills  |
| ------------ | ------- |
| 101          | PowerBi |
| 101          | Python  |
| 101          | SQL     |
| 102          | SQL     |
| 108          | Python  |
| 108          | PowerBi |
| 108          | SQL     |

Output

| Candidate_id | Skill_count |
| ------------ | ----------- |
| 101          | 3           |
| 108          | 3           |

SELECT Candidate_id, COUNT(skills) FROM Applications WHERE skills IN ("Python","SQL","Power Bi") GROUP BY(Candidate_id) HAVING COUNT(skills)=3 ORDER BY (Candidate_id) ASC;

### What is a Trigger in SQL.

### Normalization.

### What is Truncate, Delete, Drop statement.

### What are rank, dense_rank and row_number.

### What are clustered and non clustered index in SQL.