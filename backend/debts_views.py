import datetime
from django.http import  JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DebtSerializer
import logging
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from users.models import CustomUser
from .models import Debts





current_datetime = timezone.now()
current_month = current_datetime.month
current_year = current_datetime.year
current_day = current_datetime.day
logger = logging.getLogger('backend')



#add

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_debt(request):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        request.data['user_id'] = user.id
        request.data['created_at'] = timezone.now().date()
        serializer = DebtSerializer(data=request.data)

        if serializer.is_valid():
            debt = serializer.save()
            logger.debug('Debt added')
            return Response({'successful': 'Debt added'})
        else:
            logger.debug(f'Debt not added: {str(serializer.errors)}')
            return Response({'error': str(serializer.errors)}, status=400)

    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'Debt not added: {str(e)}')
        return Response({'error': str(e)}, status=500)





#get all debt per user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_debts(request):
    user_id= request.user.id
    try:
        
        debts = Debts.objects.filter(user_id=user_id)
        serializer = DebtSerializer(debts,many=True)
        return Response({
        'status':200,
        'all_debts':serializer.data,
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)


#edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_debt(request, debt_id):
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)

        # Retrieve data from the request
        type = request.data.get('type', '')
        name = request.data.get('name', '')
        amount = request.data.get('amount', '')
        interest = request.data.get('interest', '')
        starting_date = request.data.get('starting_date', '')
        finish_date = request.data.get('finish_date', '')

        # Check if the required date fields are provided
        if not starting_date or not finish_date:
            return JsonResponse({'error': 'Starting date and finish date are required'}, status=400)

        # Parse dates from request data
        try:
            start_date_obj = datetime.datetime.strptime(starting_date, "%Y-%m-%d")
            finish_date_obj = datetime.datetime.strptime(finish_date, "%Y-%m-%d")
        except ValueError as e:
            return JsonResponse({'error': f'Invalid date format: {str(e)}'}, status=400)

        # Retrieve and update the debt
        debt = Debts.objects.get(id=debt_id)
        debt.user = user  
        debt.name = name
        debt.type = type
        debt.amount = float(amount)  
        debt.interest = interest
        debt.starting_date = start_date_obj
        debt.finish_date = finish_date_obj
        debt.updated_at = timezone.now()
        debt.save()

        return JsonResponse({'status': 200, 'message': 'Debt updated'})

    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Debts.DoesNotExist:
        return JsonResponse({'error': 'Debt does not exist'}, status=404)
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

