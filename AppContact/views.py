from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from AppContact.models import Contact,ContactGroupe,Groupe
from AppContact.serializers import ContactSerializer,ContactGroupeSerializer,GroupeSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def contactApi(request, id=0):
    if request.method == 'GET':
        contacts = Contact.objects.all()
        contacts_serializer = ContactSerializer(contacts, many=True)
        return JsonResponse(contacts_serializer.data, safe=False)
    
    elif request.method == 'POST':
        contact_data = JSONParser().parse(request)
        contacts_serializer = ContactSerializer(data=contact_data)
        if contacts_serializer.is_valid():
            contacts_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    elif request.method == 'PUT':
        contact_data = JSONParser().parse(request)
        contact = Contact.objects.get(id=contact_data['id'])
        contacts_serializer = ContactSerializer(contact, data=contact_data)
        if contacts_serializer.is_valid():
            contacts_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method == 'DELETE':
        contact = Contact.objects.get(id=id)
        contact.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
    
@csrf_exempt
def groupeApi(request, id=0):
    if request.method == 'GET':
        groupes = Groupe.objects.all()
        groupes_serializer = GroupeSerializer(groupes, many=True)
        return JsonResponse(groupes_serializer.data, safe=False)
    
    elif request.method == 'POST':
        groupe_data = JSONParser().parse(request)
        groupes_serializer = GroupeSerializer(data=groupe_data)
        if groupes_serializer.is_valid():
            groupes_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    elif request.method == 'PUT':
        groupe_data = JSONParser().parse(request)
        groupe = Groupe.objects.get(id=groupe_data['id'])
        groupes_serializer = GroupeSerializer(groupe, data=groupe_data)
        if groupes_serializer.is_valid():
            groupes_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method == 'DELETE':
        groupe = Groupe.objects.get(id=id)
        groupe.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
    
    
@csrf_exempt
def contactGroupeApi(request, id=0):
    if request.method == 'GET':
        contact_groupes = ContactGroupe.objects.all()
        contact_groupes_serializer = ContactGroupeSerializer(contact_groupes, many=True)
        return JsonResponse(contact_groupes_serializer.data, safe=False)
    
    elif request.method == 'POST':
        contact_groupe_data = JSONParser().parse(request)
        contact_groupes_serializer = ContactGroupeSerializer(data=contact_groupe_data)
        if contact_groupes_serializer.is_valid():
            contact_groupes_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    elif request.method == 'PUT':
        contact_groupe_data = JSONParser().parse(request)
        contact_groupe = ContactGroupe.objects.get(id=contact_groupe_data['id'])
        contact_groupes_serializer = ContactGroupeSerializer(contact_groupe, data=contact_groupe_data)
        if contact_groupes_serializer.is_valid():
            contact_groupes_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method == 'DELETE':
        contact_groupe = ContactGroupe.objects.get(id=id)
        contact_groupe.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
    
    
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)
