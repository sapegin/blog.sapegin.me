---
layout: Post
title: 'Add the fucking change log'
date: 2016-09-19
lang: en
medium: add-the-fucking-change-log-3d82d758d8b0
tags:
  - tools
  - thoughts
  - grumbles
  - oss
---

Every time I upgrade my project’s dependencies using [npm-upgrade](https://github.com/th0r/npm-upgrade) and it cannot find a change log I create an issue titled “Add change log”. Most of them were ignored, sometimes maintainers answer something that means “fuck off”, very rarely they listen.

![Running npm-upgrade in terminal](/images/npm-upgrade.png)

A good change log answers these questions for the project’s user:

- What’s the new value for my project in the new version?
- What are the breaking changes?
- How can I migrate my codebase to the new version?
- Were my issues fixed?

A change log is a tool that helps you decide to upgrade or not and to evaluate the benefits and the cost of the upgrade.

A good change log is:

- Written for humans, not computers.
- Understandable by users, not just contributors.
- Not a Git commit log.
- Written by a project maintainer — don’t ask for a pull request.

You should read this [awesome guide](http://keepachangelog.com/) and add a change log to your open source project today.
