---
layout: Post
lang: ru
title: 'Вёрстка векторного логотипа с использованием SVG'
date: 2012-07-27
disqus_identifier: 468 http://nano.sapegin.ru/?p=468
tags:
  - html
---

Задача — сверстать логотип так, чтобы:

- Он был векторным.
- Менял цвет при наведении.
- Делал это плавно.
- Умещался в одном файле.
- Работал во всех браузерах (с откатом на PNG в случае необходимости).

<!--more-->

Очень просто это можно сделать с помощью [SVG-стека](http://simurai.com/blog/2012/04/02/svg-stacks). Используя псевдокласс :target в SVG, можно хранить в одном файле несколько картинок. Например, при подключении logo.svg#normal мы увидим обычный логотип, а при подключении logo.svg#hover — подсвеченный.

Но пока подключение таких картинок фоном в CSS работает только в Файрфоксе. Зато через тег object — везде. (Лучше было бы использовать тег img, но это не работет в вебките). А значит мы можем сделать так:

```html
<div class="logo">
  <object
    data="logo.svg#normal"
    type="image/svg+xml"
    class="logo__image"
  ></object>
  <a href="/" class="logo__link">Oleg Breslavtsev</a>
</div>
```

И вот так:

```css
.logo,
.logo__link,
.logo__image {
  display: block;
  width: 260px;
  height: 48px;
}
.logo {
  position: relative;
}
.logo__link,
.logo__image {
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.logo__link {
  background: url(logo.svg) no-repeat;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  background-size: auto;
  opacity: 0;
}
.logo:hover .logo__link {
  opacity: 1;
}
.logo:hover .logo__image {
  opacity: 0;
}
.no-svg .logo__image {
  display: none;
}
.no-svg .logo__link {
  opacity: 1;
  background: url(logo.png);
}
```

Теперь у нас только обычный вариант логотипа использует псевдокласс :target, а значит подсвеченный мы можем подключить CSS-фоном. Для старых браузеров используется PNG, класс no-svg добавляет [Modernizr](https://modernizr.com/). Теперь остаётся подготовить SVG-файл:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 48">
  <g id="normal">
    <!-- собственно, логотип -->
  </g>
  <style>
    g {
      fill: #c399cc;
    }
    g:target {
      fill: #222;
    }
  </style>
</svg>
```

Получается вот так:

<iframe style="width: 100%; height: 120px" src="https://jsfiddle.net/sapegin/LGkqP/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

P. S. Горячо рекомендую статью Вадима Макеева «[Непростая простая кнопка](https://pepelsbey.net/2012/07/uneasy-easy-button/)», которая и сподвигла меня на эксперименты с логотипом.
