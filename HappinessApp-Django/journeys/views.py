from django.shortcuts import redirect, render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Journey, Quest
from .serializers import JourneySerializer, QuestSerializer

# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes(())
def journeys(request):
    if request.method == "GET":
        lst = Journey.objects.all()
        jsonObj = []
        for j in lst:
            quests = j.quests.all()
            Qserializer = QuestSerializer(quests, many=True)
            data = JourneySerializer(instance=j).data
            data['quests'] = Qserializer.data
            jsonObj.append(data)
        return Response(jsonObj)
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
        Jserializer = JourneySerializer(instance=j)
        lst = j.quests.all()
        Qserializer = QuestSerializer(lst, many=True)
        data = Jserializer.data
        data['quests'] = Qserializer.data
        return Response(data)
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
        q = Quest(name=request.data["name"],
                  description=request.data["description"])
        q.save()
        serializer = QuestSerializer(instance=q)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes(())
def quest(request, qid):
    if request.method == "GET":
        q = Quest.objects.get(id=qid)
        Qserializer = QuestSerializer(instance=q)
        return Response(Qserializer.data)
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
def all_quests(request):
    quests = Quest.objects.all()
    data = QuestSerializer(instance=quests, many=True).data
    return Response(data)

@api_view(['GET'])
@permission_classes(())
def re_order(request, jid):
    j = Journey.objects.get(id=jid)
    lst = j.quests.all()
    quests = QuestSerializer(lst, many=True).data
    new_order = request.GET.get('ids', '').split(',')

    for i in range(len(new_order)):
        qset = quests.filter(id=int(new_order[i]))
        if not qset:
            continue
        q = qset.first()
        q.order = i
        q.save()

    return redirect("/api/journeys/" + str(jid))

