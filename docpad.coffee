# docpad.org

fs = require 'fs'
YAML = require 'yamljs'
moment = require 'moment'
richtypo = require 'richtypo'

# Borrowed from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js
pluralTypes =
	en: (n) -> (if n isnt 1 then 1 else 0)
	ru: (n) -> (if n % 10 is 1 and n % 100 isnt 11 then 0 else (if n % 10 >= 2 and n % 10 <= 4 and (n % 100 < 10 or n % 100 >= 20) then 1 else 2))


docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		cutTag: '<!-- cut -->'

		# Specify some site properties and local string: will be read from lang file
		site: {}

		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		pageTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} — #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		pageDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Post part before “cut”
		cuttedContent: (content) ->            
			if @hasReadMore content
				cutIdx = content.search @cutTag
				content[0..cutIdx-1]
			else
				content

		# Has “cut”?
		hasReadMore: (content) ->
			content and ((content.search @cutTag) isnt -1)

		# Localized date
		pubDate: (date) ->
			moment(date).format('LL')  # December 23 2013

		# Translated string
		_: (s, params=null) ->
			params ?= []
			s = @site[s] or s
			s.replace /\{([^\}]+)\}/g, (m, key) ->
				params[key] or m

		# Plural form: @plural(3, 'dog|dogs')
		plural: (n, s) ->
			((@_ s).split '|')[pluralTypes[@site.lang](n)]

		# Richtypo.js
		rt: (s) ->
			s and (richtypo.rich s)

		# Richtypo.js: title
		rtt: (s) ->
			s and (richtypo.title s)

		# Tweak blog layout
		fixMd: (s) ->
			s and (s
				# Screenshots: /images/mac__shipit.png or /images/win__shipit.png
				.replace(/<p><img src="\/images\/(\w+)__([^"]+)" alt="([^"]*)"\/><\/p>/g, '<p class="screenshot screenshot_$1"><img src="/images/$1__$2" alt="$3"/></p>')
			)

		# Escape URL
		addSlashes: (s) ->
			s.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')

		# Prepare RSS feed
		prepareFeed: (s) ->
			s and (s
				.replace(/href="\//g, "href=\"#{@site.url}/")
				.replace(/src="\//g, "src=\"#{@site.url}/")
			)
		
		# URL of a page in other language
		translationUrl: ->
			if fs.existsSync "src/documents_#{@site.transLang}/#{@document.relativePath}"
				"#{@site.transUrl}#{@document.url}"
			else
				@site.transUrl


	# =================================
	# Collections
	# These are special collections that our website makes available to us

	collections:
		posts: (database) ->
			database.findAllLive({relativeOutDirPath: 'all', unpublished: $exists: false}, [date:-1])
		drafts: (database) ->
			database.findAllLive({relativeOutDirPath: 'all', unpublished: $exists: true}, [date:-1])

	# =================================
	# Environments
	# Language specific configuration
	# $ docpad run --env en
	# $ docpad generate --env en
	environments:
		en:
			documentsPaths: ['documents_en']
			outPath: 'htdocs_en'
		ru:
			documentsPaths: ['documents_ru']
			outPath: 'htdocs_ru'

	plugins:
		highlightjs:
			aliases:
				yaml: 'python'
		robotskirt:
			robotskirtOptions:
				EXT_AUTOLINK: false

	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:
		generateBefore: (opts) ->
			# Get current language from DocPad environment
			lang = @docpad.config.env
			# Load translated strings for current language
			@docpad.getConfig().templateData.site = (YAML.load "src/lang/#{lang}.yml")
			# Configure Moment.js
			moment.lang(lang)
			# Configure Richtypo.js
			richtypo.lang(lang)

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}

# Export our DocPad Configuration
module.exports = docpadConfig