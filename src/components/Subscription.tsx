import React from 'react';
import { Heading, Text } from 'tamia';
import SubscriptionForm from './SubscriptionForm';

export default function Subscription() {
	return (
		<>
			<Heading as="h2" level={3} mb="m">
				Join the newsletter
			</Heading>
			<Text variant="small" mb="m">
				Enjoyed the article? Subscribe to get my latest articles, books, and
				other content on testing, design systems, accessibility, and everything
				frontend into your inbox. <i>No spam, unsubscribe at any time.</i>
			</Text>
			<SubscriptionForm />
		</>
	);
}
