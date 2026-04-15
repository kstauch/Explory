from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post

# Create your views here.

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def make_post(request):
    image = request.FILES['image']
    title = request.data.get('title')
    challenge = request.data.get('challenge.title')
    body = request.data.get('body')

    post = Post.objects.create(
        user = request.user,
        title=title,
        challenge=challenge,
        body=body,image=image)
    return Response ({'success':True, 'post_id':post.id}, status=201)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_posts(request):
    posts = Post.objects.all().order_by('-date')
    data = {
        'id': Post.id,
        'title': Post.title,
        'user': Post.user.username,
        'challenge': Post.challenge.title,
        'body': Post.body,
        'image': Post.image,
    }

    return Response({'success':True, 'data':data}, status=200)
