from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    TaskState = models.TextChoices('TaskState', 'ToDo Done InProgress Review')
    state = models.CharField(blank=True, choices=TaskState.choices, max_length=10)
    description = models.CharField(max_length=10000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    duration = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    progress = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    predecessor = models.CharField(max_length=100, blank=True)
    parent_id = models.ForeignKey('Task', on_delete=models.CASCADE, null=True, blank=True)
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    def __str__(self):
        return str(self.id) + ' - ' + self.name

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return str(self.id) + ' - ' + self.name
