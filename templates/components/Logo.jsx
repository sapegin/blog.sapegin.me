import Link from 'tamia/lib/components/Link';
import s from './Logo.pcss';

export default function(props, children, { url, __ }) {
	if (url === '/') {
		return (
			<h1 class={s.logo}>
				{__('title')}
			</h1>
		);
	}

	return (
		<div class={s.logo}>
			<Link href="/">{__('title')}</Link>
		</div>
	);
}
