import React from 'react';
import { Stack, Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { BookCover } from './BookCover';

export function BookPostFooter() {
	return (
		<Stack direction="row" gap="m">
			<Stack gap="m">
				<Text variant="intro">
					If you have any feedback,{' '}
					<Link href="https://mastodon.cloud/@sapegin">mastodon me</Link>,{' '}
					<Link href="https://twitter.com/iamsapegin">tweet me</Link>,{' '}
					<Link href="https://github.com/sapegin/washingcode-book/issues">
						open an issue
					</Link>{' '}
					on GitHub, or email me at{' '}
					<Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>
				</Text>
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
