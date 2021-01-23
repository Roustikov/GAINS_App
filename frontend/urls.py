from django.urls import path
from django.shortcuts import redirect
from . import views


urlpatterns = [
    path('', views.index ),
    path('tasks/<int:id>/', views.index),
]