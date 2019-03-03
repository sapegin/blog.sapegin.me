// @flow
import React, { type Node } from 'react';
import { Heading } from 'tamia';
import Page from './Page';

type Props = {
	children: Node,
	url: string,
	title: string,
	pageTitle: string,
	splash: string,
	inverted: boolean,
	fullWidth: boolean,
};

const PageWithTitle = ({ children, ...props }: Props) => (
	<Page {...props}>
		<Heading level={1} mb="l">
			{props.title}
		</Heading>
		{children}
	</Page>
);

export default PageWithTitle;
