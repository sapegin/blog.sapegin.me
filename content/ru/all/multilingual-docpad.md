---
layout: Post
lang: ru
title: 'Мультиязычный блог на DocPad'
date: 2014-04-14
tags:
  - tools
---

Я веду этот блог на двух языках, но технически это один сайт на [Докпаде](http://docpad.org/), из которого собираются HTML-файлы на разных языках.

Вы можете посмотреть [исходники блога](https://github.com/sapegin/blog.sapegin.me), а я расскажу, как сделать так, чтобы у вас тоже был блог на нескольких языках.

## Перевод постов

Создадим отдельные папки для постов каждого языка. В моём случае это `src/documents_en` и `src/documents_ru` (для русского и английского языков).

И добавим вот такой код в конфиг Докпада (`docpad.coffee`):

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

Теперь можно собирать блог на нужном языке:

```bash
docpad run --env en  # Запустить локальный сервер с английской версией
docpad generate --env ru  # Собрать русскую версию
```

## Перевод интерфейса

Создадим YAML-файлы для каждого языка. Например, `src/lang/en.yml`:

```bash
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

Сюда можно поместить всё, что должно зависеть от языка блога.

Нам так же понадобятся несколько функций, добавим их в конфиг Докпада:

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
    # Локализованная дата
    pubDate: (date) ->
      moment(date).format('LL')  # December 23 2013

    # Перевод строки
    # Вернёт исходную строку, если перевод не будет найден
    # Есть простейший шаблонизатор: @_ 'Lorem {num} ipsum', num: 42
    _: (s, params=null) ->
      params ?= []
      s = @site[s] or s
      s.replace /\{([^\}]+)\}/g, (m, key) ->
        params[key] or m

    # Числительные: @plural(3, 'dog|dogs')
    plural: (n, s) ->
      ((@_ s).split '|')[pluralTypes[@site.lang](n)]

  events:
    generateBefore: (opts) ->
      # Достаём текущий язык из окружения Докпада
      lang = @docpad.getConfig().env
      # Загружаем строки для нужного языка
      strings = YAML.load("src/lang/#{lang}.yml")
      _.merge(@docpad.getTemplateData().site, strings)
      # Настраиваем языка для Moment.js
      moment.locale(lang)

    ...
}
```

Установим библиотеки, которые использовались в предыдущем отрывке кода:

```bash
npm install --save-dev yamljs moment lodash
```

Правила преобразования числительных можно найти в [polyglot.js](https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js).

Теперь нужно заменить в шаблонах все зависящие от языка данные на вызовы функций `@_`, `@plural` и `@pubDate`.

Обычные строки:

```html
<a href="/about"><%= @_ 'About' %></a> <%- (@_ 'poweredBy', dp:
'http://docpad.org/') %>
```

Числительные:

```html
<%= @_ '{num} {posts}', num: documents.length, posts:
@plural(documents.length, 'post|posts') %>
```

И даты:

```html
<%= @pubDate @document.date %>
```

## Переключатель языка

Добавим несколько новых строк в YAML-файлы:

```yaml
transLang: ru
transUrl: http://nano.sapegin.ru
translation: По-русски
```

И ещё одну функцию в `docpad.coffee`:

```coffee
docpadConfig = {
  templateData:
    ...
    # URL текущей страницы на другом языке или главной страницы, если для текущей страницы нет перевода
    translationUrl: ->
      if fs.existsSync "src/documents_#{@site.transLang}/#{@document.relativePath}"
        "#{@site.transUrl}#{@document.url}"
      else
        @site.transUrl
    ...
}
```

Ну и, собственно, ссылку в шаблон:

```html
<a href="<%= @translationUrl() %>"><%= @_ 'translation' %></a>
```

## Настройка сервера

Последнее, что нужно сделать, — это настроить веб-сервер так, чтобы он отдавал файлы нужного языка при заходе на соответствующую версию блога (у меня это отдельные домены, но можно сделать и разные директории), но это уже выходит за рамки этого поста.

P. S. [Другой подход](http://nylnook.com/en/blog/docpad-i18n/) к созданию мультиязычного блога на Докпаде.
