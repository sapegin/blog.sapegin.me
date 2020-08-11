import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

/*
 * Stripes at the top and the bottom of the page.
 * Contains global body styles to changes the background to the color of stripes
 * and remove padding
 */

const Container = styled.div`
	::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: ${(p) => p.theme.space.s};
		background-color: ${(p) => p.theme.colors.accent};
	}
`;

const GlobalStyles = createGlobalStyle`
	:root body {
		position: relative;
	}
	:root body::before,
	:root body::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: ${(p) => p.theme.space.s};
		background-color: ${(p) => p.theme.colors.accent};
	}
	:root body::before {
		top: 0;
	}
	:root body::after {
		bottom: 0;
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
