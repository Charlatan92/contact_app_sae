from rest_framework import serializers
from AppContact.models import Contact, ContactGroupe, Groupe

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields=('id','prenom','nom','email','telephone','adresse','metier','photo_path')
        
        
class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Groupe
        fields=('id','nom','couleur')
        
        
class ContactGroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ContactGroupe
        fields=('id','contact_id','groupe_id')