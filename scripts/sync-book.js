/* eslint-disable @typescript-eslint/no-use-before-define */

// Get Markdown from the Washing code book repo

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs-extra');
const glob = require('glob');
const matter = require('gray-matter');
const { upperFirst } = require('lodash');

const REPO_TAR_GZ =
	'https://codeload.github.com/sapegin/washingcode-book/tar.gz/master';
const REPO_DIR = 'washingcode-book-master';
const DEST_DIR = 'content/all';

const read = (file) => readFileSync(file, 'utf8');

const getFrontmatter = (contents) => contents.match(/^---[\S\s]*?---/)[0];

const getTitle = (post) =>
	upperFirst(post.data.title.replace('Washing your code: ', ''));

const getSlug = (post) =>
	`${post.file.replace(/^content\/all\//, '').replace(/\.md$/, '')}`;

const getUrl = (post) => `/all/${getSlug(post)}/`;

const stripTitle = (contents) => contents.replace(/^#+ .*?$/m, '');

const downgradeHeadings = (contents) => contents.replace(/^##(#+) /gm, '$1 ');

const updateLinks = (contents, post, allPosts) =>
	contents.replace(/\[(.*?)\]\(#(.*?)\)/g, (_, title, anchor) => {
		const bookPost = allPosts.find((p) => getSlug(p) === anchor);

		if (bookPost) {
			return `[${title}](${getUrl(bookPost)})`;
		}

		console.error(`[BOOK] 🦀 Cannot generate link to #${anchor}`);
		return title;
	});

console.log('[BOOK] Downloading source files...');

execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

console.log();
console.log('[BOOK] Reading files...');

const files = glob.sync(`${DEST_DIR}/*.md`);
const allPosts = files.map((filepath) => {
	console.log(`[BOOK] 👉 ${filepath}`);
	const contents = read(filepath);
	const post = matter(contents);
	return {
		...post,
		file: filepath,
		source: contents,
	};
});
const bookPosts = allPosts.filter((x) => x.data.source);

console.log();
console.log('[BOOK] Syncing files...');

bookPosts.forEach((post) => {
	console.log(`[BOOK] 👉 ${post.file}`);

	const bookContent = read(
		`${REPO_DIR}/manuscript/${post.data.source.replace('washing-code/', '')}.md`
	);

	const contents = `${getFrontmatter(post.source)}

${updateLinks(
	downgradeHeadings(stripTitle(bookContent)),
	post,
	bookPosts
).trim()}

---

Read other sample chapters of the book:

${bookPosts
	.map((p) =>
		p.file === post.file
			? `- _${getTitle(p)} (*this post*)_`
			: `- [${getTitle(p)}](${getUrl(p)})`
	)
	.join('\n')}
`;

	writeFileSync(post.file, contents);
});

console.log('[BOOK] Done 🦜');
