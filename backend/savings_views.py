import datetime
from django.http import  JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SavingsSerializer
import logging
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Savings
from users.models import CustomUser
from users.family_models import Family




current_datetime = timezone.now()
current_month = current_datetime.month
current_year = current_datetime.year
current_day = current_datetime.day
logger = logging.getLogger('backend')



# savings


# fetch all savings in all time
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_savings(request):

    user_id= request.user.id
    try:
        
        saving = Savings.objects.filter(user_id=user_id)
        serializer = SavingsSerializer(saving,many=True)
        return Response({
        'status':200,
        'all_saving':serializer.data,
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
def add_saving(request):
    user_id= request.user.id
    try:
        
        user = CustomUser.objects.get(id=user_id)
        saving_type = request.data.get('saving_type', '')
        interest = request.data.get('interest', '')
        amount = request.data.get('amount', '')
        starting_date = request.data.get('starting_date', '')
        finish_date = request.data.get('finish_date', '')


      
        # Create the saving
        saving = Savings.objects.create(
            user_id=CustomUser(user_id),  # Assign the user instance directly
            family_id= Family(user.family_id),
            saving_type=saving_type, 
            interest=interest,
            amount=amount,
            starting_date=starting_date,
            finish_date = finish_date,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        saving.save()
        logger.debug('saving added')
        return JsonResponse({'successful': 'saving added'})
        
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'saving not added: {str(e)}')
        return JsonResponse({'error': str(e)}, status=500)
    

#delete
@api_view(['DELETE'])
def delete_saving(request, saving_id):
    try:
        saving = Savings.objects.get(id=saving_id)
        saving.delete()
        return Response({"message": "saving deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Savings.DoesNotExist:
        return Response({"error": "saving not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#edit
@api_view(['PUT'])
def edit_saving(request, saving_id):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        saving_type = request.data.get('saving_type', '')
        interest = request.data.get('interest', '')
        amount = request.data.get('amount', '')
        starting_date = request.data.get('starting_date', '')
        finish_date = request.data.get('finish_date', '')

        # Check if the amount is not empty
        amount =float(amount)
        if not amount:
            return JsonResponse({'error': 'Amount field cannot be empty'}, status=400)

        # Parse dates from request data
        starting_date_obj = datetime.datetime.strptime(starting_date, "%Y-%m-%d")
        finish_date_obj = datetime.datetime.strptime(finish_date, "%Y-%m-%d")


        # Create or update the saving
        saving, created = Savings.objects.get_or_create(id=saving_id)
        saving.user_id = CustomUser(user_id)
        saving.family_id = user.family_id
        saving.saving_type = saving_type
        saving.interest = interest
        saving.amount = amount  # Convert amount to float
        saving.starting_date = starting_date_obj
        saving.finish_date = finish_date_obj
        saving.updated_at = timezone.now()
        saving.save()

        return JsonResponse({'status':200,'message': 'saving updated'})

    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)