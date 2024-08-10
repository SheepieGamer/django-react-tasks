# taskmanager/views.py
from rest_framework import generics
from tasks.models import Task
from tasks.serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
