import React from 'react';
import { graphql } from 'gatsby';
import { Stack, Heading } from 'tamia';
import Page from './Page';
import PostContent from '../components/PostContent';
import PostMeta from '../components/PostMeta';
import Subscription from '../components/Subscription';
import RelatedPosts from '../components/RelatedPosts';
import Metatags from '../components/Metatags';
import Fleuron from '../components/Fleuron';
import { BookPostHeader } from '../components/BookPostHeader';
import { BookPostFooter } from '../components/BookPostFooter';
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
				source: string;
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
			frontmatter: { title, description, date, dateTime, source },
		},
	},
	pageContext: { related },
	location: { pathname },
}: Props) {
	return (
		<Page url={pathname}>
			<Metatags
				slug={pathname}
				title={title}
				description={description || excerpt}
			/>
			<Stack gap="xl">
				<Stack as="main" gap="m">
					<Stack gap="l">
						<Heading level={1}>{title}</Heading>
						<Stack gap="m">
							<PostContent>
								{source && (
									<>
										<BookPostHeader />
										<hr />
									</>
								)}
								<div dangerouslySetInnerHTML={{ __html: html }} />
								{source && (
									<>
										<hr />
										<BookPostFooter />
									</>
								)}
							</PostContent>
						</Stack>
					</Stack>
					<footer>
						<PostMeta slug={pathname} date={date} dateTime={dateTime} />
					</footer>
					<Fleuron />
				</Stack>
				<Stack gap="l">
					<aside aria-label="Newsletter">
						<Subscription />
					</aside>
					{related.length > 0 && (
						<aside aria-label="Related posts">
							<RelatedPosts posts={related} />
						</aside>
					)}
				</Stack>
			</Stack>
		</Page>
	);
}

export const pageQuery = graphql`
	query PostPage($slug: String!, $dateFormat: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			excerpt
			frontmatter {
				title
				description
				date(formatString: $dateFormat)
				dateTime: date(formatString: "YYYY-MM-DD")
				source
			}
		}
	}
`;
