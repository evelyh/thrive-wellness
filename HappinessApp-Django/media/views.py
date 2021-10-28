from django.shortcuts import redirect

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Media
from .serializers import MediaSerializer


@api_view(['GET', 'POST'])
@permission_classes(())
def photos(request):
    if request.method == 'GET':
        lst = Media.objetcs.all()
        serializer = MediaSerializer(lst, many=True)
        return Response(serializer.data)
    else:
        serializer = MediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

        