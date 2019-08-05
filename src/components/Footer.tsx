import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { author, PoweredBy } from '@strings';

export default function Footer() {
	return (
		<>
			<Text variant="xsmall" mb="xs">
				© <Link href="https://sapegin.me/">{author}</Link>
				{', '}
				2006…{new Date().getFullYear()}
			</Text>
			<Text variant="xsmall">
				<PoweredBy />
			</Text>
		</>
	);
}
