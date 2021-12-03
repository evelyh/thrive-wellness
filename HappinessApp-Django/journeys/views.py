from decouple import config
from django.shortcuts import redirect, render
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import *
from .serializers import *
from .forms import ImageForm

#
# port = 465  # For SSL
# smtp_server = "smtp.gmail.com"
# sender_email = config('email')
# receiver_email = config('email')
# password = config('password')
from django.core.mail import send_mail
receiver_email = config('email')


# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes(())
def journeys(request):
    if request.method == "GET":
        lst = Journey.objects.all()
        serializer = JourneySerializer(lst, many=True)
        return Response(serializer.data)
    else:
        serializer = JourneySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes(())
def journey(request, jid):
    if request.method == "GET":
        j = Journey.objects.get(id=jid)
        serializer = JourneySerializer(instance=j)
        return Response(serializer.data)
    elif request.method == "PUT":
        j = Journey.objects.get(id=jid)
        serializer = JourneySerializer(instance=j, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    else:
        j = Journey.objects.get(id=jid)
        deleted = JourneySerializer(instance=j).data
        j.delete()
        return Response(deleted)


@api_view(['GET', 'POST'])
@permission_classes(())
def quests(request, jid):
    if request.method == "GET":
        j = Journey.objects.get(id=jid)
        lst = j.quests.all()
        serializer = QuestSerializer(lst, many=True)
        return Response(serializer.data)
    else:
        j = Journey.objects.get(id=jid)
        order = len(j.quests.all())
        q = Quest(name=request.data["name"],
                  description=request.data["description"], journey=j,
                  order=order)
        q.save()
        serializer = QuestSerializer(instance=q)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes(())
def quest(request, jid, qid):
    if request.method == "GET":
        q = Quest.objects.get(id=qid)
        serializer = QuestSerializer(instance=q)
        return Response(serializer.data)
    elif request.method == "PUT":
        q = Quest.objects.get(id=qid)
        serializer = QuestSerializer(instance=q, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    else:
        q = Quest.objects.get(id=qid)
        deleted = QuestSerializer(instance=q).data
        q.delete()
        return Response(deleted)


@api_view(['GET'])
@permission_classes(())
def re_order(request, jid):
    j = Journey.objects.get(id=jid)
    lst = j.quests.all()
    new_order = request.GET.get('ids', '').split(',')

    for i in range(len(new_order)):
        qset = lst.filter(id=int(new_order[i]))
        if not qset:
            continue
        q = qset.first()
        q.order = i
        q.save()

    return redirect("/api/journeys/" + str(jid))


def notify_new_submission(request, typee, id):
    subject = ""
    message = ""
    if typee == "q":
        message = "A user has submitted new quest(s).\nQuest:\n"
        name = ""
        description = ""
        print(request.data.get("quests"))
        for q in request.data.get("quests"):
            if not (q == {} or "name" not in q.keys() or "description" not in q.keys()):
                name += str(q["name"]) + "; "
                description += str(q["description"]) + "; "
        message += "name: " + name + "\n"
        message += "description: " + description + "\n"
        message += "Their name is " + str(request.data.get("user_name")) + " and their email " + str(request.data.get("email"))
        subject = "New user submitted quest!"
    elif typee == "j":
        message = "A user has submitted a new journey. \n"
        message += "name: " + request.data.get("name") + "\n"
        message += "description: " + request.data.get("description") + "\n"
        message += "quests: " + str(request.data.get("quests")) + "\n"
        message += "ID: " + str(id) + "\n"
        message += "Their name is " + str(request.data.get("user_name")) + " and their email " + str(request.data.get("email"))
        subject = "New user submitted journey!"
    send_mail(subject, message, 'bellwoodspw@gmail.com', [receiver_email])



@api_view(['GET', 'POST'])
@permission_classes(())
def submit_journeys(request):
    if request.method == "GET":
        journeys = SubmittedJourney.objects.all()
        serializer = SubmittedJourneySerializer(journeys, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    else:
        jserializer = SubmittedJourneySerializer(data=request.data)
        questsss = request.data.get("quests").copy()
        for q in request.data.get("quests"):
            if q == {} or q["name"] == "" or q["description"] == "":
                questsss.remove(q)
            else:
                q["email"] = request.data.get("email")
                q["user_name"] = request.data.get("user_name")
        qserializer = SubmittedQuestSerializer(data=questsss, many=True)
        if jserializer.is_valid() and qserializer.is_valid():
            jserializer.save()
            new_journey = SubmittedJourney.objects.get(name=jserializer.validated_data.get("name"),
                                                       description=jserializer.validated_data.get("description"))
            new_id = new_journey.pk
            for q in questsss:
                q["journey"] = new_journey.pk
                qserializer = SubmittedQuestSerializer(data=q)
                if qserializer.is_valid():
                    qserializer.save()
                else:
                    return Response(qserializer.errors, status=status.HTTP_400_BAD_REQUEST)
            notify_new_submission(request, "j", new_id)
            return Response(jserializer.data, status=status.HTTP_201_CREATED)
        return Response(jserializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
@permission_classes(())
def submit_quests(request):
    if request.method == "GET":
        quests = SubmittedQuest.objects.all()
        serializer = SubmittedQuestSerializer(quests, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    else:
        questsss = request.data.get("quests").copy()
        for q in request.data.get("quests"):
            if q == {} or q["name"] == "" or q["description"] == "":
                questsss.remove(q)
            else:
                q["email"] = request.data.get("email")
                q["user_name"] = request.data.get("user_name")
        qserializer = SubmittedQuestSerializer(data=questsss, many=True)
        if qserializer.is_valid():
            qserializer.save()
            notify_new_submission(request, "q", 0)
            return Response(qserializer.data, status=status.HTTP_201_CREATED)
        return Response(qserializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', "POST"])
@permission_classes(())
def update_user_quest(request, qid):
    q = SubmittedQuest.objects.get(pk=qid)
    serializer = SubmittedQuestSerializer(q, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        q = SubmittedQuest.objects.get(pk=qid)
        approved = q.approved
        japproved = True
        if q.journey is not None:
            japproved = q.journey.approved
        if approved and japproved:
            # add quest to Quest table
            new_quest = Quest(name=q.name, description=q.description, journey=q.journey,
                              order=q.order, media=q.media, survey_question=q.survey_question)
            new_quest.save()
            serializer = QuestSerializer(new_quest)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        serializer = SubmittedQuestSerializer(q)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH", "POST"])
@permission_classes(())
def update_user_journey(request, jid):
    j = SubmittedJourney.objects.get(pk=jid)
    serializer = SubmittedJourneySerializer(j, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        j = SubmittedJourney.objects.get(pk=jid)
        approved = j.approved
        if approved:
            # add journey to Journey table
            quest_lst = []
            new_journey = Journey(name=j.name, description=j.description, media=j.media)
            new_journey.save()
            for q in j.submitted_quests.all():
                q.approved = True
                q.save()
                new_quest = Quest(name=q.name, description=q.description, journey_id=new_journey.pk,
                                  order=q.order, media=q.media, survey_question=q.survey_question)
                new_quest.save()
                quest_lst.append(new_quest)
            serializer = JourneySerializer(new_journey)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        serializer = SubmittedJourneySerializer(j)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'POST'])
# @permission_classes(())
# def images(request):
#    saved = False
#    if request.method == "POST":
#       #Get the posted form
#       MyImageForm = ImageForm(request.POST, request.FILES)
#       if MyImageForm.is_valid():
#          profile = Image()
#          profile.name = MyImageForm.cleaned_data["name"]
#          profile.picture = MyImageForm.cleaned_data["picture"]
#          profile.save()
#          saved = True
#    else:
#       MyImageForm = ImageForm()

#    return render(request, 'image', locals())


# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes(())
# def image(request, pid):
#     if request.method == "GET":
#         p = Quest.objects.get(media=pid)
#         serializer = QuestSerializer(instance=p)
#         return Response(serializer.data)
#     elif request.method == "PUT":
#         p = Image.objects.get(id=pid)
#         serializer = ImageSerializer(instance=p, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         return Response(serializer.data)
#     else:
#         p = Image.objects.get(id=pid)
#         deleted = ImageSerializer(instance=p).data
#         p.delete()
#         return Response(deleted)
