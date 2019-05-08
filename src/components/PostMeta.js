import React from 'react';
import { Text, themeGet } from 'tamia';
import styled from '@emotion/styled';
import { Link } from 'tamia-gatsby-link';
import { discussPost, editPost, PublishedOn, lang, siteUrl } from '@strings';

const TWITTER_PREFIX = 'https://twitter.com/search';
const GITHUB_PREFIX =
	'https://github.com/sapegin/blog.sapegin.me/edit/master/content/';

const List = styled.p`
	@media (min-width: ${themeGet('breakpoints.medium')}) {
		display: flex;
	}
`;

const Item = styled(Text)`
	display: block;
	font-style: italic;
	margin-bottom: ${themeGet('space.xs')};

	@media (min-width: ${themeGet('breakpoints.medium')}) {
		&:not(:last-child)::after {
			content: '·';
			margin: 0 1ch;
		}
	}
`;

export default function PostMeta({ slug, date, dateTime }) {
	const searchQuery = encodeURIComponent(siteUrl + slug);
	const filename = `${slug.slice(0, -1)}.md`;
	return (
		<List>
			<Item as="span" size="s">
				<Link href={`${TWITTER_PREFIX}?q=${searchQuery}`}>{discussPost}</Link>
			</Item>
			<Item as="span" size="s">
				<Link href={`${GITHUB_PREFIX}${lang}${filename}`}>{editPost}</Link>
			</Item>
			<Item as="time" size="s" dateTime={dateTime}>
				<PublishedOn date={date} />
			</Item>
		</List>
	);
}
