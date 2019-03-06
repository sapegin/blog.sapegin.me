import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

export const lang = 'en';
export const title = 'Artem Sapegin’s Blog';
export const description =
	'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.';
export const siteUrl = 'https://blog.sapegin.me';
export const author = 'Artem Sapegin';
export const twitter = '@iamsapegin';
export const aboutTitle = 'About me';
export const relatedTitle = 'You may also like';
export const subscribeTitle = 'Join the newsletter';
export const subscribeInfo = 'Subscribe to get my latest posts by email.';
export const discussPost = 'Discuss on Twitter';
export const editPost = 'Edit on GitHub';
export const subscriptionEmailLabel = 'Your email';
export const subscriptionSubmitLabel = 'Subscribe';

export const Intro = null;

export const LongDescription = () => (
	<>
		<Text mb="m" size="s">
			I’m a frontend developer living in&nbsp;Berlin, Germany. I&nbsp;work
			at&nbsp;
			<Link href="https://www.wayfair.com/">Wayfair</Link>,
			and&nbsp;in&nbsp;my&nbsp;spare time I&nbsp;love making photos, writing,
			hanging out with my&nbsp;dogs and&nbsp;drinking lots of coffee.
			I’m&nbsp;interested in&nbsp;design systems, testings
			and&nbsp;accessibility.
		</Text>
		<Text mb="m" size="s">
			<Link href="https://sapegin.me/">Check out</Link> my&nbsp;projects,{' '}
			<Link href="https://twitter.com/iamsapegin">follow&nbsp;me</Link>{' '}
			on&nbsp;Twitter or&nbsp;
			<Link href="https://github.com/sapegin/ama">ask&nbsp;me</Link> anything.
		</Text>
	</>
);

export const PublishedOn = ({ date }) => (
	<>
		Published <nobr>on {date}</nobr>
	</>
);

export const PoweredBy = () => (
	<>
		Powered by <Link href="https://www.gatsbyjs.org/">Gatsby</Link> and{' '}
		<Link href="https://emotion.sh/">Emotion</Link>, hosted on{' '}
		<Link href="https://www.netlify.com/">Netlify</Link>
	</>
);
