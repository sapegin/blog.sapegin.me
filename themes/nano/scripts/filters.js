// Esacpe { and } because of stupid Hexo’s Nunjucks
// https://hexo.io/docs/troubleshooting.html#Escape_Contents
function escape(data, options) {
	data.content = data.content
		.replace(/\{/g, '&lbrack;')
		.replace(/\}/g, '&lbrack;')
	;
	return data;
}

hexo.extend.filter.register('before_post_render', escape);
