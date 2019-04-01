---
layout: Post
lang: ru
title: 'Вёрстка примеров кода с индикаторами переносов строк'
date: 2011-04-27
disqus_identifier: 269 http://nano.sapegin.ru/?p=269
tags:
  - html
---

**Задача**: сверстать примеры кода с переносами строк и индикаторами переноса в конце строк. Без картинок и JavaScript.

<!--more-->

<iframe style="width: 100%; height: 300px" src="https://jsfiddle.net/sapegin/fZPdb/embedded/result,css,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<small>(Если вместо окна с примером вы видите пустое пространство — откройте [исходный пост](http://nano.sapegin.ru/all/vyorstka-primerov-koda-s-indikatorami-perenosov-strok).)</small>

Работает во всех современных браузерах (в IE начиная с 9-й версии). Ограничения: (1) количество индикаторов для одной строки определяется количеством символов переноса в атрибуте content селектора .code li:before; (2) длинные строки без пробелов не разбиваются.
