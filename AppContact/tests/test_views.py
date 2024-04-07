from rest_framework import status
from rest_framework.test import APITestCase
from AppContact.models import Contact,Groupe,ContactGroupe

class ContactAPITests(APITestCase):

    def setUp(self):
        # Création d'un groupe pour les tests de GET, PUT, et DELETE
        self.groupe, _ = Groupe.objects.get_or_create(
            nom="Famille",
            defaults={
                "couleur": "#FFC0CB"
            }
        )

    def test_create_contact(self):
        """
        Teste la création d'un nouveau contact via l'API POST.
        """
        url = '/contact'  # Utilisation directe de l'URL
        data = {
            "prenom": "Jean",
            "nom": "Dupont",
            "email": "jeandupont@example.com",
            "telephone": "9876543210",
            "adresse": "123 Dupont St",
            "metier": "Developer",
            "photo_path": None
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_contact(self):
        """
        Teste la récupération de la liste des contacts via l'API GET.
        """
        url = '/contact'  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)  # Utilise response.json()


    def test_update_contact(self):
        """
        Teste la mise à jour d'un contact existant via l'API PUT.
        """
        contact, _ = Contact.objects.get_or_create(
            prenom="Initial",
            nom="Contact",
            defaults={
                "email": "initialcontact@example.com",
                "telephone": "1234567890",
                "adresse": "123 Initial St",
                "metier": "Tester",
                "photo_path": None
            }
        )
        url = f'/contact/{contact.id}'  # Utilisation directe de l'URL avec l'ID du contact
        data = {
            "prenom": "Modified",
            "nom": "Contact",
            "email": "modifiedcontact@example.com",
            "telephone": "1234567890",
            "adresse": "123 Modified St",
            "metier": "Tester",
            "photo_path": None
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_contact(self):
        """
        Teste la suppression d'un contact existant via l'API DELETE.
        """
        contact, _ = Contact.objects.get_or_create(
            prenom="ToDelete",
            nom="Contact",
            defaults={
                "email": "todeletecontact@example.com",
                "telephone": "1234567890",
                "adresse": "123 ToDelete St",
                "metier": "Tester",
                "photo_path": None
            }
        )
        url = f'/contact/{contact.id}'  # Utilisation directe de l'URL avec l'ID du contact
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_create_groupe(self):
        """
        Teste la création d'un nouveau groupe via l'API POST.
        """
        url = '/groupe'  # Utilisation directe de l'URL
        data = {
            "nom": "Amis",
            "couleur": "#0000FF"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Groupe.objects.count(), 2)  # Compte original + nouveau

    def test_get_groupes(self):
        """
        Teste la récupération de la liste des groupes via l'API GET.
        """
        url = '/groupe'  # Utilisation directe de l'URL
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)  # Assurez-vous qu'un groupe est retourné

    def test_update_groupe(self):
        """
        Teste la mise à jour d'un groupe existant via l'API PUT.
        """
        url = f'/groupe/{self.groupe.id}'  # Utilisation directe de l'URL avec l'ID du groupe
        data = {
            "nom": "Famille - Modifié",
            "couleur": "#FFC0CC"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Groupe.objects.get(id=self.groupe.id).nom, "Famille - Modifié")

    def test_delete_groupe(self):
        """
        Teste la suppression d'un groupe existant via l'API DELETE.
        """
        url = f'/groupe/{self.groupe.id}'  # Utilisation directe de l'URL avec l'ID du groupe
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Groupe.objects.count(), 0)

