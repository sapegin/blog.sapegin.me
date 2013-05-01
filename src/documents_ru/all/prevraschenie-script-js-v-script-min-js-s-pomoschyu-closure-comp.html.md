---
layout: post
title: 'Превращение script.js в script.min.js с помощью Closure Compiler'
date: Jan 25, 2011
disqus_identifier: prevraschenie-script-js-v-script-min-js-s-pomoschyu-closure-comp
tags:
  - javascript
  - tools
---

Мне довольно часто бывает нужно минифицировать какой-нибудь JavaScript-файл и добавить в после имени файла .min. Для этого я использую вот такое заклинание, вложенное в BAT-файл:

```dos
@java -jar C:\Tools\closure\compiler.jar --js=%1 --js_output_file=%~d1%~p1%~n1.min%~x1 --charset=utf8
```

Минифицированный файл создаётся рядом с исходным — достаточно перетащить JS-файл на файл с заклинанием.

Для его работы вам понадобится [Closure Compiler](http://code.google.com/closure/compiler/). Кодировку нужно указывать, чтобы не латинские строки (если они есть) не превратились в знаки вопроса или ещё что похуже.
