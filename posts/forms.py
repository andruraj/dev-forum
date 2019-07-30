from django import forms
from . import models

class CreatePost(forms.ModelForm):
    class Meta:
        model = models.Post
        fields = [
            'title',
            'lang',
            'body',
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})
        self.fields['lang'].widget.attrs.update({'class':'form-control'})
        self.fields['body'].widget.attrs.update({'class':'form-control'})