---
layout: Post
lang: en
title: 'GitHub vs. Dropbox. Why “versus”?'
date: 2014-04-30
tags:
  - tools
  - thoughts
  - github
---

People wonder when I tell them that I store all my code at Dropbox. They wonder more when I tell them that I store all my Git repositories in Dropbox too. They explain to me that it’s wrong and I’ll definitely have problems.

Easy: there’s always some unfinished code that isn’t ready for committing.

I can write such code for a few weeks on different computers even if there are only dozen of lines of code. Dropbox perfectly syncs that code between my computers.

I push all my code to GitHub or Bitbucket so it’s not a big deal if Dropbox blows up my `.git` folder. And few “conflicts” could be [easily](https://coderwall.com/p/tzjorw/get-rid-of-dropbox-conflicted-copies) [fixed](https://github.com/sapegin/dotfiles/blob/master/bin/cleandropbox).

There are two more reasons:

1. Previous versions recovery. Finished code could be overwritten just before committing and that happened to me. Dropbox saved me.
2. Repository is a part of a project like, for example, PSD mockups. It’s convenient to store everything in one place. And for me this place is Dropbox.
