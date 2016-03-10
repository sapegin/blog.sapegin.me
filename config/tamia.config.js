module.exports = function(options) {
	var argv = require('minimist')(process.argv.slice(2));
	if (argv.lang) {
		// Redirect HTML pages to local folder
		options.rewrites = [
			{ from: '^([^\.]*)$', to: '/' + argv.lang + '$1' },
		];
	}

	return options;
};
