from django.db import models
from django.conf import settings
# Create your models here.

class Challenges(models.Model):
    title = models.CharField(max_length=100)
    points = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Challenges"

class UserChallenges(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenges, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username}: {self.challenge.title}"
    class Meta:
        verbose_name_plural = "User Challenges"