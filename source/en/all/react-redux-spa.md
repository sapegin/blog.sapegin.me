---
layout: Post
title: 'React and Redux Single Page Applications Resources'
date: Jan 14, 2016
lang: en
medium: react-and-redux-single-page-applications-resources-22cd859b0c1d
tags:
  - javascript
---

Here is a list of the best articles, books and talks about the libraries and tools we use at the [Here](https://company.here.com/) product tools team.

You can start from [a very good introduction](http://reactkungfu.com/2015/07/the-hitchhikers-guide-to-modern-javascript-tooling/) to modern front-end tooling.

## ECMAScript 6

Thanks to [Babel](http://babeljs.io/) we can write in ES6 (official name is ECMAScript 2015).

* [Learn ES2015](http://babeljs.io/docs/learn-es2015/).
* [An intro to using npm and ES6 modules for front end development](http://wesbos.com/javascript-modules/) by Wes Bos.
* 📖 [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read/) by Nicholas C. Zakas.
* 📖 [Exploring ES6](http://exploringjs.com/es6/) by Dr. Axel Rauschmayer.

## React

Our view layer is [React](https://facebook.github.io/react/).

* [React tutorial](https://facebook.github.io/react/docs/tutorial.html).
* [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html).
* [ReactJS for stupid people](http://blog.andrewray.me/reactjs-for-stupid-people/) by Andrew Ray.
* [Smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov.
* [React tips and best practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html) by Alexander Early.
* [Removing user interface complexity, or why React is awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) by James Long.
* [React cheat sheet](http://reactcheatsheet.com/).

## Redux

[Redux](https://github.com/rackt/redux) is an app state container. It means that we store the whole application state (data from server and UI state) in a single immutable tree.

* [A cartoon intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) by Lin Clark.
* [Redux best practices](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e) by Will Becker.
* [Single State Tree + Flux](http://merrickchristensen.com/articles/single-state-tree.html) by Merrick Christensen.
* [Querying a Redux store](https://medium.com/@adamrackis/querying-a-redux-store-37db8c7f3b0f) by Adam Rackis.
* 🖥 [Getting started with Redux](https://egghead.io/series/getting-started-with-redux) by Dan Abramov.
* 📺 [Live React: Hot Reloading with Time Travel](https://youtu.be/xsSnOQynTHs) by Dan Abramov, ReactEurope 2015.
* [Redux documentation](http://redux.js.org/).

Redux was inspired by the original Facebook’s [Flux architecture](https://facebook.github.io/flux/):

* [Flux for stupid people](http://blog.andrewray.me/flux-for-stupid-people/) by Andrew Ray.
* [The evolution of Flux frameworks](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31) by Dan Abramov.

## Immutable.js

Redux requires that all the data in the store should be immutable. [Immutable.js](https://facebook.github.io/immutable-js/) makes work with immutable data structures easier and (potentially) faster.

* [The React.js way: Flux architecture with Immutable.js](https://blog.risingstack.com/the-react-js-way-flux-architecture-with-immutable-js/) by Péter Márton.
* [Immutable data structures and JavaScript](http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript) by James Long.
* 📺 [Immutable data and React](https://youtu.be/I7IdS-PbEgI) by Lee Byron, React.js Conf 2015.

## CSS Modules

CSS modules are like [BEM](http://getbem.com/) but they provide real class names uniqueness. And you don’t need to write long class names manually. We use CSS modules with [Sass](http://sass-lang.com/) and [Autoprefixer](https://github.com/postcss/autoprefixer).

* [CSS Modules: welcome to the future](http://glenmaddern.com/articles/css-modules) by Glen Maddern.
* 📺 [Interoperable CSS](https://youtu.be/aIyhhHTmsXE) by Glen Maddern, CSSconf EU 2015.

## Webpack

[Webpack](http://webpack.github.io/) allows us to use ES6/JSX syntax (including ES6 modules), import modules from npm and use hot reloading to debug front-end code.

* [A cookbook for using Webpack with React JS](https://christianalfoni.github.io/react-webpack-cookbook/) by Christian Alfoni and Juho Vepsäläinen.
* 📖 [SurviveJS: Webpack and React](http://survivejs.com/webpack_react/introduction/) by Juho Vepsäläinen.

## Testing

To test React components we use [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and React’s [shallow rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering).

* [Approaches to testing React components — an overview](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/) by Marcin Grzywaczewski.

And a couple of libraries to make work with shallow rendering easier:

* [react-shallow-testutils](https://github.com/sheepsteak/react-shallow-testutils), replacement for TestUtils when using React’s shallow rendering.
* [expect-react-shallow](https://github.com/sapegin/expect-react-shallow), JSX assertions with Chai-like API.

## Other Useful Libraries

Unfortunately, I haven’t found any good articles about these libraries.

* [React Router](https://github.com/rackt/react-router), client-side routing.
* [redux-simple-router](https://github.com/rackt/redux-simple-router), simple bindings to keep React Router and Redux in sync.
* [React Intl](http://formatjs.io/react/), internationalization for React.
* [Reselect](https://github.com/rackt/reselect), memoized and composable selectors for Redux.

## Developer Tools

These tools are as useful as all the resources mentioned above.

* React hot loader (now [React Transform](https://github.com/gaearon/react-transform-boilerplate)).
* [Redux DevTools](https://github.com/gaearon/redux-devtools).
* [React plugin for ESLint](https://github.com/yannickcr/eslint-plugin-react), React specific linting rules.
* [React Developer Tools](https://github.com/facebook/react-devtools) for Chrome and Firefox.

***

Let me know if I’ve missed something, I highly appreciate any additions to this list.

P. S. Check out my latest open source project: [React Styleguidist](https://github.com/sapegin/react-styleguidist), a component style guide generator with a hot reload dev server.
