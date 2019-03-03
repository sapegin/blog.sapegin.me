import React from 'react';
import { VisuallyHidden, themeGet } from 'tamia';
import styled from '@emotion/styled';

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Column = styled.div`
	width: 100%;

	@media (min-width: ${themeGet('breakpoints.small')}) {
		width: auto;
	}
`;

const EmailInput = styled.input`
	width: 100%;
	height: 2em;
	padding: ${themeGet('space.xs')} ${themeGet('space.s')};
	background-color: ${themeGet('colors.bg')};
	color: ${themeGet('colors.base')};
	border: 2px solid ${themeGet('colors.primary')};
	border-radius: 0;
	font-size: ${themeGet('fontSizes.m')};
	font-family: ${themeGet('fonts.base')};
	appearance: none;

	&:focus {
		outline: 0;
		border-color: ${themeGet('colors.hover')};
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	height: 2em;
	padding: ${themeGet('space.xs')} ${themeGet('space.m')};
	background-color: ${themeGet('colors.base')};
	color: ${themeGet('colors.bg')};
	border: 2px solid ${themeGet('colors.primary')};
	font-size: ${themeGet('fontSizes.m')};
	font-family: ${themeGet('fonts.base')};
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${themeGet('colors.hover')};
		border-color: ${themeGet('colors.hover')};
		cursor: pointer;
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&::-moz-focus-inner {
		border: 0;
	}
`;
export default function() {
	return (
		<>
			<Form
				method="post"
				action="https://tinyletter.com/sapegin"
				target="_blank"
			>
				<Column as="label">
					<VisuallyHidden>Your email:</VisuallyHidden>
					<EmailInput
						name="email"
						type="email"
						required
						autocomplete="home email"
						autocapitalize="off"
						autocorrect="off"
						placeholder="Your email"
						defaultValue=""
					/>
				</Column>
				<Column>
					<SubmitButton type="submit">Subscribe</SubmitButton>
				</Column>
			</Form>
		</>
	);
}
