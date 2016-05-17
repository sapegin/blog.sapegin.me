import PostMeta from './PostMeta';

export default function($) {
	const { post } = $;
	const { typo, typoTitle, __ } = $;
	return (
		<article class="note">
			<h2 class="note-title">
				<a href={post.url} class="link">{typoTitle(post.title)}</a>
			</h2>

			<div class="text">
				{typo(post.excerpt || post.content)}
				{post.more &&
					<p><a href={post.url}>{__('readMore')}</a></p>
				}
			</div>

			<PostMeta {...$} {...post} />
		</article>
	);
}
