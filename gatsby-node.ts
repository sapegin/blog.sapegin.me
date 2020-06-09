import path from 'path';
import { sortBy } from 'lodash';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import richtypo from 'richtypo';
import rules from 'richtypo-rules-en';
import { MakdownNode, PostsQuery } from './src/types/GraphQL';

const MAX_RELATED = 5;
const DATE_FORMAT = 'MMMM D, YYYY';

function getRelatedPosts(
	posts: { slug: string; tags: string[]; timestamp: string }[],
	{ slug, tags }: { slug: string; tags: string[] }
) {
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

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
	actions,
}) => {
	actions.setWebpackConfig({
		// Turn off source maps
		devtool: false,
	});
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
	node,
	getNode,
	actions: { createNodeField },
}) => {
	if (node.internal.type === 'MarkdownRemark') {
		// Typography
		if (node.internal.content) {
			node.internal.content = richtypo(rules, node.internal.content);
		}

		if (!(node as MakdownNode)?.fields?.slug) {
			createNodeField({
				node,
				name: 'slug',
				value: createFilePath({
					node,
					getNode,
				}),
			});
		}
	}
};

export const createPages: GatsbyNode['createPages'] = ({
	graphql,
	actions: { createPage },
}) => {
	return new Promise((resolve, reject) => {
		graphql<PostsQuery>(`
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
				return;
			}
			if (!result.data) {
				reject();
				return;
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
						slug,
						related: getRelatedPosts(docs, {
							slug,
							tags,
						}),
						dateFormat: DATE_FORMAT,
					},
				});
			});
			resolve();
		});
	});
};
