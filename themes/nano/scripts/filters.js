// Esacpe { and } because of stupid Hexo’s Nunjucks
// https://hexo.io/docs/troubleshooting.html#Escape_Contents

var lbrack = 'QWElbrackIOP';
var rbrack = 'ASDrbrackJKL';

function escape(text) {
	return text
		.replace(/\{/g, lbrack)
		.replace(/\}/g, rbrack)
	;
}

var lbrackRe = new RegExp(lbrack, 'g');
var rbrackRe = new RegExp(rbrack, 'g');

function unescape(text) {
	return text
		.replace(lbrackRe, '{')
		.replace(rbrackRe, '}')
	;
}

try {
	var escapeFilter = function(data) {
		data.content = escape(data.content);
		return data;
	};
	var unescapeFilter = function(data) {
		data.content = unescape(data.content);
		return data;
	};

	hexo.extend.filter.register('before_post_render', escapeFilter);
	hexo.extend.filter.register('after_post_render', unescapeFilter);
}
catch (e) {
	module.exports = {
		escape: escape,
		unescape: unescape
	};
}
