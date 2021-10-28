from django.urls import path
from . import views

urlpatterns = [
    path('', views.images, name="api-images"),
    path('<int:pid>/', views.image, name="api-image")
]