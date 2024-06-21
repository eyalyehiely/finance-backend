from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.decorators import api_view
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




#add
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_credit_card(request):
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)
        request.data['user_id'] = user_id
        request.data['family_id'] = user.family_id
        request.data['created_at'] = timezone.now().date()
        request.data['day_of_charge'] = int(request.data['day_of_charge'])

        status = request.data.get('status', None)
        if not status:
            return Response({'error': {'status': ['This field is required.']}}, status=400)
        if status not in dict(CreditCardSerializer.STATUS_CHOICES):
            return Response({'error': {'status': [f'"{status}" is not a valid choice.']}}, status=400)

        serializer = CreditCardSerializer(data=request.data)
        if serializer.is_valid():
            card = serializer.save()
            logger.debug('Credit card added successfully.')
            return Response({'successful': 'Credit card added'}, status=201)
        else:
            logger.debug(f'Credit card not added: {serializer.errors}')
            return Response({'error': serializer.errors}, status=400)
        
    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    except Exception as e:
        logger.exception('An error occurred while adding the credit card.')
        return Response({'error': 'An internal error occurred.'}, status=500)



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


#get all  credit cards per user 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_credit_card(request):
    user_id= request.user.id
    try:
        credit_cards = CreditCard.objects.filter(user_id=user_id,)
        serializer = CreditCardSerializer(credit_cards,many=True)
        return Response({
        'status':200,
        'credit_cards':serializer.data,
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
def edit_card(request, card_id):
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)

        # Retrieve data from the request
        name = request.data.get('name', '')
        day_of_charge = request.data.get('day_of_charge', '')
        credit_type = request.data.get('credit_type', '')
        line_of_credit = request.data.get('line_of_credit', '')
        last_four_digits = request.data.get('last_four_digits', '')
        status = request.data.get('status', '')



        # Retrieve and update the card
        card = CreditCard.objects.get(id=card_id)
        card.user = user  
        card.family = Family(user.family)  
        card.name = name
        card.day_of_charge = day_of_charge
        card.credit_type = credit_type
        card.line_of_credit = line_of_credit
        card.last_four_digits = last_four_digits
        card.status = status
        card.updated_at = timezone.now()
        card.save()

        return Response({'status': 200, 'message': 'card updated'})

    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    except CreditCard.DoesNotExist:
        return Response({'error': 'card does not exist'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


#get chosen card
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chosen_credit_card(request,card_id):
    user_id= request.user.id
    try:
        
        credit_cards = CreditCard.objects.filter(user_id=user_id)
        serializer = CreditCardSerializer(credit_cards)
        return Response({
        'status':200,
        'chosen_card':serializer.data,
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)
    
    except CreditCard.DoesNotExist:
        return Response({"error": "Credit card not found"}, status=status.HTTP_404_NOT_FOUND)






#get all active credit cards per user 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_active_credit_card(request):
    user_id= request.user.id
    try:
        credit_cards = CreditCard.objects.filter(user_id=user_id,status='Active')
        serializer = CreditCardSerializer(credit_cards,many=True)
        return Response({
        'status':200,
        'credit_cards':serializer.data,
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug: Print the error message
        return Response({
            'status': 500,
            'message': 'An error occurred while fetching data.',
            'error': str(e)
        }, status=500)
# -------------------------------------------------------------------------------
    # TODO: fix this view
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def reset_credit_card_transactions(self):
    today = timezone.now()
    day_of_month = today.day
    time = day_of_month.strftime("%00:%00")
    if day_of_month == 1 & time:
        CreditCard.credit_left = CreditCard.line_of_credit
        CreditCard.debit_left = 0
        CreditCard.amount_to_charge = 0









