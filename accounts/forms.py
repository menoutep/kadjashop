# Dans accounts/forms.py
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import password_validation

from django.core.validators import validate_email, RegexValidator
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm,PasswordChangeForm,SetPasswordForm
from .models import CustomUser
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, Submit, Submit, ButtonHolder
from .validators import username_is_unique,validate_password,mail_is_unique
from django.core.exceptions import ValidationError
from allauth.account.forms import SignupForm,LoginForm
from django.contrib.auth.forms import UserCreationForm as BaseUserCreationForm
phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',  # Modifiez cette regex en fonction de vos besoins
    message="Le numéro de téléphone doit être au format: '+999999999'. Il peut contenir jusqu'à 15 chiffres."
)
username_validator = UnicodeUsernameValidator()



# Validators (assurez-vous de les définir correctement)
def username_validator(value):
    if len(value) < 4 or len(value) > 150:
        raise ValidationError("Le nom d'utilisateur doit contenir entre 4 et 150 caractères.")

def username_is_unique(value):
    if User.objects.filter(username=value).exists():
        raise ValidationError("Ce nom d'utilisateur est déjà pris.")

def validate_email(value):
    if User.objects.filter(email=value).exists():
        raise ValidationError("Cette adresse email est déjà utilisée.")

def phone_regex(value):
    import re
    if not re.match(r'^\+?1?\d{9,15}$', value):
        raise ValidationError("Le numéro de téléphone doit être au format international.")

class UserCreationForm(BaseUserCreationForm):
    username = forms.CharField(
        max_length=150,
        min_length=4,
        label="Nom d'utilisateur",
        help_text="Minimum 4 caractères, maximum 150.",
        widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Entrez votre nom d\'utilisateur'}),
        validators=[username_validator, username_is_unique],
    )
    email = forms.EmailField(
        label="Email",
        help_text="Adresse mail active",
        widget=forms.EmailInput(attrs={'class':'form-control','placeholder':'Entrez votre email'}),
        validators=[validate_email],
    )
    phone_number = forms.CharField(
        max_length=13,
        label="Téléphone",
        help_text="Format : +2250667897876",
        widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Entrez votre numéro de téléphone'}),
        validators=[phone_regex],
    )
    password1 = forms.CharField(
        max_length=60,
        min_length=8,
        widget=forms.PasswordInput(attrs={'class':'form-control','placeholder':'Entrez votre mot de passe'}),
        label="Mot de passe",
        help_text="Doit contenir au moins 8 caractères et des chiffres",
        validators=[validate_password],
    )
    password2 = forms.CharField(
        max_length=60,
        min_length=8,
        widget=forms.PasswordInput(attrs={'class':'form-control','placeholder':'Confirmation du mot de passe'}),
        label="Confirmation du mot de passe",
        help_text="Veuillez entrer le même mot de passe ci-dessus.",
        validators=[validate_password],
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get('password2')
        if password1 and password2:
            if not validate_password(password1):
                raise ValidationError("Le mot de passe doit contenir au moins 8 caractères et des chiffres.")
            elif password1 != password2:
                raise ValidationError("Les mots de passe ne sont pas identiques.")

    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_show_labels = True
        self.helper.form_show_errors = True

        self.helper._help_text_inline = True
        self.helper.layout = Layout(
            Field('username', css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('email', css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('phone_number', css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('password1', css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('password2', css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Submit('submit', "S'enregistrer", css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
        )

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
            CustomUser.objects.create(
                user=user,
                phone_number=self.cleaned_data["phone_number"],
            )
        return user



class UserLoginForm(forms.Form):
    username = forms.CharField(
        max_length=150,
        label="Nom d'utilisateur",
        widget=forms.TextInput(attrs={'class': 'stext-111 cl2 plh3 size-116 p-l-62 p-r-30','name':'email' ,'type':'text','placeholder': 'Nom d\'utilisateur'})
    )
    password = forms.CharField(
        label="Mot de passe",
        widget=forms.PasswordInput(attrs={'class': 'stext-111 cl2 plh3 size-116 p-l-62 p-r-30','type':'password' , 'placeholder': 'Mot de passe'})
    )

    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        


        self.helper.layout = Layout(
            
            Field('username',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            
            Field('password',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Submit('submit', 'Se connecter', css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
        )

class PasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        label = 'email',
        help_text="Entrez l'adresse email avec laquelle vous vous etes inscrit.",
        widget=forms.TextInput(attrs={'class':'stext-111 cl2 plh3 size-116 p-l-62 p-r-30','placeholder': 'Votre adresse mail'})
        )
    def __init__(self, *args, **kwargs):
        super(PasswordResetForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        
        self.helper.form_show_labels = True  # Afficher les étiquettes des champs
        self.helper.form_show_errors =True
        self.helper._help_text_inline = False
        self.helper.layout = Layout(
            
            Field('email',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            
            Submit('submit',"Réinitialiser mon mot de passse", css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
            
        )
class PasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(
        label=("Ancien mot de passe"),
        strip=False,
        
        widget=forms.PasswordInput(
            attrs={"autocomplete": "mot de passe actuel", "autofocus": True,'class':'form-control','placeholder':'Entrez votre ancien mot de passe'}
        ),
    )
    new_password1 = forms.CharField(
        label=("Nouveau mot de passe"),
        widget=forms.PasswordInput(attrs={"autocomplete": "nouveau-mot de passe",'class':'form-control','placeholder':'Entrez votre mot de passe'}),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=("Nouveau mot de passe confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "Nouveau mot de passe",'class':'form-control','placeholder':'Confirmation du mot de passe'}),
    )
    field_order = ["old_password", "new_password1", "new_password2"]

    def __init__(self,*args, **kwargs):
        
        super(PasswordChangeForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        self.helper.form_show_labels = True  # Afficher les étiquettes des champs
        self.helper.form_show_errors =True
        self.helper._help_text_inline = True
        self.helper.layout = Layout(
            
            Field('old_password',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('new_password1',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('new_password2',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Submit('submit',"Réinitialiser mon mot de passse", css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
            
        )

class SetPasswordForm(SetPasswordForm):
    """
    A form that lets a user set their password without entering the old
    password
    """

    error_messages = {
        "password_mismatch":("The two password fields didn’t match."),
    }
    new_password1 = forms.CharField(
        label=("Nouveau mot de passe"),
        widget=forms.PasswordInput(attrs={"autocomplete": "nouveau-mot de passe",'class':'form-control', "autofocus": True,'placeholder':'Entrez votre mot de passe'}),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=("Nouveau mot de passe confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "Nouveau mot de passe",'class':'form-control','placeholder':'Confirmation du mot de passe'}),
    )
    def __init__(self, user, *args, **kwargs):
        self.user = user
        super(SetPasswordForm,self).__init__(*args,user, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        self.helper.form_show_labels = True  # Afficher les étiquettes des champs
        self.helper.form_show_errors =True
        self.helper._help_text_inline = True
        self.helper.layout = Layout(
        
            Field('new_password1',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('new_password2',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Submit('submit',"Réinitialiser mon mot de passse", css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
            
        )


class CustomAllauthSignForm(SignupForm):
    username = forms.CharField(
        max_length=150,
        min_length=4,
        label="Nom d'utilisateur",
        help_text="Minimum 4 caractères, maximum 150.",
        widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Entrez votre nom username'}),
        validators=[username_validator,username_is_unique],
        )
    email = forms.EmailField(
        label="email",
        help_text="adresse mail active",
        widget=forms.EmailInput(attrs={'class':'form-control','placeholder':'Entrez votre nom email'}),
        validators=[validate_email,mail_is_unique] 
        )
    phone_number = forms.CharField(
        max_length=13,
        label="télephone",
        help_text="format : +2250667897876",
        widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Entrez votre numéro de telephone'}),
        validators=[phone_regex],
        )
   

    def __init__(self, *args, **kwargs):
        super(CustomAllauthSignForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        self.helper.form_class = 'my-form'  # Classe CSS pour le formulaire
        self.helper.form_show_labels = True  # Afficher les étiquettes des champs
        self.helper.form_show_errors =True
        self.helper.label_class = 'col-sm-3 col-form-label'
        self.helper.field_class = 'col-sm-8'
        self.helper._help_text_inline = True
        self.helper.layout = Layout(
            Field('username',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('email',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Field('phone_number',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),

            Submit('submit', "S'enregistrer", css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
        )
    def save(self, request):

        # Ensure you call the parent class's save.
        # .save() returns a User object.
        user = super(CustomAllauthSignForm, self).save(request)
        custom_user=CustomUser.objects.create(username=user.username,email=user.email,social_account=True)
        # Définissez un mot de passe aléatoire car l'utilisateur s'authentifiera via le compte social
        user.set_password(CustomUser.objects.make_random_password())
        user.save()

        # Complétez le processus d'inscription sociale
        self.custom_signup(request, user)

        # Add your own processing here.

        # You must return the original result.
        return user


class CustomUserLoginForm(LoginForm):
    login = forms.CharField(
        max_length=150,
        label="Nom d'utilisateur",
        widget=forms.TextInput(attrs={'class': 'stext-111 cl2 plh3 size-116 p-l-62 p-r-30','name':'email' ,'type':'text','placeholder': 'Nom d\'utilisateur'})
    )
    password = forms.CharField(
        label="Mot de passe",
        widget=forms.PasswordInput(attrs={'class': 'stext-111 cl2 plh3 size-116 p-l-62 p-r-30','type':'password' , 'placeholder': 'Mot de passe'})
    )

    def __init__(self, *args, **kwargs):
        super(CustomUserLoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'  # Méthode du formulaire (post par défaut)
        
        

        self.helper.layout = Layout(
            
            Field('login',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            
            Field('password',css_class='stext-111 cl2 plh3 size-116 p-l-62 p-r-30'),
            Submit('submit', 'Se connecter', css_class='flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer')
        )
