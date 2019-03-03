---
layout: Post
lang: ru
title: 'Случайные аватарки для комментаторов с OpenID без почты в Wordpress'
date: 2009-11-03
disqus_identifier: 150 http://nano.sapegin.ru/?p=150
tags:
  - wordpress
---

В Вордпрессе есть интересная штука — он умеет генерировать случайные аватарки авторам комментариев на основе адреса электронной почты. На выбор есть три сервиса — Identicon, Wavatar и MonsterID.

Но при использовании OpenID возникает одна проблема. Не всегда при авторизации по OpenID можно узнать почту автора комментария, и тогда будет сгенерирована аватарка для случайной строки, т. е. одна и та же для всех пользователей без электропочты.

Решается проблема довольно просто. Нужно перехватывать получение аватарки и при отсутствии адреса почты просто получать аватарку для адреса OpenID.

```php
add_filter('get_avatar', 'bw_get_avatar', 10, 4);

function bw_get_avatar($avatar, $id_or_email, $size, $default) {
  if (is_object($id_or_email) && empty($id_or_email->comment_author_email)) {
    $id_or_email->comment_author_email = $id_or_email->comment_author_url;
    return get_avatar($id_or_email, $size);
  }

  return $avatar;
}
```

Для работы необходим плагин [OpenID](https://wordpress.org/plugins/openid/).

У меня для таких штук заведён специальный плагин, чтобы все «докрутки» Вордпресса были в одном месте. Посмотреть, как это выглядит можно в моём [блоге о фотографии](http://birdwatcher.ru/blog/3967).
