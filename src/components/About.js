import React from 'react';
import { Heading } from 'tamia';
import { aboutTitle, LongDescription } from '@strings';

const About = () => (
	<>
		<Heading as="h2" level={3} mb="m">
			{aboutTitle}
		</Heading>
		<LongDescription />
	</>
);

export default About;
