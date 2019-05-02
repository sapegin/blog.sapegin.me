---
layout: Post
title: 'View Source 2016'
date: 2016-09-16
lang: en
medium: view-source-2016-893b6503d782
tags:
  - events
  - education
  - conferences
---

[View Source](https://viewsourceconf.org/berlin-2016/) is a conference organised by Mozilla, was held on September 12–14 in Berlin, Germany, for the first time in Europe.

![Chris Wilson at View Source 2016](/images/view-source-2016.jpg)

## First day talks

**Opening keynote: State of the web** by [Hadley Beeman](https://twitter.com/@hadleybeeman). [Slides](http://www.slideshare.net/DanielleAVincent/hadley-beeman-the-state-of-the-web). [Video](https://www.youtube.com/watch?v=fZGD6zHH5uQ).

- The future isn’t built yet.
- We don’t all agree what the future should be.
- We need you to help create the future.
- The rules are fluid, because we make them. We have the ability to shape the web. What should it be?

**Design for non-designers** by [Tracy Osborn](https://twitter.com/@limedaring). [Slides](https://speakerdeck.com/limedaring/design-for-non-designers-pygotham). [Video](https://www.youtube.com/watch?v=lsPrhA_m6ss).

- Developers can’t escape at least some designing: site for open source project or just a home page.
- Fastest way for better looking designs: cut down on clutter.
- Reduce number of fonts and colors, line things up.
- Whitespace is the ultimate clutter reducer.
- Make it easy to find and use the most important action.
- Content principles: less is more, big paragraphs are a sign of clutter, break into bullets.
- Headlines: talk benefits, not details, keep it short, use natural and friendly language.
- Good artists copy, great artists steal: use work of others as inspiration. Designing without inspiration is like programming without Stack Overflow.
- [Colourlovers](http://www.colourlovers.com/), [Beautiful Web Type](http://hellohappy.org/beautiful-web-type/), [Typewolf](https://www.typewolf.com/).
- [A Simple Web Developer’s Guide To Color](https://www.smashingmagazine.com/2016/04/web-developer-guide-color/).
- [Upcoming book](https://hellowebapp.com/web-design/) about web design.

**Inclusive markup: you don’t need a framework for that** by [Estelle Weyl](https://twitter.com/@estellevw). [Slides](http://instartlogic.github.io/p/overkill/berliin.html). [Video](https://www.youtube.com/watch?v=FN3g39bnSRA).

- Original purpose of frameworks is normalization of browser features like `addEventListener`: not relevant anymore.
- Frameworks are good: faster, optimized and readable code.
- But you don’t need jQuery to add a class.
- Using frameworks developers are not learning basics of web development.
- Frameworks don’t guarantee accessibility: you need to understand the output you’re generating.
- Semantic markup is one of the core principles of an accessible web. For example, different `input` types.
- Average web page size has grown by 351% since 2010.
- Frontend requirements: progressive enhancement, accessibility, performance, security, user experience and design, good taste, social skills, communication and writing, teaching, debate, documentation…
- [Resume Driven Development](http://rdd.io/) (RDD).

**You might not need a CSS framework** by [Belen Albeza](https://twitter.com/ladybenko) from Mozilla. [Slides](https://belen-albeza.github.io/talk-css-frameworks/). [Video](https://www.youtube.com/watch?v=5FdHqVDlXu0).

- Why people use frameworks: they believe it’s quicker and best practice, already implemented design.
- Quicker? Not true for most projects with custom design.
- Good for back office, prototypes and projects without a designer.
- Problems: unsemantic, bloated HTML, unused rules, hard to override styles (too specific), opinionated.
- Why use class to disable a button instead of `disabled` attribute? Why use two classes for a colored label?
- Use Flexbox for layouts today. Use CSS Grid for layouts tomorrow.
- Don’t include a whole framework if you just need a grid or a few UI components.

**Node versions: how do they work?** by [Myles Borins](https://twitter.com/@thealphanerd) from IBM. [Slides](https://kni.sh/view-source-2016/). [Video](https://www.youtube.com/watch?v=JOR2ne84QQg).

- Versions are confusing but you don’t have to understand everything to contribute in a meaningful way.
- Stop using Node 0.10 and 0.12 because OpenSSL used in these versions will stop updating in December.
- Do not use odd versions in production. Use 4.x now. Maybe.
- Next month 6.x will become LTS with 30 month support cycle and lots of ES6 goodies.
- Smoke testing: run tests for the most popular npm modules to ensure no breaking changes.
- Tools: [branch-diff](https://github.com/rvagg/branch-diff), [changelog-maker](https://github.com/rvagg/changelog-maker).

**Type is your right! Performance and web typography** by [Helen Holmes](https://twitter.com/@helenvholmes) from Mozilla. [Slides](http://www.slideshare.net/DanielleAVincent/helen-v-holmes-type-is-your-right). [Video](https://www.youtube.com/watch?v=emLfXChvVPQ).

You can read about most of these things in Helen’s article [What is Beautiful Web Typography](http://helenvholmes.com/writing/type-is-your-right).

- Use OpenType features in CSS: kerning, ligatures, etc.
- Use [OpenType Sandbox](http://clagnut.com/sandbox/css3/) to check what features are available in a font.
- Custom fonts have performance issues that could be fixed.
- Prevent the FOIT (flash of invisible text).
- Minimize the FOUT (flash of unstyled text).
- Minimize FOFT (flash of faux text): choose closest safe font, tweak size to match custom font.
- Load regular, italic and bold separately.
- Tools: [fontfaceonload](https://github.com/zachleat/fontfaceonload), [utility-opentype](https://github.com/kennethormandy/utility-opentype), [Normalize-OpenType.css](http://kennethormandy.com/journal/normalize-opentype-css).

**Things you can do in ES6 that can’t be done in ES5** by [Dan Shappir](https://twitter.com/@danshappir) from Wix.com. [Slides](https://docs.google.com/presentation/d/1rBV0tPiJVqvRsnxscNk_axf-I7IS2pyiR82M6Xp5mDw/edit). [Video](https://www.youtube.com/watch?v=GbVAMgU3Jj0).

- ES6 is mostly syntactic sugar: arrow functions, destructuring, default function parameters, template strings, classes, etc.
- It’s good: you want the syntax to be friendly.
- What ES6 can do is what Babel can do.
- Map can be emulated in ES5 but much slower.
- WeakMap and Proxy can’t be emulated in ES5.

**Closing keynote: Resilience** by [Jeremy Keith](https://twitter.com/@adactio). [Slides](http://www.slideshare.net/DanielleAVincent/jeremy-keith-resilience). [Video](https://www.youtube.com/watch?v=W7wj7EDrSko).

- First version of HTML had 21 tag, HTML 5 has 121.
- HTML and CSS have loose error handling. Show content, skip tags and properties they don’t understand. Browser doesn’t stop parsing when it finds an error.
- [The first site](http://info.cern.ch/hypertext/WWW/TheProject.html) still works in modern browsers.
- HTML and CSS are declarative and resilient, JavaScript is imperative and fragile.
- Make core functionality available using the simplest technology, then enhance.
- Developer convenience shouldn’t be more important than user needs.

## Second day talks

**Opening keynote: existing in tech** by [Lena Reinhard](https://twitter.com/@lrnrd) from Travis CI. [Slides](http://www.slideshare.net/DanielleAVincent/lena-reinhard-existing-in-tech). [Video](https://www.youtube.com/watch?v=vpUY_ryWtc8).

- The tech industry is not hospitable to humans.
- How to survive in tech:
  - remember that you matter;
  - use the power of language;
  - practice self care;
  - do only one thing, but do the one thing;
  - get professional help;
  - set and enforce boundaries;
  - learn to recognize warning signs;
  - be open about your experiences;
  - remember that you’re not alone;
  - know there’s a spaceship, you can leave;
  - support others.

**Laying out the future with Grid and Flexbox** by [Rachel Andrew](https://twitter.com/@rachelandrew). [Slides](http://www.slideshare.net/rachelandrew/laying-out-the-future-66003922). [Video](https://www.youtube.com/watch?v=ibeF6rbzD70).

- CSS wasn’t designed for layouts: floats, `inline-block`, `display: table`, absolute and relative positioning, lots of frameworks.
- Hopes for the future: [Flexbox](https://drafts.csswg.org/css-flexbox/), [CSS Grid Layout](https://drafts.csswg.org/css-grid/), [Box Alignment](https://drafts.csswg.org/css-align/).
- [Grid by Example](http://gridbyexample.com/).
- Separation of source order and display order.
- CSS Grid automatic placement: fantastic for a photo gallery, not so good for a form.
- [On CSS accessibility and drinking tea](https://vimeo.com/180566024) — Léonie Watson at CSS Day 2016.
- It’s 2016. We can finally centre things.
- Responsive by default.
- [Flexbox Tester](https://madebymike.com.au/demos/flexbox-tester/).
- Flexbox is for one-dimensional layout, CSS Grid is for two-dimensional layout.
- Vendor prefixes didn’t work because developers used unfinished features in production and got upset when that features changed.
- Try unfinished features and give feedback: it can be included in the spec.

**Progressive Web Apps is the new Ajax** by [Chris Wilson](https://twitter.com/@cwilso) from Google. [Slides](http://www.slideshare.net/DanielleAVincent/chris-wilson-progressive-web-apps). [Video](https://www.youtube.com/watch?v=EErueQdEXMA).

- The most exciting time in web development.
- Average user installs zero app per month.
- Like Ajax it’s about users, not technology.
- User experience needs to be reliable, fast and engaging.
- Reliable: never show a Downasaur.
- Fast: 40% of users abandon sites that take longer than 3 seconds to load.
- Engaging: full screen theming, orientation, auto-adding to home screen, push notifications.
- [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/).
- A promise to the user: works offline, consistent experience, the users is engaged.

**Revolutionize your page: real art direction on the web** by [Jen Simmons](https://twitter.com/@jensimmons) from Mozilla. [Slides](http://jensimmons.com/presentation/revolutionize-your-page-real-art-direction-web). [Video](https://www.youtube.com/watch?v=5Z7lSSMwRgo).

- Paper magazines use layout to communicate an idea of a story, web articles all look the same.
- Many modern sites use same layouts dictated by our tools.
- [The Experimental Layout Lab of Jen Simmons](http://labs.jensimmons.com/).
- Little pieces: initial letter, viewport units, object fit, clip path, CSS shapes.
- Use CSS Feature Queries to check browser support.
- Big pieces: Flexbox, CSS Grid Layout, Alignment.
- CSS Grid is a framework built in a browser.
- Learn Flexbox by playing a game: [Flexbox Defense](http://www.flexboxdefense.com/), [Flexbox Froggy](http://flexboxfroggy.com/).
- Tools: [Firefox Nightly](https://nightly.mozilla.org/), where Grid just works, [CSS Grid Inspector](https://addons.mozilla.org/en-US/firefox/addon/css-grid-inspector/) for Firefox, [CSS Shapes Editor](http://razvancaliman.com/writing/css-shapes-editor-chrome/) for Chrome.
- Don’t work — don’t use is a bad approach.
- You can use and don’t use enhancements at the same time with CSS.
- In one year we will have 60–80% support of CSS Grid.
- Start learning Grid now and you’ll understand it when it starts shipping in browsers.

**Doing the unstuck: how to make browsers compatible with the web** by [Mike Taylor](https://twitter.com/miketaylr) from Mozilla. [Slides](https://miketaylr.com/pres/viewsourceconf/). [Video](https://www.youtube.com/watch?v=q2kK_wd1xzY).

- New browser features can break existing sites.
- Specs are changing to match reality: existing implementations in browsers.
- Once we add this garbage pile of hacks, the web is actually usable.
- Read standards.
- Test in pre-release versions of browsers: [Firefox](https://www.mozilla.org/en-US/firefox/developer/), [Edge](https://insider.windows.com/), [Safari](https://developer.apple.com/safari/technology-preview/), [Chrome](https://www.google.com/chrome/browser/canary.html), [Opera](http://www.opera.com/computer/beta).
- Report bugs to browsers: [Firefox](https://bugzilla.mozilla.org/), [Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/), [Safari](https://bugs.webkit.org/), [Chrome](https://bugs.chromium.org/p/chromium/issues/list), [Opera](https://bugs.opera.com/wizard/desktop) or [webcompat.com](https://webcompat.com/).

**I’m offline, cool! What now?** by [Ola Gasidlo](https://twitter.com/@misprintedtype) from Styla. [Slides](http://www.slideshare.net/DanielleAVincent/ola-gasidlo-cool-what-now-im-offline). [Video](https://www.youtube.com/watch?v=ksIEPbdpuYQ).

- Network is progressive enhancement.
- SVG over IMG, base64 over IMG (but base64 is expensive and heavy).
- Save data locally and frequently, use partial updates.
- Define flexible data schema: prevent merge conflicts.
- Security: use CORS, encrypt local data, use [JSON Web Tokens](https://jwt.io/).
- Rethink how to use technology, by thinking about the issue. Not about the tools.
- Tools: [jakecache](https://github.com/kenchris/jakecache), [CouchDB](http://couchdb.apache.org/), [PouchDB](https://pouchdb.com/).

**Web, meet virtual reality** by [Dominique Hazael-Massieux](https://twitter.com/@dontcallmeDOM) from W3C. [Slides](https://www.w3.org/2016/Talks/dhm-vr-viewsource/#/title). [Video](https://www.youtube.com/watch?v=DSzfFCrCrmk).

- VR is not just visual: WebGL, WebVR, Gamepad API, Web Audio, 3D camera and computer vision.
- [A-Frame](https://aframe.io/): create virtual reality using markup.

**Closing keynote: the future of the web — progressive web apps and beyond** by [Robert Nyman](https://twitter.com/@robertnyman) from Google. [Slides](http://www.slideshare.net/robnyman/the-future-of-the-web-cold-front-conference-2016). [Video](https://www.youtube.com/watch?v=2vu5TucZVUw).

- Web declared dead in 2010. Web very much alive in 2016!
- 800 Million users of mobile Chrome in November 2015 → 1 Billion in May 2016.
- Progressive web apps: instant loading, add to home screen, push notifications, fast, secure, responsive.
- What about the future?
- Automatic sign-in.
- Paying for things on the web.
- 66% of purchases on mobile are on web, 66% fewer conversions on mobile sites vs. desktop.
- Checkout forms today: manual, tedious, slow, many taps.
- Autofill fills web forms with a single click: 25% increase in conversion rate.
- Checkout with Autofill: automatic, simple, still slow, still many taps.
- [PaymentRequest](https://www.w3.org/TR/payment-request/): a W3C API to eliminate checkout forms for users and standardize payment collection for sites.
- Checkout with PaymentRequest: automatic, simple, fast, single tap.
- Connecting with hardware: Bluetooth Low Energy (BLE), WebNFC, generic sensors.
- Our job isn’t about frameworks or discussions about semicolons, it’s about people.

## Discussion corners

**Sustainable Open-Source Projects** with [Jan Lehnardt](https://twitter.com/@janl).

Based on [Jan’s article](http://writing.jan.io/2015/11/20/sustainable-open-source.html).

- Treat contributors as people.
- Have a Code of Conduct.
- Always recruit contributors.
- Document everything, document decision making process.
- Make detailed issues instead of fixing bugs yourself.

**New and upcoming Web APIs** with Florian Scholz and Jean-Yves Perrier.

- APIs: easy to use but limited or harder to use but allow anything?
- Any standard is a very long process: making things possible is more important then a nice API.
- Browsers have to support all past technologies.
- People maintaining documentation (like [MDN](https://developer.mozilla.org/en-US/)) have to constantly update documentation to reflect changing specs, but they also have to maintain documentation to all past technologies.

**Why developers need to learn Design** with [Emanuele Libralato](https://twitter.com/iamtenko).

- [Slides](http://www.slideshare.net/EmanueleLibralato/why-developers-should-learn-design-viewsource-2016).
- [Stop looking for Designers… Become one!](https://medium.com/@iamtenko/stop-looking-for-designers-become-one-291993a4f195#.h9kcogxbn)

## Some takeaways

- Mobile apps are finally dying: learn how to build progressive web apps.
- Learn CSS Grid today: you’ll need it tomorrow.
- Learn how your framework works: you might not need it.
- Vendor prefixes → pre-release browser channels to test new features.
- People finally understood that we’re here not to write code but to help our users.
- New words: Downasaur (dinosaur in Chrome when you’re offline), [Lie-Fi](http://www.urbandictionary.com/define.php?term=lie-fi&defid=8688575).

## Some closing notes

I’ve enjoyed the conference very much. I like that it wasn’t about just technology but about how to apply technology and that’s inspiring. Topics were very diverse but not too hardcore.

## Links

- [My photos](https://artemsapegin.pixieset.com/viewsource2016/).
- [Official photos](https://www.flickr.com/photos/viewsourceconf/).
