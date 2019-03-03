---
layout: Post
title: 'Why robots should format our code for us'
date: 2017-10-08
lang: en
medium: why-robots-should-format-our-code-159fd06d17f7
tags:
  - tools
  - javascript
  - code style
  - prettier
---

I used to think that a personal code style is a good thing for a programmer. It shows you as a mature developer who knows what good code should look like.

My college professors told me that they knew when some of my classmates used my code in their work because of a different code style. Now I think it was because my code was at least somehow formatted and everyone else’s was just a mess.

Since then I’ve spent a lot of time arguing code style and configuring tools to enforce it. I think it’s time for a change.

## A few examples

After reading the [The Programmers’ Stone](https://www.datapacrat.com/Opinion/Reciprocality/r0/index.html) I put braces like this for a long time:

<!-- prettier-ignore -->
```js
if (food === 'pizza')
{
	alert('Pizza ;-)');
}
else
{
	alert('Not pizza ;-(');
}
```

But then I realized that I was probably the only one who did it that way in the frontend community. Everybody else uses this style:

<!-- prettier-ignore -->
```js
if (food === 'pizza') {
	alert('Pizza ;-)');
} else {
	alert('Not pizza ;-(');
}
```

Or this:

<!-- prettier-ignore -->
```js
if (food === 'pizza') {
	alert('Pizza ;-)');
}
else {
	alert('Not pizza ;-(');
}
```

So I’ve changed my style to the last one.

I like this style for chaining very much:

<!-- prettier-ignore -->
```js
function foo(items) {
  return items
    .filter(item => item.checked)
    .map(item => item.value)
  ;
}
```

I see the same refactoring benefits as for [trailing commas](https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8):

<!-- prettier-ignore -->
```js
const food = [
  'pizza',
  'burger',
  'pasta',
];
```

But I’m probably even more lonely with this style than I was with braces. Nobody would ever send me code for review with this style, no linter can enforce it. I have to stop using it too to be closer to the real world.

Another thing that nobody else does except me — I always put two spaces before end-of-the-line comment:

<!-- prettier-ignore -->
```js
const volume = 200;  // ml
```

I thought it improves readability but actually it just makes code base inconsistent because other developers always put one space.

## What JavaScript developers do

Unfortunately JavaScript has no official code style but there are a few [popular code styles](http://blog.sapegin.me/all/javascript-code-styles), like Airbnb or Standard, that you could use to make you code look familiar to other developers.

You could use ESLint to enforce code style and even autoformat code in some cases. But it won’t make your code base 100% consistent. For example ESLint with Airbnb config would normalize only my first example and allow inconsistency in the other two.

## What JavaScript developers should do

Some languages have strict code styles and tools to format code so developers don’t waste time arguing code style: [Refmt](https://facebook.github.io/reason/tools.html) for Reason, [Rustfmt](https://github.com/rust-lang-nursery/rustfmt) for Rust.

Looks like JavaScript finally [has a solution](http://jlongster.com/A-Prettier-Formatter) to this problem: a new tool called [Prettier](https://github.com/prettier/prettier) will reformat your code using its own rules completely ignoring how it was written in the first place.

Let’s [try Prettier](https://prettier.io/) on my examples:

```js
if (food === 'pizza') {
  alert('Pizza ;-)');
} else {
  alert('Not pizza ;-(');
}

function foo(items) {
  return items.filter(item => item.checked).map(item => item.value);
}

const volume = 200; // ml
```

You can disagree with this style, for example I don’t like the `else` placement and writing function chains in one line is questionable. But I see huge benefits in adopting Prettier:

- Almost no decisions to make — Prettier has few options.
- No arguing about particular rules if you’re working in a team.
- No need to learn your project’s code style for contributors.
- No need to fix style issues reported by ESLint.
- Possible to set up autoformat on file save.

## Conclusion

Prettier has been already adopted by [some popular projects](https://github.com/prettier/prettier/issues/1351) like React and Babel. And I’m slowly [converting all my projects](https://github.com/tamiadev/eslint-config-tamia) from my custom code style to Prettier and will recommend it instead of Airbnb code style.

At first I had a lot of “Ugh, that’s ugly” moments with Prettier. But when I think that I’d have to, for example, manually reformat JSX code from a single-line to multi-line when I add another prop and it doesn’t fit on one line — I realize that it’s totally worth it.

![Prettier formatting in action](https://d3vv6lp55qjaqc.cloudfront.net/items/0m1G3V2G3r0t1Z3A0Q3D/Screen%20Recording%202017-06-25%20at%2012.45%20PM.gif)

Read how to [set up Prettier](https://survivejs.com/maintenance/code-quality/code-formatting/) in your project.
