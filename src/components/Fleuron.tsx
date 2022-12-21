import React from 'react';
import { Text } from 'tamia';

export default function Fleuron() {
	return (
		<Text as="div" role="separator" textAlign="center" sx={{ fontSize: 'l' }}>
			<span aria-hidden="true">❦</span>
		</Text>
	);
}
