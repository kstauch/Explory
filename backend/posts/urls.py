from django.urls import path
from . import views
from .views import make_post, get_posts, get_my_posts

app_name = 'posts'
urlpatterns = [
    path('api/create/', make_post),
    path('api/list/', get_posts),
    path('api/my-posts/', get_my_posts),
]