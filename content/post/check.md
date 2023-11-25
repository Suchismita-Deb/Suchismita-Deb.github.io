+++
title = 'Check'
date = 2023-11-25T17:52:49+05:30
+++

### Table fo Content Addition.

In hugo.toml added `toc = true` at line 6. In the post I also tried adding `toc = true` in the front matter. 

In the single.html file in thr layout added one code after the page title and date in line 24.
```java
  <section>
    <!--      <header>-->
    <!--        <h1>{{ .Title }}</h1>-->
    <!--      </header>-->
    <!--      {{ .Content }}-->
    {{ if .TableOfContents }}
    <aside>
      <h2>Table of Contents</h2>
      {{ .TableOfContents }}
    </aside>
    {{ end }}
  </section>
```