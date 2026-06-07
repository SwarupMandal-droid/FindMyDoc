"""
Seed script — creates 3 verified doctors + 1 pending doctor.
Run with: .venv\Scripts\python.exe manage.py shell < seed_doctors.py
"""
import django
from django.contrib.auth import get_user_model
from doctors.models import DoctorProfile

User = get_user_model()

DOCTORS = [
    {
        "email": "dr.sharma@example.com",
        "username": "drsharma",
        "first_name": "Rajesh",
        "last_name": "Sharma",
        "phone_number": "+91 98765 43210",
        "profile": {
            "specialization": "Cardiologist",
            "experience_years": 14,
            "qualification": "MBBS, MD (Cardiology), DM",
            "about_you": (
                "Senior consultant cardiologist with 14 years of experience "
                "in interventional cardiology. Specialises in angioplasty, "
                "pacemaker implantation, and heart failure management. "
                "Trained at AIIMS New Delhi."
            ),
            "clinic_name": "Heart & Soul Cardiac Centre",
            "clinic_address": "12-B, Park Street, Near Gariahat Road",
            "city": "Kolkata",
            "available_days": "MON,TUE,WED,FRI",
            "is_verified": True,
        },
    },
    {
        "email": "dr.mehta@example.com",
        "username": "drmehta",
        "first_name": "Priya",
        "last_name": "Mehta",
        "phone_number": "+91 91234 56789",
        "profile": {
            "specialization": "Orthopedist",
            "experience_years": 9,
            "qualification": "MBBS, MS (Orthopaedics)",
            "about_you": (
                "Experienced orthopaedic surgeon focusing on sports injuries, "
                "joint replacement, and spine disorders. "
                "Completed fellowship at St. George Hospital, London."
            ),
            "clinic_name": "Mumbai Bone & Joint Clinic",
            "clinic_address": "Sector 7, Andheri West, Near Infinity Mall",
            "city": "Mumbai",
            "available_days": "MON,WED,THU,SAT",
            "is_verified": True,
        },
    },
    {
        "email": "dr.iyer@example.com",
        "username": "driyer",
        "first_name": "Lakshmi",
        "last_name": "Iyer",
        "phone_number": "+91 94400 12345",
        "profile": {
            "specialization": "Dermatologist",
            "experience_years": 7,
            "qualification": "MBBS, MD (Dermatology)",
            "about_you": (
                "Consultant dermatologist specialising in acne, psoriasis, "
                "hair loss, and cosmetic dermatology procedures. Passionate "
                "about skin health education for patients."
            ),
            "clinic_name": "SkinFirst Derma Clinic",
            "clinic_address": "No. 45, Nungambakkam High Road",
            "city": "Chennai",
            "available_days": "TUE,THU,FRI,SAT",
            "is_verified": True,
        },
    },
    {
        # UNVERIFIED — must never appear in search results
        "email": "dr.pending@example.com",
        "username": "drpending",
        "first_name": "Pending",
        "last_name": "Doctor",
        "phone_number": "+91 00000 00000",
        "profile": {
            "specialization": "Neurologist",
            "experience_years": 3,
            "qualification": "MBBS",
            "about_you": "Awaiting admin verification.",
            "clinic_name": "Pending Clinic",
            "clinic_address": "Some address, City",
            "city": "Kolkata",
            "available_days": "MON",
            "is_verified": False,
        },
    },
]

created_count = 0
skipped_count = 0

for doc in DOCTORS:
    user, user_created = User.objects.get_or_create(
        email=doc["email"],
        defaults={
            "username": doc["username"],
            "first_name": doc["first_name"],
            "last_name": doc["last_name"],
            "phone_number": doc["phone_number"],
            "role": "DOCTOR",
        },
    )
    if user_created:
        user.set_password("Test@1234")
        user.save()

    profile_data = doc["profile"]
    _, profile_created = DoctorProfile.objects.get_or_create(
        user=user,
        defaults=profile_data,
    )

    status_tag = "VERIFIED" if profile_data["is_verified"] else "PENDING "
    action = "CREATED" if (user_created or profile_created) else "SKIPPED"
    print(f"  [{status_tag}] [{action}] Dr. {doc['first_name']} {doc['last_name']} — {profile_data['specialization']} — {profile_data['city']}")

    if user_created or profile_created:
        created_count += 1
    else:
        skipped_count += 1

print(f"\nDone. {created_count} created, {skipped_count} already existed.")
print("\nAll profiles in DB:")
for dp in DoctorProfile.objects.select_related("user").order_by("created_at"):
    tag = "VERIFIED" if dp.is_verified else "PENDING "
    print(f"  [{tag}] id={dp.pk}  Dr. {dp.user.first_name} {dp.user.last_name}  —  {dp.specialization}  —  {dp.city}")
