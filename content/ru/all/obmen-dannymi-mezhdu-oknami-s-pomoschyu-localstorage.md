---
layout: Post
lang: ru
title: 'Обмен данными между окнами с помощью localStorage'
date: 2011-04-26
disqus_identifier: 264 http://nano.sapegin.ru/?p=264
tags:
  - javascript
---

Одно из интересных применений [localStorage](http://diveintohtml5.info/storage.html) — обмен данными между несколькими окнами одного сайта, одновременно открытыми в браузере.

Так как хранилище единое для всего домена, то, записав данные на одной странице, можно тут же прочитать их на другой. А чтобы было всё совсем просто, есть событие storage, которое вызывается при любом изменении данных из _другого_ окна.

Пример. Откройте несколько копий этой страницы и попробуйте изменить поле в одной из них — изменения тут же отобразятся во всех копиях страницы.

<iframe style="width: 100%; height: 80px" src="https://jsfiddle.net/sapegin/zkxGB/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

(Если вместо окна с примером вы видите пустое пространство — откройте [исходный пост](http://nano.sapegin.ru/all/obmen-dannymi-mezhdu-oknami-s-pomoschyu-localstorage).)

Пример должен работать в последних версиях всех браузеров, а так же в Firefox 4, Safari 4 и Opera 10.5. Можно даже заставить его работать в IE8, но там событие storage работает иначе: не передаются key, oldValue и newValue.
