---
layout: Post
lang: ru
title: 'Создание удобных демостраниц на Гитхабе с помощью сабмодулей'
date: 2012-02-08
disqus_identifier: 404 http://nano.sapegin.ru/?p=404
tags:
  - tools
---

Если вы используете [гитхаб-страницы](https://pages.github.com/) для демонстрации своих проектов, и вам надоело копировать исходные файлы из основной ветки в ветку gh-pages, то есть простой способ этого избежать.

Можно добавить ветку master как сабмодуль в ветку gh-pages _(адрес репозитория должен быть именно [в таком формате](https://help.github.com/articles/using-submodules-with-pages/), иначе страница перестанет обновляться)_:

```bash
git submodule add https://github.com/sapegin/social-likes.git src
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
