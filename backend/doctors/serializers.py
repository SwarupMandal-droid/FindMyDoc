from rest_framework import serializers
from .models import DoctorProfile


class DoctorSummarySerializer(serializers.ModelSerializer):
    """
    Minimal serializer for search result cards (DoctorCard.jsx).
    Only exposes what's needed to render the card — no sensitive data.
    """
    full_name = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
            'full_name',
            'specialization',
            'experience_years',
            'qualification',
            'clinic_name',
            'city',
            'available_days',
            'profile_image_url',
            'is_verified',
        ]

    def get_full_name(self, obj):
        first = obj.user.first_name or ''
        last = obj.user.last_name or ''
        full = f"{first} {last}".strip()
        return full if full else obj.user.username

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_image and hasattr(obj.profile_image, 'url') and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return None


class DoctorDetailSerializer(serializers.ModelSerializer):
    """
    Full serializer for the DoctorProfileDetails.jsx page.
    Includes contact info, full address, and bio.
    Phone number is intentionally exposed here — it's the app's
    primary contact mechanism (no booking system exists).
    """
    full_name = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = DoctorProfile
        fields = [
            'id',
            'full_name',
            'specialization',
            'experience_years',
            'qualification',
            'about_you',
            'clinic_name',
            'clinic_address',
            'city',
            'available_days',
            'profile_image_url',
            'phone_number',
            'is_verified',
            'created_at',
        ]

    def get_full_name(self, obj):
        first = obj.user.first_name or ''
        last = obj.user.last_name or ''
        full = f"{first} {last}".strip()
        return full if full else obj.user.username

    def get_phone_number(self, obj):
        return obj.user.phone_number or ''

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_image and hasattr(obj.profile_image, 'url') and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return None
