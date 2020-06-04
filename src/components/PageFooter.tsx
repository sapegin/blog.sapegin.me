import React from 'react';
import { Grid, Box } from 'tamia';
import About from './About';
import Subscription from './Subscription';

export default function PostFooter() {
	return (
		<Grid gridGap="m" mb="m" minColumnWidth={320}>
			<Box as="aside" mb="m" aria-label="About the author">
				<About />
			</Box>
			<Box as="aside" mb="m" aria-label="Newsletter">
				<Subscription />
			</Box>
		</Grid>
	);
}
