"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static


def api_root(request):
    return JsonResponse({
        "message": "FindMyDoc API is running successfully!",
        "endpoints": {
            "auth": "/api/auth/",
            "doctors": "/api/doctors/",
            "admin": "/admin/"
        }
    })


urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/doctors/', include('doctors.urls')),  # ← New: doctor search & profile routes
]

# Serve uploaded media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
