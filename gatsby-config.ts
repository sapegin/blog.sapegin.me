const title = 'Artem Sapegin’s Blog';
const siteUrl = 'https://blog.sapegin.me';
import { PostsQuery } from './src/types/GraphQL';

export default {
	siteMetadata: {
		siteUrl,
		title,
		description:
			'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
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
						serialize: ({
							query: { allMarkdownRemark },
						}: {
							query: PostsQuery;
						}) => {
							return allMarkdownRemark.edges.map((edge) => {
								const url = `${siteUrl}/${edge.node.fields.slug}`;
								return {
									...edge.node.frontmatter,
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url,
									guid: url,
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
						title,
					},
				],
			},
		},
		'gatsby-plugin-sitemap',
		'gatsby-plugin-netlify',
		'gatsby-plugin-typescript',
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl,
			},
		},
	],
};
