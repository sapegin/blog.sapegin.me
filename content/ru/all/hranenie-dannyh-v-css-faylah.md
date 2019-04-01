---
layout: Post
lang: ru
title: 'Хранение данных в CSS-файлах'
date: 2012-02-16
disqus_identifier: 415 http://nano.sapegin.ru/?p=415
tags:
  - javascript
  - html
---

Иногда бывает нужно хранить какие-то данные непосредственно в CSS-файле, и иметь к ним доступ из JavaScript. Самый простой и кроссбраузерный способ — использование свойств content и font-family с одинаковым значением (font-family нужен для ИЕ).

Где-нибудь на странице нужно создать служебный элемент:

```html
<div id="pony"></div>
```

И применить к нему CSS:

```css
#pony {
  display: none;
  content: 'Pink';
  font-family: 'Pink';
}
```

Теперь мы можем легко достать нашу строку:

```javascript
function getCssString(elem) {
  var value = elem.css('content') || elem.css('font-family');
  return value && value.replace(/"/g, '');
}

alert(getCssString($('#pony')));
```

Можно посмотреть [живой пример](https://jsfiddle.net/sapegin/aSpwC/).

<small>P. S. Спасибо коллеге Егору Дыдыкину за указание на этот метод.</small>
