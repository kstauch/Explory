from django.urls import path
from . import views

app_name = 'posts'
urlpatterns = [
    path('',views.make_post, name = 'make_post'),
    path('<slug:slug>', views.make_post, name = 'page'),
]