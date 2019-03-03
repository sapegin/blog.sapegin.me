import React from 'react';
import { themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import styled from '@emotion/styled';
import { title } from '../strings';

const Container = styled.header`
	text-align: center;
	font-size: ${themeGet('fontSizes.m')};
	@media (min-width: ${themeGet('breakpoints.small')}) {
		font-size: ${themeGet('fontSizes.l')};
	}
`;

const Logo = styled.h1`
	font-size: inherit;
	font-weight: inherit;
`;

const Header = ({ url }) => (
	<Container>
		{url === '/' ? <Logo>{title}</Logo> : <Link href="/">{title}</Link>}
	</Container>
);

export default Header;
