---
layout: Post
lang: en
title: JavaScript and Stylus conditional compilation (debug mode) in Grunt
date: 2014-04-17
tags:
  - tools
  - css
  - stylus
  - javascript
  - grunt
---

Often you want some code to be executed only in development environment but not in production. It’d be convenient to have a tool that will remove such code on deploy.

Debug mode enables when [Grunt](http://gruntjs.com/) runs with `--debug` key. You can determine it in your Gruntfile:

```javascript
var debug = !!grunt.option('debug');
```

We’ll use this variable very soon.

## JavaScript

in [UglifyJS](https://github.com/mishoo/UglifyJS) you can define global variables, kind of preprocessor: variable will be replaced with its value and all the code that became dead (`if (false) { /* Like this */ }` will be removed.

You can define such variables via [command line](https://github.com/mishoo/UglifyJS#usage) or via Gruntfile:

```javascript
uglify: {
  options: {
    compress: {
      global_defs: {
        DEBUG: debug  // That very variable
      }
    }
  },
  main: {
    files: {
      "build/scripts.js": "build/scripts.js"
    }
  }
}
```

Variable usage in JavaScript:

```javascript
/*global DEBUG:true*/
// Debug mode enabled by default (you can do the opposite too)
if (typeof DEBUG === 'undefined') DEBUG = true;

(function() {
  'use strict';

  // …
  if (DEBUG) {
    alert('This alert will be shown only in debug mode');
  }
  // …
})();
```

## Stylus

[Stylus](http://learnboost.github.io/stylus/) is even easier. Gruntfile:

```javascript
stylus: {
  options: {
    define: {
      DEBUG: debug
    }
  },
  compile: {
    files: {
      "build/styles.css": "styles/index.styl"
    }
  }
}
```

And example:

```css
DEBUG ?= true;

div {
  outline: 1px solid #c0ffee if DEBUG;
}
```
