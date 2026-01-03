from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, DonationViewSet, VolunteerViewSet, ContactInquiryViewSet

# Create a router and register our views with it.
router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'contact', ContactInquiryViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]