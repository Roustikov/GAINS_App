from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from . import views

urlpatterns = [
    path('api/tasks/', views.TaskList.as_view()),
    path('api/task/<int:pk>/', views.TaskDetail.as_view()),
    path('api/users/', views.UserList.as_view()),
    path('api/user/<int:pk>/', views.UserDetail.as_view()),
    path('api/projects/', views.ProjectList.as_view()),
    path('api/project/<int:pk>/', views.ProjectDetail.as_view()),
]