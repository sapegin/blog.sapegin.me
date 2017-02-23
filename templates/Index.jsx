import { Gamma } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';
import Base from './Base';
import PostList from './components/PostList';

export default function({ lang, years, postsByYear, __ }) {
	return (
		<Base>
			{lang === 'ru' &&
				<Block bottom={3} class="text">
					<em>{__('goingEnglish')}</em>
				</Block>
			}
			{years.map(year => (
				<div>
					<Gamma component="h2">{year}</Gamma>
					<PostList posts={postsByYear[year]} />
				</div>
			))}
		</Base>
	);
}
