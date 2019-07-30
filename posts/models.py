from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)

    languages = [
        ('Python', 'python'),
        ('JAVA', 'java'),
        ('.NET', '.net'),
        ('C', 'c'),
        ('C++', 'c++'),
        ('HTML', 'html'),
        ('CSS', 'css'),
    ]

    lang = models.TextField(choices=languages, default=None)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)


    def __str__(self):
        return self.title

    def snippet(self):
        return self.body[:330]+'...'