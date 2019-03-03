import React from 'react';
import { graphql } from 'gatsby';
import { Box, Html } from 'tamia';
import PageWithTitle from './PageWithTitle';
import PostContent from '../components/PostContent';
import PostMeta from '../components/PostMeta';
import RelatedPosts from '../components/RelatedPosts';
import Metatags from '../components/Metatags';

export default function PostPage({
	data: {
		markdownRemark: {
			html,
			excerpt,
			frontmatter: { title, date, dateTime },
		},
	},
	pageContext: { related },
	location: { pathname },
}) {
	return (
		<PageWithTitle url={pathname} title={title}>
			<Metatags slug={pathname} title={title} description={excerpt} />
			<Box mb="l">
				<PostContent>
					<Html>{html}</Html>
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
	query PostPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			excerpt
			frontmatter {
				title
				date(formatString: "MMMM D, YYYY")
				dateTime: date(formatString: "YYYY-MM-DD")
			}
		}
	}
`;
