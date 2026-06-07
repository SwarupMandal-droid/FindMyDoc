from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        PATIENT = 'PATIENT', 'Patient'
        DOCTOR = 'DOCTOR', 'Doctor'
        ADMIN = 'ADMIN', 'Admin'

    # Set the default role to PATIENT
    role = models.CharField(
        max_length=10, 
        choices=Role.choices, 
        default=Role.PATIENT
    )
    
    # Use email for login instead of username
    email = models.EmailField(unique=True)
    
    # Track phone number at the base user level
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return f"{self.email} ({self.role})"