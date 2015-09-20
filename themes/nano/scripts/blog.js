'use strict';

var pagination = require('hexo-pagination');
var dateHelper = require('hexo/lib/plugins/helper/date');

function getLanguagePosts(allPosts, lang) {
	return allPosts.sort('-date').filter(function(post) {
		return post.lang === lang;
	});
}

// Index page
function index(locals) {
	var perPage = this.config.per_page;

	return this.config.language.reduce(function(generated, lang) {
		if (lang === 'default') {
			return generated;
		}

		var languagePosts = getLanguagePosts(locals.posts, lang);
		if (!languagePosts.length) {
			return;
		}

		return generated.concat(pagination(lang, languagePosts, {
			perPage: perPage,
			layout: 'index'
		}));
	}, []);
}

// All posts page
function all(locals) {
	var timezone = this.config.timezone;

	return this.config.language.reduce(function(generated, lang) {
		if (lang === 'default') {
			return generated;
		}

		var languagePosts = getLanguagePosts(locals.posts, lang);
		if (!languagePosts.length) {
			return generated;
		}

		var date = dateHelper.date.bind({
			config: {
				timezone: timezone
			},
			page: {
				lang: lang
			}
		});

		var postsByYear = languagePosts.reduce(function(posts, post) {
			var year = date(post.date, 'YYYY');
			if (!posts[year]) {
				posts[year] = [];
			}
			posts[year].push(post);
			return posts;
		}, {});

		var years = Object.keys(postsByYear);
		years.sort();
		years.reverse();

		return generated.concat({
		  path: lang + '/all/',
		  layout: 'all',
		  data: {
		  	posts_by_year: postsByYear,
		  	posts_number: languagePosts.length,
		  	years: years
		  }
		});
	}, []);
}

// Tag pages
function tags(locals) {
	var perPage = this.config.per_page;
	var languages = this.config.language

	return locals.tags.reduce(function(generated, tag){
		if (!tag.length) {
			return generated;
		}

		return generated.concat(languages.reduce(function(generatedLangs, lang) {
			if (lang === 'default') {
				return generatedLangs;
			}

			var languagePosts = getLanguagePosts(tag.posts, lang);
			if (!languagePosts.length) {
				return generatedLangs;
			}

			return generatedLangs.concat(pagination(lang + '/' + tag.path, languagePosts, {
				perPage: perPage,
				layout: 'tag',
				data: {
					tag: tag.name
				}
			}));
		}, []));
	}, []);
}

// Atom feed
function atom(locals) {
	return this.config.language.reduce(function(generated, lang) {
		if (lang === 'default') {
			return generated;
		}

		var languagePosts = getLanguagePosts(locals.posts, lang);
		if (!languagePosts.length) {
			return generated;
		}

		return generated.concat({
			path: lang + '/atom.xml',
			layout: 'atom',
			data: {
				posts: languagePosts.limit(10)
			}
		});
	}, []);
}

hexo.extend.generator.register('index', index);
hexo.extend.generator.register('all', all);
hexo.extend.generator.register('tags', tags);
hexo.extend.generator.register('atom', atom);
