import lang from './src/lang';

const siteMetadata = {
	en: {
		title: 'Artem Sapegin’s Blog',
		description:
			'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.',
		siteUrl: 'https://blog.sapegin.me/',
	},
	ru: {
		title: 'Наноблог Артёма Сапегина',
		description:
			'Блог фронтенд-разработчика, который живёт в Берлине, работает в Вейфейре, фотографирует, пишет, гладит собак и пьёт кофе.',
		siteUrl: 'https://nano.sapegin.ru/',
	},
}[lang];

module.exports = {
	siteMetadata,
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-emotion',
		'gatsby-plugin-lodash',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/${lang}`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							aliases: {
								coffee: 'coffeescript',
							},
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								const url = `${site.siteMetadata.siteUrl}/${
									edge.node.fields.slug
								}`;
								return {
									...edge.node.frontmatter,
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url,
									guid: url,
									custom_elements: [{ 'content:encoded': edge.node.html }],
								};
							});
						},
						query: `
							{
								allMarkdownRemark(
									filter: { fileAbsolutePath: { regex: "/all/.*/" } }
									sort: { fields: [frontmatter___date], order: DESC },
									limit: 20,
								) {
									edges {
										node {
											frontmatter {
												title
												date
											}
											fields {
												slug
											}
											excerpt
											html
										}
									}
								}
							}
							`,
						output: '/atom.xml',
					},
				],
			},
		},
		'gatsby-plugin-netlify',
		'gatsby-plugin-flow',
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: siteMetadata.siteUrl,
			},
		},
		{
			resolve: 'gatsby-plugin-fathom',
			options: {
				trackingUrl: 'stats.sapegin.me',
				siteId: { en: 'JQWYF', ru: 'SOOAQ' }[lang],
			},
		},
	],
};
