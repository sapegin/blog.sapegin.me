# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	require('load-grunt-tasks')(grunt)

	grunt.initConfig
		stylus:
			compile:
				files:
					'src/files/build/styles.css': 'src/styles/index.styl'
				options:
					paths: ['src/tamia']
					'include css': true
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
			stylus:
				files: 'src/styles/**'
				tasks: 'stylus'

	grunt.registerTask 'default', ['stylus', 'imagemin', 'svgmin']
	grunt.registerTask 'deploy', ['stylus']
