import React from 'react';
import { Box } from 'tamia';
import { Link } from 'tamia-gatsby-link';

const PostList = ({ posts }) => (
	<Box as="ul" mb="m">
		{posts.map(post => (
			<Box key={post.slug} as="li" mb="s">
				<Link href={post.slug}>{post.title}</Link>
			</Box>
		))}
	</Box>
);

export default PostList;
