import Block from 'tamia/lib/components/Block';
import Nav from './Nav';
import SearchForm from './SearchForm';

export default function() {
	return (
		<Block component="header" bottom={4}>
			<Nav />
			<SearchForm />
		</Block>
	);
}
