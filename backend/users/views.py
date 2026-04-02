import json
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from rest_framework.views import APIView

from challenges.models import Challenges
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
def register_view(request):
    form = UserCreationForm()
    return render(request, "users/register.html",
                  {"form": form})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def random_challenge(request):
    user_interest = request.user.interests
    if user_interest:
        challenge = Challenges.objects.filter(category__in = user_interest).order_by('?').first()
    else:
        challenge = Challenges.objects.order_by('?').first()

    if challenge is None:
        return JsonResponse({'error: no categories to choose from for this user'}, status = 404)

    return JsonResponse({"daily_challenge": challenge.title})

@api_view(['POST', 'GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_interests(request):
    if request.method == 'GET':
        return JsonResponse({'interests': request.user.interests})
    request.user.interests = request.data.get('interests', [])
    request.user.save()
    return JsonResponse({'success': True})