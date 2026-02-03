"""
Utility functions for NGO CMS
"""

from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from io import BytesIO
from datetime import datetime
import os


def generate_donation_receipt_pdf(donation):
    """Generate a PDF receipt for a donation"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    # Container for PDF elements
    elements = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1a237e'),
        spaceAfter=30,
        alignment=TA_CENTER,
    )
    
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#1a237e'),
        spaceAfter=12,
    )
    
    # Title
    elements.append(Paragraph(settings.ORG_NAME, title_style))
    elements.append(Paragraph("Donation Receipt", styles['Heading2']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Organization details
    org_details = f"""
    <b>{settings.ORG_NAME}</b><br/>
    {settings.ORG_ADDRESS}<br/>
    Email: {settings.ORG_EMAIL}<br/>
    Phone: {settings.ORG_PHONE}
    """
    elements.append(Paragraph(org_details, styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Receipt details
    receipt_data = [
        ['Receipt Number:', donation.payment_id],
        ['Date:', donation.date_donated.strftime('%B %d, %Y')],
        ['Donor Name:', donation.donor_name],
        ['Email:', donation.donor_email or 'N/A'],
        ['Phone:', donation.donor_phone or 'N/A'],
        ['Project:', donation.project],
        ['Payment Method:', donation.payment_method.title()],
        ['Amount:', f'₹ {donation.amount:,.2f}'],
        ['Status:', donation.payment_status.title()],
    ]
    
    table = Table(receipt_data, colWidths=[2*inch, 4*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e3f2fd')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ]))
    
    elements.append(table)
    elements.append(Spacer(1, 0.5*inch))
    
    # Thank you message
    thank_you = """
    <b>Thank you for your generous donation!</b><br/><br/>
    Your contribution will help us continue our mission to create a lasting impact 
    in the lives of underprivileged children and communities. This receipt serves as 
    proof of your donation for tax purposes.
    """
    elements.append(Paragraph(thank_you, styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Footer
    footer_text = f"<i>Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</i>"
    elements.append(Paragraph(footer_text, styles['Italic']))
    
    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer


def send_donation_receipt(donation):
    """Send donation receipt via email"""
    if not donation.donor_email:
        return False
    
    try:
        # Generate PDF
        pdf_buffer = generate_donation_receipt_pdf(donation)
        
        # Email subject and body
        subject = f'Thank You for Your Donation - Receipt #{donation.payment_id}'
        
        message = f"""
Dear {donation.donor_name},

Thank you for your generous donation of ₹{donation.amount:,.2f} to {settings.ORG_NAME}!

Your contribution towards "{donation.project}" will help us continue our mission to create 
a lasting impact in the lives of underprivileged children and communities.

Please find your donation receipt attached to this email.

Receipt Details:
- Receipt Number: {donation.payment_id}
- Date: {donation.date_donated.strftime('%B %d, %Y')}
- Amount: ₹{donation.amount:,.2f}
- Project: {donation.project}

If you have any questions, please don't hesitate to contact us.

With gratitude,
{settings.ORG_NAME} Team

---
{settings.ORG_EMAIL}
{settings.ORG_PHONE}
        """
        
        # Create email
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER or settings.ORG_EMAIL,
            to=[donation.donor_email],
        )
        
        # Attach PDF
        email.attach(
            f'donation_receipt_{donation.payment_id}.pdf',
            pdf_buffer.getvalue(),
            'application/pdf'
        )
        
        # Send email
        email.send(fail_silently=False)
        
        # Mark as sent
        donation.receipt_sent = True
        donation.save()
        
        return True
        
    except Exception as e:
        print(f"Error sending receipt: {str(e)}")
        return False


def generate_impact_report_pdf(date_from=None, date_to=None):
    """Generate an impact report PDF"""
    from .models import Donation, Volunteer, Event, Campaign
    from django.db.models import Sum, Count
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    elements = []
    styles = getSampleStyleSheet()
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1a237e'),
        spaceAfter=30,
        alignment=TA_CENTER,
    )
    
    elements.append(Paragraph(f"{settings.ORG_NAME}", title_style))
    elements.append(Paragraph("Impact Report", styles['Heading2']))
    
    if date_from and date_to:
        period = f"{date_from.strftime('%B %d, %Y')} to {date_to.strftime('%B %d, %Y')}"
    else:
        period = "All Time"
    elements.append(Paragraph(f"Period: {period}", styles['Normal']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Statistics
    donations_query = Donation.objects.filter(payment_status='completed')
    if date_from:
        donations_query = donations_query.filter(date_donated__gte=date_from)
    if date_to:
        donations_query = donations_query.filter(date_donated__lte=date_to)
    
    total_donations = donations_query.aggregate(total=Sum('amount'))['total'] or 0
    donation_count = donations_query.count()
    volunteer_count = Volunteer.objects.all().count()
    event_count = Event.objects.filter(status='completed').count()
    campaign_count = Campaign.objects.all().count()
    
    stats_data = [
        ['Metric', 'Value'],
        ['Total Donations Received', f'₹ {total_donations:,.2f}'],
        ['Number of Donations', str(donation_count)],
        ['Total Volunteers', str(volunteer_count)],
        ['Events Completed', str(event_count)],
        ['Active Campaigns', str(campaign_count)],
    ]
    
    stats_table = Table(stats_data, colWidths=[3*inch, 3*inch])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a237e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ]))
    
    elements.append(stats_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Thank you message
    conclusion = """
    <b>Thank You to All Our Supporters!</b><br/><br/>
    Your generous contributions and dedication have made these achievements possible. 
    Together, we continue to make a lasting impact in the lives of underprivileged 
    children and communities.
    """
    elements.append(Paragraph(conclusion, styles['Normal']))
    
    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer


def send_newsletter(subject, message, subscriber_list=None):
    """Send newsletter to subscribers"""
    from .models import Newsletter
    
    if subscriber_list is None:
        subscribers = Newsletter.objects.filter(is_active=True)
    else:
        subscribers = subscriber_list
    
    email_list = [sub.email for sub in subscribers]
    
    if not email_list:
        return False
    
    try:
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER or settings.ORG_EMAIL,
            bcc=email_list,  # Use BCC to protect subscriber privacy
        )
        email.send(fail_silently=False)
        return True
    except Exception as e:
        print(f"Error sending newsletter: {str(e)}")
        return False
