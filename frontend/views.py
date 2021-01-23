from django.shortcuts import render


def index(request, id=1):
    return render(request, 'frontend/index.html')