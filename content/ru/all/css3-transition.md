---
layout: Post
lang: ru
title: 'CSS3 transition фона: кое-какие детали'
date: 2011-06-01
disqus_identifier: 284 http://nano.sapegin.ru/?p=284
tags:
  - html
---

Читая книгу «[Stunning CSS3](http://www.stunningcss3.com/)» обратил внимание, что [стандарт CSS3](http://www.w3.org/TR/css3-transitions/) запрещает делать transition свойства background. Можно использовать только background-color, background-image (почему-то только для градиентов) и background-position. Однако, как было написано в книге, большинство браузеров должны понимать и просто background.

Я решил проверить, так ли это на самом деле, и сделал [небольшой тест](https://jsfiddle.net/sapegin/e3r7x/). На данный момент все браузеры, кроме Оперы, делают переход цвета фона, даже если написать просто background.

Тест так же показал, что переходы градиентов пока не работают ни в одном браузере. Радует, что как минимум разработчики вебкита это потихоньку [исправляют](https://bugs.webkit.org/show_bug.cgi?id=21725).

Проверку переходов background-position оставляю читателю в качестве домашнего задания.
