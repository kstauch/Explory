from django.urls import path
from . import views

urlpatterns = [
    path('api/todays-challenge/', views.get_todays_challenge),
]