import React from 'react';
import { Heading, Text } from 'tamia';
import SubscriptionForm from './SubscriptionForm';
import { subscribeTitle, subscribeInfo } from '../strings';

export default function Subscription() {
	return (
		<>
			<Heading as="h2" level={3} mb="m">
				{subscribeTitle}
			</Heading>
			<Text size="s" mb="m">
				{subscribeInfo}
			</Text>
			<SubscriptionForm />
		</>
	);
}
