import Base from './Base';
import PostExcerptList from './components/PostExcerptList';

export default function($) {
	const { documentsTotal, tag } = $;
	const { typoTitle, __ } = $;
	return (
		<Base {...$} noIndex>
			<h2 class="page-title">
				{typoTitle(__('allPostsTagged', { num: documentsTotal, tag: __('tagNames.' + tag) }))}
			</h2>
			<PostExcerptList {...$} />
		</Base>
	);
}
