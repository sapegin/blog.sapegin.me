module.exports = function(options, argv) {
	if (argv.lang) {
		// Redirect HTML pages to local folder
		options.rewrites = [
			'^/$ /' + argv.lang + '/index.html L',
			'^([^.]*)$ /' + argv.lang + '$1.html',
		];
	}

	return options;
};
