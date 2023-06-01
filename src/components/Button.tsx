import styled from 'styled-components';

type Props = {
	variant?: 'large' | 'medium';
};

export const Button = styled.button<Props>`
	padding: ${(p) =>
			p.variant === 'large' ? p.theme.space.s : p.theme.space.xs}
		${(p) => (p.variant === 'large' ? p.theme.space.l : p.theme.space.m)};
	background-color: ${(p) => p.theme.colors.base};
	color: ${(p) => p.theme.colors.bg};
	border: 2px solid ${(p) => p.theme.colors.primary};
	font-size: ${(p) =>
		p.variant === 'large' ? p.theme.fontSizes.l : p.theme.fontSizes.m};
	font-family: ${(p) => p.theme.fonts.base};
	text-decoration: none;
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${(p) => p.theme.colors.hover};
		border-color: ${(p) => p.theme.colors.hover};
		cursor: pointer;
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;
