import React from 'react';
import styled from '@emotion/styled';
import { Box, TextContent, themeGet } from 'tamia';

const Container = styled(Box)`
	/* Bigger font size on desktop */
	line-height: ${themeGet('lineHeights.small')};
	font-size: ${themeGet('fontSizes.m')};
	@media (min-width: ${themeGet('breakpoints.small')}) {
		line-height: ${themeGet('lineHeights.base')};
		font-size: ${themeGet('fontSizes.mplus')};
	}

	/* Normalize use bolder which doesn't work with Georgia for some reason */
	strong {
		font-weight: bold;
	}

	hr {
		text-align: center;
		border: 0;
		/* Make top and bottom margins more or less the same */
		margin-bottom: 2.5rem;
	}
	hr::after {
		content: '···';
		letter-spacing: 0.7em;
	}
`;

export default function PostContent({ children }) {
	return <Container as={TextContent}>{children}</Container>;
}
