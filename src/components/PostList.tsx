import React from 'react';
import { Box } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import { Post } from '../types';

type PostWithOptionalSlug = Omit<Post, 'slug'> & {
	slug?: Post['slug'];
};

type Props = {
	posts: PostWithOptionalSlug[];
};

const PostList = ({ posts }: Props) => (
	<Box as="ul" mb="m">
		{posts.map((post) => (
			<Box key={post.slug || post.title} as="li" mb="s">
				{post.slug ? <Link href={post.slug}>{post.title}</Link> : post.title}
			</Box>
		))}
	</Box>
);

export default PostList;
