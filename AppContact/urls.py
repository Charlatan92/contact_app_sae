from django.urls import re_path
from AppContact import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Capture les requêtes GET pour tous les contacts et pour un contact spécifique par son ID
    re_path(r'^contact/$', views.contactApi),  # Pour obtenir tous les contacts
    re_path(r'^contact/(?P<id>[0-9]+)$', views.contactApi),  # Pour obtenir un contact spécifique par ID

    re_path(r'^groupe/$', views.groupeApi),  # Pour obtenir tous les groupes
    re_path(r'^groupe/(?P<id>[0-9]+)$', views.groupeApi),  # Pour obtenir un groupe spécifique par ID
    
    # URLs pour ContactGroupe
    re_path(r'^contactgroupe/$', views.contactGroupeApi),  # Pour obtenir tous les contacts
    re_path(r'^contactgroupe/(?P<id>[0-9]+)$', views.contactGroupeApi),  # Pour obtenir un contact spécifique par ID

    # Sauvegarder un fichier
    re_path(r'^contact/savefile$', views.SaveFile),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
