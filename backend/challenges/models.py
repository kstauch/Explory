import uuid
from django.db import models
from django.conf import settings

# All Challenges take in a title, description, points, and category.
# This is a pool of all challenges that a user could potentially have
class Challenges(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    points = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Challenges"

# UserChallenges are all the challenges that are tied to a certain user
# it takes in user, challenge, whether its completed, when they got the challenge, and how many points
# its worth
class UserChallenges(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenges, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}: {self.challenge.title}"
    class Meta:
        verbose_name_plural = "User Challenges"
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'challenge', 'date'],
                name="unique_user_challenge_per_day",
            )
        ]