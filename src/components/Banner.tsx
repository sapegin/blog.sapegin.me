import React from 'react';
import { Text } from 'tamia';
import Invert from './Invert';

interface Props {
	children: React.ReactNode;
}

export default function Banner({ children }: Props) {
	return (
		<Invert>
			<Text p="s" bg="bg" color="base" textAlign="center">
				{children}
			</Text>
		</Invert>
	);
}
