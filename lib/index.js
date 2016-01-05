import {
	start,
	loadConfig,
	loadSourceFiles,
	generatePages,
	savePages,
	paginate,
	orderDocuments,
	groupDocuments,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers as defaultHelpers
} from 'sweet2';
import { MarkdownRenderer } from 'sweet2/lib/renderers/markdown';
import * as customHelpers from './helpers';

start('Building blog...');

let config = loadConfig('config');
let options = config.base;

class CustomMarkdownRenderer extends MarkdownRenderer {
	// Screenshots: /images/mac__shipit.png or /images/win__shipit.png
	paragraph(text) {
		let m = text.match(/<img src="\/images\/(\w+)__/);
		if (m) {
			return `<div class="screenshot screenshot_${m[1]}">${text}</div>\n`;
		}
		return `<p>${text}</p>\n`;
	}
}

let renderMarkdown = createMarkdownRenderer({
	renderer: CustomMarkdownRenderer
});

let renderTemplate = createTemplateRenderer({
	root: options.templatesFolder
});

let helpers = {...defaultHelpers, ...customHelpers};

let documents = loadSourceFiles(options.sourceFolder, options.sourceTypes, {
	renderers: {
		md: renderMarkdown
	},
	// Custom front matter field parsers
	fieldParsers: {
		// Save `date` field as a timestamp
		timestamp: (timestamp, attrs) => Date.parse(attrs.date),
		// Convert `date` field to a Date object
		date: (date, attrs) => new Date(Date.parse(date)),
		// Strip language (`en` or `ru`) from the URL (filename)
		url: url => url.replace(/(en|ru)\//, '')
	},
	// Cut separator
	cutTag: options.cutTag
});

// Oder by date, newest first
documents = orderDocuments(documents, ['-timestamp']);

// Group posts by language
let documentsByLanguage = groupDocuments(documents, 'lang');
let languages = Object.keys(documentsByLanguage);

documents = languages.reduce((result, lang) => {
	let docs = documentsByLanguage[lang];
	let newDocs = [];

	// Translations
	let translationLang = lang === 'ru' ? 'en' : 'ru';
	let hasTranslation = (url) => {
		return !!documentsByLanguage[translationLang].find(doc => doc.url === url);
	}
	docs = docs.map((doc) => {
		return {
			...doc,
			translation: hasTranslation(doc.url)
		};
	});

	// All posts page
	let postsByYear = groupDocuments(docs, doc => doc.date.getFullYear());
	let years = Object.keys(postsByYear);
	years.sort();
	years.reverse();
	newDocs.push({
		sourcePath: `${lang}/all`,
		url: `/all`,
		translation: true,
		layout: 'all',
		postsTotal: docs.length,
		postsByYear,
		years,
		lang
	});

	// Pagination
	newDocs.push(...paginate(docs, {
		sourcePathPrefix: lang,
		urlPrefix: '/',
		documentsPerPage: options.postsPerPage,
		layout: 'index',
		index: true,
		extra: {
			lang
		}
	}));

	// Tags
	let postsByTag = groupDocuments(docs, 'tags');
	let tags = Object.keys(postsByTag);
	newDocs.push(...tags.reduce((tagsResult, tag) => {
		let tagDocs = postsByTag[tag];
		let tagsNewDocs = paginate(tagDocs, {
			sourcePathPrefix: `${lang}/tags/${tag}`,
			urlPrefix: `/tags/${tag}`,
			documentsPerPage: options.postsPerPage,
			layout: 'tag',
			extra: {
				lang,
				tag
			}
		});
		return [...tagsResult, ...tagsNewDocs];
	}, []));

	// Atom feed
	newDocs.push({
		sourcePath: `${lang}/atom.xml`,
		url: `/atom.xml`,
		layout: 'atom.xml',
		documents: docs.slice(0, options.postsInFeed),
		lang
	});

	return [...result, ...docs, ...newDocs];
}, []);

let pages = generatePages(documents, config, helpers, {ect: renderTemplate});

savePages(pages, options.publicFolder);
