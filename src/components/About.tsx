import React from 'react';
import { Heading, Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

export default function About() {
	return (
		<>
			<Heading as="h2" level={3} mb="m">
				About me
			</Heading>
			<Text mb="m" variant="small">
				I’m a frontend engineer living in&nbsp;Berlin, Germany. I&nbsp;work
				at&nbsp;
				<Link href="https://omio.com/">Omio</Link>,
				and&nbsp;in&nbsp;my&nbsp;spare time I&nbsp;love making photos, writing,
				hanging out with my&nbsp;dogs and&nbsp;drinking lots of coffee.
				I’m&nbsp;interested in&nbsp;design systems, testings
				and&nbsp;accessibility.
			</Text>
			<Text variant="small">
				<Link href="https://sapegin.me/">Check&nbsp;out</Link> my&nbsp;projects,{' '}
				<Link href="https://twitter.com/iamsapegin">follow&nbsp;me</Link>{' '}
				on&nbsp;Twitter or&nbsp;
				<Link href="https://github.com/sapegin/ama">ask&nbsp;me</Link> anything.
			</Text>
		</>
	);
}
