// Based on http://bdadam.com/blog/better-webfont-loading-with-localstorage-and-woff2.html
// This script must be placed in the HEAD above all external stylesheet declarations (link[rel=stylesheet])
window.loadFont = function(fontName, fontUrlBase) {
	// 0. Many unsupported browsers should stop here
	let ua = navigator.userAgent;
	let noSupport =
		// IE8 and below
		!window.addEventListener ||
		// Android Stock Browser below 4.4 and Opera Mini
		(ua.match(/(Android (2|3|4.0|4.1|4.2|4.3))|(Opera (Mini|Mobi))/) && !ua.match(/Chrome/))
	;
	if (noSupport) {
		return;
	}

	// 1. Setting up localStorage
	let loSto = {};
	try {
		// We set up a proxy variable to help with localStorage, e.g. when cookies are disabled
		// and the browser prevents us accessing it.
		// Otherwise some exceptions can be thrown which completely prevent font loading.
		loSto = localStorage || {};
	}
	catch (ex) {
		/* */
	}

	let localStoragePrefix = 'font-' + fontName;
	let localStorageUrlKey = localStoragePrefix + 'url';
	let localStorageCssKey = localStoragePrefix + 'css';
	let storedFontUrlBase = loSto[localStorageUrlKey];
	let storedFontCss = loSto[localStorageCssKey];

	// 2. Setting up the <style> element, that we are using to apply the base64 encoded font data
	let styleElement = document.createElement('style');
	styleElement.rel = 'stylesheet';
	document.head.appendChild(styleElement);
	// Setting styleElement.textContent must be after this line, because of IE9 errors

	// 3. Checking whether the font data is already in localStorage and up-to-date
	if (storedFontCss && storedFontUrlBase === fontUrlBase) {
		// the css is still in the localStorage AND it was loaded from one of the current URLs

		// 4. Applying the font style sheet
		styleElement.textContent = storedFontCss;
	}
	else {
		// The data was not present, or loaded from an obsolete URL
		// So we have to load it again

		// 5. Checking for WOFF2 support to know which URL we should use
		let url = fontUrlBase + '.woff' + (hasWoff2() ? '2' : '') + '.css';

		// 6. Fetching the font data from the server
		let request = new XMLHttpRequest();
		request.open('GET', url);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				// 7. Updating localStorage with the fresh data and applying the font data
				loSto[localStorageUrlKey] = fontUrlBase;
				loSto[localStorageCssKey] = styleElement.textContent = request.responseText;
			}
		};
		request.send();
	}

	function hasWoff2() {
		// Source: https://github.com/filamentgroup/woff2-feature-test
		if (!window.FontFace) {
			return false;
		}

		let f = new FontFace('t', 'url("data:application/font-woff2,") format("woff2")', {});
		f.load();

		return f.status === 'loading';
	}
};
