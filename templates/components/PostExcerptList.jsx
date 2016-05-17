import PostExcerpt from './PostExcerpt';
import PaginationBlog from './PaginationBlog';

export default function($) {
	const { documents } = $;
	return (
		<div>
			{documents.map(post => (
				<PostExcerpt {...$} post={post} />
			))}
			<PaginationBlog {...$} />
		</div>
	);
}
