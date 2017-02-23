import Block from 'tamia/lib/components/Block';
import Link from 'tamia/lib/components/Link';

export default function({ posts }, children, { typoTitle }) {
	return (
		<Block component="ul" bottom={4}>
			{posts.map(post => (
				<Block component="li" bottom={1 / 2}>
					<Link href={post.url}>{typoTitle(post.title)}</Link>
				</Block>
			))}
		</Block>
	);
}
