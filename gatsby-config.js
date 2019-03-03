const lang = require('./src/lang');

module.exports = {
	siteMetadata: require('./config'),
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-emotion',
		'gatsby-plugin-lodash',
		'gatsby-plugin-remove-trailing-slashes',
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
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
					site {
						siteMetadata {
						title
						description
						siteUrl
						site_url: siteUrl
						}
					}
					}
				`,
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
	],
};
