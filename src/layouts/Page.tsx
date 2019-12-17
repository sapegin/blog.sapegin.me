import React from 'react';
import { Container, Box } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageFooter from '../components/PageFooter';
import PageContainer from '../components/PageContainer';
import Base from './Base';

type Props = {
	children: React.ReactNode;
	url: string;
	title?: string;
};

const Page = ({ children, url }: Props) => {
	return (
		<Base>
			<PageContainer>
				<Container>
					<Box mb="l">
						<Header url={url} />
					</Box>
					<Box as="main" role="main" mb="l">
						{children}
					</Box>
					<footer>
						<PageFooter />
						<Footer />
					</footer>
				</Container>
			</PageContainer>
		</Base>
	);
};

export default Page;
