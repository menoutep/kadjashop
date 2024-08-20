"""
URL configuration for chapfood project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from accounts.views import CustomLoginView
#from notifications.consumers import NotificationType1Consumer,NotificationType2Consumer,NotificationType3Consumer,NotificationType4Consumer,CartUpdateConsumer
urlpatterns = [
    path("", include("base.urls")),
    path("accounts/V2/", include("accounts.urls")),   
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('accounts/login/', CustomLoginView.as_view(), name='account_login'),
    path('home/', TemplateView.as_view(template_name='dashboard/home.html'), name='home')

    
]

admin.site.index_title = "KADJASHOP"
admin.site.site_header = "KADJASHOPADMIN"
admin.site.site_title = "KADJASHOPADMIN"

if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    