---
layout: Post
title: 'React Finland 2019'
date: 2019-05-02
lang: en
tags:
  - education
  - events
  - conferences
  - react
  - javascript
---

[A conference](https://react-finland.fi/) was held on April 24—26 in Helsinki, Finland. I was there with a workshop on [design systems for React developers](https://react-finland.fi/workshops/#design-systems-for-react-developers) and a talk. [Check out my notes](https://blog.sapegin.me/all/react-finland-2018/) on the last year.

![Sunset in Helsinki](/images/react-finland-2019.jpg)

## The conference

React Finland is one of my favorite conferences. It was my second time and both times I felt good as a speaker. Talks were great: two days with big breaks to have enough time to talk to your friends. I liked the selection of talks: design systems, animation, architecture. The venue (a building with a tower on a photo above) was also good.

## The talks

### MobX — The Journey by [Michel Weststrate](https://twitter.com/mweststrate)

[Slides](https://docs.google.com/presentation/d/12Dd8iYxcA8Wl2yaOE_FNb-MaB7cktUE82JFXVlrO-6U/edit#slide=id.p), [video](https://www.youtube.com/watch?v=MIh1qSHi_Fc).

- If you can’t sell the library, sell the problem.
- “MobX […] tries to enable you to go home early each day.”
- Always keep learning: stay slightly out of your comfort zone.
- Open source good parts: learning, happy users, core contributors, beautiful conferences, awesome people, video tutorials, workshops, book, getting a raise, seeing others succeed.
- Open source bad parts: making your library work with all other libraries, no holidays, now you have two jobs.
- When filing issues, remember: you are asking for free help on something you are being paid for.
- Guard your heart and live a balanced life.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">First <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a> talk by <a href="https://twitter.com/mweststrate?ref_src=twsrc%5Etfw">@mweststrate</a>. <a href="https://t.co/iVpcvD0tlm">pic.twitter.com/iVpcvD0tlm</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121298853641191424?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Append-only development with React: An intro to Behavioral programming by [Luca Matteis](https://twitter.com/lmatteis)

[Slides](https://lmatteis.github.io/finland-talk/assets/player/KeynoteDHTMLPlayer.html), [video](https://www.youtube.com/watch?v=cXuvCMG21Ss).

- “Programming language are practically irrelevant in making products.”
- Code maintenance is the root of the problem.
- Make changes without having to read and maintain the code.
- Newly added code can change how old code is executed.
- [Behavioral programming for JavaScript](https://github.com/lmatteis/behavioral).

### Mind-Reading with Adaptive and Intelligent UIs in React by [David Khourshid](https://twitter.com/DavidKPiano)

[Slides](https://slides.com/davidkhourshid/mind-reading-react-finland#/), [video](https://www.youtube.com/watch?v=ppvi09LIUnU).

- Adapt to people, not just devices.
- Microsoft Clippy is the first adaptive UI.
- A/B tests are ineffective.
- Collect stats on state changes and optimize flows.
- [XState](https://xstate.js.org/docs/).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Clippy in <a href="https://twitter.com/DavidKPiano?ref_src=twsrc%5Etfw">@DavidKPiano</a> talk at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a>. <a href="https://t.co/qh1OTKCfPt">pic.twitter.com/qh1OTKCfPt</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121314491965366272?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### A Common Design Language. Let Designers and Developers talk to each other by [Andrey Okonetchnikov](https://twitter.com/okonetchnikov)

[Slides](https://speakerdeck.com/okonet/a-common-design-language), [video](https://www.youtube.com/watch?v=a6DtiGhKMdk).

- Design: typography, color and spacing.
- Developers talk in code.
- Designers talk in UI primitives.
- Design tools talk in shapes, like arrow and triangles.
- Common language: UI primitives.
- [component-driven.io](https://component-driven.io/): component-driven design & development for the modern web.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">That guy again! <a href="https://twitter.com/okonetchnikov?ref_src=twsrc%5Etfw">@okonetchnikov</a> at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a>. <a href="https://t.co/7UwpGzXaPu">pic.twitter.com/7UwpGzXaPu</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121331678771806210?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### A practical guide to building your design system infrastructure by [Varya Stepanova](https://twitter.com/varya_en)

[Slides](http://varya.me/react-finland-2019/), [video](https://www.youtube.com/watch?v=5_lYTicLUbk).

- Design system is shared practices, tools, processes and community.
- Living style guides: [React Styleguidist](https://react-styleguidist.js.org/), [Storybook](https://storybook.js.org/).
- Visual regression tests.
- Uses Styleguidist to document plain HTML components.
- Reactify HTML: `<button class="button">` → `<button className="button">`.
- Design system site: single source of truth.
- Automate everything.
- Welcome contributions: edit on GitHub button, list of contributors.
- Blogging with WordPress as a backend and Gatsby.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/varya_en?ref_src=twsrc%5Etfw">@varya_en</a> is using <a href="https://twitter.com/styleguidist?ref_src=twsrc%5Etfw">@styleguidist</a> to generate documentation for plain CSS/HTML components with <a href="https://twitter.com/styleguidist?ref_src=twsrc%5Etfw">@styleguidist</a>. <a href="https://t.co/kvhosfxqSl">pic.twitter.com/kvhosfxqSl</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121337236715388928?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### ~~12~~ 8 Tips for More Accessible React Apps by [Manuel Matuzovic](https://twitter.com/mmatuzo)

[Slides](https://www.matuzo.at/blog/12-tips-for-more-accessible-react-apps-slides-react-finland-2019/), [video](https://www.youtube.com/watch?v=NL6XKcX4sxc).

1. Create a sound document outline: start with `h1` and don’t skip levels.
2. Hide content correctly: `display: none`, `visibility: hidden` and `hidden` are hiding content from screen readers, use [a combination of CSS properties](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939) that hides content only visually or [VisuallyHidden](https://github.com/reach/reach-ui/tree/master/packages/visually-hidden) component from Reach UI.
3. Use `<button>` if you need a button: they are focusable by default and support keyboard events.
4. Use fragments to avoid invalid HTML: `<tr><div><td>` → `<tr><><td>`.
5. Take care of focus management: can be a problem for modals, put focus inside a modal on open and don’t let it leave the modal.
6. Make notifications accessible to everyone: use `role="alert"` or `role="status"` to make screen readers announce notifications.
7. Announce page changes: on single page applications screen readers should read the page title on navigation. Check out [Reach Router](https://reach.tech/router).
8. Test your React code automatically: use [React-Axe](https://github.com/dequelabs/react-axe) and [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y).

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Automating heading levels, <a href="https://twitter.com/mmatuzo?ref_src=twsrc%5Etfw">@mmatuzo</a> at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a>. <a href="https://t.co/EZtGeEiXyW">pic.twitter.com/EZtGeEiXyW</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121371724765892613?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Delightful UI animations by understanding the brain by [Bruno Lourenço](https://twitter.com/brunnolou)

[Video](https://www.youtube.com/watch?v=TszRBCc6DQ4).

- Animation — an illusion of movement.
- [React Morph](https://github.com/brunnolou/react-morph): morphing UI transitions.
- Creates a clone of an element and uses [FLIP technique](https://aerotwist.com/blog/flip-your-animations/) to do the morphing animation.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I’m definitely going to try react-morph, it looks incredible! <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a> <a href="https://t.co/3Qgu3csw8o">pic.twitter.com/3Qgu3csw8o</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121413088274784258?ref_src=twsrc%5Etfw">April 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Custom CSS is the path to inconsistent UI by [Artem Sapegin](https://twitter.com/iamsapegin)

[Slides](https://stopwritingcss.netlify.com/), [video](https://www.youtube.com/watch?v=_CsBRkRTzIA).

- We use custom styles mostly for typography, whitespace and layout.
- This leads to inconsistent UI because CSS is too expressive.
- Design tokens are the first step to achieve UI consistency.
- But not all combinations of design tokens are good: you may create unreadable text for example.
- UI primitives (primitive components) is the solution.
- [Text](https://github.com/component-driven/component-driven-development/tree/master/src/components/core/Text) and [Heading](https://github.com/component-driven/component-driven-development/tree/master/src/components/core/Heading) components to render all text in an application.
- [Box, Flex](https://rebassjs.org/grid/) and [Grid (Stack)](https://github.com/sapegin/stack-styled) components to define whitespace and layouts.
- Use [styled-system](https://styled-system.com/) to create such components: works with any CSS in JS library.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">“CSS is too expressive” — <a href="https://twitter.com/iamsapegin?ref_src=twsrc%5Etfw">@iamsapegin</a> <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a> <a href="https://t.co/N5u8qI9Gaj">pic.twitter.com/N5u8qI9Gaj</a></p>&mdash; James Stone (@JAMESSTONEco) <a href="https://twitter.com/JAMESSTONEco/status/1121691073988812800?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Creating layouts that last by [Artem Zakharchenko](https://twitter.com/kettanaito)

[Video](https://www.youtube.com/watch?v=_HrXUB97xQs).

- Spacing is important to build maintainable layout.
- Defining margins and padding directly on components isn’t the most maintainable way.
- [Atomic layout](https://github.com/kettanaito/atomic-layout) is a library to create declarative layouts with CSS Grid.
- [Define layout areas](https://redd.gitbook.io/atomic-layout/general/getting-started/workflow#define-layout-areas) as a string template.
- [Responsive props](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props).
- Render areas using [a render prop](https://redd.gitbook.io/atomic-layout/general/getting-started/workflow#render-areas).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">More layouts, more spacing by <a href="https://twitter.com/kettanaito?ref_src=twsrc%5Etfw">@kettanaito</a> at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a>. <a href="https://t.co/I4GLeV3tpt">pic.twitter.com/I4GLeV3tpt</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121696029060026368?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Scalable (Design) Systems with TypeScript by [Tejas Kumar](https://twitter.com/TejasKumar_)

[Slides](https://tejaskumar.com/static/talks/react-finland-typescript-design-systems.pdf), [video](https://www.youtube.com/watch?v=ZsBW4S8hYMU).

- TypeScript is a good choice for design systems: enforces contracts, confidence to make changes, allows you to scale.
- Uses [React Styleguidist](https://react-styleguidist.js.org/) and TypeScript for their design system.
- Hacked Styleguidist to use TypeScript and Monaco editor in component examples.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">TypeScript editor with autocomplete in <a href="https://twitter.com/styleguidist?ref_src=twsrc%5Etfw">@styleguidist</a> by <a href="https://twitter.com/TejasKumar_?ref_src=twsrc%5Etfw">@TejasKumar_</a> at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a> — super cool! <a href="https://t.co/mycWMeqrxU">pic.twitter.com/mycWMeqrxU</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121729457595850752?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Building resilient frontend architecture by [Monica Lent](https://twitter.com/monicalent)

[Slides](https://monicalent.com/building-resilient-frontend-architecture.pdf), [video](https://www.youtube.com/watch?v=brMZLmZ1HR0).

- Refactoring only temporarily helps with technical debt.
- Second system effect: the tendency of small, elegant, and successful systems to be succeeded by over-engineered, bloated systems because of inflated expectations and overconfidence.
- “‘Legacy code’” often differs from its suggested alternative by actually working and scaling.” — Bjarne Stroustrup.
- The real cost of software is not the initial development, but maintenance over time.
- Architecture as enabling constraints: constraints about how we use data and code that help us move faster over time.
- Shared dependencies: add them to the design system or copy-paste.
- Decoupled code is better than DRY.

Three constraints you can use today for more resilient frontend architecture:

1. Source code dependencies must point inward: don’t depend on other team’s code.
2. Be conservative about code reuse: avoid coupling code that diverges over time.
3. Enforce your boundaries: don’t let people depend on your code (with [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)).

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Monica’s <a href="https://twitter.com/monicalent?ref_src=twsrc%5Etfw">@monicalent</a> talk was my favorite at <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a> — really resonates with me 🤓 <a href="https://t.co/2NwSZ41BFC">pic.twitter.com/2NwSZ41BFC</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121780167720960000?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### “Intuitive” Tooling by [Carolyn Stransky](https://twitter.com/carolstran)

[Slides](https://speakerdeck.com/carolstran/intuitive-tooling), [video](https://www.youtube.com/watch?v=nBy8y39Pvp4).

- Hard to learn things: TypeScript, Redux, GraphQL, Gatsby, Flexbox.
- “We mistake familiarity for simplicity” — [Jim Fisher](https://www.youtube.com/watch?v=1vvjiJFsT-Y&t=2367s).
- [Spiral of silence](http://noelle-neumann.de/scientific-work/spiral-of-silence/).
- Empathy matters more in education.
- Start an internal mentorship program.
- Ban words like “easy” from your vocabulary.
- Just because you understand something doesn’t mean that someone else will too.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Flexbox is hard to learn — definitely agree with <a href="https://twitter.com/carolstran?ref_src=twsrc%5Etfw">@carolstran</a> <a href="https://twitter.com/hashtag/ReactFinland?src=hash&amp;ref_src=twsrc%5Etfw">#ReactFinland</a>. <a href="https://t.co/TLExVyWvJC">pic.twitter.com/TLExVyWvJC</a></p>&mdash; Artem Sapegin ☕ (@iamsapegin) <a href="https://twitter.com/iamsapegin/status/1121781711312949248?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Links

- [Sketch notes](https://ebaytech.berlin/react-finland-2019-sketch-notes-64316793809e) by Patrick Hund
- [The first day](https://gist.github.com/just-boris/c5489afd181bb0bbd2501cfbbe9f56b7) and [the second day](https://gist.github.com/just-boris/2080a0595464c1554ea8b03005984f09) notes by Boris Serdiuk (includes lightning talks)
- [My photos](https://photos.app.goo.gl/YEQ8VaCbzKGbZw8m7)
- [Shared photo album](https://photos.app.goo.gl/4tJskvEd1haKyBX1A)
