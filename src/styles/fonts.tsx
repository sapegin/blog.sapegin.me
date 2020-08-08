import { createGlobalStyle } from 'styled-components';

const fontDisplay = 'fallback';

export const Fonts = createGlobalStyle`
	@font-face {
		font-family: "Playfair Display";
		src: url("../fonts/PlayfairDisplay-Regular.woff2");
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "Playfair Display";
		src: url("../fonts/PlayfairDisplay-Bold.woff2");
		font-weight: bold;
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "Playfair Display";
		src: url("../fonts/PlayfairDisplay-Italic.woff2");
		font-style: italic;
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("../fonts/MonoLisa-Regular.woff2");
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("../fonts/MonoLisa-Bold.woff2");
		font-weight: bold;
		font-display: ${fontDisplay};
	}
	@font-face {
		font-family: "MonoLisa";
		src: url("../fonts/MonoLisa-RegularItalic.woff2");
		font-style: italic;
		font-display: ${fontDisplay};
	}
`;
