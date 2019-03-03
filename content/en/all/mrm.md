---
unpublished: true
layout: Post
title: 'Automating open source project configuration with Mrm'
date: 2017-12-03
medium: automating-open-source-project-configuration-with-mrm-7f67fd55a9b0
lang: en
tags:
  - tools
  - oss
  - javascript
---

_[Watch my talk](https://www.youtube.com/watch?v=5tHfAf4bRcM) with the same name at React Open Source meetup._

We use many tools, like linters, test runners and continuous integration, to make our life as developers easier. But maintaining configuration for these tools is far from easy, especially if you want up-to-date configs in all your projects. [Mrm](https://github.com/sapegin/mrm) tries to solve this problem.

## What’s the problem

The only thing that many times was preventing me from extracting some generic function to a separate package is a need to copy and modify a dozen of config files — all that `.somethingrc`s — just to publish a 50-line function.

![Typical open source project on GitHub: lots of configuration files for just a single file with the source code](/images/typical-oss.png)

These support files are usually only _slightly different_ in all your projects. For example, a `.gitignore` file has `node_modules` and editor artifacts that you want to share between all your projects, but some projects have extra lines there that you don’t want in other projects. We need a way to keep in sync the common parts but allow per-project customizations.

Template-based tools, like Yeoman, are good for initial project bootstrapping but don’t work well for updates: they would overwrite a file with a new version and you’ll lose your customizations.

## What’s Mrm

[Mrm](https://github.com/sapegin/mrm) takes a different approach. It works like [codemods](https://www.sitepoint.com/getting-started-with-codemods/): instead of a template that would overwrite everything, you’re describing in code how to _modify_ or create files to achieve the desired state of the file.

### Minimal changes

Mrm tries to do minimal changes by inferring indentation style or reading it from the EditorConfig, and keeping comments in JSON files.

### Minimal config

It has minimal required configuration: it’ll use values from the project itself or from the environment, like reading your name and email from your Git or npm configs.

### Focused but rich API

Mrm has utilities to work with popular config file formats: JSON, YAML, INI and new line separated text files; install npm packages; and file operations.

This allows you to create smart _tasks_, so the result depends on your project needs.

## Available tasks

Mrm has [many tasks](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-preset-default) out of the box: CodeCov, EditorConfig, ESLint, .gitignore, Jest, lint-staged, Prettier, semantic-release, React Styleguidist, stylelint, Travis CI, TypeScript, package.json, contributing guidelines, license and readme file. You can create your own task or combine multiple tasks using aliases.

For example, the [Jest task](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-jest):

- adds npm scripts to run Jest;
- adds configuration to `package.json` if needed;
- updates `.gitignore`, `.npmignore`, `.eslintignore` with common patterns;
- installs Jest, `babel-jest`, `ts-jest` or Enzyme if needed;
- tries to get rid of Mocha and AVA configs and dependencies;
- suggests to us `jest-codemods` if projects used other test frameworks.

![Running Mrm Jest task in terminal](/images/mrm-jest.png)

Or the [gitignore task](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-gitignore) that will add new lines to the `.gitignore` file but won’t remove per-project customizations:

![New lines in the .gitignore file after running Mrm Gitignore task](/images/mrm-gitignore.png)

## Installation and usage

Install Mrm from npm:

```
npm install -g mrm
```

And run like this:

```
mrm gitignore
mrm license --config:licenseFile LICENSE
```

Or run Mrm via [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) without installation:

```
npx mrm gitignore
npx mrm license --config:licenseFile LICENSE
```

Optionally, create a config file at `~/.mrm/config.json` or `~/dotfiles/mrm/config.json` instead of passing values via command line:

```json
{
  "github": "sapegin",
  "eslintPreset": "airbnb",
  "aliases": {
    // Aliases to run multiple tasks at once
    "node": ["license", "readme", "editorconfig", "gitignore"]
  }
}
```

See more usage examples and options [in the docs](https://github.com/sapegin/mrm#usage).

## Creating your own tasks

The real power of Mrm is in custom tasks and [mrm-core library](https://github.com/sapegin/mrm-core) that gives you tools to work with config files, dependencies, file operations, etc.

The simplest task could look like this:

```js
// Mrm module to work with new line separated text files
const { lines } = require('mrm-core');

function task() {
  // Read .gitignore if it exists
  lines('.gitignore')
    // Add lines that do not exist in a file yet,
    // but keep all existing lines
    .add(['node_modules/', '.DS_Store'])
    // Update or create a file
    .save();
}

task.description = 'Adds .gitignore';
module.exports = task;
```

See more examples [in the docs](https://github.com/sapegin/mrm#writing-your-own-tasks).

You can save your tasks locally, [publish them on npm](https://github.com/sapegin/mrm#sharing-tasks-via-npm) or combine multiple tasks [in a preset](https://github.com/sapegin/mrm#custom-presets).

## Conclusion

If you have many projects with a similar stack or a big multi-repository project, [Mrm](https://github.com/sapegin/mrm) may be a good way to manage their configuration and could save your time.

Start with default tasks and then write your own or create a preset for your project or organization.

The project is still young — let me know what you think in comments or [GitHub issues](https://github.com/sapegin/mrm/issues).

P.S. Check out our new book on [JavaScript projects maintenance](https://survivejs.com/maintenance/).
