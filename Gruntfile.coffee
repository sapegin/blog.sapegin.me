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
		imgo:
			all:
				src: 'src/files/images/*'
		watch:
			stylus:
				files: 'src/styles/**'
				tasks: 'stylus'

	grunt.registerTask 'default', ['stylus', 'imgo']
	grunt.registerTask 'deploy', ['stylus']
