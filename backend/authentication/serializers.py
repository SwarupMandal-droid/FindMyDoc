from rest_framework import serializers
from django.contrib.auth import get_user_model
from doctors.models import DoctorProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Add extra responses here
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'role': self.user.role,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
        return data

class PatientRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name', 'phone_number')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            role=User.Role.PATIENT
        )
        return user


class DoctorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    # Fields for DoctorProfile
    specialization = serializers.CharField(write_only=True)
    experience_years = serializers.IntegerField(write_only=True)
    qualification = serializers.CharField(write_only=True)
    about_you = serializers.CharField(write_only=True, required=False, allow_blank=True)
    clinic_name = serializers.CharField(write_only=True)
    clinic_address = serializers.CharField(write_only=True)
    city = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = (
            'email', 'username', 'password', 'first_name', 'last_name', 'phone_number',
            'specialization', 'experience_years', 'qualification', 'about_you',
            'clinic_name', 'clinic_address', 'city'
        )

    def create(self, validated_data):
        # Extract profile data
        profile_data = {
            'specialization': validated_data.pop('specialization'),
            'experience_years': validated_data.pop('experience_years'),
            'qualification': validated_data.pop('qualification'),
            'about_you': validated_data.pop('about_you', ''),
            'clinic_name': validated_data.pop('clinic_name'),
            'clinic_address': validated_data.pop('clinic_address'),
            'city': validated_data.pop('city'),
        }

        # Create user
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            role=User.Role.DOCTOR
        )
        
        # Create doctor profile
        DoctorProfile.objects.create(user=user, **profile_data)
        
        return user
