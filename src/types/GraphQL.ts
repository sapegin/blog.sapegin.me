export interface MakdownNode {
	html: string;
	excerpt: string;
	frontmatter: {
		layout: string;
		title: string;
		tags: string[];
		date: string;
		timestamp: string;
	};
	fields: {
		slug: string;
	};
}

export interface PostsQuery {
	allMarkdownRemark: {
		edges: {
			node: MakdownNode;
		}[];
	};
}
