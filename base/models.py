from django.db import models
from accounts.models import CustomUser
from django.contrib.auth.models import User
from django.utils import timezone
from decimal import Decimal
from datetime import datetime


class Images(models.Model):
    title=models.CharField(max_length=155)
    imgP=models.ImageField(max_length=155,upload_to='product_images/',blank=True)
    imgS=models.ImageField(max_length=155,upload_to='product_images/',blank=True, null=True)
    imgT=models.ImageField(max_length=155,upload_to='product_images/',blank=True, null=True)
    
    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"  
    def __str__(self):
        return self.title
    
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ForeignKey(Images,on_delete=models.CASCADE)
    start_time = models.TimeField(help_text="Date de début de validité du code promotionnel",null=True,blank=True)
    end_time = models.TimeField(help_text="Date de fin de validité du code promotionnel",null=True,blank=True)
    active = models.BooleanField(default=False, help_text="Code promotionnel actif ou inactif")
    
    class Meta:
        verbose_name = "Categorie"
        verbose_name_plural = "Categories"  
    def is_active(self):
        """
        Vérifie si la categorie est active en fonction de l'heure actuelle.
        """
        if self.start_time and self.end_time:
            now = datetime.now().time()
            if self.start_time <= now <= self.end_time:
                self.active = True
            else:
                self.active = False
            self.save()  
        else:
            self.active = True
            self.save() 

    def get_product_count(self):
        return Product.objects.filter(category=self).count()
    def __str__(self):
        return self.name
    


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="products")
    name = models.CharField(max_length=100)
    description = models.TextField()
    is_promo = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    second_price = models.DecimalField(max_digits=15,default=0,decimal_places=2)
    image = models.ForeignKey(Images,on_delete=models.CASCADE)  # Champ pour l'image du repas
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Produit"
        verbose_name_plural = "Produits"  

    @property
    def color(self):
        colors = ProductAttribut.objects.filter(products_colors__product=self).values("valeur").distinct()
        colors_list = []
        for dic in colors:
            colors_list.append(dic.get("valeur"))
        return colors_list
    @property
    def size(self):
        sizes = ProductAttribut.objects.filter(products_sizes__product=self).values("valeur").distinct()
        sizes_list = []
        for dic in sizes:
            sizes_list.append(dic.get("valeur"))
        return sizes_list

        
class ProductAttribut(models.Model):
    name = models.CharField(max_length=50)
    type_attribut = models.IntegerField()
    valeur = models.CharField(max_length=50)
    description = models.CharField(max_length=50,null=True,blank=True)
    def __str__(self):
        return f"{self.name}-{self.valeur}"
    class Meta:
        verbose_name = "Attribut produit"
        verbose_name_plural = "Attribut produits"   

class ProductInventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,related_name="products_inventorys")
    stock = models.IntegerField(default=0)
    size = models.ManyToManyField(ProductAttribut,related_name="products_sizes")
    color = models.ManyToManyField(ProductAttribut,related_name="products_colors")

    def __str__(self):
        return f"inventaire : {self.product}"
    class Meta:
        verbose_name = "Inventaire produit"
        verbose_name_plural = "Inventaire produits"   


class CartItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name="paniers")
    products = models.ManyToManyField(ProductInventory, through='CartItemProduct')
    last = models.BooleanField(null=False,default=False)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    quantity = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Panier"
        verbose_name_plural = "Paniers"  

      # Importez le type Decimal

    def calculate_total(self,promo_code=None):
        total = Decimal('0.0')  # Initialisez le total en tant que Decimal

        for cart_item in self.panier_items.all():
            product = cart_item.product
            if product.product.is_promo:
                # Si l'article est en promotion, utilisez second_price
                total += product.product.second_price * Decimal(cart_item.quantity)
            else:
                # Sinon, utilisez le prix normal
                total += product.product.price * Decimal(cart_item.quantity)
        self.total = total
        self.save()
        try:
            promo = PromoCode.objects.get(code=promo_code)
            
            if promo is not None and promo.active == True :
                discount_type = promo.discount_type.lower()
                if discount_type == 'percent':   
                    discount = (total * promo.discount_value)/100
                    self.total = total-discount
                elif discount_type == 'amount':
                    discount = promo.discount_value
                    self.total = total - discount
                self.save()
                return self.total
            else:
                print("no promo")
                return self.total
        except:
            return self.total
            print("tentative de hack des code promos")
        
        return self.total

    @property
    def quantity_sum(self):
        """Retourne la somme des quantités d'articles dans ce panier"""
        qty_sum : int = 0
        qty_sum = sum([i.quantity for i in self.panier_items.all()])
        self.quantity = qty_sum
        self.save()
        return qty_sum

    def __str__(self):
        return f"Panier de {self.user.user.username}"
        


class CartItemProduct(models.Model):
    cart_item = models.ForeignKey('CartItem', on_delete=models.CASCADE,related_name="panier_items")
    product = models.ForeignKey('ProductInventory', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # Champ pour enregistrer la quantité de repas
    size = models.CharField(max_length=50,null=True)
    color = models.CharField(max_length=50,null=True)
    class Meta:
        verbose_name = "Article panier"
        verbose_name_plural = "Articles paniers"  
    def calculate_item_total(self):
        # Calculez le prix total du repas en multipliant la quantité par le prix du repas
   
        total = Decimal('0.0')
        if self.product.product.is_promo:
            total = self.product.product.second_price * Decimal(self.quantity)
            return total
        else:
            total = self.product.product.price * Decimal(self.quantity)
            return total
   
    def __str__(self):
        return f"{self.quantity} x {self.product.product.name}"
    
   
STATUS_CHOICES = (
        ('en_attente', 'En attente'),
        ('en_cours', 'En cours de préparation'),
        ('en_livraison', 'En cours de livraison'),
        ('livree', 'Livrée'),
        ('recuperer', 'Récupérée'),
        ('annulee', 'Annulée'),
    )   
class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItemProduct)  # Les repas commandés
    order_total = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_address = models.TextField()
    is_delivery = models.BooleanField(default=False)  # True si le client souhaite être livré
    is_piece = models.BooleanField(default=False)
    monnaie = models.DecimalField(max_digits=15, decimal_places=2,blank=True,null=True)
    pickup_time = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='en_attente')
    created_at = models.DateTimeField(auto_now_add=True)
    time_cook = models.PositiveIntegerField(default=0)

    
    def __str__(self):
       
        return f"Commande de {self.user.user.username}"
    
    def calculate_order_total(self):
        total = sum(item.calculate_item_total() for item in self.items.all())
        if self.is_delivery:
            total += 500  # Ajoutez 500 au montant total si le client souhaite être livré
        return total
    @property
    def updateStock(self):
        for item in self.items.all():
            item.product.stock -= item.quantity
            item.product.save()

   
    class Meta:
        verbose_name = "Commande"
        verbose_name_plural = "Commandes" 

class PromoCode(models.Model):
    
    code = models.CharField(max_length=20, unique=True, help_text="Code promotionnel unique")
    description = models.TextField(max_length=200, help_text="Description du code promotionnel")
    discount_type = models.CharField(
        max_length=60,
        choices=[('percent', 'Pourcentage'), ('amount', 'Montant fixe')],
        default='percent',
        help_text="Type de réduction (pourcentage ou montant fixe)"
    )
    discount_value = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        help_text="Montant de la réduction en pourcentage (0-100) ou montant fixe"
    )
    start_date = models.DateTimeField(help_text="Date de début de validité du code promotionnel")
    end_date = models.DateTimeField(help_text="Date de fin de validité du code promotionnel")
    active = models.BooleanField(default=False, help_text="Code promotionnel actif ou inactif")
    used = models.BooleanField(default=False, help_text="Code promotionnel actif ou inactif")
    def __str__(self):
        return self.code
    
    def is_active(self):
        """
        Vérifie si le code promotionnel est actif en fonction de la date actuelle.
        """
        now = timezone.now()
        if self.start_date <= now <= self.end_date:
            self.active = True
        else:
            self.active = False
        self.save()  # Enregistrez la modification de la valeur act


    class Meta:
        verbose_name = "Code Promo"
        verbose_name_plural = "Code Promos"  



    




    

