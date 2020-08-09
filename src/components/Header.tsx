import React from 'react';
import { Link } from 'tamia-gatsby-link';
import styled from 'styled-components';

const Container = styled.header`
	text-align: center;
	font-family: ${(p) => p.theme.fonts.heading};
	font-size: ${(p) => p.theme.fontSizes.m};
	@media (min-width: ${(p) => p.theme.breakpoints[0]}) {
		font-size: ${(p) => p.theme.fontSizes.l};
	}
`;

const Logo = styled.h1`
	font-size: inherit;
	font-weight: inherit;
`;

type Props = {
	title?: string;
	url: string;
};

export default function Header({ title = 'Artem Sapegin’s Blog', url }: Props) {
	return (
		<Container>
			{url === '/' ? <Logo>{title}</Logo> : <Link href="/">{title}</Link>}
		</Container>
	);
}
