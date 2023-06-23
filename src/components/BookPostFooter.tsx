import React from 'react';
import { Stack, Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { BookCover } from './BookCover';
import { BookFeedback } from './BookFeedback';

export function BookPostFooter() {
	return (
		<Stack direction="row" gap="m">
			<Stack gap="m">
				<BookFeedback>If you have any feedback, drop me a line at</BookFeedback>
				<Text>
					<Link href="/book/">Preorder the book now</Link> with 20% discount!
				</Text>
			</Stack>
			<Link href="/book/">
				<BookCover variant="small" />
			</Link>
		</Stack>
	);
}
