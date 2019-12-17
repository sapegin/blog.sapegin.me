---
layout: Post
title: 'Testing React Intl components with Jest and Enzyme'
date: 2017-11-17
lang: en
medium: testing-react-intl-components-with-jest-and-enzyme-f9d43d9c923e
tags:
  - tools
  - javascript
  - jest
  - enzyme
  - react
  - testing
  - i18n
---

There are two problems with testing components that use [React Intl](https://github.com/yahoo/react-intl) with [Enzyme](https://github.com/airbnb/enzyme) and [Jest](https://facebook.github.io/jest/):

1. `injectIntl` higher-order component will break shallow rendering because it will render a wrapper component instead of your component.
2. An `intl` prop will make snapshot testing useless because each snapshot will contain all your messages.

The solution is based on [React Intl’s wiki](https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl):

1. Add two new helper functions to your Jest setup file ([setupFiles](http://facebook.github.io/jest/docs/en/tutorial-react-native.html#setupfiles)):

```js
import { IntlProvider, intlShape } from 'react-intl';

// Create IntlProvider to retrieve React Intl context
const intlProvider = new IntlProvider(
  {
    locale: 'en',
    messages: {
      message1: 'Hello world'
    }
  },
  {}
);
const { intl } = intlProvider.getChildContext();

// intl prop is required when using injectIntl HOC
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

// shallow() with React Intl context
global.shallowWithIntl = (node, { context, ...options } = {}) => {
  return shallow(nodeWithIntlProp(node), {
    ...options,
    context: {
      ...context,
      intl
    }
  });
};

// mount() with React Intl context
global.mountWithIntl = (
  node,
  { context, childContextTypes, ...options } = {}
) => {
  return mount(nodeWithIntlProp(node), {
    ...options,
    context: {
      ...context,
      intl
    },
    childContextTypes: {
      intl: intlShape,
      ...childContextTypes
    }
  });
};
```

2. Export your component with and without `injectIntl`:

```js
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

export class Pony extends Component {
  /* _ */
}

export default injectIntl(Pony);
```

3. Write test cases almost as usual, using the `shallowWithIntl` and `mountWithIntl` helpers:

```jsx
import React from 'react';
import { Pony } from './Pony';

test('pink pony', () => {
  const wrapper = shallowWithIntl(<Pony color="pink" />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.tail').prop('value')).toBe('pink');
});
```

P. S. You may also enjoy my more generic article on [testing React components with Jest and Enzyme](http://blog.sapegin.me/all/react-jest) and [Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet).
