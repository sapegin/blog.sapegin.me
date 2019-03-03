---
layout: Post
lang: ru
title: 'Создание файлов и структуры проекта по шаблонам с помощью Grunt'
date: 2012-04-12
disqus_identifier: 437 http://nano.sapegin.ru/?p=437
tags:
  - tools
---

[Grunt](https://github.com/cowboy/grunt) — это набор инструментов командной строки, облегчающих разработку на JavaScript. Он умеет [склеивать](https://github.com/cowboy/grunt/blob/master/docs/task_concat.md) и [минифицировать](https://github.com/cowboy/grunt/blob/master/docs/task_min.md) JS-файлы, [запускать тесты](https://github.com/cowboy/grunt/blob/master/docs/task_qunit.md) и [JSHint](https://github.com/cowboy/grunt/blob/master/docs/task_lint.md), запускать задачи при изменении файлов и даже содержит простейший веб-сервер. Но самое интересное для меня — команда [init](https://github.com/cowboy/grunt/blob/master/docs/task_init.md), создающая файлы (или структуру папок) по шаблону.

В репозитории Гранта уже есть [полдюжины шаблонов](https://github.com/cowboy/grunt/tree/master/tasks/init), но мне они были не слишком полезны, поэтому я сделал [пачку своих](https://github.com/sapegin/squirrelstrap).

Например, набрав `grunt init:readme`, я получаю в текущей папке файлы Readme.md и License.md, в которых уже стоят текущий год, моё имя и т. п.

Шаблон состоит из:

1. Файла templatename.js. В нём можно описать, что должен ввести пользователь; как эти параметры будут преобразованы и т. п. Тут доступны любые возможности JavaScript и Node.
2. Папки templatename/root со всеми файлами, которые будут скопированы при выполнении шаблона.
3. Файла templatename/rename.json с описанием правил переименования файлов.

Сами шаблоны должны лежать в `~/.grunt/tasks/init` или `%USERPROFILE%\.grunt\tasks\init`.

Например, шаблон простейшего HTML-файла может выглядеть так. Файл html.js:

```javascript
// Описание шаблона, которое можно увидеть выполнив grunt init (список доступных шаблонов)
exports.description = 'Create a simple HTML5 file.';

exports.template = function(grunt, init, done) {
  grunt.helper(
    'prompt',
    {},
    [
      // Пользовательские параметры
      // Имя файла (такой запрос уже есть в Гранте, поэтому нужно вызывать его с помощью grunt.helper)
      // index -- значение по умолчанию
      grunt.helper('prompt_for', 'name', 'index'),
      // Язык (такого запроса в Гранте нет, поэтому нам нужно описать все параметры)
      {
        name: 'lang',
        message: 'Document language',
        default: 'en'
      }
    ],
    function(err, props) {
      // Достаём параметры по умолчанию (находятся в файле defaults.json)
      grunt.utils._.defaults(props, init.defaults);

      // Список файлов для копирования
      var files = init.filesToCopy(props);

      // Список файлов для копирования
      init.copyAndProcess(files, props);

      // Готово :)
      done();
    }
  );
};
```

В папке html/root лежит один файл name.html. (Шаблон вымышленный, чтобы показать возможности Гранта.

```html
<!DOCTYPE html>
<html lang="{%= lang %}">
  <head>
    <meta charset="utf-8" />
    <title></title>
    <meta
      name="copyright"
      content="© {%= grunt.template.today('yyyy') %} {%= author_name %}"
    />
  </head>
  <body></body>
</html>
```

Остаётся задать правила переименования. Файл html/rename.json:

```json
{
  "name.html": "{%= name %}.html"
}
```

Всё, шаблоном можно пользоваться:

![Grunt.js](/images/win__grunt.png)

Что ещё посмотреть про Грант:

- [Репозиторий на Гитхабе](https://github.com/cowboy/grunt) ([стандартные шаблоны](https://github.com/cowboy/grunt/tree/master/tasks/init), [описание команды init](https://github.com/cowboy/grunt/blob/master/docs/task_init.md)).
- [Набор моих шаблонов](https://github.com/sapegin/squirrelstrap).
- Статья автора Гранта [Introducing Grunt](https://bocoup.com/blog/introducing-grunt).
- Статья [Meet Grunt: The Build Tool for JavaScript](https://code.tutsplus.com/tutorials/meet-grunt-the-build-tool-for-javascript--net-24856) на Nettuts+.
