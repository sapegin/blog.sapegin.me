---
layout: Post
title: 'Washing your code: avoid conditions'
description: Conditions make code harder to read and test. They add nesting and make lines of code longer. Each condition increases the minimum number of test cases you need to write.
date: 2019-06-26
lang: en
tags:
  - javascript
  - washingcode
---

<a href="https://leanpub.com/washingcode/"><img src="/images/washing-your-code-cover-small.jpg" width="150" height="194" align="right" /></a>

_You’re reading an excerpt of my upcoming book on clean code, “Washing your code: write once, read seven times.” [Preorder it on Leanpub](https://leanpub.com/washingcode/) or [read a draft online](https://github.com/sapegin/washingcode-book/blob/master/manuscript/book.md)._

_Book table of contents:_

- [Avoid loops](/all/avoid-loops/)
- _Avoid conditions (*this post*)_
- To be continued

Conditions make code harder to read and test. They add nesting and make lines of code longer, so you have to split them into several lines. Each condition increases the minimum number of test cases you need to write for a certain module or function, because instead of a single code path you now have two or more.

## Unnecessary conditions

Many conditions are unnecessary or could be rewritten in a more readable way.

For example you may find code similar to this that returns a boolean value:

```js
const hasValue = value !== NONE ? true : false;
const hasProducts = products.length > 0 ? true : false;
```

`value !== NONE` and `products.length > 0` already give us booleans, so we can avoid the ternary operator:

```js
const hasValue = value !== NONE;
const hasProducts = products.length > 0;
```

And even when the initial value isn’t a boolean:

```js
const hasValue = value ? true : false;
const hasProducts = products.length ? true : false;
```

We still can avoid the condition by explicitly converting the value to a boolean:

```js
const hasValue = Boolean(value);
```

In all cases code without a ternary is both shorter and easier to read.

There are more cases when a condition is unnecessary:

```diff
- const hasProducts = products && Array.isArray(products);
+ const hasProducts = Array.isArray(products);
```

`Array.isArray` returns `false` for any falsy value, no need to check for it separately.

And a more complex but great (and real!) example of unnecessary conditions:

```js
function IsNetscapeOnSolaris() {
  var agent = window.navigator.userAgent;
  if (
    agent.indexOf('Mozilla') != -1 &&
    agent.indexOf('compatible') == -1
  ) {
    if (agent.indexOf('SunOS') != -1) return true;
    else return false;
  } else {
    return false;
  }
}
```

The whole condition block could be replaced with a single expression:

```js
function IsNetscapeOnSolaris() {
  const { userAgent } = window.navigator;
  return (
    userAgent.includes('Mozilla') &&
    userAgent.includes('SunOS') &&
    !userAgent.includes('compatible')
  );
}
```

We’ve eliminated two levels of nesting and quite a lot of boilerplate code, so the actual condition is easier to understand.

## Processing arrays

It’s common to check an array’s length before running a loop over its items:

```js
return getProducts().then(response => {
  const products = response.products;
  if (products.length > 0) {
    return products.map(product => ({
      label: product.name,
      value: product.id
    }));
  }
  return [];
});
```

All loops and array functions, like `.map()` or `.filter()` work fine with empty arrays, so we can safely remove the check:

```js
return getProducts().then(({ products }) =>
  products.map(product => ({
    label: product.name,
    value: product.id
  }))
);
```

Sometimes we have to use an existing API that returns an array only in some cases, so checking the length directly would fail and we need to check the type first:

```js
return getProducts().then(response => {
  const products = response.products;
  if (Array.isArray(products) && products.length > 0) {
    return products.map(product => ({
      label: product.name,
      value: product.id
    }));
  }
  return [];
});
```

We can’t avoid the condition in this case but we can move it earlier and avoid a separate branch that handles the absence of an array. There are several ways to do it, depending on the possible data types.

If our data can be an array or `undefined`, we can use a default value for the function parameter:

```js
return getProducts().then((products = []) =>
  products.map(product => ({
    label: product.name,
    value: product.id
  }))
);
```

Or a default value for the destructured property of an object:

```diff
- return getProducts().then((products = []) =>
+ return getProducts().then(({ products = [] }) =>
```

It’s more tricky if our data can be an array or `null`, because defaults are only used when the value is strictly `undefined`, not just falsy. In this case we can use the `||` operator:

```js
return getProducts().then(products =>
  (products || []).map(product => ({
    label: product.name,
    value: product.id
  }))
);
```

We still have a condition but the overall code structure is simpler.

In all these examples we’re removing a separate branch and dealing with the absence of data by normalizing the input — converting it to an array — as early as possible, and then running a generic algorithm on normalized data.

Arrays are convenient because we don’t have to worry about how many items they contain: the same code will work with a hundred items, one item or even no items.

A similar technique works when the input is a single item or an array:

```js
return getProducts().then(({ products }) =>
  (Array.isArray(products) ? products : [products]).map(product => ({
    label: product.name,
    value: product.id
  }))
);
```

Here we’re wrapping a single item in an array, so we can use the same code to work with single items and arrays.

### Deduplicating an algorithm

Examples in the previous section are introducing an important technique: algorithm deduplication. Instead of having several branches of the main logic depending on the nature of the input, we have just one. But we’re normalizing the input before running the algorithm. This technique can be used in other places.

Imagine you have a article vote counter, similar to Medium, where you can vote multiple times:

```js
const articles = counter();
articles.upvote('/foo');
articles.upvote('/bar', 5);
articles.downvote('/foo');
/* {
 *   '/bar': 5
 * }
 */
```

A naïve way to implement the `upvote` method could be:

```js
function counter() {
  const counts = {};
  return {
    upvote(url, votes = 1) {
      if (url in counts) {
        counts[url] += votes;
      } else {
        counts[url] = votes;
      }
    }
  };
}
```

The problem here is that the main function logic, count increment, is implemented twice: for the case when we already have votes for that URL and when we’re voting for the fist time. So every time you need to update this logic, you need to make changes in two places. You need to write two sets of very similar tests to make sure both branches work as expected, otherwise they’ll eventually diverge and you’ll have hard to debug issues.

Let’s make the main logic unconditional but prepare the state if necessary before running the logic:

```js
function counter() {
  const counts = {};
  return {
    upvote(url, votes = 1) {
      if (!(url in counts)) {
        counts[url] = 0;
      }

      counts[url] += votes;
    }
  };
}
```

Now we don’t have any logic duplication. We’re normalizing the data structure, so the generic algorithm could work with it.

I often see a similar issue when someone calls a function with different parameters:

```js
if (errorMessage) {
  alert(errorMessage);
} else {
  alert(DEFAULT_ERROR_MESSAGE);
}
```

Let’s move a condition inside the function call:

```js
alert(errorMessage || DEFAULT_ERROR_MESSAGE);
```

We’ve removed all code duplication and the code is shorter and easier to read.

## Early return

Applying _guard clauses_, or _early returns_, is a great way to avoid nested conditions. A series of nested conditions, also known as the [arrow anti pattern](http://wiki.c2.com/?ArrowAntiPattern) or _dangerously deep nesting_, is often used for error handing:

```js
function postOrderStatus(orderId) {
  var idsArrayObj = getOrderIds();

  if (idsArrayObj != undefined) {
    if (idsArrayObj.length == undefined) {
      var tmpBottle = idsArrayObj;
      idsArrayObj = new Array(tmpBottle);
    }

    var fullRecordsArray = new Array();
    // 70 lines of code

    if (fullRecordsArray.length != 0) {
      // 40 lines of code
      return sendOrderStatus(fullRecordsArray);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

There are 120 lines between the first condition and its `else` block. And the main return value is somewhere inside three levels of conditions.

Let’s untangle this spaghetti monster:

```js
function postOrderStatus(orderId) {
  let idsArrayObj = getOrderIds();
  if (idsArrayObj === undefined) {
    return false;
  }

  if (!Array.isArray(idsArrayObj)) {
    idsArrayObj = [idsArrayObj];
  }

  const fullRecordsArray = [];

  // 70 lines of code
  if (fullRecordsArray.length === 0) {
    return false;
  }

  // 40 lines of code
  return sendOrderStatus(fullRecordsArray);
}
```

This function is still long but it’s much easier to follow because of simpler code structure.

Now we have maximum one level of nesting inside the function and the main return value is at the very end without nesting. We’ve added two guard clauses to exit the function early when there’s no data to process.

I’m not really sure what the code inside the second condition does, but it looks like it is wrapping a single item in an array, like we did in the previous section.

_And no, I have no idea what `tmpBottle` means, nor why it was needed._

The next step here could be improving the `getOrderIds()` function’s API. It can return three different things: `undefined`, a single item, or an array. We have to deal with each separately, so we have two conditions at the very beginning of the function, and we’re reassigning the `idsArrayObj` variable.

By making the `getOrderIds()` function always return an array, and making sure that the code inside `// 70 lines of code` works with an empty array, we could remove both conditions:

```js
function postOrderStatus(orderId) {
  const orderIds = getOrderIds(); // Always an array

  const fullRecordsArray = [];

  // 70 lines of code
  if (fullRecordsArray.length === 0) {
    return false;
  }

  // 40 lines of code
  return sendOrderStatus(fullRecordsArray);
}
```

Now that’s a big improvement over the initial version. I’ve also renamed the `idsArrayObj` variable, because “array object” doesn’t make any sense to me.

The next step would be out of the scope of this section: the code inside `// 70 lines of code` mutates the `fullRecordsArray`.

## Repeated conditions

Repeated conditions can make code barely readable. Let’s have a look at this function that returns special offers for a product in our pet shops. We have two brands, Horns & Hooves and Paws & Tails, and they have unique special offers. For historical reasons we store them in the cache differently:

```js
function getSpecialOffersArray(sku, isHornsAndHooves) {
  let specialOffersArray = isHornsAndHooves
    ? Session.get(SPECIAL_OFFERS_CACHE_KEY + '_' + sku)
    : Session.get(SPECIAL_OFFERS_CACHE_KEY);
  if (!specialOffersArray) {
    const hornsAndHoovesOffers = getHornsAndHoovesSpecialOffers();
    const pawsAndTailsOffers = getPawsAndTailsSpecialOffers();
    specialOffersArray = isHornsAndHooves
      ? hornsAndHoovesOffers
      : pawsAndTailsOffers;
    Session.set(
      isHornsAndHooves
        ? SPECIAL_OFFERS_CACHE_KEY + '_' + sku
        : SPECIAL_OFFERS_CACHE_KEY,
      specialOffersArray
    );
  }
  return specialOffersArray;
}
```

The `isHornsAndHooves` condition is repeated three times. Two of them to create the same session key. It’s hard to see what this function is doing: business logic is intertwined with low level session management code.

Let’s try to make it simpler:

```js
function getSpecialOffersArray(sku, isHornsAndHooves) {
  const cacheKey = isHornsAndHooves
    ? `${SPECIAL_OFFERS_CACHE_KEY}_${sku}`
    : SPECIAL_OFFERS_CACHE_KEY;

  const cachedOffers = Session.get(cacheKey);
  if (cachedOffers) {
    return cachedOffers;
  }

  const offers = isHornsAndHooves
    ? getHornsAndHoovesSpecialOffers()
    : getPawsAndTailsSpecialOffers();

  Session.set(cacheKey, offers);

  return offers;
}
```

This is already more readable and it could be a good idea to stop here. But if I had some time I’d go further and extract cache management. Not because this function is too long or that it’s potentially reusable, but because cache management distracts me from the main purpose of the function and it’s too low level.

```js
const getSessionKey = (key, isHornsAndHooves, sku) =>
  isHornsAndHooves ? `${key}_${sku}` : key;

const sessionGet = (key, isHornsAndHooves, sku) =>
  Session.get(getSessionKey(key, isHornsAndHooves, sku));

const sessionSet = (key, sku, isHornsAndHooves, value) =>
  Session.set(getSessionKey(key, isHornsAndHooves, sku), value);

function getSpecialOffersArray(sku, isHornsAndHooves) {
  const cachedOffers = sessionGet(
    SPECIAL_OFFERS_CACHE_KEY,
    isHornsAndHooves,
    sku
  );
  if (cachedOffers) {
    return cachedOffers;
  }

  const offers = isHornsAndHooves
    ? getHornsAndHoovesSpecialOffers()
    : getPawsAndTailsSpecialOffers();

  sessionSet(SPECIAL_OFFERS_CACHE_KEY, isHornsAndHooves, sku, offers);

  return offers;
}
```

It may not look much better but I think it’s a bit easier to understand what’s happening in the main function. What annoys me here is `isHornsAndHooves`. I’d rather pass a brand name and keep all brand-specific information in tables:

```js
const BRANDS = {
  HORNS_AND_HOOVES: 'Horns & Hooves',
  PAWS_AND_TAILS: 'Paws & Tails'
};

const getSpecialOffersForBrand = brand =>
  ({
    [BRANDS.HORNS_AND_HOOVES]: getHornsAndHoovesSpecialOffers,
    [BRANDS.PAWS_AND_TAILS]: getPawsAndTailsSpecialOffers
  }[brand]());

const getSessionKey = (key, brand, sku) =>
  ({
    [BRANDS.HORNS_AND_HOOVES]: `${key}_${sku}`,
    [BRANDS.PAWS_AND_TAILS]: key
  }[brand]);

const sessionGet = (key, brand, sku) =>
  Session.get(getSessionKey(key, brand, sku));

const sessionSet = (key, sku, brand, value) =>
  Session.set(getSessionKey(key, brand, sku), value);

function getSpecialOffersArray(sku, brand) {
  const cachedOffers = sessionGet(
    SPECIAL_OFFERS_CACHE_KEY,
    brand,
    sku
  );
  if (cachedOffers) {
    return cachedOffers;
  }

  const offers = getSpecialOffersForBrand(brand);
  sessionSet(SPECIAL_OFFERS_CACHE_KEY, brand, sku, offers);
  return offers;
}
```

Now it’s clear that the only piece of business logic here is `getSpecialOffersForBrand`, and the rest is caching. If we’re using this pattern more than once I’d extract it into its own module, similar to the [memoize function](https://lodash.com/docs/#memoize) from Lodash:

```js
const BRANDS = {
  HORNS_AND_HOOVES: 'Horns & Hooves',
  PAWS_AND_TAILS: 'Paws & Tails'
};

const getSessionKey = (key, brand, sku) =>
  ({
    [BRANDS.HORNS_AND_HOOVES]: `${key}_${sku}`,
    [BRANDS.PAWS_AND_TAILS]: key
  }[brand]);

const sessionGet = (key, brand, sku) =>
  Session.get(getSessionKey(key, brand, sku));

const sessionSet = (key, brand, sku, value) =>
  Session.set(getSessionKey(key, brand, sku), value);

const withSessionCache = (key, fn) => (brand, sku, ...args) => {
  const cachedValue = sessionGet(key, brand, sku);
  if (cachedValue) {
    return cachedValue;
  }

  const value = fn(brand, sku, ...args);
  sessionSet(key, brand, sku, value);
  return value;
};

// --- 8< -- 8< ---

const getSpecialOffersArray = withSessionCache(
  SPECIAL_OFFERS_CACHE_KEY,
  brand =>
    ({
      [BRANDS.HORNS_AND_HOOVES]: getHornsAndHoovesSpecialOffers,
      [BRANDS.PAWS_AND_TAILS]: getPawsAndTailsSpecialOffers
    }[brand]())
);
```

We were able to separate all low level code and hide it in another module.

It may seem like I prefer small functions, or even very small functions, but that’s not the case. The main reason to extract code into separate functions here is a violation of the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle). The original function had too many responsibilities: getting special offers, generating cache keys, reading data from cache, storing data in cache. All of them with two branches for our two brands.

## Tables or maps

One of my favorite techniques on improving _(read: avoiding)_ conditions is replacing them with tables or maps. With JavaScript you can create a table or a map using a plain object.

We’ve just done this as a part of our "special offers" refactoring example above. Let’s have a look at a simpler example now. This example may be a bit extreme, but I actually wrote this code 19 years ago:

<!-- prettier-ignore -->
```js
if (month == 'jan') month = 1;
if (month == 'feb') month = 2;
if (month == 'mar') month = 3;
if (month == 'apr') month = 4;
if (month == 'may') month = 5;
if (month == 'jun') month = 6;
if (month == 'jul') month = 7;
if (month == 'aug') month = 8;
if (month == 'sep') month = 9;
if (month == 'oct') month = 10;
if (month == 'nov') month = 11;
if (month == 'dec') month = 12;
```

Let’s replace the conditions with a table:

```js
const MONTH_NAME_TO_NUMBER = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
};
const month = MONTH_NAME_TO_NUMBER[monthName];
```

There’s almost no boilerplate code around the data, it’s more readable and looks like a table. Notice also that there are no brackets in the original code: in most modern style guides brackets around condition bodies are required, and the body should be on its own line, so this snippet will be three times longer and even less readable.

Or a bit more realistic and common example:

```jsx
const DECISION_YES = 0;
const DECISION_NO = 1;
const DECISION_MAYBE = 2;

const getButtonLabel = decisionButton => {
  switch (decisionButton) {
    case DECISION_YES:
      return (
        <FormattedMessage
          id="decisionButtonYes"
          defaultMessage="Yes"
        />
      );
    case DECISION_NO:
      return (
        <FormattedMessage id="decisionButtonNo" defaultMessage="No" />
      );
    case DECISION_MAYBE:
      return (
        <FormattedMessage
          id="decisionButtonMaybe"
          defaultMessage="Maybe"
        />
      );
  }
};

// And later it's used like this
<Button>{getButtonLabel(decision.id)}</Button>;
```

Here we have a `switch` statement to return one of three button labels.

First, let’s replace the `switch` with a table:

```jsx
const DECISION_YES = 0;
const DECISION_NO = 1;
const DECISION_MAYBE = 2;

const getButtonLabel = decisionButton =>
  ({
    [DECISION_YES]: (
      <FormattedMessage id="decisionButtonYes" defaultMessage="Yes" />
    ),
    [DECISION_NO]: (
      <FormattedMessage id="decisionButtonNo" defaultMessage="No" />
    ),
    [DECISION_MAYBE]: (
      <FormattedMessage
        id="decisionButtonMaybe"
        defaultMessage="Maybe"
      />
    )
  }[decisionButton]);

// And later it's used like this
<Button>{getButtonLabel(decision.id)}</Button>;
```

The object syntax is a bit more lightweight and readable than the `switch` statement.

We can even make this code more idiomatic to React by converting our `getButtonLabel` function into a React component:

```jsx
const DECISION_YES = 0;
const DECISION_NO = 1;
const DECISION_MAYBE = 2;

const ButtonLabel = ({ decision }) =>
  ({
    [DECISION_YES]: (
      <FormattedMessage id="decisionButtonYes" defaultMessage="Yes" />
    ),
    [DECISION_NO]: (
      <FormattedMessage id="decisionButtonNo" defaultMessage="No" />
    ),
    [DECISION_MAYBE]: (
      <FormattedMessage
        id="decisionButtonMaybe"
        defaultMessage="Maybe"
      />
    )
  }[decision]);

// And later it can be used like this
<Button>
  <ButtonLabel decision={decision.id} />
</Button>;
```

Now both the implementation and the usage are simpler.

Another realistic and common example is form validation:

```jsx
function validate(values) {
  const errors = {};

  if (!values.name || (values.name && values.name.trim() === '')) {
    errors.name = (
      <FormattedMessage
        id="errorNameRequired"
        defaultMessage="Name is required"
      />
    );
  }

  if (values.name && values.name.length > 80) {
    errors.name = (
      <FormattedMessage
        id="errorMaxLength80"
        defaultMessage="Maximum 80 characters allowed"
      />
    );
  }

  if (!values.address1) {
    errors.address1 = (
      <FormattedMessage
        id="errorAddressRequired"
        defaultMessage="Address is required"
      />
    );
  }

  if (!values.email) {
    errors.mainContactEmail = (
      <FormattedMessage
        id="errorEmailRequired"
        defaultMessage="Email is required"
      />
    );
  }

  if (!values.login || (values.login && values.login.trim() === '')) {
    errors.login = (
      <FormattedMessage
        id="errorLoginRequired"
        defaultMessage="Login is required"
      />
    );
  }

  if (values.login && values.login.indexOf(' ') > 0) {
    errors.login = (
      <FormattedMessage
        id="errorLoginWithoutSpaces"
        defaultMessage="No spaces are allowed in login."
      />
    );
  }

  if (values.address1 && values.address1.length > 80) {
    errors.address1 = (
      <FormattedMessage
        id="errorMaxLength80"
        defaultMessage="Maximum 80 characters allowed"
      />
    );
  }

  // 100 lines of code

  return errors;
}
```

This function is very long, with lots and lots of repetitive boilerplate code. It’s really hard to read and maintain. Sometimes validations for the same field aren’t grouped together.

But if we look closer, there are just three unique validations:

- a required field (in some cases leading and trailing whitespace is ignored, in some not — hard to tell whether it’s intentional or not);
- maximum length (always 80);
- no spaces allowed.

First, let’s extract all validations into their own functions so we can reuse them later:

```js
const hasStringValue = value => value && value.trim() !== '';
const hasLengthLessThanOrEqual = max => value =>
  !hasStringValue(value) || (value && value.length <= max);
const hasNoSpaces = value =>
  !hasStringValue(value) || (value && value.includes(' '));
```

I’ve assumed that different whitespace handling was a bug. I’ve also inverted all the conditions to validate the correct value, not an incorrect one, which is more readable in my opinion.

Note that `hasLengthLessThanOrEqual` and `hasNoSpaces` only check the condition if the value is present, which would allow us to make optional fields. Also note that the `hasLengthLessThanOrEqual` function is customizable: we need to pass the maximum length: `hasLengthLessThanOrEqual(80)`.

Now we can define our validations table. There are two ways of doing this:

- using an object where keys represent form fields
- using an array

We’re going to use the second option because we want to have several validations with different error messages for some fields, for example a field can be required _and_ have maximum length:

```jsx
const validations = [
  {
    field: 'name',
    validation: hasStringValue,
    message: (
      <FormattedMessage
        id="errorNameRequired"
        defaultMessage="Name is required"
      />
    )
  },
  {
    field: 'name',
    validation: hasLengthLessThanOrEqual(80),
    message: (
      <FormattedMessage
        id="errorMaxLength80"
        defaultMessage="Maximum 80 characters allowed"
      />
    )
  }
  // All other fields
];
```

Now we need to iterate over this array and run validations for all fields:

```js
function validate(values, validations) {
  return validations.reduce((errors, ({field, validation, message}) => {
    if (!validation(values[field])) {
      errors[field] = message;
    }
    return errors;
  }, {})
}
```

One more time we’ve separated the “what” from the “how”: we have a readable and maintainable list of validations (“what”), a collection of reusable validation functions and a `validate` function to validate form values (“how”) that also can be reused.

_Tip: Using a third-party library, like [Yup](https://github.com/jquense/yup) or [Joi](https://github.com/hapijs/joi) will make code even shorter and save you from needing to write validation functions yourself._

You may feel that I have too many similar examples in this book, and you’re right. But I think such code is so common, and the readability and maintainability benefits of replacing conditions with tables are so huge, so it’s worth repeating. So here is one more example (the last one, I promise!):

```js
const getDateFormat = format => {
  const datePart = 'D';
  const monthPart = 'M';

  switch (format) {
    case DATE_FORMAT_ISO:
      return `${monthPart}-${datePart}`;
    case DATE_FORMAT_DE:
      return `${datePart}.${monthPart}`;
    case DATE_FORMAT_UK:
      return `${datePart}/${monthPart}`;
    case DATE_FORMAT_US:
    default:
      return `${monthPart}/${datePart}`;
  }
};
```

It’s just 15 lines of code, but I find this code difficult to read. I think that the `switch` is absolutely unnecessary, and the `datePart` and `monthPart` variables clutter the code so much that it’s almost unreadable.

```js
const DATE_FORMATS = {
  [DATE_FORMAT_ISO]: 'M-D',
  [DATE_FORMAT_DE]: 'D.M',
  [DATE_FORMAT_UK]: 'D/M',
  [DATE_FORMAT_US]: 'M/D',
  _default: 'M/D'
};

const getDateFormat = format => {
  return DATE_FORMATS[format] || DATE_FORMATS._default;
};
```

The improved version isn’t much shorter, but now it’s easy to see all date formats. We’ve extracted the data to a short and readable object, and separated it from the code that accesses the right piece of this data.

## Nested ternaries

A ternary operator is a short one-line conditional operator. It’s very useful when you want to assign one of two values to a variable. Compare an `if` statement:

```js
let drink;
if (caffeineLevel < 50) {
  drink = DRINK_COFFEE;
} else {
  drink = DRINK_WATER;
}
```

With a ternary:

```js
const drink = caffeineLevel < 50 ? DRINK_COFFEE : DRINK_WATER;
```

But nested ternaries are different beasts: they usually make code hard to read and there’s almost always a better alternative:

<!-- prettier-ignore -->
```jsx
function Products({products, isError, isLoading}) {
  return isError
    ? <p>Error loading products</p>
      : isLoading
        ? <Loading />
        : products.length > 0
          ? <ul>{products.map(
              product => <li>{product.name}</li>
            )}</ul>
          : <p>No products found</p>
}
```

This is a rare case when Prettier makes code completely unreadable:

```jsx
function Products({ products, isError, isLoading }) {
  return isError ? (
    <p>Error loading products</p>
  ) : isLoading ? (
    <Loading />
  ) : products.length > 0 ? (
    <ul>
      {products.map(product => (
        <li>{product.name}</li>
      ))}
    </ul>
  ) : (
    <p>No products found</p>
  );
}
```

But maybe it’s intentional, and a sign that we should rewrite it.

In this example we’re rendering one of four UIs based on the status of loading operation:

- a spinner (loading);
- error message (failure);
- a list of products (success);
- messages that there’s no products (also success).

Let’s rewrite this code using the already familiar early return pattern:

```jsx
function Products({ products, isError, isLoading }) {
  if (isError) {
    return <p>Error loading products</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <ul>
      {products.map(product => (
        <li>{product.name}</li>
      ))}
    </ul>
  );
}
```

I think it’s much easier to follow now: all special cases are at the top of the function, and the happy path is at the end.

_We’ll come back to this example later in the book._

---

Start thinking about:

- Removing unnecessary conditions, like conveying an already boolean value to `true` or `false` manually.
- Normalizing the input data by converting absence of data to an array early to avoid branching and dealing with no data separately.
- Normalizing the state to avoid algorithm duplication.
- Caching repeated conditions in a variable.
- Replacing long groups of conditions with tables or maps.

---

_If you have any feedback, [tweet me](https://twitter.com/iamsapegin), [open an issue](https://github.com/sapegin/washingcode-book/issues) on GitHub, or email me at [artem@sapegin.ru](mailto:artem@sapegin.ru). [Preorder the book on Leanpub](https://leanpub.com/washingcode/) or [read a draft online](https://github.com/sapegin/washingcode-book/blob/master/manuscript/book.md)._
