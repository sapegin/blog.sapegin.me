import React from 'react';
import Helmet from 'react-helmet';
import {
	title as siteTitle,
	siteUrl,
	description as defaultDescription,
	twitter,
} from '@strings';

type Props = {
	slug: string;
	title?: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
	children?: React.ReactNode;
};

export default function Metatags({
	slug,
	title = siteTitle,
	description = defaultDescription,
	image,
	noIndex = false,
	children,
}: Props) {
	const isBlogPost = slug.startsWith('/all/');
	const imageUrl = image && `${siteUrl}${image}`;
	return (
		<Helmet>
			{noIndex && <meta name="robots" content="noindex follow" />}
			<meta name="description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
			<meta property="og:title" content={title} />
			<meta property="og:url" content={`${siteUrl}${slug}`} />
			<meta property="og:site_name" content={siteTitle} />
			<meta property="og:description" content={description} />
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:creator" content={twitter} />
			{children}
		</Helmet>
	);
}
