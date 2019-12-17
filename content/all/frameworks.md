---
layout: Post
lang: en
title: 'Making frameworks, bootstraps and other developer’s friends'
date: 2013-04-18
tags:
  - tools
  - thoughts
---

Long time ago I started every new project like this: copied the most similar project, renamed it, removed all superfluous stuff…

It caused copypaste arficats: similar code multiplied in different projects; it was hard to remember in which project was the most recent version; code, that could be shared, mixed with project specific code; and what’s more, starting a new project wasn’t so easy.

Now I try to detach all code shared between few projects to separate repos: that’s how my Stylus framework [Tâmia](https://github.com/tamiadev/tamia) and [grunt-init templates](https://github.com/sapegin/squirrelstrap) were born. (Not to mention all my Grunt plugins, but it’s a story for another post.)

For my making custom tools is a way to reduce code duplication, speed up development and increase product quality. Improving framework you improve all sites that use it at the same time.

I share all my tools [on GitHub](https://github.com/sapegin). Open projects help me to keep good code quality and, if I’m lucky, get few nice pull requests.
