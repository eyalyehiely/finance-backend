from django.contrib import admin
from django.conf import settings
from django.contrib.admin.views.decorators import staff_member_required
from .models import CustomUser
# from .business import Business

# admin.site.login = staff_member_required(
# admin.site.login, login_url=settings.LOGIN_REDIRECT_URL
# )

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id','username','password', 'first_name', 'last_name', 'gender', 'life_status','num_of_children', 'phone_number', 'birth_date', 'profession', 'address','date_joined')
    actions=['edit_user','search_user',]

admin.site.register(CustomUser, CustomUserAdmin)






# class BusinessAdmin(admin.ModelAdmin):
#     readonly_fields = ('business_id',)
#     list_display = ('business_id','name','total_expenses_calculation', 'credit_cards_expenses', 'total_savings_calculation', 'total_income_calculation', 'is_negative', 'created_at', 'updated_at')
#
# admin.site.register(Business, BusinessAdmin)
#



