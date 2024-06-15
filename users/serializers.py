from rest_framework import serializers
from rest_framework.authtoken.admin import User
from .models import CustomUser
from .family_models import Family

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'