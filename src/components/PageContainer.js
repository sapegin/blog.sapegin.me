import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import theme from '../theme';

/*
 * Stripes at the top and the bottom of the page.
 * Contains global body styles to changes the background to the color of stripes
 * and remove padding
 */

const Container = styled.div`
	margin: ${themeGet('space.s')} 0;
	padding: ${themeGet('space.s')} ${themeGet('space.m')};
	background-color: ${themeGet('colors.bg')};
`;

const globalStyles = css`
	:root body {
		/* Override default styles */
		padding: 0;
		background-color: ${theme.colors.accent};
	}
`;

export default function PageContainer({ children }) {
	return (
		<Container>
			<Global styles={globalStyles} />
			{children}
		</Container>
	);
}
