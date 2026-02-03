"""
Payment processing views for Stripe and Razorpay integration
"""

import stripe
import razorpay
import json
from decimal import Decimal
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Donation, Campaign, PaymentTransaction
from .utils import send_donation_receipt

# Initialize payment clients
stripe.api_key = settings.STRIPE_SECRET_KEY
razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


@api_view(['POST'])
def create_stripe_payment_intent(request):
    """Create a Stripe payment intent"""
    try:
        amount = int(float(request.data.get('amount', 0)) * 100)  # Convert to paise
        project = request.data.get('project', 'General')
        donor_name = request.data.get('donor_name', 'Anonymous')
        donor_email = request.data.get('donor_email', '')
        is_recurring = request.data.get('is_recurring', False)

        if amount < 50:  # Minimum 50 paise
            return Response({'error': 'Amount too low'}, status=status.HTTP_400_BAD_REQUEST)

        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='inr',
            metadata={
                'donor_name': donor_name,
                'donor_email': donor_email,
                'project': project,
                'is_recurring': str(is_recurring),
            },
            description=f'Donation for {project}',
        )

        return Response({
            'clientSecret': intent.client_secret,
            'paymentIntentId': intent.id,
        })

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_razorpay_order(request):
    """Create a Razorpay order"""
    try:
        amount = int(float(request.data.get('amount', 0)) * 100)  # Convert to paise
        project = request.data.get('project', 'General')
        donor_name = request.data.get('donor_name', 'Anonymous')
        donor_email = request.data.get('donor_email', '')
        is_recurring = request.data.get('is_recurring', False)

        if amount < 100:  # Minimum 1 INR
            return Response({'error': 'Amount too low'}, status=status.HTTP_400_BAD_REQUEST)

        # Create order
        order = razorpay_client.order.create({
            'amount': amount,
            'currency': 'INR',
            'payment_capture': 1,
            'notes': {
                'donor_name': donor_name,
                'donor_email': donor_email,
                'project': project,
                'is_recurring': str(is_recurring),
            }
        })

        return Response({
            'orderId': order['id'],
            'amount': order['amount'],
            'currency': order['currency'],
            'key_id': settings.RAZORPAY_KEY_ID,
        })

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def verify_razorpay_payment(request):
    """Verify Razorpay payment signature"""
    try:
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')
        
        donor_name = request.data.get('donor_name', 'Anonymous')
        donor_email = request.data.get('donor_email', '')
        donor_phone = request.data.get('donor_phone', '')
        project = request.data.get('project', 'General')
        amount = Decimal(request.data.get('amount', '0')) / 100  # Convert from paise
        is_recurring = request.data.get('is_recurring', False)

        # Verify signature
        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        
        razorpay_client.utility.verify_payment_signature(params_dict)

        # Create donation record
        donation = Donation.objects.create(
            donor_name=donor_name,
            donor_email=donor_email,
            donor_phone=donor_phone,
            amount=amount,
            payment_id=payment_id,
            payment_method='razorpay',
            payment_status='completed',
            project=project,
            is_recurring=is_recurring,
        )

        # Create transaction record
        PaymentTransaction.objects.create(
            transaction_id=payment_id,
            donation=donation,
            amount=amount,
            currency='INR',
            status='completed',
            raw_response={'order_id': order_id, 'payment_id': payment_id},
        )

        # Send receipt email
        if donor_email:
            send_donation_receipt(donation)

        return Response({
            'success': True,
            'donation_id': donation.id,
            'message': 'Payment verified successfully'
        })

    except razorpay.errors.SignatureVerificationError:
        return Response({
            'success': False,
            'error': 'Invalid payment signature'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
def stripe_webhook(request):
    """Handle Stripe webhooks"""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    # Handle different event types
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        
        # Extract metadata
        metadata = payment_intent.get('metadata', {})
        amount = Decimal(payment_intent['amount']) / 100  # Convert from paise
        
        # Create donation record
        donation = Donation.objects.create(
            donor_name=metadata.get('donor_name', 'Anonymous'),
            donor_email=metadata.get('donor_email', ''),
            amount=amount,
            payment_id=payment_intent['id'],
            payment_method='stripe',
            payment_status='completed',
            project=metadata.get('project', 'General'),
            is_recurring=metadata.get('is_recurring', 'False') == 'True',
        )

        # Create transaction record
        PaymentTransaction.objects.create(
            transaction_id=payment_intent['id'],
            donation=donation,
            amount=amount,
            currency=payment_intent['currency'].upper(),
            status='completed',
            raw_response=payment_intent,
        )

        # Send receipt
        if donation.donor_email:
            send_donation_receipt(donation)

    elif event['type'] == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']
        # Log failed payment
        PaymentTransaction.objects.create(
            transaction_id=payment_intent['id'],
            amount=Decimal(payment_intent['amount']) / 100,
            currency=payment_intent['currency'].upper(),
            status='failed',
            raw_response=payment_intent,
        )

    return HttpResponse(status=200)


@api_view(['GET'])
def payment_config(request):
    """Return payment configuration for frontend"""
    return Response({
        'stripe_public_key': settings.STRIPE_PUBLIC_KEY,
        'razorpay_key_id': settings.RAZORPAY_KEY_ID,
    })


@api_view(['POST'])
def campaign_donate(request, campaign_id):
    """Process donation for a specific campaign"""
    try:
        campaign = Campaign.objects.get(id=campaign_id)
        amount = Decimal(request.data.get('amount', 0))
        
        if campaign.status != 'active':
            return Response({'error': 'Campaign is not active'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Similar payment processing as regular donation
        # This would integrate with create_stripe_payment_intent or create_razorpay_order
        # but also update the campaign's raised_amount
        
        return Response({
            'success': True,
            'campaign': campaign.title,
            'amount': float(amount),
        })
        
    except Campaign.DoesNotExist:
        return Response({'error': 'Campaign not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
