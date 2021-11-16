from django.db import models
from journeys.models import Quest
from users.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.


class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    complete_time = models.DateTimeField(auto_now=True)
    progress = models.IntegerField(validators=[MaxValueValidator(1),
                                               MinValueValidator(0)])

    # 1 is completed, 0 is skipped

    class Meta:
        unique_together = (('user', 'quest', 'complete_time'),)


