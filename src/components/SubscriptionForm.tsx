import React from 'react';
import { VisuallyHidden } from 'tamia';
import styled from 'styled-components';
import { subscriptionEmailLabel, subscriptionSubmitLabel } from '@strings';

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Column = styled.div`
	width: 100%;

	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		width: auto;
	}
`;

const EmailInput = styled.input`
	width: 100%;
	height: 2em;
	padding: ${p => p.theme.space.xs} ${p => p.theme.space.s};
	background-color: ${p => p.theme.colors.bg};
	color: ${p => p.theme.colors.base};
	border: 2px solid ${p => p.theme.colors.primary};
	border-radius: 0;
	font-size: ${p => p.theme.fontSizes.m};
	font-family: ${p => p.theme.fonts.base};
	appearance: none;

	&:focus {
		outline: 0;
		border-color: ${p => p.theme.colors.hover};
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	height: 2em;
	padding: ${p => p.theme.space.xs} ${p => p.theme.space.m};
	background-color: ${p => p.theme.colors.base};
	color: ${p => p.theme.colors.bg};
	border: 2px solid ${p => p.theme.colors.primary};
	font-size: ${p => p.theme.fontSizes.m};
	font-family: ${p => p.theme.fonts.base};
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${p => p.theme.colors.hover};
		border-color: ${p => p.theme.colors.hover};
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
					<VisuallyHidden>{subscriptionEmailLabel}</VisuallyHidden>
					<EmailInput
						name="email"
						type="email"
						required
						autoComplete="home email"
						autoCapitalize="off"
						autoCorrect="off"
						placeholder={subscriptionEmailLabel}
						defaultValue=""
					/>
				</Column>
				<Column>
					<SubmitButton type="submit">{subscriptionSubmitLabel}</SubmitButton>
				</Column>
			</Form>
		</>
	);
}
