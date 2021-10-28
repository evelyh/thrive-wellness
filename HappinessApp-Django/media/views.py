from django.shortcuts import redirect

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Image
from .serializers import ImageSerializer


@api_view(['GET', 'POST'])
@permission_classes(())
def images(request):
    if request.method == 'GET':
        lst = Image.objetcs.all()
        serializer = ImageSerializer(lst, many=True)
        return Response(serializer.data)
    else:
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


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