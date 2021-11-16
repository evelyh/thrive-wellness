from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Quest)
class QuestModel(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Journey)
class JourneyModel(admin.ModelAdmin):
    list_display = ('name', 'description')
