import Base from './Base';
import PostExcerptList from './components/PostExcerptList';

export default function($) {
	const { lang, nextUrl } = $;
	const { __ } = $;
	return (
		<Base {...$} noIndex={!!nextUrl}>
			{lang === 'ru' &&
				<div class="blog-intro">{__('goingEnglish')}</div>
			}
			<PostExcerptList {...$} />
		</Base>
	);
}
