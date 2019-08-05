import React from 'react';
import { Heading } from 'tamia';
import Page from './Page';

type Props = {
	children: React.ReactNode;
	url: string;
	title: string;
};

export default function PageWithTitle({ children, ...props }: Props) {
	return (
		<Page {...props}>
			<Heading level={1} mb="l">
				{props.title}
			</Heading>
			{children}
		</Page>
	);
}
