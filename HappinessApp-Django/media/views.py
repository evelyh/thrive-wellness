from django.shortcuts import redirect, render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Image
from .serializers import ImageSerializer
from .forms import ImageForm


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
      MyImageForm = Imageform()
		
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