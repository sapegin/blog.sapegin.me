let link = document.getElementById('search-link');
link.addEventListener('click', function(event) {
	event.preventDefault();

	let form = document.getElementById('search');
	form.classList.toggle('is-hidden');

	link.classList.toggle('is-active');
	link.blur();

	form.querySelector('.js-field').focus();
});
