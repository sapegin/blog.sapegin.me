---
layout: Post
title: 'Automate npm releases with semantic-release and human-written change logs'
date: 2016-11-10
lang: en
medium: automate-npm-releases-with-semantic-release-and-human-written-change-logs-2adb1dce487
tags:
  - tools
  - oss
  - projects
---

Making new releases is one of the most boring and tedious tasks in open source.

There are many tools that try to automate publishing and one of the most interesting is [semantic-release](https://github.com/semantic-release/semantic-release). I was avoiding it for a long time because it makes publishing fully automated with change logs generated from commit messages, and I believe that [change logs must be written by humans](http://blog.sapegin.me/all/changelog).

But actually it’s very flexible and I was able to customize it to do exactly what I want:

- Publish a new PATCH version to npm as soon as a fix commit merged to the `master` branch, generate change log from commit messages.
- Postpone MINOR and MAJOR release until a proper change log is written by a project maintainer.
- Generate change log draft: Markdown file with all important commits since the latest release grouped into three sections: breaking changes, new features and bugfixes.

Below I’ll describe my own set of scripts that implements this workflow.

## How it works

1. Semantic-release runs on a CI server.

2. After each successful build it analyzes new commits and see if there’s something to publish.

3. It determines a release type (PATCH, MINOR or MAJOR) by analyzing commit messages (more on that later).

4. It generates a change log:

   a. If the release type is PATCH: from commit messages.

   b. If the release type is MINOR or MAJOR and the latest commit is a change log: uses body of that commit as a change log.

5. Publishes a new version to npm.

6. Publishes change log to GitHub Releases page.

## Install semantic-release

First install semantic-release command line tool:

```bash
npm install -g semantic-release-cli
```

Then run it in your project folder:

```bash
semantic-release-cli setup
```

Enter your npm and GitHub credentials. Choose “Create no `.travis.yml`” if you already have one, otherwise it will be overwritten.

![Setting up semantic-release in terminal](/images/semantic-release.png)

Add these lines to your `travis.yml`:

```yaml
after_success:
  - npm run semantic-release
branches:
  except:
    - /^v\d+\.\d+\.\d+$/
```

## Customize semantic-release

You can change semantic-release behavior with plugins: detect release type, check release requirements (like a change log), generate change log, etc. I made a [package with all plugins](https://github.com/tamiadev/semantic-release-tamia) I need to support my workflow.

First install the plugins:

```bash
npm install --save-dev semantic-release-tamia
```

Then add to your `package.json`:

```json
"release": {
  "analyzeCommits": "semantic-release-tamia/analyzeCommits",
  "generateNotes": "semantic-release-tamia/generateNotes",
  "verifyRelease": "semantic-release-tamia/verifyRelease"
}
```

Run `npm install` and `npm run semantic-release` to test if everything works. You’ll see something like that:

```bash
semantic-release WARN pre semantic-release didn’t run on Travis CI and therefore a new version won’t be published.
semantic-release WARN pre You can customize this behavior using "verifyConditions" plugins: git.io/sr-plugins
semantic-release ERR! pre Failed to determine new version.
semantic-release ERR! pre ENOCHANGE There are no relevant changes, so no new version is released.
```

Which is fine and means two things: semantic-release will not make a release until it runs in a CI environment and you have no changes that could be published.

## Use Git commit message convention

By default semantic-release uses [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#) which I don’t like aesthetically. So I use [a slightly modified convention](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md):

![Git commits following a convention](/images/commits.png)

Each commit message consists of:

1. Type: `Feat` for new feature, `Fix` for bug fix, etc.
2. Subject: short change description.
3. Body (optional): long change description.
4. Footer (optional): breaking changes, GitHub issues references, etc.

Semantic-release uses this tags to find all important commits for the release (`Fix` is important, `Docs` is not) and determine which version (MAJOR, MINOR or PATCH) should be released.

## Write change log for MINOR or MAJOR release

I wrote [a script](https://github.com/tamiadev/semantic-release-tamia#release-process) to help me with change logs.

First run `sr-changelog`. It will create a file with all important commits for the release grouped by type (breaking changes, new features and bugfixes) and open it in your default editor.

Now you can rewrite your change log to make it useful and easy to read for your users.

Then run `sr-changelog commit`. It will make a commit without changes (`git commit --allow-empty`) of type `Changelog` and change log in the commit message body.

## Publish new release

Now you need to `git push` your changes and make some coffee.

![GitHub release notes](/images/github-release.png)

## Caveats

- Do not _merge_ pull requests, _squash_ them into a single commit with a proper message.

- If you forget to do that and want to make a PATCH release:

```bash
git commit -m "Fix: Proper commit message" --allow-empty
```

## Links

- [semantic-release](https://github.com/semantic-release/semantic-release)
- [My plugins and scripts for semantic-release](https://github.com/tamiadev/semantic-release-tamia)
- [My commit message conventions](https://github.com/tamiadev/semantic-release-tamia/blob/master/Convention.md)
- [AngularJS commit message conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
- [How to Write an Open Source JavaScript Library Egghead course](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-automating-releases-with-semantic-release)
- [Why you need to write change logs yourself](http://blog.sapegin.me/all/changelog)
- [Keep a CHANGELOG: Don’t let your friends dump git logs into change logs](http://keepachangelog.com/)
- [Semantic Versioning](http://semver.org/)
