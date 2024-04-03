from django.test import TestCase
from django.db.utils import IntegrityError
from ..models import Contact, Groupe, ContactGroupe

class ContactModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.contact, created = Contact.objects.get_or_create(
            prenom="Jean",
            nom="Dupont",
            defaults={
                'email': "jeandupont@example.com",
                'telephone': 123456789,
                'adresse': "123 rue de Paris",
                'metier': "Developpeur"
            }
        )


    def test_prenom_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('prenom').verbose_name
        self.assertEquals(field_label, 'prenom')

    def test_nom_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('nom').verbose_name
        self.assertEquals(field_label, 'nom')

    def test_email_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('email').verbose_name
        self.assertEquals(field_label, 'email')

    def test_telephone_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('telephone').verbose_name
        self.assertEquals(field_label, 'telephone')

    def test_adresse_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('adresse').verbose_name
        self.assertEquals(field_label, 'adresse')

    def test_metier_label(self):
        contact = Contact.objects.get(id=1)
        field_label = contact._meta.get_field('metier').verbose_name
        self.assertEquals(field_label, 'metier')

    def test_contact_str(self):
        contact = Contact.objects.get(id=1)
        expected_object_name = f'{contact.prenom} {contact.nom}'
        self.assertEquals(str(contact), expected_object_name)


class GroupeModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.groupe, created = Groupe.objects.get_or_create(
            nom="Amis", 
            defaults={'couleur': "#0000FF"}
        )


    def test_nom_label(self):
        groupe = Groupe.objects.get(id=1)
        field_label = groupe._meta.get_field('nom').verbose_name
        self.assertEquals(field_label, 'nom')

    def test_couleur_label(self):
        groupe = Groupe.objects.get(id=1)
        field_label = groupe._meta.get_field('couleur').verbose_name
        self.assertEquals(field_label, 'couleur')

    def test_groupe_str(self):
        groupe = Groupe.objects.get(id=1)
        expected_object_name = groupe.nom
        self.assertEquals(str(groupe), expected_object_name)
        
        def test_unique_nom(self):
            # Test pour s'assurer que le nom du groupe est unique
            with self.assertRaises(IntegrityError):
                Groupe.objects.create(nom="Amis", couleur="#FF0000")




class ContactGroupeModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        contact, created = Contact.objects.get_or_create(
            prenom="Jean",
            nom="Dupont",
            defaults={
                'email': "jeandupont@example.com",
                'telephone': 123456789,
                'adresse': "123 rue de Paris",
                'metier': "Developpeur"
            }
        )
        groupe, created = Groupe.objects.get_or_create(
            nom="Famille", 
            defaults={'couleur': "#FFC0CB"}
        )
        cls.contact_groupe, created = ContactGroupe.objects.get_or_create(
            contact=contact, 
            groupe=groupe
        )




    def test_contact_groupe_str(self):
        contact_groupe = ContactGroupe.objects.get(id=1)
        expected_object_name = f'{contact_groupe.contact} - {contact_groupe.groupe}'
        self.assertEquals(str(contact_groupe), expected_object_name)
