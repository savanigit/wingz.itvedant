from django.db import models

# Create your models here.
class Employee(models.Model):
    STATUS_CHOICES = [('Active', 'Active'), ('On Leave', 'On Leave'), ('Inactive', 'Inactive')]
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self): return self.name

class Donation(models.Model):
    donor_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_id = models.CharField(max_length=100)
    project = models.CharField(max_length=100, default="General")
    date_donated = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.donor_name} - {self.amount}"

class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    skills = models.TextField(blank=True)
    date_applied = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.name

class ContactInquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"Message from {self.name}"