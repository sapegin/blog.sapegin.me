(function() {
	function toggle(elem, cls) {
		var classes = elem.className;
		if ((' ' + classes + ' ').indexOf(cls) === -1) {
			elem.className += ' ' + cls;
		}
		else {
			elem.className = classes.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)'), ' ').replace(/\s$/, '');
		}
	}
	var link = document.getElementById('search-link');
	link.addEventListener('click', function(event) {
		event.preventDefault();
		var form = document.getElementById('search');
		toggle(form, 'is-hidden');
		toggle(link, 'is-active');
		link.blur();
		form.querySelector('.js-field').focus();
	});
}());