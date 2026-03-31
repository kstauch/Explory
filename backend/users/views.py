from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from challenges.models import Challenges
from django.http import JsonResponse
# Create your views here.
def register_view(request):
    form = UserCreationForm()
    return render(request, "users/register.html",
                  {"form": form})

def random_challenge(request):
    challenge = Challenges.objects.order_by('?').first()
    my_challenge = {
        "daily_challenge": challenge.title
    }

    return JsonResponse(my_challenge)