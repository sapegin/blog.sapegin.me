---
layout: post
title: 'Как я работаю с CSS: Stylus, Autoprefixer, CSSO и Grunt'
date: Nov 11, 2013
tags:
  - tools
  - css
---

Раньше я использовал [Ниб](http://visionmedia.github.io/nib/) для добавления CSS-префиксов в [Стилусе](http://learnboost.github.io/stylus/). Но этот способ был неидеальным: Ниб добавлял кучу лишних префиксов.

Теперь я использую [Автопрефиксер](https://github.com/ai/autoprefixer). Он добавляет только нужные префиксы для тех браузеров, которые вы поддерживате, используя данные [caniuse.com](http://caniuse.com/).

Вот мой грантфайл (`Gruntfile.coffee`):

```coffeescript
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

И зависимости:

```bash
$ npm install --save-dev grunt load-grunt-tasks grunt-contrib-stylus grunt-contrib-watch autoprefixer-stylus autoprefixer-csso
```

Я использую [autoprefixer](https://github.com/jenius/autoprefixer-stylus) и [csso](https://github.com/sapegin/csso-stylus) в виде плагинов для Стилуса. То же самое можно было бы сделать и плагинами [autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) и [csso](https://github.com/t32k/grunt-csso) для Гранта, но плагины для Гранта работают с файлами на диске, а плагины для Стилуса — с переменными в памяти. Это позволяет избежать двух лишних операций записи на диск и сильно упрощает грантфайл.

[CSSO](https://github.com/css/csso) нужен, потому что Автопрефиксер не сжимает код при сохранении. А для того, чтобы код не сжимался во время отладки, используется переменная `debug`: просто запускаете `grunt watch --debug` и можно работать.
