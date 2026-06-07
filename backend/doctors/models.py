from django.db import models
from django.conf import settings


class DoctorProfile(models.Model):
    # Links directly to our Custom User model
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_profile'
    )

    # Professional Info
    specialization = models.CharField(max_length=100, db_index=True)
    experience_years = models.PositiveIntegerField(default=0)
    qualification = models.CharField(max_length=200, help_text="e.g., MBBS, MD")
    about_you = models.TextField(blank=True, null=True)

    # Clinic Info
    clinic_name = models.CharField(max_length=200)
    clinic_address = models.TextField()
    city = models.CharField(max_length=100, db_index=True)  # Crucial for "Local Doctor" filter!

    # Availability — comma-separated 3-letter day codes, e.g. "MON,TUE,WED,FRI"
    available_days = models.CharField(
        max_length=100,
        blank=True,
        default='',
        help_text="Comma-separated day codes: MON,TUE,WED,THU,FRI,SAT,SUN"
    )

    # Verification Files (Saves into media/ folder configured in settings)
    profile_image = models.ImageField(upload_to='doctor_photos/', blank=True, null=True)
    # nullable so registration works before a file upload UI is added
    registration_certificate = models.FileField(upload_to='certificates/', blank=True, null=True)

    # The Manual Admin Verification Switch
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Dr. {self.user.first_name or self.user.username} "
            f"- {self.specialization} "
            f"({'Verified' if self.is_verified else 'Pending'})"
        )