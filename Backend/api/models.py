from django.db import models


class Donor(models.Model):

    name = models.CharField(max_length=100)

    age = models.IntegerField(default=18)

    gender = models.CharField(max_length=20)

    blood_group = models.CharField(max_length=10)

    city = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    availability = models.BooleanField(default=True)

    donation_count = models.IntegerField(default=0)

    last_donation = models.DateField(null=True, blank=True)

    # AI Fields
    ai_score = models.FloatField(default=0)

    priority_level = models.CharField(
        max_length=20,
        default="Medium"
    )

    def __str__(self):
        return self.name
    
class BloodRequest(models.Model):

    patient_name = models.CharField(max_length=100)

    blood_group = models.CharField(max_length=10)

    city = models.CharField(max_length=100)

    hospital = models.CharField(max_length=100)

    units_required = models.IntegerField(default=1)

    emergency = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.patient_name