from django.urls import path
from . import views
from .views import make_post, get_posts

app_name = 'posts'
urlpatterns = [
    path('api/create/', make_post),
    path('api/list/', get_posts)
]