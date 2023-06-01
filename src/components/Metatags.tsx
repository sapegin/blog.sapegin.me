import React from 'react';
import { Helmet } from 'react-helmet';

const SITE_URL = 'https://blog.sapegin.me';
const SITE_TITLE = 'Artem Sapegin’s Blog';

type Props = {
	slug: string;
	title?: string;
	pageTitle?: string;
	description?: string;
	children?: React.ReactNode;
};

const getTitle = ({ title, pageTitle }: Pick<Props, 'title' | 'pageTitle'>) => {
	if (pageTitle) {
		return pageTitle;
	}

	if (title) {
		return `${title} — ${SITE_TITLE}`;
	}

	return SITE_TITLE;
};

export default function Metatags({
	slug,
	title,
	pageTitle,
	description = 'Blog of a Berlin based coffee first frontend engineer, who makes photos and hangs out with his dogs.',
	children,
}: Props) {
	const isBlogPost = slug.startsWith('/all/');
	const imageUrl = isBlogPost && `${SITE_URL}${slug}twitter-card.jpg`;
	return (
		<Helmet title={getTitle({ title, pageTitle })}>
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
