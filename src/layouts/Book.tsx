import React from 'react';
import { graphql } from 'gatsby';
import { Box, Stack, Heading, Text, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import PostList from '../components/PostList';
import Metatags from '../components/Metatags';
import { Button } from '../components/Button';
import { BookCover } from '../components/BookCover';

type Chapter = {
	title: string;
	slug?: string;
};

type Props = {
	data: {
		allBookJson: {
			edges: {
				node: {
					title: string;
					chapters: Chapter[];
				};
			}[];
		};
	};
	location: {
		pathname: string;
	};
};

const Book = ({
	data: {
		allBookJson: { edges },
	},
	location: { pathname },
}: Props) => {
	return (
		<Page url={pathname}>
			<Metatags
				slug={pathname}
				pageTitle="Washing your code: a book on clean code for frontend developers by Artem Sapegin"
				description="Learn how to make your code more readable and maintainable, and how to avoid hard-to-track bugs."
			/>
			<main>
				<Stack gap="l">
					<Stack gap="s">
						<Heading level={1}>Washing your code</Heading>
						<Heading level={3} as="p">
							A book on clean code for frontend developers
						</Heading>
					</Stack>
					<Stack direction={['column', null, 'row']} gap="l">
						<Stack gap="l">
							<VisuallyHidden as="h2">About the book</VisuallyHidden>
							<Stack gap="m">
								<Text variant="intro">
									We read code much more often than we write it — often to make
									a one-line change you have to read and understand hundreds of
									lines of code scattered among dozens of files. That’s why code
									readability is so important.
								</Text>
								<Text>
									On dozens of examples, based on production code, I’ll show you
									how to make your code more readable and maintainable, and how
									to avoid hard-to-track bugs. I’ll show you code smells and
									antipatterns I often see during code reviews (and I review
									lots of code every day!) and will walk you through the
									refactoring process to make your code better.
								</Text>
								<Text>
									These techniques help me every day to write code that my
									colleagues will have no problems working with. All book’s
									examples are written in JavaScript with a bit of TypeScript,
									React, CSS, and HTML.
								</Text>
							</Stack>
							<Stack direction="column" gap="s">
								<Box>
									<Button
										as="a"
										variant="large"
										href="http://leanpub.com/washingcode/c/blog-reader"
									>
										Preorder now!{' '}
										<Box as="span" verticalAlign="middle">
											・
										</Box>{' '}
										<del>$20</del> $12
									</Button>
								</Box>
								<Text>Or read selected chapters below</Text>
							</Stack>
						</Stack>
						<Box mx={['auto', 0, 0]} order={[-1, null, 0]} minWidth="auto">
							<BookCover variant="large" />
						</Box>
					</Stack>
					<Heading level={2}>Table of contents</Heading>
					<Stack>
						{edges.map((group, index) => (
							<Stack key={index} as="section" gap="m">
								<PostList posts={group.node.chapters} />
							</Stack>
						))}
					</Stack>
					<Stack direction={['column', null, 'row']} gap="l">
						<Box mx={['auto', 0, 0]} minWidth="auto">
							<Box
								as="img"
								src="/images/artem-sapegin.jpg"
								width={200}
								height={200}
								alt="Artem Sapegin"
								sx={{ borderRadius: 'round' }}
							/>
						</Box>
						<Stack gap="l">
							<Stack gap="m">
								<Heading level={2}>About the author</Heading>
								<Text>Hola! I’m Artem.</Text>
								<Text>
									I’m a software engineer with 20 years of experience in small
									startups and large corporations, like Wayfair, Mail.ru, Here
									Technologies, Omio, and Badoo, I created React Styleguidist (a
									tool to create React components and share them with your
									team), among many other open source projects.
								</Text>
								<Text>
									I’ve been <Link href="/">blogging</Link> about frontend
									development for almost as many years. My favorite topics are
									component-driven development, testing, and accessibility.
								</Text>
							</Stack>
						</Stack>
					</Stack>
					<Stack gap="m">
						<Heading level={2}>Have a question?</Heading>
						<Text>
							Drop me a line at{' '}
							<Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>,{' '}
							<Link href="https://twitter.com/iamsapegin">@iamsapegin</Link>, or{' '}
							<Link href="https://mastodon.cloud/@sapegin">
								@sapegin@mastodon.cloud
							</Link>
							.
						</Text>
					</Stack>
				</Stack>
			</main>
		</Page>
	);
};

export default Book;

export const pageQuery = graphql`
	query BookPage {
		allBookJson {
			edges {
				node {
					title
					chapters {
						title
						slug
					}
				}
			}
		}
	}
`;
