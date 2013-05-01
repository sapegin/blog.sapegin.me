---
layout: post
title: 'Создание удобных демостраниц на Гитхабе с помощью сабмодулей'
date: Feb 8, 2012
disqus_identifier: sozdanie-udobnyh-demostranic-na-githabe-s-pomoschyu-sabmoduley
tags:
  - tools
---

Если вы используете [гитхаб-страницы](http://pages.github.com/) для демонстрации своих проектов, и вам надоело копировать исходные файлы из основной ветки в ветку gh-pages, то есть простой способ этого избежать.

Можно добавить ветку master как сабмодуль в ветку gh-pages *(адрес репозитория должен быть именно в таком формате, иначе страница перестанет обновляться)*:

```bash
git submodule add git://github.com/sapegin/social-likes.git src
git submodule init
```

Теперь можно подключать к страницам любые файлы проекта из папки src. Не забывайте только обновлять сабмодуль после изменений в основной ветке:

```bash
cd src
git pull origin master
cd ..
git commit -a -m "Update source."
git push origin gh-pages
```

P. S. Удалить сабмодуль можно так:

1. Удалите запись о нём в .gitmodules.
2. Удалите запись о нём в .git/config.
3. git rm --cached path_to_submodule
4. Удалите лишние файлы и закоммитьте изменения.
