import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { Page as PageBase, Box, themeGet } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageFooter from '../components/PageFooter';
import Base from './Base';

const PageContainer = styled.div`
	/* Stripes at the top and the bottom of the page */
	margin: ${themeGet('space.s')} auto;
	background-color: ${themeGet('colors.bg')};
`;

const ContentContainer = styled(PageBase)`
	margin-left: auto;
	margin-right: auto;
	padding-left: ${themeGet('space.s')};
	padding-right: ${themeGet('space.s')};
	max-width: ${themeGet('page.contentMaxWidth')};
`;

const Page = ({ children, url, title, pageTitle }) => {
	return (
		<Base>
			<PageContainer>
				<ContentContainer>
					<Helmet title={pageTitle || title} />
					<Box mb="l">
						<Header url={url} />
					</Box>
					<Box as="main" role="main" mb="l">
						{children}
					</Box>
					<PageBase.Footer>
						<PageFooter />
						<Footer />
					</PageBase.Footer>
				</ContentContainer>
			</PageContainer>
		</Base>
	);
};

Page.propTypes = {
	children: PropTypes.node.isRequired,
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	pageTitle: PropTypes.string,
};

export default Page;
