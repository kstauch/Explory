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

    # uses a JSONField to store a list of strings
    interests = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.username
    class Meta:
        verbose_name_plural = "Users"

# Friend Relationship Object - can be Pending/Accepted (will be deleted if req. is denied)
class Friendship(models.Model):
    sender = models.ForeignKey(User, related_name='sent_requests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_requests', on_delete=models.CASCADE)

    is_accepted = models.BooleanField(default=False) # false: pending, true: accepted
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # prevents duplicate requests between the same two people
        constraints = [
            models.UniqueConstraint(
                fields=['sender', 'receiver'],
                name='unique_friendship'
            )
        ]

    def __str__(self):
        return f"{self.sender.username} -> {self.receiver.username} ({self.status})"