from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from challenges.models import Challenges, UserChallenges



#if you're logged, grab image, title, challenge_id, and body
#then filters through all the user challenges until they find the one that
#matches the other one's challenge_id and then creates a post with
#all the data
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def make_post(request):
    print(request.data)
    image_url = request.data.get('image')
    title = request.data.get('title')
    challenge_id = request.data.get('challenge')
    body = request.data.get('body')

    try:
        user_challenge = UserChallenges.objects.filter(user=request.user, challenge_id=challenge_id).last()
        post = Post.objects.create(
            user = request.user,
            title=title,
            challenge=user_challenge,
            body=body,
            image=image_url)
        return Response ({'success':True, 'post_id':post.id}, status=201)
    except UserChallenges.DoesNotExist:
        return Response ({'success':False}, status=400)

#gets all the posts by date converts them into JSON and then returns each post
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
        'image': post.image if post.image else None,
    }
    for post in posts
    ]
    return Response({'success':True, 'data':data}, status=200)
