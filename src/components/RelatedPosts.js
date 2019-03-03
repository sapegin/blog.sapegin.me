import React from 'react';
import { Heading } from 'tamia';
import PostList from './PostList';
import { relatedTitle } from '../strings';

const RelatedPosts = ({ posts }) => (
	<>
		<Heading as="h2" level={3} mb="m">
			{relatedTitle}
		</Heading>
		<PostList posts={posts} />
	</>
);

export default RelatedPosts;
