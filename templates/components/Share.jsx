import Block from 'tamia/lib/components/Block';
import ShareFacebook from 'tamia/lib/components/ShareFacebook';
import ShareTwitter from 'tamia/lib/components/ShareTwitter';

export default function({ title }, children, { url, absolutizeUrl, __ }) {
	const pageUrl = absolutizeUrl(url);
	return (
		<Block bottom={2} class="no-print">
			<ShareFacebook pageUrl={pageUrl} pageTitle={title}>
				{__('facebook')}
			</ShareFacebook>
			<ShareTwitter pageUrl={pageUrl} pageTitle={title}>
				{__('twitter')}
			</ShareTwitter>
		</Block>
	);
}
