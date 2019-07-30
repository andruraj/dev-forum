from django.conf.urls import url
from . import views

app_name = 'posts'

urlpatterns = [
    url(r'^$', views.posts, name='posts'),
    url(r'^create/$', views.create, name='create'),
    url(r'^delete/(?P<id>[\w-]+)/$', views.delete, name='delete'),
    url(r'^(?P<slug>[\w-]+)/$', views.details, name='details'),
]