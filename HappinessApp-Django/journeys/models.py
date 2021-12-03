from django.db import models

# Create your models here.


class Journey(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    media = models.ImageField(upload_to='assets', blank=True)

    def __str__(self):
        return self.name


class Quest(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    journey = models.ForeignKey(Journey, related_name="quests",
                                on_delete=models.CASCADE, blank=True, null=True)
    order = models.IntegerField()
    media = models.ImageField(upload_to='assets', blank=True)
    survey_question = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']


class SubmittedJourney(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    approved = models.BooleanField(default=False)
    media = models.ImageField(upload_to='assets', blank=True)
    email = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SubmittedQuest(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    journey = models.ForeignKey(SubmittedJourney, related_name="submitted_quests",
                                on_delete=models.CASCADE, blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    media = models.ImageField(upload_to='assets', blank=True, null=True)
    survey_question = models.TextField(null=True, blank=True)
    approved = models.BooleanField(default=False)
    email = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

