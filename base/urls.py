from django.urls import path

from . import views
app_name='base'
urlpatterns = [

    path('shop/', views.product_list, name='product_list'),
    path('getcart/', views.getCart, name='get-cart'),
    path('shippingcart/', views.shippingCart, name='shipping-cart'),
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('products/<int:product_id>/', views.product_detail, name='product_detail'),
    #path('add_to_cart/<int:product_id>/<int:quantity>', views.add_to_cart, name='add_to_cart'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('remove_from_cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/', views.cart, name='cart'),
    path('promo/', views.codePromo, name='promo'),
    path('search/', views.Search, name='search'),

    path('update_cart/<int:product_id>/<int:quantity>', views.update_cart, name='update_cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('order_success/', views.order_success, name='order_success'),
    path('products/category/<int:category_id>/', views.products_by_category, name='products_by_category'),


]