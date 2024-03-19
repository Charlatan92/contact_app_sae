from django.urls import re_path
from AppContact import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^contact$', views.contactApi),
    re_path(r'^contact/([0-9]+)$', views.contactApi),

    re_path(r'^groupe$', views.groupeApi),
    re_path(r'^groupe/([0-9]+)$', views.groupeApi),
    
    # Ces URLs semblent incorrectes car elles sont en double avec 'groupe', elles devraient être 'contactgroupe' peut-être ?
    re_path(r'^contactgroupe$', views.contactGroupeApi),
    re_path(r'^contactgroupe/([0-9]+)$', views.contactGroupeApi),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
