import { createGlobalStyle } from 'styled-components';

const fontDisplay = 'swap';

export const Fonts = createGlobalStyle`
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/Linotype-Sabon-Regular.woff2");
		font-style: normal;
		font-weight: normal;
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "PlayfairDisplay";
		src: url("/fonts/Linotype-Sabon-Bold.woff2");
		font-style: normal;
		font-weight: bold;
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
