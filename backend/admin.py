from django.contrib import admin
from .models import *

class SavingsAdmin(admin.ModelAdmin):
    # readonly_fields = ('id',)
    list_display = ('id','user_id','family_id','saving_type','amount','interest','earnings','total_saving_amount','starting_date','finish_date','num_of_months', 'created_at', 'updated_at')
admin.site.register(Savings, SavingsAdmin)



class DebtAdmin(admin.ModelAdmin):
    # readonly_fields = ('id',)
    list_display = ('id','user_id','family_id','name','amount','line_of_debt','interest','num_of_months','total_amount','payed_amount', 'month_payment', 'month_payed','starting_date','finish_date', 'created_at', 'updated_at')
admin.site.register(Debts, DebtAdmin)


class ExpensesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id','user_id','family_id','payment_method','expense_type','date_and_time','name','category','price','credit_card', 'total_expense', 'created_at', 'updated_at')
admin.site.register(Expenses, ExpensesAdmin)


class RevenuesAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id','user_id','family_id','source','amount', 'created_at', 'updated_at')
admin.site.register(Revenues, RevenuesAdmin)



class CreditCardAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id','user_id','family_id','name','last_four_digits','day_of_charge','credit_type','line_of_credit','amount_to_charge','rate','depending_charges','status', 'created_at', 'updated_at')
admin.site.register(CreditCard, CreditCardAdmin)

