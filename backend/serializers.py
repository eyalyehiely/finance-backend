from rest_framework import serializers
# from rest_framework.authtoken.admin import User
from .models import *
from users.models import Family
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

#this file take a place in the presenting data in the api

class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = '__all__'


# get all data for loans
# class LoanSerializer(serializers.ModelSerializer):
#     calc_month_left = serializers.SerializerMethodField()
#     calc_total_amount = serializers.SerializerMethodField()
#     calc_month_payment = serializers.SerializerMethodField()
#     calc_payed_amount = serializers.SerializerMethodField()

#     class Meta:
#         model = Loans
#         fields = '__all__'

#     def get_calc_month_left(self, obj):
#         return obj.calc_month_left

#     def get_calc_total_amount(self, obj):
#         return obj.calc_total_amount

#     def get_calc_month_payment(self, obj):
#         return obj.calc_month_payment

#     def get_calc_payed_amount(self, obj):
#         return obj.calc_payed_amount


class DebtSerializer(serializers.ModelSerializer):
    calc_total_amount = serializers.SerializerMethodField()
    calc_payed_amount = serializers.SerializerMethodField()
    calc_month_payment = serializers.SerializerMethodField()
    num_month_payed = serializers.SerializerMethodField()

    class Meta:
        model = Debts
        fields = '__all__'

    def get_calc_total_amount(self, obj):
        return obj.calc_total_amount

    def get_calc_payed_amount(self, obj):
        return obj.calc_payed_amount

    def get_calc_month_payment(self, obj):
        return obj.calc_month_payment

    def get_num_month_payed(self, obj):
        return obj.num_month_payed


class CreditCardSerializer(serializers.ModelSerializer):
    last_four_digits = serializers.CharField(max_length=5)


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
    
    
    # def amount_to_charge(self, obj):
    #     return obj.amount_to_charge


    # def depending_charges(self,obj):
    #     return obj.depending_charges


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
    