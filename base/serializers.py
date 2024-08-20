from rest_framework import serializers
from accounts.models import CustomUser
from base.models import Product, Category,CartItem,CartItemProduct,Order,PromoCode,Images,ProductInventory,ProductAttribut
def validate_preparation_time(value):
        if value < 0:
            raise serializers.ValidationError("Le temps de préparation doit être un nombre positif.")
        return value
class ProductAttributSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribut
        fields = ['type_attribut','name','valeur']  # Ajoutez d'autres champs au besoin
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone_number']  # Ajoutez d'autres champs au besoin
class CustomUserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','password']  # Ajoutez d'autres champs au besoin

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=1000,required=False)
    image = serializers.ImageField( required=False)
    class Meta:
        model = Category
        fields = ['id','name', 'description','image']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'title', 'imgP', 'imgS', 'imgT']

class ProductSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'is_promo', 'price', 'second_price', 'image']

class ProductInventorySerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = ProductInventory
        fields = ['id', 'product', 'color', 'size', 'stock']


class CartItemProductSerializer(serializers.ModelSerializer):
    product = ProductInventorySerializer()
    
    class Meta:
        model = CartItemProduct
        fields = ['id', 'cart_item', 'product', 'quantity','size','color']

class CartItemSerializer(serializers.ModelSerializer):
    panier_items = CartItemProductSerializer(many=True)
    


    class Meta:
        model = CartItem
        fields = ['id', 'user', 'panier_items', 'last', 'total','quantity']

    def get_total(self, obj):
        return obj.calculate_total()
    def get_quantity(self, obj):
        return obj.quantity_sum
"""
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = ['id','category','name', 'description', 'price','image','preparation_time']

class CartItemProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True,many=True)
    class Meta:
        model = CartItemProduct
        fields = ['id','product','quantity']

class CartItemSerializer(serializers.ModelSerializer):
    products = CartItemProductSerializer(read_only=True,many=True)
    user= CustomUserSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id','user','products','total']

"""
class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['id', 'code', 'description', 'discount_type']


class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()  # Utilisez le sérialiseur CustomUserSerializer pour le champ 'user'
    items = CartItemProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'order_total', 'delivery_address', 'is_delivery', 'is_piece', 'monnaie', 'time_cook', 'created_at']


