// Get Markdown from the TIL repo

const path = require('path');
const { execSync } = require('child_process');
const {
	readFileSync,
	writeFileSync,
	emptyDirSync,
	mkdirpSync,
} = require('fs-extra');
const glob = require('glob');

const REPO_TAR_GZ = 'https://codeload.github.com/sapegin/til/tar.gz/master';
const REPO_DIR = 'til-master';
const DEST_DIR = 'content/til';

const read = (file) => readFileSync(file, 'utf8');

const write = (file, contents) => {
	const filepath = `${DEST_DIR}/${file}`;
	mkdirpSync(path.dirname(filepath));
	return writeFileSync(filepath, contents);
};

const getTitle = (contents) => contents.match(/^#\s*(.*?)$/m) || [];

const getMeta = (contents) =>
	contents.match(/^<!--\s*(\d\d\d\d-\d\d-\d\d)\s*(.*?)?\s*-->/) || [];

const stripTitle = (contents) => contents.replace(/^#.*?$/m, '');

const template = ({ title, date, tags, contents }) => `---
layout: Post
title: '${title}'
description: ''
date: ${date}
lang: en
tags:
  - ${tags.join('\n  - ')}
---

${stripTitle(contents)}`;

console.log('Downloading source files...');

execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

emptyDirSync(DEST_DIR);

console.log('Syncing files...');

const docs = glob.sync(`${REPO_DIR}/*/*.md`);
docs.forEach((filepath) => {
	console.log(`👉 ${filepath}`);
	const contents = read(filepath);
	const [, title] = getTitle(contents);
	const [, date, tags] = getMeta(contents);
	write(
		filepath.replace(`${REPO_DIR}/`, ''),
		template({
			title,
			date,
			tags: tags.split(/, ?/),
			contents,
		})
	);
});
