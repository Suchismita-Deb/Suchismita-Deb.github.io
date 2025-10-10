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

`<h2 style="text-align: center;">Your Heading Here</h2>` Not showing properly.

Inorder to make new line and not new paragraph.

We need to write the line then two space then hit enter and the next line. It will create new line.

### Adding image with caption.

{{< figure src="/images/SystemDesign/HLD/2PhaseCommit.png" caption="2 Phase Commit. Prepare Phase. Commit Phase." >}}

### Making code in the table.

| Format      | Example Code |
|------------|-------------|
| Inline Code | `System.out.println("Hello, World!");` |
| Block Code | {{< highlight java >}} public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } } {{< /highlight >}} |


### Making a caption in the image.
```md
{{<figure src="/images/Spring/Kafka/ConfluentKafka/TopicsProducerAndConsumer.png" alt="Subset" caption="Subset tree execution">}}
```
In the layout html page there mentioned one page figure.html.
```html
<figure class="centered-figure">
    <img src="{{ .Get "src" }}" alt="{{ .Get "alt" }}">
    <figcaption>{{ .Get "caption" }}</figcaption>
</figure>
```


Adding the border around the image.
Manual make an online image.

Another way to chnage the figure.html and add a bordered-img class.
```css
.bordered-img {
  border: 3px solid black;
  border-radius: 8px;
  padding: 4px;
  max-width: 100%;
  height: auto;
}
```

In hugo paper theme when delete any page there will be a public folder created with the html in the build then delete the public folder. It will again create the public folder based on the current file.

PaperMod Theme to get the fuzzy search details.
https://github.com/adityatelange/hugo-PaperMod?tab=readme-ov-file

https://adityatelange.github.io/hugo-PaperMod/


### Adding some changes in the paper theme.

Say the changes are not picking up and update working in local but not in blog.   
It can happen when the changes are taken from the cache and not from the project. In that case the github/workflow yaml file there are new group.

```yaml
# Allow one concurrent deployment
concurrency:
  group: "pages-v1" # Change it any any different name.
  cancel-in-progress: true
```
