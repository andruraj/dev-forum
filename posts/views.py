from django.shortcuts import render, redirect
from .models import Post
from . import forms
from django.contrib.auth.decorators import login_required

# Create your views here.
def posts(request):
    post = Post.objects.all().order_by('date')
    return render(request, 'posts/posts.html', {'posts':post})

def details(request, slug):
    details = Post.objects.get(id=slug)
    return render(request, 'posts/details.html', {'details': details})

@login_required(login_url='/accounts/login/')
def create(request):
    if request.method == 'POST':
        form = forms.CreatePost(request.POST)
        if form.is_valid():
            #save post to db
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return redirect('posts:posts')
    else:
        form = forms.CreatePost()
    return render(request, 'posts/create.html', {'form':form})