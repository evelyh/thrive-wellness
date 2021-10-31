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
    media = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']


class Image(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='assets')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "media_image"
        unique_together = [('name', 'image'), ]
