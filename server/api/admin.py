from django.contrib import admin
from .models import (
    Employee, Donation, Volunteer, ContactInquiry,
    Event, EventRegistration, Newsletter, Campaign, PaymentTransaction
)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'department', 'status', 'date_joined']
    list_filter = ['status', 'department']
    search_fields = ['name', 'role']


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['donor_name', 'amount', 'project', 'payment_status', 'payment_method', 'date_donated']
    list_filter = ['payment_status', 'payment_method', 'project', 'is_recurring']
    search_fields = ['donor_name', 'donor_email', 'payment_id']
    readonly_fields = ['date_donated', 'receipt_sent']


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'approved', 'date_applied']
    list_filter = ['approved']
    search_fields = ['name', 'email']
    readonly_fields = ['date_applied']


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'inquiry_type', 'responded', 'date_sent']
    list_filter = ['inquiry_type', 'responded']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['date_sent']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_date', 'location', 'status', 'category']
    list_filter = ['status', 'category']
    search_fields = ['title', 'description', 'location']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ['name', 'event', 'email', 'phone', 'registered_at', 'attended']
    list_filter = ['event', 'attended']
    search_fields = ['name', 'email']
    readonly_fields = ['registered_at']


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'subscribed_at', 'is_active']
    list_filter = ['is_active']
    search_fields = ['email', 'name']
    readonly_fields = ['subscribed_at']


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['title', 'goal_amount', 'raised_amount', 'progress_percentage', 'status', 'start_date', 'end_date']
    list_filter = ['status']
    search_fields = ['title', 'description']
    readonly_fields = ['raised_amount', 'created_at', 'updated_at']


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'amount', 'currency', 'status', 'transaction_type', 'created_at']
    list_filter = ['status', 'transaction_type', 'currency']
    search_fields = ['transaction_id']
    readonly_fields = ['created_at', 'raw_response']

