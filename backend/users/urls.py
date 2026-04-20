from django.urls import path
from django.contrib import admin
from . import views

app_name = 'users'
urlpatterns = [
    path('register/', views.register_view, name = 'register'),

    path('api/random-challenge/', views.random_challenge),
    path('api/reroll/', views.reroll_challenge, name='reroll'),
    path('api/log-challenge/', views.log_challenge),

    path('api/user-preference/', views.update_interests),

    path('api/friends/request/send/', views.send_friend_request, name='send_friend_request'),
    path('api/friends/request/accept/', views.accept_friend_request, name='accept_friend_request'),
    path('api/friends/request/reject/<int:friendship_id>/', views.reject_friend_request, name='reject_friend_request'),
    path('api/friends/requests/pending/', views.get_pending_friend_requests, name='pending_requests'),
    path('api/friends/list/', views.get_friends_list, name='friends_list'),
    path('api/friends/remove/<int:friend_id>/', views.remove_friend, name='remove_friend'),
    path('api/leaderboard/friends/', views.get_friends_leaderboard, name='friends_leaderboard'),
    path('api/leaderboard/global/', views.get_global_leaderboard, name='global_leaderboard'),
    path('api/upload-challenge/', views.upload_photo, name='upload_photo'),
    path('api/complete-challenge/', views.complete_challenge, name='complete_challenge'),

    path('api/profile/', views.profile, name='profile'),
]