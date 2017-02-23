import Link from 'tamia/lib/components/Link';
import s from './Nav.pcss';

export default function(props, children, { url, translation, option, __ }) {
	const translationUrl = option('translationHost') + (translation ? url : '');
	return (
		<nav class={s.root}>
			<div class={s.item}>
				{url === '/' ? (
					__('allPosts')
				) : (
					<Link href="/">{__('allPosts')}</Link>
				)}
			</div>
			<div class={s.item}>
				<Link id="search-link" component="button" type="button">
					{__('search')}
				</Link>
			</div>
			<div class={s.item}>
				<Link href={translationUrl}>
					{__('translation')}
				</Link>
			</div>
		</nav>
	);
}
