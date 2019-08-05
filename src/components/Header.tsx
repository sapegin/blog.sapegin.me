import React from 'react';
import { Link } from 'tamia-gatsby-link';
import styled from 'styled-components';
import { title } from '@strings';

const Container = styled.header`
	text-align: center;
	font-size: ${p => p.theme.fontSizes.m};
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		font-size: ${p => p.theme.fontSizes.l};
	}
`;

const Logo = styled.h1`
	font-size: inherit;
	font-weight: inherit;
`;

type Props = {
	url: string;
};

export default function Header({ url }: Props) {
	return (
		<Container>
			{url === '/' ? <Logo>{title}</Logo> : <Link href="/">{title}</Link>}
		</Container>
	);
}
