---
layout: Post
lang: en
title: 'My frontend methodology: OPOR (One Page of Rules), or BEM for small sites'
date: 2013-05-06
tags:
  - html
  - css
  - projects
---

I like BEM. But I’m not Yandex, Google or any other huge company that builds all the internet so I found BEM is too strict for me.

The point of OPOR (One Page of Rules) is that all rules and recommendations are contained on a single page. It combines best parts of [BEM](https://en.bem.info/), [SMACSS](https://smacss.com/) and [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/). It’s not a religion and it’s suitable for any small to medium project.

## CSS classes names

Almost the same style as in BEM. Blocks are `.block`, elements are `.block__elem`, but modifiers are `.block_modifier` instead of `.block_property_value`.

## Cascade usage

Allowed for:

- To define context. E. g. block should look differently on light and dark backgrounds: it can be achieved by using a modifier or using a cascade (adding context class to body tag or to parent block).

```css
.logo {
  color: saddlebrown;
}
.page_about .logo {
  color: ghostwhite;
}
```

- To use semantic classless tags in user-generated content (articles, comments, etc.).

<!-- prettier-ignore -->
```css
.text ul {}
.text p {}
```

- (Very rarely) when you are sure you will never put nested block with the same tag.

```html
.social-button i { /* Icon */ }
<div class="social-button"><i></i></div>
```

## Mixins

Kind of OOCSS. It’s a normal block but intended to extend another (primary) block, to add some look or behavior.

```css
.scrollable
a.fake
```

## States

It’s like modifier but you can use it with any block or element. Very useful in JavaScript.

```css
.is-expanded
.is-visible
.is-highlighted
```

## JS-hooks

You shouldn’t use CSS classes used to style content to select elements in JavaScript. (Except states.)

```css
.js-files
.js-select
.js-item
```

## Wrappers

Don’t imply any semantics, use it for appearance only.

```html
<div class="header">
  <div class="header-i"></div>
</div>
```

## Caveats

1. Preferred classes order in HTML: blocks, mixins, JS-hooks, states:

```html
<div class="upload-files scrollable js-files is-hidden"></div>
```

## Other methodologies

- [BEM](https://en.bem.info/)
- [SMACSS](https://smacss.com/)
- [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
- [MCSS](https://github.com/operatino/MCSS)

## Links

- [About HTML semantics and frontend architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
- [Code smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/)
- [Pragmatic, practical font sizing in CSS](https://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/)
- [Single-direction margin declarations](https://csswizardry.com/2012/06/single-direction-margin-declarations/)
- [The media object saves hundreds of lines of code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
- [Writing the best CSS when building with HTML5](https://toddmotto.com/writing-the-best-css-when-building-with-html5/)
- [My Stylus framework](https://github.com/tamiadev/tamia)
