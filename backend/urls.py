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

router = routers.DefaultRouter()
router.register(r'savings', SavingsViewSet)
router.register(r'debt', DebtViewSet)
router.register(r'creditCard', CreditCardViewSet)
router.register(r'revenues', RevenueViewSet)
router.register(r'expenses', ExpensesViewSet)


urlpatterns = [

    path('finance/', include(router.urls)), # models viewset
    #user-----------------------------------------------
    path('signin/', signin, name='signin'),
    path('signup/', signup, name='signup'),
    path('reset_password/', reset_password, name='reset_password'),
    path('change_password/', change_password, name='change_password'),
    path('logout/', logout, name='logout'),

    #tokens-----------------------------------------------
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
 

    #expenses-----------------------------------------------
    path('fetch_user_expenses/',fetch_user_expenses, name = 'fetch_user_expenses'),
    path('fetch_expenses_table/',fetch_expenses_table, name = 'fetch_expenses_table'),
    path('delete_expense/<uuid:expense_id>/', delete_expense, name='delete_expense'),
    path('get_all_expenses/', get_all_expenses, name = ' get_all_expenses'),
    path('add_expense/',add_expense, name = 'add_expense'),
    path('edit_expense/<uuid:expense_id>/', edit_expense, name='edit_expense'),
    # incomes------------------------------------------------------
    path('fetch_user_incomes/',fetch_user_incomes, name = 'fetch_user_incomes'),
    path('get_all_incomes/',get_all_incomes, name = 'get_all_incomes'),
    path('delete_income/<uuid:income_id>/', delete_income, name='delete_income'),
    path('edit_income/<uuid:income_id>/', edit_income, name='edit_income'),
    path('add_income/',add_income, name='add_income'),
    path('get_chosen_credit_card/<uuid:card_id>/', get_chosen_credit_card, name='get_chosen_credit_card'),
    
    # credit_cards------------------------------------------------------
    path('get_credit_card/',get_credit_card, name = 'get_credit_card'),
    path('delete_credit_card/<uuid:credit_card_id>/', delete_credit_card, name='delete_credit_card'),
    path('add_credit_card/',add_credit_card, name = 'add_credit_card'),
    path('edit_expense/<uuid:expense_id>/', edit_expense, name='edit_expense'),
    # debs------------------------------------------------------
    path('get_all_debts/', get_all_debts, name = ' get_all_debts'),
    path('delete_debt/<uuid:debt_id>/', delete_debt, name='delete_credit_card'),
    path('add_debt/',add_debt, name = 'add_debt'),
    path('edit_debt/<uuid:debt_id>/', edit_debt, name='edit_debt'),

    # savings------------------------------------------------------
    path('get_all_savings/', get_all_savings, name = ' get_all_savings'), 
    path('delete_saving/<uuid:saving_id>/', delete_saving, name='delete_credit_card'),
    path('add_saving/',add_saving, name = 'add_saving'),
    path('edit_saving/<uuid:saving_id>/', edit_saving, name='edit_saving'),



    path('reset_credit_card_transactions/',reset_credit_card_transactions,name = 'reset_credit_card_transactions'),
    path('hello-world/',hello_world, name='hello_world'),
    path('dashboard/', dashboard, name='dashboard'),
    

 ]
#TODO: fix swagger route


