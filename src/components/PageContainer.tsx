import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import theme from '../theme';

/*
 * Stripes at the top and the bottom of the page.
 * Contains global body styles to changes the background to the color of stripes
 * and remove padding
 */

const Container = styled.div`
	margin: ${p => p.theme.space.s} 0;
	padding: ${p => p.theme.space.s} ${p => p.theme.space.m};
	background-color: ${p => p.theme.colors.bg};
`;

const GlobalStyles = createGlobalStyle`
	:root body {
		/* Override default styles */
		padding: 0;
		background-color: ${theme.colors.accent};
	}
`;

type Props = {
	children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
	return (
		<Container>
			<GlobalStyles />
			{children}
		</Container>
	);
}
