import React from 'react';
import Helmet from 'react-helmet';
import { Global } from '@emotion/core';
import Provider from './Provider';
import theme from '../theme';
import { prismStyles } from '../styles/prismStyles';
import config from '../../config';

const { lang } = config;

export default function Base({ children }) {
	return (
		<>
			<Helmet>
				<html lang={lang} />
				<meta name="theme-color" content={theme.colors.primary} />
			</Helmet>
			<Global styles={prismStyles} />
			<Provider>{children}</Provider>
		</>
	);
}
