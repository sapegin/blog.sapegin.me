import React from 'react';
import { graphql } from 'gatsby';
import { Stack, Heading, VisuallyHidden } from 'tamia';
import groupBy from 'just-group-by';
import Page from './Page';
import PostList from '../components/PostList';
import Metatags from '../components/Metatags';

type Fields = {
	slug: string;
};

type Frontmatter = {
	title: string;
	tags: string[];
	dateTime: string;
};

type Post = Fields & Frontmatter;

type GroupedPosts = {
	[category: string]: Post[];
};

const CATEGORY_TITLES: Record<string, string> = {
	typescript: 'TypeScript',
};

const getCategoryTitle = (key: string) => {
	if (CATEGORY_TITLES[key]) {
		return CATEGORY_TITLES[key];
	}

	const [firstLetter, ...restLetters] = key;
	return `${firstLetter.toUpperCase()}${restLetters}`;
};

const groupByCategory = (posts: Post[]) =>
	// Get category from the slug: /til/react/bla-bla-bla → react
	groupBy(posts, (post) => post.slug.split('/')[2]);

const getCategories = (postsByCategory: GroupedPosts): string[] => {
	const categories = Object.keys(postsByCategory);
	categories.sort();
	return categories;
};

type Props = {
	data: {
		allMarkdownRemark: {
			edges: {
				node: {
					fields: Fields;
					frontmatter: Frontmatter;
				};
			}[];
		};
	};
	location: {
		pathname: string;
	};
};

const Til = ({
	data: {
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}: Props) => {
	const posts = edges.map(({ node }) => ({
		...node.fields,
		...node.frontmatter,
	}));
	const postsByCategory = groupByCategory(posts);
	const categories = getCategories(postsByCategory);
	return (
		<Page url={pathname}>
			<Metatags slug={pathname} />
			<main>
				<VisuallyHidden as="h1">Today I learned posts</VisuallyHidden>
				<Stack gap="l">
					{categories.map((category) => (
						<Stack key={category} as="section" gap="m">
							<Heading as="h2" level={2}>
								{getCategoryTitle(category)}
							</Heading>
							<PostList posts={postsByCategory[category]} />
						</Stack>
					))}
				</Stack>
			</main>
		</Page>
	);
};

export default Til;

export const pageQuery = graphql`
	query TilPage {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/til/.*/" } }
			sort: { fields: [frontmatter___title], order: ASC }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						tags
						dateTime: date(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	}
`;
