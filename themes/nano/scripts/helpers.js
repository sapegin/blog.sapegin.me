'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var richtypo = require('richtypo');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var isSingleDomain = argv['single-domain'];  // --single-domain

// Borrowed from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js
var pluralTypes = {
	en: function(n) { return n !== 1 ? 1 : 0; },
	ru: function(n) { return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2; }
};

function meta(name, content){
	return '<meta name="' + name + '" content="' + content + '">';
}

function og(name, content){
	return '<meta property="' + name + '" content="' + content + '">';
}

var helpers = {};

// Page title
helpers.page_title = function(suffix) {
	if (this.page.page_title) {
		return this.page.page_title;
	}
	if (this.page.title) {
		if (suffix === undefined) {
			suffix = ' — ' + this.__('title');
		}
		return this.page.title + (suffix || '');
	}
	else {
		return this.config.title;
	}
};

// Proper page URL
helpers.page_url = function(path, options) {
	var url = this.url_for(path, options)
		.replace(/index\.html$/, '')
		.replace(/\/$/, '')
	;

	if (!isSingleDomain) {
		// Remove language
		url = url.replace(new RegExp('/(' + this.config.language.join('|') + ')/'), '/');
	}

	return url;
};

// URL to a page in another language
helpers.translation_url = function() {
	var trans_url = this.__('trans_url');
	var full_source = this.page.full_source;
	if (full_source && fs.existsSync(full_source.replace(this.config.lang, this.__('trans_lang')))) { // TODO: do not read a file
		return this.page_url(trans_url + this.page.canonical_path);
	}
	else {
		return trans_url;
	}
};

// Is current page home page?
helpers.is_home = function() {
	return this.page.canonical_path === 'index.html';
};

// OG, Twitter Card and other meta tags
helpers.meta_tags = function(options) {
	options = options || {};

	var twType;
	var ogType;
	if (this.is_home()) {
		ogType = 'website';
	}
	else if (this.is_page()) {
		twType = 'summary';
		ogType = 'article';
	}
	else if (this.is_post()) {
		twType = 'summary';
		ogType = 'article';
	}

	if (!twType && !ogType) {
		return '';
	}

	var page = this.page;
	var config = this.config;
	var content = page.content;
	var description = page.description;
	var title = options.title || page.title || config.title;

	var tags = [];
	var image;

	if (!description) {
		if (content) {
			// First paragraph
			var m = content.match(/<p[^>]*>(.*?)<\/p>/i);
			if (m) {
				description = m[1]
					.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '')  // From https://github.com/azer/strip
					.trim()
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/&/g, '&amp;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&apos;')
				;
			}
		}
		if (!description) {
			description = config.description;
		}
	}

	if (content) {
		// First image
		var m = content.match(/<img\s+src=["']([^"']+)["']/i);
		if (m) {
			twType = 'summary_large_image';
			image = m[1];
		}
	}
	if (!image) {
		image = this.__('url') + '/images/userpic.jpg';
	}

	tags.push(
		meta('description', description),
		og('og:type', ogType),
		og('og:title', title),
		og('og:url', this.page_url(this.url)),
		og('og:site_name', this.__('title')),
		og('og:description', description),
		og('og:image', image)
	);

	if (twType) {
		tags.push(
			meta('twitter:card', twType),
			meta('twitter:title', title),
			meta('twitter:description', description),
			meta('twitter:creator', '@' + options.twitter_id)
		);
	}

	if (page.noindex) {
		meta('robots', 'noindex follow');
	}

	return tags.join('\n');
};

// Add fingerprint to file path
helpers.fingerprint = _.memoize(function(filepath) {
	var datetime = fs.statSync(this.theme_filepath(filepath)).mtime.getTime();
	return filepath + '?' + datetime;
});

// Returns file contents
helpers.embed_file = _.memoize(function(filepath) {
	return fs.readFileSync(this.theme_filepath(filepath), {encoding: 'utf8'});
});

// Return path to file inside theme
helpers.theme_filepath = function(filepath) {
	return path.join(this.config.theme_path, filepath);
};

// Plural form: @plural(3, 'dogs')
helpers.plural = function(n, s) {
	var words = this.__(s).split('|');
	return words[pluralTypes[this.page.lang](n)];
};

// Translated string with {} templates
helpers.___ = function(s, params) {
	var params = params || {};
	s = this.__(s);
	return s.replace(/\{([^\}]+)\}/g, function(m, key) {
		return params[key] || m;
	});
};

// Richtypo.js: body text
helpers.rt = function(s) {
	return s && richtypo.rich(s, this.page.lang);
};

// Richtypo.js: title
helpers.rtt = function(s) {
	return s && richtypo.title(s, this.page.lang);
};

// Absolutize links and images
helpers.prepare_feed = function(s) {
	var url = this.__('url');
	return s && (s
		.replace(/href="\//g, 'href="' + url + '/')
		.replace(/src="\//g, 'src="' + url + '/')
	);
};

// Register all helpers
Object.keys(helpers).forEach(function(name) {
	hexo.extend.helper.register(name, helpers[name]);
});
