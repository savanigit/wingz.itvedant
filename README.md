# NGO Content Management System (CMS)

A comprehensive full-stack web application for NGO management with donation processing, event management, volunteer coordination, and content management capabilities.

## 🌟 Features

### Frontend (React.js)
- **Home Page**: Mission overview with impact statistics
- **About Us**: Mission, vision, and organizational history
- **Our Work**: Education, healthcare, and livelihood programs
- **Projects**: Showcase of ongoing and completed initiatives
- **Media Gallery**: Photos, videos, and press releases
- **Get Involved**: Volunteer registration, partnerships, campaigns
- **Events**: Calendar and registration system
- **Fundraising Campaigns**: Active campaign tracking with progress
- **Blog**: Updates, success stories, and articles
- **Contact**: Interactive form and location map
- **Donation System**: Integrated payment processing
- **Admin Dashboard**: Employee and content management
- **SEO Optimized**: Meta tags and Google Analytics integration
- **Newsletter Subscription**: Email signup functionality

### Backend (Django REST API)
- **RESTful API**: Complete CRUD operations
- **Payment Integration**: Stripe and Razorpay support
- **PDF Generation**: Donation receipts and impact reports
- **Email System**: Automated receipt delivery
- **Database Support**: MySQL and SQLite
- **Secure Configuration**: Environment variable management
- **Admin Panel**: Django admin for content management

## 📋 Prerequisites

- **Python** 3.8+ 
- **Node.js** 16+ and npm
- **MySQL** 8.0+ (optional, SQLite works for development)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MyInternship
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd server
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install django djangorestframework django-cors-headers python-decouple stripe razorpay reportlab mysqlclient
```

#### Configure Environment
```bash
# Copy .env.example to .env
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac

# Edit .env file with your configuration
```

**Important Environment Variables:**
- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to False in production
- `DB_ENGINE`: django.db.backends.mysql (or sqlite3 for dev)
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`: Database credentials
- `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_SECRET`: Payment gateway keys
- `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`: Email configuration

#### Setup Database
```bash
# For MySQL, create database first:
mysql -u root -p
CREATE DATABASE ngo_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

Frontend will be available at: `http://localhost:3000`

### 4. Google Analytics (Optional)

Create `.env` in client folder:
```
REACT_APP_GA_TRACKING_ID=UA-XXXXX-Y
```

## 🔐 Payment Gateway Setup

### Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Add to server/.env:
   - `STRIPE_PUBLIC_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

### Razorpay
1. Create account at [razorpay.com](https://razorpay.com)
2. Get credentials from Dashboard → Settings → API Keys
3. Add to server/.env:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

## 📡 API Endpoints

### Main Endpoints
- `/api/employees/` - Employee management
- `/api/donations/` - Donation records
- `/api/volunteers/` - Volunteer applications
- `/api/contact/` - Contact inquiries
- `/api/events/` - Event management
- `/api/event-registrations/` - Event registrations
- `/api/newsletter/` - Newsletter subscriptions
- `/api/campaigns/` - Fundraising campaigns
- `/api/transactions/` - Payment transactions
- `/api/reports/impact_report/` - Generate impact report PDF

### Payment Endpoints
- `/api/payment/stripe/create-intent/` - Create Stripe payment
- `/api/payment/razorpay/create-order/` - Create Razorpay order
- `/api/payment/razorpay/verify/` - Verify Razorpay payment
- `/api/payment/stripe/webhook/` - Stripe webhook handler
- `/api/payment/config/` - Get payment gateway config

## 🗂️ Project Structure

```
MyInternship/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Footer.js
│   │   │   ├── SEO.js
│   │   │   └── NewsletterSignup.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Donate.js
│   │   │   ├── Events.js
│   │   │   ├── Campaigns.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── server/                # Django Backend
    ├── api/
    │   ├── models.py      # Database models
    │   ├── views.py       # API views
    │   ├── serializers.py # DRF serializers
    │   ├── payment_views.py # Payment processing
    │   ├── utils.py       # PDF & email utilities
    │   ├── urls.py        # API routes
    │   └── admin.py       # Admin configuration
    ├── ngo_backend/
    │   ├── settings.py    # Django settings
    │   └── urls.py        # Main URL config
    ├── .env               # Environment variables
    ├── .env.example       # Environment template
    └── manage.py
```

## 🔧 Configuration

### MySQL Database (Production)
In server/.env:
```
DB_ENGINE=django.db.backends.mysql
DB_NAME=ngo_database
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

### SQLite (Development)
In server/.env:
```
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
```

### Email Configuration
For Gmail:
```
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 📊 Admin Panel

Access Django admin at: `http://localhost:8000/admin`

Features:
- Employee management
- Donation tracking
- Volunteer applications
- Event management
- Campaign monitoring
- Newsletter subscribers
- Transaction logs

## 🧪 Testing

### Backend
```bash
cd server
python manage.py test
```

### Frontend
```bash
cd client
npm test
```

## 📦 Deployment

### Backend (Django)
1. Set `DEBUG=False` in .env
2. Configure `ALLOWED_HOSTS`
3. Set up MySQL database
4. Collect static files: `python manage.py collectstatic`
5. Use gunicorn/uwsgi for production server
6. Configure nginx as reverse proxy

### Frontend (React)
```bash
cd client
npm run build
```
Deploy build folder to hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Support

For support, email contact@myngo.org or open an issue in the repository.

## ✅ Requirements Fulfilled

### Frontend Requirements
✅ All 9 required pages implemented
✅ React.js framework (Added Advantage)
✅ Bootstrap responsive design
✅ Clean and intuitive UI
✅ Mobile-first responsive design

### Backend Requirements
✅ Django REST Framework
✅ MySQL database support (configurable)
✅ Payment gateway integration (Stripe & Razorpay)
✅ Form submission handling
✅ Content management system

### CMS Features
✅ Easy content creation and editing
✅ Donation management with receipts
✅ Volunteer and event management
✅ Impact tracking and PDF reports
✅ Newsletter subscription system
✅ SEO optimization
✅ Role-based access control
✅ Data security with environment variables

## 🎯 Key Features

- 💳 **Dual Payment Gateways**: Stripe & Razorpay integration
- 📄 **PDF Generation**: Automated donation receipts and reports
- 📧 **Email Automation**: Receipt delivery and notifications
- 📱 **Fully Responsive**: Mobile-first design approach
- 🔒 **Secure**: Environment-based configuration
- 📊 **Analytics**: Google Analytics integration
- 🎨 **Professional UI**: Clean Bootstrap-based design
- ⚡ **Fast**: Optimized React & Django REST API
- 🌐 **SEO Ready**: Meta tags and sitemap support

---

**Built with ❤️ for social impact**
