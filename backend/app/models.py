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

class Subsemester(models.Model):
    subject_name = models.CharField(max_length=255)
    semester = models.IntegerField()
    class Meta:
        db_table = 'app_subsemesters'

class Resource(models.Model):
    subject = models.CharField(max_length=255)
    url = models.URLField()
    class Meta:
        db_table ='app_resources'