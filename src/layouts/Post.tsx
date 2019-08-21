import React from 'react';
import { graphql } from 'gatsby';
import { Box } from 'tamia';
import PageWithTitle from './PageWithTitle';
import PostContent from '../components/PostContent';
import PostMeta from '../components/PostMeta';
import RelatedPosts from '../components/RelatedPosts';
import Metatags from '../components/Metatags';
import { Post } from '../types';

type Props = {
	data: {
		markdownRemark: {
			html: string;
			excerpt: string;
			frontmatter: {
				title: string;
				description: string;
				date: string;
				dateTime: string;
			};
		};
	};
	pageContext: {
		related: Post[];
	};
	location: {
		pathname: string;
	};
};

export default function PostPage({
	data: {
		markdownRemark: {
			html,
			excerpt,
			frontmatter: { title, description, date, dateTime },
		},
	},
	pageContext: { related },
	location: { pathname },
}: Props) {
	return (
		<PageWithTitle url={pathname} title={title}>
			<Metatags
				slug={pathname}
				title={title}
				description={description || excerpt}
			/>
			<Box mb="l">
				<PostContent>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</PostContent>
			</Box>
			<Box as="footer" mb="xl">
				<PostMeta slug={pathname} date={date} dateTime={dateTime} />
			</Box>
			<Box as="aside" mb="l">
				<RelatedPosts posts={related} />
			</Box>
		</PageWithTitle>
	);
}

export const pageQuery = graphql`
	query PostPage($slug: String!, $lang: String!, $dateFormat: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			excerpt
			frontmatter {
				title
				description
				date(formatString: $dateFormat, locale: $lang)
				dateTime: date(formatString: "YYYY-MM-DD")
			}
		}
	}
`;
