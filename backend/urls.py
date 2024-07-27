from django.urls import path, include
from rest_framework import routers
from .authentication_views import *
from .credit_card_views import *
from rest_framework.routers import DefaultRouter
from .expenses_views import *
from .debts_views import *
from .incomes_views import *
from .savings_views import *
from rest_framework_simplejwt.views import TokenRefreshView

# router = routers.DefaultRouter()
# router.register(r'savings', SavingsViewSet)
# router.register(r'debt', DebtViewSet)
# router.register(r'creditCard', CreditCardViewSet)
# router.register(r'revenues', RevenueViewSet)
# router.register(r'expenses', ExpensesViewSet) 


urlpatterns = [

    # path('finance/', include(router.urls)), # models viewset
    #user-----------------------------------------------
    path('auth/signin/', signin, name='signin'),
    path('auth/api/google-login/', google_login, name='google_login'),
    path('auth/signup/', signup, name='signup'),
    path('auth/reset_password/', reset_password, name='reset_password'),
    path('auth/change_password/<str:email>/<str:token>/', change_password, name='change_password'),
    path('auth/logout/', logout, name='logout'),
    path('auth/fetch_current_user_data/',fetch_current_user_data, name='fetch_current_user_data'),
    path('auth/edit_user/',edit_user, name='edit_user'),
    path('auth/supporting_mail/',supporting_mail, name='supporting_mail'),
    #tokens-----------------------------------------------
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
 

    #expenses-----------------------------------------------
    path('expenses/fetch_user_expenses/',fetch_user_expenses, name = 'fetch_user_expenses'),
    path('expenses/fetch_expenses_table/',fetch_expenses_table, name = 'fetch_expenses_table'),
    path('expenses/delete_expense/<uuid:expense_id>/', delete_expense, name='delete_expense'),
    path('expenses/get_all_expenses/', get_all_expenses, name = ' get_all_expenses'),
    path('expenses/add_expense/',add_expense, name = 'add_expense'),
    path('expenses/edit_expense/<uuid:expense_id>/', edit_expense, name='edit_expense'),
    path('expenses/search_expense/<str:input>/', search_expense, name='search_expense'),

    
    # incomes------------------------------------------------------
    path('incomes/fetch_user_incomes/',fetch_user_incomes, name = 'fetch_user_incomes'),
    path('incomes/get_all_incomes/',get_all_incomes, name = 'get_all_incomes'),
    path('incomes/delete_income/<uuid:income_id>/', delete_income, name='delete_income'),
    path('incomes/edit_income/<uuid:income_id>/', edit_income, name='edit_income'),
    path('incomes/add_income/',add_income, name='add_income'),
    # path('incomes/get_chosen_credit_card/<uuid:card_id>/', get_chosen_credit_card, name='get_chosen_credit_card'),
    
    # credit_cards------------------------------------------------------
    path('cards/get_credit_card/',get_credit_card, name = 'get_credit_card'),
    path('cards/get_active_credit_card/',get_active_credit_card, name = 'get_active_credit_card'),
    path('cards/delete_credit_card/<uuid:credit_card_id>/', delete_credit_card, name='delete_credit_card'),
    path('cards/add_credit_card/',add_credit_card, name = 'add_credit_card'),
    path('cards/edit_card/<uuid:card_id>/', edit_card, name='edit_card'),
    path('cards/get_expenses_per_credit_card/',get_expenses_per_credit_card, name='get_expenses_per_credit_card'),
   
    # debts------------------------------------------------------
    path('debts/get_all_debts/', get_all_debts, name = ' get_all_debts'),
    path('debts/delete_debt/<uuid:debt_id>/', delete_debt, name='delete_credit_card'),
    path('debts/add_debt/',add_debt, name = 'add_debt'),
    path('debts/edit_debt/<uuid:debt_id>/', edit_debt, name='edit_debt'),

    # savings------------------------------------------------------
    path('savings/get_all_savings/', get_all_savings, name = ' get_all_savings'), 
    path('savings/delete_saving/<uuid:saving_id>/', delete_saving, name='delete_credit_card'),
    path('savings/add_saving/',add_saving, name = 'add_saving'),
    path('savings/edit_saving/<uuid:saving_id>/', edit_saving, name='edit_saving'),


    

]


