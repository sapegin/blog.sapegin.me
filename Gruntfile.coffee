# gruntjs.com

module.exports = (grunt) ->
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.initConfig
		stylus:
			compile:
				files:
					'src/files/build/styles.css': 'src/styles/index.styl'
				options:
					paths: ['src/tamia']
					'include css': true
		watch:
			stylus:
				files: 'src/styles/**'
				tasks: 'stylus'

	grunt.registerTask 'default', ['stylus']
	grunt.registerTask 'deploy', ['stylus']
