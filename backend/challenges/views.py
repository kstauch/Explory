from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Challenges, UserChallenges
from datetime import date

#finds all the users challenges today which should be just 1 and returns
# its id, title, description, and completion status
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_todays_challenge(request):
    today = date.today()
    challenges = UserChallenges.objects.filter(user_id=request.user.id, date=today)
    data = []
    for userc in challenges:
        data.append({
            'id': userc.challenge.id,
            'title': userc.challenge.title,
            'description': userc.challenge.description,
            'completed': userc.completed})
    return Response({'challengeslist': data}, status=status.HTTP_200_OK)
