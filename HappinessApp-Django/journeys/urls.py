from django.urls import path
from . import views

urlpatterns = [
     path('', views.journeys, name="api-journeys"),
     path('<int:jid>/', views.journey, name="api-journey"),
     path('<int:jid>/quests/', views.quests, name="api-quests"),
     path('<int:jid>/quests/<int:qid>/', views.quest,
         name="api-quest"),
     path('<int:jid>/reorder-quests', views.re_order,
         name="api-re-order"),
#      path('<int:jid>/images/', views.images, name="api-images"),
#      path('<int:jid>/images/<int:pid>', views.image, name="api-image")
]
