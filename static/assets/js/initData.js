const MyURL = "/getcart";
const UpdateRequest = new Request(MyURL, {method: 'GET'});
let Mypanier = JSON.parse(localStorage.getItem('panier')) || {
    'total': 0,
    'total_price': 0,
  };
//localStorage.removeItem("panier");
console.log('mon localstorage ************************')
console.log(localStorage)
console.log('mon localstorage fin ************************')
console.log('*******************mon panier***************')
console.log(Mypanier)
console.log('*******************mon panier fin***************')
// Effectuer une requête GET à l'API pour récupérer le Mypanier de l'utilisateur connecté
/*
fetch(UpdateRequest)
    .then(response => response.json())
    .then(data => {
        //document.getElementById('totalPanier').innerHTML=data.quantity;
        const showCartBtns = document.querySelectorAll('.js-show-cart');
        showCartBtns.forEach(btn => {
          btn.setAttribute('data-notify', data.quantity);
           // Affiche la valeur de data-notify pour chaque bouton dans la console
        });
        // Parcourir les éléments du Mypanier récupéré via l'API
        console.log(data)
    })
    .catch(error => {
        console.error('Erreur lors de la suppression  :', error);
        const showCartBtns = document.querySelectorAll('.js-show-cart');
        showCartBtns.forEach(btn => {
          btn.setAttribute('data-notify', 0);
           // Affiche la valeur de data-notify pour chaque bouton dans la console
        });

    });
*/
fetch(UpdateRequest)
.then(response => {

  if (response.ok) {
   
    return response.json();
  } else if (response.status === 400) {
    return response.json().then(errorData => {
      throw new Error(errorData.message || 'Erreur 400: Bad Request');
    });
  } else if (response.status === 404) {
    return response.json().then(errorData => {
      throw new Error(errorData.message ||'Erreur 403: Forbidden');
    });
  } else if (response.status === 401) {
    return Promise.reject('Erreur 401: Unauthorized');
  } else if (response.status === 500) {
    return response.json().then(errorData => {
      throw new Error(errorData.message || 'Le repas n\'existe pas ou est en rupture de stock');
    });
  } else {
    return Promise.reject('Erreur inconnue: ' + response.status);
  }
})
.then(data => {
  const showCartBtns = document.querySelectorAll('.js-show-cart');
  showCartBtns.forEach(btn => {
    btn.setAttribute('data-notify', data.quantity);
    // Affiche la valeur de data-notify pour chaque bouton dans la console
    console.log(btn.getAttribute('data-notify'));
  });
  console.log("success");
})
.catch(error => {
  const showCartBtns = document.querySelectorAll('.js-show-cart');
  showCartBtns.forEach(btn => {
    btn.setAttribute('data-notify', 0);
    
  });
});
    localStorage.setItem('panier', JSON.stringify(Mypanier));
    const showCartBtns = document.querySelectorAll('.js-show-cart');
    const cartContent = document.querySelector('.header-cart-wrapitem');
    const cartTotal = document.querySelector('.header-cart-total');
    showCartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Effectuer la requête fetch() ici
        fetch(UpdateRequest)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let cartHtml = '';
            data.panier_items.forEach(item => {
              console.log(item.product);
              let item_id = item.product.id;
              let item_name = item.product.product.name;
              let couleur = item.color;
              let taille = item.size;
              let item_price = item.product.product.is_promo ? parseFloat(item.product.product.second_price) : parseFloat(item.product.product.price);
              let item_image = item.product.product.image.imgP;
              console.log(item_image)
              let item_quantity = item.quantity;
              let item_total_price = item_price * item_quantity;
    
              cartHtml += `
                <li class="header-cart-item flex-w flex-t m-b-12">
                  <div class="header-cart-item-img">
                    <img src="${item_image}" alt="IMG">
                  </div>
    
                  <div class="header-cart-item-txt p-t-8">
                    <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                      ${item_name} ${couleur} ${taille}
                    </a>
    
                    <span class="header-cart-item-info">
                      ${item_quantity} x ${item_price.toFixed(2)} cfa
                    </span>
                  </div>
                </li>
              `;

            });
            
            console.log(cartHtml)
            cartContent.innerHTML = cartHtml;
            cartTotal.innerHTML = `Total: ${data.total}`;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération du panier :', error);
          });
      });
    });
    