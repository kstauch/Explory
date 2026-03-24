from django.db import models

# Create your models here.
# apparently this is supposed to like make it so
# when someone posts smthn it like takes in
# title body slug and then adds a date to it idk
class Post(models.Model):
    title = models.CharField(max_length=75)
    body = models.TextField()
    slug = models.SlugField()
    date = models.DateTimeField(auto_now_add=True)
    banner = models.ImageField(default='fallback.png', blank=True)

    def __str__(self):
        return self.title