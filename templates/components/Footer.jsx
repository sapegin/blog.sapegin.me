import Link from 'tamia/lib/components/Link';
import cx from 'classnames';
import s from './Footer.pcss';

export default function(props, children, { option, __ }) {
	return (
		<footer class={s.root}>
			<div class={s.copyright}>
				© <Link href={option('copyrightUrl')}>{__('author')}</Link>{', '}
				2008—{(new Date()).getFullYear()}
			</div>
			<div class={cx(s.powered, 'text')}>
				{__('poweredBy')}
			</div>
		</footer>
	);
}
