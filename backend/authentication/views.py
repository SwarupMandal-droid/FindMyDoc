from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import PatientRegistrationSerializer, DoctorRegistrationSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PatientRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = PatientRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            },
            "message": "Patient registered successfully."
        }, status=status.HTTP_201_CREATED)


class DoctorRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DoctorRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            },
            "message": "Doctor registered successfully. Awaiting verification."
        }, status=status.HTTP_201_CREATED)
