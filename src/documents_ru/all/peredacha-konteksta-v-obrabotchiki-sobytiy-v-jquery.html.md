---
layout: post
title: 'Передача контекста в обработчики событий в jQuery'
date: Jan 13, 2011
disqus_identifier: 212 http://nano.sapegin.ru/?p=212
tags:
  - javascript
---

Обычно для того, чтобы this указывал не на тот объект, который вызвал событие, а на тот, из которого навесили обработчик, делается примерно так:

```javascript
var obj = {
	message: 'Hullo!',
	init: function() {
		var this_ = this;
		$('.button').click(function(){ this_.handler(42) });
	},
	handler: function(num) {
		alert(this.message + "\n" + num);
	}
};
obj.init();
```

В jQuery есть *правильный* способ это сделать — метод [jQuery.proxy()](http://api.jquery.com/jQuery.proxy/):

```javascript
$('.button').click($.proxy(function(){ obj.handler(42) }, this));
```

Однако, если в метод нужно передать параметры, то короче от этого не станет, всё равно придётся создавать замыкание. Вот если бы параметров не было, получилось бы просто и красиво:

```javascript
$('.button').click($.proxy(obj.handler, this));
```

Но есть и более краткий способ передать и контекст, и параметры — через параметр data методов [eventname()](http://api.jquery.com/click/):

```javascript
$('.button').click(this, function(e){ e.data.handler(42) });
```

К сожалению, этот способ работает начиная с jQuery 1.4.3, в более раниих версиях нужно использовать [bind()](http://api.jquery.com/bind/), что несколько длиннее и не так красиво.

**Дополнение**. Когда-нибудь наступит светлое будущее, и можно будет пользоваться нативным методом [bind](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind). Вот так:

```javascript
$('.button').click(this.handler.bind(this));
```

Или с параметром:

```javascript
$('.button').click(this.handler.bind(this, 42));
```

Уже сейчас метод bind работает в последних версиях всех браузеров (включая IE9). Полифил для старых браузеров есть на MDN по ссылке выше. А если вы используете [Modernizr](http://modernizr.com/), то полифил у вас уже есть.
