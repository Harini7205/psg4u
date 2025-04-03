# cgpa/urls.py

from django.urls import path
from .views import SemesterGradesView,RegisterView, LoginView, LogoutView, predict_grades, send_otp, reset_password, verify_otp

urlpatterns = [
    path('semester/<int:semester_number>/', SemesterGradesView.as_view(), name='semester-grades'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('predict/', predict_grades, name='predict_grades'),
    path('send_otp/',send_otp, name="send_otp"),
    path('reset_password/',reset_password, name="reset_password"),
    path('verify_otp/',verify_otp,name='verify_otp')
]
