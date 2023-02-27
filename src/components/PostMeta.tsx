import React from 'react';
import { Text } from 'tamia';
import styled from 'styled-components';
import { Link } from 'tamia-gatsby-link';

const SITE_URL = 'https://blog.sapegin.me';

const getMastodonLink = (slug: string) => {
	return `https://mastodon.cloud/@sapegin`;
};

const getTwitterLink = (slug: string) => {
	const searchQuery = encodeURIComponent(`${SITE_URL}${slug}`);
	return `https://twitter.com/search?q=${searchQuery}`;
};

const getGitHubLink = (slug: string) => {
	const filename = `${slug.slice(0, -1)}.md`;
	return slug.startsWith('/til/')
		? `https://github.com/sapegin/til/edit/master/${filename.replace(
				/^\/til\//,
				''
		  )}`
		: `https://github.com/sapegin/blog.sapegin.me/edit/master/content/${filename}`;
};

const List = styled.p`
	@media (min-width: ${(p) => p.theme.breakpoints[1]}) {
		display: flex;
	}
`;

// TODO
const Item = styled(Text)`
	display: block;
	font-style: italic;
	margin-bottom: ${(p) => p.theme.space.xs};

	@media (min-width: ${(p) => p.theme.breakpoints[1]}) {
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
	return (
		<List>
			<Item as="span" variant="small">
				Discuss on <Link href={getMastodonLink(slug)}>Mastodon</Link> or{' '}
				<Link href={getTwitterLink(slug)}>Twitter</Link>
			</Item>
			<Item as="span" variant="small">
				<Link href={getGitHubLink(slug)}>Edit on GitHub</Link>
			</Item>
			<Item as="span" variant="small">
				<time dateTime={dateTime}>
					Published <nobr>on {date}</nobr>
				</time>
			</Item>
		</List>
	);
}
