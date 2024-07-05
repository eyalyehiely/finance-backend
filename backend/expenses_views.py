import datetime
from rest_framework.response import Response
from .serializers import *
import logging
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status




current_datetime = timezone.now()
current_month = current_datetime.month
current_year = current_datetime.year
current_day = current_datetime.day
logger = logging.getLogger('backend')




#fetch_user_expenses for current month
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_user_expenses(request):
   #TODO: find the logged in user id
    try:

        # Get all data records for the given user_id
        user_id = request.user.id
        current_month_debts = Debts.objects.filter(user_id=user_id,finish_date__year__gte=current_year,finish_date__month__gte=current_month)
        current_month_expenses = Expenses.objects.filter(user_id=user_id,date_and_time__month=current_month,date_and_time__year=current_year)
        current_month_credit_cards = Expenses.objects.filter(user_id=user_id,payment_method='כרטיס אשראי',date_and_time__month=current_month,date_and_time__year=current_year)
        current_month_cash = Expenses.objects.filter(user_id=user_id,payment_method='מזומן',date_and_time__month=current_month,date_and_time__year=current_year)
        current_month_check = Expenses.objects.filter(user_id=user_id,payment_method='צ׳ק',date_and_time__month=current_month,date_and_time__year=current_year)





        #filtering & calculating...
        debts_amount = round(sum([data.month_payment for data in current_month_debts]),2)
        expenses_amount = round(sum([data.price for data in current_month_expenses]),2)
        credit_cards_amount = round(sum([data.price for data in current_month_credit_cards]),2)
        cash_amount = round(sum([data.price for data in current_month_cash]),2)
        check_amount = round(sum([data.price for data in current_month_check]),2)
        all_expenses = round(expenses_amount+debts_amount+cash_amount+credit_cards_amount+check_amount)


        
        return Response({
            'status': 200,
            'credit_card':credit_cards_amount,
            'debts':debts_amount,
            'expenses':expenses_amount,
            'all_expenses':all_expenses,
            'cash':cash_amount,
            'check':check_amount,
            
        }, status=200)
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)


# fetch all expenses in all time
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_expenses(request):
   
    try:

        # Get all expense records for the given user_id
        user_id= request.user.id
        expenses = Expenses.objects.filter(user_id=user_id)
        # expenses = Expenses.objects.filter(user_id=id)


        # Sort expenses by price in descending order and get the top 3
        all_expenses = [{'name': expense.name,'payment_method': expense.payment_method,'price': expense.price,'date_and_time': expense.date_and_time,'id': expense.id}for expense in expenses]


        return Response({
            'status': 200,
            'all_expenses': all_expenses,
        }, status=200)

    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)

#add
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expense(request):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        payment_method = request.data.get('payment_method', '')
        expense_type = request.data.get('expense_type', '')
        date_and_time = request.data.get('date_and_time', '')
        name = request.data.get('name', '')
        category = request.data.get('category', '')
        price = request.data.get('price', '')
        credit_card = request.data.get('credit_card', '')

        
        

      
        # Create the expense
        expense = Expenses.objects.create(
            user_id=CustomUser(user_id),  # Assign the user instance directly
            payment_method=payment_method,
            expense_type=expense_type, 
            date_and_time=date_and_time,
            name=name,
            category=category,
            price=price,
            credit_card=CreditCard(credit_card),
            created_at=timezone.now(),
            updated_at=timezone.now(),
        )
        expense.save()
        logger.debug('expense added')
        return Response({'successful': 'expense added'})
        
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'expense not added: {str(e)}')
        return Response({'error': str(e)}, status=500)
    






# fetch top 3 expenses for the current month
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_expenses_table(request):
 
    try:
        current_datetime = datetime.datetime.now()
        current_month = current_datetime.month
        current_year = current_datetime.year

        # Get all expense records for the given user_id
        user_id= request.user.id
        expenses = Expenses.objects.filter(user_id=user_id, date_and_time__month=current_month, date_and_time__year=current_year)



        # Sort expenses by price in descending order and get the top 3
        sorted_expenses = sorted([[expense.name, expense.date_and_time, expense.payment_method, expense.price,expense.id] for expense in expenses], key=lambda x: x[3], reverse=True)[:3]

        return Response({
            'status': 200,
            'sorted_expenses': sorted_expenses,
        }, status=200)

    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_expense(request, expense_id):
    try:
        expense = Expenses.objects.get(id=expense_id)
        expense.delete()
        return Response({"message": "Expense deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Expenses.DoesNotExist:
        return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_expense(request, expense_id):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        payment_method = request.data.get('payment_method', '')
        date_and_time = request.data.get('date_and_time', '')
        name = request.data.get('name', '')
        credit_card = request.data.get('credit_card', '')
        price = request.data.get('price', '')
        expense_type = request.data.get('expense_type', '')
        category = request.data.get('category', '')
        
        

        # Check if the price is not empty
        price =float(price)
        if not price:
            return Response({'error': 'Amount field cannot be empty'}, status=400)

        # Parse dates from request data
        
        start_date_obj = datetime.datetime.strptime(date_and_time, "%Y-%m-%dT%H:%M:%SZ")

        # Create or update the expense
        expense, created = Expenses.objects.get_or_create(id=expense_id)
        expense.user_id = CustomUser(user_id)
        expense.payment_method = payment_method
        expense.expense_type = expense_type
        expense.date_and_time = start_date_obj
        expense.name = name
        expense.category=category
        expense.price = price
        credit_card = credit_card
        expense.updated_at = timezone.now()
        expense.save()

        return Response({'status':200,'message': 'expense updated'})

    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_expense(request, input):
    try:
        current_user_id = request.user.id
        user_expenses = Expenses.objects.filter(user_id_id=current_user_id)
        filtered_expenses = user_expenses.filter(name__icontains=input)
        expenses_list = list(filtered_expenses.values())
        return Response({'expenses': expenses_list})
    except Exception as e:
        return Response({'Error': str(e)})