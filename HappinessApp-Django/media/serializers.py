from rest_framework import serializers
from .models import Media

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'name', 'image']