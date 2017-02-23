import Script from 'tamia/lib/components/Script';
import Style from 'tamia/lib/components/Style';
import Main from 'tamia/lib/components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import '../styles/styles.pcss';

export default function({ lang, title }, children, { getPageTitle, getMetaTags, safe, __ }) {
	return (
		<html lang={lang}>
			<head>
				<meta charset="utf-8" />
				<title>{getPageTitle({ title })}</title>
				<Style src="/build/styles.css" />
				{getMetaTags()}
				<Script entry="fontloader" inline />
				<script>{safe("loadFont('PT Serif','/build/ptserif')")}</script>
				<link rel="alternative" href="/atom.xml" title={__('title')} type="application/rss+xml" />
			</head>
			<body>
				<Header />
				<Main>{children}</Main>
				<Footer />
				<Script entry="counter" inline />
			</body>
		</html>
	);
}
