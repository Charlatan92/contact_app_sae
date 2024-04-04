from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status

from AppContact.models import Contact, ContactGroupe, Groupe
from AppContact.serializers import ContactSerializer, ContactGroupeSerializer, GroupeSerializer

from django.core.files.storage import default_storage


@csrf_exempt
def contactApi(request, id=0):
    # Si un ID est fourni dans l'URL, renvoyez seulement le contact correspondant à cet ID.
    if request.method == 'GET':
        if id != 0:
            contact = get_object_or_404(Contact, pk=id)
            contact_serializer = ContactSerializer(contact)
            return JsonResponse(contact_serializer.data, safe=False)
        else:
            contacts = Contact.objects.all()
            contact_serializer = ContactSerializer(contacts, many=True)
            return JsonResponse(contact_serializer.data, safe=False)

    
    elif request.method == 'POST':
        contact_data = JSONParser().parse(request)
        contacts_serializer = ContactSerializer(data=contact_data)
        if contacts_serializer.is_valid():
            contacts_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    elif request.method == 'PUT':
        if id:  
            try:
                contact = Contact.objects.get(id=id)
                contact_data = JSONParser().parse(request)
                contacts_serializer = ContactSerializer(contact, data=contact_data)
                if contacts_serializer.is_valid():
                    contacts_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
            except Contact.DoesNotExist:
                return JsonResponse("Failed to Update - Contact Not Found", status=status.HTTP_404_NOT_FOUND)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method == 'DELETE':
        try:
            contact = Contact.objects.get(id=id)
            contact.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Contact.DoesNotExist:
            return JsonResponse("Failed to Delete - Contact Not Found", status=status.HTTP_404_NOT_FOUND)

    
    
@csrf_exempt
def groupeApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            groupe = get_object_or_404(Groupe, pk=id)
            groupe_serializer = GroupeSerializer(groupe)
            return JsonResponse(groupe_serializer.data, safe=False)
        else:
            groupes = Groupe.objects.all()
            groupes_serializer = GroupeSerializer(groupes, many=True)
            return JsonResponse(groupes_serializer.data, safe=False)
    
    elif request.method == 'POST':
        groupe_data = JSONParser().parse(request)
        groupe_serializer = GroupeSerializer(data=groupe_data)
        if groupe_serializer.is_valid():
            groupe_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    elif request.method == 'PUT':
        if id:
            try:
                groupe = Groupe.objects.get(id=id)
                groupe_data = JSONParser().parse(request)
                groupe_serializer = GroupeSerializer(groupe, data=groupe_data)
                if groupe_serializer.is_valid():
                    groupe_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
            except Groupe.DoesNotExist:
                return JsonResponse("Failed to Update - Groupe Not Found", status=status.HTTP_404_NOT_FOUND)
        return JsonResponse("Failed to Update", safe=False)
    
    elif request.method == 'DELETE':
        try:
            groupe = Groupe.objects.get(id=id)
            groupe.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Groupe.DoesNotExist:
            return JsonResponse("Failed to Delete - Groupe Not Found", status=status.HTTP_404_NOT_FOUND)


    
    
    
@csrf_exempt
def contactGroupeApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            contact_groupe = get_object_or_404(ContactGroupe, pk=id)
            contact_groupe_serializer = ContactGroupeSerializer(contact_groupe)
            return JsonResponse(contact_groupe_serializer.data, safe=False)
        else:
            contact_groupes = ContactGroupe.objects.all()
            contact_groupes_serializer = ContactGroupeSerializer(contact_groupes, many=True)
            return JsonResponse(contact_groupes_serializer.data, safe=False)

    elif request.method == 'POST':
        contact_groupe_data = JSONParser().parse(request)
        contact_groupes_serializer = ContactGroupeSerializer(data=contact_groupe_data)
        if contact_groupes_serializer.is_valid():
            contact_groupes_serializer.save()
            return JsonResponse("Added Successfully", status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(contact_groupes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if id:  
            try:
                contact_groupe = ContactGroupe.objects.get(pk=id)
                contact_groupe_data = JSONParser().parse(request)
                contact_groupes_serializer = ContactGroupeSerializer(contact_groupe, data=contact_groupe_data)
                if contact_groupes_serializer.is_valid():
                    contact_groupes_serializer.save()
                    return JsonResponse("Updated Successfully", status=status.HTTP_202_ACCEPTED, safe=False)
            except ContactGroupe.DoesNotExist:
                return JsonResponse("Failed to Update - ContactGroupe Not Found", status=status.HTTP_404_NOT_FOUND, safe=False)
        return JsonResponse("Failed to Update", status=status.HTTP_400_BAD_REQUEST, safe=False)
    
    elif request.method == 'DELETE':
        if id:  
            try:
                contact_groupe = ContactGroupe.objects.get(pk=id)
                contact_groupe.delete()
                return JsonResponse("Deleted Successfully", status=status.HTTP_204_NO_CONTENT, safe=False)
            except ContactGroupe.DoesNotExist:
                return JsonResponse("Failed to Delete - ContactGroupe Not Found", status=status.HTTP_404_NOT_FOUND, safe=False)
        return JsonResponse("Failed to Delete", status=status.HTTP_400_BAD_REQUEST, safe=False)
    
    
    
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)
