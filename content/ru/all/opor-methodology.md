---
layout: Post
lang: ru
title: 'Микрометодология вёрстки OPOR'
date: 2012-11-27
disqus_identifier: opor-methodology
tags:
  - html
---

Суть <del>недо</del>методологии в том, что все правила и рекомендации настолько просты, что умещаются на одной странице. Поэтому она называется OPOR (One Page of Rules). Совмещает лучшие черты БЭМа, SMACSS, OOCSS. Не религиозна. Подходит для небольших проектов.

## Именование классов основных блоков

Почти как в БЭМе: блоки (`.block`), элементы (`.block__elem`), модификаторы (`.block_mod`). Но модификаторы не в формате \_property_value, а просто \_something.

## Использование каскада

Возможно в следующих случаях:

- Для задания контекста. Например, блок по-разному выглядит на тёмном и светлом фоне — это можно сделать как модификатором, так и каскадом (задавая класс-контекст body или родительскому блоку).

<!-- prettier-ignore -->
```css
.logo {
  color:saddlebrown;
  }
.page_about .logo {
  color:ghostwhite;
  }
```

- Для семантических тегов в пользовательском контенте (статьи, комментарии).

<!-- prettier-ignore -->
```css
.text ul {}
.text p {}
```

- (Иногда) когда есть уверенность, что в блок не будет вложен другой блок с таким же тегом.

```html
.social-button i {}
<div class="social-button"><i></i></div>
```

## Примеси

Что-то вроде OOCSS. Наделяют блоки или элементы какими-то свойствами или оформлением. Примеси можно добавлять как в HTML, там и с помощью CSS-препроцессора.

```css
.scrollable
a.fake
```

## Состояния

В отличии от модификаторов, могут применяться к любым блокам. Это особенно удобно в скриптах.

```css
.is-expanded
.is-visible
.is-highlighted
```

## JS-хуки

Поиск элементов из скриптов должен осуществляться только по таким классам, а не по вёрсточным.

```css
.js-files
.js-select
```

## Обёртки

Не несут никакой семантики, используются для оформления.

```css
.header
  .header-i
```

## Замечания

1. Классы перечисляются в таком порядке: блоки, примеси, JS-хуки, состояния:

```html
<div class="upload-files scrollable js-files is-hidden"></div>
```

## Другие методологии

- [БЭМ](https://ru.bem.info/)
- [SMACSS](https://smacss.com/)
- [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
- [MCSS](https://github.com/operatino/MCSS)

## Полезные ссылки

- [About HTML semantics and frontend architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
- [Code smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/) ([перевод](http://www.beskrovnyy.com/verstka/kogda-css-kod-s-dushkom/))
- [Pragmatic, practical font sizing in CSS](https://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/)
- [Single-direction margin declarations](https://csswizardry.com/2012/06/single-direction-margin-declarations/)
- [The media object saves hundreds of lines of code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
- [Мой Stylus-бутстрап — основа для всех проектов](https://github.com/tamiadev/tamia)
