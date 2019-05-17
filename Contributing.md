# How to contribute

I love pull requests. And following this guidelines will make your pull request easier to merge.

_[Use GitHub interface](https://blog.sapegin.me/all/open-source-for-everyone/) for simple changes, otherwise follow the steps below._

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor to make sure it uses correct settings.
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.

## Development workflow

Run dev server (it will refresh the page after any changes in JS, styles or content):

```bash
npm start
```

Or for the [Russian version](https://nano.sapegin.ru/):

```bash
npm run start:ru
```

Run linters and format code:

```bash
npm test
```

**Please update npm lock file (`package-lock.json`) if you add or update dependencies.**

## Writing style

When you change content, please follow [the writing style guide](https://github.com/sapegin/writing-style/blob/master/Styleguide.md) to ensure consistent style and formatting.

## Other notes

- If you have commit access to repository and want to make big change or not sure about something, make a new branch and open pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format code, so don’t worry much about code formatting.
- Don’t commit generated files, like minified JavaScript.
