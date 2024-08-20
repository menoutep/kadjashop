from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from accounts.models import CustomUser
from django.db import IntegrityError
import logging

logger = logging.getLogger(__name__)
class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        
        try:
            CustomUser.objects.get(user=user)
            logger.info(f"CustomUser already exists for user: {user.username}")
        except CustomUser.DoesNotExist:
            custom_user = CustomUser.objects.create(
                user=user,
                social_account=True
            )
            logger.info(f"Created CustomUser for: {user.username} by Google OAuth")
        
        return user

