#this file take a place in the presenting data in the api

from rest_framework import serializers
from .models import *
from users.models import Family
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SavingsSerializer(serializers.ModelSerializer):
    total_saving_amount = serializers.SerializerMethodField()
    earnings = serializers.SerializerMethodField()


    class Meta:
        model = Savings
        fields = '__all__'

    def get_total_saving_amount(self, obj):
        return round(obj.total_saving_amount, 2)

    def get_earnings(self, obj):
        return round(obj.earnings, 2)
    
    





class DebtSerializer(serializers.ModelSerializer):
    # payed_amount = serializers.SerializerMethodField()
    # month_payment = serializers.SerializerMethodField()
    # month_payed = serializers.SerializerMethodField()
    # num_of_months = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Debts
        fields = '__all__' 

        


    # def get_payed_amount(self, obj):
    #     return obj.payed_amount

    # def get_month_payment(self, obj):
    #     return obj.month_payment

    # def get_month_payed(self, obj):
    #     return obj.month_payed

    # def get_num_of_months(self, obj):
    #     return obj.num_of_months

    def get_total_amount(self, obj):
        return round(obj.total_amount, 2)




class CreditCardSerializer(serializers.ModelSerializer):
    DAY_CHOICES = (
        (1, '2'),
        (2, '10'),
        (3, '15'),

    )
    day_of_charge = serializers.ChoiceField(choices=DAY_CHOICES)
    last_four_digits = serializers.CharField(max_length=4)
    
    class Meta:
        model = CreditCard
        fields = '__all__'

    def validate_last_four_digits(self, value):
        """
        Validate that the last_four_digits field has exactly 4 digits.
        """
        if len(value) != 4 or not value.isdigit():
            raise serializers.ValidationError("last_four_digits must be exactly 4 digits.")
        return value


class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expenses
        fields = '__all__'

    def date(self, obj):
        return obj.date


class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenues
        fields = '__all__'


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    