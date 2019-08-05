import React from 'react';
import styled from 'styled-components';
import { Box, TextContent } from 'tamia';

const Container = styled(Box)`
	/* Bigger font size on desktop */
	line-height: ${p => p.theme.lineHeights.small};
	font-size: ${p => p.theme.fontSizes.m};
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		line-height: ${p => p.theme.lineHeights.base};
		font-size: ${p => p.theme.fontSizes.mplus};
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

type Props = {
	children: React.ReactNode;
};

export default function PostContent({ children }: Props) {
	return <Container as={TextContent}>{children}</Container>;
}
