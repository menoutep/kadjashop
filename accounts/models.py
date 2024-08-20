from django.db import models

from django.contrib.auth.models import User

class CustomUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="customer")
    phone_number = models.CharField(max_length=20,null=True,blank=True)
    social_account = models.BooleanField(default=False)
    address = models.TextField(null=True, blank=True)
    preferences = models.JSONField(null=True, blank=True)
    
    # Ajoutez d'autres champs personnalisés si nécessaire
    def __str__(self):
        return self.user.username