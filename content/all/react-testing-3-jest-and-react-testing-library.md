---
layout: Post
title: 'Modern React testing, part 3: Jest and React Testing Library'
description: 'You’ll learn how to test React components with Jest and React Testing Library and how to apply the best practices we’ve learned in the first article.'
date: 2019-08-19
lang: en
tags:
  - tools
  - react
  - testing
  - testing-series
---

React Testing Library is a small library to test React components, that makes applying best practices, we’ve learned in the first article, easy.

**This is the third article in a series**, where we learn how to test React component with Jest and React Testing Library.

- [Modern React testing: best practices](/all/react-testing-1-best-practices/)
- [Modern React testing: Jest and Enzyme](/all/react-testing-2-jest-and-enzyme/)
- **Modern React testing: Jest and React Testing Library (_this post_)**

## Getting started with Jest and React Testing Library

We’ll set up and use these tools:

- [Jest](https://jestjs.io/), a test runner;
- [React Testing Library](https://testing-library.com/react), a testing utility for React;

### Why Jest and React Testing Library

**Jest** has many benefits over other test runners:

- Very fast.
- Interactive watch mode that only runs tests which are relevant to your changes.
- Helpful failure messages.
- Simple configuration, or even zero configuration.
- Mocks and spies.
- Coverage reports.
- [Rich matchers API](https://github.com/sapegin/jest-cheat-sheet#matchers).

**React Testing Library** has some benefits over Enzyme:

- Much simpler API.
- Convenient queries (form label, image alt, ARIA role).
- Async queries and utilities.
- Better error messages.
- Easier setup.
- [Recommended by React team](https://reactjs.org/docs/test-utils.html#overview).

React Testing Library helps you write good tests and makes writing bad test hard.

Some of the cons could be:

- If you disagree with some of the best practices in this articles, Enzyme may be a better choice for you, since its API isn’t opinionated.
- React Testing Library is a new tool: it’s less mature and the community is smaller than Enzyme.

### Setting up Jest and React Testing Library

First, install all the dependencies including peer dependencies:

```bash
npm install --save-dev jest @testing-library/react node-fetch
```

You’ll also need [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) for Babel and [ts-jest](https://github.com/kulshekhar/ts-jest) for TypeScript. If you’re using webpack, make sure to enable ECMAScript modules transformation for the `test` environment.

Create a `src/setupTests.js` file to customize the Jest environment:

```js
// If you're using the fetch API
import fetch from 'node-fetch';
global.fetch = fetch;
```

Then update your `package.json` like this:

```json
{
  "name": "pizza",
  "version": "1.0.0",
  "dependencies": {
    "react": "16.9.0",
    "react-dom": "16.9.0"
  },
  "devDependencies": {
    "@testing-library/react": "^9.1.3",
    "jest": "24.9.0",
    "node-fetch": "2.6.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
  }
}
```

The `setupFilesAfterEnv` option tells Jest about our setup file, that we’ve created at the previous step.

### Creating our first test

The best location for a test is close to the source code. For example, if you have a component at `src/components/Button.js`, a test for this component could be at `src/components/__tests__/Button.spec.js`. Jest will find and run this test automatically.

So, let’s create out first test:

```jsx
import React from 'react';
import { render } from '@testing-library/react';

test('hello world', () => {
  const { getByText } = render(<p>Hello Jest!</p>);
  expect(getByText('Hello Jest!')).toBeTruthy();
});
```

Here we’re rendering a paragraph of text using the React Testing Library’s [render()](https://testing-library.com/docs/react-testing-library/api#render) method, then testing that a paragraph containing “Hello Jest!” was rendered using React Testing Library’s [getByText()](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) method and Jest’s `toBeTruthy()` assert.

### Running tests

Run `npm test` (or `npm t`) to run all tests. You’ll see something like this:

![Running Jest and React Testing Library tests in the terminal](/images/jest-react-testing-library.png)

Run `npm run test:watch` to run Jest in watch mode: Jest will run only tests that are related to files changed since the last commit, and Jest will rerun these test any time you change the code. This is how I usually run Jest. Watch mode is fast enough even in large projects, where running all tests takes many minutes.

Run `npm run test:coverage` to run all tests and generate coverage report. You can find it in the `coverage` folder.

### Snapshot testing

Jest snapshots work like this: you tell Jest that you want to be sure that output of this component should never change accidentally and Jest saves your component output, called snapshot, to a file:

```js
exports[`test should render a label 1`] = `
<label
  className="isBlock">
  Hello Jest!
</label>
`;
```

Every time you, or someone in your team, change your markup Jest will show a diff and ask to update a snapshot if the change was intended.

You can use snapshots to store any values: React tree, strings, numbers, object, etc.

Snapshot testing sounds like a good idea, but has [several problems](https://blog.sapegin.me/all/snapshot-tests/):

- easy to commit snapshots with bugs;
- failures are hard to understand;
- a small change can lead to hundreds of failed snapshots;
- we tend to update snapshots without thinking;
- coupling with low-level modules;
- test intentions are hard to understand;
- they give a false sense of security.

Avoid snapshot testing unless you’re testing very short output with clear intent, like class names or error messages, or when you _really_ want to verify that the output is the same.

If you use snapshots keep them short and prefer `toMatchInlineSnapshot()` over `toMatchSnapshot()`.

For example, instead of snapshotting the whole component output:

```jsx
test('shows out of cheese error message', () => {
  const { container } = render(<Pizza />);
  expect(container.firstChild).toMatchSnapshot();
});
```

Only snapshot a part you’re testing:

```jsx
test('shows out of cheese error message', () => {
  const { getByRole } = render(<Pizza />);
  const error = getByRole('alert').textContent;
  expect(error).toMatchInlineSnapshot(`Error: Out of cheese!`);
});
```

### Selecting DOM elements for tests

Generally your tests should resemble how your users interact with your app. That means you should avoid relying on implementation details, because they can change and you’ll need to update your tests.

Let’s compare different methods of selecting DOM elements:

| Selector | Recommended | Notes |
| --- | --- | --- |
| `button`, `Button` | Never | Worst: too generic |
| `.btn.btn-large` | Never | Bad: coupled to styles |
| `#main` | Never | Bad: avoid IDs in general |
| `[data-testid="cookButton"]` | Sometimes | Okay: not visible to the user, but not an implementation detail, use when better options aren’t available |
| `[alt="Chuck Norris"]`, `[role="banner"]` | Often | Good: still not visible to users, but already part of the app UI |
| `[children="Cook pizza!"]`  | Always | Best: visible to the user part of the app UI |

To summarise:

- Text content may change and you’ll need to update your tests. This may not be a problem if your translation library only render string IDs in tests, or if you want your test to work with the actual text users see in the app.
- Test IDs clutter your markup with props you only need in tests. Test IDs are also something that users of your app don’t see: if you remove a label from a button, a test with test ID will still pass. You may want to set up something to remove them from the markup you send to your users.

React Testing Library has methods for all good queries. There are [six variants of query methods](https://testing-library.com/docs/dom-testing-library/api-queries#variants):

- `getBy*()` returns the first matching element and throws when an element not found or more than one element found;
- `queryBy*()` returns the first matching element but doesn’t throw;
- `findBy*()` returns a promise that resolves with a matching element, or rejects when an element not found after a default timeout or more than one element found;
- `getAllBy*()`, `queryAllBy*()`, `findAllBy*()`: same as above but return all found elements, not just the first one.

And [the queries](https://testing-library.com/docs/dom-testing-library/api-queries#queries) are:

- `getByLabelText()` finds a form element by its `<label>`;
- `getByPlaceholderText()` finds a form element by its placeholder text;
- `getByText()` finds an element by its text content;
- `getByAltText()` finds an image by its alt text;
- `getByTitle()` finds an element by its `title` attribute;
- `getByDisplayValue()` finds a form element by its value;
- `getByRole()` finds an element by its ARIA role;
- `getByTestId()` finds an element by its test ID.

All queries are available in all variants. For example, besides `getByLabelText()` there are also `queryByLabelText()`, `getAllByLabelText()`, `queryAllByLabelText()`, `findByLabelText()` and `findAllByLabelText()`.

Let’s see how to use query methods. To select this button in a test:

```jsx
<button data-testid="cookButton">Cook pizza!</button>
```

We can either query it by its text content:

```jsx
const { getByText } = render(<Pizza />);
getByText(/cook pizza!/i);
```

Note that I’m using a regular expression (`/cook pizza!/i`) instead of a string literal (`’Cook pizza!’`) to make queries more resilient to small tweaks and changes in the content.

Or query it by the test ID:

```jsx
const { getByTestId } = render(<Pizza />);
getByTestId('cookButton');
```

Both are valid, and both have their own downsides:

- After all insignificant content changes you’ll need to update your tests. This may not be a problem if your translation library only render string IDs in tests, so then they stay the same even after changing the text, as long as the overall meaning is the same.
- Test IDs clutter your markup with props you only need in tests. You may want to set up something to remove them from the markup you send to your users.

There’s no single perfect method of selecting elements in tests, but some methods are better than some others.

## Testing React components

Check out all the examples [on CodeSandbox](https://codesandbox.io/s/github/sapegin/rtl-article-2019). Unfortunately, CodeSandbox doesn’t fully support Jest and some tests fail there, unless you clone [the GitHub repository](https://github.com/sapegin/rtl-article-2019) and run tests locally.

### Testing rendering

This kind of test can be useful when your component has several variations and you want to test that a certain prop renders the correct variation.

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import Pizza from '../Pizza';

test('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  const { getByText } = render(<Pizza ingredients={ingredients} />);

  ingredients.forEach(ingredient => {
    expect(getByText(ingredient)).toBeTruthy();
  });
});
```

Here we’re testing that our `Pizza` component renders all ingredients passed to a component as a prop.

### Testing user interaction

To simulate an event like `click` or `change`, use `fireEvent.*()` methods and then test the output:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpandCollapse from '../ExpandCollapse';

test('button expands and collapses the content', () => {
  const children = 'Hello world';
  const { getByText, queryByText } = render(
    <ExpandCollapse excerpt="Information about dogs">
      {children}
    </ExpandCollapse>
  );

  expect(queryByText(children)).not.toBeTruthy();

  fireEvent.click(getByText(/expand/i));

  expect(queryByText(children)).toBeTruthy();

  fireEvent.click(getByText(/collapse/i));

  expect(queryByText(children)).not.toBeTruthy();
});
```

Here we have a component that shows some text when you click the “Expand” button and hides it when you click the “Collapse” button. Our test verifies this behavior.

We’re using `queryByText()` method instead of `getByText()` because the former doesn’t throw when an element not found: this way we can test that an element doesn’t exist.

_See the next section for a more complex example of testing events._

### Testing event handlers

When you unit test a single component, event handlers are often defined in the parent component, and there are no visible changes as a reaction to these events. They also define the API of a component that you want to test.

`jest.fn()` creates a _mock function_, or a _spy_, that allows you to check how many times it was called and with which parameters.

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

test('submits username and password', () => {
  const username = 'me';
  const password = 'please';
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <Login onSubmit={onSubmit} />
  );

  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });

  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });

  fireEvent.click(getByText(/log in/i));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    username,
    password
  });
});
```

Here we’re using `jest.fn()` to define a spy for `onSubmit` prop of our `Login` component, then we’re filling the form using a technique, described in the previous section, then we simulate a click on the submit button and check that the `onSubmit` function was called only once and it has received login and password.

In comparison to Enzyme we don’t have to call a form submit handler directly. React Testing Library’s `fireEvent.click()` method will dispatch a click event on the DOM node which is captured and handled by React the same way a normal click would be handled. For example, it will dispatch a form submit event when we “click” a `<button type="submit">`, and won’t dispatch it when we “click” a `<button type="button">`, which makes our tests more reliable.

### Async tests

Asynchronous operations are the most tricky to test. Often developers give up and add random delays to their tests:

```js
const wait = (time = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

test('something async', async () => {
  // Run an async operation...
  await wait(100).then(() => {
    expect(getByText('Done!')).toBeTruthy();
  });
});
```

This approach is problematic. The delay will always be a random number. A number that is good enough on a developer’s machine at the time of writing the code. But it can be too long or too short at any other time and on any other machine. When it’s too long, our test will run longer than necessary. When it’s too short, our test will break.

A better approach would be polling: waiting for the desired result, like new text on a page, by checking it multiple times with short intervals, until the expectation is true. React Testing Library has a few tools for that. First is a generic [`wait()` method](https://testing-library.com/docs/dom-testing-library/api-async#wait) (there are also a few others for more specific use cases):

```js
import { wait } from '@testing-library/react';

test('something async', async () => {
  // Run an async operation...
  await wait(() => {
    expect(getByText('Done!')).toBeTruthy();
  });
});
```

But for querying elements we can use `findBy*()` and `findAllBy*()` methods that will wait for an element to appear:

```js
test('something async', async () => {
  expect.assertions(1);
  // Run an async operation...
  expect(await findByText('Done!')).toBeTruthy();
});
```

Now our tests will wait as long as necessary but not more.

`expect.assertions()` method is useful for writing async tests: you tell Jest how many assertions you have in your test, and if you mess up something, like forget to return a Promise from `test()`, this test will fail.

_See the next section for more realistic examples._

### Testing network requests and mocks

There are many ways to test components, that send network requests:

- dependency injection;
- mocking a service module;
- mocking a high-level network API, like `fetch`;
- mocking a low-level network API, that catches all ways of making network requests.

I’m not mentioning sending a real network request to a real API as an option here, because it’s slow and fragile. Every network problem or change of the data, returned by the API, may break our tests. Also, you’ll need to have the right data for all test cases — hard to achieve with a real API or a database.

**Dependency injection** is when you pass a dependency as a function parameter or a component prop, instead of hardcoding it inside a module. This allows you to pass another implementation in a test. Use default function parameters or default component props to define the default implementation, one that should be used in non-test code. That way you won’t have to pass the dependency every time you use a function or a component:

```jsx
import React from 'react';

const defaultFetchIngredients = () => fetch(URL).then(r => r.json());

export default function RemotePizza({ fetchIngredients }) {
  const [ingredients, setIngredients] = React.useState([]);

  const handleCook = () => {
    fetchIngredients().then(response => {
      setIngredients(response.args.ingredients);
    });
  };

  return (
    <>
      <button onClick={handleCook}>Cook</button>
      {ingredients.length > 0 && (
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      )}
    </>
  );
}

RemotePizza.defaultProps = {
  fetchIngredients: defaultFetchIngredients
};
```

When we use our component without passing the `fetchIngredients` prop, it’ll use the default implementation:

```jsx
<RemotePizza />
```

But in tests we’ll pass a custom implementation, that returns mock data instead of making an actual network request:

```jsx
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  const fetchIngredients = () =>
    Promise.resolve({
      args: { ingredients }
    });
  const { getByText } = render(
    <RemotePizza fetchIngredients={fetchIngredients} />
  );

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
```

Dependency injection is great for unit tests, when you’re rendering a component that accepts an injection directly, but for integration tests need too much boilerplate to pass dependencies to deeply nested components.

That’s where request mocking comes in.

**Mocking** is similar to dependency injection in a way that you’re also replacing a dependency implementation with your own in a test, but it works on a deeper level: by modifying how either module loading or browser APIs, like `fetch`, work.

**With `jest.mock()`** you can mock any JavaScript module. To make it work in our case, we need to extract our fetching function to a separate module, often called a _service module_:

```js
export const fetchIngredients = () =>
  fetch(
    'https://httpbin.org/anything?ingredients=bacon&ingredients=mozzarella&ingredients=pineapples'
  ).then(r => r.json());
```

Then import it in a component:

```jsx
import React from 'react';
import { fetchIngredients } from '../services';

export default function RemotePizza() {
  /* Same as above */
}
```

And now we can mock it in our test:

```jsx
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import RemotePizza from '../RemotePizza';
import { fetchIngredients } from '../../services';

jest.mock('../../services');

afterEach(() => {
  fetchIngredients.mockReset();
});

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchIngredients.mockResolvedValue({ args: { ingredients } });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
```

We’re using Jest’s [mockResolvedValue](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockresolvedvaluevalue) method to resolve a Promise with a mock data.

**Mocking the `fetch` API** is similar to mocking a method, but instead of importing a method and mocking it with `jest.mock()`, you’re matching a URL and giving a mock response.

We’ll use [fetch-mock](http://www.wheresrhys.co.uk/fetch-mock/) to mock the API request:

```jsx
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterAll(() => {
  fetchMock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchMock.restore().mock(/https:\/\/httpbin.org\/anything\?.*/, {
    body: { args: { ingredients } }
  });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
```

Here we’re using `mock()` method from fetch-mock to return a mock response to any network request matching the given URL pattern. The rest of the test is the same as with dependency injection.

**Mocking the network** is similar to mocking `fetch` API but it works on a lower level, so network requests, sent using other APIs, like `XMLHttpRequest`, will also be mocked.

We’ll use [Nock](https://github.com/nock/nock) to mock the network request:

```jsx
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import nock from 'nock';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterEach(() => {
  nock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(5);

  const scope = nock('https://httpbin.org')
    .get('/anything')
    .query(true)
    .reply(200, { args: { ingredients } });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  expect(scope.isDone()).toBe(true);

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
```

The code is almost the same as with fetch-mock, but here we’re defining _a scope_: a mapping of request URLs and mock responses.

`query(true)` means we’re matching a request with any query parameters, otherwise you can define a specific parameters, like `query({quantity: 42})`.

`scope.isDone()` is `true` when all requests, defined in the scope, were made.

I’d choose between `jest.mock()` and Nock:

- `jest.mock()` is already available with Jest and you don’t need to set up and learn anything new — it works the same way as mocking any other modules.
- Nock has slightly more convenient API than fetch-mock, and debugging tools. It can also record real network request, so you don’t have to hand-craft mock responses.

### Debugging

Sometimes you want to check the rendered React tree, use the [debug()](https://testing-library.com/docs/react-testing-library/api#debug) method:

```jsx
const { debug } = render(<p>Hello Jest!</p>);
debug();
// -> <p>Hello Jest!</p>
```

You can also print an element:

```jsx
debug(getByText(/expand/i));
```

## Conclusion

We’ve learned how to set up React Testing Library and how to test different React components.

---

Thanks to Joe Boyle, Kent C. Dodds, Anna Gerus, Patrick Hund, Monica Lent, Morgan Packard, Alexander Plavinski, Giorgio Polvara, Juho Vepsäläinen.
