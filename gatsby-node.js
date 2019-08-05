import path from 'path';
import { sortBy } from 'lodash';
import { createFilePath } from 'gatsby-source-filesystem';
import lang from './src/lang';

const MAX_RELATED = 5;
const DATE_FORMAT = {
	en: 'MMMM D, YYYY',
	ru: 'D.MM.YYYY',
}[lang];

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

function typo(markdown) {
	// Skip typography enhancement on older Node versions
	if (parseInt(process.versions.node) < 9) {
		return markdown;
	}

	const richtypo = require('richtypo').default;
	const rules = require(`richtypo-rules-${lang}`).default;
	return richtypo(rules, markdown);
}

export const onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		// Turn off source maps
		devtool: false,
		resolve: {
			alias: {
				// Translation strings
				'@strings': path.resolve(__dirname, 'src/strings', lang),
			},
		},
	});
};

export const onCreateNode = ({
	node,
	getNode,
	actions: { createNodeField },
}) => {
	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode });

		// Typography
		node.internal.content = typo(node.internal.content);

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
					component: path.resolve(`${__dirname}/src/layouts/${layout}.tsx`),
					context: {
						lang,
						slug,
						related: getRelatedPosts(docs, { slug, tags }),
						dateFormat: DATE_FORMAT,
					},
				});
			});
			resolve();
		});
	});
};
