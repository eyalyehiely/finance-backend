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
def add_credit_card(request):
    try:
        user_id= request.user.id
        user = CustomUser.objects.get(id=user_id)
        name = request.data.get('name', '')
        day_of_charge = request.data.get('day_of_charge', '')
        credit_type = request.data.get('credit_type', '')
        line_of_credit = request.data.get('line_of_credit', '')
        last_four_digits = request.data.get('last_four_digits', '')
        status = request.data.get('status', '')

      
        # Create the credit_card
        credit_card = CreditCard.objects.create(
            user_id=CustomUser(user_id),  # Assign the user instance directly
            family_id= Family(user.family_id),
            name=name,
            day_of_charge=day_of_charge, 
            credit_type=credit_type,
            line_of_credit=line_of_credit,
            last_four_digits=last_four_digits,
            status=status,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        credit_card.save()
        logger.debug('Credit card added')
        return JsonResponse({'successful': 'Credit card added'})
        
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.debug(f'Credit card not added: {str(e)}')
        return JsonResponse({'error': str(e)}, status=500)
    


#delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_credit_card(request, credit_card_id):
    try:
        credit_card = CreditCard.objects.get(id=credit_card_id)
        credit_card.delete()
        return Response({"message": "Credit card deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except CreditCard.DoesNotExist:
        return Response({"error": "Credit card not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#get all credit cards per user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_credit_card(request):
    user_id= request.user.id
    try:
        credit_cards = CreditCard.objects.filter(user_id=user_id)
        credit_cards_list = [{'id': card.id, 'name': card.name,'day_of_charge':card.day_of_charge,'credit_type':card.credit_type,'line_of_credit':card.line_of_credit,'last_four_digits':card.last_four_digits,'amount_to_charge': card.amount_to_charge,'credit_type':card.credit_type,'status':card.status} for card in credit_cards]
        return JsonResponse(
        {
        'status':200,
        'credit_cards':credit_cards_list,
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return JsonResponse({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)
    






#get chosen card
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_chosen_credit_card(request,card_id):
    
    try:
        credit_card = CreditCard.objects.filter(id=card_id)
        chosen_credit_card = [{'id': card.id, 'name': card.name,'day_of_charge':card.day_of_charge,'credit_type':card.credit_type,'line_of_credit':card.line_of_credit,'last_four_digits':card.last_four_digits,'amount_to_charge': card.amount_to_charge,'credit_type':card.credit_type,'status':card.status}for card in credit_card]
        if credit_card.exists():
            return JsonResponse(
            {
            'status':200,
            'chosen_credit_card':chosen_credit_card,
            })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return JsonResponse({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)

# -------------------------------------------------------------------------------
    # TODO: fix this view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_credit_card_transactions(self):
    today = timezone.now()
    day_of_month = today.day
    time = day_of_month.strftime("%00:%00")
    if day_of_month == 1 & time:
        CreditCard.credit_left = CreditCard.line_of_credit
        CreditCard.debit_left = 0
        CreditCard.amount_to_charge = 0









