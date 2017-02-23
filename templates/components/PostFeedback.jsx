import Block from 'tamia/lib/components/Block';
import Group from 'tamia/lib/components/Group';
import cx from 'classnames';
import s from './PostFeedback.pcss';

export default function({ medium, sourcePath }, children, { __ }) {
	return (
		<Block bottom={1} class={cx(s.root, 'text', 'no-print')}>
			<Group>
				{medium && __('postComments', { url: `https://medium.com/@sapegin/${medium}` })}
				{__('postFeedback', { url: `https://github.com/sapegin/blog.sapegin.me/edit/master/source/${sourcePath}` })}
			</Group>
		</Block>
	);
}
