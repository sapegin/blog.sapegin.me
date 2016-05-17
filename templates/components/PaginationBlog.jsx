export default ({
	nextUrl,
	__,
}) => (
	nextUrl && (
		<div class="pagination">
			<a href={nextUrl} class="link link_quoted">↧ <u>{__('earlier')}</u></a>
		</div>
	)
);
