---
layout: Post
title: 'On discoverability of JavaScript packages'
date: 2016-03-14
lang: en
medium: javascript-packages-fatigue-md-c6be26f016b1
tags:
  - javascript
  - thoughts
  - grumbles
  - tools
  - build
  - npm
---

I really like the idea of extracting tiny tasks to separate libraries like [David Clark suggests](http://davidtheclark.com/modular-approach-to-interface-components/) or like [master of one-line modules](https://github.com/sindresorhus/ama/issues/10) [Sindre Sorhus do](https://www.npmjs.com/~sindresorhus).

But as user of these small libraries I always struggle with finding the right packages:

1. [npm has almost 250 000 packages](https://www.npmjs.com/) and most of them are bad: no tests, no license, no docs, readme in Chinese, even no code sometimes.
2. Many packages do the same thing and even have almost identical code.
3. Many packages were abandoned: no updates, author doesn’t use them either.
4. People still publish their packages on Bower only.
5. Sometimes it’s hard to understand what to search: what the right thing to outsource is and what could possibly have been done before.

Juho Vepsäläinen has [a list of npm search tools](http://www.nixtu.info/2016/02/discovery-and-quality-services-for-npm.html) but they don’t solve the problem.

This is still an unsolved question for me and I hope we’ll see more sophisticated search tools that will consider many parameters to rank search results: npm installs in the last month, GitHub stars, latest release date, opened issues, test coverage, etc.

[JS.coach](https://js.coach/) is very close to that but they only have modules for React, webpack, Babel, etc.

And I believe it will decrease the number of almost identical libraries because authors will be able to easily find what’s already available.

**Update.** Looks like the search problem is pretty much solved by the new [npms.io](https://npms.io/). It’s really awesome!
