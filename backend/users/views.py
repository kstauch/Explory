from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from challenges.models import Challenges, UserChallenges
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import User, Friendship
from django.shortcuts import get_object_or_404
from .serializers import FriendshipSerializer, UserSerializer, PostSerializer
from django.db.models import Q
from datetime import date, timedelta
from posts.models import Post


def register_view(request):
    form = UserCreationForm()
    return render(request, "users/register.html",
                  {"form": form})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_streaks_leaderboard(request):
    all_users = User.objects.all().order_by('-streak_count')
    leaderboard_data = UserSerializer(all_users, many=True)
    return Response(leaderboard_data.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def random_challenge(request):
    user_interest = request.user.interests
    today = date.today()
    # Check if they already rolled a challenge today
    existing_today = UserChallenges.objects.filter(user=request.user, date=today).first()
    if existing_today:
        return JsonResponse({
            "daily_challenge": existing_today.challenge.title,
            "description": existing_today.challenge.description
        })
    # Otherwise, roll a new one
    if user_interest:
        challenge = Challenges.objects.filter(category__in=user_interest).order_by('?').first()
        if not challenge:
            challenge = Challenges.objects.order_by('?').first()
    else:
        challenge = Challenges.objects.order_by('?').first()
    if challenge is None:
        return JsonResponse({'error': 'No challenges exist in the database yet.'}, status=404)

    return JsonResponse({
        "id": challenge.id,
        "daily_challenge": challenge.title,
        "description": challenge.description
    })

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def reroll_challenge(request):
    user_interest = request.user.interests
    if user_interest:
        challenge = Challenges.objects.filter(category__in=user_interest).order_by('?').first()
        if not challenge:
            challenge = Challenges.objects.order_by('?').first()
    else:
        challenge = Challenges.objects.order_by('?').first()
    if challenge is None:
        return JsonResponse({'error': 'No challenges exist in the database yet.'}, status=404)

    return JsonResponse({
        "daily_challenge": challenge.title,
        "description": challenge.description
    })

#if we are trying to get interests it returns all of the saved user interests
#if not it will make an interests list with [] as its default and save the new interests
#the user has selected
@api_view(['POST', 'GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_interests(request):
    if request.method == 'GET':
        return JsonResponse({'interests': request.user.interests})
    request.user.interests = request.data.get('interests', [])
    request.user.save()
    return JsonResponse({'success': True})

#gets the title of the challenge, then finds what challenge matches the title
#then makes a user challenge with the user, challenge, date, and completion status
#which is default false
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_challenge(request):
    challenge_title = request.data.get('challenge_title')
    print("Received title:", challenge_title)
    print("All challenges:", list(Challenges.objects.values('title')))
    challenge = Challenges.objects.get(title=challenge_title)
    user_challenge, created = (UserChallenges.objects.get_or_create
                               (user=request.user, challenge=challenge,
                                date=date.today(),
                               defaults={'completed': False},
                                ))
    return Response({'success': True}, status=201)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def complete_challenge(request):
    challenge_title = request.data.get('challenge_title')

    # 1. First, find the base challenge from the database
    try:
        challenge = Challenges.objects.get(title=challenge_title)
    except Challenges.DoesNotExist:
        return Response({'error': 'Base challenge does not exist.'}, status=404)

    # 2. Get the user's specific challenge log, or CREATE it if it's missing!
    user_challenge, created = UserChallenges.objects.get_or_create(
        user=request.user,
        challenge=challenge,
        defaults={'completed': False, 'date': date.today()}
    )

    if not created and user_challenge.completed:
        return Response({'error': 'Challenge already completed.'}, status=409)

    # 3. Your original streak logic remains exactly the same
    today = date.today()
    yesterday = today - timedelta(days=1)

    if request.user.last_completion_date == yesterday:
        request.user.streak_count += 1
    elif request.user.last_completion_date == today:
        pass
    else:
        request.user.streak_count = 1

    user_challenge.completed = True
    user_challenge.save()
    request.user.total_points += user_challenge.challenge.points
    request.user.last_completion_date = date.today()
    request.user.save()

    return Response({
        'success': True,
        'streak': request.user.streak_count,
        'total_points': request.user.total_points
    }, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def send_friend_request(request):
    sender = request.user
    receiver_username = request.data.get('receiver_username')
    if not receiver_username:
        return Response({"error": "Receiver username is required."}, status=status.HTTP_400_BAD_REQUEST)
    receiver = get_object_or_404(User, username=receiver_username)

    if sender == receiver:
        return Response({"error": "You cannot send a friend request to yourself."}, status=status.HTTP_400_BAD_REQUEST)

    Friendship.objects.create(sender=sender, receiver=receiver)

    return Response({"success": "Friend request sent!"}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def accept_friend_request(request):
    friendship_id = request.data.get('friendship_id') # make sure React sends JSON with "friendship_id" exactly
    if not friendship_id:
        return Response({"error": "Friendship ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    friendship = get_object_or_404(Friendship, id=friendship_id)

    if friendship.receiver != request.user:
        return Response({"error": "You do not have permission to accept this request."}, status=status.HTTP_403_FORBIDDEN)

    friendship.is_accepted = True
    friendship.save()

    return Response({"success": "Friend request accepted!"}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def reject_friend_request(request, friendship_id):
    friendship = get_object_or_404(Friendship, id=friendship_id)

    if friendship.receiver != request.user:
        return Response({"error": "You do not have permission to reject this request."}, status=status.HTTP_403_FORBIDDEN)

    friendship.delete()

    return Response({"success": "Friend request rejected!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_pending_friend_requests(request):
    pending_requests = Friendship.objects.filter(receiver=request.user, is_accepted=False)
    serializer = FriendshipSerializer(pending_requests, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_friends_list(request):
    # user is (the sender OR the receiver) AND the request is accepted
    friendships = Friendship.objects.filter(Q(sender=request.user) | Q(receiver=request.user), is_accepted=True)

    friends_list = []
    for friendship_obj in friendships:
        if friendship_obj.sender == request.user:
            friends_list.append(friendship_obj.receiver)
        else:
            friends_list.append(friendship_obj.sender)

    friends = UserSerializer(friends_list, many=True)

    return Response(friends.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_friend(request, friend_id):
    friendship = get_object_or_404(
        Friendship,
        (Q(sender=request.user, receiver_id=friend_id) |
         Q(sender_id=friend_id, receiver=request.user)),
        is_accepted=True
    )
    friendship.delete()

    return Response({"success": "Friend removed successfully."}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_friends_leaderboard(request):
    # user is (the sender OR the receiver) AND the request is accepted
    friendships = Friendship.objects.filter(Q(sender=request.user) | Q(receiver=request.user), is_accepted=True)

    leaderboard_users = []
    for friendship_obj in friendships:
        if friendship_obj.sender == request.user:
            leaderboard_users.append(friendship_obj.receiver)
        else:
            leaderboard_users.append(friendship_obj.sender)

    leaderboard_users.append(request.user)
    leaderboard_users.sort(key=lambda user: user.total_points, reverse=True)
    leaderboard_data = UserSerializer(leaderboard_users, many=True)

    return Response(leaderboard_data.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_global_leaderboard(request):
    all_users = User.objects.all().order_by('-total_points')
    leaderboard_data = UserSerializer(all_users, many=True)

    return Response(leaderboard_data.data, status=status.HTTP_200_OK)

#gets the file of the image and saves it as the challenge image
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_photo(request):
    file = request.data.get('challengeimage')
    if not file:
        return Response({"error": "Challenge image not found."}, status=404)
    request.user.challengeimage = file
    request.user.save()
    return Response({"success": True}, status=200)


@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    if request.method == 'POST':
        user = request.user
        user.bio = request.data.get('bio', user.bio)
        profile_pic_url = request.data.get('profile_picture')
        if profile_pic_url:
            user.profile_picture = profile_pic_url
        user.save()
        return Response({'success': True})

#finds all friend relations and then filters by which friend relations includes the user
#after that it makes a list of friend objects that are the users who are not the user in those friend relations
#then it finds posts for each person in our list and orders them by date before turning it into
#a JSON and returning it as data the front end can handle
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_friend_posts(request):
    friendships = Friendship.objects.filter(Q(sender=request.user) | Q(receiver=request.user), is_accepted=True)
    friends_list = []
    for friendship_obj in friendships:
        if friendship_obj.sender == request.user:
            friends_list.append(friendship_obj.receiver)
        else:
            friends_list.append(friendship_obj.sender)

    posts = Post.objects.filter(user__in=friends_list).order_by('-date')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
