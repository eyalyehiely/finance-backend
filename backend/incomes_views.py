import datetime
from django.http import  JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RevenueSerializer
import logging
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import *


# general 
current_datetime = timezone.now()
current_month = current_datetime.month
current_year = current_datetime.year
current_day = current_datetime.day
logger = logging.getLogger('backend')



# incomes

# fetch user incomes for the current_month revenus and savings 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_user_incomes(request):
    try:
        
        # Get all data records for the given user_id
        user_id= request.user.id
        
        current_month_revenues = Revenues.objects.filter(user_id=user_id,date__month=current_month,date__year=current_year)
        current_month_savings = Savings.objects.filter(user_id=user_id,finish_date__year__gte=current_year,finish_date__month__gte=current_month)
        #filtering & calculating...
        revenues_amount = sum([data.amount for data in current_month_revenues])
        savings_amount = round(sum([(data.amount + data.earnings) for data in current_month_savings]), 3)
        
        return JsonResponse({
            'status': 200,
            'month_revenues': revenues_amount,
            'month_savings':savings_amount
        }, status=200)
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return JsonResponse({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)
    

# fetch all incomes in all time
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_incomes(request):
    user_id= request.user.id
    try:
        
        incomes = Revenues.objects.filter(user_id=user_id)
        serializer = RevenueSerializer(incomes,many=True)
        return Response({
        'status':200,
        'all_incomes':serializer.data,
        })
        
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
def add_income(request):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        source = request.data.get('source', '')
        amount = request.data.get('amount', '')
        date = request.data.get('date', '')
        

      
        # Create the income
        revenue = Revenues.objects.create(
            user_id=CustomUser(user_id),  # Assign the user instance directly
            family_id=Family(user.family_id),
            source=source, 
            amount=amount,
            date=date,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        revenue.save()
        logger.debug('Income added')
        return JsonResponse({'successful': 'Income added'})
        
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'Income not added: {str(e)}')
        return JsonResponse({'error': str(e)}, status=500)
    

#delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_income(request, income_id):
    try:
        income = Revenues.objects.get(id=income_id)
        income.delete()
        return Response({"message": "income deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Revenues.DoesNotExist:
        return Response({"error": "income not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_income(request, income_id):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        source = request.data.get('source', '')
        amount = request.data.get('amount', '')
        date = request.data.get('date', '')

        # Check if the amount is not empty
        amount =float(amount)
        if not amount:
            return JsonResponse({'error': 'Amount field cannot be empty'}, status=400)

        # Parse dates from request data
        date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")


        # Create or update the income
        income, created = Revenues.objects.get_or_create(id=income_id)
        income.user_id = CustomUser(user_id)
        income.family_id = Family(user.family_id)
        income.source = source
        income.amount = amount  # Convert amount to float
        income.date = date_obj
        income.updated_at = timezone.now()
        income.save()

        return JsonResponse({'status':200,'message': 'income updated'})

    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)