import Script from 'tamia/lib/components/Script';
import cx from 'classnames';
import s from './SearchForm.pcss';

export default function(props, children, { lang, option, __ }) {
	return (
		<form id="search" class={cx(s.root, 'no-print', 'is-hidden')} action={option('searchAction')} method="get">
			<input type="hidden" name="searchid" value={option('searchId')} />
			<input type="hidden" name="l10n" value={lang} />
			<input
				type="search"
				class={cx(s.field, 'js-field')}
				name="text"
				placeholder={__('search')}
				value=""
			/>
			<Script entry="search-form" inline />
		</form>
	);
}
