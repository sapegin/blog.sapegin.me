import { createGlobalStyle } from 'styled-components';

const fontDisplay = 'swap';
const rangeLatin =
	'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const rangeLatinExt =
	'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF';

export const Fonts = createGlobalStyle`
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/PlayfairDisplay-Regular-latin.woff2");
		font-style: normal;
		font-weight: normal;
		unicode-range: ${rangeLatin};
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/PlayfairDisplay-Regular-latin-ext.woff2");
		font-style: normal;
		font-weight: normal;
		unicode-range: ${rangeLatinExt};
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/PlayfairDisplay-Bold-latin.woff2");
		font-style: normal;
		font-weight: bold;
		unicode-range: ${rangeLatin};
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/PlayfairDisplay-Italic-latin.woff");
		font-style: italic;
		font-weight: normal;
		unicode-range: ${rangeLatin};
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("/fonts/MonoLisa-Regular.woff2");
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("/fonts/MonoLisa-Bold.woff2");
		font-weight: bold;
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("/fonts/MonoLisa-RegularItalic.woff2");
		font-style: italic;
		font-display: ${fontDisplay};
	}
`;
