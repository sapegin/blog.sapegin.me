export default function($, children) {
	const { lang, title, url, translation } = $;
	const { getPageTitle, getMetaTags, Style, Script, safe, option, __ } = $;
	return (
		<html lang={lang}>
			<head>
				<meta charset="utf-8" />
				<title>{getPageTitle({ title })}</title>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				{getMetaTags()}

				<link rel="alternative" href="/atom.xml" title={__('title')} type="application/rss+xml" />

				<Style src="/build/styles.css" />
				<Script src="/build/fontloader.js" inline />
				<script>{safe("loadFont('PT Serif','/build/ptserif')")}</script>
			</head>
			<body>
				<header class="header">
					{url === '/' ? (
						<h1 class="logo">
							{__('title')}
						</h1>
					) : (
						<div class="logo">
							<a href="/" class="logo__link link">{__('title')}</a>
						</div>
					)}

					<nav class="nav">
						<div class="nav__item">
							{url === '/all' ? (
								__('allPosts')
							) : (
								<a href="/all" class="nav__link link">{__('allPosts')}</a>
							)}
						</div>
						<div class="nav__item">
							<a id="search-link" href="#search" class="nav__link link">{__('search')}</a>
						</div>
						<div class="nav__item">
							<a href={option('translationHost') + (translation ? url : '')} class="nav__link link">
								{__('translation')}
							</a>
						</div>
					</nav>

					<form id="search" class="search-form no-print is-hidden" action={option('searchAction')} method="get">
						<input type="hidden" name="searchid" value={option('searchId')} />
						<input type="hidden" name="l10n" value={lang} />
						<input
							type="search"
							class="search-form__field js-field"
							name="text"
							placeholder={__('search')}
							value=""
						/>
					</form>
					<Script src="/build/search-form.js" inline />
				</header>

				{children}

				<footer class="footer">
					<div class="footer-i">
						<div class="footer__copyrights">
							© <a href={option('copyrightUrl')} class="link">{__('author')}</a>,{' '}
							2008—{(new Date()).getFullYear()}
						</div>
						<div class="footer__info no-print">
							{__('poweredBy')}
						</div>
					</div>
				</footer>

				<Script src="/build/counter.js" inline />
			</body>
		</html>
	);
}
