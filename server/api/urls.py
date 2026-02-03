from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet, DonationViewSet, VolunteerViewSet, ContactInquiryViewSet,
    EventViewSet, EventRegistrationViewSet, NewsletterViewSet,
    CampaignViewSet, PaymentTransactionViewSet, ReportViewSet
)
from .payment_views import (
    create_stripe_payment_intent, create_razorpay_order,
    verify_razorpay_payment, stripe_webhook, payment_config, campaign_donate
)

# Create a router and register our views with it
router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'contact', ContactInquiryViewSet)
router.register(r'events', EventViewSet)
router.register(r'event-registrations', EventRegistrationViewSet)
router.register(r'newsletter', NewsletterViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'transactions', PaymentTransactionViewSet)
router.register(r'reports', ReportViewSet, basename='reports')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
    
    # Payment endpoints
    path('payment/stripe/create-intent/', create_stripe_payment_intent, name='stripe-create-intent'),
    path('payment/razorpay/create-order/', create_razorpay_order, name='razorpay-create-order'),
    path('payment/razorpay/verify/', verify_razorpay_payment, name='razorpay-verify'),
    path('payment/stripe/webhook/', stripe_webhook, name='stripe-webhook'),
    path('payment/config/', payment_config, name='payment-config'),
    path('payment/campaign/<int:campaign_id>/donate/', campaign_donate, name='campaign-donate'),
]
