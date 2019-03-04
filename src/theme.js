import getTheme from 'tamia/lib/theme';

const font = 'Georgia, serif';

const theme = getTheme({
	baseFontSize: '1.125em',
	page: {
		maxWidth: null,
		contentMaxWidth: '44rem',
		textMaxWidth: '44rem',
		xPadding: '1rem',
		yPadding: '1rem',
	},
	fonts: {
		base: font,
		heading: font,
		code: 'inherit',
	},
	fontSizes: {
		base: '1rem',
		xxl: '2.2rem',
		xl: '1.7rem',
		l: '1.25rem',
		mplus: '1.1rem',
		m: '1rem',
		s: '0.85rem',
		xs: '0.7rem',
	},
	fontWeights: {
		base: 300,
		heading: 300,
	},
	lineHeights: {
		base: 1.5,
		small: 1.4,
	},
	colors: {
		bg: '#f9f8f6',
		base: '#331f06',
		primary: '#331f06',
		hover: '#b15400',
		accent: '#8c5410',
	},
});

export default theme;
