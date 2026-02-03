# NGO Content Management System
## End User Documentation

---

## Table of Contents
1. Project Overview
2. System Requirements
3. Features Implemented
4. Installation Guide
5. User Guide
6. Admin Guide
7. API Documentation
8. Deployment Guide
9. Technical Stack
10. Screenshots

---

## 1. Project Overview

### Project Name
NGO Content Management System (CMS)

### Description
A comprehensive full-stack web application designed for Non-Governmental Organizations (NGOs) to manage their operations, accept donations, coordinate volunteers, organize events, and engage with their community.

### Purpose
To provide NGOs with a professional, user-friendly platform that enables them to:
- Accept online donations securely
- Manage volunteer applications
- Organize and promote events
- Run fundraising campaigns
- Manage content and media
- Track impact and generate reports
- Engage with supporters through newsletters

---

## 2. System Requirements

### For Users (Website Visitors)
- **Browser:** Chrome, Firefox, Safari, Edge (latest versions)
- **Internet Connection:** Broadband or Mobile Data
- **Device:** Desktop, Laptop, Tablet, or Mobile Phone

### For Developers/Admins
- **Backend:**
  - Python 3.8 or higher
  - Django 5.0+
  - MySQL 8.0+ (or SQLite for development)
  
- **Frontend:**
  - Node.js 16+
  - npm 8+
  - React 18+

- **Server:**
  - Minimum 2GB RAM
  - 10GB Storage
  - Ubuntu/Windows Server

---

## 3. Features Implemented

### 3.1 Frontend Features (React.js)

#### Public Pages
1. **Home Page**
   - Mission and vision overview
   - Impact statistics (Children Educated, Projects Completed, States Covered)
   - Featured campaigns
   - Call-to-action buttons

2. **About Us**
   - Mission statement
   - Vision statement
   - Organizational history with key milestones

3. **Our Work**
   - Education Programs
   - Healthcare Initiatives
   - Livelihood Programs

4. **Projects**
   - Ongoing and completed projects
   - Project details (goals, beneficiaries, locations)
   - Category-wise filtering

5. **Media Gallery**
   - Photo gallery
   - Video gallery (YouTube embedded)
   - Press releases and news

6. **Events**
   - Upcoming events calendar
   - Event details and registration
   - Event categories and filtering

7. **Campaigns**
   - Active fundraising campaigns
   - Progress tracking with visual bars
   - Goal vs raised amount display

8. **Get Involved**
   - Volunteer registration form
   - Partnership opportunities
   - Individual fundraising options
   - Campaign participation
   - Event attendance

9. **Blog**
   - Success stories
   - Project updates
   - Interviews and articles

10. **Contact Us**
    - Contact form with inquiry types
    - Organization details
    - Interactive map placeholder

11. **Donate**
    - Multiple payment options (Stripe, Razorpay)
    - One-time and recurring donations
    - Project selection
    - Custom amount entry
    - Secure payment processing

#### Admin Features
- Admin Dashboard
- Employee Management (CRUD operations)
- Data visualization and statistics

#### Additional Features
- Newsletter subscription widget
- SEO optimization with meta tags
- Google Analytics integration
- Responsive mobile-first design
- Accessibility features

### 3.2 Backend Features (Django REST API)

#### Database Models
1. **Employee** - Staff management
2. **Donation** - Donation tracking with payment details
3. **Volunteer** - Volunteer applications
4. **ContactInquiry** - Contact form submissions
5. **Event** - Event management
6. **EventRegistration** - Event attendee tracking
7. **Newsletter** - Email subscription management
8. **Campaign** - Fundraising campaign tracking
9. **PaymentTransaction** - Detailed payment logs

#### API Endpoints
- `/api/employees/` - Employee CRUD
- `/api/donations/` - Donation management
- `/api/volunteers/` - Volunteer applications
- `/api/contact/` - Contact inquiries
- `/api/events/` - Event management
- `/api/events/upcoming/` - Filter upcoming events
- `/api/event-registrations/` - Event registrations
- `/api/newsletter/` - Newsletter subscriptions
- `/api/campaigns/` - Campaign management
- `/api/campaigns/active/` - Active campaigns
- `/api/transactions/` - Payment transaction logs
- `/api/reports/impact_report/` - Generate PDF reports

#### Payment Integration
- **Stripe Integration**
  - Payment intent creation
  - Webhook handling
  - Test and live mode support
  
- **Razorpay Integration**
  - Order creation
  - Payment verification
  - Signature validation

#### Additional Backend Features
- PDF generation for donation receipts
- Impact report generation
- Email automation for receipts
- Newsletter sending capability
- Secure environment variable management
- MySQL and SQLite database support
- CORS configuration for frontend access

---

## 4. Installation Guide

### 4.1 Clone Repository
```bash
git clone <repository-url>
cd MyInternship
```

### 4.2 Backend Setup

#### Step 1: Create Virtual Environment
```bash
cd server
python -m venv venv
```

#### Step 2: Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment
```bash
# Copy .env.example to .env
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac

# Edit .env file with your configuration
```

#### Step 5: Database Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

#### Step 6: Start Backend Server
```bash
python manage.py runserver
```
Backend runs at: `http://localhost:8000`

### 4.3 Frontend Setup

#### Step 1: Install Dependencies
```bash
cd client
npm install
```

#### Step 2: Configure Environment (Optional)
Create `.env` file:
```
REACT_APP_GA_TRACKING_ID=UA-XXXXX-Y
REACT_APP_API_URL=http://localhost:8000/api
```

#### Step 3: Start Frontend Server
```bash
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 5. User Guide

### 5.1 Browsing the Website

#### Home Page
- View organization mission and impact statistics
- Navigate to different sections using the navigation menu
- Quick access to donation page

#### Viewing Projects
1. Click "Projects" in navigation
2. Browse through ongoing and completed projects
3. View project details including location and beneficiaries

#### Making a Donation
1. Click "Donate" button
2. Select donation amount (preset or custom)
3. Choose donation type (one-time or recurring)
4. Select project to support
5. Choose payment method (Stripe or Razorpay)
6. Complete payment
7. Receive confirmation and email receipt

#### Registering for Events
1. Navigate to "Events" page
2. Browse upcoming events
3. Click "Register Now" on desired event
4. Fill registration form
5. Submit application

#### Applying as Volunteer
1. Go to "Get Involved" page
2. Click "Fill Volunteer Form"
3. Enter personal details and skills
4. Submit application
5. Wait for approval from admin

#### Subscribing to Newsletter
1. Scroll to footer of any page
2. Enter email address in newsletter form
3. Click "Subscribe"
4. Confirmation message appears

#### Contacting Organization
1. Navigate to "Contact" page
2. Fill contact form with:
   - Name
   - Email
   - Inquiry type
   - Message
3. Submit form
4. Receive confirmation

---

## 6. Admin Guide

### 6.1 Accessing Admin Panel

#### Django Admin
1. Navigate to `http://localhost:8000/admin/`
2. Login with superuser credentials
3. Access all data management features

#### Frontend Admin Dashboard
1. Navigate to `http://localhost:3000/login`
2. Enter admin credentials
3. Access dashboard at `/admin/dashboard`

### 6.2 Managing Content

#### Managing Donations
1. Login to Django admin
2. Click "Donations" in API section
3. View all donations with filters:
   - Payment status
   - Payment method
   - Project
   - Date range
4. Actions available:
   - Send receipt
   - Mark as completed/refunded
   - View transaction details

#### Managing Volunteers
1. Access "Volunteers" section
2. View applications
3. Filter by approval status
4. Approve or reject applications
5. View volunteer details and skills

#### Managing Events
1. Click "Events" in admin
2. Create new event:
   - Enter title and description
   - Set date and location
   - Set category and status
   - Add image URL (optional)
   - Set max participants
3. Edit or delete existing events
4. View event registrations

#### Managing Campaigns
1. Access "Campaigns" section
2. Create fundraising campaign:
   - Set title and description
   - Define goal amount
   - Set start and end dates
   - Upload image
   - Set status
3. Track raised amount automatically
4. View progress percentage

#### Managing Newsletter
1. Access "Newsletter" section
2. View all subscribers
3. Filter active/inactive
4. Export email list
5. Unsubscribe users if needed

#### Responding to Contact Inquiries
1. Access "Contact Inquiries"
2. View all messages
3. Filter by inquiry type
4. Mark as responded after handling
5. View full message details

### 6.3 Generating Reports

#### Impact Report
1. Navigate to `/api/reports/impact_report/`
2. Add optional parameters:
   - `?date_from=2024-01-01`
   - `?date_to=2024-12-31`
3. PDF report downloads automatically with:
   - Total donations
   - Number of donors
   - Volunteer count
   - Events completed
   - Campaign statistics

---

## 7. API Documentation

### 7.1 Authentication
Most endpoints are open for public access. Admin endpoints require Django admin authentication.

### 7.2 Base URL
Development: `http://localhost:8000/api/`

### 7.3 Endpoints

#### Donations
- `GET /api/donations/` - List all donations
- `POST /api/donations/` - Create donation
- `GET /api/donations/{id}/` - Get donation details
- `POST /api/donations/{id}/send_receipt/` - Send receipt email
- `GET /api/donations/stats/` - Get donation statistics

#### Volunteers
- `GET /api/volunteers/` - List volunteers
- `POST /api/volunteers/` - Submit application
- `POST /api/volunteers/{id}/approve/` - Approve volunteer

#### Events
- `GET /api/events/` - List all events
- `GET /api/events/upcoming/` - Get upcoming events
- `POST /api/events/` - Create event (admin)
- `GET /api/events/{id}/` - Event details

#### Event Registrations
- `POST /api/event-registrations/` - Register for event
- `GET /api/event-registrations/` - List registrations

#### Campaigns
- `GET /api/campaigns/` - List campaigns
- `GET /api/campaigns/active/` - Active campaigns only

#### Newsletter
- `POST /api/newsletter/` - Subscribe to newsletter
- `POST /api/newsletter/{id}/unsubscribe/` - Unsubscribe

#### Contact
- `POST /api/contact/` - Submit contact form
- `GET /api/contact/` - List inquiries (admin)

#### Payment
- `POST /api/payment/stripe/create-intent/` - Create Stripe payment
- `POST /api/payment/razorpay/create-order/` - Create Razorpay order
- `POST /api/payment/razorpay/verify/` - Verify Razorpay payment
- `GET /api/payment/config/` - Get payment configuration

---

## 8. Deployment Guide

### 8.1 Backend Deployment

#### Prepare for Production
1. Set environment variables:
   ```
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com
   DB_ENGINE=django.db.backends.mysql
   ```

2. Configure MySQL database

3. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

#### Deploy to Server
**Recommended Platforms:**
- Heroku
- DigitalOcean
- AWS Elastic Beanstalk
- PythonAnywhere

**Server Requirements:**
- Install Python 3.8+
- Install MySQL
- Configure WSGI server (Gunicorn)
- Set up Nginx as reverse proxy

### 8.2 Frontend Deployment

#### Build for Production
```bash
cd client
npm run build
```

#### Deploy Build Folder
**Recommended Platforms:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

#### Configure API URL
Update API endpoint in environment:
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### 8.3 Database Migration
```bash
# Backup SQLite data
python manage.py dumpdata > backup.json

# Switch to MySQL in .env
# Run migrations
python manage.py migrate

# Load backup data
python manage.py loaddata backup.json
```

---

## 9. Technical Stack

### Frontend
- **Framework:** React.js 18+
- **UI Library:** Bootstrap 5
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **SEO:** React Helmet
- **Analytics:** React GA4

### Backend
- **Framework:** Django 5.0
- **API:** Django REST Framework
- **Database:** MySQL / SQLite
- **Payment:** Stripe, Razorpay
- **PDF:** ReportLab
- **Email:** Django Email Backend
- **Configuration:** Python Decouple

### DevOps
- **Version Control:** Git
- **Package Management:** npm, pip
- **Environment:** Virtual Environment (venv)

---

## 10. Screenshots

### Public Pages
- Home page with hero section and statistics
- About Us page with mission and vision
- Projects showcase with filtering
- Events calendar with registration
- Donation page with payment options

### Admin Interface
- Django admin dashboard
- Employee management
- Donation tracking
- Event management
- Campaign monitoring

---

## Appendix

### A. Environment Variables

#### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
FRONTEND_URL=http://localhost:3000
```

### B. Test Credentials

#### Payment Test Cards
**Stripe:**
- Success: 4242 4242 4242 4242
- Requires Auth: 4000 0025 0000 3155

**Razorpay:**
- Success: 4111 1111 1111 1111

### C. Support
- GitHub Repository: [Repository Link]
- Documentation: README.md and SETUP_GUIDE.md
- Email: contact@myngo.org

---

## Conclusion

This NGO CMS provides a complete solution for non-profit organizations to manage their operations online. With features like secure donation processing, event management, volunteer coordination, and campaign tracking, it enables NGOs to focus on their mission while the platform handles the technical aspects.

The system is built with modern technologies, follows best practices, and is ready for production deployment.

---

**Document Version:** 1.0  
**Date:** February 2, 2026  
**Author:** Development Team  
**Contact:** admin@myngo.org
