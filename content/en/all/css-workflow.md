---
layout: Post
lang: en
title: 'My new CSS Workflow: Stylus, Autoprefixer, CSSO and Grunt'
date: 2013-11-08
tags:
  - tools
  - css
  - stylus
---

I used to use [Nib](http://tj.github.io/nib/) to manage CSS vendor prefixes in [Stylus](http://learnboost.github.io/stylus/). But it has a big problem: it adds a lot of superfluous prefixes for everything.

Now I found a better way: [Autoprefixer](https://github.com/postcss/autoprefixer). It adds all needed vendor prefixes for all browsers, you chose to support, using data from [caniuse.com](http://caniuse.com/).

Here is my `Gruntfile.coffee`:

```coffee
# gruntjs.com

module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)

  debug = !!grunt.option('debug')

  grunt.initConfig
    banner: '/* Author: Artem Sapegin, http://sapegin.me, <%= grunt.template.today("yyyy") %> */\n'
    stylus:
        options:
          banner: '<%= banner %>'
          define:
            DEBUG: debug
          use: [
            () -> require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9')
            debug or require('csso-stylus')
          ]
        compile:
          files:
            'build/styles.css': 'styles/index.styl'
    watch:
      options:
        livereload: true
      stylus:
        files: 'styles/**'
        tasks: 'stylus'

  grunt.registerTask 'default', ['stylus']
```

And all dependencies:

```bash
npm install --save-dev grunt load-grunt-tasks grunt-contrib-stylus grunt-contrib-watch autoprefixer-stylus csso-stylus
```

I use [autoprefixer](https://github.com/jescalan/autoprefixer-stylus) and [csso](https://github.com/sapegin/csso-stylus) as Stylus plugins. I could achieve the same with [autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) and [csso](https://github.com/t32k/grunt-csso) plugins for Grunt but Grunt plugins work with files while Stylus plugins work with variables in memory. So we have just one disk write operation instead of three and configuration is also much simpler.

I also use [CSSO](https://github.com/css/csso) because Autoprefixer do not minify its output. But we don’t need minified code for debugging—that’s why `debug` variable is here. Run `grunt watch --debug` and start working.
