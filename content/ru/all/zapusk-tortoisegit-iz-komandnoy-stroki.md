---
layout: Post
lang: ru
title: 'Запуск TortoiseGit из командной строки'
date: 2012-04-26
disqus_identifier: 430 http://nano.sapegin.ru/?p=430
tags:
  - windows
  - tools
---

Обычно я работаю с Гитом из командной строки, но выбирать файлы для коммита и смотреть логи/диффы удобнее через TortoiseGit. Чтобы не открывать его каждый раз из Проводника, я положил в папку C:\Program Files\TortoiseGit\bin файл tgit.bat с таким содержимым:

```bash
@TortoiseProc /command:%1 /path:.
```

И tgit для запуска из Git Bash:

```bash
#!/usr/bin/env sh
TortoiseProc /command:$1 /path:.
```

Теперь я могу просто писать в консоли tgit commit или tgit log. (На самом деле я сделал ещё одну пару файлов: tgitc.bat/tgitc для ещё более быстрого запуска окна коммита TortoiseGit.)

P. S. Ну а на сервере удобно использовать [tig](http://jonas.nitro.dk/).
