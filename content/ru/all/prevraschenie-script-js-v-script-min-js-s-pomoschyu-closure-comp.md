---
layout: Post
lang: ru
title: 'Превращение script.js в script.min.js с помощью Closure Compiler'
date: 2011-01-25
disqus_identifier: 217 http://nano.sapegin.ru/?p=217
tags:
  - javascript
  - tools
---

Мне довольно часто бывает нужно минифицировать какой-нибудь JavaScript-файл и добавить в после имени файла .min. Для этого я использую вот такое заклинание, вложенное в BAT-файл:

```bash
@java -jar C:\Tools\closure\compiler.jar --js=%1 --js_output_file=%~d1%~p1%~n1.min%~x1 --charset=utf8
```

Минифицированный файл создаётся рядом с исходным — достаточно перетащить JS-файл на файл с заклинанием.

Для его работы вам понадобится [Closure Compiler](https://developers.google.com/closure/compiler/?csw=1). Кодировку нужно указывать, чтобы не латинские строки (если они есть) не превратились в знаки вопроса или ещё что похуже.
