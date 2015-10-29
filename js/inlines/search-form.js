(function() {
	var link = document.getElementById('search-link');
	link.addEventListener('click', function(event) {
		event.preventDefault();
		var form = document.getElementById('search');
		form.classList.toggle('is-hidden');
		link.classList.toggle('is-active');
		link.blur();
		form.querySelector('.js-field').focus();
	});
}());