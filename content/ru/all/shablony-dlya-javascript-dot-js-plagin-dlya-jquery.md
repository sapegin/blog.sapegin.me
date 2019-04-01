---
layout: Post
lang: ru
title: 'Шаблоны в JavaScript (doT.js + плагин для jQuery)'
date: 2012-08-16
tags:
  - javascript
  - html
---

Полтора года назад я [уже писал](http://nano.sapegin.ru/all/shablony-dlya-jquery-plagin-jquery-tmpl) про шаблоны для jQuery. Однако плагин jquery-tmpl больше не разрабатывается, и недавно я стал использовать вместо него [doT.js](http://olado.github.io/doT/).

doT.js — это очень простой, маленький и быстрый шаблонизатор. Он в два раза меньше jquery-tmpl и не имеет никаких зависимостей.

Возьмём пример из старого поста и переделаем его на doT. Шаблон чуть-чуть поменяется:

```html
<script type="text/plain" id="tmpl_photo">
  <div class="sh-photo jstree-draggable" data-id="{{=it.id}}">
    <img src="{{=it.image}}" width="{{=it.width}}" height="{{=it.height}}" alt="{{=it.title}}">
  </div>
</script>
```

Обратите внимание, что теперь все данные — свойства объекта it (его имя можно поменять). Поэтому ничего не взрывается, если какие-то данные не передали в шаблон, как это делают более простые шаблонизаторы (например, шаблонизатор из [Underscore.js](http://underscorejs.org/)).

Данные те же самые:

<!-- prettier-ignore -->
```javascript
var photos = [
  {id: 1, image: 'photo1.jpg', title: 'Photo 1', width: 100, height: 100},
  {id: 1, image: 'photo1.jpg', title: 'Photo 2', width: 100, height: 100}
];
```

А теперь само преобразование (для простоты — только первого элемента, т. к. в doT не умеет принимать на вход массив и применять шаблон к каждому элементу, как это делает jquery-tmpl):

```javascript
var tmpl = doT.template($('#tmpl_photo').html());
$('#container').html(tmpl(photos[0]));
```

И маленький бонус — jQuery-плагин, упрощающий использование doT в jQuery и умеющий принимать на вход массив исходных данных.

```javascript
$.fn.tmpl = function(tmplId, data) {
  var tmpl = doT.template($('#tmpl_' + tmplId).text());
  if (!$.isArray(data)) data = [data];

  return this.each(function() {
    var html = '';
    for (var itemIdx = 0; itemIdx < data.length; itemIdx++) {
      html += tmpl(data[itemIdx]);
    }
    $(this).html(html);
  });
};
```

Используется так:

```javascript
$('#container').tmpl('photo', photos);
```

Смотрите [живой пример](https://jsfiddle.net/sapegin/VGwqK/) на Фидле.
