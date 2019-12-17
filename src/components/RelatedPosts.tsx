import React from 'react';
import { Heading } from 'tamia';
import PostList from './PostList';
import { Post } from '../types';

type Props = {
	posts: Post[];
};

const RelatedPosts = ({ posts }: Props) => (
	<>
		<Heading as="h2" level={3} mb="m">
			You may also like
		</Heading>
		<PostList posts={posts} />
	</>
);

export default RelatedPosts;
