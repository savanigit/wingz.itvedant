"""
URL configuration for ngo_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    """Root endpoint showing available API routes"""
    return JsonResponse({
        'message': 'NGO CMS API',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'employees': '/api/employees/',
            'donations': '/api/donations/',
            'volunteers': '/api/volunteers/',
            'contact': '/api/contact/',
            'events': '/api/events/',
            'campaigns': '/api/campaigns/',
            'newsletter': '/api/newsletter/',
            'payment_config': '/api/payment/config/',
        },
        'documentation': 'See README.md for full API documentation',
        'frontend': 'http://localhost:3000',
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]