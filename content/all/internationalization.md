---
layout: Post
title: 'Six donts of web app internationalization'
description: 'By avoiding these problems in your app you allow translators do their best job and significantly improve quality of translations on your project'
date: 2020-01-09
lang: en
tags:
  - javascript
  - react
  - internationalization
  - react-intl
---

I wrote these guidelines originally for Wayfair internal frontend documentation. Here’s an adapted and improved version. All examples below are using [React](https://reactjs.org/) and [React Intl library](https://github.com/formatjs/react-intl) but these recommendations are generic for web apps and can be applied with any framework and internationalization library.

## 1. Don’t concatenate strings

Incomplete phrases are hard or even impossible to translate, because the translators don’t see the whole phrase. Also, the order of parts may be different in other languages.

Merge all related parts of a phrase into a single localization string, and use interpolation for dynamic content, instead of splitting a single sentence into multiple localization strings.

**Bad:**

```jsx
<p>
  <FormattedMessage
    id="homepage.firstGreetingText"
    defaultMessage="Hey "
  />
  {name}
  <FormattedMessage
    id="homepage.secondGreetingText"
    defaultMessage=", welcome back!"
  />
</p>
```

**Good:**

```jsx
<p>
  <FormattedMessage
    id="homepage.greetingText"
    defaultMessage="Hey {name}, welcome back!"
    values={{ name }}
  />
</p>
```

_Example: “red pencil” in English would be “crayon rouge” in French (note the reversed order of words)._

## 2. Don’t nest strings

Similar to the previous tip, nested strings are hard to translate because the translators see only part of the phrase.

Keep a complete phrase as a single localization string, and use tag interpolation to add formatting or dynamic elements like links or buttons. This may be different or impossible in your internationalization library.

**Bad:**

```jsx
<p>
  <FormattedMessage
    id="landingPage.termsConditionsText"
    defaultMessage="By selection “Purchase” below, you agree to our <a />."
    values={{
      a: () => (
        <a href={TERMS_URL}>
          <FormattedMessage
            id="landingPage.termsConditionsLink"
            defaultMessage="Terms & Conditions"
          />
        </a>
      )
    }}
  />
</p>
```

**Good:**

```jsx
<p>
  <FormattedMessage
    id="landingPage.termsConditionsText"
    defaultMessage="By selection “Purchase” below, you agree to our <a>Terms & Conditions</a>."
    values={{
      a: (...chunks) => <a href={TERMS_URL}>{chunks}</a>
    }}
  />
</p>
```

## 3. Don’t hardcode punctuation outside localization strings

Different languages may use punctuation differently: for example, different spacing around characters or even different characters.

Put punctuation inside localization strings, instaed of adding it in the code.

**Bad:**

```jsx
<p>
  <FormattedMessage
    id="registration.usernameLabel"
    defaultMessage="Username"
  />
  : <input type="text" />
</p>
```

**Good:**

```jsx
<label>
  <FormattedMessage
    id="registration.usernameLabel"
    defaultMessage="Username:"
  />{' '}
  <input type="text" />
</label>
```

_Example: “Username:” in English would be “Nom d’utilisateur :” in French (note the space before the colon)._

## 4. Don’t reuse translations in different contexts

The same English strings may be translated differently in different contexts, or a translation can be tweaked for a specific page without realizing it would affect other pages.

Create unique localization strings for your features, instaed of reusing phrases that look the same in English in many places.

**Bad:**

```jsx
<FormattedMessage id="bookmark" defaultMessage="Bookmark" />
```

**Good:**

```jsx
<FormattedMessage
  id="productCard.bookmarkButtonLabel"
  defaultMessage="Bookmark"
/>
```

_Example: “Bookmark” heading and “Bookmark” button label in English would be “Закладка” and “Добавить в закладки” in Russian._

## 5. Don’t hardcode pluralization

Many languages have more complicated pluralization rules than English, and have more than two plural forms.

Use your internationalization library pluralization functions, instead of adding _s_ at the end of the word.

**Bad:**

```jsx
<p>
  {resultCount > 1 ? (
    <FormattedMessage id="NumberResults">
      {resultCount} dogs found
    </FormattedMessage>
  ) : (
    <FormattedMessage id="NumberResult">
      {resultCount} dog found
    </FormattedMessage>
  )}
</p>
```

**Bad:**

```jsx
<p>
  <FormattedMessage id="NumberResults">
    {resultCount} dog(s)
  </FormattedMessage>
</p>
```

**Good:**

```jsx
<p>
  <FormattedMessage id="search.numberResults">
    {resultCount, plural, one {# dog} other {# dogs}} found
  </FormattedMessage>
</p>
```

_Example: “1 dog, 2 dogs, 5 dogs” in English and “1 собака, 2 собаки, 5 собак” in Russian._

## 6. Don’t inject HTML into your pages

Injecting HTML from third-parties directly into your pages may break your app or even give hackers the opportunity to get access to your users’ data.

Only send data from the backend and translate text on the frontend, instead of sending already translated text as HTML.

**Bad:**

```jsx
<span dangerouslySetInnerHTML={{ __html: message }} />
```

**Good:**

```jsx
<FormattedMessage
  id="reviews.successMessage"
  defaultMessage="Thanks for sharing! You’ve been entered to win a {amount} shopping spree!"
  values={{ amount }}
/>
```

## Bonus: Don’t use &quot;dumb quotes&quot;

This isn’t rally an internationalization issue but still worth mentioning.

Using incorrect typography characters makes our pages look unprofessional.

Use correct typography characters, like quotes, apostrophe or dashes (`“”’—`), instead of characters that we use in our code (`"'-`).

**Bad:**

```jsx
<FormattedMessage
  id="homepage.lunchCta"
  defaultMessage='Ready to say "lunch!"'
/>
```

**Good:**

```jsx
<FormattedMessage
  id="homepage.lunchCta"
  defaultMessage="Ready to say “lunch!”"
/>
```

## Conclusion

The goal of these best practices is to give translators more context, so they can produce better translations, so your non-English speaking users will have a much better experience. Sometimes a single incorrect or inappropriate translation can prevent a user from understanding the interface and how to use it.

Here are some good resources on internationalization and web typography:

- [Localization content best practices](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices), MDN
- [12 Commandments Of Software Localization](https://www.smashingmagazine.com/2012/07/12-commandments-software-localization/), Smashing Magazine
- [Smart Quotes for Smart People](https://smartquotesforsmartpeople.com/)
- [Quotes & Accents (& Dashes)](http://quotesandaccents.com/)
