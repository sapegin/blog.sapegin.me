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
				Subscribe to get my latest posts by email.
			</Text>
			<SubscriptionForm />
		</>
	);
}
