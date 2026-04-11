from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from challenges.models import Challenges, UserChallenges


class CustomUserAdmin(UserAdmin):
    # adds the custom fields to the "User Info" section in the admin edit page
    fieldsets = UserAdmin.fieldsets + (
        ('Explory Stats', {'fields': ('total_points', 'streak_count', 'interests', 'profile_picture')}),
    )
    list_display = ['username', 'email', 'total_points', 'streak_count', 'is_staff']

class ChallengesAdmin(admin.ModelAdmin):
    list_display = ['user', 'challenge', 'completed', 'date']


admin.site.register(User, CustomUserAdmin)
admin.site.register(Challenges)
admin.site.register(UserChallenges, ChallengesAdmin)