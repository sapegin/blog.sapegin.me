import Layout from 'tamia/lib/components/Layout';
import About from './About';
import RelatedPosts from './RelatedPosts';

export default function({ related }) {
	return (
		<Layout class="no-print">
			<Layout md={1 / 2}>
				<RelatedPosts posts={related} />
			</Layout>
			<Layout md={1 / 2}>
				<About />
			</Layout>
		</Layout>
	);
}
