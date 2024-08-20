
import logging
from django.core.serializers import serialize
import json
from django.shortcuts import render, redirect
from django.urls import reverse
from .models import Product, CartItem, CartItemProduct,Category,PromoCode,Images,ProductAttribut,ProductInventory
from .forms import PromoForm,ContactForm,SearchForm
from django.contrib.auth.decorators import login_required
from .forms import DeliveryForm
from .models import Order
from .serializers import OrderSerializer
from accounts.models import CustomUser
from django.core.mail import send_mail

from django.http import JsonResponse
from django.db.models import Q
# Create your views here.

from .serializers import CartItemProductSerializer,ProductSerializer,CartItemSerializer,ProductAttributSerializer
import json
logger_base = logging.getLogger('base')
logger_account = logging.getLogger('accounts')
def customer_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        # Vérifiez si l'utilisateur est authentifié et s'il est une instance de la classe customuser
        #if request.user.is_authenticated and CustomUser.objects.filter(user__email=request.user.email,user__username=request.user.username).exists():
        if request.user.is_authenticated and hasattr(request.user, 'customer')  is not None:
            return view_func(request, *args, **kwargs)
        else:
            logger_account.info("%s à tenté d'effectuer une action en tant que client sans en avoir la permission ",request.user.username)
            return JsonResponse({"message": "Connecter vous en tant que client"}, status=403)
    return _wrapped_view



@login_required
def index(request):
   
    categories = Category.objects.all()
    try:
        products = Product.objects.all()
        cheapest_product = products.order_by('price').first()
    except Product.DoesNotExist:
        logger_base.info('Aucun produit dans la base de données')
        products = Product.objects.none()
        cheapest_product = None
    except Exception as e:
        logger_base.error(f'Erreur lors de la récupération des produits : {e}')
        products = Product.objects.none()
        cheapest_product = None

    quantite_panier = 0
    cart_data = {}
    if hasattr(request.user, 'customer') and CartItem.objects.filter(user__user__username=request.user.username, last=True).exists():
        try:
            customer = request.user.customer
            cart = CartItem.objects.get(user=customer, last=True)
            quantite_panier = cart.quantity_sum
            cart_ = CartItemSerializer(cart)
            cart_data = cart_.data
        except CartItem.DoesNotExist:
            logger_base.info('Aucun panier trouvé pour cet utilisateur')
        except Exception as e:
            logger_base.error(f'Erreur lors de la récupération du panier : {e}')
    
    search_form = SearchForm()
    context = {
        'categories': categories,
        'products': products,
        'cheapest_product': cheapest_product,
        'quantite_panier': quantite_panier,
        'cart': cart_data,
        'search_form':search_form
    }

    try:
        slider = Images.objects.get(title="slider-1")
        context["slider"] = slider
    except Images.DoesNotExist:
        logger_base.info('Pas de slider')
    except Exception as e:
        logger_base.error(f'Erreur lors de la récupération du slider : {e}')

    try:
        sizes = ProductAttribut.objects.filter(name="taille")
        colors = ProductAttribut.objects.filter(name="couleur")
        context["sizes"] = sizes
        context["colors"] = colors
    except:
        print("aucun attribut")
        
    logger_base.debug(f'Context: {context}')

    return render(request, 'base/index.html', context)

def Search(request):


    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            keyword=form.cleaned_data["keyword"]
            products = Product.objects.filter(
                    Q(name__icontains=keyword) |
                    Q(category__name__icontains=keyword) |
                    Q(description__icontains=keyword)
                )
            product_dict = {}

            for product in products:
                
                product_dict[product.id]= {
                        "id":product.pk,
                        "name":product.name,
                        "price":product.price,
                        "is_promo":product.is_promo,
                        "second_price":product.second_price,
                        "imgP":product.image.imgP.url,
                        "imgS":product.image.imgS.url,
                        "imgT":product.image.imgT.url,
                        "category":product.category.name,
                        "size":product.size,
                        'color':product.color
                        }
            
            return JsonResponse(product_dict)
        else:
            
            return JsonResponse({"message": "Nous sommes désolé, maisaucun produit ne correspond à votre demande"}, status=400)
@login_required
def product_list(request):
    categories=Category.objects.all()
    search_form = SearchForm()
    for cat in categories:
        cat.is_active()
        print(cat.active)
    q= request.GET.get('q') if request.GET.get('q') != None else ''
    try:
        categories=Category.objects.filter(Q(name__icontains=q) | Q(description__icontains=q),active=True)
    except:
        logger_base.info('Pas de categories actives')
    try : 
        products=Product.objects.filter(Q(name__icontains=q) |
                                Q(category__name__icontains=q) | 
                                Q(description__icontains=q),category__active=True)
        

        cheapest_product = products.order_by('price').first()
    except:
        logger_base.info("Aucun produits en base de données")
    context={
            'search_form':search_form,
            'categories':categories,
            'products':products,
            'cheapest_product':cheapest_product
        }
    return render(request, 'base/product_list.html',context)

@login_required
def products_by_category(request, category_id):
    # Récupérez la catégorie en fonction de l'ID
    try : 
        search_form = SearchForm()
        categories = Category.objects.all()
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        logger_base.info("Cet id :%s ne correspond à aucun id de category en bd ", category_id)
    
    # Récupérez les repas appartenant à cette catégorie
    try:
        products = Product.objects.filter(category=category)
        cheapest_product = Product.objects.all().order_by('price').first()
    except:
        logger_base.info("Aucun produit dans cette categorie")

    context = {
        'search_form':search_form,
        'categories': categories, 
        'category': category, 
        'products': products,
        'cheapest_product':cheapest_product,
            }
    return render(request, 'base/products_by_category.html', context)


def contact(request):
    form = ContactForm() 
    try:
        slider = Images.objects.get(title="contact-slider")
        categories = Category.objects.all()
    except:
       logger_base.info("Aucun slider chargé pour la page about") 
       slider = Images.objects.none()
        
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name=form.cleaned_data["name"]
            email=form.cleaned_data["email"]
            phone=form.cleaned_data["phone"]
            message=form.cleaned_data["message"]
            subject=form.cleaned_data["subject"]
            subject = f'Message contact de {name} au sujet de {subject}'
            message += f"le numero de l'utilisateur est {phone}:\n\n"
            message += f'le message est : {message},\n\n'
            from_email = 'jozacoder@gmail.com'  # Remplacez par votre adresse e-mail
            recipient_list = ['josephzabre@gmail.com']  # Adresse e-mail du destinataire (utilisateur)            
            send_mail(subject, message, from_email, recipient_list)
        else:
            form = ContactForm()
        
    context = {
                'form': form,
                'slider':slider,
                'categories':categories
                
        }
    return render(request, 'base/contact.html',context)

def about(request):
    try:
        slider = Images.objects.get(title="about-slider")
        categories = Category.objects.all()
    except:
       logger_base.info("Aucun slider chargé pour la page about") 
       slider = Images.objects.none()
    
    context = {
        'slider':slider,
        'categories':categories
    }

    return render(request, 'base/about.html',context)


def product_detail(request, product_id):
    categories = Category.objects.all()
    product = Product.objects.get(pk=product_id)
    category = product.category
    # Récupérez trois repas de la même catégorie, en excluant le repas actuel
    similar_products = Product.objects.filter(category=category).exclude(pk=product_id)[:4]
    context = {
        'categories': categories, 
        'product': product,
        'similar_products':similar_products
        }
    return render(request, 'base/product_detail.html', context)


@customer_required
def add_to_cart(request):
    try:
        product_id :int = request.POST.get('product_id')
        quantity = int(request.POST.get('quantity')) if int(request.POST.get('quantity')) > 0 else 1
        couleur = request.POST.get('couleur')
        couleur_ = ProductAttribut.objects.get(valeur=couleur)
        taille = request.POST.get('taille')
        taille_ = ProductAttribut.objects.get(valeur=taille)
        product_inventory = ProductInventory.objects.get(product__pk=product_id,size__valeur=taille,color__valeur=couleur)
    except ProductInventory.DoesNotExist:
        logger_base.info(f"Aucun produit en inventaire pour id produit : {product_id} ")
        return JsonResponse({"message": "Le produit n'existe pas en inventaire"}, status=400)
    except ProductAttribut.DoesNotExist:
        logger_base.info(f"Pas d'attibut : {product_id} ")
        return JsonResponse({"message": "choisissez une taille et une couleur"}, status=400)
    if product_inventory.stock > 0:
        if product_inventory.stock - quantity < 0:
            return JsonResponse({"message": f"Nous pouvons seulement vous servir : {product_inventory.stock}"}, status=400)
        customer = request.user.customer
        cart, created_ = CartItem.objects.get_or_create(user=customer, last=True)
        cart_item_product, created = CartItemProduct.objects.get_or_create(cart_item=cart, product=product_inventory,color=couleur,size=taille)
        cart_item_product.quantity = quantity if created else cart_item_product.quantity + quantity
        cart_item_product.save()
        cart.calculate_total()
        cart.quantity = cart.quantity_sum
        cart.save()
        cart_item = CartItemSerializer(cart)
    else:
        logger_base.info("l'article n'existe plus en stockr")
        return JsonResponse({"message": "l'article n'existe plus en stock"}, status=400)
        
    return JsonResponse(cart_item.data)



@customer_required
def cart(request):
    try :
        categories = Category.objects.all()
        customer = request.user.customer
        cart, created = CartItem.objects.get_or_create(user=customer,last=True)
        quantite_panier = cart.quantity_sum
        ancien_total = 0
    except  :
        logger_base.info("Problème avec l'entre de code promo")
    if request.method == 'POST':
        form = DeliveryForm(request.POST)
        if form.is_valid():
            try:
                delivery_address = form.cleaned_data['delivery_address']
                delivery_contact = form.cleaned_data['delivery_contact']
                
                order_total = cart.calculate_total(promo_code=request.session.__getitem__('code_promo')) + 500
                order = Order.objects.create(
                    user=customer,
                    delivery_address=f"{delivery_address} / {delivery_contact}",
                    order_total=order_total,       
                )
                order.items.set(cart.panier_items.all())
                order.save()  
                order.updateStock
            except Exception as e :
                logger_base.error(f'Problème lors de la creation de la commande : ',{e})
                pass
            try:
                send_order_email(order)
            except:
                logger_base.error(f'Problème envoie mail')
            cart.last=False
            cart.save()
            return redirect('base:index')
    else:
        form = DeliveryForm()
        promo_form = PromoForm()
    context = {
                'categories': categories, 
               'cart': cart, 
               'total': cart.total,
               'ancien_total':ancien_total,
               'quantite_panier':quantite_panier,
               'form':form,
               'promo_form':promo_form
                }
    return render(request, 'base/cart.html', context)

def codePromo(request):

    if request.method == 'POST':
        print('ggggggggggggg')
        form = PromoForm(request.POST)
        if form.is_valid():
            try:
                customer = request.user.customer
                # Récupérez le panier de l'utilisateur connecté
                cart = CartItem.objects.get(user=customer,last=True)
                code = form.cleaned_data['code']
                total = cart.calculate_total()
                print(total)
                promo = PromoCode.objects.get(code=code)
            except :
                #logger_base.error(f'Problème code promo : ',e)
                return JsonResponse({"message": "Une erreur est survenue lors du traitement de votre code promo"}, status=400)
            try :
                promo.is_active()
            except:
                return JsonResponse({"message": "Votre code promo n'est plus fiable"}, status=400)
            if promo is not None and promo.active == True :
                if promo.used == False:
                    discount_type = promo.discount_type.lower()
                    if discount_type == 'percent':
                        request.session['code_promo'] = code
                        print('popopo')
                        discount = (total * promo.discount_value)/100
                        cart.total = total-discount
                        promo.used = True
                        promo.save()
                        cart.save()
                    elif discount_type == 'amount':
                        request.session['code_promo'] = code
                        discount = promo.discount_value
                        cart.total = total - discount
                        promo.used = True
                        promo.save()
                        cart.save()
                    print(promo.used)
                    cart_item = CartItemSerializer(cart)
                    return JsonResponse(cart_item.data)
                else:
                    return JsonResponse({"message": "Ce code promo à déja été utilisé !"}, status=400)
            
            else :
                return JsonResponse({"message": "Code promo inactif !"}, status=400)
        else:
            return JsonResponse({"message": "Code promo invalide !"}, status=400)

            


def getCart(request):
    try:
        customer = request.user.customer
        cart, created = CartItem.objects.get_or_create(user=customer, last=True)
        cart.calculate_total()
        cart.quantity_sum
        serializer = CartItemSerializer(cart)
        print(serializer.data['panier_items'])
        response = JsonResponse(serializer.data, safe=True)
        response['Content-Type'] = 'application/json'
        return response
    except CartItem.DoesNotExist:
        logger_base.info('Aucun panier trouvé pour cet utilisateur')
        return JsonResponse({'message': 'Aucun panier trouvé pour cet utilisateur'}, status=404)
    except AttributeError:
        logger_base.error('L\'utilisateur n\'a pas de client associé')
        return JsonResponse({'message': 'L\'utilisateur n\'a pas de client associé'}, status=400)
    except Exception as e:
        logger_base.error(f'Erreur lors de la récupération du panier : {e}')
        return JsonResponse({'message': 'Une erreur est survenue lors de la récupération du panier'}, status=500)

   
@customer_required
def update_cart(request, product_id,quantity):
    try:
        customer = request.user.customer
        cart_item_product = CartItemProduct.objects.get(id=product_id)
    except CartItemProduct.DoesNotExist:
        # Gérer le cas où le repas n'est pas dans le panier
        return JsonResponse({'message': 'Une erreur est survenue lors de la récupération de l\' article dans panier'}, status=500)
    if quantity is not None:
        cart_item_product.quantity = quantity
        cart_item_product.save()
        cart_item_product_total = cart_item_product.calculate_item_total()
        customer = request.user.customer
        cart = CartItem.objects.get(user=customer,last=True)
        cart_total = cart.calculate_total()
        cart.quantity = cart.quantity_sum 
        cart.save()
        cart_ = CartItemSerializer(cart)
        #send_cart_item_count_to_clients(cart.quantity_sum)
        #response_data = {'message': 'Quantité mise à jour avec succès', 'new_quantity': cart_item_product.quantity, 'item_total':cart_item_product_total,'cart_total':cart_total}
    #redirect('base:cart')
    return JsonResponse(cart_.data)

@customer_required
def remove_from_cart(request, product_id):
    customer = request.user.customer
    try:
        cart_item_product = CartItemProduct.objects.get(pk=product_id)
        cart_item_product.delete()
    except CartItemProduct.DoesNotExist:
        # Gérer le cas où le repas n'est pas dans le panier
        pass

    cart = CartItem.objects.get(user=customer,last=True)
    cart_total = cart.calculate_total()
    cart.quantity = cart.quantity_sum 
    cart.save()
    #send_cart_item_count_to_clients(cart.quantity_sum)
    response_data = {'message': 'Quantité mise à jour avec succès','cart_total':cart_total}
    #redirect('base:cart')
    cart_ = CartItemSerializer(cart)

    return JsonResponse(cart_.data)


def shippingCart(request):
    customer = request.user.customer
    cart = CartItem.objects.get(user=customer,last=True)
    cart.total += 500
    cart.save()




@customer_required
def checkout(request):
    try : 
        customer = request.user.customer
        cart = CartItem.objects.get(user=customer,last=True)
        quantite_panier = cart.quantity_sum
    except :
        logger_base.error(f'Impossible de charger le panier du client au moment de la commande')
        pass
    if request.method == 'POST':
        form = DeliveryForm(request.POST)
        if form.is_valid():
            try:
                delivery_address = form.cleaned_data['delivery_address']
                delivery_contact = form.cleaned_data['delivery_contact']
                order_total = cart.calculate_total() + 500
                order = Order.objects.create(
                    user=customer,
                    delivery_address=f"{delivery_address} / {delivery_contact}",
                    order_total=order_total,       
                )
                order.items.set(cart.panier_items.all())
                order.save()  
                order.updateStock
            except Exception as e :
                logger_base.error(f'Problème lors de la creation de la commande : ',{e})
                pass
            try:
                send_order_email(order)
            except:
                logger_base.error(f'Problème envoie mail')
            cart.last=False
            cart.save()
            return redirect('base:index')
    else:
        form = DeliveryForm()
    
    context = {'cart': cart, 'form': form,'order_total': cart.total,'quantite_panier':quantite_panier}
    return render(request, 'base/checkout.html', context)


@customer_required
def order_success(request):
    customer = request.user.customer
    last_order = Order.objects.filter(user=customer).latest('created_at')
    
    # Vous pouvez ajouter du contexte ici si nécessaire
    return render(request, 'base/order_success.html',context={'order':last_order})



def send_order_email(order,subject):
    # Créez le contenu de l'e-mail
    
    customer = CustomUser.objects.get(user=order.user.user)
    phone_number = customer.phone_number

    if subject : 
        message = f"Une nouvelle livraison est en attente\n"
        subject = 'Nouvelle livraison\n'
        
    

    else : 
        print('envoi mail')
        subject = 'Confirmation de commande'
        message = f"Bonjour ChapFood,\n"
        recipient_list = ['josephzabre@gmail.com']

    message += f"Vous avez une commande de {order.user.user.username}.\nContact : {phone_number}.\n Voici un récapitulatif de sa commande :\n\n"

    for item in order.items.all():
        message += f"{item.product.product.name} x{item.quantity}: {item.calculate_item_total()} cfa\n"
    
    message += f"Total de la commande : {order.order_total} cfa\n"

    # Envoyez l'e-mail
    from_email = 'jozacoder@gmail.com'  # Remplacez par votre adresse e-mail
    
      # Adresse e-mail du destinataire (utilisateur)

    send_mail(subject, message, from_email, recipient_list)


    


