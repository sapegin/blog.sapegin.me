import React from 'react';
import { Stack, Text } from 'tamia';
import Menu from './Menu';

type Props = {
	title?: string;
	url: string;
};

export default function Header({ title = 'Artem Sapegin', url }: Props) {
	return (
		<Stack gap="l" justifyContent="space-between" direction={['column', 'row']}>
			<Text as="h1" variant="menu" fontWeight="bold">
				{title}
			</Text>
			<Menu current={url} />
		</Stack>
	);
}
