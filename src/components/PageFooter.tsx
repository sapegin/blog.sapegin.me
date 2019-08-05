import React from 'react';
import { Stack, Box } from 'tamia';
import About from './About';
import Subscription from './Subscription';

export default function PostFooter() {
	return (
		<Stack gridGap="m" mb="m" minColumnWidth={320}>
			<Box as="aside" mb="m">
				<About />
			</Box>
			<Box as="aside" mb="m">
				<Subscription />
			</Box>
		</Stack>
	);
}
