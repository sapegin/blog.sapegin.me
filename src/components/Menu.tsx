import React from 'react';
import { Link } from 'tamia-gatsby-link';
import { Text, Stack } from 'tamia';

type Props = {
	current: string;
};

type Item = {
	title: string;
	href: string;
};

const ITEMS: Item[] = [
	{
		title: 'About',
		href: 'https://sapegin.me/',
	},
	{
		title: 'Blog',
		href: '/',
	},
	{
		title: 'Speaking',
		href: 'https://sapegin.me/speaking/',
	},
	{
		title: 'Photography',
		href: 'https://morning.photos/',
	},
];

export default function Menu({ current }: Props) {
	return (
		<Stack as="ul" gap="m" direction={['column', 'row']}>
			{ITEMS.map(({ title, href }) => (
				<Text
					key={href}
					as="li"
					variant="menu"
					fontWeight={current.startsWith(href) ? 'bold' : undefined}
				>
					<Link href={href}>{title}</Link>
				</Text>
			))}
		</Stack>
	);
}
