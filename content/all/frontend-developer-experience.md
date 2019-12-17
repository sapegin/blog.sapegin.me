---
layout: Post
title: 'Importance of the developer experience in the modern frontend'
date: 2015-11-21
lang: en
medium: importance-of-the-developer-experience-in-the-modern-front-end-bff4155d4cb8
tags:
  - thoughts
  - oss
---

In the past frontend developer could spend years mastering the same set of tools. Now we don’t have this luxury. We have to adapt to constantly changing ecosystem. We’ve replaced Grunt with Gulp, JSHint with ESLint, Bower with npm and everything with React.

It requires us to develop new skills:

- monitor new tools and techniques;
- quickly decide what to learn and what to use;
- debug frameworks and libraries.

Only last month gave us [Babel 6](http://babeljs.io/blog/2015/10/29/6.0.0), [React Router 1.0](https://github.com/ReactTraining/react-router/releases/tag/v1.0.0) and [React 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html) (a bit earlier) as well as betas of [React Intl 2.0](https://github.com/yahoo/react-intl/releases/tag/v2.0.0-beta-1) and [Webpack 2](https://github.com/webpack/webpack/pull/861). All with breaking changes.

It makes developer experience much more important than ever. In the past few months I spent many hours debugging strange issues with webpack, Babel and other libraries. I believe that we can do better.

## What we, as tools developers, can do

### Improve documentation quality

- More examples.
- Get started guide for beginners.
- Starter kits and boilerplates.

Good: [Redux](http://redux.js.org/). Documentation that worth publishing as a book, a huge number of [starter kits](https://github.com/xgrommx/awesome-redux#boilerplate) and [example applications](https://github.com/xgrommx/awesome-redux#react---a-javascript-library-for-building-user-interfaces) by the community.

Bad: [Immutable.js](https://facebook.github.io/immutable-js/docs/), [Webpack](http://webpack.github.io/docs/). Almost never helps.

### Describe breaking changes and how to upgrade

Good: [Rackt](https://github.com/rackt) projects like [React Router](https://github.com/ReactTraining/react-router/releases/tag/v1.0.0) or [Redux](https://github.com/reactjs/redux/releases/tag/v2.0.0). Detailed descriptions of breaking changes and upgrade instructions.

Bad: [almost](https://github.com/sindresorhus/gulp-imagemin) [any](https://github.com/floatdrop/gulp-plumber) [Gulp](https://github.com/contra/gulp-concat) [plugin](https://github.com/robrich/gulp-if). No change logs at all.

### Improve error handling

Good: React. Lots of checks and meaningful warnings in the development mode. Elm. [They are trying](http://elm-lang.org/blog/compilers-as-assistants) to be really useful.

Bad: almost everything else.

### Follow semver

Use [semantic versioning](http://semver.org/) to notify users about breaking changes. They shouldn’t be afraid that updating to a new patch or minor version breaks their code.
