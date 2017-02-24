import Link from 'tamia/lib/components/Link';
import Group from 'tamia/lib/components/Group';
import s from './Nav.pcss';

export default function(props, children, { url, translation, option, __ }) {
	const translationUrl = option('translationHost') + (translation ? url : '');
	return (
		<Group component="nav" separator="·" class={s.root}>
			{url === '/' ? (
				<h1 class={s.item}>{__('title')}</h1>
			) : (
				<Link class={s.item} href="/">{__('title')}</Link>
			)}
			<Link class={s.item} id="search-link" component="button" type="button">
				{__('search')}
			</Link>
			<Link class={s.item} href={translationUrl}>
				{__('translation')}
			</Link>
		</Group>
	);
}
