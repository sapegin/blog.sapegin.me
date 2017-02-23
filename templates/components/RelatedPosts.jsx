import { Gamma } from 'tamia/lib/components/Text';
import PostList from './PostList';

export default function({ posts }, children, { __ }) {
	return (
		<div>
			<Gamma>{__('relatedTitle')}</Gamma>
			<PostList posts={posts} />
		</div>
	);
}
