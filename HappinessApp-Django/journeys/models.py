from django.db import models


# Create your models here.


class Journey(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Quest(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    journey = models.ForeignKey(Journey, related_name="quests",
                                on_delete=models.CASCADE)
    order = models.IntegerField()
    survey_question = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']
