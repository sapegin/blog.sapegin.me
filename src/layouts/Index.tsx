import React from 'react';
import { graphql } from 'gatsby';
import { Box, Heading, VisuallyHidden } from 'tamia';
import groupBy from '../util/groupBy';
import Page from './Page';
import PostList from '../components/PostList';
import Metatags from '../components/Metatags';
import { Post } from '../types';

type GroupedPosts = {
	[year: string]: Post[];
};

const groupByYear = groupBy('year');

const getYears = (postsByYear: GroupedPosts): string[] => {
	const years = Object.keys(postsByYear);
	years.sort();
	years.reverse();
	return years;
};

type Props = {
	data: {
		allMarkdownRemark: {
			edges: {
				node: {
					fields: {
						slug: string;
					};
					frontmatter: {
						title: string;
						tags: string[];
						year: string;
						dateTime: string;
					};
				};
			}[];
		};
	};
	location: {
		pathname: string;
	};
};

const Index = ({
	data: {
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}: Props) => {
	const posts = edges.map(({ node }) => ({
		...node.fields,
		...node.frontmatter,
	}));
	const postsByYear = groupByYear(posts);
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
						dateTime: date(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	}
`;
