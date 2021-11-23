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

from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token
from django.template.loader import render_to_string
# Create your views here.
from users.serializers import UserMetaSerializer


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@api_view(['POST'])
@permission_classes([])
def register(request):
    em = request.data["email"]
    um = request.data["username"]
    if User.objects.filter(email__iexact=em, username__iexact=um).count() == 0:
        user = User.objects.create_user(request.data["username"],
                                    request.data["email"],
                                    request.data["password"])
        user.is_active = False
        user.save()
        UserMeta(user=user, firstname=request.data["firstname"],
             lastname=request.data["lastname"],
             age=request.data["age"], sex=request.data["sex"]).save()
        current_site = get_current_site(request)
        mail_subject = 'Activate your Thrive account'
        message = render_to_string('email_template.html', {
                        'user': user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': account_activation_token.make_token(user),
                    })
        to_email = em
        send_mail(mail_subject, message, 'bellwoodspw@gmail.com', [to_email])
        return Response({"response" : 'Please confirm your email address to complete the registration'})
    else:
        return
  

def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return render(request, 'confirmed.html')
    else:
        return render(request, 'timout.html')

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
