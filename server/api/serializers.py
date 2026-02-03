from rest_framework import serializers
from .models import (
    Employee, Donation, Volunteer, ContactInquiry,
    Event, EventRegistration, Newsletter, Campaign, PaymentTransaction
)


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ['date_donated', 'receipt_sent']


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ['date_applied', 'approved']


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'
        read_only_fields = ['date_sent', 'responded']


class EventSerializer(serializers.ModelSerializer):
    registration_count = serializers.SerializerMethodField()
    is_past = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
    
    def get_registration_count(self, obj):
        return obj.registrations.count()


class EventRegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    event_date = serializers.DateTimeField(source='event.event_date', read_only=True)
    
    class Meta:
        model = EventRegistration
        fields = '__all__'
        read_only_fields = ['registered_at', 'attended']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'
        read_only_fields = ['subscribed_at', 'is_active']


class CampaignSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    days_remaining = serializers.SerializerMethodField()
    
    class Meta:
        model = Campaign
        fields = '__all__'
        read_only_fields = ['raised_amount', 'created_at', 'updated_at']
    
    def get_days_remaining(self, obj):
        from datetime import date
        if obj.end_date:
            delta = obj.end_date - date.today()
            return max(0, delta.days)
        return None


class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = '__all__'
        read_only_fields = ['created_at']
