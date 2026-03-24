from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.http import JsonResponse
User = get_user_model()

def homepage(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'challenge.html')
def test_api(request):
    return JsonResponse({"message": "Backend is working"})

class UserViewer(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({
            'user' : serializer.data,
            'token': token.key,
        }, status=201)