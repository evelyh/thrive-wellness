from datetime import datetime

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from questdata.serializers import FeedbackSerializer
from users.models import *
from rest_framework.response import Response

# Create your views here.
from users.serializers import UserMetaSerializer


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@api_view(['POST'])
@permission_classes([])
def register(request):
    user = User.objects.create_user(request.data["username"],
                                    request.data["email"],
                                    request.data["password"])
    user.save()

    first_name = models.TextField()
    last_name = models.TextField()
    age = models.IntegerField()
    sex = models.CharField(max_length=1)

    UserMeta(user=user, firstname=request.data["firstname"],
             lastname=request.data["lastname"],
             age=request.data["age"], sex=request.data["sex"]).save()
    return Response({"token": Token.objects.get(user=user).key})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_preferred_notification_time(request):
    return Response(
        {"time": UserMeta.objects.get(user=request.user).pref_alert_time})


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def set_preferred_notification_time(request):
    meta = UserMeta.objects.get(user=request.user)
    meta.pref_alert_time = datetime.strptime(request.data["time"],
                                             "%H:%M:%S").time()
    meta.save()
    return Response({"time": meta.pref_alert_time})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_user_meta(request):
    meta = UserMeta.objects.get(user=request.user)

    serializer = UserMetaSerializer(instance=meta)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# def set_user_meta(request):
#     meta = UserMeta.objects.get(user=request.user)
#
#     serializer = UserMetaSerializer(instance=meta)
#     return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def is_admin(request):
    return Response({"status": request.user.is_staff})
