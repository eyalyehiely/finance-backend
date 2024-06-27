import json,os,certifi,logging
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from redis import Redis
from django.contrib.auth import authenticate,login as auth_login
from finance.settings import DEFAULT_FROM_EMAIL
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from users.serializers import CustomUserSerializer
from django.contrib.auth import logout as logut_method
from rest_framework.permissions import IsAuthenticated
from finance.settings import ALLOWED_HOSTS



logger = logging.getLogger('users')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# username is 
@api_view(['POST'])
def signin(request):
        data = json.loads(request.body)
        username = data.get('username', '')
        password = data.get('password', '')

        logger.debug(f'Attempting login for username: {username}')

        if not CustomUser.objects.filter(username=username).exists():
            logger.debug('No user found')
            return Response({'status': 'error', 'message': 'Invalid Username'}, status=status.HTTP_400_BAD_REQUEST)


        # Authenticate user
        user = authenticate(request,username=username, password=password)
        if user is not None:
            auth_login(request, user)
            refresh = RefreshToken.for_user(user)
            refresh['first_name'] = user.first_name
            access = refresh.access_token
            logger.debug(f'{username} logged in')
            return Response({
                'status': 200,
                'refresh': str(refresh),
                'access':str(access)
            },status=200)
        else:
            logger.debug('Error logging in')
            return Response({'status': 'error', 'message': 'Invalid username or password'}, status=401)









@api_view(['POST'])
def signup(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Save the user object created by the serializer

        user.set_password(request.data['password'])  # Set and hash password
        user.username = request.data.get('email', '') #email
        user.first_name = request.data.get('first_name', '')
        user.last_name = request.data.get('last_name', '')
        user.gender = request.data.get('gender', '')  
        user.life_status = request.data.get('life_status', '')  
        user.num_of_chidren = int(request.data.get('num_of_children',''))
        user.phone_number = request.data.get('phone_number', '')
        user.birth_date = request.data.get('birth_date', '')
        user.profession = request.data.get('profession', '')  
        user.address = request.data.get('address', '')  
        logger.debug(f'user{user.username} created')
        user.save()  
        send_mail_for_signup(user.username) # got email
        # Create a new token for the user
        refresh = RefreshToken.for_user(user)
        refresh['first_name'] = user.first_name
        access = refresh.access_token 

        return Response({
            'status':200,
            'refresh': str(refresh),
            'access':str(access)
        })
    logger.debug(f'user not created')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------------------------password handling------------------------------------------------------





os.environ['SSL_CERT_FILE'] = certifi.where()


@api_view(['POST'])
def reset_password(request):
    data = request.data
    email = data.get('email', '')

    try:
        user_exists = CustomUser.objects.filter(username=email).exists()
        if user_exists:
            send_password_reset_email(email)
            logger.debug(f'Email to {email} sent successfully')
            return Response({'status': 'email sent'}, status=200)
        else:
            logger.debug(f'User {email} not found')
            return Response({'status': 'user not found'}, status=404)
    except Exception as e:
        logger.debug(f'Error: {e}')
        return Response({'status': 'error', 'message': str(e)}, status=500)


def send_password_reset_email(email):
    link = f"\n\n({ALLOWED_HOSTS}/change_password/{email})\n\n"
    subject = "Reset Your Password"
    message = (
        f"Dear User,\n\n"
        f"You recently requested to reset your password for CashControl. "
        f"Please use the following link to reset your password. "
        f"This link is only valid for the next 24 hours."
        f"{link}"
        f"If you did not request a password reset, please ignore this email. "
        f"If you continue to receive this email or believe it was sent in error, "
        f"please contact our support team immediately.\n\n"
        f"Thank you,\nCashControl Team"
    )
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [email], fail_silently=False)



def send_mail_for_signup(email):
    subject = "Welcome to Our Community!"
    message = (
        "Dear User,\n\n"
        "Thank you for signing up and joining our community! We are thrilled to have you with us and excited for you to explore all the features and benefits our platform offers.\n\n"
        "Your registration marks the beginning of a journey filled with valuable resources, engaging content, and opportunities to connect with like-minded individuals. We are committed to providing you with the best experience and support, and we look forward to assisting you in any way we can.\n\n"
        "Welcome aboard, and thank you for choosing us!\n\n"
        "Best regards,\n"
        "CashControl Team"
    )
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [email], fail_silently=False)



#changing password
@api_view(['POST'])
def change_password(request,email):
    data = json.loads(request.body)
    new_password = data.get('new_password', '')
    try:
        user = CustomUser.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        logger.debug('Password updated successfully')
        return Response({'success': 'Password updated successfully'})
    except CustomUser.DoesNotExist:
        logger.debug('User not found')
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def logout(request):
    logut_method(request)
    return Response({"message": "User logged out successfully."})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_current_user_data(request):
    user_id = request.user.id
    try:
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user)
        return Response({
        'status':200,
        'user':serializer.data,
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
def edit_user(request):
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)

        # Retrieve data from the request
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        email = request.data.get('email', '')
        gender = request.data.get('gender', '')
        life_status = request.data.get('life_status', '')
        num_of_children = request.data.get('num_of_children', '')
        phone_number = request.data.get('phone_number', '')
        birth_date = request.data.get('birth_date', '')
        profession = request.data.get('profession', '')
        address = request.data.get('address', '')


        # Retrieve and update the user
        user = CustomUser.objects.get(id=user_id)
        user.user = user  
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.gender = gender
        user.life_status = life_status
        user.num_of_children = num_of_children
        user.phone_number = phone_number
        user.birth_date = birth_date
        user.profession = profession
        user.address = address
        user.updated_at = timezone.now()

        user.save()

        return Response({'status': 200, 'message': 'user updated'})

    except CustomUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)


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
















