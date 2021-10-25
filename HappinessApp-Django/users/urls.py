from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token


from .views import *

urlpatterns = [
    path('login/', obtain_auth_token, name="api-user-login"),
    path('register/', register, name="api-user-register"),
    path('is_admin/', is_admin, name="api-user-is-admin"),
    path('get_notification_time/', get_preferred_notification_time,
         name="api-user-get-notification-time"),
    path('set_notification_time/', set_preferred_notification_time,
         name="api-user-set-notification-time"),
    path('get_user_meta/', get_user_meta,
         name="api-user-set-notification-time"),
]
