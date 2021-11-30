from rest_framework import serializers
from .models import Journey, Quest


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ['id', 'name', 'description', 'media', 'survey_question', 'video']


class JourneySerializer(serializers.ModelSerializer):

    class Meta:
        model = Journey
        fields = ['id', 'name', 'description', 'quests', 'media', 'video']
