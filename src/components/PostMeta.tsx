import React from 'react';
import { Text } from 'tamia';
import styled from 'styled-components';
import { Link } from 'tamia-gatsby-link';

const SITE_URL = 'https://blog.sapegin.me';
const TWITTER_PREFIX = 'https://twitter.com/search';
const GITHUB_PREFIX =
	'https://github.com/sapegin/blog.sapegin.me/edit/master/content/';

const Nobr = styled.span`
	white-space: nowrap;
`;

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
	const searchQuery = encodeURIComponent(SITE_URL + slug);
	const filename = `${slug.slice(0, -1)}.md`;
	return (
		<List>
			<Item as="span" variant="small">
				<Link href={`${TWITTER_PREFIX}?q=${searchQuery}`}>
					Discuss on Twitter
				</Link>
			</Item>
			<Item as="span" variant="small">
				<Link href={`${GITHUB_PREFIX}${filename}`}>Edit on GitHub</Link>
			</Item>
			<Item as="span" variant="small">
				<time dateTime={dateTime}>
					Published <Nobr>on {date}</Nobr>
				</time>
			</Item>
		</List>
	);
}
