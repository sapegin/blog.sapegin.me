---
layout: Post
lang: en
title: 'WordPress → Aegea → DocPad'
date: 2013-04-30
tags:
  - tools
  - blog
  - docpad
---

Recently I’ve remade this blog for the third time.

The first version was made on WordPress in 2008. I used my homepage’s design and was just experimenting with blogging.

In 2012 I became tired of WordPress’s inconvenience to write about coding. You have to use HTML to markup simple text and inserting code examples is even harder.

So I tried [Aegea](http://blogengine.ru/). Aegea has the best blog UI. You can’t imagine better engine if you just want to write and don’t want to think about geeky stuff.

But in 2013 I became tired again. Aegea wasn’t the best engine for coder’s blog. Strange archaic wiki-like text formatting. The same dances with tambourine to add code example. And I became terribly jealous of people who stored their blogs’ content on GitHub in Markdown files and received pull requests with useful fixes.

So I spent few days to replace Aegea for [DocPad](http://docpad.org/). It was much simpler than I thought and I like the result very much. DocPad is a static site generator. And it’s much more flexible than WordPress and Aegea.

Now I can write text using the simplest format available (Markdown) in the best text editor ([iA Writer](https://ia.net/writer/)). Then share drafts on [Draft](https://draftin.com/). Then copy file to local blog repository, add simple YAML header (title, tags, etc.), commit it, push to GitHub and deploy to server (using [Fabric](http://www.fabfile.org/)).

## Good parts

- Markdown everywhere.
- The simplest code examples posting.
- “Read more” (was impossible in Aegea).
- Single repository for both English and Russian languages.
- All content can be edited [on GitHub](https://github.com/sapegin/blog.sapegin.me) or [prose.io](http://prose.io/#sapegin/blog.sapegin.me).
- Static HTML: extremely fast, can be hosted everywhere.
- Very easy to change layout or content (compared to WordPress and Aegea).
- It works exactly as I want.

P. S. Read the [source](https://github.com/sapegin/blog.sapegin.me), Luke!
