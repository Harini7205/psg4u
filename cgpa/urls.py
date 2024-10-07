# cgpa/urls.py

from django.urls import path
from .views import SemesterGradesView,RegisterView, LoginView, LogoutView

urlpatterns = [
    path('semester/<int:semester_number>/', SemesterGradesView.as_view(), name='semester-grades'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
