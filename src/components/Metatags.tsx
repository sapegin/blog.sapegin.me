import React from 'react';
import Helmet from 'react-helmet';

const SITE_URL = 'https://blog.sapegin.me';
const SITE_TITLE = 'Artem Sapegin’s Blog';

type Props = {
	slug: string;
	title?: string;
	description?: string;
	image?: string;
	children?: React.ReactNode;
};

export default function Metatags({
	slug,
	title,
	description = 'Blog of a Berlin based coffee first frontend engineer, who makes photos and hangs out with his dogs.',
	image,
	children,
}: Props) {
	const isBlogPost = slug.startsWith('/all/');
	const imageUrl = image && `${SITE_URL}${image}`;
	return (
		<Helmet title={title ? `${title} — ${SITE_TITLE}` : SITE_TITLE}>
			<meta name="description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
			<meta property="og:title" content={title} />
			<meta property="og:url" content={`${SITE_URL}${slug}`} />
			<meta property="og:site_name" content={SITE_TITLE} />
			<meta property="og:description" content={description} />
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:creator" content="@iamsapegin" />
			{children}
		</Helmet>
	);
}
