---
layout: post
title: 'Хранение данных в CSS-файлах'
date: Feb 16, 2012
disqus_identifier: hranenie-dannyh-v-css-faylah
tags:
  - javascript
  - html
---

Иногда бывает нужно хранить какие-то данные в непосредственно CSS-файле, и иметь к ним доступ из JavaScript. Самый простой и кроссбраузерный способ — использование свойств content и font-family с одинаковым значением (font-family нужен для ИЕ).

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

Можно посмотреть [живой пример](http://jsfiddle.net/sapegin/aSpwC/).

<small>P. S. Спасибо коллеге Егору Дыдыкину за указание подсказку этого метода.</small>
