---
layout: Post
title: 'Modern React testing, part 1: best practices'
description: 'You’ll learn why to write automated tests, what tests to write and how to write them. What are the best practices of modern frontend and React testing.'
date: 2019-08-05
lang: en
tags:
  - tools
  - react
  - testing
  - testing-series
---

This series of articles is an in-depth snapshot of the current state of testing React components and frontend in general, explaining many _whys_, not just _hows_. We’ll discuss why to write automated tests, what tests to write and how to write them. In practical articles we’ll learn how to use Jest, Enzyme and React Testing Library to test React components.

I wrote [a similar article](https://blog.sapegin.me/all/react-jest/) three years ago, and now I look at it like at a handbook of bad practices. Almost everything I was recommending back then, I don’t do anymore.

**This is the first article in a series**, where we learn why test automation is useful, which types of tests to write, and testing best practices.

- **Modern React testing: best practices (_this post_)**
- [Modern React testing: Jest and Enzyme](/all/react-testing-2-jest-and-enzyme/)
- [Modern React testing: Jest and React Testing Library](/all/react-testing-3-jest-and-react-testing-library/)

## Why automate testing

There are many reasons why automated tests are useful but my favorite reason is: _you’re already testing_.

For example, you’re adding a new button to a page. Then you open this page in a browser and click this button to check whether it works — this is a _manual test_. By automating this process you can be sure that features that used to work will always work as they should.

Automated tests are especially useful for rarely used features: we always test whether the button submits the form with all fields filled correctly, but we tend to forget to test that checkbox hidden in a modal and only used by the boss of your boss. Automated tests will make sure it still works.

Other reasons to automate tests are:

**Confidence to change code**: well-written tests allow you to refactor code with confidence that you’re not breaking anything, and without wasting time updating the tests.

**Documentation**: tests explain how code works and what’s the expected behavior. Tests, in comparison to any written documentation, are always up to date.

**Bugs and regression prevention**: by adding test cases for every bug, found in your app, you can be sure that these bugs will never come back. Writing tests will improve your understanding of the code and the requirements, you’ll critically look at your code and find issues that you’d miss otherwise.

_Automated tests make it possible to catch bugs before you commit them to the repository, in comparison to manual testing where you find most of the bugs during testing or even in production._

## What to test

**The testing pyramid**, introduced by [Mike Cohn](http://www.mountaingoatsoftware.com/), is probably the most popular approach to software testing:

![UI < Service < Unit](/images/testing-pyramid.svg)

It says that UI tests are the slowest and the most expensive to write, and unit tests are the fastest and the cheapest to write, so we should write many unit tests and few UI tests.

_Unit tests_ are testing a single unit of code, like a function or a React component. You don’t need a browser or a database to run unit tests, so they are very fast. _UI tests_ test the whole app loaded in a real browser, usually with a real database. This is the only way to ensure that all parts of your app work together, but they are slow, tricky to write and often flaky. _Service tests_ are somewhere in the middle: they test integration of multiple units but without any UI.

This may work well on the backend, but on the frontend UI details often change without changing bigger user flows, which leads to failure of many unit tests. We spend a lot of time updating unit tests, but don’t have enough confidence that bigger features still work.

_So maybe frontend needs a different approach to testing?_

**The testing trophy**, [introduced by Kent C. Dodds](https://kentcdodds.com/blog/write-tests) is getting popular for the frontend tests:

![End-to-end < Integration > Unit < Static](/images/testing-trophy.svg)

It says that integration tests give you the biggest return on investment, so you should write more integration tests than any other kinds of tests.

_End-to-end tests_ in the trophy mostly correspond to UI tests in the pyramid. _Integration tests_ verify big features or even whole pages but without any backend, a real database or a real browser. For example, render a login page, type a username and a password, click the “Log in” button and verify that the correct network request was sent, but without actually making any network requests — we’ll learn how to do it later.

Even if integration tests are more expensive to write, they have several benefits over unit tests:

| Unit tests | Integration tests |
| :-- | :-- |
| One test covers only one module | One test covers a whole feature or a page |
| Often require rewrite after refactoring | Survive refactoring most of the time |
| Hard to avoid testing implementation details | Better resemble how users are using your app |

_The last point is important: integration tests give us the most confidence that our app works as expected. But it doesn’t mean, that we should only write integration tests. Other tests have their place but we should focus our efforts on tests, that are the most useful._

Now, let’s look closely at each testing trophy level, from the very bottom:

1. **Static analysis** catches syntax errors, bad practices and incorrect use of APIs:
   - Code formatters, like [Prettier](https://prettier.io/);
   - Linters, like [ESLint](https://eslint.org/);
   - Type checkers, like [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/).
2. **Unit tests** verify that tricky algorithms work correctly. Tools: [Jest](https://jestjs.io/).
3. **Integration tests** give you confidence that all features of your app work as expected. Tools: [Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme) or [react-testing-library](https://github.com/kentcdodds/react-testing-library).
4. **End-to-end tests** make sure that your app work as a whole: the frontend and the backend and the database and everything else. Tools: [Cypress](https://www.cypress.io/).

_I think Prettier is a testing tool too because it often makes wrong code look weird, so you start questioning your code, read it carefully and find a bug._

_[Other kinds of tests](https://survivejs.com/maintenance/code-quality/testing/) may be useful for your project too._

## Testing best practices

### Avoid testing internals

Imagine, you have a subscription form component: an email input and a submit button, and you want to test that, when the user submits a form, a success message appears:

```jsx
test('shows a success message after submission', () => {
  const wrapper = mount(<SubscriptionForm />);
  wrapper.instance().handleEmailChange('hello@example.com');
  wrapper.instance().handleSubmit();
  expect(wrapper.state('isSubmitted')).toBe(true);
});
```

There are several issues with this test:

- this test will break if you change how you handle the state (for example, replace React state with Redux or hooks) or even rename state fields or methods;
- it doesn’t test that the form actually works from the user’s perspective: the form may not be connected to `handleSubmit` method, the success message may not appear when `isSubmitted` is true;

The first problem is called _false negative_: a test is failing even when the behavior stays the same. Such tests make refactoring very hard, you never know if a test is failing because you break something or because the test is bad.

The second problem is called _false positive_: a test is passing even when the code is broken. Such tests don’t give you any confidence that the code is actually doing something useful for the user.

Let’s rewrite our test and fix both problems:

```jsx
test('shows a success message after submission', () => {
  const {getByLabelText, getByText, getByRole} = render(<SubscriptionForm />);
  fireEvent.change(getByLabelText(/email/i, { target: { value: 'hello@example.com' } });
  fireEvent.click(getByText(/submit/i);
  expect(getByRole('status').textContent).toMatch('Thank you for subscribing!');
});
```

See Kent C. Dodds’ [Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details) article for more details.

_Good tests verify that the external behavior is correct but don’t know any implementation details._

### Tests should be deterministic

[A non-deterministic test](https://martinfowler.com/articles/nonDeterminism.html) is a test that sometimes passes and sometimes doesn’t.

Some possible reasons are:

- different timezone;
- different filesystem (different path separators);
- a database, that isn’t cleared and repopulated before each test;
- state, shared between several test cases;
- dependency on the order in which test cases are run;
- timeouts for testing asynchronous behavior.

There are many ways to deal with non-deterministic tests, like polling, fake timers or mocks. We’ll look into several examples later in the article.

_Good tests are deterministic, they don’t depend on the environment._

### Avoid unnecessary expectations and tests

Often I see tests like this:

```js
expect(pizza).toBeDefined();
expect(pizza).toHaveAProperty('cheese', 'Mozarella');
```

The first expectation is unnecessary: if the `pizza` isn’t defined, the second expectation will fail anyway. And error messages in Jest are good enough to understand what’s happening.

Sometimes even whole tests cases are unnecessary:

```js
test('error modal is visible', () => {});
test('error modal has an error message', () => {});
```

If we know that the error message inside the error modal is visible, we can be sure that the modal itself is visible too. So we can safely remove the first test.

_Good tests don’t have any unnecessary expectations or test cases._

### Don’t strive for 100% code coverage

Complete test coverage sounds like a great idea in theory but [doesn’t really work in practice](https://ordepdev.me/posts/code-coverage).

There are a few problems with striving to high test coverage:

- High test coverage gives you a false sense of security. “Covered code” means the code was executed during a test run but it doesn’t mean that tests were actually verifying what this code does. With less than 100% test coverage you can be sure you’re not testing some code, but even with 100% coverage, you can’t be sure you’re testing everything.
- Some features are really hard to test, like file upload in a browser or drag’n’drop. You start mocking or accessing component internals, so your tests no longer resemble how your users use your app, and hard to maintain. Eventually, you start spending more time on writing less useful tests — so-called problem of diminishing returns.

In my experience 100% test coverage is useful in two cases:

- In libraries, where it’s critical to avoid accidental breaking changes in the existing API.
- In open source projects, where most changes are done by contributors, who aren’t familiar with the codebase.

_Good tests are easy to maintain and give you the confidence to change your code._

## Conclusion

We’ve covered the most important theory and best practices of writing frontend tests:

- Write more integration tests than any other kind of tests.
- Avoid testing internals.
- Tests should be deterministic.
- Avoid unnecessary expectations and tests.
- Don’t strive for 100% code coverage.

Now we’re ready to start writing our own tests. Next two articles in these series are forks of each other, so feel free to read the one you’re interested in, whether it’s Enzyme or React Testing Library. If you’re still choosing, both article has pros and cons of each library listed at the very beginning: this will help you to make a choice.

---

Thanks to Joe Boyle, Kent C. Dodds, Anna Gerus, Patrick Hund, Monica Lent, Morgan Packard, Alexander Plavinski, Giorgio Polvara, Juho Vepsäläinen.
