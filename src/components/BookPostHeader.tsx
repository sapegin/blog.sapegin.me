import React from 'react';
import { Stack, Heading, Text, Image, Link } from 'tamia';

export function BookPostHeader() {
	return (
		<Stack direction="row" gap="m">
			<Stack gap="m">
				<Text variant="intro">
					You’re reading an excerpt of my upcoming book on clean code for
					frontend developers, “Washing your code: write once, read seven
					times.”
				</Text>
				<Text>
					<Link href="https://leanpub.com/washingcode/">
						Preorder it on Leanpub
					</Link>{' '}
					or{' '}
					<Link href="https://github.com/sapegin/washingcode-book/blob/master/manuscript/book.md">
						read a draft online
					</Link>
					.
				</Text>
			</Stack>
			<Link href="https://leanpub.com/washingcode/">
				<img
					src="/images/washing-your-code-cover-small.jpg"
					width={150}
					height={194}
					alt=""
				/>
			</Link>
		</Stack>
	);
}
