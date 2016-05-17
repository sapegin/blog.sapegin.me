import Base from './Base';

export default function($) {
	const { years, postsByYear } = $;
	const { typoTitle } = $;
	return (
		<Base {...$}>
			{years.map(year => (
				<div>
					<h2 class="page-title">{year}</h2>
					<ul class="posts-list">
						{postsByYear[year].map(post => (
							<li class="posts-list__item">
								<a href={post.url} class="posts-list__link link">{typoTitle(post.title)}</a>
							</li>
						))}
					</ul>
				</div>
			))}
		</Base>
	);
}
