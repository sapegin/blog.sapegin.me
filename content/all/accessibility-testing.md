---
layout: Post
title: 'Accessibility testing tools I use'
description: 'Shipping accessible features is as important for a frontend developer as shipping features without bugs, learn about tools and techniques that will help you achieve that.'
date: 2020-10-07
lang: en
tags:
  - tools
  - accessibility
  - testing
  - cypress
  - axe
  - linting
---

Shipping accessible features is as important for a frontend developer as shipping features without bugs. Here is a list of tools I regularly use to make sure everything I do is accessible for folks with different abilities, whether they are blind or holding a sandwich in their hand. I’ll start with tools that will give us immediate feedback when we’re writing code, and continue with tools that we have to run ourselves, or that guide us how to test things manually. This article will be useful not only for developers but also for designers, project managers and other team members — many of the tools could be used directly in the browser, and don’t require any technical knowledge.

## Getting started with accessibility testing

If you haven’t done accessibility testing before or you’ve got a project that’s build without accessibility in mind, I’d recommend to start with the following steps to assess the project’s accessibility and start improving it:

1. (For React projects) Install the React ESLint plugin, and fix all reported issues.
2. Run automated accessibility checks using the Axe browser extension.
3. Tab throught the site or app with a keyboard to test keyboard navigation and focus states.

We’ll talk about each tool and technique in more detail in the rest of the article.

## React ESLint plugin

I like when someone tells me when I'm doing something wrong as soon as possible, without having to ask myself. And the linter is a perfect tool for that because it gives me an immediate feedback when I’m writing code, right in the editor.

For React projects, [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) checks many accessibility issues, like missing `alt`s on images, or incorrect ARIA attributes and roles.

![eslint-plugin-jsx-a11y reports a missing alt attribute on an image](/images/accessibility-eslint.png)

Unfortunately, this plugin is somewhat limited:

- there’s a limited number of problems that’s possible to find by analyzing source code without running it;
- it only works with plain HTML elements, but doesn’t know anything about our custom components.

However, we’re likely already using ESLint on a project, so the cost of having this plugin is minimal, and occasionally it finds issues before we even look at our code in the browser.

## Axe-core

[Axe-core](https://github.com/dequelabs/axe-core) is a library that check accessibility of the rendered HTML in the browser. This is better than static code analysis, like with ESLint, because it can find [more problems](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md), like checking that text has sufficient color contrast.

There are many tools based on axe-core.

If you’re using [Storybook](https://storybook.js.org/), there's a [a11y addon](https://github.com/storybookjs/storybook/tree/master/addons/a11y):

![Storybook a11y addon reports a missing label on a checkbox](/images/accessibility-storybook.png)

If you’re using [React Styleguidist](https://react-styleguidist.js.org/), you can [add react-axe to it too](https://react-styleguidist.js.org/docs/cookbook#how-to-use-react-axe-to-test-accessibility-of-components):

![Axe in React Styleguidist reports insufficient color contrast on a button](/images/accessibility-styleguidist.png)

Both don’t check things like document outline or landmark regions, which would require rendering a complete app. However, we have a quick feedback when you [develop new components in isolation](https://egghead.io/playlists/component-driven-development-in-react-e0bf), and we could check accessibility of each component variant, which would be hard to do by using the actual site or app.

## Cypress-axe

Unless we test accessibility of our site or app every time we change them, we’ll eventually introduce regressions. Thats why it’s essential to make accessibility testing a part of the continuous integration (CI) process. No code should be merged to the codebase without testing its accessibility.

[Cypress-axe](https://github.com/avanslaars/cypress-axe) is based on axe-core, and allows us to run accessibility checks inside [end-to-end Cypress tests](https://blog.sapegin.me/all/react-testing-4-cypress/). This is good because we already run end-to-end tests during continuous integration, and we render all our pages there. We could also run checks multiple times, to test pages in different states. For example, with an open modal or an expanded content section.

![Cypress-axe prints accessibility violations in the terminal](/images/cypress-axe-violations.png)

Such tests could be a good kind of _smoke tests_ that make sure we’re not breaking our site or app. However, cypress-axe is inconvenient to analyze pages that already have accessibility issues. For that using a browser extension, like Axe or Accessibility Insights, would be more convenient.

Read more about [setting up and using cypress-axe](https://blog.sapegin.me/til/testing/detecting-accessibility-issues-on-ci-with-cypress-axe/).

**Tip:** For testing accessibility of separate components, [jest-axe](https://github.com/nickcolley/jest-axe) could be a good option.

## Axe browser extension

Axe browser extension is available for [Chrome](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/), and based on axe-core, but we run them on an actual site or app, so they can find issues that are impossible to find by checking a single component, like correct headings structure or landmark regions.

![Axe Chrome extensions site analysis results](/images/accessibility-axe.png)

These extensions are great for quick testing, but we have to remember to run them every time we add or change something in our site or app. They also have false negatives sometimes, for examples, when Axe can’t determine the background color and reports text as having insufficient contrast.

## Accessibility Insights browser extension

Microsoft’s [Accessibility Insights](https://accessibilityinsights.io/) browser extension is also based on axe-core but has a few unique features.

Accessibility Insights has automated checks similar to the Axe extension, but it also highlights all the issues directly on a page:

![Accessibility Insights page analysis results](/images/accessibility-insights-page.jpg)

Accessibility Insights also has instructions for many manual checks that can’t be automated:

![Accessibility Insights manual checks](/images/accessibility-insights-manual-checks.png)

And it could highlight headings, landmark regions, and tab stops (see “Tab key” below) on a page:

![Accessibility Insights highlights highlight headings, landmark regions, and tab stops on a page](/images/accessibility-insights-highlights.jpg)

## Contrast app and Chrome DevTools contrast checker

Sometimes we need to check the color contrast on a mockup or somewhere else, where running Axe is inconvenient or impossible.

To check color contrast in the browser, Chrome DevTools contrast checker is a good option (inspect an element, and click a color swatch in the Styles tab):

![Chrome DevTools color contrast checker](/images/accessibility-devtools-color.png)

For all other cases, use [Contrast app](https://usecontrast.com/), and pick any two colors using an eyedropper:

![Contrast app shows the contrast ratio or two colors](/images/accessibility-contrast.png)

**Bonus:** [Contrast ratio](https://contrast-ratio.com/) web app by Lea Verou is another option, when you want to [share a link](https://contrast-ratio.com/#%23fa6b6b-on-white) with the check results.

## Spectrum Chrome extension

[Spectrum extension](https://chrome.google.com/webstore/detail/spectrum/ofclemegkcmilinpcimpjkfhjfgmhieb/related) allows us to check how folks with different types of color vision deficiency (color blindness) see or site or app, and make sure there’s enough contrast between different elements.

![Simulating tritanopia with Spectrum Chrome extension](/images/accessibility-spectrum.jpg)

**Bonus:** Chrome DevTools can emulate some of these vision deficiencies. Press Escape, enable the Rendering tab from the three-dot menu button, and scroll to the Emulate vision deficiencies section.

## Tab key

By _tabbing_ through the app, meaning pressing the Tab key on the keyboard to navigate between interactive elements on the page, we can check that all interactive elements are focusable and have visible focus state. The tab order [should make sense](https://webaim.org/techniques/keyboard/), usually it should follow the visual order of elements on the page. Focus should be [trapped inside modals](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html), meaning we shouldn’t be able to tab back to the page behind the modal until we close it, and once we close the modal, the focus should go back to the element that opened the modal. Skip navigation link is another thing we can test here: it should appear when we press Tab for the first time:

![Skip navigation link on GitHub](/images/accessibility-skip-link.png)

Along with the Tab key, it’s worth checking that other keys work as expected: for example, we can navigate lists using arrow keys, or arrows and Backspace in text fields aren’t blocked by some validation code.

We should be able to complete all important actions in our site or app without touching a mouse, trackpad or touchscreen. At any time we should know which element is in focus.

**Tip:** I often use live expression on `document.activeElement` in Chrome DevTools to see which elements is in focus (“Create live expression” button in the toolbar of the Console tab). It helps to find elements without visible focus state, or invisible elements that can be focused.

![Using Chrome DevTools live expression to check which element is in focus](/images/accessibility-live-expression.png)

**Bonus:** [No Mouse Days](https://github.com/marcysutton/no-mouse-days) npm package by Marcy Sutton disables the mouse cursor to encourage better keyboard support in our site or app.

## Zoom

By zooming in our site or app, we can check how it handles, well, zooming. Try to zoom in to 200% in the browser, and see what breaks. Many people (me included) zoom in when the text is too small for them, so we should make sure that the layout isn’t breaking, text isn’t cropped, and elements aren’t overlapping each other.

![A page on 200% zoom still looks good](/images/accessibility-zoom.jpg)

**Tip:** Using `rem`s for all sizes in CSS, including media query breakpoints, is usually enough to handle zooming well.

## Screen reader

By using our site or app with a screen reader we can check that all interactive elements are focusable, have accessible labels; tab order, semantic markup and textual content make sense. Skip navigation link should bring us directly to the main page content, so we don’t have to listen though all navigation links again and again.

Testing with a screen reader is in many ways similar to testing with a keyboard. Since we can’t see the screen (and I’d recommend to turn it off or close your eyes during testing), we can’t use a mouse or a trackpad to _select_ items on a page, we can only tab to them with a keyboard.

On macOS, we already have VoiceOver. On Windows there are built-in Narrator, free [NVDA](https://www.nvaccess.org/) or paid [JAWS](https://www.freedomscientific.com/products/software/jaws/). There’s also [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn/related) that we can install as a Chrome extension.

**Tip:** To get started with VoiceOver checkout [this article](https://bocoup.com/blog/getting-started-with-voiceover-accessibility) and [keep this cheat sheet](https://interactiveaccessibility.com/education/training/downloads/VoiceOver-CommandReference.pdf).

**Bonus:** Use Accessibility tab in Chrome DevTools to quickly check how assisting technologies see a particular element:

![Chrome DevTools Accessibility tab](/images/accessibility-devtools.png)

## There’s always more

A few more things that’s worth testing:

- **Browser reading mode** is an accessibility tool itself: it helps readers concentrate on the main content, or make colors readable. Also, we could use it as a quick way to test semantic markup of our pages: we should see main page heading, complete main content, all content images but nothig extra like decorative image or banners.

  ![Reading mode in Microsoft Edge](/images/accessibility-reading-more.png)

- **Reduced motion** is an operating system option that tells sites and apps (via [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query) that the user prefers to minimize non-essential motion on screen. We could use it to disable animation on things like reveal on scroll or carousels.

- **Dark mode** could be a site or app option, or could be an operating system option that we could read via [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query. We should make sure that our site or app, especially colors, is still still accessible in dark mode.

**Tip:** We could you Cypress and cypress-axe [to test accessibility of our site or app in dark mode](https://www.cypress.io/blog/2019/12/13/test-your-web-app-in-dark-mode/).

## Resources

- [Accessible to all](https://web.dev/accessible/)
- [Color contrast guide](https://usecontrast.com/guide)
- [Accessibility for teams](https://accessibility-for-teams.com/)
- [Web accessibility course](https://www.udacity.com/course/web-accessibility--ud891) by Google
- [The a11y project accessibility checklist](https://www.a11yproject.com/checklist/)
- [Beyond automatic accessibility testing: 6 things I check on every website I build](https://www.matuzo.at/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/) by Manuel Matuzovic
- [Assistive technologies I test with](https://daverupert.com/2018/07/assistive-technologies-i-test-with/) by Dave Rupert
- [Testing web accessibility](https://www.adrianbolonio.com/testing-web-accessibility-part-1/) by Adrián Bolonio
- [16 things to improve your website accessibility (checklist)](https://websitesetup.org/web-accessibility-checklist/) by Bruce Lawson
- [The business case for digital accessibility](https://www.w3.org/WAI/business-case/)
- [Getting Started with VoiceOver & Accessibility](https://bocoup.com/blog/getting-started-with-voiceover-accessibility) by Sue Lockwood

## Conclusion

Keep in mind that tools can only detect a limited number of issues, and we should find a balance between automated and manual accessibility testing.

**Manual accessibility testing**, when done right, allows us to find most of the problems. However, it’s time-consuming and we have to redo it for every new feature of our site or app.

**Automated accessibility testing** is cheap to run, and it keeps the site or app from regressions. However, automated testing could only find certain types of issues.

Share your favorite accessibility testing tools and techniques [with me](https://twitter.com/iamsapegin)!

---

Thanks to [Eldar Amantay](https://twitter.com/steppe_fox), Anita Kiss, [Manuel Matuzovic](https://www.matuzo.at/), [Patrick Smith](https://icing.space/).
