---
layout: Post
title: 'Why I wrote another static site generator'
date: 2016-05-26
lang: en
medium: why-i-wrote-another-static-site-generator-47274c7bdf23
tags:
  - tools
  - blog
  - projects
---

For many years I was struggling every time I was using a someone else’s engine to build one of my sites. I’ve tried [WordPress](https://wordpress.com/), [Koken](http://koken.me/), [Aegea](http://blogengine.ru/), [Django](https://www.djangoproject.com/), [DocPad](http://docpad.org/) and [Hexo](https://hexo.io/). Now all my personal sites (this blog, [homepage](http://sapegin.me/) and [photo portfolio](http://morning.photos/)) work on my own static site generator — [Fledermaus](https://github.com/sapegin/fledermaus) — and I’ve never been more happy.

It’s not my first engine:

- fjSiter, 2002: PHP, MySQL, XSLT based content management system.
- Custom PHP based generator for my photo gallery, 2008.
- Sweet, 2011: Node based static site generator.
- Springhare: Python based gallery engine, unfinished (the project was too big for one developer with limited time).
- Others that I don’t remember.

Experience with other engines has taught me how an engine shouldn’t be implemented.

Usual site engine is a massive piece of code that’s optimized for a few the most popular use cases. But if you want something else you have to suffer: it’s either too hard or not possible at all. Often you end up with an ugly unstable code that breaks after every engine update.

It’s like in Joe Armstrong’s [famous saying](https://www.johndcook.com/blog/2011/07/19/you-wanted-banana/) about object-oriented programming:

> You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.

But in that case the banana is half-eaten.

With the Fledermaus I took a different approach. Actually it’s just a collection of useful functions that you can use to write your own static site generator: loading Markdown source files, documents filtering, grouping and sorting, pagination, internationalization, generating HTML pages and RSS, etc.

You can combine them any way you want, add custom processing at any step, generate pages yourself. For example, in my photo gallery I read EXIF meta data from JPEG files and generate [pages](http://morning.photos/albums/dogs/2013-08-03-3733) and [albums](http://morning.photos/albums/dogs) based on this data.

It’s based on fancy modern things like ES6, JSX, Markdown and Intl.

And it’s very small and fast:

**Engine code**<br/>Docpad: 10300 lines (without 6 required plugins)<br/>Hexo: 7800 lines (without 2 required plugins)<br/>Fledermaus: 1300 lines

**Blog code**<br/>Docpad: 211 lines<br/>Hexo: 361 lines<br/>Fledermaus: 159 lines

**Build time**<br/>Docpad: 77,49s (version 6.78.4)<br/>Hexo: 4,60s (version 3.1.1)<br/>Fledermaus: 3,80s (version 5.0.1, including Babel transpilation)

It builds my whole photo gallery (2000 HTML pages) in 35 seconds on my 2011 MacBook Pro.

Now I finally can build stuff instead of crutches.
