import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

export default function Footer() {
	return (
		<footer>
			<Text variant="xsmall" mb="xs">
				© <Link href="https://sapegin.me/">Artem Sapegin</Link>
				{', '}
				2006…{new Date().getFullYear()}
			</Text>
			<Text variant="xsmall">
				Powered by <Link href="https://www.gatsbyjs.org/">Gatsby</Link> and{' '}
				<Link href="https://tamiadev.github.io/tamia/">Tâmia</Link>, hosted on{' '}
				<Link href="https://www.netlify.com/">Netlify</Link>.
				<Link href="/atom.xml">RSS</Link>.
			</Text>
		</footer>
	);
}
