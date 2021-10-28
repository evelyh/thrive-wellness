from django.db import models


class Image(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images')

    def __str__(self) -> str:
        return self.name

    class Meta:
        unique_together = [('name', 'image'), ]