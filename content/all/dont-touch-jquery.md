---
layout: Post
title: 'Don’t touch jQuery'
date: 2016-02-12
lang: en
medium: don-t-touch-jquery-12c928c79f19
tags:
  - javascript
  - thoughts
  - grumbles
  - jquery
---

Most of 2015 frontend developers spent arguing about the best Flux implementation and whether we need jQuery or not.

Leave jQuery alone. Rewriting your project not to use jQuery won’t solve any real problem.

There are only two valid reasons to tear out jQuery from existing project:

1. You are bored. Absolutely valid reason but if you’re bored at work you’d better spend your time updating your CV.
2. You are making a library. jQuery is not a default-library-for-every-project anymore so avoiding it in your library will increase the number of potential users.

Other case is starting a new project. _Maybe_ it’s the right time not to use jQuery. For example there’s no need for it if you’re using React.
