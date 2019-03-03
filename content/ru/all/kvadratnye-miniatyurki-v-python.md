---
layout: Post
lang: ru
title: 'Квадратные миниатюрки в Python'
date: 2011-01-13
disqus_identifier: kvadratnye-miniatyurki-v-python
tags:
  - python
---

Иногда вера в светлое будущее человечества и в то, что всё уже придумано и сделано до нас, не даёт остановится на первом найденном решении, и заставляет гуглить и пробовать дальше.

Вчера мне понадобилось сделать в Питоне квадратные миниатюры. Сначала я искал решение влоб (так и писал в Гугле: «pil python square crop»). [Первым](http://javiergodinez.blogspot.com/2008/03/square-thumbnail-with-python-image.html) нашлось такое:

```python
from PIL import Image

THUMB_SIZE = 150, 150
img = Image.open('image.jpg')

width, height = img.size
if width > height:
  delta = width - height
  left = int(delta/2)
  upper = 0
  right = height + left
  lower = height
else:
  delta = height - width
  left = 0
  upper = int(delta/2)
  right = width
  lower = width + upper
img = img.crop((left, upper, right, lower))
img.thumbnail(THUMB_SIZE, Image.ANTIALIAS)

img.save('thumb.jpg')
```

Но я сразу не поверил, что для такой очевидной и частой задачи нет более простого решения. И стал гуглить дальше. Следующим нашёл решение чуть короче (без условия), но оно не заработало. Тогда я изменил подход и стал искать, что полезного может предложить мне [PIL](http://www.pythonware.com/products/pil/). Попробовал найти «кроп из центра» (чтобы не вычислять координаты прямоугольника), такого не оказалось. Однако, довольно быстро я попал в нужное место и заменил вышеприведённый код одним простым заклинанием:

```python
from PIL import Image, ImageOps

THUMB_SIZE = 150, 150
img = Image.open('image.jpg')

img = ImageOps.fit(img, THUMB_SIZE, Image.ANTIALIAS)

img.save('thumb.jpg')
```
