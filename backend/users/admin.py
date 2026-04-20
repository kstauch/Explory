from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Friendship
from challenges.models import Challenges, UserChallenges
from .serializers import FriendshipSerializer


class CustomUserAdmin(UserAdmin):
    # adds the custom fields to the "User Info" section in the admin edit page
    fieldsets = UserAdmin.fieldsets + (
        ('Explory Stats', {'fields': ('total_points', 'streak_count', 'interests', 'profile_picture')}),
    )
    list_display = ['username', 'email', 'total_points', 'streak_count', 'is_staff']

#adds user, challenge, completion status, and date as fields that we can edit as an admin
class ChallengesAdmin(admin.ModelAdmin):
    list_display = ['user', 'challenge', 'completed', 'date']

#adds all of the models into Django's admin page
admin.site.register(User, CustomUserAdmin)
admin.site.register(Challenges)
admin.site.register(UserChallenges, ChallengesAdmin)
admin.site.register(Friendship)