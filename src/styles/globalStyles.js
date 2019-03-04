import { css } from '@emotion/core';
import theme from '../theme';

export const globalStyles = css`
	:root body {
		/* Stripes at the top and the bottom of the page */
		background-color: ${theme.colors.accent};
	}
`;
