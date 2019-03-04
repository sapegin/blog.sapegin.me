import { css } from '@emotion/core';
import theme from '../theme';

export const globalStyles = css`
	html {
		/* Stripes at the top and the bottom of the page */
		padding: ${theme.space.s} 0;
		background-color: ${theme.colors.accent};
	}
`;
