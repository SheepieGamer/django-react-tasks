from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Task

class TaskTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.task = Task.objects.create(title='Test Task', description='Test Description')

    def test_task_list(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_task_creation(self):
        response = self.client.post('/api/tasks/', {'title': 'New Task', 'description': 'New Description'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_task_update(self):
        response = self.client.put(f'/api/tasks/{self.task.id}/', {'title': 'Updated Task', 'description': 'Updated Description'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, 'Updated Task')

    def test_task_delete(self):
        response = self.client.delete(f'/api/tasks/{self.task.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
