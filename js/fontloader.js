// Based on http://bdadam.com/blog/better-webfont-loading-with-localstorage-and-woff2.html
// This script must be placed in the HEAD above all external stylesheet declarations (link[rel=stylesheet])
window.loadFont = function(fontName, fontUrlBase) {
	// Very optimistic check for fonts support
	if (!('FontFace' in window)) {
		return;
	}

	// Setting up localStorage
	let storage = {};
	try {
		// We set up a proxy variable to help with localStorage, e.g. when cookies are disabled and the browser prevents
		// us accessing it. Otherwise some exceptions can be thrown which completely prevent font loading.
		storage = localStorage || {};
	}
	catch (err) {
		/* */
	}

	const localStoragePrefix = 'font-' + fontName;
	const localStorageUrlKey = localStoragePrefix + 'url';
	const localStorageCssKey = localStoragePrefix + 'css';
	const storedFontCss = storage[localStorageCssKey];

	// Setting up the <style> element, that we are using to apply the base64 encoded font data
	const styleElement = document.createElement('style');
	styleElement.rel = 'stylesheet';
	document.head.appendChild(styleElement);

	// Checking whether the font data is already in localStorage and up-to-date
	if (storedFontCss && storage[localStorageUrlKey] === fontUrlBase) {
		// The css is still in the localStorage AND it was loaded from one of the current URLs

		// Applying the font style sheet
		styleElement.textContent = storedFontCss;
	}
	else {
		// The data was not present, or loaded from an obsolete URL
		// So we have to load it again

		// Fetching the font data from the server
		const request = new XMLHttpRequest();
		request.open('GET', `${fontUrlBase}.woff2.css`);
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				// Updating localStorage with the fresh data and applying the font data
				storage[localStorageUrlKey] = fontUrlBase;
				storage[localStorageCssKey] = request.responseText;
				styleElement.textContent = request.responseText;
			}
		};
		request.send();
	}
};
