// gruntjs.com

module.exports = function(grunt) {
	'use strict';

	var debug = !!grunt.option('debug');

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			src: 'themes/nano',
			dest: 'themes/nano/source',
			imagesSrc: 'themes/nano/images_src',
			imagesDest: 'themes/nano/source/images',
			modernizr: false,
			pngquant: false
		},
		concat: {
			main: {
				nonull: true,
				src: [
					// Custom jQuery build:
					// grunt custom:-ajax/xhr,-deprecated,-effects,-event/alias,-offset,-core/ready,-exports/amd,-sizzle
					'<%= tamia.dest %>/build/jquery.js',
					'<%= bower_concat.main.dest %>'
				],
				dest: '<%= tamia.dest %>/build/scripts.js',
			}
		},
		fontoptim: {
			ptserif: {
				src: '<%= tamia.src %>/fonts/PTSerif-*',
				dest: '<%= tamia.dest %>/build/ptserif',
				options: {
					fontFamily: 'PT Serif'
				}
			}
		}
	});

	grunt.registerTask('default', ['scripts', 'styles', 'images']);
	grunt.registerTask('deploy', ['scripts', 'styles']);

};
