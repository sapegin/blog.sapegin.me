---
layout: Post
lang: ru
title: 'Подсветка кода в WordPress с помощью highlight.js'
date: 2011-06-07
disqus_identifier: 307 http://nano.sapegin.ru/?p=307
tags:
  - javascript
  - wordpress
  - html
---

Решил заменить в блоге серверную подсветку кода (плагин [wp-syntax](https://wordpress.org/plugins/wp-syntax/)) на клиентскую ([highlight.js](https://highlightjs.org/)). Знаю, что для последнего уже есть несколько [плагинов для Вордпресса](http://softwaremaniacs.org/soft/), но мне показалось, что проще самому написать 10 строк кода.

Итак, подключаем highlight.js. В header.php темы блога подключаем CSS с выбранной [цветовой схемой](https://highlightjs.org/static/demo/):

```html
<link
  rel="stylesheet"
  href="//yandex.st/highlightjs/6.0/styles/zenburn.min.css"
/>
```

В footer.php подключаем сам скрипт и инициализируем его:

```html
<script src="//yandex.st/highlightjs/6.0/highlight.min.js"></script>
<script>
  hljs.tabReplace = '<span class="indent">\t</span>';
  hljs.initHighlightingOnLoad();
</script>
```

Делаем табуляцию в 4 пробела — добавляем в CSS следующее:

```css
.indent {
  display: inline-block;
  width: 2.2em;
}
pre {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  white-space: pre;
  white-space: pre-wrap;
  white-space: pre-line;
  word-wrap: break-word;
}
```

Параметр tab-size нужен, чтобы при загрузки страницы не было заметно, как уменьшаются отступы. К сожалению, работает это пока только в Файрфоксе и Опере. А white-space позволяет длинным строкам переноситься.

Код уже должен раскрашиваться, но есть одна проблема: исчезает табуляция. Для её решения добавьте в functions.php вашей темы:

```php
<?php
add_filter('the_content', 'preserve_tabs');

function preserve_tabs($content) {
  return str_replace("\t", '&#09;', $content);
}
?>
```
