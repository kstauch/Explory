from django.shortcuts import render

def homepage(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'challenge.html')

from django.http import JsonResponse

def test_api(request):
    return JsonResponse({"message": "Backend is working"})
