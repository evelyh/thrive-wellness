from django import forms
from .models import Image


# class ImageForm(forms.ModelForm):
#     """Form for the image model"""
#     class Meta:
#         model = Image
#         fields = ('title', 'image')


class ImageForm(forms.Form):
   name = forms.CharField(max_length = 100)
   picture = forms.ImageField()