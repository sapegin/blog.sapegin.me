---
layout: Post
lang: en
title: 'Multilingual blog on DocPad'
date: 2014-04-14
tags:
  - tools
  - docpad
  - blog
---

I write my blog in two languages. But they’re just two builds of the same [DocPad](http://docpad.org/) installation with different settings.

You can use this blog’s [source code](https://github.com/sapegin/blog.sapegin.me) as an example of this technique. Below I’ll describe all necessary steps to translate your blog’s content and user interface.

## Translating posts

Create separate folders for each language’s blog content. In my case it’s `src/documents_en` and `src/documents_ru` (for English and Russian correspondingly).

Then add this code to your DocPad config (`docpad.coffee`):

```coffee
docpadConfig = {
  ...
  environments:
    en:
      documentsPaths: ['documents_en']
      outPath: 'htdocs_en'
    ru:
      documentsPaths: ['documents_ru']
      outPath: 'htdocs_ru'
  ...
}
```

Now you can run or generate blog in desired language:

```bash
docpad run --env en  # Run local server with English version
docpad generate --env ru  # Generate files for Russian version
```

## Translating unser interface

Create YAML files for every language.

For example, `src/lang/en.yml`:

```yaml
lang: en
url: http://blog.sapegin.me
title: Artem Sapegin’s Blog
poweredBy: Powered by <a href="{dp}" class="link">DocPad</a>
visibleTags:
  - tools
  - html
  - css
tagNames:
  tools: Tools
  html: HTML
  css: CSS
```

You can add here all the data you want to translate.

You’ll also need few helper functions, so add them to DocPad config file:

```coffee
YAML = require 'yamljs'
moment = require 'moment'
_ = require 'lodash'

pluralTypes =
  en: (n) -> (if n isnt 1 then 1 else 0)
  ru: (n) -> (if n % 10 is 1 and n % 100 isnt 11 then 0 else (if n % 10 >= 2 and n % 10 <= 4 and (n % 100 < 10 or n % 100 >= 20) then 1 else 2))

docpadConfig = {
  templateData:
    ...
    # Localized date
    pubDate: (date) ->
      moment(date).format('LL')  # December 23 2013

    # Translated string
    # Will return input string if thanslation not found
    # You can use simple templates: @_ 'Lorem {num} ipsum', num: 42
    _: (s, params=null) ->
      params ?= []
      s = @site[s] or s
      s.replace /\{([^\}]+)\}/g, (m, key) ->
        params[key] or m

    # Plural form: @plural(3, 'dog|dogs')
    plural: (n, s) ->
      ((@_ s).split '|')[pluralTypes[@site.lang](n)]

  events:
    generateBefore: (opts) ->
      # Get current language from DocPad’s environment
      lang = @docpad.getConfig().env
      # Load translated strings for current language
      strings = YAML.load("src/lang/#{lang}.yml")
      _.merge(@docpad.getTemplateData().site, strings)
      # Configure Moment.js
      moment.lang(lang)

    ...
}
```

Install libraries used in above code from npm:

```bash
npm install --save-dev yamljs moment lodash
```

You can find plural functions for you language in [polyglot.js](https://github.com/airbnb/polyglot.js).

Now you need to replace all local specific data in your templates with this helpers.

Regular strings:

```html
<a href="/about"><%= @_ 'About' %></a> <%- (@_ 'poweredBy', dp:
'http://docpad.org/') %>
```

Plurals:

```html
<%= @_ '{num} {posts}', num: documents.length, posts:
@plural(documents.length, 'post|posts') %>
```

And dates:

```html
<%= @pubDate @document.date %>
```

## Language switcher

Add few lines to your YAML files:

```yaml
transLang: ru
transUrl: http://nano.sapegin.ru
translation: По-русски
```

And few to `docpad.coffee`:

```coffee
docpadConfig = {
  templateData:
    ...
    # URL of a page in other language or homepage if there’s no translation of that page
    translationUrl: ->
      if fs.existsSync "src/documents_#{@site.transLang}/#{@document.relativePath}"
        "#{@site.transUrl}#{@document.url}"
      else
        @site.transUrl
    ...
}
```

Add a link to a template:

```html
<a href="<%= @translationUrl() %>"><%= @_ 'translation' %></a>
```

## Server configuration

The last thing you need is to point your server to the right folders with published files. I use different hosts for each language but you could use subfolders but it’s beyond the scope of this blog post.

P. S. Here is [another approach](http://nylnook.com/en/blog/docpad-i18n/) by Camille Bissuel.
