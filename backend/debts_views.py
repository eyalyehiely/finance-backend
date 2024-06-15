from django.shortcuts import get_object_or_404
import jwt,datetime,json
from django.http import  JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
import logging
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from rest_framework import status




current_datetime = timezone.now()
current_month = current_datetime.month
current_year = current_datetime.year
current_day = current_datetime.day
logger = logging.getLogger('backend')



#add
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_debt(request):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        type = request.data.get('type', '')
        name = request.data.get('name', '')
        amount = request.data.get('amount', '')
        line_of_debt = request.data.get('line_of_debt', '')
        interest = request.data.get('interest', '')
        starting_date = request.data.get('starting_date', '')
        finish_date = request.data.get('finish_date', '')


      
        # Create the debt
        debt = Debts.objects.create(
            user_id=CustomUser(user_id),  # Assign the user instance directly
            family_id=user.family_id,
            name=name,
            type=type, 
            amount=amount,
            line_of_debt=line_of_debt,
            interest=interest,
            starting_date=starting_date,
            finish_date=finish_date,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        debt.save()
        logger.debug('Debt added')
        return JsonResponse({'successful': 'Debt added'})
        
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'Debt not added: {str(e)}')
        return JsonResponse({'error': str(e)}, status=500)





#get all debt per user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_debts(request):
   
    try:
        user_id= request.user.id
        debts = Debts.objects.filter(user_id=user_id)
        debts_list = [{'name': debt.name,'type':debt.type,'amount':debt.amount,'interest':debt.interest,'starting_date': debt.starting_date,'finish_date':debt.finish_date,'line_of_debt':debt.line_of_debt,'id': debt.id,'total_amount':round(debt.total_amount,2)} for debt in debts]
        return JsonResponse(
        {
        'status':200,
        'all_debts':debts_list,
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return JsonResponse({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)


#edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_debt(request, debt_id):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        type = request.data.get('type', '')
        name = request.data.get('name', '')
        amount = request.data.get('amount', '')
        interest = request.data.get('interest', '')
        starting_date = request.data.get('starting_date', '')
        finish_date = request.data.get('finish_date', '')

        # Check if the amount is not empty
        amount =float(amount)
        if not amount:
            return JsonResponse({'error': 'Amount field cannot be empty'}, status=400)

        # Parse dates from request data
        finish_date_obj = datetime.datetime.strptime(finish_date, "%Y-%m-%d")
        start_date_obj = datetime.datetime.strptime(starting_date, "%Y-%m-%d")

        # Create or update the debt
        debt = Debts.objects.get(id=debt_id)
        debt.user_id =CustomUser(user_id)
        debt.family_id = user.family_id
        debt.name = name
        debt.type = type
        debt.amount = amount  # Convert amount to float
        debt.line_of_debt = debt.line_of_debt  # Not sure where this value is coming from
        debt.interest = interest
        debt.starting_date = start_date_obj
        debt.finish_date = finish_date_obj
        debt.updated_at = timezone.now()
        debt.save()

        return JsonResponse({'status':200,'message': 'Debt updated'})

    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



#delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_debt(request, debt_id):
    try:
        debt = Debts.objects.get(id=debt_id)
        debt.delete()
        return Response({"message": "Debt deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Debts.DoesNotExist:
        return Response({"error": "Debt not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

