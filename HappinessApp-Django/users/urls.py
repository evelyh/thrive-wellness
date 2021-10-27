from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import views as auth_views
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
         
path('reset_password/',
     auth_views.PasswordResetView.as_view(template_name="users/password_reset.html", html_email_template_name="users/password_reset_email.html"),
     name="reset_password"),

    path('reset_password_sent/', 
        auth_views.PasswordResetDoneView.as_view(template_name="users/password_reset_sent.html"), 
        name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
     auth_views.PasswordResetConfirmView.as_view(template_name="users/password_reset_form.html"), 
     name="password_reset_confirm"),

    path('reset_password_complete/', 
        auth_views.PasswordResetCompleteView.as_view(template_name="users/password_reset_done.html"), 
        name="password_reset_complete"),
]

#python manage.py runserver 0.0.0.0:8050