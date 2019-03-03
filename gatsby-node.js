import path from 'path';
import { sortBy } from 'lodash';
import { createFilePath } from 'gatsby-source-filesystem';

const MAX_RELATED = 5;
const FRONTMATTER_REGEXP = /[+-]{3}[\s\S]*[+-]{3}/;

const stripFrontmatter = markdown => markdown.replace(FRONTMATTER_REGEXP, '');

function getRelatedPosts(posts, { slug, tags }) {
	const weighted = posts
		.filter(d => d.slug !== slug)
		.map(d => {
			const common = (d.tags || []).filter(t => (tags || []).includes(t));
			return {
				...d,
				weight: common.length * Number(d.timestamp),
			};
		})
		.filter(d => d.weight > 0);
	const sorted = sortBy(weighted, 'weight').reverse();
	return sorted.slice(0, MAX_RELATED);
}

function splitFrontmatter(markdown) {
	const rest = stripFrontmatter(markdown);
	return {
		frontmatter: markdown.substring(0, markdown.length - rest.length),
		rest,
	};
}

function typo(markdown) {
	// Skip typography enhancement on older Node versions
	if (parseInt(process.versions.node) < 8) {
		return markdown;
	}

	const richtypo = require('richtypo').default;
	const rules = require('richtypo-rules-en').default;
	const { frontmatter, rest } = splitFrontmatter(markdown);
	return frontmatter + richtypo(rules, rest);
}

export const onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

export const onCreateNode = ({
	node,
	getNode,
	actions: { createNodeField },
}) => {
	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode, trailingSlash: false });

		// Typography
		if (!slug.startsWith('/albums/')) {
			node.rawMarkdownBody = typo(node.rawMarkdownBody);
		}

		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});
	}
};

export const createPages = ({ graphql, actions: { createPage } }) => {
	return new Promise((resolve, reject) => {
		graphql(`
			{
				allMarkdownRemark(limit: 1000) {
					edges {
						node {
							frontmatter {
								layout
								title
								tags
								timestamp: date(formatString: "X")
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`).then(result => {
			if (result.errors) {
				reject(result.errors);
			}

			const docs = result.data.allMarkdownRemark.edges.map(e => ({
				...e.node.frontmatter,
				...e.node.fields,
			}));

			docs.forEach(({ layout, tags, slug }) => {
				createPage({
					path: slug,
					component: path.resolve(`${__dirname}/src/layouts/${layout}.js`),
					context: {
						slug,
						related: getRelatedPosts(docs, { slug, tags }),
					},
				});
			});
			resolve();
		});
	});
};
