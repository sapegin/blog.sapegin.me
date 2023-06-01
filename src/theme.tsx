const baseFont = 'Georgia, serif';
const headingFont = 'PlayfairDisplay, Georgia, serif';
const monospaceFont =
	'MonoLisa, Monaco, "DejaVu Sans Mono", "Lucida Console", monospace';
const space = {
	0: 0,
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
	'-xxs': '-0.125rem', // 2px
	'-xs': '-0.25rem', // 4px
	'-s': '-0.5rem', // 8px
	'-m': '-1rem', // 16px
	'-l': '-2rem', // 32px
	'-xl': '-4rem', // 64px
	'-xxl': '-8rem', // 128px
	'-xxxl': '-16rem', // 256px
};
const breakpoints = [
	'38rem', // 608px
	'48rem', // 768px
	'62rem', // 992px
	'75rem', // 1200px
];
const fonts = {
	base: baseFont,
	heading: headingFont,
	pre: monospaceFont,
	code: 'inherit',
};
const fontSizes = {
	base: '1rem',
	xxl: '2.2rem',
	xl: '1.7rem',
	l: '1.4rem',
	mplus: '1.1rem', // TODO
	m: '1rem',
	s: '0.85rem',
	xs: '0.7rem',
};
const colors = {
	bg: '#fdfbf7',
	base: '#362a1b',
	primary: '#362a1b',
	hover: '#a2672f',
	accent: '#906e46',
	highlight: '#f9f2dc',
	selection: 'rgb(255,237,117)',
	selectionAlpha: 'rgba(255,237,117,0.25)',
};
const borders = {
	focus: '3px solid',
};
const radii = {
	round: '100%',
};
const fontWeights = {
	base: 'normal',
	heading: 'bold',
};
const lineHeights = {
	base: 1.5,
	heading: 1.1,
	small: 1.4,
};
const letterSpacings = {
	base: 0,
	heading: '0.05ex',
};
const headingBaseStyles = {
	color: 'base',
	fontFamily: 'heading',
	fontWeight: 'heading',
	lineHeight: 'heading',
	letterSpacing: 'heading',
};
const textBaseStyles = {
	color: 'base',
	fontFamily: 'base',
	fontWeight: 'base',
	lineHeight: 'base',
	letterSpacing: 'base',
};

const theme = {
	baseFontSize: '1.125em',
	blockMarginBottom: space.m,
	headingMarginTop: space.l,
	listMargin: '1.3em',
	focusOutlineOffset: '2px',
	page: {
		bodyPaddingX: 0,
		bodyPaddingY: 0,
		contentMaxWidth: '44rem',
		contentPaddingX: space.m,
		contentPaddingY: space.l,
		textMaxWidth: '44rem',
	},
	fonts,
	space,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	colors,
	borders,
	radii,
	breakpoints,
	headingStyles: {
		1: {
			...headingBaseStyles,
			fontWeight: 'base',
			fontSize: 'xxl',
			letterSpacing: 'base',
		},
		2: {
			...headingBaseStyles,
			fontSize: 'xl',
		},
		3: {
			...headingBaseStyles,
			fontSize: 'l',
		},
	},
	textStyles: {
		base: {
			...textBaseStyles,
			fontSize: 'm',
		},
		small: {
			...textBaseStyles,
			fontSize: 's',
		},
		xsmall: {
			...textBaseStyles,
			fontSize: 'xs',
		},
		italic: {
			...textBaseStyles,
			fontStyle: 'italic',
		},
		intro: {
			...textBaseStyles,
			fontSize: 'mplus',
			fontStyle: 'italic',
		},
		menu: {
			...headingBaseStyles,
			fontSize: 'mplus',
			fontWeight: 'normal',
		},
	},
} as const;

export default theme;

export const inverted = {
	...theme,
	colors: {
		...theme.colors,
		bg: colors.accent,
		base: colors.bg,
		primary: colors.bg,
		hover: '#fff',
		accent: '#fff',
	},
} as const;
