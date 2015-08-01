// gruntjs.com

module.exports = function(grunt) {
	'use strict';

	var debug = !!grunt.option('debug');

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			src: 'src',
			dest: 'src/files',
			imagesSrc: 'src/files/images_src',
			imagesDest: 'src/files/images',
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
