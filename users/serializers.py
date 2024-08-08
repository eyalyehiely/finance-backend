from rest_framework import serializers
from rest_framework.authtoken.admin import User
from .models import CustomUser




class CustomUserSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'gender', 'life_status',
                  'num_of_children', 'phone_number', 'birth_date', 'age',
                  'profession', 'address', 'updated_at']
        read_only_fields = ['id', 'updated_at']  # Make id and updated_at read-only

    def get_age(self, obj):
        return obj.age

    def validate_email(self, value):
        # Check if email already exists
        if self.instance and self.instance.email == value:
            return value  # If updating, email can remain unchanged

        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists.')
        return value


