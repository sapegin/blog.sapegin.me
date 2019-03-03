---
layout: Post
lang: ru
title: 'Автоматизация запуска тестов с помощью Travis CI'
date: 2013-04-19
disqus_identifier: travis-ci
tags:
  - tools
---

Наверняка, вы уже не раз встречали на Гитхабе вот такую зелёную кнопку:

![Travis CI](/images/travis-button.png)

Это [Travis CI](https://travis-ci.org/) — бесплатный сервис [непрерывной интеграции](https://ru.wikipedia.org/wiki/%D0%9D%D0%B5%D0%BF%D1%80%D0%B5%D1%80%D1%8B%D0%B2%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D1%8F) для Гитхаба. При каждом изменении репозитория Трэвис прогоняет все тесты проекта. И если что-то пошло не так (например, забыли закоммитить файл), вы сразу же получаете письмо.

Для подключения Трэвиса нужно сделать три вещи:

1. Авторизоваться на [сайте Трэвиса](https://travis-ci.org/) с помощью OAuth Гитхаба.
2. Добавить Git-хук.
3. Добавить в проект файл конфигурации: .travis.yml.

## Git-хук

Просто «поверните» переключатель напротив вашего проекта в [профиле Трэвиса](https://travis-ci.org/profile). Трэвис сам добавит нужный хук в репозиторий на Гитхабе.

## Конфигурация

Трэвис поддерживает [множество языков](https://docs.travis-ci.com/user/ci-environment/). Я покажу, как работать с Node. Остальные языки вы найдёте в [документации](https://docs.travis-ci.com/).

Простейший файл .travis.yml выглядит примерно так:

```yaml
language: node_js
node_js:
  - '0.8'
  - '0.10'
```

При каждом изменении репозитория Трэвис сделает следующее (отдельно для Node 0.8 и 0.10):

1. склонирует репозиторий;
2. установит зависимости (npm install);
3. запустит тесты (npm test).

Команды в шагах 2 и 3 зависят от указанного выбранного языка.

<!--more-->

Но это совсем простой случай. Часто у проекта есть более сложные зависимости, которые нужно устанавливать вручную. Это делается с помощью [скриптов](https://docs.travis-ci.com/user/build-configuration/).

Например, тестирование [плагина для Гранта](https://github.com/gruntjs/grunt-contrib-stylus/blob/master/.travis.yml):

```yaml
language: node_js
node_js:
  - '0.8'
  - '0.10'
before_script:
  - npm install -g grunt-cli
```

Скрипт before_script будет запускаться между шагами 2 и 3. Команды можно писать прямо в .travis.yml (как в примере), а можно указать внешний файл.

Пример [посложнее](https://github.com/sapegin/grunt-webfont/blob/master/.travis.yml):

```yaml
language: node_js
node_js:
  - '0.8'
  - '0.10'
before_script:
  - sudo apt-get install fontforge eot-utils
  - wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip
  - unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/ && cd ..
  - npm install -g grunt-cli
```

Тут устанавливается fontforge и другие утилиты, необходимые для генерации веб-шрифтов. Обратите внимание на первую команду скрипта — Трэвис создаёт для каждого прогона тестов виртуальную машину, к которой у вас есть безпарольный рут-доступ.

В документации описано ещё [больше параметров](https://docs.travis-ci.com/user/build-configuration/) (и остальные скрипты). А для проверки конфигурации можно использовать [travis-lint](https://github.com/travis-ci/travis-lint).

## One more thing

Трэвис позволяет тестировать не только основной репозиторий проекта, но и все пулреквесты:

![Travis CI Pull Request](/images/travis-pr.png)

Так вы сразу будете видеть, кто поленился запустить и обновить тесты перед отправкой пулреквеста.
