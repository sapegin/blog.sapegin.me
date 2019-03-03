import { css } from '@emotion/core';
import theme from '../theme';

const size = theme.space.s;
const color = theme.colors.accent;

export const globalStyles = css`
	body {
		/* Stripes at the top and the bottom of the page */
		background-image: linear-gradient(
			to bottom,
			${color} ${size},
			transparent ${size},
			transparent calc(100% - ${size}),
			${color} calc(100% - ${size})
		);

		/* Make pulling the page look nicer */
		&::before,
		&::after {
			position: fixed;
			content: '';
			background-color: ${color};
			right: 0;
			left: 0;
			height: 50vh;
		}
		&::before {
			top: -50vh;
		}
		&::after {
			bottom: -50vh;
		}
	}
`;
