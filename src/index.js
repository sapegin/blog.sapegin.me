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
	helpers as defaultHelpers,
} from 'fledermaus';
import * as customHelpers from './helpers';

start('Building blog...');

const config = loadConfig('config');
const options = config.base;

const renderMarkdown = createMarkdownRenderer();

const renderTemplate = createTemplateRenderer({
	root: options.templatesFolder,
});

const helpers = { ...defaultHelpers, ...customHelpers };

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
	},
	// Cut separator
	cutTag: options.cutTag,
});

// Oder by date, newest first
documents = orderDocuments(documents, ['-timestamp']);

// Group posts by language
const documentsByLanguage = groupDocuments(documents, 'lang');
const languages = Object.keys(documentsByLanguage);

documents = languages.reduce((result, lang) => {
	let docs = documentsByLanguage[lang];
	const newDocs = [];

	// Translations
	const translationLang = lang === 'ru' ? 'en' : 'ru';
	const hasTranslation = (url) => {
		return !!documentsByLanguage[translationLang].find(doc => doc.url === url);
	};
	docs = docs.map((doc) => {
		return {
			...doc,
			translation: hasTranslation(doc.url),
		};
	});

	// All posts page
	const postsByYear = groupDocuments(docs, doc => doc.date.getFullYear());
	const years = Object.keys(postsByYear);
	years.sort();
	years.reverse();
	newDocs.push({
		sourcePath: `${lang}/all`,
		url: '/all',
		translation: true,
		layout: 'All',
		postsTotal: docs.length,
		postsByYear,
		years,
		lang,
	});

	// Pagination
	newDocs.push(...paginate(docs, {
		sourcePathPrefix: lang,
		urlPrefix: '/',
		documentsPerPage: options.postsPerPage,
		layout: 'Index',
		index: true,
		extra: {
			lang,
		},
	}));

	// Tags
	const postsByTag = groupDocuments(docs, 'tags');
	const tags = Object.keys(postsByTag);
	newDocs.push(...tags.reduce((tagsResult, tag) => {
		const tagDocs = postsByTag[tag];
		const tagsNewDocs = paginate(tagDocs, {
			sourcePathPrefix: `${lang}/tags/${tag}`,
			urlPrefix: `/tags/${tag}`,
			documentsPerPage: options.postsPerPage,
			layout: 'Tag',
			extra: {
				lang,
				tag,
			},
		});
		return [...tagsResult, ...tagsNewDocs];
	}, []));

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
