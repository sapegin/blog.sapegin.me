import { Gamma } from 'tamia/lib/components/Text';

export default function(props, children, { typo, __ }) {
	return (
		<div>
			<Gamma>{__('aboutTitle')}</Gamma>
			<div class="text">
				{typo(__('longDescription'))}
			</div>
		</div>
	);
}
