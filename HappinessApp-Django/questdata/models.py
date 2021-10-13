from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.
from journeys.models import *
from users.models import *


class QuestFeedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    answer = models.TextField()
    quest_rating = models.IntegerField(validators=[MaxValueValidator(10),
                                                   MinValueValidator(1)])
    feeling_rating = models.IntegerField(validators=[MaxValueValidator(10),
                                                     MinValueValidator(1)])

    class Meta:
        unique_together = (('user', 'quest'),)
