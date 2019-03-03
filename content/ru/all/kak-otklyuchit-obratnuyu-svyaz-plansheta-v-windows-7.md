---
layout: Post
lang: ru
title: 'Как отключить обратную связь планшета в Windows 7'
date: 2010-05-15
disqus_identifier: 193 http://nano.sapegin.ru/?p=193
tags:
  - windows
---

В Windows 7 при использовании планшета есть совершенно дурацкая обратная связь. При клике появляется анимация, похожая на круги на воде:

![Обратная связь планшета в Windows 7](/images/pen_feedback.png)

<small>Изображение [отсюда](https://blogs.msdn.microsoft.com/saveenr/2010/01/06/configuring-windows-7-and-your-pressure-sensitive-tablet-to-avoid-cursor-ring-animations-a-k-a-dynamic-feedback/).</small>

Кроме этого появляются подсказки при нажатии клавиш-модификаторов (Shift, Alt и т. п.). Отключить это можно так:

1. Открыть **Local Group Policy Editor** (выполнить gpedit.msc).
2. Последовательно открывать разделы **User Configuration** — **Administrative Templates** — **Windows Components** — **Tablet PC** — **Cursor**.
3. Открыть свойство **Turn off pen feedback** и включить его (Enabled).

Если не понятно, что делать, всё то же самое [в картинках](https://blogs.msdn.microsoft.com/saveenr/2010/01/06/configuring-windows-7-and-your-pressure-sensitive-tablet-to-avoid-cursor-ring-animations-a-k-a-dynamic-feedback/) (но на английском).
