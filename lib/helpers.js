import {
	og,
	meta,
	getFirstParagraph,
	getFirstImage,
	cleanHtml
} from 'sweet2/lib/util';

// Page title
export function getPageTitle(suffix) {
	if (this.pageTitle) {
		return this.pageTitle;
	}
	if (this.title) {
		if (suffix === undefined) {
			suffix = ' — ' + this.option('title');
		}
		return cleanHtml(this.title) + (suffix || '');
	}
	else {
		return this.option('title');
	}
}

// OG, Twitter Card and other meta tags
export function getMetaTags() {
	let tags = [
		meta('viewport', 'width=device-width, initial-scale=1.0')
	];

	if (this.noindex) {
		tags.push(meta('robots', 'noindex follow'));
	}

	let twType;
	let ogType;
	if (this.isHome()) {
		ogType = 'website';
	}
	else if (this.layout === 'post') {
		twType = 'summary';
		ogType = 'article';
	}

	if (!twType && !ogType) {
		return tags.join('\n');
	}

	let title = this.getPageTitle(false) || this.title || this.option('title');
	let description = this.description;
	let content = this.content;

	let image;

	if (!description) {
		if (content) {
			let firstParagraph = getFirstParagraph(content);
			if (firstParagraph) {
				description = firstParagraph;
			}
		}
		if (!description) {
			description = this.option('description');
		}
	}

	if (content) {
		let firstImage = getFirstImage(content);
		if (firstImage) {
			twType = 'summary_large_image';
			image = firstImage;
		}
	}
	if (!image) {
		image = this.absolutizeUrl('/images/userpic.jpg');
	}

	tags.push(
		meta('description', description),
		og('og:type', ogType),
		og('og:title', title),
		og('og:url', this.absolutizeUrl(this.url)),
		og('og:site_name', this.option('title')),
		og('og:description', description),
		og('og:image', image)
	);

	if (twType) {
		tags.push(
			meta('twitter:card', twType),
			meta('twitter:title', title),
			meta('twitter:description', description),
			meta('twitter:creator', '@' + this.option('twitterName'))
		);
	}

	return tags.join('\n');
}
