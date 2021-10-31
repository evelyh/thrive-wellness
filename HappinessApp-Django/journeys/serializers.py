from rest_framework import serializers
from .models import Journey, Quest


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ['id', 'name', 'description', 'media']


class JourneySerializer(serializers.ModelSerializer):
    quests = QuestSerializer(many=True, read_only=True)

    class Meta:
        model = Journey
        fields = ['id', 'name', 'description', 'quests']

# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = ['id', 'name', 'image']