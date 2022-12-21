import React from 'react';
import { Container, Box, Stack, Text, QuotedLink } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
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
					<QuotedLink href="http://leanpub.com/washingcode/c/blog-reader">
						<Text
							as="span"
							aria-hidden="true"
							verticalAlign="middle"
							sx={{ fontSize: 'l', lineHeight: 1 }}
						>
							☞
						</Text>
						&nbsp;Wash your&nbsp;hands and&nbsp;your&nbsp;code:{' '}
						<u>start reading my&nbsp;upcoming book on&nbsp;clean code</u> with
						20%&nbsp;discount
					</QuotedLink>
				</Banner>
			</Box>
			<PageContainer>
				<Container>
					<Stack gap="l">
						<Header url={url} />
						{children}
						<Footer />
					</Stack>
				</Container>
			</PageContainer>
		</Base>
	);
};

export default Page;
