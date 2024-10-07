# models.py
from django.db import models
from django.contrib.auth.models import User

class Semester(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    semester_number = models.IntegerField()

class Subject(models.Model):
    semester = models.ForeignKey(Semester, related_name='subjects', on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100)
    grade = models.FloatField()
    credits = models.FloatField()

