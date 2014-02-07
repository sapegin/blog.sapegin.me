# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	require('load-grunt-tasks')(grunt)

	debug = !!grunt.option('debug')

	grunt.initConfig
		bower_concat:
			main:
				dest: 'src/files/build/scripts.js'
				exclude: [
					'jquery'
					'modernizr'
				]
		stylus:
			compile:
				options:
					paths: ['src/tamia']
					'include css': true
					use: [
						() -> (require 'autoprefixer-stylus')('last 2 versions', 'ie 9')
						debug or (require 'csso-stylus')
					]
				files:
					'src/files/build/styles.css': 'src/styles/index.styl'
		imagemin:
			options:
				pngquant: true
			main:
				files: [
						expand: true
						cwd: 'src/files/images_src/'
						src: '**/*.{png,jpg,jpeg,gif}'
						dest: 'src/files/images/'
				]
		svgmin:
			options:
				pngquant: true
			main:
				files: [
						expand: true
						cwd: 'src/files/images_src/'
						src: '**/*.svg'
						dest: 'src/files/images/'
				]
		watch:
			options:
				livereload: true
			stylus:
				files: 'src/styles/**'
				tasks: 'stylus'

	grunt.registerTask 'default', ['bower_concat', 'stylus', 'imagemin', 'svgmin']
	grunt.registerTask 'deploy', ['bower_concat', 'stylus']
