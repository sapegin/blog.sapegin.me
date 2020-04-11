import React from 'react';
import { ThemeProvider } from 'styled-components';
import { inverted } from '../theme';

interface Props {
	children: React.ReactNode;
}

export default function Invert({ children }: Props) {
	return <ThemeProvider theme={inverted}>{children}</ThemeProvider>;
}
