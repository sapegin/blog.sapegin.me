# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	debug = !!grunt.option('debug')

	require('tamia-grunt')(grunt, {
		tamia:
			author: 'Artem Sapegin, http://sapegin.me'
			src: 'src'
			dest: 'src/files'
			imagesSrc: 'src/files/images_src'
			imagesDest: 'src/files/images'
			modernizr: false
			stylobuild:
				autoprefixer:
					browsers: 'last 2 versions, ie 9'
		concat:
			main:
				nonull: true
				src: [
					'<%= bower_concat.main.dest %>'
				]
				dest: '<%= tamia.dest %>/build/scripts.js'
	})

	grunt.registerTask 'default', ['scripts', 'styles', 'images']
	grunt.registerTask 'deploy', ['scripts', 'styles']
