+++
title = 'MarkDown'
date = 2024-02-13T20:01:13+05:30
tags=["blog"]
+++



# Some important markdown formulas.

```java
|Table Content|Value|
|:---|:---|
|Title 1|1|
|Title 2|2|
```

|Table Content|Value|
|:---|:---|
|Title 1|1|
|Title 2|2|

:-- means the column is left aligned.

--: means the column is right aligned.

:-: means the column is center aligned.

---

```${\sqrt{3x-1}+(1+x)^2}$```

Equation is written in this form ${\sqrt{3x-1}+(1+x)^2}$

```$\frac{(3+4)}{(2*{10^8})}$```

$\frac{(3+4)}{(2*{10^8})}$

```${10^8}$```

${10^8}$

```${10^12}$```

${10^12}$

```$10^{12}$```
$10^{12}$

Making new posts in blog `hugo new post/SystemDesign/HLD/Kafka/MessagingQueue.md`
Adding image in the file `![img_1.png](/images/intellije/image1.png)`

Making the `<>` `<xyz>` bracket visible. When we arite anything in the <> then it is not visible.

One way to do it correctly `List &lt;Flight&gt; flight;` for `List <Flight> flight;`

```
Use &lt; for <
Use &gt; for >
```

When I want to change the line height between two lines in a same paragraph then we should use the line-height.
```css
p {
    line-height: 1.5 !important; /* Adjust line spacing */
}
```
When we want to change about the height between two paragraph then we should use the margin.
```css
p {
    margin: 7px 0 !important; /* Adjust vertical spacing */
}
```

In the paper theme the change in the name of the file is not showing the page. By default the url is set from the file name we can set that manually.
In the front matter we have to set the url `url= "/post/java/interviewquestion/topic3/"` The file name can be anything the url will be picked from here.


Making a text centered.

`<h2 style="text-align: center;">Your Heading Here</h2>`