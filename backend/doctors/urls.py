from django.urls import path
from .views import DoctorSearchView, DoctorDetailView

urlpatterns = [
    # GET /api/doctors/search/?q=cardio&city=Mumbai&local=true
    path('search/', DoctorSearchView.as_view(), name='doctor_search'),
    # GET /api/doctors/<id>/
    path('<int:pk>/', DoctorDetailView.as_view(), name='doctor_detail'),
]
