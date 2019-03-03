---
layout: Post
lang: ru
title: 'Grunt 0.4: система сборки для фронтенд-разработчиков'
date: 2013-02-19
disqus_identifier: grunt-0-4
tags:
  - javascript
  - tools
---

Эта статья — пересказ [моего доклада](http://sapegin.ru/pres/grunt/) на Web Standards Days в ноябре прошлого года, учитывающий все изменения новой версии 0.4. Будет полезен как новичкам в Гранте, так и пользователям Гранта 0.3, переходящим на новую версию.

## Зачем это нужно

У хороших сайтов есть две версии:

1. Версия для разработки: JS/CSS разбиты на много файлов и не сжаты, долго загружается, легко отлаживать.
2. Боевая версия: минимум запросов к серверу, ничего лишнего, всё сжато, быстро загружается.

Грант автоматически делает из первой версии вторую: склеивает файлы, минифицирует JavaScript, проверяет код с помощью JSHint, прогоняет тесты, запускает CSS-препроцессоры и компилятор CoffeeScript. [Всего](http://gruntjs.com/plugins) не перечислишь. И может делать это как по команде, так и автоматически, отслеживая изменения исходных файлов.

В отличии от других подобных инструментов (Ant, Make и т. д.), Грант создавался специально для фронтенд-разработчиков. И сам Грант, и расширения для него, и даже конфиг написаны на знакомом им языке — JavaScript. Он легко настраивается и расширяется. А большинство готовых расширений устанавливаются одной командой вместе со всеми зависимостями. (Конечно, есть немало расширений, использующих внешние библиотеки и утилиты, которые не всегда работают на всех платформах.)

<!--more-->

## Установка

Для использования Гранта вам понадобится установить [Node](https://nodejs.org/en/) (на маке просто brew install node). Вместе с Нодой установится менеджер пакетов npm, который понадобится для установки самого Гранта и его плагинов.

_Если вы уже пользуетесь предыдущей версией Гранта, то перед установкой её нужно удалить: npm uninstall -g grunt._

Установим [консольную утилиту grunt](https://github.com/gruntjs/grunt-cli/) (ключ `-g` означает, что пакет будет установлен глобально), которая будет запускать Грант, установленный в папке вашего проекта. Таким образом у каждого проекта будут свои версии Гранта и плагинов — можно не бояться, что при обновлении сборка поломается.

```bash
npm install grunt-cli -g
```

_Вероятно, вам понадобится запустить npm через sudo или открыть консоль под администратором._

## Настройка

Теперь нужно создать в папке проекта два файла:

- package.json — описание проекта для npm. Содержит список зависимостей (в нашем случае это Грант и его плагины) и позволяет потом устанавливать их все одной командой.
- Gruntfile.js или Gruntfile.coffee — файл конфигурации Гранта (грантфайл). (До версии 0.4 этот файл назывался grunt.js.)

(Примеры к статье есть в [репозитории на Гитхабе](https://github.com/sapegin/grunt-article-examples).)

### package.json

package.json можно создать вручную или командой `npm init`. В нём есть два обязательных поля — имя проекта и версия. Если вы делаете сайт, а не библиотеку, то их содержимое не имеет значения:

```json
{
  "name": "MyProject",
  "version": "0.0.0"
}
```

Теперь нужно установить (и добавить в package.json) зависимости нашего проекта. [Грант](https://github.com/gruntjs/grunt/):

```bash
npm install grunt --save-dev
```

И все необходимые плагины:

```bash
npm install grunt-contrib-concat grunt-contrib-uglify --save-dev
```

Ключ `--save-dev` в дополнение к установке добавляет ссылку на пакет в package.json. Установить все зависимости, уже перечисленные в файле, можно командой npm install.

### Грантфайл

Грантфайл выглядит примерно так:

```javascript
// Обязательная обёртка
module.exports = function(grunt) {
  // Задачи
  grunt.initConfig({
    // Склеиваем
    concat: {
      main: {
        src: [
          'js/libs/jquery.js',
          'js/mylibs/**/*.js' // Все JS-файлы в папке
        ],
        dest: 'build/scripts.js'
      }
    },
    // Сжимаем
    uglify: {
      main: {
        files: {
          // Результат задачи concat
          'build/scripts.min.js': '<%= concat.main.dest %>'
        }
      }
    }
  });

  // Загрузка плагинов, установленных с помощью npm install
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Задача по умолчанию
  grunt.registerTask('default', ['concat', 'uglify']);
};
```

Этот грантфайл склеивает JS-файлы (jQuery и все JS-файлы из папки js/mylibs, задача [concat](https://github.com/gruntjs/grunt-contrib-concat)) и минифицирует их с помощью UglifyJS (задача [uglify](https://github.com/gruntjs/grunt-contrib-uglify)).

Обратите внимание на задачу по умолчанию default — это просто «ссылка» на задачи concat и uglify. Она обязательно должна быть в грантфайле.

### Задачи, подзадачи, параметры

Конфигурация большинства задач выглядит примерно так:

<!-- prettier-ignore -->
```javascript
concat: {
  options: {
    separator: ';'
  },
  libs: {
    src: 'js/libs/**/*.js',
    dest: 'build/libs.js'
  },
  main: {
    src: [
      'js/mylibs/*.js',
      'js/main.js'
    ],
    dest: 'build/scripts.js'
  }
}
```

concat:libs и concat:main — это подзадачи, они позволяют запускать одну задачу для разных исходных файлов. А в options определяются общие для всех подзадач параметры.

_В других системах сборки задачи обычно называют целями (target)._

### Списки файлов

Список исходных файлов можно задать двумя способами: один файл или массив файлов. Можно использовать маски (glob). С масками нужно иметь ввиду, что порядок файлов может оказаться любым. Это может привести к проблемам, например, при склейке CSS- или JS-файлов.

<!-- prettier-ignore -->
```javascript
'js/main.js'
[ 'js/utils.js', 'js/main.js' ]
[ 'js/libs/*.js', 'js/mylibs/**/*.js' ]  // * -- любые символы, /**/ -- папка любой вложенности
```

### Шаблоны

Внутри параметров конфига можно использовать шаблоны. Грант использует шаблонизатор из библиотеки [Lo-Dash](https://lodash.com/).

С помощью шаблонов можно ссылаться на другие параметры конфига, вставлять текущую дату в имя результирующего файла, и использовать любые конструкции Яваскрипта.

<!-- prettier-ignore -->
```javascript
concat: {
  main: {
    src: 'js/*.js',
    dest: 'build/scripts.js'
  }
},
uglify: {
  main: {
    files: {
      // "Копируем" другой параметр конфига. Добавляем текущую дату в имя файла
      'build.<%= grunt.template.today("m-d-yyyy") %>.js': '<%= concat.main.dest %>'
    }
  }
}
```

А вот так можно использовать данные из JSON-файла:

<!-- prettier-ignore -->
```javascript
pkg: grunt.file.readJSON('package.json'),
banner: '/* <%= pkg.name %> v<%= pkg.version %> */'
uglify: {
  main: {
    files: {
      '<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
    }
  }
}
```

## Запуск

```bash
grunt  # Задача default
grunt concat  # Задача concat
grunt concat:main  # Подзадача concat:main

grunt --debug
```

Во время разработки удобно запускать Грант с ключом `--debug`. Задачи могут использовать его по-разному. Например, [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus) в отладочном режиме не сжимает CSS-код.

## grunt watch

Задача [watch](https://github.com/gruntjs/grunt-contrib-watch) запускает задачи при каждом изменении исходных файлов.

Например, можно заново склеивать JS-файлы при каждом их изменении:

<!-- prettier-ignore -->
```javascript
concat: {
  main: {
    src: 'js/*.js',
    dest: 'build/scripts.js'
  }
}
watch: {
  concat: {
    files: '<%= concat.main.src %>',
    tasks: 'concat' // Можно несколько: ['lint', 'concat']
  }
}
```

Не забудьте добавить в грантфайл плагин grunt-contrib-watch:

```javascript
grunt.loadNpmTasks('grunt-contrib-watch');
```

И установить соответствующий пакет из npm:

```bash
npm install grunt-contrib-watch --save-dev
```

## Веб-сервер

Простейший веб-сервер для статических сайтов — задача [connect](https://github.com/gruntjs/grunt-contrib-connect).

<!-- prettier-ignore -->
```javascript
connect: {
  test: {
    options: {
      port: 8000,
      base: '.'
    }
  }
}
```

Запускается так:

```bash
grunt connect
```

Теперь ваш сайт доступен по адресу [http://localhost:8000/](http://localhost:8000/).

## JSHint

Раньше (до версии 0.4) нужно было перечислять все опции JSHint прямо в грантфайле, сейчас можно хранить их в файле .jshintrc. Этот же файл могут использовать и консольный JSHint, и [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter-for-ST2). Задача [jshint](https://github.com/gruntjs/grunt-contrib-jshint).

<!-- prettier-ignore -->
```javascript
jshint: {
  options: {
    jshintrc: '.jshintrc'
  },
  files: 'js/**/*.js'
}
```

## Конфигурации

Конфигурации позволяют переключаться между боевой и отладочной версиями сайта. В явном виде в Гранте их нет. Но можно сделать, например, так:

<!-- prettier-ignore -->
```javascript
concat: {
  main: {
    src: 'js/*.js',
    dest: 'build/scripts.js'
  }
},
uglify: {
  main: {
    files: {
      '<%= concat.main.dest %>': '<%= concat.main.dest %>'
    }
  }
}
...
grunt.registerTask('default', ['concat', 'uglify']);
grunt.registerTask('debug', ['concat']);
```

Отладочная версия собирается так: `grunt debug`, а боевая: просто `grunt`. HTML в обоих случаях не меняется, но в последнем код будет сжат.

Для более крупных проектов может понадобится что-то сложнее. Например, RequireJS и/или подключение разных файлов в шаблонах.

## Быстрое подключение плагинов

Писать для каждого плагина `grunt.loadNpmTasks('имяплагина')` быстро надоест, поэтому лучше сразу заменить все вызовы loadNpmTasks одной строчкой:

```javascript
require('load-grunt-tasks')(grunt);
```

И установить [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks):

```bash
npm install load-grunt-tasks --save-dev
```

Это заклинание вызовет loadNpmTasks для всех плагинов установленных с ключом `--save-dev`.

## grunt-init

Утилита [grunt-init](https://github.com/gruntjs/grunt-init) упрощает инициализацию проектов (в английском для обозначения этого процесса есть удобное слово scaffolding):

- создаёт файлы и структуру папок;
- позволяет использовать шаблоны везде, где только можно;
- переименовывает файлы при копировании;
- задаёт пользователю уточняющие вопросы.

Устанавливается отдельно:

```bash
npm install grunt-init -g
```

Из коробки есть шаблоны для грантфайлов, jQuery-плагинов, проектов на Node и другие (полный список можно посмотреть набрав `grunt-init --help`). Например, если выполнить `grunt-init node`, то получится вот такое [дерево файлов](https://github.com/gruntjs/grunt-init-node-sample/tree/generated):

```bash
tree
.
├── Gruntfile.js
├── LICENSE-MIT
├── README.md
├── lib
│   └── MyCoolProject.js
├── package.json
└── test
    └── MyCoolProject_test.js
```

Это очень мощный инструмент, которому можно найти [немало применений](https://github.com/sapegin/squirrelstrap). Я уже писал о нём [более подробно](http://nano.sapegin.ru/all/sozdanie-faylov-i-struktury-proekta-po-shablonam-s-pomoschyu-gru).

## Собственные задачи

Свои задачи делать довольно просто. Для примера сделаем задачу, которая будет запускать из Гранта консольный оптимизатор веб-графики [imgo](https://github.com/imgo/imgo).

_Стоит рассматривать эту задачу только как пример. Для реальной работы лучше использовать [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)._

### Конфиг

Задача будет принимать список изображений и запускать imgo для каждого файла. Вот так будет выглядеть конфиг. Всего один параметр:

<!-- prettier-ignore -->
```javascript
imgo: {
  images: {
    src: 'images/**'
  }
}
```

### Код задачи

Добавить задачу можно двумя функциями:

- grunt.registerMultiTask — задача с подзадачами, как concat, uglify и как описано в разделе «Задачи, подзадачи, параметры» выше. Нам нужна именно такая.
- grunt.registerTask — используется для задач-ссылок (как default и debug выше) или задач, где несколько наборов входных данных не имеют смысла.

```javascript
// Добавляем задачу imgo
grunt.registerMultiTask(
  'imgo',
  'Optimize images using imgo',
  function() {
    // Говорит о том, что вся задача асинхронная
    var done = this.async();

    // Обрабатываем каждый файл (тоже асинхронно, потому что spawn() асинхронный).
    // В this.filesSrc находится список файлов текущей подзадачи с уже развёрнутыми масками.
    // (Другие параметры были бы в this.data.)
    grunt.util.async.forEach(
      this.filesSrc,
      function(file, next) {
        // Создаём процесс imgo, передаём ему имя текущего файла
        grunt.util.spawn(
          {
            cmd: 'imgo',
            args: [file]
          },
          next
        );
      },
      done
    );
  }
);
```

Задача должна быть асинхронной, потому что мы будем вызвать внешнюю программу, а в Node это асинхронная операция. `this.async()` возвращает функцию, которую необходимо вызвать, когда, все файлы будут обработаны.

Сам цикл по исходным файлам тоже асинхронный. Для этого используется метод forEach из модуля [async](https://github.com/caolan/async).

### Хранение и использование

Задачи можно класть прямо в грантфайл, а можно в отдельные файлы или публиковать в npm (если ваша задача может быть полезна и другим людям).

Первый способ самый простой. Для этого надо разместить код задачи где-нибудь перед `grunt.registerTask('default', […])`.

Во втором случае нужно создать для задач отдельную папку и поместить код задачи в такую же обёртку, как и у грантфайла:

```javascript
module.exports = function(grunt) {
  grunt.registerMultiTask(
    'imgo',
    'Optimize images using imgo',
    function() {
      /* ... */
    }
  );
};
```

А в грантфайле написать:

```javascript
grunt.loadTasks('tasks'); // Загружает все задачи из папки tasks
```

Если будете делать свои задачи, обязательно посмотрите [документацию API](http://gruntjs.com/api/grunt) — в Гранте уже есть множество полезных функций.

## Ссылки

- [Код примеров к статье](https://github.com/sapegin/grunt-article-examples)

- Плагины из коллекции contrib (поддерживаются разработчиками Гранта):

  - [concat](https://github.com/gruntjs/grunt-contrib-concat) — склеивание файлов;
  - [uglify](https://github.com/gruntjs/grunt-contrib-uglify) — минификация JS (UglifyJS);
  - [jshint](https://github.com/gruntjs/grunt-contrib-jshint) — проверка JS (JSHint);
  - [watch](https://github.com/gruntjs/grunt-contrib-watch) — отслеживание изменений в файлах;
  - [connect](https://github.com/gruntjs/grunt-contrib-connect) — простой веб-сервер для статики;
  - [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) — оптимизация картинок;
  - CSS-препроцессоры: [sass](https://github.com/gruntjs/grunt-contrib-sass), [less](https://github.com/gruntjs/grunt-contrib-less), [stylus](https://github.com/gruntjs/grunt-contrib-stylus);
  - тестовые фреймворки: [qunit](https://github.com/gruntjs/grunt-contrib-qunit), [jasmine](https://github.com/gruntjs/grunt-contrib-jasmine);

- Ещё полезные плагины:

  - [exec](https://github.com/jharding/grunt-exec) — запуск исполняемых файлов;
  - [csso](https://github.com/t32k/grunt-csso) — оптимизация CSS;
  - [remove-logging](https://github.com/ehynds/grunt-remove-logging) — удаляет из JS вызовы console.log();
  - [string-replace](https://github.com/eruizdechavez/grunt-string-replace) — замена строк в файлах;

- Мои плагины:

  - [webfont](https://github.com/sapegin/grunt-webfont) — сборка веб-шрифта из набора SVG-файлов;
  - [bower-concat](https://github.com/sapegin/grunt-bower-concat) — автоматическая склейка Bower-компонентов;
  - [fingerprint](https://github.com/sapegin/grunt-fingerprint) — версии (для сброса кэша) статических файлов;
  - [shower-markdown](https://github.com/sapegin/grunt-shower-markdown) — генератор презентаций Shower из Markdown;

- [Сайт Grunt, документация, плагины](http://gruntjs.com/)

- [Getting Started With Grunt](http://gruntjs.com/getting-started)

- [Upgrading from 0.3 to 0.4](https://github.com/gruntjs/grunt/wiki/upgrading-from-0.3-to-0.4)

- [Грантфайл jQuery](https://github.com/jquery/jquery/blob/master/Gruntfile.js) (весьма продвинутый)

- [Подборка шаблонов grunt-init](https://github.com/sapegin/squirrelstrap)

- [Создание файлов и структуры проекта по шаблонам с помощью Grunt](http://nano.sapegin.ru/all/sozdanie-faylov-i-struktury-proekta-po-shablonam-s-pomoschyu-gru)
