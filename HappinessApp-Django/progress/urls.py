from django.urls import path
from . import views

urlpatterns = [
    path('getJourneyProgress/<int:jid>/', views.progress,
         name="api-progress-getJourneyProgress"),
    path('completeQuest/<int:qid>/', views.complete_quest,
         name="api-progress-completeQuest"),
    path('skipQuest/<int:qid>/', views.complete_quest,
         name="api-progress-skipQuest"),
    path('getCompletedJourneys/', views.completed_journeys,
         name="api-progress-getCompletedJourneys")
]
