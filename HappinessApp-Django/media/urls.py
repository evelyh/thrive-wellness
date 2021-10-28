from django.urls import path
from . import views

urlpatterns = [
    path('', views.photos, name="api-images"),
    path('<int:pid>/', views.media, name="api-image")
]