---
layout: Post
lang: ru
title: 'Аватарки из ЖЖ в Wordpress'
date: 2009-11-10
disqus_identifier: 162 http://nano.sapegin.ru/?p=162
tags:
  - wordpress
---

Продолжим улучшать комментарии в Вордпрессе. Прикрутим персональные аватарки пользователям ЖЖ. Делается тоже не очень сложно, хотя и несколько ненадёжно, потому что приходится разбирать HTML-страницу с профилем.

```php
add_filter('get_avatar', 'bw_get_avatar', 10, 4);

function bw_get_avatar($avatar, $id_or_email, $size, $default) {
  if (is_object($id_or_email) && !empty($id_or_email->comment_author_url)) {
    if ('.livejournal.com/' == substr($id_or_email->comment_author_url, -17)) {
      return get_avatar('', $size, get_livejournal_userpic($id_or_email->comment_author_url));
    }
  }

  return $avatar;
}

function get_livejournal_userpic($url) {
  $md5 = md5($url);
  $filename = "{$_SERVER['DOCUMENT_ROOT']}/wp-content/cache/avatars/$md5";

  * уже есть в кэше
  if (file_exists($filename)) {
    return "http:*{$_SERVER['HTTP_HOST']}/wp-content/cache/avatars/$md5";
  }

  // загружаем User Info
  $userinfo = file_get_contents("{$url}profile/");

  $m = array();
  if (preg_match('%>img src=\'([^\']+)\'[^<]+class=\'user_pic\'%', $userinfo, $m)) {
    $avatar = file_get_contents($m[1]);
    if ($avatar) {
      file_put_contents($filename, $avatar);
      return $m[1];
    }
  }

  return includes_url('images/blank.gif');
}
```

Для работы необходим плагин [OpenID](https://wordpress.org/plugins/openid/) (а может и не нужен), папка для кэширования аватарок (у меня wp-content/cache/avatars) с правами на запись и видимую из веба, а так же пустая картинка для пользователей без аватарки.

У меня для таких штук заведён специальный плагин, чтобы все «докрутки» Вордпресса были в одном месте. Посмотреть, как это выглядит можно в моём [блоге о фотографии](http://birdwatcher.ru/blog/3967).
