---
layout: Post
title: 'Writing cross-platform components for web and React Native'
date: 2022-04-12
lang: en
tags:
  - frontend
  - javascript
  - react
  - react-native
  - component-driven
---

One of the selling points of React Native is code sharing between web, iOS, and Android — “seamless cross-platform” as they say on the homepage. Unfortunately, React Native gives us very few tools to write components that work on web and native, and the experience is far from seamless.

## Problems of cross-platform development for React Native

The main obstacles to writing cross-platform components with React Native are:

* **Different elements for the web and native**: on web we use `p` and `div`, whereas on native we should use `Text` and `View` from `react-native` package. React Native is also picky about rendering text: we should always wrap it in the `Text` component, and it should be a direct parent.
* **Unforgiving styling**: there’s a custom way of doing [styles on React Native](https://reactnative.dev/docs/style) which looks like CSS but doesn’t behave like CSS. In CSS, if a browser doesn’t understand a certain property, it would ignore it, but React Native will throw an exception, and it supports a very limited number of CSS properties.

[Styled-components](https://styled-components.com/docs/basics#react-native) solve some of the problems on the low level: primarily, it allows us to use the same syntax to write styles for web and native. However, it doesn’t solve the problem of breaking on unsupported properties.

Another issue is the **slowness and generally poor developer experience of the emulators**: iOS, and especially Android. Developing user interfaces using simulators is much harder and slower than using a desktop browser.

## Possible solutions

My current approach is to develop on desktop web and then test on React Native on emulators and actual devices.

This also allows me to use the same setup for end-to-end tests as I use for web: [Cypress and Cypress testing library](https://blog.sapegin.me/all/react-testing-4-cypress/), which is fast to run and easy to write and debug. Then I’d use end-to-end tests with emulators only for smoke tests or functionality that is very different on native platforms.

Following are my solutions to develop cross-platform components for web and React Native, from better to worse.

### Primitive components

Primitive components solve many problems and they shine for cross-platform development. By having components for layout, typography, UI elements, and so on, we could encapsulate all the platform-specific code into these components, and the consumer doesn’t have to care about supporting React Native anymore:

```tsx
<Stack gap="medium">
  <Heading>Do or do not</Heading>
  <Paragraph>There is no try</Paragraph>
  <Button>Try nonetheless</Button>
</Stack>
```

For a consumer, it doesn’t matter that the `Stack` has completely different implementations for web and React Native, and that the `Heading` and `Paragraph` are rendered using different elements. The APIs are the same, and the implementation is hidden.

[Using primitive components](https://www.component-driven.dev/) instead of custom styles is my favorite way of making user interfaces in the past few years, and it works well for cross-platform interfaces most of the time. It gives us the cleanest possible markup and design system constraints (limits our choice of spacing, fonts, sizes, colors, and so on to the ones that are supported by the design system).

**Note:** I only have experience with [styled-system](https://styled-system.com/), which doesn’t support React Native by default and wasn’t updated in two years. There might be a better solution now, and I’d like to know about it!

I’ve implemented [a very primitive React Native support](https://gist.github.com/sapegin/991704a876057393efe3a3f74d4c8c47) by keeping only the first value (for the narrowest screen) of responsive props. So code like this:

```tsx
<Box width={[1, 1/2, 1/4]}>...</Box>
```

Will be rendered like this on React Native:

```tsx
<Box width={1}>...</Box>
```

This isn’t ideal but works okay so far.

### Elements object

Customizing HTML elements of components is a common practice for writing semantic markup. The most common way to do this is by using [the `as` prop in styled-components](https://styled-components.com/docs/api#as-polymorphic-prop), which would require code splitting to work cross-platform because on React Native all HTML elements should be replaced with `View` and `Text` components:

```tsx
// Web
<Stack as="form">...</Stack>

// React Native
import {View} from 'react-native';
<Stack as={View}>...</Stack>
```

The same problem when we use the styled-components factory:

```ts
// Web
const Heading = styled.p`...`;

// React Native
import {Text} from 'react-native';
const Heading = styled(Text)`...`;
```

One way of solving this issue is to create an object with a mapping of elements for both web and React Native, and then use it instead of string literals:

```tsx
// elements.ts
export const Elements = {
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  header: 'header',
  footer: 'footer',
  main: 'main',
  aside: 'aside',
  p: 'p',
  span: 'span',
} as const;

// elements.native.ts
import { View, Text } from 'react-native';
export const Elements = {
  div: View,
  h1: Text,
  h2: Text,
  h3: Text,
  h4: Text,
  h5: Text,
  h6: Text,
  header: View,
  footer: View,
  main: View,
  aside: View,
  p: Text,
  span: Text,
} as const;

// Cross-platform component
import {Elements} from './elements';
<Stack as={Elements.form}>...</Stack>
```

It’s slightly more verbose but the code is split at a lower level and only once, we don’t need to code-split each component and duplicate the code.

**Idea:** Now I think a better way would be encapsulating a mapping inside primitive components and a custom styled-component factory, so we could keep writing `as="form"` or `styled.form`, and it will be transparently converted to the correct elements for React Native. I haven’t tried it yet but I think this idea is worth exploring.

### Code splitting

Code splitting should always be our last resort when better options aren’t available. However, done at the lowest possible level, it could still be a good solution, especially when we need to use some platform-specific APIs.

To split code between web and native, we could use [platform-specific extensions](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions):

```tsx
// Link.tsx
export const Link = ({href, children}) =>
  <a href={href}>{children}</a>

// Link.native.tsx
import { Text, Linking, TouchableWithoutFeedback } from 'react-native';
export const Link = ({href, children}) =>
  <TouchableWithoutFeedback onPress={() => Linking.openURL(href)}>
    <Text>{children}</Text>
  </TouchableWithoutFeedback>
```

This allows us to import platform-specific modules that would break on one of the platforms.

Code splitting is a good option for making primitive components, which we could later use to write cross-platform markup:

```tsx
<Stack gap="medium">
  <Heading>Do or do not</Heading>
  <Paragraph>There is no try</Paragraph>
  <Link href="/try">Try nonetheless</Link>
</Stack>
```

## Conclusion

Writing cross-platform components for web and React Native isn’t as smooth as promised but by choosing the right abstractions we could make it less painful, and improve the readability and maintainability of the code.

My main advice to create cross-platform interfaces is:

**Write platform-specific code on the lowest possible level.**

Improve your primitive components, so you don’t have to write custom styles and split code too much.

And [let me know](https://twitter.com/iamsapegin) if you have any better ideas!
