from django.db import models
from django.contrib.auth.models import AbstractUser

# user structure - each member of class is a field in database table
class User(AbstractUser): # inherits username, email, password from AbstractUser class
    # points from challenges; used for ranking
    total_points = models.PositiveIntegerField(default=0)

    # activity completion streak (in days)
    streak_count = models.PositiveIntegerField(default=0)
    last_completion_date = models.DateField(null=True, blank=True) # stores the last date a challenge was completed to calculate streaks

    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    # stores interests/categories from the personality quiz
    # uses a JSONField to store a list of strings
    interests = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.username


class Challenges(models.Model):
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title