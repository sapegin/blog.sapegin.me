import Base from './Base';
import PostContent from './components/PostContent';
import PostFooter from './components/PostFooter';

export default function(props) {
	return (
		<Base>
			<PostContent {...props} />
			<PostFooter {...props} />
		</Base>
	);
}
