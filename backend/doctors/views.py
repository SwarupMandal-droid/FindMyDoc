from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q
from .models import DoctorProfile
from .serializers import DoctorSummarySerializer, DoctorDetailSerializer


class DoctorSearchView(APIView):
    """
    GET /api/doctors/search/

    Query params:
      q    — free-text search across specialization, clinic_name,
              about_you, qualification, and the doctor's name.
      city — filter by city (case-insensitive contains match).
              Used by the "Local Doctor" toggle on the frontend.

    Always: only returns doctors where is_verified=True.
    Auth:   AllowAny — patients can search without logging in.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = (
            DoctorProfile.objects
            .filter(is_verified=True)
            .select_related('user')
            .order_by('-created_at')
        )

        q = request.query_params.get('q', '').strip()
        city = request.query_params.get('city', '').strip()

        if q:
            queryset = queryset.filter(
                Q(specialization__icontains=q) |
                Q(clinic_name__icontains=q) |
                Q(about_you__icontains=q) |
                Q(qualification__icontains=q) |
                Q(user__first_name__icontains=q) |
                Q(user__last_name__icontains=q)
            )

        if city:
            queryset = queryset.filter(city__icontains=city)

        serializer = DoctorSummarySerializer(
            queryset,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)


class DoctorDetailView(APIView):
    """
    GET /api/doctors/<id>/

    Returns the complete profile for a single verified doctor.
    Returns 404 if the doctor does not exist or is not yet verified.
    Auth: AllowAny — patients can view profiles without logging in.
    """
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            doctor = (
                DoctorProfile.objects
                .select_related('user')
                .get(pk=pk, is_verified=True)
            )
        except DoctorProfile.DoesNotExist:
            return Response(
                {'detail': 'Doctor not found or not yet verified.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DoctorDetailSerializer(doctor, context={'request': request})
        return Response(serializer.data)
