from django.http import JsonResponse
from django.views import View

from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

from django.contrib.auth import logout

from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

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
                {"subject_name": "EG", "credits": 2, "grade": None},
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
                {"subject_name": "English", "credits": 2, "grade": None},
            ],
            4: [
                {"subject_name": "Optimization Techniques", "credits": 3, "grade": None},
                {"subject_name": "DAA", "credits": 3, "grade": None},
                {"subject_name": "Operating Systems", "credits": 4, "grade": None},
                {"subject_name": "Machine Learning - I", "credits": 3, "grade": None},
                {"subject_name": "Database Systems", "credits": 3, "grade": None},
                {"subject_name": "ML Lab", "credits": 2, "grade": None},
                {"subject_name": "DBS Lab", "credits": 2, "grade": None},
                {"subject_name": "English", "credits": 1, "grade": None},
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