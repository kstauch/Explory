from django.db import models
from django.conf import settings
from challenges.models import UserChallenges, Challenges

#makes it so posts take in a user, title, challenge, image, body, and date
class Post(models.Model):
    title = models.CharField(max_length=75)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(UserChallenges, on_delete=models.CASCADE, null=True, blank=True)
    image = models.URLField(max_length=500, blank=True, null=True)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title