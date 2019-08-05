import { createGlobalStyle } from 'styled-components';

const color0 = '#485e76';
const color1 = '#343741';
const color2 = '#ad5528';
const color3 = '#00805e';
const color4 = '#0f73a7';
const color5 = '#0a768a';
const color6 = '#b71818';
const color7 = '#008035';

export const PrismStyles = createGlobalStyle`
	p code,
	li code {
		font-style: italic;
		white-space: nowrap;
	}

	pre[class*='language-'] {
		color: ${color0};
		background: none;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		hyphens: none;
		overflow: auto;
	}

	.token.punctuation,
	.token.namespace {
		color: ${color0};
		opacity: 0.7;
	}

	.token.operator {
		color: ${color1};
	}

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: ${color1};
		opacity: 0.7;
	}

	.token.boolean,
	.token.number,
	.token.property,
	.token.attr-name {
		color: ${color2};
	}

	.token.string,
	.token.attr-value,
	.token.entity,
	.token.url,
	.token.statement,
	.token.regex,
	.token.atrule,
	.language-css .token.string,
	.style .token.string {
		color: ${color3};
	}

	.token.placeholder,
	.token.variable,
	.token.function,
	.token.selector,
	.token.tag,
	.token.tag .token.punctuation,
	.token.tag .token.attr-name {
		color: ${color4};
	}

	.token.keyword,
	.token.control,
	.token.directive,
	.token.unit {
		color: ${color5};
	}

	.token.deleted,
	.token.important {
		color: ${color6};
	}

	.token.inserted {
		color: ${color7};
	}

	.token.italic {
		font-style: italic;
	}

	.token.important,
	.token.bold {
		font-weight: bold;
	}
`;
