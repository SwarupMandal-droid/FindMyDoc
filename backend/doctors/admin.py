from django.contrib import admin
from .models import DoctorProfile

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    # Columns to show in the list view table
    list_display = ('get_doctor_name', 'specialization', 'city', 'is_verified', 'created_at')
    
    # Sidebar filters
    list_filter = ('is_verified', 'city', 'specialization')
    
    # Clickable actions to verify multiple doctors at once
    actions = ['approve_doctors']

    def get_doctor_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_doctor_name.short_description = 'Doctor Name'

    def approve_doctors(self, request, queryset):
        queryset.update(is_verified=True)
    approve_doctors.short_description = "Mark selected doctor applications as Verified"