const link = document.getElementById('search-link');
link.addEventListener('click', () => {
	link.classList.toggle('is-active');

	const form = document.getElementById('search');
	form.classList.toggle('is-hidden');
	form.querySelector('.js-field').focus();
});
