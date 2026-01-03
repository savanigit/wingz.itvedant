
from rest_framework import viewsets
from .models import Employee, Donation, Volunteer, ContactInquiry
from .serializers import EmployeeSerializer, DonationSerializer, VolunteerSerializer, ContactInquirySerializer

# 1. Employee View (Read, Create, Update, Delete)
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# 2. Donation View (Read, Create)
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

# 3. Volunteer View (Read, Create)
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

# 4. Contact View (Read, Create)
class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer