import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
	border-radius: 3px;
	border-style: solid;
	border-width: 1px;
	border-color: rgba(255, 255, 255, 0.7) rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3)
		rgba(255, 255, 255, 0.7);
	::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 10px;
		border-left: 1px solid rgba(0, 0, 0, 0.15);
	}
	::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 11px;
		border-right: 1px solid rgba(255, 255, 255, 0.5);
	}
	/* Override styles coming from TextContent */
	& img {
		margin: 0;
	}
`;

type Props = {
	variant: 'small' | 'large';
};

export function BookCover({ variant }: Props) {
	return (
		<Container>
			<img
				src={`/images/washing-your-code-cover-${variant}.jpg`}
				width={variant === 'large' ? 250 : 150}
				height={variant === 'large' ? 324 : 194}
				alt=""
			/>
		</Container>
	);
}
