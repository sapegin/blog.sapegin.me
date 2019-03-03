---
layout: Post
lang: ru
title: 'Тестирование моделей с FileField/ImageField в Django'
date: 2011-07-13
disqus_identifier: 354 http://nano.sapegin.ru/?p=354
tags:
  - django
  - python
---

Оказалось, что тестирование моделей с файлом (поле FileField) или картинкой (поле ImageField) в Django не так уж очевидно. Допустим, у нас есть модель:

```python
class MagicPony(models.Model):
  photo = models.ImageField(_('Photo'), upload_to='uploads/ponies')
```

При загрузке файла через HTML-форму проблем не возникает, но, чтобы загрузить изображение с диска, нужно дополнительно обернуть наш файл в объект [File](https://docs.djangoproject.com/en/dev/ref/files/file/):

```python
from django.core.files import File

class PonyTest(TestCase):
  def test_magic_power(self):
    file = open('pony.jpg', 'rb')
    file = File(file)
    pony = MagicPony.objects.create(photo=file)

    # Теперь можно писать любые проверки (наличие магической силы,
    # количество копыт и т. п.)
```
