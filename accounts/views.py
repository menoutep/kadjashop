from django.shortcuts import render

# Create your views here.


# Create your views here.
from django.shortcuts import render,redirect 
from django.contrib.auth import authenticate, login

from accounts.models import CustomUser
from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import UserCreationForm, UserLoginForm,CustomUserLoginForm

from allauth.account.views import LoginView,SignupView


class CustomLoginView(LoginView):
    form_class = CustomUserLoginForm
    #template_name = 'custom_login.html'

    def form_valid(self, form):
        # Logique personnalisée avant la connexion
        return super().form_valid(form)


# Dans accounts/views.py
def SignUpView(request):
    if request.method == 'POST':
        form=UserCreationForm(request.POST)
        
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            # Authentifiez l'utilisateur
            user = authenticate(request, username=username, password=password)
            # Connectez automatiquement l'utilisateur
            login(request, user)
            return redirect('base:product_list')
            
    else:
        form=UserCreationForm()
        
    context={
        'form':form,
    }
    return render(request,'accounts/signup.html',context)




def custom_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():

            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            print(username)
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirigez l'utilisateur après une connexion réussie
                #if CustomUser.objects.filter(email=request.user.email).exists():
                if user.customer:
                    # Rediriger l'utilisateur après une connexion réussie (par exemple, vers la page d'accueil)
                    return redirect('base:product_list')
                else:
                    return redirect('base:index')  # Remplacez 'page_d_accueil' par le nom de votre vue d'accueil

    else:
        form = UserLoginForm()

    context = {'form': form}
    return render(request, 'accounts/login.html', context)

def logout_view(request):
    logout(request)
    return redirect('base:index')  # logout
