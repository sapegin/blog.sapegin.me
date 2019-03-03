---
layout: Post
title: 'React single page applications resources'
date: 2016-01-14
lang: en
medium: react-and-redux-single-page-applications-resources-22cd859b0c1d
tags:
  - javascript
  - react
  - redux
  - education
---

_October 2017: added more links and possible alternatives._

Here is a list of the best articles, books and talks about the libraries and tools we use at the [Here](https://www.here.com/en) product tools team.

You can start from [a very good introduction](http://reactkungfu.com/2015/07/the-hitchhikers-guide-to-modern-javascript-tooling/) to modern frontend tooling.

## ECMAScript 6

Thanks to [Babel](http://babeljs.io/) we can write in ES6 (official name is ECMAScript 2015).

- [Learn ES6](http://babeljs.io/learn-es2015/).
- [An intro to using npm and ES6 modules for frontend development](http://wesbos.com/javascript-modules/) by Wes Bos.
- <span aria-label="Book" title="Book">📖</span> [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read/) by Nicholas C. Zakas.
- <span aria-label="Book" title="Book">📖</span> [Exploring ES6](http://exploringjs.com/es6/) by Dr. Axel Rauschmayer.

_Consider using [TypeScript](https://www.typescriptlang.org/)._

## React

Our view layer is [React](https://reactjs.org/).

- [React tutorial](https://reactjs.org/tutorial/tutorial.html).
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).
- [ReactJS for beginners](https://blog.andrewray.me/reactjs-for-stupid-people/) by Andrew Ray.
- [Presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov.
- [React tips and best practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html) by Alexander Early.
- [Removing user interface complexity, or why React is awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) by James Long.
- [Structuring React and Redux applications](http://blog.sapegin.me/all/react-structure).
- [React cheat sheet](https://reactcheatsheet.com/).
- <span aria-label="Book" title="Book">📖</span> [SurviveJS: React](https://survivejs.com/react/introduction/) by Juho Vepsäläinen.

## Redux

[Redux](http://redux.js.org/) is an app state container. It means that we store the whole application state (data from server and UI state) in a single immutable tree.

- [A cartoon intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) by Lin Clark.
- [Redux best practices](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e) by Will Becker.
- [Single State Tree + Flux](http://merrickchristensen.com/articles/single-state-tree.html) by Merrick Christensen.
- [Querying a Redux store](https://medium.com/@adamrackis/querying-a-redux-store-37db8c7f3b0f) by Adam Rackis.
- <span aria-label="Course" title="Course">🖥</span> [Getting started with Redux](https://egghead.io/courses/getting-started-with-redux) by Dan Abramov.
- <span aria-label="Course" title="Course">🖥</span> [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) by Dan Abramov.
- <span aria-label="Video" title="Video">📺</span> [Live React: Hot Reloading with Time Travel](https://youtu.be/xsSnOQynTHs) by Dan Abramov, ReactEurope 2015.
- [Redux documentation](http://redux.js.org/).

Redux was inspired by the original Facebook’s [Flux architecture](https://facebook.github.io/flux/):

- [Flux for beginners](https://blog.andrewray.me/flux-for-stupid-people/) by Andrew Ray.
- [The evolution of Flux frameworks](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31) by Dan Abramov.

_After using Redux for a while, I feel that it’s too low level and requires you to write a lot of code. Consider using [MobX](https://mobx.js.org/)._

## Immutable.js

Redux requires that all the data in the store should be immutable. [Immutable.js](https://facebook.github.io/immutable-js/) makes work with immutable data structures easier and (potentially) faster.

- [The React way: Flux architecture with Immutable.js](https://blog.risingstack.com/the-react-js-way-flux-architecture-with-immutable-js/) by Péter Márton.
- [Immutable data structures and JavaScript](http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript) by James Long.
- <span aria-label="Video" title="Video">📺</span> [Immutable data and React](https://youtu.be/I7IdS-PbEgI) by Lee Byron, React Conf 2015.

_After using Immutable for a while, I feel that it makes more problems than it solves. Consider using [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)._

## CSS Modules

CSS modules are like [BEM](http://getbem.com/) but they provide real class names uniqueness. And you don’t need to write long class names manually. We use CSS modules with [Sass](http://sass-lang.com/) and [Autoprefixer](https://github.com/postcss/autoprefixer).

- [CSS Modules: welcome to the future](https://glenmaddern.com/articles/css-modules) by Glen Maddern.
- <span aria-label="Video" title="Video">📺</span> [Interoperable CSS](https://youtu.be/aIyhhHTmsXE) by Glen Maddern, CSSconf EU 2015.

_Consider using CSS in JS library, like [JSS](http://cssinjs.org/) or [Styled Components](https://www.styled-components.com/)._

## Webpack

[Webpack](https://webpack.js.org/) allows us to use ES6/JSX syntax (including ES6 modules), import modules from npm and use hot reloading to debug frontend code. To simplify webpack configuration and share it between projects we use [webpack-blocks](https://github.com/andywer/webpack-blocks).

- 📖 [SurviveJS: webpack](https://survivejs.com/webpack/introduction/) by Juho Vepsäläinen.

_Consider using [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap your app._

## Testing

To test React components we use [Jest](https://facebook.github.io/jest/) (a test runner) and [Enzyme](http://airbnb.io/enzyme/) (a testing utility for React).

- [Approaches to testing React components — an overview](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/) by Marcin Grzywaczewski.
- [Testing React components with Jest and Enzyme](http://blog.sapegin.me/all/react-jest).
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet).

## Other useful libraries

Unfortunately, I haven’t found any good articles about these libraries.

- [React Router](https://github.com/ReactTraining/react-router), client-side routing.
- [React Intl](https://github.com/yahoo/react-intl), internationalization for React.
- [Reselect](https://github.com/reactjs/reselect), memoized and composable selectors for Redux.
- [React components I recommend](https://github.com/sapegin/react-components)

## Developer tools

These tools are as useful as all the resources mentioned above.

- [React Styleguidist](https://react-styleguidist.js.org/), isolated component development environment and a living style guide.
- React hot loader (now [React Transform](https://github.com/gaearon/react-transform-boilerplate)).
- [Redux DevTools](https://github.com/gaearon/redux-devtools).
- [React plugin for ESLint](https://github.com/yannickcr/eslint-plugin-react), React specific linting rules.
- [React Developer Tools](https://github.com/facebook/react-devtools) for Chrome and Firefox.

We also use [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) to run linters on precommit hook.

---

Let me know if I’ve missed something, I highly appreciate any additions to this list.
