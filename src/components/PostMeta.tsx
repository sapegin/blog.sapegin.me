import React from 'react';
import { Text } from 'tamia';
import styled from 'styled-components';
import { Link } from 'tamia-gatsby-link';
import { discussPost, editPost, PublishedOn, lang, siteUrl } from '@strings';

const TWITTER_PREFIX = 'https://twitter.com/search';
const GITHUB_PREFIX =
	'https://github.com/sapegin/blog.sapegin.me/edit/master/content/';

const List = styled.p`
	@media (min-width: ${p => p.theme.breakpoints[1]}) {
		display: flex;
	}
`;

// TODO
const Item = styled(Text)`
	display: block;
	font-style: italic;
	margin-bottom: ${p => p.theme.space.xs};

	@media (min-width: ${p => p.theme.breakpoints[1]}) {
		&:not(:last-child)::after {
			content: '·';
			margin: 0 1ch;
		}
	}
`;

type Props = {
	slug: string;
	date: string;
	dateTime: string;
};

export default function PostMeta({ slug, date, dateTime }: Props) {
	const searchQuery = encodeURIComponent(siteUrl + slug);
	const filename = `${slug.slice(0, -1)}.md`;
	return (
		<List>
			<Item as="span" variant="small">
				<Link href={`${TWITTER_PREFIX}?q=${searchQuery}`}>{discussPost}</Link>
			</Item>
			<Item as="span" variant="small">
				<Link href={`${GITHUB_PREFIX}${lang}${filename}`}>{editPost}</Link>
			</Item>
			<Item variant="small">
				<time dateTime={dateTime}>
					<PublishedOn date={date} />
				</time>
			</Item>
		</List>
	);
}
