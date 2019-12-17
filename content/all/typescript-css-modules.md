---
unpublished: true
layout: Post
title: 'How to use CSS Modules with TypeScript and webpack'
date: 2017-05-11
lang: en
medium: css-modules-with-typescript-and-webpack-6b221ebe5f10
tags:
  - tools
  - typescript
  - javascript
  - css
  - css modules
  - webpack
---

_[Watch this lesson on Egghead](https://egghead.io/lessons/webpack-import-css-modules-with-typescript-and-webpack)._

Using CSS Modules with TypeScript is not as obvious as with JavaScript. The reason is that TypeScript has special treatment for `import`s and if you try to use CSS Modules the same way you did in JavaScript:

```js
import s from './Button.css';
```

You’ll get an error: “Cannot find module './Button.css'”. There are several ways to fix that.

## The easy way

You can bypass TypeScript import magic by using `require` instead of `import`:

```js
const s = require('./Button.css');
```

It’s processed by webpack as usual but you won’t have type check and autocomplete for CSS class names.

## The better way

To use `import` you need typings for CSS. For example, you have `Button.css` like this:

```css
.foo {
  color: chocolate;
}
.barBaz {
  color: tomato;
}
```

Now you need `Button.css.d.ts` like this:

```js
export const foo: string;
export const barBaz: string;
```

[typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader) is a drop-in replacement for css-loader that generates typings for CSS on the fly. Let’s install it:

```bash
npm install --save-dev typings-for-css-modules-loader
```

Then update your webpack config:

```js
module: {
  rules: [
    {
      test: /\.css$/,
      include: path.join(__dirname, 'src/components'),
      user: [
        'style-loader',
        {
          loader: 'typings-for-css-modules-loader',
          options: {
            modules: true,
            namedExport: true
          }
        }
      ]
    }
  ];
}
```

Now you can import styles like this:

```js
import * as s from './Button.css';
```

Type check and autocomplete will work as expected:

![CSS Modules class names autocomplete in the editor](/images/typescript-css-modules.png)
