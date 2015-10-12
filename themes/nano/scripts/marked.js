'use strict';

var marked = require('marked');
var hljs = require('highlight.js');
var filters = require('./filters');

var MarkedRenderer = marked.Renderer;

hljs.configure({
	tabReplace: null
});

var hljsAliases = {
	yaml: 'python',
	shell: 'bash'
};

function Renderer() {
	MarkedRenderer.apply(this, arguments);
}

require('util').inherits(Renderer, MarkedRenderer);

// Do not put IDs in headers
Renderer.prototype.heading = function(text, level, raw) {
	var tag = 'h' + level;
	return '<' + tag + '>' + text + '</' + tag + '>\n';
};

function renderer(data, options) {
	var text = filters.unescape(data.text);
	text = marked(text, {
		renderer: new Renderer(),
		highlight: function(code, lang) {
			if (lang) {
				return hljs.highlight(hljsAliases[lang] || lang, code).value;
			}
			else {
				return hljs.highlightAuto(code).value;
			}
		}
	});
	return filters.escape(text);
};

hexo.extend.renderer.register('md', 'html', renderer, true);
