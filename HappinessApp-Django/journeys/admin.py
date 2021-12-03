from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Quest)
admin.site.register(Journey)
admin.site.register(SubmittedQuest)
admin.site.register(SubmittedJourney)
