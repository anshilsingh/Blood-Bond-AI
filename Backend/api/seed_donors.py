import os
import sys
import django
import random

from faker import Faker
from datetime import timedelta
from django.utils.timezone import now

# ADD PROJECT ROOT TO PATH
sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

# DJANGO SETTINGS
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "backend.settings"
)

django.setup()

# IMPORT MODEL
from api.models import Donor

print("DJANGO CONNECTED")

fake = Faker()

blood_groups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
]

cities = [
    "Delhi",
    "Mumbai",
    "Indore",
    "Bhopal",
    "Pune",
    "Lucknow",
    "Jaipur",
]

genders = [
    "Male",
    "Female",
]

for i in range(100):

    Donor.objects.create(

        name=fake.name(),

        age=random.randint(18, 60),

        gender=random.choice(genders),

        blood_group=random.choice(blood_groups),

        city=random.choice(cities),

        phone=str(random.randint(6000000000, 9999999999)),

        availability=random.choice([True, False]),

        donation_count=random.randint(1, 15),

        last_donation=(
            now().date() -
            timedelta(days=random.randint(1, 300))
        )

    )

print("100 DONORS ADDED SUCCESSFULLY")