import React from 'react';
import { Link } from 'tamia-gatsby-link';
import { Stack, Text } from 'tamia';
import Menu from './Menu';

type Props = {
	title?: string;
	url: string;
};

export default function Header({ title = 'Artem Sapegin', url }: Props) {
	return (
		<Stack
			as="header"
			gap="l"
			justifyContent="space-between"
			direction={['column', 'row']}
		>
			<Text variant="menu" fontWeight="bold">
				<Link href="https://sapegin.me/">{title}</Link>
			</Text>
			<Menu current={url} />
		</Stack>
	);
}
