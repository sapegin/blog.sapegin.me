import React from 'react';
import { Helmet } from 'react-helmet';
import Provider from './Provider';
import theme from '../theme';
import { PrismStyles } from '../styles/prismStyles';

type Props = {
	children: React.ReactNode;
};

export default function Base({ children }: Props) {
	return (
		<>
			<Helmet>
				<html lang="en" />
				<meta name="theme-color" content={theme.colors.accent} />
			</Helmet>
			<PrismStyles />
			<Provider>{children}</Provider>
		</>
	);
}
