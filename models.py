from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import datetime





class CustomUser(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'זכר'),
        ('female', 'נקבה'),
        ('other', 'אחר'),
    ]

    LIFE_STATUS_CHOICES = [
        ('single', 'רווק/ה'),
        ('marriage', 'נשוי/ה'),
        ('divorce', 'גרוש/ה'),
    ]

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    life_status = models.CharField(max_length=50, choices=LIFE_STATUS_CHOICES)
    num_of_children = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=10)
    birth_date = models.DateField(default=datetime.date.today)
    profession = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)


    @property
    def age(self):
        today = timezone.now().date()
        user_age = today.year - self.birth_date.year - (
                    (today.month, today.day) < (self.birth_date.month, self.birth_date.day))
        return user_age

    def __str__(self):
        return f'{self.username}, {self.first_name} {self.last_name}, {self.phone_number}, {self.birth_date}, {self.id}, {self.gender}, {self.address}, {self.updated_at}, {self.age}'




