---
layout: Post
lang: ru
title: 'Анимация цвета с помощью плагина jQuery.Color()'
date: 2011-06-22
disqus_identifier: 334 http://nano.sapegin.ru/?p=334
tags:
  - javascript
---

Недавно команда jQuery [выпустила](http://blog.jquery.com/2011/05/31/jquery-color-v2-beta-1-released/) бета-версию обновлённого плагина для анимации цвета [jQuery.Color()](https://github.com/jquery/jquery-color). Плагин позволяет работать с цветовыми моделями RGBA и HSLA; читать и изменять (как на абсолютные значения, так и относительно текущего) отдельные компоненты цветов; анимировать цвет фона, текста и рамки.

Например, можно плавно изменять оттенок (hue) от 0 до 359 (т. е. от красного до красного со всеми остальными цветами между ними). ([Первый пример](https://jsfiddle.net/sapegin/Ssy7T/) по ссылке.)

```javascript
(function animate() {
  var block = $('#c1');
  block.animate(
    {
      backgroundColor: $.Color(block.css('backgroundColor')).hue(
        '+=179'
      )
    },
    3000,
    animate
  );
})();
```

А вот более полезное применение: обратная связь при клике. Блок как бы зажигается на мгновение. Это достигается плавным увеличением яркости (lightness) на 40%. При этом скрипту не нужно задавать никакие цвета: он сам определяет и начальный цвет, и конечный. Я недавно использовал такой эффект в пятизвёздочном рейтинге — смотрится хорошо. ([Второй пример](https://jsfiddle.net/sapegin/Ssy7T/) по той же ссылке.)

```javascript
$('#c2').click(function(e) {
  var block = $(e.target);
  var color = $.Color(block.css('backgroundColor'));
  block.animate(
    { backgroundColor: color.lightness('+=0.4') },
    300,
    function() {
      block.animate({ backgroundColor: color }, 300);
    }
  );
});
```
