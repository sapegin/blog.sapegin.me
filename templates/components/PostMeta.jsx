export default ({
	tag, date, tags,
	__, dateToString,
}) => (
	<footer class="note-meta">
		{tags &&
			<span class="note-tags">
				{tags.map(currentTag => (
					currentTag === tag ? (
						<span class="note-tags__tag note-tags__tag_marked marked">{__(`tagNames.${currentTag}`)}</span>
					) : (
						<a href={`/tags/${currentTag}`} class="note-tags__tag link">{__(`tagNames.${currentTag}`)}</a>
					)
				))}
			</span>
		}
		<time class="note-published" datetime={date.toISOString()}>{dateToString(date)}</time>
	</footer>
);
