
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse
from .models import (
    Employee, Donation, Volunteer, ContactInquiry,
    Event, EventRegistration, Newsletter, Campaign, PaymentTransaction
)
from .serializers import (
    EmployeeSerializer, DonationSerializer, VolunteerSerializer, ContactInquirySerializer,
    EventSerializer, EventRegistrationSerializer, NewsletterSerializer,
    CampaignSerializer, PaymentTransactionSerializer
)
from .utils import generate_impact_report_pdf, send_donation_receipt


# Employee ViewSet
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# Donation ViewSet
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    
    @action(detail=True, methods=['post'])
    def send_receipt(self, request, pk=None):
        """Send donation receipt to donor"""
        donation = self.get_object()
        if send_donation_receipt(donation):
            return Response({'message': 'Receipt sent successfully'})
        return Response(
            {'error': 'Failed to send receipt'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get donation statistics"""
        from django.db.models import Sum, Count, Avg
        
        donations = self.queryset.filter(payment_status='completed')
        stats = donations.aggregate(
            total_amount=Sum('amount'),
            total_count=Count('id'),
            average_amount=Avg('amount')
        )
        
        # Group by project
        by_project = donations.values('project').annotate(
            total=Sum('amount'),
            count=Count('id')
        ).order_by('-total')
        
        return Response({
            'total_amount': stats['total_amount'] or 0,
            'total_donations': stats['total_count'] or 0,
            'average_donation': stats['average_amount'] or 0,
            'by_project': list(by_project),
        })


# Volunteer ViewSet
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve a volunteer application"""
        volunteer = self.get_object()
        volunteer.approved = True
        volunteer.save()
        return Response({'message': 'Volunteer approved'})


# Contact Inquiry ViewSet
class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    
    @action(detail=True, methods=['post'])
    def mark_responded(self, request, pk=None):
        """Mark inquiry as responded"""
        inquiry = self.get_object()
        inquiry.responded = True
        inquiry.save()
        return Response({'message': 'Marked as responded'})


# Event ViewSet
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        from django.utils import timezone
        events = self.queryset.filter(
            event_date__gte=timezone.now(),
            status='upcoming'
        ).order_by('event_date')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)


# Event Registration ViewSet
class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    
    @action(detail=True, methods=['post'])
    def mark_attended(self, request, pk=None):
        """Mark registration as attended"""
        registration = self.get_object()
        registration.attended = True
        registration.save()
        return Response({'message': 'Marked as attended'})


# Newsletter ViewSet
class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    
    @action(detail=True, methods=['post'])
    def unsubscribe(self, request, pk=None):
        """Unsubscribe from newsletter"""
        subscription = self.get_object()
        subscription.is_active = False
        subscription.save()
        return Response({'message': 'Unsubscribed successfully'})


# Campaign ViewSet
class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active campaigns"""
        campaigns = self.queryset.filter(status='active')
        serializer = self.get_serializer(campaigns, many=True)
        return Response(serializer.data)


# Payment Transaction ViewSet
class PaymentTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentTransaction.objects.all()
    serializer_class = PaymentTransactionSerializer


# Impact Report ViewSet
class ReportViewSet(viewsets.ViewSet):
    """Generate various reports"""
    
    @action(detail=False, methods=['get'])
    def impact_report(self, request):
        """Generate and download impact report PDF"""
        from datetime import datetime
        
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to')
        
        if date_from:
            date_from = datetime.strptime(date_from, '%Y-%m-%d').date()
        if date_to:
            date_to = datetime.strptime(date_to, '%Y-%m-%d').date()
        
        pdf_buffer = generate_impact_report_pdf(date_from, date_to)
        
        return FileResponse(
            pdf_buffer,
            as_attachment=True,
            filename=f'impact_report_{datetime.now().strftime("%Y%m%d")}.pdf',
            content_type='application/pdf'
        )
