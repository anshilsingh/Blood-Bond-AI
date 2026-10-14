from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Donor
from .serializers import DonorSerializer, BloodRequestSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .ai_engine import calculate_ai_score, priority
from .models import BloodRequest
from .recommendation_engine import recommend_donors


# ---------------- DONOR APIs ----------------

@api_view(['GET'])
def get_donors(request):

    donors = Donor.objects.all()

    # Calculate AI score for every donor
    for donor in donors:
        donor.ai_score = calculate_ai_score(donor)
        donor.priority_level = priority(donor.ai_score)
        donor.save()

    # Sort by highest score
    donors = Donor.objects.all().order_by('-ai_score')

    serializer = DonorSerializer(donors, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_donor(request):

    serializer = DonorSerializer(data=request.data)

    if serializer.is_valid():
        donor = serializer.save()

        donor.ai_score = calculate_ai_score(donor)
        donor.priority_level = priority(donor.ai_score)

        donor.save()

        return Response(DonorSerializer(donor).data)

    return Response(serializer.errors)

@api_view(['POST'])
def create_request(request):

    serializer = BloodRequestSerializer(data=request.data)

    if serializer.is_valid():

        blood_request = serializer.save()

        donors = recommend_donors(
            blood_request.blood_group,
            blood_request.city
        )

        recommended = DonorSerializer(
            donors[:5],
            many=True
        )

        return Response({
            "request": serializer.data,
            "recommended_donors": recommended.data
        })

    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_donor(request, id):

    try:
        donor = Donor.objects.get(id=id)
        donor.delete()

        return Response({"message": "Deleted"})

    except Donor.DoesNotExist:
        return Response({"error": "Donor not found"})


@api_view(['PUT'])
def update_donor(request, id):

    try:
        donor = Donor.objects.get(id=id)

    except Donor.DoesNotExist:
        return Response({"error": "Donor not found"})

    serializer = DonorSerializer(donor, data=request.data)

    if serializer.is_valid():

        donor = serializer.save()

        donor.ai_score = calculate_ai_score(donor)
        donor.priority_level = priority(donor.ai_score)

        donor.save()

        return Response(DonorSerializer(donor).data)

    return Response(serializer.errors)


# ---------------- AUTH APIs ----------------

@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username & password required"})

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"})

    User.objects.create_user(username=username, password=password)

    return Response({"message": "User created"})


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Enter username & password"})

    user = authenticate(username=username, password=password)

    if user:
        return Response({"message": "Login successful"})

    return Response({"error": "Invalid credentials"})