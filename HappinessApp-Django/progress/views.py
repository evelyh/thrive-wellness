from rest_framework.fields import empty
from questdata.models import *
from .models import *
from journeys.models import *
from journeys.serializers import JourneySerializer, QuestSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['GET'])
def progress(request, jid):
    user = request.user
    journey = Journey.objects.get(id=jid)
    quests = journey.quests.all()
    completed_quests = []
    skipped_quests = []

    for quest in quests:
        qset = Progress.objects.filter(user=user, quest=quest)
        if qset:
            cquest = qset.first()
            if cquest.progress == 1:
                completed_quests.append(
                    QuestSerializer(instance=cquest.quest).data)
            elif cquest.progress == 0:
                skipped_quests.append(
                    QuestSerializer(instance=cquest.quest).data)

    return Response({"completed": completed_quests, "skipped": skipped_quests})


@api_view(['POST'])
def complete_quest(request, qid):
    user = request.user
    quest = Quest.objects.get(id=qid)
    qset = Progress.objects.filter(quest=quest, user=user)

    if qset:
        prog = qset.first()
        prog.progress = 1
        prog.save()
    else:
        Progress(quest=quest, user=user, progress=1).save()

    QuestFeedback(user=request.user, quest=quest, answer=request.data["answer"],
                  feeling_rating=request.data["feeling_rating"],
                  quest_rating=request.data["quest_rating"],
                  survey_answer=request.data["survey_answer"]).save()

    return Response({"Success": "Success"})


@api_view(['GET'])
def skip_quest(request, qid):
    user = request.user
    quest = Quest.objects.get(id=qid)
    qset = Progress.objects.filter(quest=quest, user=user)

    if qset:
        prog = qset.first()
        prog.progress = 0
        prog.save()
    else:
        Progress(quest=quest, user=user, progress=0).save()

    return Response({"Success": "Success"})


@api_view(['GET'])
def completed_journeys(request):
    user = request.user
    journeys = Journey.objects.all()
    completed = []

    for journey in journeys:
        quests = journey.quests.all()
        incomplete = False
        for quest in quests:
            qset = Progress.objects.filter(user=user, quest=quest)
            if not qset:
                incomplete = True
                break
            progress_obj = qset.first()
            if progress_obj.progress != 1:
                incomplete = True
                break
        if incomplete:
            continue
        completed.append(JourneySerializer(instance=journey).data)

    return Response(completed)

@api_view(['GET'])
def incomplete_journey(request):
    user = request.user
    journeys = Journey.objects.all()
    incomplete_journey = []

    incompleted = []
    #completed journeys
    completed = []
    for journey in journeys:
        quests = journey.quests.all()
        incomplete = False
        for quest in quests:
            qset = Progress.objects.filter(user=user, quest=quest)
            if not qset:
                incomplete = True
                break
            progress_obj = qset.first()
            if progress_obj.progress != 1:
                incomplete = True
                break
        if incomplete:
            continue
        completed.append(journey)

    # incompleted journeys
    for j in journeys:
        if(j not in completed):
            incompleted.append(j)

    for j in incompleted:
        progress = False
        quests = journey.quests.all()
        for q in quests:
            qset = Progress.objects.filter(user=user, quest=q)
            if qset:
                progress = True
                break
        if progress:
            incomplete_journey.append(JourneySerializer(instance=journey).data)

    # for journey in journeys:
    #     quests = journey.quests.all()
    #     incomplete = False
    #     for quest in quests:
    #         qset = Progress.objects.filter(user=user, quest=quest)
    #         if not qset:
    #             incomplete = True
    #             break
    #         progress_obj = qset.first()
    #         if progress_obj.progress != 1:
    #             incomplete = True
    #             break
    #     if incomplete:
    #         incomplete_journey = JourneySerializer(instance=journey).data
    #         break
    return Response(incomplete_journey)
