from django.http import JsonResponse
from django.views import View

from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import random
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subsemester, Resource

# Store OTPs temporarily (you can use a database model instead)

data = pd.read_csv("grades_dataset.csv")

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection

@api_view(['GET'])
def get_subjects(request):
    semester_no = request.GET.get('semester_no')
    
    if not semester_no:
        return Response({"error": "Semester number is required"}, status=400)

    with connection.cursor() as cursor:
        cursor.execute("SELECT subject_name FROM subjects WHERE semester = %s", [semester_no])
        subjects = [row[0] for row in cursor.fetchall()]

    return Response({"subjects": subjects}, status=200)

class SemesterGradesView(View):
    def get(self, request, semester_number):
        # Sample grades data for each semester
        semester_data = {
            1: [
                {"subject_name": "Calculus", "credits": 4, "grade": None},
                {"subject_name": "Electronics", "credits": 3, "grade": None},
                {"subject_name": "Chemistry", "credits": 3, "grade": None},
                {"subject_name": "CT", "credits": 3, "grade": None},
                {"subject_name": "English", "credits": 3, "grade": None},
                {"subject_name": "Python Lab", "credits": 2, "grade": None},
                {"subject_name": "Engineering Practices", "credits": 1, "grade": None},
                {"subject_name": "Basic Science Lab", "credits": 2, "grade": None},
            ],
            2: [
                {"subject_name": "Transforms", "credits": 4, "grade": None},
                {"subject_name": "COA", "credits": 4, "grade": None},
                {"subject_name": "Material Science", "credits": 3, "grade": None},
                {"subject_name": "Discrete Mathematics", "credits": 3, "grade": None},
                {"subject_name": "Chemistry", "credits": 2, "grade": None},
                {"subject_name": "C Lab", "credits": 2, "grade": None},
                {"subject_name": "Engineering Graphics", "credits": 2, "grade": None},
            ],
            3: [
                {"subject_name": "Linear Algebra", "credits": 4, "grade": None},
                {"subject_name": "Probability", "credits": 4, "grade": None},
                {"subject_name": "Data Structures", "credits": 4, "grade": None},
                {"subject_name": "Software Engineering", "credits": 3, "grade": None},
                {"subject_name": "PPL", "credits": 4, "grade": None},
                {"subject_name": "Economics", "credits": 3, "grade": None},
                {"subject_name": "DS Lab", "credits": 2, "grade": None},
                {"subject_name": "Java Lab", "credits": 2, "grade": None},
            ],
            4: [
                {"subject_name": "Optimization Techniques", "credits": 3, "grade": None},
                {"subject_name": "DAA", "credits": 3, "grade": None},
                {"subject_name": "Operating Systems", "credits": 4, "grade": None},
                {"subject_name": "Machine Learning - I", "credits": 3, "grade": None},
                {"subject_name": "Database Systems", "credits": 3, "grade": None},
                {"subject_name": "ML Lab", "credits": 2, "grade": None},
                {"subject_name": "DBS Lab", "credits": 2, "grade": None},
            ],
            5: [
                {"subject_name": "Artificial Intelligence", "credits": 4, "grade": None},
                {"subject_name": "Deep Learning", "credits": 3, "grade": None},
                {"subject_name": "Computer Networks", "credits": 4, "grade": None},
                {"subject_name": "Machine Learning - II", "credits": 4, "grade": None},
                {"subject_name": "Design Thinking", "credits": 3, "grade": None},
                {"subject_name": "Deep Learning Lab", "credits": 2, "grade": None},
                {"subject_name": "App Dev Lab", "credits": 2, "grade": None},
            ],
        }

        # Fetch the grades for the specified semester
        grades = semester_data.get(semester_number, [])
        return JsonResponse({'subjects': grades})


# Registration View
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Successful login
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            # Invalid credentials
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'Logout successful'}, status=200)
    
def predict_ca2_and_sem_grades(ca1_marks, current_cgpa, expected_cgpa):
    X = data[['ca1']].values.reshape(-1, 1)
    y_ca2 = data['ca2'].values
    y_semester = data['semester'].values

    model_ca2 = LinearRegression()
    model_semester = LinearRegression()

    model_ca2.fit(X, y_ca2)
    model_semester.fit(X, y_semester)

    ca2_marks = model_ca2.predict(np.array(ca1_marks).reshape(-1, 1))
    semester_grades = model_semester.predict(np.array(ca1_marks).reshape(-1, 1))

    total_marks_needed = expected_cgpa * len(ca1_marks) * 10  
    current_total_marks = current_cgpa * len(ca1_marks) * 10
    required_marks = total_marks_needed - current_total_marks

    for i in range(len(semester_grades)):
        total = ca2_marks[i] + semester_grades[i]
        if total < required_marks:
            additional_needed = required_marks - total
            semester_grades[i] += additional_needed / len(semester_grades)

    ca2_marks = np.clip(ca2_marks, 0, 50)
    semester_grades = np.clip(semester_grades, 0, 100)

    return ca2_marks.tolist(), semester_grades.tolist()

@api_view(['POST'])
def predict_grades(request):
    ca1_marks = request.data.get("ca1_marks", [])
    current_cgpa = request.data.get("current_cgpa", 7.0)
    expected_cgpa = request.data.get("expected_cgpa", 8.0)

    ca2_marks, semester_grades = predict_ca2_and_sem_grades(ca1_marks, current_cgpa, expected_cgpa)

    return Response({
        "ca2_marks": ca2_marks,
        "semester_grades": semester_grades,
    })

# Temporary storage for OTPs (Consider using Redis or database for production)
otp_storage = {}

@api_view(['POST'])
def send_otp(request):
    """ Send OTP to the provided email """
    email = request.data.get("email")

    otp = random.randint(100000, 999999)
    otp_storage[email] = otp  # Store OTP temporarily
    # Send OTP via email
    send_mail(
        'Password Reset OTP',
        f'Your OTP for password reset is {otp}. Do not share it with anyone.',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def verify_otp(request):
    """ Verify OTP entered by the user """
    email = request.data.get("email")
    otp = int(request.data.get("otp"))
    if email in otp_storage and otp_storage[email] == otp:
        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def reset_password(request):
    """ Reset the password using username after OTP verification """
    username = request.data.get("username")
    new_password = request.data.get("new_password")

    try:
        user = User.objects.get(username=username)  # Find user by username
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def get_subjects_by_semester(request, semester):
    if request.method == "GET":
        subjects = Subsemester.objects.filter(semester=semester).values_list("subject_name", flat=True)
        dict={}
        for subject in subjects:
            resources = Resource.objects.filter(subject=subject).values_list("url", flat=True)
            dict[subject]=list(resources)
        return JsonResponse(dict, safe=False)