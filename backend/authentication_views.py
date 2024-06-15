import json
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import  JsonResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from finance.settings import redis_client
from .serializers import *
from redis import Redis
import logging
from django.contrib.auth import authenticate,login as auth_login
from finance.settings import DEFAULT_FROM_EMAIL
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from users.serializers import CustomUserSerializer
from django.contrib.auth import logout as logut_method




logger = logging.getLogger('backend')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def signin(request):
        data = json.loads(request.body)
        username = data.get('username', '')
        password = data.get('password', '')

        logger.debug(f'Attempting login for username: {username}')

        if not CustomUser.objects.filter(username=username).exists():
            logger.debug('No user found')
            return JsonResponse({'status': 'error', 'message': 'Invalid Username'}, status=status.HTTP_400_BAD_REQUEST)


        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username
            access = refresh.access_token
            logger.debug(f'{username} logged in')
            return JsonResponse({
                'status': 200,
                'refresh': str(refresh),
                'access':str(access)
            },status=200)
        else:
            logger.debug('Error logging in')
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'}, status=401)









@api_view(['POST'])
def signup(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Save the user object created by the serializer

        user.set_password(request.data['password'])  # Set and hash password
        user.username = request.data.get('username', '')
        user.first_name = request.data.get('first_name','')
        user.last_name = request.data.get('last_name', '')
        user.email = request.data.get('email', '')
        user.gender = request.data.get('gender', '')  
        user.life_status = request.data.get('life_status', '')  
        user.phone_number = request.data.get('phone_number', '')
        user.birth_date = request.data.get('birth_date', '')
        user.profession = request.data.get('profession', '')  
        user.address = request.data.get('address', '')  
        
        user.save()  

        # Create a new token for the user
        refresh = RefreshToken.for_user(user)
        refresh['username'] = user.username
        access = refresh.access_token 

        return Response({
            'status':200,
            'refresh': str(refresh),
            'access':str(access)
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------------------------password handling------------------------------------------------------

@api_view(['POST'])
def reset_password(request):
    data = json.loads(request.body)
    username = data.get('username', '')
    email = data.get('email', '')

    try:
        user = CustomUser.objects.filter(username=username).exists()
        if user:
            # Generate and send password reset email
            send_password_reset_email(email=email)
            return JsonResponse({'status': 'email sent'}, status=200)
    except CustomUser.DoesNotExist:
        return JsonResponse({'status': 'user not found'}, status=401)


def send_password_reset_email(email):
    link = f"\n\n[Change Password](http://127.0.0.1:5173/change_password)\n\n"
    subject = "Reset Your Password"
    message = (
        f"Dear User,\n\n"
        f"You recently requested to reset your password for [finance app]. "
        f"Please use the following link to reset your password. "
        f"This link is only valid for the next 24 hours."
        f"{link}" 
        f"If you did not request a password reset, please ignore this email. "
        f"If you continue to receive this email or believe it was sent in error, "
        f"please contact our support team immediately.\n\n"
        f"Thank you,\n[Your Application Team]"
    )
    logger.debug('password reset email send successfully')
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [email], fail_silently=False)

#changing password
@api_view(['POST'])
def change_password(request):
    data = json.loads(request.body)
    username = data.get('username', '')
    new_password = data.get('new_password', '')
    try:
        user = CustomUser.objects.get(username=username)
        user.set_password(new_password)
        user.save()
        logger.debug('Password updated successfully')
        return JsonResponse({'success': 'Password updated successfully'})
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def logout(request):
    logut_method(request)
    return Response({"message": "User logged out successfully."})









class SavingsViewSet(viewsets.ModelViewSet):
    queryset = Savings.objects.all()
    serializer_class = SavingsSerializer
    permission_classes = [permissions.AllowAny]


class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debts.objects.all()
    serializer_class = DebtSerializer
    permission_classes = [permissions.AllowAny]


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [permissions.AllowAny]


class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenues.objects.all()
    serializer_class = RevenueSerializer
    permission_classes = [permissions.AllowAny]


class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.AllowAny]




# @cache_page(timeout=60 * 30)  # cache for 30 minutes
# @api_view(['GET'])
# def re1(request):
#     try:
#         # Retrieve the loan object from the database
#         loan = Loans.objects.get(name='loan1')

#         # Cache the loan name in Redis with a TTL of 15 seconds
#         redis_result = redis_client.setex(name='loan_name', value=loan.name, time=15)

#         # Return a response indicating the result of the Redis operation
#         if redis_result:
#             return Response("Loan name cached successfully")
#         else:
#             return Response("Failed to cache loan name", status=500)  # Internal Server Error
#     except Loans.DoesNotExist:
#         return Response("Loan not found", status=404)  # Not Found





#TODO: set logs to the example view



@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world'})


@api_view(['GET'])
def dashboard(request):
    return render(request, template_name='mosaic-react/eyal.html')



