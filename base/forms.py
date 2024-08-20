from django import forms
from .models import Product, Category
from django.utils import timezone
from django.core.validators import RegexValidator


class ProductForm(forms.ModelForm):
    # Champ "category" avec liste déroulante (select) de catégories disponibles
    category = forms.ModelChoiceField(queryset=Category.objects.all(), widget=forms.Select(attrs={'class': 'form-control'}))

    class Meta:
        model = Product
        fields = ['name', 'description', 'price']  # Ajout du champ 'image'

    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget = forms.TextInput(attrs={'class': 'form-control'})

        self.fields['description'].widget = forms.Textarea(attrs={'class': 'form-control'})
        self.fields['price'].widget = forms.NumberInput(attrs={'class': 'form-control'})
        #self.fields['image'].widget = forms.FileInput(attrs={'class': 'form-control'})




class AddForm(forms.Form):
    product_id = forms.IntegerField()
    quantity = forms.IntegerField()
    
class PromoForm(forms.Form):
    code = forms.CharField(
        max_length=255,
        label="Code Promo",
        widget=forms.TextInput(attrs={'class': 'stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5','placeholder':'Entrez un code promo'})
    )
class SearchForm(forms.Form):
    keyword = forms.CharField(
        max_length=255,
        label="Search",
        widget=forms.TextInput(attrs={'class': 'mtext-107 cl2 bor175 size-114 plh2 p-r-15','placeholder':'Recherchez un article','type':"text",'name':"search-product"})
    )

 
   

class DeliveryForm(forms.Form):
    delivery_address = forms.CharField(
        max_length=255,
        
        label="Adresse de livraison",
        widget=forms.TextInput(attrs={'class': 'stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5','placeholder':'Adresse de livraison'})
    )
    delivery_contact = forms.CharField(
        max_length=255,
        
        label="Contact de livraison",
        widget=forms.TextInput(attrs={'class': 'stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5','placeholder':'Contact de livraison'})
    )

    

    
    

        

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',  # Modifiez cette regex en fonction de vos besoins
    message="Le numéro de téléphone doit être au format: '+999999999'. Il peut contenir jusqu'à 15 chiffres."
)

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Name','id':"name",'class':'stext-111 cl2 plh3 size-116 p-l-62 p-r-30'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email','id':'email','class':'stext-111 cl2 plh3 size-116 p-l-62 p-r-30'}))
    phone = forms.CharField(max_length=20, validators=[phone_regex], widget=forms.TextInput(attrs={'placeholder': 'Phone', 'id': 'phone','class':'stext-111 cl2 plh3 size-116 p-l-62 p-r-30'}))
    subject = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Sujet','id':'subject','class':'stext-111 cl2 plh3 size-116 p-l-62 p-r-30'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Message','id':'message', 'cols':'30', 'rows':'10','class':'stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25'}))
   
    
