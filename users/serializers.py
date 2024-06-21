from rest_framework import serializers
from rest_framework.authtoken.admin import User
from .models import CustomUser
from .family_models import Family

from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'gender', 'life_status','num_of_children', 'family', 'phone_number', 'birth_date','age', 'profession', 'address', 'updated_at']

    def get_age(self,obj):
        return obj.age
    


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'