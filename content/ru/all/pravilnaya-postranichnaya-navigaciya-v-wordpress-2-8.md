---
layout: Post
lang: ru
title: 'Правильная постраничная навигация в WordPress 2.8'
date: 2009-06-16
disqus_identifier: 128 http://nano.sapegin.ru/?p=128
tags:
  - wordpress
---

В Wordpress 2.8 зачем-то изменили поведение функции [posts_nav_link](https://codex.wordpress.org/Template_Tags/posts_nav_link), которая теперь воспринимает пустые строки не как «ничего не выводить», а как «вывести ссылку с текстом по умолчанию». Из-за этого сделать постраничный навигатор с правильным расположением ссылок (т. е. обратным принятому в Wordpress по умолчанию) стало не так-то просто. Сложности возникают при необходимости выводить между ссылками разделитель.

В итоге у меня не придумалось ничего лучше такого:

```php
ob_start();
posts_nav_link('{separator}', '', '');
$separator = ( strpos(ob_get_clean(), '{separator}') !== false );

next_posts_link('&larr; Предыдущие записи');
if ($separator) echo ' &mdash; ';
previous_posts_link('Следующие записи &rarr;');
```

А вот более правильный вариант (спасибо [Сергею](http://iskariot.ru/) за подсказки):

```php
$prev = get_next_posts_link('&larr; Предыдущие записи');
$next = get_previous_posts_link('Следующие записи &rarr;');
echo $prev, ( $prev && $next ) ? ' &mdash; ' : '', $next;
```
