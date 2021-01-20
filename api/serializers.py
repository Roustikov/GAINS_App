from rest_framework import serializers
from .models import Task, User, Project

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'created_at')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'description', 'state', 'created_at', 'assignee', 'parent_id', 'start_date', 'end_date', 'duration', 'progress', 'predecessor', 'project_id')

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.state = validated_data.get('state', instance.state)
        instance.assignee = validated_data.get('assignee', instance.assignee)
        instance.parent_id = validated_data.get('parent_id', instance.parent_id)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.progress = validated_data.get('progress', instance.progress)
        instance.predecessor = validated_data.get('predecessor', instance.predecessor)
        instance.project_id = validated_data.get('project_id', instance.project_id)

        instance.save()
        return instance

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'start_date', 'end_date', 'created_at', 'created_by')
