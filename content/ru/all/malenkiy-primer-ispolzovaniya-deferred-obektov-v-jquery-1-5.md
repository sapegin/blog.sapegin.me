---
layout: Post
lang: ru
title: 'Маленький пример использования deferred-объектов в jQuery 1.5'
date: 2011-02-02
disqus_identifier: 241 http://nano.sapegin.ru/?p=241
tags:
  - javascript
---

Недавно у меня была такая задача: нужно было выполнить несколько аяксных запросов и показать на странице индикатор загрузки. Причём, индикатор должен был крутиться не меньше некоторого времени, чтобы у пользователя не было ощущения, что после нажатия на кнопку ничего не произошло. После завершения всех запросов нужно было выполнить некоторое действие. Код тогда получился излишне объёмным и не очень красивым. Deferred-объекты, появившиеся в jQuery 1.5, позволяют решить такую задачу гораздо проще и элегантнее.

```javascript
function doAjax() {
  return $.getJSON(
    'http://ws.geonames.org/timezoneJSON?lat=55.755786&lng=37.617633&callback=?'
  );
}

function doAjax2() {
  return $.getJSON(
    'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=sapegin&count=1&callback=?'
  );
}

function doTimer() {
  var deferred = $.Deferred();
  setTimeout(deferred.resolve, 3000);
  return deferred.promise();
}

$('button#mypony').click(function() {
  var elem = $(this);
  elem
    .data('label', elem.html())
    .attr('disabled', true)
    .html('Loading&hellip;')
    .blur();

  $.when(doAjax(), doAjax2(), doTimer()).then(function(
    geonames,
    twitter
  ) {
    elem.html(elem.data('label')).attr('disabled', false);
    alert(geonames[0].timezoneId + '\n' + twitter[0][0].text);
  });
});
```

Чтобы не заниматься пересказом, вот хорошее [описание Deferred-объектов](https://habrahabr.ru/post/112960/). Тут у нас есть два запроса: Geonames (данные о часовом поясе) и Twitter (последний твит); а так же трёхсекундный таймер. Все встроенные в jQuery функции для работы с аяксом уже обладают deferred-поведением (т. н. наблюдаемые объекты), а вот таймер нужно учить самостоятельно. Когда все три функции завершат свои задания, будет вызван обработчик then, куда будут переданы ответы обоих запросов.
