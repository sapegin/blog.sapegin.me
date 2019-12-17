const siteUrl = 'https://blog.sapegin.me';

module.exports = {
	siteMetadata: {
		title: 'Artem Sapegin’s Blog',
		description:
			'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.',
		siteUrl,
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-lodash',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content`,
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
						serialize: ({ query: { allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								const url = `${siteUrl}/${edge.node.fields.slug}`;
								return {
									...edge.node.frontmatter,
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url,
									guid: url,
									// eslint-disable-next-line @typescript-eslint/camelcase
									custom_elements: [
										{
											'content:encoded': edge.node.html,
										},
									],
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
		'gatsby-plugin-typescript',
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl,
			},
		},
		{
			resolve: 'gatsby-plugin-fathom',
			options: {
				trackingUrl: 'stats.sapegin.me',
				siteId: 'JQWYF',
			},
		},
	],
};
