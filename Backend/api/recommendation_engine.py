from .models import Donor


def recommend_donors(blood_group, city):

    donors = Donor.objects.filter(
        blood_group=blood_group,
        availability=True
    ).order_by("-ai_score")

    same_city = []
    other_city = []

    for donor in donors:

        if donor.city.lower() == city.lower():
            same_city.append(donor)
        else:
            other_city.append(donor)

    return same_city + other_city