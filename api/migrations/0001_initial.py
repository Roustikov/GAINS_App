# Generated by Django 3.1.4 on 2020-12-29 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=300)),
                ('state', models.CharField(blank=True, choices=[('ToDo', 'Todo'), ('Done', 'Done'), ('InProgress', 'Inprogress'), ('Review', 'Review')], max_length=10)),
                ('description', models.CharField(blank=True, max_length=10000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('start_date', models.DateField(blank=True)),
                ('end_date', models.DateField(blank=True)),
                ('duration', models.DecimalField(blank=True, decimal_places=2, max_digits=10)),
                ('progress', models.DecimalField(blank=True, decimal_places=2, max_digits=10)),
                ('predecessor', models.CharField(blank=True, max_length=100)),
                ('assignee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.user')),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.task')),
            ],
        ),
    ]