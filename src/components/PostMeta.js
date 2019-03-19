import React from 'react';
import { Text, themeGet } from 'tamia';
import styled from '@emotion/styled';
import { Link } from 'tamia-gatsby-link';
import { discussPost, editPost, PublishedOn, lang, siteUrl } from '@strings';

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
	return (
		<List>
			<Item as="span" size="s">
				<Link href={`https://twitter.com/search?q=${searchQuery}`}>
					{discussPost}
				</Link>
			</Item>
			<Item as="span" size="s">
				<Link
					href={`https://github.com/sapegin/blog.sapegin.me/edit/master/content/${lang}${slug}.md`}
				>
					{editPost}
				</Link>
			</Item>
			<Item as="time" size="s" dateTime={dateTime}>
				<PublishedOn date={date} />
			</Item>
		</List>
	);
}
