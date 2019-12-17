---
layout: Post
title: 'React Amsterdam 2016'
date: 2016-04-20
lang: en
medium: react-amsterdam-2016-20e1052b09f1
tags:
  - javascript
  - education
  - events
  - conferences
  - react
---

[React Amsterdam](https://react.amsterdam/) is the first conference about React in Amsterdam, Netherlands.

![My friends and speakers at React Amsterdam 2016](/images/react-amsterdam-2016.jpg)

The conference day started from a personal transport disaster. My hotel, that was booked by my employer’s travel agency, was in very inconvenient location in 15 minutes by bus from the Schiphol airport. There’s just one bus route that goes from the airport and on weekends it doesn’t work: you have to change to another bus. And my bus didn’t come in the morning so I had to walk two kilometers for another station. Then in the airport I found out that there was no train to the city on this weekend because of some maintenance work and I had to take a temporary bus. So I spent 2,5 hours to get to the conference venue.

## Venue

The conference was at the [Pllek](http://pllek.nl/) that located at [NDSM Wharf](http://www.ndsm.nl/en/), a former ship wharf on a IJ river bank, now a hipster place. It’s in 10 minutes by a free ferry from the Amsterdam Central Station.

Pllek is a cool and very authentic place with a nice view but it was a bit chilly because it’s close to the water.

## Conference

The conference was very well organized, all talks were in time. The food was strange but it’s the Netherlands after all. Actually that mix of gyoza and varenyky was nice. The only bad thing was terrible chairs.

I think 30-minute talks are the best. Speakers don’t have time to be too boring.

There should be a tool to preview how your slides will look on a projector: often the contrast was too low.

Unfortunately I haven’t won a cool t-shirt. Maybe next year.

## Talks

### Migrating safely to React

[Jamis Charles](https://twitter.com/jamischarles), PayPal. [Video](https://youtu.be/sXDZBxbRRag), [slides](https://speakerdeck.com/jamischarles/react-amsterdam-migrating-safely-to-react).

A talk about migrating PayPal from Backbone to React.

- Start from one small feature, then replace its siblings, then replace its parent.
- Optimize for feature change.
- Use as much vanilla JavaScript as possible.
- We will have to move away from React one day.
- Solve real problems.

### Building loveable UIs

[Henrique Alves](https://twitter.com/healves82), DADI+. [Video](https://youtu.be/rbtmCqBEYpg), [slides](https://speakerdeck.com/henriquea/building-loveable-uis).

- React is a library for building ambitious user interfaces.
- Design components not pages.
- Good component names: `<Card />`, `<Headline />`, `<Headline level={1} />`, `<Link />`.
- Bad component names: `<ImageCard />`, `<StoryTitle />`, `<MasterHeadline />`, `<StoryLink />`.
- Container and presentational components.
- Animation improve usability, feels natural, give feedback.

### JavaScript Style Sheets

[Oleg Slobodskoi](https://twitter.com/oleg008), Chatgrape. [Video](https://youtu.be/BI4frdqSBY4), [slides](http://slides.com/kof/javascript-style-sheets#/).

A talk about [JSS](https://github.com/cssinjs/jss) and problems of CSS by the JSS author. I still think that CSS Modules are more convenient but the talk was very interesting.

- React for components, CSS for documents.
- Problems with CSS: global namespace, dependencies, dead code elimination, minification, sharing constants, non-deterministic resolution, isolation.
- Inline styles solves most of this problems by they don’t support @media, @keyframes, etc. and they are slow.
- JSS generates real CSS.
- JSS itself doesn’t depend on React.
- Don’t be religious. Keep an open mind. Use tools that solve your problems!

### Mastering server-rendered apps

[Sven Anders Robbestad](https://twitter.com/svenardocom), Inmeta Consulting. [Video](https://youtu.be/tlysAZSd45k), [slides](https://speakerdeck.com/reactamsterdam/sven-anders-robbestad-inmeta-consulting-as-oslo-mastering-server-rendered-apps).

Why and how to user server rendering with React.

- Isomorphic → universal → shared?
- Page load is critical: every delay make users go away.
- JavaScript can be slow because of old hardware or slow connection.
- JavaScript can be disabled by NoScript or AdBlock.
- Server rendering makes: Google happy, slow computers happy, smart phones happy, NoScript happy.
- `ReactDOMServer.renderToString` pros: faster render on the client, code reuse, works without JavaScript on the client.
- Cons: complicated server code, relies on a `fetch` method before render, relatively slow.
- [react-dom-stream](https://github.com/aickin/react-dom-stream): sends the first byte much faster than `renderToString` — better perceived performance.

### React Native architecture overview

[Tadeu Zagallo](https://twitter.com/tadeuzagallo), Facebook. [Video](https://youtu.be/Ah2qNbI40vE), [slides](http://www.slideshare.net/TadeuZagallo/react-native-internals).

I’d prefer a simpler overview, looks like I’m not a target audience for this talk.

- No web view, no HTML, no CSS. It’s only JavaScript.
- React Native uses lots of clever techniques.

### Building Reactive GraphQL apps with Apollo

[Martijn Walraven](https://twitter.com/martijnwalraven), Meteor. [Video](https://youtu.be/1Dgt691lXhs), [slides](https://speakerdeck.com/martijnwalraven/apollo-react-amsterdam-2016).

[Apollo](https://github.com/apollographql/apollo) is an interesting project, awesome slides.

- Apollo stack is completely separated from Meteor.
- GraphQL with any backend, any client, any language.
- They are trying to improve GraphQL developer experience.
- [Apollo, the data stack for modern apps](https://medium.com/apollo-stack/apollo-8b7215bcab1c#.yc7ys5o8z).

### React for game development

[Johannes Stein](https://twitter.com/frostney_), Toptal. [Video](https://youtu.be/JaK-RrYPPRk), [slides](http://frostney.github.io/talks/react-for-game-development/).

An unusual but interesting talk about using making games with React.

- Use the tools you’re most familiar with. If that’s React write games in React.
- Many things in game development are easy with React.
- Almost 100% code reuse across platforms in React Native because native components are not used.

### React component library and React WebGL in Liberty Global

Two lightning talks.

[Robert Haritonov](https://twitter.com/operatino), Liberty Global. [Video](https://youtu.be/cvsp7vLAIUk), [slides](https://speakerdeck.com/operatino/the-developers-guide-to-the-react-component-libraries).

- “React is a library to build reusable UI components.” [Christopher Chedeau](https://twitter.com/vjeux)
- Build independent reusable components.
- Tools:
  - [React Styleguidist](https://github.com/styleguidist/react-styleguidist),
  - [React Storybook](https://github.com/storybooks/react-storybook),
  - [SourceJS](https://sourcejs.com/).

[Denis Radin](https://twitter.com/pixelscommander), Liberty Global. [Video](https://youtu.be/2E7JYEOqAyw), [slides](https://speakerdeck.com/reactamsterdam/denis-radin-liberty-global-amsterdam-connect-discover-be-free).

- Abstracting your component rendering lets you render your app in any environment.
- WebGL instead of DOM because DOM requires too much memory and slower.

### Testing React applications

[Jack Franklin](https://twitter.com/jack_franklin), Pusher. [Video](https://youtu.be/KBhHsYlF4mQ), [slides](https://speakerdeck.com/jackfranklin/testing-react-applications-react-amsterdam-2016).

A good introduction to testing in React.

- Most of your logic should exist outside of your components.
- Plain old JavaScript functions are easy to test.
- Never reach into a component to get or set state.
- Use [Enzyme](https://github.com/airbnb/enzyme) instead of React TestUtils.
- Blog post: [Testing React Applications](http://12devsofxmas.co.uk/2015/12/day-2-testing-react-applications/).

### Introducing and implementing React at Coolblue

[Paul van Dam](https://github.com/pcvandamcb), Coolblue. [Video](https://youtu.be/3aHCYceqOrU), [slides](https://speakerdeck.com/reactamsterdam/paul-van-dam-coolblue-rotterdam-introducing-and-implementing-react-at-coolblue).

- “The biggest advantage of using React is the refactorability. It’s easy to refactor and iterate on.” [Leland Richardson](https://twitter.com/intelligibabble).

### Transparent Reactive Programming and Mutable Data Structures

[Michel Weststrate](https://twitter.com/mweststrate). [Video](https://youtu.be/ApmSsu3qnf0), [slides](https://docs.google.com/presentation/d/1tP0VWjproXsZex3R8zWCA7Bra7RtMcu4daJXCUbs8pc/edit?usp=sharing).

Redux fatigue talk about the [MobX](https://github.com/mobxjs/mobx).

- Redux: simple and elegant concept but lots of new things to learn.
- State should be minimally defined:
  - no caching,
  - no data duplication,
  - no cascading state changes,
  - don’t worry about how the app should react to state.
- Everything should be derived:
  - automatically,
  - define derivations and reactions,
  - MobX ensures efficiency and consistency.
- MobX is fast:
  - only track data which is accessed in last render,
  - minimizes amount of computations,
  - `PureRenderMixin`
- MobX is scalable:
  - minimal state,
  - graphs: natural mental model,
  - simple code,
  - architectural freedom,
  - third party friendly.

### Solving a tooling problem for React Native

[Alexey Kureev](https://twitter.com/kureevalexey), [Mike Grabowski](https://twitter.com/grabbou). [Video](https://youtu.be/iF6lNtqFLKY), [slides](https://speakerdeck.com/grabbou/solving-a-react-native-tooling-problem).

Talk about [rnpm](https://github.com/rnpm/rnpm), package manager for React Native. I’m not very interested in the subject but the guys were very well prepared.

- React Native modules contains not only JavaScript but also platform code and assets.
- rnpm will be part of React Native soon.

### The React Native playground

[Joshua Sierles](https://twitter.com/jsierles). [Video](https://youtu.be/fN3AVJuxMIc), [slides](https://speakerdeck.com/reactamsterdam/joshua-sierles-freelance-sevilla-the-react-native-playground).

Talk about [React Native Playground](https://rnplay.org/). Lots of wisdom in this talk even if you’re not interested in React Native.

- React Native docs will have a playground for each component.

## More

- [Lessons learned at React Amsterdam](https://medium.com/@kitze/lessons-learned-at-react-amsterdam-51f2006c4a59#.nzd3vtdr8) by Kitze.
- [My photos](https://www.facebook.com/artemsapegin/media_set?set=a.10154184088118514.1073741838.665893513&type=3).
- [Thomas Huisman’s photos](https://www.facebook.com/media/set/?set=a.266084063741695.1073741830.176263616057074&type=3).
- [Peter Peerdeman’s photos](https://www.flickr.com/photos/peterpeerdeman/sets/72157664928801513).
- [React Amsterdam Twitter](https://twitter.com/reactamsterdam).
