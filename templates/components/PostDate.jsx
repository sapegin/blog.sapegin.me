import Block from 'tamia/lib/components/Block';
import { Small } from 'tamia/lib/components/Text';

export default function({ date }, children, { dateToString }) {
	return (
		<Block component="footer" bottom={2}>
			<Small component="time" datetime={date.toISOString()}>
				{dateToString(date)}
			</Small>
		</Block>
	);
}
