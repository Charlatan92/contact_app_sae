from django.db import models

from django.db import models

class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    prenom = models.CharField(max_length=50, null=False)
    nom = models.CharField(max_length=50, null=False)
    email = models.EmailField(max_length=100, blank=True, null=True)
    telephone = models.BigIntegerField(null=False)
    adresse = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Groupe(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50, null=False, unique=True)
    couleur = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nom

class ContactGroupe(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    groupe = models.ForeignKey(Groupe, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('contact', 'groupe')
        verbose_name_plural = "Contact Groupes"

    def __str__(self):
        return f"{self.contact} - {self.groupe}"
