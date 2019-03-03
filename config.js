const lang = require('./src/lang');

module.exports = {
	en: {
		lang,
		title: 'Artem Sapegin’s Blog',
		description:
			'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.',
		email: 'artem@sapegin.me',
		twitter: '@iamsapegin',
		siteUrl: 'https://blog.sapegin.me/',
	},
	ru: {},
}[lang];
