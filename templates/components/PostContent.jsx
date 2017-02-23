import Block from 'tamia/lib/components/Block';
import { Alpha } from 'tamia/lib/components/Text';
import PostDate from './PostDate';
import PostFeedback from './PostFeedback';
import Share from './Share';
import s from './PostContent.pcss';

export default function({ title, content, medium, sourcePath, date }, children, { typo, typoTitle }) {
	return (
		<Block component="article" bottom={6} class={s.root}>
			<Alpha>{typoTitle(title)}</Alpha>
			<Block bottom={4} class="text">
				{typo(content)}
			</Block>
			<PostFeedback medium={medium} sourcePath={sourcePath} />
			<PostDate date={date} />
			<Share title={title} />
		</Block>
	);
}
