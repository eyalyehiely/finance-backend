from django.shortcuts import redirect
from django.urls import reverse

# class GoogleAuthenticationMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#
#     def __call__(self, request):
#         # Define a list of URLs that do not require authentication
#         public_urls = [
#             reverse('sign_in'),  # Adjust as per your URL configuration
#             '/admin/',  # Adjust as per your URL configuration
#             # Add other public URLs here
#         ]
#
#         if not request.user.is_authenticated and request.path not in public_urls and not  request.path.startswith('/admin/'):
#             # User is not authenticated and requested URL requires authentication,
#             # redirect to Google Sign-In page
#
#             return redirect(reverse('sign_in'))  # Redirect to the sign-in page
#
#         elif request.path == reverse('sign_in'):
#             # If the requested URL is the sign-in page itself, return the response directly
#             return self.get_response(request)
#
#         else:
#         # For all other cases, proceed with the request
#             response = self.get_response(request)
#             return response
