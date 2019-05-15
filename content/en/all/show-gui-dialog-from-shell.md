---
layout: Post
lang: en
title: 'How to show GUI dialog window from shell script on a Mac'
date: 2014-11-12
tags:
  - tools
  - shell
  - mac
---

When you run a shell script from a GUI app (from Alfred workflow, for example) you want to show an error and ask questions via GUI too. You can do it [with AppleScript](https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-SW12).

Show error message:

```bash
#!/usr/bin/env bash

# error "Message"
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

![AppleScript error message](/images/mac__shell_dialog_error.png)

(You can use `note` or `stop` instead of `caution` to show a different icon.)

Ask question:

```bash
#!/usr/bin/env bash

# prompt "Question" "Default value"
function prompt() {
  osascript <<EOT
    tell app "System Events"
      text returned of (display dialog "$1" default answer "$2" buttons {"OK"} default button 1 with title "$(basename $0)")
    end tell
EOT
}

value="$(prompt 'Enter:' '42')"
```

![AppleScript prompt](/images/mac__shell_dialog_prompt.png)

Or you can download [dlg-error](https://github.com/sapegin/dotfiles/blob/master/bin/dlg-error) and [dlg-prompt](https://github.com/sapegin/dotfiles/blob/master/bin/dlg-prompt) and put them somewhere in `$PATH`:

```bash
#!/usr/bin/env bash

dlg-error "Not enough cheese!"
value="$(dlg-prompt 'Enter:' '42')"
```

P. S. You can show notifications in the Notification Center using [terminal-notifier](https://github.com/julienXX/terminal-notifier).
