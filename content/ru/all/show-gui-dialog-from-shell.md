---
layout: Post
lang: ru
title: 'Как показать графический диалог из шелл-скрипта на маке'
date: 2014-11-12
tags:
  - tools
---

Если вы запускаете шелл-скрипт из графической среды (например, из форкфлоу Альфреда), то сообщать пользователю об ошибках и задавать ему вопросы удобно с помощью графических диалогов. Поможет в этом [Эплскрипт](https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-SW12).

Показываем сообщение об ошибке:

```bash
#!/usr/bin/env bash

# error "Сообщение"
function error() {
  osascript <<EOT
    tell app "System Events"
      display dialog "$1" buttons {"OK"} default button 1 with icon caution with title "$(basename $0)"
      return  -- Suppress result
    end tell
EOT
}

error "Not enough cheese!"
```

![Сообщение об ошибке на AppleScript](/images/mac__shell_dialog_error.png)

(Кроме `caution` можно использовать иконки `note` и `stop`.)

Спрашиваем что-нибудь:

```bash
#!/usr/bin/env bash

# prompt "Вопрос" "Ответ по умолчанию"
function prompt() {
  osascript <<EOT
    tell app "System Events"
      text returned of (display dialog "$1" default answer "$2" buttons {"OK"} default button 1 with title "$(basename $0)")
    end tell
EOT
}

value="$(prompt 'Enter:' '42')"
```

![Запрос пользователю на AppleScript](/images/mac__shell_dialog_prompt.png)

Или просто скачайте [dlg-error](https://github.com/sapegin/dotfiles/blob/master/bin/dlg-error) и [dlg-prompt](https://github.com/sapegin/dotfiles/blob/master/bin/dlg-prompt), и положите их куда-нибудь в `$PATH`.

```bash
#!/usr/bin/env bash

dlg-error "Not enough cheese!"
value="$(dlg-prompt 'Enter:' '42')"
```

P. S. Показать уведомление в Центре уведомлений можно с помощью [terminal-notifier](https://github.com/julienXX/terminal-notifier).
