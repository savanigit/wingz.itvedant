from django.db import models
from django.utils import timezone

# Employee Model
class Employee(models.Model):
    STATUS_CHOICES = [('Active', 'Active'), ('On Leave', 'On Leave'), ('Inactive', 'Inactive')]
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self): 
        return self.name


# Donation Model
class Donation(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('razorpay', 'Razorpay'),
        ('manual', 'Manual'),
    ]
    
    donor_name = models.CharField(max_length=100)
    donor_email = models.EmailField(blank=True, null=True)
    donor_phone = models.CharField(max_length=20, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='stripe')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    project = models.CharField(max_length=100, default="General")
    is_recurring = models.BooleanField(default=False)
    receipt_sent = models.BooleanField(default=False)
    date_donated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_donated']

    def __str__(self): 
        return f"{self.donor_name} - ₹{self.amount} ({self.payment_status})"


# Volunteer Model
class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    skills = models.TextField(blank=True)
    availability = models.CharField(max_length=100, blank=True)
    approved = models.BooleanField(default=False)
    date_applied = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_applied']

    def __str__(self): 
        return self.name


# Contact Inquiry Model
class ContactInquiry(models.Model):
    INQUIRY_TYPE_CHOICES = [
        ('general', 'General Inquiry'),
        ('volunteer', 'Volunteer'),
        ('partnership', 'Partnership'),
        ('media', 'Media Request'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPE_CHOICES, default='general')
    message = models.TextField()
    responded = models.BooleanField(default=False)
    date_sent = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_sent']
        verbose_name_plural = "Contact Inquiries"

    def __str__(self): 
        return f"Message from {self.name}"


# Event Model
class Event(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_date = models.DateTimeField()
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='General')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    max_participants = models.IntegerField(default=0, help_text="0 means unlimited")
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['event_date']

    def __str__(self):
        return self.title
    
    @property
    def is_past(self):
        return self.event_date < timezone.now()


# Event Registration Model
class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    registered_at = models.DateTimeField(auto_now_add=True)
    attended = models.BooleanField(default=False)

    class Meta:
        ordering = ['-registered_at']
        unique_together = ['event', 'email']

    def __str__(self):
        return f"{self.name} - {self.event.title}"


# Newsletter Subscription Model
class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email


# Campaign Model (for fundraising campaigns)
class Campaign(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    goal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    image_url = models.URLField(blank=True, null=True)
    created_by = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    @property
    def progress_percentage(self):
        if self.goal_amount > 0:
            return min((float(self.raised_amount) / float(self.goal_amount)) * 100, 100)
        return 0


# Payment Transaction Model (for detailed payment tracking)
class PaymentTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('donation', 'Donation'),
        ('campaign', 'Campaign Contribution'),
    ]
    
    transaction_id = models.CharField(max_length=100, unique=True)
    donation = models.ForeignKey(Donation, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='donation')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    status = models.CharField(max_length=20, default='pending')
    raw_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Transaction {self.transaction_id} - ₹{self.amount}"
