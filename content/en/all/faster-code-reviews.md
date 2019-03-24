---
layout: Post
title: 'How to get your code reviewed faster'
date: 2019-03-22
lang: en
tags:
  - code reviews
  - soft skills
  - work
---

Developers and code reviewers have seemingly conflicting goals: developers want to ship their code fast, reviewers want high code quality. But I think these are two sides of the same goal: keep development velocity high by shipping high quality and maintainable code. Reviewers want to help developers to ship less bugs to production and make code easier to understand so feature improvements can be done faster.

By following these recommendations you could reduce number of code review iterations and ship better code faster.

## Before you start

Every team has its own standards and best practices. In good teams they are well documented. Reading such documentation in advance will save you many code review iterations.

If you’re new to a team, tech stack or an area of the codebase, [pairing with someone](https://medium.com/@oleg008/pair-programming-will-save-you-money-98d3f2fd0bca) more experienced could be a great way to learn and complete your task faster.

Split big tasks into several diffs. Just reading 1000 lines of code will take a reviewer more than an hour and a cup of coffee. And each iteration will require another hour. It’s hard to say when a diff becomes too big, but the general rule of thumb is: the less experience you have, the smaller your diffs should be.

By splitting a big task into smaller ones, you’ll get feedback faster, before you’ve spent too much time on a less than ideal implementation. Even better if you discuss, how you’re going to implement a complex feature, with a more experienced developer before you start working on it.

## Make sure your code is ready

Before sending your code to review, check it for debug code, commented out code and `TODO` comments, make sure all kinds of automated tests, type checks and linters are passing. Make sure there are no new lint warnings, and code is formatted, if you’re using a tool like Prettier.

Manual code reviews are great for improving readability, architecture or accessibility. When reviewers are distracted by catching typos and minor issues that could have been caught by automated checks, they are more likely to miss important problems.

## Do a self review

Think what may be unclear to a person reading the code, what kind of questions they may have, if they don’t know everything you know about the task. Answer these questions by making code more clear or by adding comments explaining why some code is written and why it’s written in a certain way.

If there are obvious simpler alternatives that won’t work for your case, explain why.

These kinds of changes and comments will help everyone who’s going to read the code, not only code reviewers. Good comments may also save your code from accidental “refactoring” that makes code simpler but removes important functionality, when it’s not clear why this “extra” code is needed.

## Show what you’ve done

It helps a lot to see what the code in the diff is actually doing. Explain why the code is needed, what issue it’s trying to fix. Mention related tickets, add screenshots or even GIFs for all your changes.

_Tip: [Kap](https://getkap.co/) is a nice free app to record GIFs on macOS._

## Ask questions

Code review is a great way of sharing knowledge between developers. It works in both directions: from a reviewer to a developer and from a developer to a reviewer. Code review is a dialog where two, or sometimes more, people are working together on improving a piece of code. To make it work, you need to understand each comment and the reasoning behind it.

Keep asking questions until everything is clear: why something is a problem and what’s the proposed solution. Code review comments aren’t always the best place to have long discussions, sometimes it’s better to talk to your reviewer in Slack or in person. It’s a good idea to add a short summary of a such discussion as a comment to your diff.

_Live review_ can be another way to improve communication. In that case the developer and the reviewer will sit together and go though the code. The reviewer will explain all the problems in details and make sure there’s no misunderstanding.

## Don’t do changes for the sake of changes

Reviewers don’t know as much as you do about your task, so some of their suggestions will not make any sense for what you’re doing. There’s no rule that code reviewer is always right, unless it’s a team standard, and even standards have exceptions sometimes. Some suggestions sound good but don’t work in reality.

Use your own judgement, don’t do changes if you see that they aren’t improving the code. Explain why you think that the suggestion doesn’t work for you.

Even if you’ve done the change but don’t like the result, revert it before the next review iteration. A good reviewer will likely notice this too, and ask you to revert the change.

## Don’t ignore comments

You don’t have to agree with everything code reviewer is saying or to apply all their suggestions, but if you just ignore some comment, a code reviewer will likely write it again.

If you’re not going to do a particular suggestion or have tried and it didn’t work, reply to a review comment with a short explanation to avoid any possible misunderstanding.

## Make it clear when you’re done with the changes

Every developer works differently: some will commit all the changes at once, some will commit each change separately. It’s hard for a reviewer to know when you’re done with all their feedback and ready for another iteration.

Writing a short comment like “Ready for another iteration” will make it clear, and you’ll get that another iteration sooner.

## Make the next step

Development is an iterative process, so is code reviewing. Code review suggestions are possible improvements to the current state of the code, not its final state. Often one improvement makes another improvement obvious, and a good reviewer will suggest that improvement.

But you don’t have to wait and lose another iteration: do one more self-review and see what could be the next thing.

For example a reviewer has asked you to simplify three functions and make code more consistent. But after you’ve done it, it’s now clear that all three functions are doing the same thing, and you can replace them with a single function.

## Conclusion

Don’t treat code reviews as a distraction. They are here to help you ship better code and spend less time on future changes. Help reviewers help you.

Start reviewing someone else’s code yourself, even if you can’t approve it. You’ll improve your own coding skills by reading more code and thinking how to make it better.

_Thanks to Anita Kiss, [Oliver Joseph Ash](https://oliverjash.me/), [Matt Hamlin](https://matthamlin.me), [Oleg Isonen](https://twitter.com/oleg008), Alex Orange._
