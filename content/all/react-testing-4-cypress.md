---
layout: Post
title: 'Modern React testing, part 4: Cypress and Cypress Testing Library'
description: 'You’ll learn how to test React apps end-to-end with Cypress and Cypres Testing Library, and how to apply the best practices we’ve learned in the first article.'
date: 2020-07-30
lang: en
tags:
  - tools
  - react
  - testing
  - testing-series
  - testing-library
  - cypress
  - mocking
  - msw
---

Cypress is a framework-agnostic end-to-end (E2E) testing tool for web apps. Together with Cypress Testing Library, it gives the best test writing experience, and makes applying best practices, we’ve learned in the first article, easy.

**This is the fourth article in the series**, where we learn how to test React apps with Cypress and Cypress Testing Library.

- [Modern React testing: best practices](/all/react-testing-1-best-practices/)
- [Modern React testing: Jest and Enzyme](/all/react-testing-2-jest-and-enzyme/)
- [Modern React testing: Jest and React Testing Library](/all/react-testing-3-jest-and-react-testing-library/)
- **Modern React testing: Cypress and Cypress Testing Library (_this post_)**

## Getting started with Cypress and Cypress Testing Library

We’ll set up and use these tools:

- [Cypress](https://www.cypress.io/), an end-to-end test runner;
- [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library), additional queries.
- [Mock Service Worker](https://mswjs.io/), mocking network requests.
- [start-server-and-test](https://www.npmjs.com/package/start-server-and-test), starts server, waits for URL, then runs test command.

### Why Cypress and Cypress Testing Library

**Cypress** has many benefits over other end-to-end test runners:

- The best experience of writing and debugging tests.
- Inspect the page at any moment during the test run using the browser developer tools.
- All commands wait for the DOM to change when necessary, this makes writing async tests easier.
- Assertions better resemble real user behavior, like checking that the button is visible, isn’t disabled, and isn’t hidden behind another element before clicking it.
- Supports Chrome, Firefox and Edge.

**Cypress Testing Library** makes Cypress even better:

- Convenient queries, like finding elements by their label text or ARIA role.
- Libraries for other frameworks with the same queries.

Testing Library helps you write good tests and makes writing bad tests difficult. It allows you to query elements similar to how a user would do that: for example, query form elements and buttons by their labels.

### Setting up Cypress and Cypress Testing Library

First, install all the dependencies:

```bash
npm install --save-dev cypress @testing-library/cypress start-server-and-test
```

Then add two scripts to your `package.json`:

```json
{
  "name": "pizza",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test:e2e": "cypress open",
    "test:e2e:ci": "start-server-and-test 'react-scripts start' 3000 'cypress run --browser chrome --headless'"
  },
  "dependencies": {
    "react": "16.13.0",
    "react-dom": "16.13.0",
    "react-scripts": "3.4.0"
  },
  "devDependencies": {
    "@testing-library/cypress": "^6.0.0",
    "cypress": "^4.3.0",
    "start-server-and-test": "^1.10.11"
  }
}
```

Cypress, in contrary to React Testing Library or Enzyme, tests a real app in a real browser, so you need to run your development server before running Cypress. We can run both commands manually in separate terminal windows, which is fine for local development, or automate it using [start-server-and-test](https://github.com/bahmutov/start-server-and-test) tool to have a single command that we can use on continous integration.

As a development server we can use an actual developement server of our app, like Create React App in this case, or another tool like React Styleguidist, or Storybook, to test isolated components.

- The first script, `npm run test:e2e`, runs Cypress alone. It needs already running development server, `npm start`.
- The second script, `npm run test:e2e:ci`, runs development server, waits until it’s ready, runs all Cypress tests in headless mode, and stops everything.

Now, run `npm run test:e2e` to create all the necessary files and some examples tests that we can run by pressing “Run all specs” button:

![Cypress app with a list of tests](/images/cypress-ui.png)

Before we start writing tests, we need to do one more thing — set up Cypress Testing Library. Open `cypress/support/index.js`, and add the following:

```js
// Testing Library queries for Cypress
import '@testing-library/cypress/add-commands';
```

### Setting up Mock Service Worker

We’re going to use [Mock Service Worker](https://mswjs.io/) (MSW) for mocking network requests in our integration tests, and in the app during development. Cypress has [its own way of mocking network](https://docs.cypress.io/api/commands/server.html) but I think MSW has several benefits:

- Using Service Worker, so it intercepts all network requests, no matter how there are made.
- A single place do define mocks for the project, with the ability to [override responses](https://mswjs.io/docs/api/setup-server/use) for particular tests.
- We can reuse mocks in integration tests and during development.
- Requests are still visible in the browser developer tools.
- Supports REST API and GraphQL.

First, install MSW from npm:

```bash
npm install --save-dev msw
```

Create [mock definitions](https://mswjs.io/docs/getting-started/mocks/rest-api), `src/mocks/handlers.js`:

```js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://httpbin.org/anything', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        args: {
          ingredients: ['bacon', 'tomato', 'mozzarella', 'pineapples']
        }
      })
    );
  })
];
```

_Note:_ to mock GraphQL requests instead of REST, we need to use the [graphql](https://mswjs.io/docs/getting-started/mocks/graphql-api) namespace.

Here, we’re intercepting GET requests to `https://httpbin.org/anything` with any parameters, and returning a JSON object with an OK status.

Now we need to [generate the Service Worker script](https://mswjs.io/docs/getting-started/integrate/browser):

```
npx msw init public/
```

_Note:_ the public directory [may be different](https://mswjs.io/docs/getting-started/integrate/browser#where-is-my-public-directory) for projects not using Create React App.

Create another JavaScript module that will register our Service Worker with our mocks, `src/mocks/browser.js`:

```js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...handlers);
```

And the last step is to start the worker function when we run our app in development mode. Add to your app root module (`src/index.js` for Create React App):

```js
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

function App() {
// ...
```

Now, every time we run our app in development mode or integration tests, network requests will be mocked. All without any changes to the application code or tests, except four lines of code in the root module.

### Creating our first test

By default Cypress looks for test files inside the `cypress/integration/` folder. Feel free to remove the `examples/` folder from there, we won’t need it.

So, let’s create out first test, `cypress/integration/hello.js`:

```js
it('hello world', () => {
  cy.visit('http://localhost:3000');
  cy.findByText(/pizza/i).should('be.visible');
});
```

Here we’re visiting the homepage of our app running in a development server, then testing that the text “pizza” is present on the page using Testing Library’s [findByText()](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) method and Cypress’s [should()](https://docs.cypress.io/api/commands/should.html) matcher.

### Running tests

Run the development server, `npm start`, and then Cypress, `npm run test:e2e`. From here run a single test or all tests, Cypress will rerun tests on every change in the code or the test.

![Running a test in Cypress](/images/cypress-test.png)

When I write tests, I usually run a single test, otherwise it’s too slow and too hard to see what’s wrong if there are any issues.

Run `npm run test:e2e:ci` to run all tests in headless mode, meaning we won’t see the browser window:

![Running Cypress in the terminal](/images/cypress-headless.png)

### Querying DOM elements for tests

Generally, our tests should resemble how our users interact with the app. That means we should avoid relying on implementation details, because they can change and we’ll need to update our tests. This also increases chances of false positives, when tests are passing but the actual feature is broken.

Let’s compare different methods of querying DOM elements:

| Selector | Recommended | Notes |
| --- | --- | --- |
| `button`, `Button` | Never | Worst: too generic |
| `.btn.btn-large` | Never | Bad: coupled to styles |
| `#main` | Never | Bad: avoid IDs in general |
| `[data-testid="cookButton"]` | Sometimes | Okay: not visible to the user, but not an implementation detail, use when better options aren’t available |
| `[alt="Chuck Norris"]`, `[role="banner"]` | Often | Good: still not visible to users, but already part of the app UI |
| `[children="Cook pizza!"]` | Always | Best: visible to the user part of the app UI |

To summarise:

- Text content may change and we’ll need to update our tests. This may not be a problem if our translation library only render string IDs in tests, or if we want our test to work with the actual text users see in the app.
- Test IDs clutter the markup with props we only need in tests. Test IDs are also something that users of our app don’t see: if we remove a label from a button, a test with test ID will still pass. We may want to set up something to remove test IDs from the markup we send to users.

Cypress Testing Library has methods for all good queries. There are [two groups of query methods](https://testing-library.com/docs/cypress-testing-library/intro#usage):

- `cy.findBy*()` finds a matching element, or fails when an element not found after a default timeout or more than one element found;
- `cy.findAllBy*()` finds all matching elements.

And [the queries](https://testing-library.com/docs/dom-testing-library/api-queries#queries) are:

- `cy.findByLabelText()` finds a form element by its `<label>`;
- `cy.findByPlaceholderText()` finds a form element by its placeholder text;
- `cy.findByText()` finds an element by its text content;
- `cy.findByAltText()` finds an image by its alt text;
- `cy.findByTitle()` finds an element by its `title` attribute;
- `cy.findByDisplayValue()` finds a form element by its value;
- `cy.findByRole()` finds an element by its ARIA role;
- `cy.findByTestId()` finds an element by its test ID.

All queries are also available with the `findAll*` prefix, for example, `cy.findAllByLabelText()` or `cy.findAllByRole()`.

Let’s see how to use query methods. To select this button in a test:

```jsx
<button data-testid="cookButton">Cook pizza!</button>
```

We can either query it by its text content:

```jsx
cy.findByText(/cook pizza!/i);
```

Note the regular expression (`/cook pizza!/i`) instead of a string literal (`'Cook pizza!'`) to make queries more resilient to small tweaks and changes in the content.

Or query it by the test ID:

```jsx
cy.findByTestId('cookButton');
```

Or, the best method, query it by its ARIA role and the label:

```jsx
cy.findByRole('button', { name: /cook pizza!/i });
```

Benefits of this method are:

- doesn’t clutter the markup with test IDs, that aren’t used by users;
- doesn’t have false positives when the same text is used in non-interactive content;
- makes sure that the button is an actual `button` element or at least have `role="button"`.

Check the Testing Library docs for more details on [which query to use](https://testing-library.com/docs/guide-which-query).

## Testing React apps

Check out [the GitHub repository](https://github.com/sapegin/cypress-article-2020) with all the examples.

### Testing basic user interaction

A typical integration test looks like this: visit the page, interact with it, check that the new text appears on the page.

```js
it('navigates to another page', () => {
  cy.visit('http://localhost:3000');

  cy.log('Opening the pizza page');
  cy.findByRole('link', { name: /remotepizza/i }).click();

  cy.log('We are on the pizza page');
  cy.findByRole('heading', { name: /pizza/i }).should('be.visible');
});
```

Here we’re finding a link by its ARIA role and text using the Cypress Testing Library’s [findByRole()](https://testing-library.com/docs/dom-testing-library/api-queries#byrole) method, and clicking it using the Cypress’ [click()](https://docs.cypress.io/api/commands/click.html) method. Then we’re verifying that we’re on the correct page by checking its heading, first by finding it the same way we found the link before, and testing with the Cypress’ [should()](https://docs.cypress.io/api/commands/should.html) method.

With Cypress we generally don’t have to care wether the actions are synchronous or asynchronous: each command with wait for some time for the queried element to appear on the page. Though the code look synchronous, each `cy.*` method puts a command into a queue that is executed asynchronously. This avoids flakines and complexity of asynchronous testing but keeps the code straightforward.

Also note calls to the Cypress’ [log()](https://docs.cypress.io/api/commands/log.html) method: this is more useful than writing comments because these messages are visible in the command log:

![Cypress test log](/images/cypress-log.png)

### Testing forms

Cypress Testing Library allows us to access any form element by its visible or accessible label.

For example, we have a [registration form](https://github.com/sapegin/cypress-article-2020/blob/master/src/components/SignUpForm.js) with text inputs, selects, checkboxes and radio buttons. We can test it [like this](https://github.com/sapegin/cypress-article-2020/blob/master/cypress/integration/signUp.js):

```js
it('should show success page after submission', () => {
  cy.visit('http://localhost:3000/signup');

  cy.log('Filling the form');
  cy.findByLabelText(/first name/i)
    .clear()
    .type('Chuck');
  cy.findByLabelText(/last name/i)
    .clear()
    .type('Norris');
  cy.findByLabelText(/country/i).select('Russia');
  cy.findByLabelText(/english/i).check();
  cy.findByLabelText(/subscribe to our newsletter/i).check();

  cy.log('Submit the form');
  cy.findByRole('button', { name: /sign in/i }).click();

  cy.log('We are on the success page');
  cy.findByText(/thank you for signing up/i).should('be.visible');
});
```

Here we’re using Cypress Testing Library’s [findByLabelText()](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) and [findByRole()](https://testing-library.com/docs/dom-testing-library/api-queries#byrole) methods to fine elements by their label text or ARIA role. Then we’re using Cypress’ [clear()](https://docs.cypress.io/api/commands/clear.html), [type()](https://docs.cypress.io/api/commands/type.html), [select()](https://docs.cypress.io/api/commands/select.html) and [check()](https://docs.cypress.io/api/commands/check.html) methods to fill the form, and the [click()]() method to submit it.

### Testing complex forms

In the previous example we used the [findByLabelText()](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) method to query form elements. This works when all form elements have unique labels but this isn’t always the case.

For example, we have a passport number section in our [registration form](https://github.com/sapegin/cypress-article-2020/blob/master/src/components/SignUpForm.js) where multiple inputs have the same label, like “year” of the issue date and “year” of the expiration date. The markup of each field group looks like this:

```html
<fieldset>
  <legend>Passport issue date</legend>
  <input type="number" aria-label="Day" placeholder="Day" />
  <select aria-label="Month">
    <option value="1">Jan</option>
    <option value="2">Feb</option>
    ...
  </select>
  <input type="number" aria-label="Year" placeholder="Year" />
</fieldset>
```

To access a particular field, we can select a `fieldset` by its `caption` text, and then select an input by its label inside the `fieldset`.

```js
cy.findByRole('group', { name: /passport issue date/i }).within(
  () => {
    cy.findByLabelText(/day/i).clear().type('12');
    cy.findByLabelText(/month/i).select('5');
    cy.findByLabelText(/year/i).clear().type('2004');
  }
);
```

We call Cypress Testing Library’s [findByRole()](https://testing-library.com/docs/dom-testing-library/api-queries#byrole) method with `group` — ARIA role of `fieldset` — and its `caption` text.

Any Cypress’ commands we call in the [within()](https://docs.cypress.io/api/commands/within.html) only affect the part of the page we call `within()` on.

### Testing links

Cypress doesn’t support multiple tabs which makes testing likes that opens in a new tab tricky. There are several ways to test such links:

- check the link `href` without clicking it;
- remove the `target` attribute before clicking the link;

Note that if the link is external, we can only use the first method.

In the first method, we query the link by its role and text, and verify that the URL in its `href` attribute is correct:

```js
cy.findByRole('link', { name: /terms and conditions/i })
  .should('have.attr', 'href')
  .and('include', '/toc');
```

The main drawback of this method is that we’re not testing that the link is actually clickable. It might be hidden, or might have a click handler that prevents the default browser handing.

In the second method, we query the link by its role and text again, remove the `target="_blank"` attribute to make it open in the same tab, and click it:

```js
cy.findByRole('link', { name: /terms and conditions/i })
  .invoke('removeAttr', 'target')
  .click();
cy.findByText(/i'm baby/i).should('be.visible');
```

Now we can verify some text on the linked page to check that we’re on the correct page.

I recommend this method because it better resembles the actual user behavior. Unless you have an external link, and the first method is your only choice.

There are [a few other solutions](https://github.com/cypress-io/cypress-example-recipes/blob/bd2d6ffb33214884cab343d38e7f9e6ebffb323f/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js) but I don’t think they are any better than these two.

### Testing network requests, and mocks

Having MSW mocks setup (see “Setting up Mock Service Worker” above), happy path tests of components with asynchronous data fetching isn’t different from any other tests.

For example, we have an API that returns a list of pizza ingredients:

```js
const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

it('load ingredients asynchronously', () => {
  cy.visit('http://localhost:3000/remote-pizza');

  cy.log('Ingredients list is not visible');
  cy.findByText(ingredients[0]).should('not.be.visible');

  cy.log('Load ingredients');
  cy.findByRole('button', { name: /cook/i }).click();

  cy.log('All ingredients appear on the screen');
  for (const ingredient of ingredients) {
    cy.findByText(ingredient).should('be.visible');
  }

  cy.log('The button is not clickable anymore');
  cy.findByRole('button', { name: /cook/i }).should('be.disabled');
});
```

Cypress will wait until the data is fetched and rendered on the screen, and thanks to network calls mockings it will be fast.

For not so happy path tests we may need to override global mocks in a particular test. For example, we could test what happens when our API returns an error:

```js
it('shows an error message', () => {
  cy.visit('http://localhost:3000/remote-pizza');

  cy.window().then(window => {
    // Reference global instances set in src/browser.js
    const { worker, rest } = window.msw;
    worker.use(
      rest.get('https://httpbin.org/anything', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
  });

  cy.log('Ingredients list is not visible');
  cy.findByText(ingredients[0]).should('not.be.visible');

  cy.log('Load ingredients');
  cy.findByRole('button', { name: /cook/i }).click();

  cy.log(
    'Ingredients list is still not visible and error message appears'
  );
  cy.findByText(ingredients[0]).should('not.be.visible');
  cy.findByText(/something went wrong/i).should('be.visible');
});
```

Here we’re using the MSW’s [use()](https://mswjs.io/docs/api/setup-worker/use) method to override the default mock response for our endpoint during a single test.

### Testing responsive pages

If the UI differs depending on the screen size, like some of the components are rendered in different places, it might be a good idea to run tests for different screen size.

With the Cypress’ [viewport()](https://docs.cypress.io/api/commands/viewport.html) method we can change the viewport size either by specifying exact with and height or by one of the [presets](https://docs.cypress.io/api/commands/viewport.html#Arguments), like `iphone-x` or `macbook-15`.

```js
['iphone-x', 'macbook-15'].forEach(viewport => {
  it(`should show success page after submission (${viewport})`, () => {
    cy.viewport(viewport);
    cy.visit('http://localhost:3000/signup');

    cy.log('Filling the form');
    cy.findByLabelText(/first name/i)
      .clear()
      .type('Chuck');
    cy.findByLabelText(/last name/i)
      .clear()
      .type('Norris');

    cy.log('Submit the form');
    cy.findByRole('button', { name: /sign in/i }).click();

    cy.log('We are on the success page');
    cy.findByText(/thank you for signing up/i).should('be.visible');
  });
});
```

### Debugging

Cypress docs has a thorough [debugging guide](https://docs.cypress.io/guides/guides/debugging.html).

However, most of the time it’s enough to inspect the DOM using the browser developer tools for a particular step of the test after running the tests. Click any operation in the log to _pin_ it, and it’ll appear in the main area, where you right-click any element and inspect it.

![Using Chrome developer tools in Cypress](/images/cypress-inspect.png)

## Troubleshooting

I don’t recommend doing this but on legacy projects you may not have other choices than increase timeouts for particular operations. [By default](https://docs.cypress.io/guides/references/configuration.html#Timeouts) Cypress will wait for four seconds for the DOM to be updated. We can change this timeout for every operation. For example, navigation to a new page may take a lot of time, so we can increase the timeout:

```js
cy.log('We are on the success page');
cy.findByText(/thank you for signing up/i, { timeout: 10000 }).should(
  'be.visible'
);
```

This is still better than increasing the global timeout.

## Conclusion

We’ve learned how to set up Cypress with Cypress Testing Library, how to test common functionality, and how to mock network requests using MSW.

---

Thanks to [Artem Zakharchenko](https://redd.one/), TODO
