---
layout: Post
title: 'Which JavaScript code style is the most popular'
date: 2017-01-30
lang: en
medium: what-javascript-code-style-is-the-most-popular-5a3f5bec1f6f
tags:
  - tools
  - javascript
  - code style
---

There are two big holy war questions about code style in JavaScript: tabs vs. spaces and semicolons vs. no semicolons. Of course there are more, like where to put a comma in a multiline array declaration, but these two are causing the most casualties.

I was wondering if it’s worth our time. Can we all just adopt the most popular style if there is one, and stop arguing? So I’ve analyzed [100 most depended-upon](https://www.npmjs.com/browse/depended) npm packages and ran a survey with the same questions that ended up with 1169 respondents.

## Tabs or spaces?

![2 spaces (74% on npm, 61% in the survey); 4 spaces (19% on npm, 20% in the survey); tab (7% on npm, 18% in the survey)](/images/javascript-indent.svg)

- Two-space indentation is a clear winner, especially for open source projects.
- Some developers don’t really know what they use. Here’s my favorite answer: “I just press tab and the editor formats it to something else I don’t even know”.

## Semicolons or no semicolons?

![Semicolons (86% on npm, 76% in the survey); no semicolons (14% on npm, 24% in the survey)](/images/javascript-semi.svg)

- Majority of developers write JavaScript with semicolons.

## Linter presets

![No preset (62% on npm, 29% in the survey); AirBnb (1% on npm, 36% in the survey); ESLint (8% on npm, 0% in the survey); Standard (7% on npm, 24% in the survey)](/images/javascript-presets.svg)

npm results:

- Most open source projects do not use any linter presets.
- Many projects have no code style linting at all.
- Huge projects with many packages use their own presets: Babel, Gulp, PostCSS, Facebook.
- Sindre Sorhus uses [xo](https://github.com/sindresorhus/xo).
- I’ve included [eslint:recommended](http://eslint.org/docs/rules/) (ESLint) because it’s relatively popular but it has no code style rules.

Survey results:

- Results are almost the opposite.
- [AirBnb](https://github.com/airbnb/javascript) is the most popular preset.
- [Standard](https://standardjs.com/) is popular too (looks like all developers who don’t use semicolons use Standard).
- Which makes some developers quite angry: “Definitely not that ‘standard’ BS”.

## Linters

![No linter (29% on npm, 7% in the survey); ESLint (48% on npm, 80% in the survey); JSCS (5% on npm, 3% in the survey); JSHint (15% on npm, 9% in the survey)](/images/javascript-linters.svg)

npm results:

- Many open source projects have very basic linting: not more than 10 rules.
- Some projects have `.eslintrc` or `.jshintrc` but do not run linter as a part of tests.
- Some projects have both `.eslintrc` and `.jshintrc`, some even with conflicting rules.

Survey results:

- [Prettier](http://jlongster.com/A-Prettier-Formatter) was released just a few weeks ago but already adopted by quite a few people.
- And has made some people super excited: “Waiting for Prettier to gain more traction!” or “Will use Prettier once major bugs have been fixed”.
- Some developers don’t really care: “Code style doesn’t matter”.

## Conclusion

I was expecting to see numbers closer to 50% for the first two questions. But I was surprised by actual popularity of spaces for indentation in JavaScript: tabs are almost non-existent. Same for semicolons: not as many people aren’t using them as you can imagine reading Twitter.

The results show less diversity in code style of popular open source projects: more than half use 2 spaces with semicolons. Many still don’t use any tooling to validate code style.

It could also be because many popular open source projects are old but in the survey people described what they used on their latest project.

So if you’re starting a new JavaScript project [AirBnb preset](https://github.com/airbnb/javascript) (2 spaces, semicolons, etc.) will be a good choice: your code style will be familiar for many developers.

_Note: two projects of 100 are written in CoffeeScript. CoffeeScript itself is one of them. They and one with only native code were excluded from the results._

_All data and chart sources are [on GitHub](https://github.com/sapegin/jscodestyle)._
