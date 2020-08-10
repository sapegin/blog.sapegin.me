import React from 'react';
import { Container, Box, Text, QuotedLink } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
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
			<Box as="aside" aria-label="Current offers">
				<Banner>
					<QuotedLink href="http://leanpub.com/washingcode/c/stayathome-blog">
						<Text
							as="span"
							aria-hidden="true"
							fontSize="l"
							lineHeight={1}
							verticalAlign="middle"
						>
							☞
						</Text>
						&nbsp;Wash your&nbsp;hands and&nbsp;your&nbsp;code:{' '}
						<u>start reading my&nbsp;upcoming book on&nbsp;clean code</u> with
						a&nbsp;discount
					</QuotedLink>
				</Banner>
			</Box>
			<PageContainer>
				<Container>
					<Box mb="l">
						<Header url={url} />
					</Box>
					<Box as="main" mb="l">
						{children}
					</Box>
					<PageFooter />
					<Footer />
				</Container>
			</PageContainer>
		</Base>
	);
};

export default Page;
