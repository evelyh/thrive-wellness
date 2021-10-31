from django.shortcuts import redirect, render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Journey, Quest, Image
from .serializers import JourneySerializer, QuestSerializer, ImageSerializer
from .forms import ImageForm

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


@api_view(['GET', 'POST'])
@permission_classes(())
def images(request):
   saved = False
   if request.method == "POST":
      #Get the posted form
      MyImageForm = ImageForm(request.POST, request.FILES)
      if MyImageForm.is_valid():
         profile = Image()
         profile.name = MyImageForm.cleaned_data["name"]
         profile.picture = MyImageForm.cleaned_data["picture"]
         profile.save()
         saved = True
   else:
      MyImageForm = ImageForm()
		
   return render(request, 'image', locals())


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes(())
def image(request, pid):
    if request.method == "GET":
        p = Image.objects.get(id=pid)
        serializer = ImageSerializer(instance=p)
        return Response(serializer.data)
    elif request.method == "PUT":
        p = Image.objects.get(id=pid)
        serializer = ImageSerializer(instance=p, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    else:
        p = Image.objects.get(id=pid)
        deleted = ImageSerializer(instance=p).data
        p.delete()
        return Response(deleted)
