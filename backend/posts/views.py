from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from challenges.models import Challenges, UserChallenges


# Create your views here.

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def make_post(request):
    print(request.data)
    image = request.FILES.get('image')
    title = request.data.get('title')
    challenge_id = request.data.get('challenge')
    body = request.data.get('body')

    try:
        user_challenge = UserChallenges.objects.get(user=request.user, challenge_id=challenge_id)
        post = Post.objects.create(
            user = request.user,
            title=title,
            challenge=user_challenge,
            body=body,image=image)
        return Response ({'success':True, 'post_id':post.id}, status=201)
    except UserChallenges.DoesNotExist:
        return Response ({'success':False}, status=400)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_posts(request):
    posts = Post.objects.all().order_by('-date')
    data = [{
        'id': post.id,
        'title': post.title,
        'user': post.user.username,
        'challenge': post.challenge.title,
        'body': post.body,
        'image': post.image.url if post.image else None,
    }
    for post in posts
    ]
    return Response({'success':True, 'data':data}, status=200)
