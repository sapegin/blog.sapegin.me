import React from 'react';
import { Text } from 'tamia';
import Invert from './Invert';

interface Props {
	children: React.ReactNode;
}

export default function Banner({ children }: Props) {
	return (
		<Invert>
			<Text p="s" textAlign="center" sx={{ bg: 'bg', color: 'base' }}>
				{children}
			</Text>
		</Invert>
	);
}
