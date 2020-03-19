---
layout: Post
title: 'Modern React testing, part 4: Cypress'
description: 'You’ll learn how to test React apps end-to-end with Cypress and Cypres Testing Library, and how to apply the best practices we’ve learned in the first article.'
date: 2019-08-19
lang: en
tags:
  - tools
  - react
  - testing
  - testing-series
  - testing-library
  - cypress
---

Cypress

React Testing Library is a small library to test React components, that makes applying best practices, we’ve learned in the first article, easy.

**This is the third article in a series**, where we learn how to test React components with Jest and React Testing Library.

- [Modern React testing: best practices](/all/react-testing-1-best-practices/)
- [Modern React testing: Jest and Enzyme](/all/react-testing-2-jest-and-enzyme/)
- [Modern React testing: Jest and React Testing Library](/all/react-testing-3-jest-and-react-testing-library/)
- **Modern React testing: Cypress (_this post_)**

## Getting started with Cypress and Cypress Testing Library

We’ll set up and use these tools:

- [Cypress](https://www.cypress.io/), an end-to-end test runner;
- [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library), additional queries.

### Why Cypress and Cypress Testing Library

**Cypress** has many benefits over other end-to-end test runners:

- The best experience of writing and debugging tests.
- Use browser developer tools to inspect the page at any moment during the test run.
- All commands wait for DOM to chanage when necessary, this makes writing async tests easier.
- Supports Chrome, Firefox and Edge.

**Cypress Testing Library** makes Cypress even better:

- Convenient queries (form label, image alt, ARIA role).
- Libraries for other frameworks with the same queries.

Testing Library helps you write good tests and makes writing bad test hard. It allows you to query elements similar to how a user would do that: for example, query form elements and buttons by their labels.

### Setting up Cypress and Cypress Testing Library

First, install all the dependencies including peer dependencies:

```bash
npm install --save-dev cypress @testing-library/cypress
```

Then run `cypress init` to create all the necessary files.

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
    "@testing-library/jest-dom": "^5.1.1",
    "@testing-library/react": "^10.0.1",
    "jest": "25.1.0",
    "node-fetch": "2.6.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom/extend-expect",
      "<rootDir>/src/setupTests.js"
    ]
  }
}
```

The `setupFilesAfterEnv` option tells Jest to load jest-dom matchers and about our setup file, that we’ve created at the previous step.

### Creating our first test

The best location for a test is close to the source code. For example, if we have a component at `src/components/Button.js`, a test for this component could be at `src/components/__tests__/Button.spec.js`. Jest will find and run this file automatically.

So, let’s create out first test:

```jsx
import React from 'react';
import { render } from '@testing-library/react';

test('hello world', () => {
  const { getByText } = render(<p>Hello Jest!</p>);
  expect(getByText('Hello Jest!')).toBeInTheDocument();
});
```

Here we’re rendering a paragraph of text using the Testing Library’s [render()](https://testing-library.com/docs/react-testing-library/api#render) method, then testing that a paragraph containing “Hello Jest!” was rendered using Testing Library’s [getByText()](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) method to find it and jest-dom’s [toBeInTheDocument()](https://github.com/testing-library/jest-dom#tobeinthedocument) matcher.

### Running tests

Run `npm test` (or `npm t`) to run all tests. You’ll see something like this:

![Running Jest and React Testing Library tests in the terminal](/images/jest-react-testing-library.png)

Run `npm run test:watch` to run Jest in watch mode: Jest will run only tests that are related to files changed since the last commit, and Jest will rerun these tests any time we change the code. This is how I usually run Jest. Watch mode is fast enough even in large projects, where running all tests takes many minutes.

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

### Querying DOM elements for tests

Generally, our tests should resemble how our users interact with the app. That means we should avoid relying on implementation details, because they can change and we’ll need to update our tests.

Let’s compare different methods of querying DOM elements:

| Selector | Recommended | Notes |
| --- | --- | --- |
| `button`, `Button` | Never | Worst: too generic |
| `.btn.btn-large` | Never | Bad: coupled to styles |
| `#main` | Never | Bad: avoid IDs in general |
| `[data-testid="cookButton"]` | Sometimes | Okay: not visible to the user, but not an implementation detail, use when better options aren’t available |
| `[alt="Chuck Norris"]`, `[role="banner"]` | Often | Good: still not visible to users, but already part of the app UI |
| `[children="Cook pizza!"]`  | Always | Best: visible to the user part of the app UI |

To summarise:

- Text content may change and we’ll need to update our tests. This may not be a problem if our translation library only render string IDs in tests, or if we want our test to work with the actual text users see in the app.
- Test IDs clutter the markup with props we only need in tests. Test IDs are also something that users of our app don’t see: if we remove a label from a button, a test with test ID will still pass. We may want to set up something to remove test IDs from the markup we send to users.

Testing Library has methods for all good queries. There are [six variants of query methods](https://testing-library.com/docs/dom-testing-library/api-queries#variants):

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

Note that I’m using a regular expression (`/cook pizza!/i`) instead of a string literal (`'Cook pizza!'`) to make queries more resilient to small tweaks and changes in the content.

Or query it by the test ID:

```jsx
const { getByTestId } = render(<Pizza />);
getByTestId('cookButton');
```

Or, the best method, query it by its ARIA role and the label:

```jsx
const { getByRole } = render(<Pizza />);
getByRole('button', { name: /cook pizza!/i });
```

Benefits of this method are:

- doesn’t clutter the markup with test IDs, that aren’t used by users;
- doesn’t have false positives when the same text is used in non-interactive content;
- makes sure that the button is an actual `button` element or at least have `role="button"`.

Check the Testing Library docs for more details on [which query to use](https://testing-library.com/docs/guide-which-query).

## Testing React components

Check out [the GitHub repository](https://github.com/sapegin/rtl-article-2019) with all the examples.

### Testing rendering

This kind of test can be useful when your component has several variations and you want to test that a certain prop renders the correct variation.

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import Pizza from '../Pizza';

test('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  const { getByText } = render(<Pizza ingredients={ingredients} />);

  for (const ingredient of ingredients) {
    expect(getByText(ingredient)).toBeInTheDocument();
  }
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
  const { getByRole, queryByText } = render(
    <ExpandCollapse excerpt="Information about dogs">
      {children}
    </ExpandCollapse>
  );

  expect(queryByText(children)).not.toBeInTheDocument();

  fireEvent.click(getByRole('button', { name: /expand/i }));

  expect(queryByText(children)).toBeInTheDocument();

  fireEvent.click(getByRole('button', { name: /collapse/i }));

  expect(queryByText(children)).not.toBeInTheDocument();
});
```

Here we have a component that shows some text on the “Expand” button click and hides it on the “Collapse” button click. Our test verifies this behavior.

We’re using `queryByText()` method instead of `getByText()` because the former doesn’t throw when an element isn’t found, so we can test that an element doesn’t exist.

_See the next section for a more complex example of testing events._

### Testing event handlers

When we unit test a single component, event handlers are often defined in the parent component, and there are no visible changes as a reaction to these events. They also define the API of a component that we want to test.

`jest.fn()` creates a _mock function_, or a _spy_, that allows us to check how many times it was called and with which parameters.

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

test('submits username and password', () => {
  const username = 'me';
  const password = 'please';
  const onSubmit = jest.fn();
  const { getByLabelText, getByRole } = render(
    <Login onSubmit={onSubmit} />
  );

  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });

  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });

  fireEvent.click(getByRole('button', { name: /log in/i }));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    username,
    password
  });
});
```

Here we’re using `jest.fn()` to define a spy for the `onSubmit` prop of our `Login` component, then we’re filling the form by firing `change` events, then we simulate a click on the submit button, and check that the `onSubmit` function was called only once and it has received login and password.

In comparison to Enzyme we don’t have to call a form submit handler directly. Testing Library’s `fireEvent.click()` method will dispatch a click event on the DOM node which is captured and handled by React the same way a real click in a browser would be handled. For example, it will dispatch a form submit event when we “click” a `<button type="submit">`, and won’t dispatch it when we “click” a `<button type="button">`, which makes our tests more reliable.

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
    expect(getByText(/done!/i)).toBeInTheDocument();
  });
});
```

This approach is problematic. The delay will always be a random number. A number that is good enough on a developer’s machine at the time of writing the code. But it can be too long or too short at any other time and on any other machine. When it’s too long, our test will run longer than necessary. When it’s too short, our test will break. This makes tests flaky.

A better approach would be _polling_: waiting for the something, like new text on a page, by checking it multiple times with short intervals, until it’s there. Testing Library has the [`waitFor()` method](https://testing-library.com/docs/dom-testing-library/api-async#waitfor):

```js
import { waitFor } from '@testing-library/react';

test('something async', async () => {
  // Run an async operation...
  await waitFor(() => {
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });
});
```

For querying elements we can use `findBy*()` and `findAllBy*()` methods that could wait for an element to appear:

```js
test('something async', async () => {
  expect.assertions(1);
  // Run an async operation...
  expect(await findByText(/done!/i)).toBeInTheDocument();
});
```

Now our tests will wait as long as necessary but not more.

[waitForElementToBeRemoved()](https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved) is another useful method: it waits until an element is removed from the DOM.

`expect.assertions()` method is useful for writing async tests: we tell Jest how many assertions we have in the test, and if we mess up something, like forget to return a Promise from `test()`, this test will fail.

_See the next section for more realistic examples._

### Testing network requests and mocks

There are many ways to test components, that send network requests:

- dependency injection;
- mocking a service module;
- mocking a high-level network API, like `fetch`;
- mocking a low-level network API, that catches all ways of making network requests;
- starting a mock server and sending requests to this server instead of a real API.

I’m not mentioning sending a real network request to a real API as an option here, because it’s slow and fragile. Every network problem or change of the data, returned by the API, may break our tests. Also, we’ll need to have the right data for all test cases — hard to achieve with a real API or a database.

Let’s look at some of the methos in more detail.

**Dependency injection** is when we pass a dependency as a function parameter or a component prop, instead of hardcoding it inside a module. This allows us to pass another implementation in a test. Use default function parameters or default component props to define the default implementation, one that should be used in non-test code. That way we don’t have to pass the dependency every time we use a function or a component:

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

But in tests we’re passing a custom implementation, that returns mock data instead of making an actual network request:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  const fetchIngredients = () =>
    Promise.resolve({
      args: { ingredients }
    });
  const { findByText, getByRole } = render(
    <RemotePizza fetchIngredients={fetchIngredients} />
  );

  fireEvent.click(getByRole('button', { name: /cook/i }));

  for (const ingredient of ingredients) {
    expect(await findByText(ingredient)).toBeInTheDocument();
  }
});
```

Dependency injection is great for unit tests, when we’re rendering a component that accepts an injection directly, but for integration tests it needs too much boilerplate to pass dependencies to deeply nested components.

That’s where request mocking comes in.

**Mocking** is similar to dependency injection in a way that we’re also replacing a dependency implementation with your own in a test, but it works on a deeper level: by modifying how either module loading or browser APIs, like `fetch`, work.

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
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });
});
```

We’re using Jest’s [mockResolvedValue](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockresolvedvaluevalue) method to resolve a Promise with a mock data.

**Mocking the network** is similar to mocking a method, but instead of importing a method and mocking it with `jest.mock()`, we’re matching a URL and giving a mock response. And it works on the lowest level, so network requests, sent using `fetch` or `XMLHttpRequest`, will be mocked.

We’ll use [Nock](https://github.com/nock/nock) to mock the network request:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  const { findByText, getByRole } = render(<RemotePizza />);

  fireEvent.click(getByRole('button', { name: /cook/i }));

  expect(scope.isDone()).toBe(true);

  for (const ingredient of ingredients) {
    expect(await findByText(ingredient)).toBeInTheDocument();
  }
});
```

Here we’re defining _a Nock scope_: a mapping of request URLs and mock responses.

`query(true)` means we’re matching a request with any query parameters, otherwise we can define a specific parameters, like `query({quantity: 42})`.

`scope.isDone()` is `true` when all requests, defined in the scope, were made.

To summarize the difference between `jest.mock()` and Nock:

- `jest.mock()` is already available with Jest and we don’t need to set up and learn anything new — it works the same way as mocking any other module.
- Nock has a specilized API to describe network requests and responses, and debugging tools to help us when something isn’t working. It can also record real network requests, so we don’t have to hand-craft mock responses.

### Debugging

To check the rendered React tree, use the [debug()](https://testing-library.com/docs/react-testing-library/api#debug) method:

```jsx
const { debug } = render(<p>Hello Jest!</p>);
debug();
// -> <p>Hello Jest!</p>
```

We can also print an specific element:

```jsx
debug(getByText(/expand/i));
```

## Conclusion

We’ve learned how to set up React Testing Library and how to test different React components.

---

Thanks to Joe Boyle, Kent C. Dodds, Anna Gerus, Patrick Hund, Monica Lent, Morgan Packard, Alexander Plavinski, Giorgio Polvara, Juho Vepsäläinen.
