from datetime import date

# Blood group rarity scores
RARITY_SCORE = {
    "O-": 30,
    "AB-": 28,
    "A-": 25,
    "B-": 25,
    "AB+": 20,
    "O+": 15,
    "A+": 10,
    "B+": 10
}


def age_score(age):
    if 18 <= age <= 40:
        return 10
    elif age <= 50:
        return 7
    return 5


def availability_score(available):
    return 20 if available else 0


def donation_score(count):
    if count >= 10:
        return 15
    elif count >= 5:
        return 10
    elif count >= 1:
        return 5
    return 0


def last_donation_score(last_date):
    if not last_date:
        return 20

    days = (date.today() - last_date).days

    if days >= 120:
        return 20
    elif days >= 90:
        return 15
    elif days >= 60:
        return 10
    return 0


def calculate_ai_score(donor):
    score = 0

    score += RARITY_SCORE.get(donor.blood_group, 10)
    score += age_score(donor.age)
    score += availability_score(donor.availability)
    score += donation_score(donor.donation_count)
    score += last_donation_score(donor.last_donation)

    return min(score, 100)


def priority(score):
    if score >= 80:
        return "Critical"
    elif score >= 60:
        return "High"
    elif score >= 40:
        return "Medium"
    else:
        return "Low"