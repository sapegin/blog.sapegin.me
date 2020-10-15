---
layout: Post
title: 'The most useful accessibility testing tools and techniques'
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

Shipping accessible features is as essential for a frontend developer as shipping features without bugs. Here is a list of tools I regularly use to make sure everything I do is accessible for folks with different abilities, whether they are blind or holding a sandwich in their hand. I’ll start with tools that will give us immediate feedback when we’re writing code, and continue with tools that we have to run ourselves or guide us on how to test things manually. This article will be useful not only for developers but also for designers, project managers, and other team members — many of the tools could be used directly in the browser and don’t require any technical knowledge.

## Getting started with accessibility testing

If you haven’t done accessibility testing before or you’ve got a project that’s build without accessibility in mind, I’d recommend to start with the following steps to assess the project’s accessibility and start improving it:

1. (For React projects) Install the React ESLint plugin, and fix all reported issues.
2. Run FastPass in the Accessibility Insights browser extension to find two most common accessibility issues, and fix them.
3. Tab through the site or app with a keyboard to test keyboard navigation and focus states.

This won’t make your site or app fully accessible but it’s a good first step in that direction. We’ll talk about each tool and technique in more detail in the rest of the article.

## React ESLint plugin

I like it when someone tells me when I’m doing something wrong as soon as possible without asking myself. The linter is a perfect tool for that because it gives us immediate feedback when I’m writing code, right in the editor.

For React projects, [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) checks many accessibility issues, like missing alternative text on images or incorrect ARIA attributes and roles.

![eslint-plugin-jsx-a11y reports a missing alt attribute on an image](/images/accessibility-eslint.png)

Unfortunately, this plugin is somewhat limited:

- static analysis of the code could only find [few problems](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#supported-rules);
- it only works with plain HTML elements but doesn’t know anything about our custom components.

However, we’re likely already using ESLint on a project, so the cost of having this plugin is minimal, and occasionally it finds issues before we even look at our site or app in the browser.

## Axe-core

[Axe-core](https://github.com/dequelabs/axe-core) is a library that checks the accessibility of the rendered HTML in the browser. This is more powerful than static code analysis, like ESLint, because it can find [more problems](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md), like checking if the text has sufficient color contrast.

There are many tools based on axe-core.

For [Storybook](https://storybook.js.org/), there’s a [a11y addon](https://github.com/storybookjs/storybook/tree/master/addons/a11y):

![Storybook a11y addon reports a missing label on a checkbox](/images/accessibility-storybook.png)

For [React Styleguidist](https://react-styleguidist.js.org/), we could [add react-axe manually](https://react-styleguidist.js.org/docs/cookbook#how-to-use-react-axe-to-test-accessibility-of-components):

![Axe in React Styleguidist reports insufficient color contrast on a button](/images/accessibility-styleguidist.png)

Both don’t check things like the document outline or landmark regions, which would require rendering a complete page. However, we could have quick feedback when we [develop new components in isolation](https://egghead.io/playlists/component-driven-development-in-react-e0bf). We could check each component variant’s accessibility, which is hard to do using the actual site or app.

## Cypress-axe

Unless we test our site or app’s accessibility after every change, we’ll eventually introduce regressions. That’s why it’s essential to make accessibility testing a part of the continuous integration (CI) process. We should never merge the code to the codebase without testing its accessibility.

[Cypress-axe](https://github.com/avanslaars/cypress-axe) is based on axe-core. It allows us to run accessibility checks inside [end-to-end Cypress tests](https://blog.sapegin.me/all/react-testing-4-cypress/), which is good because we likely already run end-to-end tests during continuous integration, and we render all our pages there. We could also run checks multiple times to test pages in different states. For example, with an open modal or an expanded content section.

![Cypress-axe prints accessibility violations in the terminal](/images/cypress-axe-violations.png)

Such tests could be a good accessibility _smoke test_ that makes sure we’re not breaking our site or app. However, cypress-axe is inconvenient to analyze pages that already have accessibility issues. For that, a browser extension, like Axe or Accessibility Insights, would be more convenient.

Read more about [setting up and using cypress-axe](https://blog.sapegin.me/til/testing/detecting-accessibility-issues-on-ci-with-cypress-axe/).

**Tip:** For automated accessibility testing of separate components, [jest-axe](https://github.com/nickcolley/jest-axe) could be a good option.

## Axe browser extension

Axe browser extension for [Chrome](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/) is based on axe-core. However, we run this extension on an actual site or app, so it could find issues that are impossible to find by checking a single component, like correct headings structure or landmark regions.

![Axe Chrome extensions site analysis results](/images/accessibility-axe.png)

This extension is great to do an accessibility audit but we have to remember to run it every time we add or change something on our site or app. Sometimes, it has false negatives, for example, when Axe can’t determine the background color and reports text as having insufficient color contrast.

## Accessibility Insights browser extension

Microsoft’s [Accessibility Insights](https://accessibilityinsights.io/) browser extension is also based on axe-core but has a few unique features.

Accessibility Insights has automated checks similar to the Axe extension, but it also highlights all the issues directly on a page:

![Accessibility Insights page analysis results](/images/accessibility-insights-page.jpg)

Accessibility Insights also has instructions for many manual checks that can’t be automated:

![Accessibility Insights manual checks](/images/accessibility-insights-manual-checks.png)

The FastPass feature finds two most common accessibility issues, and is a good first step in improving site or app’s accessibility.

Finally, it could highlight headings, landmark regions, and tab stops (see “Tab key” below) on a page:

![Accessibility Insights highlights highlight headings, landmark regions, and tab stops on a page](/images/accessibility-insights-highlights.jpg)

## Contrast app and Chrome DevTools contrast checker

Sometimes we need to check the color contrast on a mockup or somewhere else, where running a browser extension is inconvenient or impossible.

To check color contrast in the browser, Chrome DevTools contrast checker is a good option (inspect an element, and click a color swatch in the Styles tab):

![Chrome DevTools color contrast checker](/images/accessibility-devtools-color.png)

For all other cases, use [Contrast app](https://usecontrast.com/), and pick any two colors using an eyedropper:

![Contrast app shows the contrast ratio or two colors](/images/accessibility-contrast.png)

**Bonus:** [Contrast ratio](https://contrast-ratio.com/) web app by Lea Verou is another option when you want to [share a link](https://contrast-ratio.com/#%23fa6b6b-on-white) with the check results.

## Spectrum Chrome extension

[Spectrum browser extension](https://chrome.google.com/webstore/detail/spectrum/ofclemegkcmilinpcimpjkfhjfgmhieb/related) allows us to check how folks with different types of color vision deficiency (color blindness) see our site or app, and make sure there’s enough contrast between different elements.

![Simulating tritanopia with Spectrum Chrome extension](/images/accessibility-spectrum.jpg)

**Bonus:** Chrome DevTools can emulate some of these vision deficiencies. Press Escape, enable the Rendering tab from the three-dot menu button and scroll to the Emulate vision deficiencies section.

## Tab key

By _tabbing_ through the app, meaning pressing the Tab key on the keyboard to navigate between interactive elements on the page, we can check that:

- all interactive elements are focusable and have a visible focus state;
- the tab order [should make sense](https://webaim.org/techniques/keyboard/); usually, it should follow the visual order of elements on the page;
- the focus should be [trapped inside modals](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html), meaning we shouldn’t be able to tab back to the page behind the modal until we close it, and once we close the modal, the focus should go back to the element that opened the modal;
- skip navigation link should appear when we press the Tab key for the first time:

  ![Skip navigation link on GitHub](/images/accessibility-skip-link.png)

Along with the Tab key, it’s worth checking that other keys work as expected: for example, we can navigate lists using arrow keys, or some validation code doesn’t block arrows and Backspace in text fields.

We should be able to complete all important actions in our site or app without touching a mouse, trackpad, or touchscreen. At any time, we should know which element is in focus.

**Tip:** I often use a live expression on `document.activeElement` in Chrome DevTools to see which element is in focus (“Create live expression” button in the Console tab’s toolbar). It helps to find elements without visible focus state, or invisible elements that can be focused.

![Using Chrome DevTools live expression to check which element is in focus](/images/accessibility-live-expression.png)

**Bonus:** [No Mouse Days](https://github.com/marcysutton/no-mouse-days) npm package by Marcy Sutton disables the mouse cursor to encourage better keyboard support in a site or app.

## Zoom

By zooming in our site or app, we can check how it handles, well, zooming. Try to zoom in to 200% in the browser, and see what breaks. Many people (myself included) zoom in when the text is too small for them, so we should make sure that the layout isn’t breaking, the text isn’t cropped, and elements aren’t overlapping each other.

![A page on 200% zoom still looks good](/images/accessibility-zoom.jpg)

**Tip:** Using `rem`s for all sizes in CSS, including media query breakpoints, is usually enough to avoid problems with zooming.

## Screen reader

By using our site or app with a screen reader, we can check that:

- all interactive elements are focusable and have accessible labels;
- tab order, semantic markup, and textual content make sense;
- the skip navigation link brings us directly to the main page content, so we don’t have to listen through all navigation links again and again.

Testing with a screen reader is in many ways similar to testing with a keyboard. Since we can’t see the screen (and I’d recommend turning it off or closing your eyes during testing), we can’t use a mouse or a trackpad to _select_ items on a page, we can only tab to them with a keyboard. The main difference is that we can’t recognize elements like buttons by their look, or can’t connect form inputs with labels by their location. We should define these relationships [using semantic markup or ARIA attributes](https://www.ovl.design/text/inclusive-inputs/).

On macOS, we already have VoiceOver. On Windows, there are built-in Narrator, free [NVDA](https://www.nvaccess.org/), or paid [JAWS](https://www.freedomscientific.com/products/software/jaws/). There’s also [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn/related) that we can install as a Chrome extension.

**Tip:** To get started with VoiceOver, check out [this article](https://bocoup.com/blog/getting-started-with-voiceover-accessibility) and [keep this cheat sheet](https://interactiveaccessibility.com/education/training/downloads/VoiceOver-CommandReference.pdf).

**Bonus:** Use Accessibility tab in Chrome DevTools to check how assisting technologies see a particular element:

![Chrome DevTools Accessibility tab](/images/accessibility-devtools.png)

## There’s always more

A few more things that are worth testing:

- **Browser reading mode** is an accessibility tool itself: it helps readers concentrate on the main content, or make colors readable. We could also use it as a quick way to test the semantic markup of our pages: we should see the main page heading, complete main content, all content images but nothing extra like decorative images or banners.

  ![Reading mode in Microsoft Edge](/images/accessibility-reading-more.png)

- **Reduced motion** is an operating system option that tells sites and apps (via [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query) that the user prefers to minimize non-essential motion on the screen. We could use it to disable animation on things like reveal on scroll or carousels.

- **The dark mode** could be a site or app option or an operating system option that we could read via [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query. We should ensure that our site or app, especially colors, is still accessible in the dark mode.

- **Hover alternatives** for keyboard and touchscreens: hover shouldn’t be the only way to reveal some content or an interactive element. A common example is a menu that appears on hover on an item in a long list. [A tooltip](https://inclusive-components.design/tooltips-toggletips/) is another example. We could show these elements when the container is in focus for keyboard users, and always show them on touchscreens.

**Tip** Use CSS [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) at-rule to test hover support on the device.

**Tip:** We could you Cypress and cypress-axe [to test the accessibility of our site or app in the dark mode](https://www.cypress.io/blog/2019/12/13/test-your-web-app-in-dark-mode/).

## Resources

- [Accessible to all](https://web.dev/accessible/)
- [Color contrast guide](https://usecontrast.com/guide)
- [Accessibility for teams](https://accessibility-for-teams.com/)
- [Web accessibility course](https://www.udacity.com/course/web-accessibility--ud891) by Google
- [The a11y project accessibility checklist](https://www.a11yproject.com/checklist/)
- [Writing HTML with accessibility in mind](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412) by Manuel Matuzovic
- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9) by Manuel Matuzovic
- [Writing CSS with accessibility in mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939) by Manuel Matuzovic
- [Beyond automatic accessibility testing: 6 things I check on every website I build](https://www.matuzo.at/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/) by Manuel Matuzovic
- [Assistive technologies I test with](https://daverupert.com/2018/07/assistive-technologies-i-test-with/) by Dave Rupert
- [Testing web accessibility](https://www.adrianbolonio.com/testing-web-accessibility-part-1/) by Adrián Bolonio
- [16 things to improve your website accessibility (checklist)](https://websitesetup.org/web-accessibility-checklist/) by Bruce Lawson
- [The business case for digital accessibility](https://www.w3.org/WAI/business-case/)
- [Getting Started with VoiceOver & Accessibility](https://bocoup.com/blog/getting-started-with-voiceover-accessibility) by Sue Lockwood

## Conclusion

We’ve covered a lot of different tools and techniques, many of which I use not only to test my work but to be able to use some sites, like zooming in on a site with tiny fonts or using the reading mode on a site with a dark background.

Keep in mind that tools can only detect a some issues, and we should find a balance between automated and manual accessibility testing.

**Manual accessibility testing**, when done right, allows us to find most of the problems. However, it’s time-consuming, and we have to redo it for every new feature of our site or app.

**Automated accessibility testing** is cheap to run, and it keeps the site or app from regressions. However, automated testing could only find certain types of issues.

Please share your favorite accessibility testing tools and techniques [with me](https://twitter.com/iamsapegin)!

---

Thanks to [Eldar Amantay](https://twitter.com/steppe_fox), [Wendy Fox](https://twitter.com/drwendyfox), Anna Gerus, Anita Kiss, [Manuel Matuzovic](https://www.matuzo.at/), [Patrick Smith](https://icing.space/).
