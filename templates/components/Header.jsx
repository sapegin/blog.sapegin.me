import Block from 'tamia/lib/components/Block';
import Logo from './Logo';
import Nav from './Nav';
import SearchForm from './SearchForm';

export default function() {
	return (
		<Block component="header" bottom={4}>
			<Logo />
			<Nav />
			<SearchForm />
		</Block>
	);
}
