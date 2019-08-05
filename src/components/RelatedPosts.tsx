import React from 'react';
import { Heading } from 'tamia';
import PostList from './PostList';
import { relatedTitle } from '@strings';
import { Post } from '../types';

type Props = {
	posts: Post[];
};

const RelatedPosts = ({ posts }: Props) => (
	<>
		<Heading as="h2" level={3} mb="m">
			{relatedTitle}
		</Heading>
		<PostList posts={posts} />
	</>
);

export default RelatedPosts;
