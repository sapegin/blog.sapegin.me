import { sortBy } from 'lodash';
import {
	start,
	loadConfig,
	loadSourceFiles,
	generatePages,
	savePages,
	orderDocuments,
	groupDocuments,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers as defaultHelpers,
} from 'fledermaus';
import * as customHelpers from './helpers';

start('Building blog...');

const MAX_RELATED = 5;

const config = loadConfig('config');
const options = config.base;

const renderMarkdown = createMarkdownRenderer();

const renderTemplate = createTemplateRenderer({
	root: options.templatesFolder,
});

const helpers = { ...defaultHelpers, ...customHelpers };

function getRelated(docs, doc) {
	const weighted = docs
		.filter(d => d.url !== doc.url)
		.map(d => {
			const common = d.tags.filter(t => doc.tags.includes(t));
			return {
				...d,
				weight: common.length * d.timestamp,
			};
		})
		.filter(d => d.weight > 0)
	;
	const sorted = sortBy(weighted, 'weight').reverse();
	return sorted.slice(0, MAX_RELATED);
}

let documents = loadSourceFiles(options.sourceFolder, options.sourceTypes, {
	renderers: {
		md: renderMarkdown,
	},
	// Custom front matter field parsers
	fieldParsers: {
		// Save `date` field as a timestamp
		timestamp: (timestamp, attrs) => Date.parse(attrs.date),
		// Convert `date` field to a Date object
		date: date => new Date(Date.parse(date)),
		// Strip language (`en` or `ru`) from the URL (filename)
		url: url => url.replace(/(en|ru)\//, ''),
		// Ensure tags is array
		tags: tags => tags || [],
	},
});

// Oder by date, newest first
documents = orderDocuments(documents, ['-timestamp']);

// Group posts by language
const documentsByLanguage = groupDocuments(documents, 'lang');
const languages = Object.keys(documentsByLanguage);

documents = languages.reduce((result, lang) => {
	let docs = documentsByLanguage[lang];
	const newDocs = [];

	// Translations and related posts
	const translationLang = lang === 'ru' ? 'en' : 'ru';
	const hasTranslation = (url) => {
		return !!documentsByLanguage[translationLang].find(doc => doc.url === url);
	};
	docs = docs.map(doc => {
		return {
			...doc,
			translation: hasTranslation(doc.url),
			related: getRelated(docs, doc),
		};
	});

	// Index page
	const postsByYear = groupDocuments(docs, doc => doc.date.getFullYear());
	const years = Object.keys(postsByYear);
	years.sort();
	years.reverse();
	newDocs.push({
		sourcePath: `${lang}/index`,
		url: '/',
		translation: true,
		layout: 'Index',
		postsTotal: docs.length,
		postsByYear,
		years,
		lang,
	});

	// RSS feed
	newDocs.push({
		sourcePath: `${lang}/atom.xml`,
		url: '/atom.xml',
		layout: 'RSS',
		items: docs.slice(0, options.postsInFeed),
		title: config[lang].title,
		description: config[lang].description,
		copyright: config[lang].author,
		imageUrl: '/images/userpic.jpg',
		lang,
	});

	return [...result, ...docs, ...newDocs];
}, []);

const pages = generatePages(documents, config, helpers, { jsx: renderTemplate });

savePages(pages, options.publicFolder);
