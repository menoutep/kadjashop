from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Category, Product,Order,CartItem,CartItemProduct,PromoCode,Images,ProductAttribut,ProductInventory
from accounts.models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Category)

admin.site.register(Images)
admin.site.register(Product)
admin.site.register(ProductInventory)
admin.site.register(ProductAttribut)
admin.site.register(CartItemProduct)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(PromoCode)

