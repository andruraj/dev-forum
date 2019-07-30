from django.shortcuts import render
from .models import Post
# Create your views here.
def posts(request):
    post = Post.objects.all().order_by('date')
    return render(request, 'posts/posts.html', {'posts':post})

def details(request, slug):
    details = Post.objects.get(id=slug)
    return render(request, 'posts/details.html', {'details': details})