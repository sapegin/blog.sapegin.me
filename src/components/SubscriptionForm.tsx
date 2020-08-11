import React from 'react';
import { Box, Stack, VisuallyHidden } from 'tamia';
import styled from 'styled-components';

const EmailInput = styled.input`
	width: 100%;
	height: 2em;
	padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.s};
	background-color: ${(p) => p.theme.colors.bg};
	color: ${(p) => p.theme.colors.base};
	border: 2px solid ${(p) => p.theme.colors.primary};
	border-radius: 0;
	font-size: ${(p) => p.theme.fontSizes.m};
	font-family: ${(p) => p.theme.fonts.base};
	appearance: none;

	&:focus {
		outline: 0;
		border-color: ${(p) => p.theme.colors.hover};
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	height: 2em;
	padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.m};
	background-color: ${(p) => p.theme.colors.base};
	color: ${(p) => p.theme.colors.bg};
	border: 2px solid ${(p) => p.theme.colors.primary};
	font-size: ${(p) => p.theme.fontSizes.m};
	font-family: ${(p) => p.theme.fonts.base};
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${(p) => p.theme.colors.hover};
		border-color: ${(p) => p.theme.colors.hover};
		cursor: pointer;
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&::-moz-focus-inner {
		border: 0;
	}
`;

export default function SubscriptionForm() {
	return (
		<>
			<Stack
				as="form"
				method="post"
				action="https://tinyletter.com/sapegin"
				target="_blank"
				direction={['column', 'row']}
				gap={0}
			>
				<Box as="label" width={1}>
					<VisuallyHidden>Your email</VisuallyHidden>
					<EmailInput
						name="email"
						type="email"
						required
						autoComplete="home email"
						autoCapitalize="off"
						autoCorrect="off"
						placeholder="Your email"
						defaultValue=""
					/>
				</Box>
				<Box flexShrink={0}>
					<SubmitButton type="submit">Subscribe</SubmitButton>
				</Box>
			</Stack>
		</>
	);
}
