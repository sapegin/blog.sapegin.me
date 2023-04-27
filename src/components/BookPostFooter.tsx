import React from 'react';
import { Stack, Text, Link } from 'tamia';

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
					<Link href="http://leanpub.com/washingcode/c/blog-reader">
						Preorder it on Leanpub
					</Link>{' '}
					(with 20% discount!) or{' '}
					<Link href="https://github.com/sapegin/washingcode-book/">
						read a draft online
					</Link>
					.
				</Text>
			</Stack>
			<Link href="http://leanpub.com/washingcode/c/blog-reader">
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
