import {
	og,
	meta,
	getFirstParagraph,
	getFirstImage,
} from 'fledermaus/lib/util';

/* eslint-disable no-invalid-this */

// OG, Twitter Card and other meta tags
export function getMetaTags() {
	const tags = [
		meta('viewport', 'width=device-width, initial-scale=1.0'),
	];

	if (this.noIndex) {
		tags.push(meta('robots', 'noindex follow'));
	}

	let twType;
	let ogType;
	if (this.url === '/') {
		ogType = 'website';
	}
	else if (this.layout === 'post') {
		twType = 'summary';
		ogType = 'article';
	}

	if (!twType && !ogType) {
		return tags;
	}

	const title = this.getPageTitle(false) || this.title || this.option('title');
	let description = this.description;
	const content = this.content;

	let image;

	if (!description) {
		if (content) {
			const firstParagraph = getFirstParagraph(content);
			if (firstParagraph) {
				description = firstParagraph;
			}
		}
		if (!description) {
			description = this.option('description');
		}
	}

	if (content) {
		const firstImage = getFirstImage(content);
		if (firstImage) {
			twType = 'summary_large_image';
			image = firstImage;
		}
	}
	if (!image) {
		image = '/images/userpic.jpg';
	}

	tags.push(
		meta('description', description),
		og('og:type', ogType),
		og('og:title', title),
		og('og:url', this.absolutizeUrl(this.url)),
		og('og:site_name', this.option('title')),
		og('og:description', description),
		og('og:image', this.absolutizeUrl(image))
	);

	if (twType) {
		tags.push(
			meta('twitter:card', twType),
			meta('twitter:title', title),
			meta('twitter:description', description),
			meta('twitter:creator', '@' + this.option('twitterName'))
		);
	}

	return tags;
}
