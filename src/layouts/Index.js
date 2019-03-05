import React from 'react';
import groupBy from 'lodash/groupBy';
import { graphql } from 'gatsby';
import { Box, Heading, VisuallyHidden } from 'tamia';
import Page from './Page';
import PostList from '../components/PostList';
import Metatags from '../components/Metatags';

const getYears = postsByYear => {
	const years = Object.keys(postsByYear);
	years.sort();
	years.reverse();
	return years;
};

const Index = ({
	data: {
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}) => {
	const posts = edges.map(({ node }) => ({
		...node.fields,
		...node.frontmatter,
	}));
	const postsByYear = groupBy(posts, 'year');
	const years = getYears(postsByYear);
	return (
		<Page url={pathname}>
			<Metatags slug={pathname} />
			<VisuallyHidden as="h2">Blog posts</VisuallyHidden>
			{years.map(year => (
				<Box key={year} as="section" mb="l">
					<Heading as="h3" level={2} mb="m">
						{year}
					</Heading>
					<PostList posts={postsByYear[year]} />
				</Box>
			))}
		</Page>
	);
};

export default Index;

export const pageQuery = graphql`
	query IndexPage {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/all/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						tags
						year: date(formatString: "YYYY")
						datetime: date(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	}
`;
