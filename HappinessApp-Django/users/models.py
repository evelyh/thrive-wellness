from datetime import time

from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)


class UserMeta(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.TextField()
    lastname = models.TextField()
    age = models.IntegerField()
    sex = models.CharField(max_length=1)
    pref_alert_time = models.TimeField(auto_now=False, auto_now_add=False,
                                       default=time(hour=9, minute=0, second=0))
