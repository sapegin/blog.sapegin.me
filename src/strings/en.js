import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

export const lang = 'en';
export const title = 'Artem Sapegin’s Blog';
export const description =
	'Blog of a Berlin based frontend developer who works at Here, makes photos, writes, hangs out with his dogs and drinks coffee.';
export const siteUrl = 'https://nano.sapegin.ru/';
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

export const LongDescription = () => (
	<>
		<Text mb="m" size="s">
			I’m a frontend developer living in Berlin, Germany. I work at{' '}
			<Link href="https://www.wayfair.com/">Wayfair</Link>, and in my spare time
			I love making photos, writing, hanging out with my dogs and drinking lots
			of coffee. I’m interested in design systems, testings and accessibility.
		</Text>
		<Text mb="m" size="s">
			<Link href="https://sapegin.me/">Check out</Link> my projects,{' '}
			<Link href="https://twitter.com/iamsapegin">follow me</Link> on Twitter or{' '}
			<Link href="https://github.com/sapegin/ama">ask me</Link> anything.
		</Text>
	</>
);

export const PublishedOn = ({ date }) => <>Published on {date}</>;

export const PoweredBy = () => (
	<>
		Powered by <Link href="https://www.gatsbyjs.org/">Gatsby</Link> and{' '}
		<Link href="https://emotion.sh/">Emotion</Link>, hosted on{' '}
		<Link href="https://www.netlify.com/">Netlify</Link>
	</>
);
