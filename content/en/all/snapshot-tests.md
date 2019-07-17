---
layout: Post
title: 'What’s wrong with snapshot tests'
date: 2019-01-17
lang: en
tags:
  - javascript
  - jest
  - react
  - testing
---

When Jest [announced snapshot tests](https://jestjs.io/blog/2016/07/27/jest-14) in 2016, I was [very excited](/all/react-jest). It felt like a perfect solution for testing React components. Since then I’ve written fewer and fewer snapshot tests. In this article I’ll try to explain why.

I’ll talk mostly about testing React components, because that’s where I’ve used or have seen snapshots the most, but the same can be applied to testing other things.

## Why snapshots are problematic

### Easy to commit snapshots with bugs

When you write `expect(mycomponent).toMatchSnapshot()`, Jest creates a snapshot file, like `mytest.spec.js.snap`, with all snapshots of your test file. You don’t see this file unless you really want to.

That’s a problem: you don’t know if your code is correct yet and, unless you carefully read each line of your snapshot file, you may commit code with a bug and a snapshot that ensures that the bug is still there.

### Failures are hard to understand

It’s often hard to see what changed by looking at the snapshot failure diff: did the snapshot fail because of your intended changes or because you’ve introduced a bug?

![Big unreadable snapshot diff](/images/monster-snapshot.png)

### We tend to update snapshots without thinking

On a big project a simple change can lead to failures in dozens of snapshots in different parts of the codebase. Understanding each failure takes a lot of time, so often developers just update snapshots without looking at them at all, especially if it’s not their code.

### Coupling with low level modules

Snapshots — especially if you don’t use shallow rendering — often break on changes in low level components or on third-party packages updates.

A little change in a Button component may lead to a failure of hundreds of snapshots, even when everything works fine. A Button component is an implementation detail, and tests should pass if a button still behaves like a button.

### Test intentions are hard to understand

Snapshot tests like “should render the default state of a component” are common but don’t really explain what exactly, if anything, they’re testing.

Such snapshots will break on _any_ change to markup, even if the behavior remains the same.

### A false sense of security

Snapshots don’t verify that the component _looks_ the same as before and don’t verify that the component behavior is correct. Despite this it’s easy to believe that they do, and make tests that don’t actually _test_ anything, but give you high test coverage.

Snapshots only verify that the component renders (meaning its HTML, not how it looks in the browser) the same thing, which is rarely important knowledge.

![“You can delete the test that is failing”](/images/remove-snapshot.jpg)

_Hint: visual snapshots is a way to verify that your component *looks* the same as before. There are many tool, like [Percy](https://percy.io/), [Chromatic](https://www.chromaticqa.com/) or [Shutter](https://shutter.sh/), to do that._

## What to use instead of snapshots

Let’s look at a typical test (I’ve written similar tests myself):

```jsx
test('show a success message after submission', () => {
  const { getByText } = render(<Form />);
  expect(wrapper).toMatchSnapshot();
  fireEvent.click(getByText('Send an owl'));
  expect(wrapper).toMatchSnapshot();
});
```

We have two snapshots here: both will break on any markup change. Intention of both isn’t clear. The first is likely covered by other test cases, so we can remove it. In the second we likely want to know if the success message was shown instead of a form, which isn’t at all clear from the code. We can test exactly that:

```jsx
test('show success message after submission', () => {
  const { getByText, getByTestId } = render(<Form />);
  fireEvent.click(getByText('Send an owl'));
  // The form has gone
  expect(getByTestId('message-form')).not.toBeDefined();
  // The success message is here
  expect(
    getByTestId('message-alert').textContent
  ).toMatchInlineSnapshot(`Owl has been sent!`);
});
```

The test intention is now clear: we click the submit button and instead of a form we see a success message. This test won’t fail because of primitive components or third-party dependencies updates. This test won’t fail because of the layout changes that don’t affect the behavior.

_Hint: I’m using the [react-testing-library](https://kentcdodds.com/blog/effective-snapshot-testing/) by Kent C. Dodds in this example._

## When to use snapshots

I think snapshots are still useful in some cases:

- Very short output with clear intent, like class names or error messages:

```js
expect(className).toMatchInlineSnapshot(
  `Box Text Text--align-center Text--variation-warning`
);
```

- When you _really_ want to verify that the output is the same:

  Babel plugins are a good example of that, see [babel-plugin-tester](https://github.com/babel-utils/babel-plugin-tester):

```js
exports[`macros basic usage: basic usage 1`] = `
"
import wcImport from \\"../macro\\";
const asyncModule = wcImport(\\"./MyComponent\\");

      ↓ ↓ ↓ ↓ ↓ ↓

const asyncModule = import(/* webpackChunkName: MyComponent */ \\"./MyComponent\\");

"
`;
```

## Snapshot dos

- Use [inline snapshots](https://jestjs.io/docs/en/snapshot-testing.html#inline-snapshots) to make snapshots visible inside the test file and to help you to keep them small.

```js
expect(error).toMatchInlineSnapshot(`Error: Out of cheese!`);
```

- Use [snapshot property matchers](https://jestjs.io/docs/en/snapshot-testing.html#property-matchers) to avoid storing generated values, like dates or IDs.

```js
expect(user).toMatchSnapshot({
  createdAt: expect.any(Date),
  id: expect.any(Number)
});
```

- Use descriptive snapshot names to make it easier to spot when a snapshot is incorrect.

For example, compare:

```js
exports[`<Animal /> should handle some test case`] = `null`;
exports[
  `<Animal /> should handle some other test case`
] = `<strong>dog</strong>`;
```

To:

```js
exports[`<Animal /> should render null`] = `null`;
exports[
  `<Animal /> should render an animal name`
] = `<strong>dog</strong>`;
```

With the latter it’s clear when a snapshot is wrong, like this:

```js
exports[`<Animal /> should render null`] = `<strong>dog</strong>`;
exports[`<Animal /> should render an animal name`] = `null`;
```

_Hint: [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) have two rules, [prefer-inline-snapshots](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-inline-snapshots.md) and [no-large-snapshots](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md), that may help you keep your snapshots healthy._

## Snapshot don’ts

- Avoid snapshotting file paths: they’ll fail on other platforms because of different delimiters (`\` vs `/`).
- Avoid snapshotting dates and times: even if the date depends only on the input, it may be different in another time zone, and your tests will fail.

## Conclusion

Snapshots are useful in _some rare_ cases, but often they give you a false sense of security while making the codebase harder to change.

Check out the [Effective Snapshot Testing](https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca) article by Kent C. Dodds for more ideas on how to use snapshot tests.

---

P. S. [Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet) and [React Testing Examples](https://react-testing-examples.com/) will answer most questions you may have when writing Jest tests.

Thanks to Oliver Joseph Ash, Ovidiu Cherecheș, Manjula Dube, Matt Hamlin, Patrick Hund, Oleg Isonen, Morgan Packard, Oliver Turner and Andy Wermke for their feedback.
