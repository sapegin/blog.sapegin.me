import React from 'react';
import { Stack, Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { BookCover } from './BookCover';

export function BookPostHeader() {
	return (
		<Stack direction="row" gap="m">
			<Stack gap="m">
				<Text variant="intro">
					You’re reading an excerpt of my upcoming book on clean code for
					frontend developers, “Washing your code.”
				</Text>
				<Text>
					<Link href="/book/">Preorder the book now</Link> with 20% discount!
				</Text>
			</Stack>
			<Link href="/book/">
				<BookCover variant="small" />{' '}
			</Link>
		</Stack>
	);
}
