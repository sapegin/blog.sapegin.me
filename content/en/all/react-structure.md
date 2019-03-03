---
layout: Post
title: 'Structuring React and Redux applications'
date: 2016-06-17
lang: en
medium: structuring-react-and-redux-applications-255361d24f84
tags:
  - javascript
  - react
  - redux
---

There’s no idiomatic way to structure Redux applications yet. And I believe there’s no The Only True Project Structure but I’ll describe what works for me.

## General structure

There are two approaches for grouping files:

- By type: one folder for components, one for reducers, one for actions, etc.
- By feature: all files related to one feature are inside the same folder.

I started from grouping by type. It works for a small application but to add a new feature you have to create: `reducers/myfeature.js`, `selectors/myfeature.js`, `components/MyFeature.js` and a few more. It’s annoying and difficult to explain to new team members.

Now I group files by view or page: `dashboard`, `users`, etc.

Here are main folders I have in my application:

- `app`: Redux store configuration and root reducer, React Router routes, application root components with connections to Redux, Redux DevTools, React Router and React Intl.
- `components`: shared components.
- `models`: Immutable.js records.
- `util`: any shared non-React JavaScript code.
- `features`.

<!--more-->

Feature folders look like this:

```bash
features/
  feature-name/
    components/
      FeatureNameView.jsx
      FeatureNameLayout.jsx
      *.jsx
    duck.js
  very-big-feature/
    feature1/
    feature2/
```

- I follow [the Ducks convention](https://github.com/erikras/ducks-modular-redux) so instead of separate files for actions, reducers and constants there are single `duck` file. I also put Reselect selectors into the duck file as `selector` named export.
- The `components` folder contains all React components that are unique to this view.
- `FeatureNameView` is connected to Redux and contains all action calls. Nested components receive handlers as props and don’t know anything about Redux. All page layout goes to `FeatureNameLayout` component.

## Components

For simple applications I like the simplest structure:

```bash
feature-one/
  Component1.js
  Component2.js
  Component2.css
```

It works fine until you add more styles and other non-JavaScript files to your components. In this case I’d put every component into a separate folder:

```bash
feature-one/
  Component1
    index.js
    Component1.js
    Component1.css
    Component1.spec.js
```

File names are still contain component class names so you can open them using a fuzzy search in your editor. I also have an extra entry file in every component folder, `index.js`:

```javascript
export { default } from './Component1';
```

It allows you to import components like this: `components/Component1` instead of `components/Component1/Component1`.

## Ducks and selectors

Each feature has its own duck file `duck.js` structured as follows:

```javascript
import { combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';

const DO_SOMETHING_COOL = 'myapp/feature-name/DO_SOMETHING_COOL';

// Actions

export function doSomethingCool(what) {
  return {
    type: DO_SOMETHING_COOL
    // ...
  };
}

// Reducers

function cookiesReducer(state, action) {
  switch (action.type) {
    case DO_SOMETHING_COOL:
      return {
        /*_*/
      };
    default:
      return {
        /*_*/
      };
  }
}

export default combineReducers({
  cookies: cookiesReducer
  // ...
});

// Selectors

const isFetching = state => state.isFetching;
const cookies = state => state.data.cookies;

export const selector = createStructuredSelector({
  isFetching,
  cookies
});
```

Then import it at the root reducer, `app/reducers.js`:

```javascript
import { combineReducers } from 'redux';
import featureName from '../features/feature-name/duck';

export default combineReducers({
  featureName
  // ...
});
```

I use selectors as the only way to access Redux state in components. So I connect selectors and actions to feature’s root component, `FeatureNameView.jsx`:

```jsx
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';
import FeatureNameLayout from './FeatureNameLayout';

@connect(
  state => duck.selector(state.featureName),
  dispatch => ({
    actions: bindActionCreators(duck, dispatch)
  })
)
export default class FeatureNameView extends Component {
  /*
  Here you have:
  - this.props.actions.doSomethingCool
  - this.props.isFetching
  - this.props.cookies
  */

  handleSomethingCool(what) {
    this.props.actions.doSomethingCool(what);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        {isFetching ? (
          <span>Loading...</span>
        ) : (
          <FeatureNameLayout
            {...this.props}
            onSomethingCool={what => this.handleSomethingCool(what)}
          />
        )}
      </div>
    );
  }
}
```

## Development and production versions

In a few places I have separate files for development and production builds: `containers/Root` and `store/configureStore`, for example. I think they are easier to use then a single file with a bunch of `if`s.

For example, `configureStore.development.js` and `configureStore.production.js` are completely independent modules and `configureStore.js` chooses which one to use:

```javascript
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.production');
} else {
  module.exports = require('./configureStore.development');
}
```

It allows you to do `import configureStore from './store/configureStore` and have the right version of the module depending on the current environment.

## Other approaches

- [Structuring React Projects](https://survivejs.com/webpack_react/structuring_react_projects/), a chapter from SurviveJS book.
- [A Better File Structure For React/Redux Applications](https://marmelab.com/blog/2015/12/17/react-directory-structure.html)
- [Organizing Large React Applications](http://engineering.kapost.com/2016/01/organizing-large-react-applications/)
- [How to better organize your React applications](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1#.sbykc54ta)
