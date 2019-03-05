import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { author, PoweredBy } from '@strings';

export default function Footer() {
	return (
		<>
			<Text size="xs" mb="xs">
				© <Link href="http://sapegin.me">{author}</Link>
				{', '}
				2006…{new Date().getFullYear()}
			</Text>
			<Text size="xs">
				<PoweredBy />
			</Text>
		</>
	);
}
