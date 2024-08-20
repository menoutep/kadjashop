function getTotalPrice(cart) {
  var total = 0;
  for (var id in cart) {
      if (id === 'total' || id === 'total_price') {
        console.log(panier['total'] + ' est un entier');
      } else {
      if (cart.hasOwnProperty(id)) {
        var item = cart[id];
        total += parseInt(item[2])* parseInt(item[0]); // Prix unitaire * Quantité
      }
    }
  }
  return total;
}
  
  function getTotal(cart) {
    var total = 0;
    for (var id in cart) {
        if (id === 'total' || id === 'total_price') {
        } else {
        if (cart.hasOwnProperty(id)) {
          var item = cart[id];
          total += parseInt(item[0])
        }
      }
    }
    return total;
  }
  
/*
let panier = JSON.parse(localStorage.getItem('panier')) || {
  'total': 0,
  'total_price': 0,
};
console.log(panier)
*/
//panier = JSON.parse(localStorage.getItem('panier'));
/*
$(document).on('click', '.ted', function(){

    var item_id = this.id.toString().substring(19);
    const quantity = 1;
    var urlTemplate = "/add_to_cart/item_id/quantity";
    var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', quantity);
    const request = new Request(updateURL, {method: 'GET'});
    // Effectuer une requête AJAX pour ajouter le produit au panier
    fetch(request)
    .then(response => response.json())
    .then(data => {
      console.log('eee')
        document.getElementById('totalPanier').innerHTML=data.quantity;
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout au panier :', error);
      });
    });

*/

  
		$('.js-addwish-b2').on('click', function(e){
			e.preventDefault();
		});

		$('.js-addwish-b2').each(function(){
			var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
			$(this).on('click', function(){
				swal(nameProduct, "is added to wishlist !", "success");

				$(this).addClass('js-addedwish-b2');
				$(this).off('click');
			});
		});

		$('.js-addwish-detail').each(function(){
			var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

			$(this).on('click', function(){
				swal(nameProduct, "is added to wishlist !", "success");

				$(this).addClass('js-addedwish-detail');
				$(this).off('click');
			});
		});

		/*---------------------------------------------*/

		$('.js-addcart-detail').each(function(){
      //var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
      var input = $(this).prev().find('input')["0"]
      var nameProduct = input.dataset.name
      console.log("eeeeeeee:",nameProduct)
			$(this).on('click', function(event){
        event.preventDefault()
        var item_id = this.id.toString().substring(19);
        console.log(this)

        if (item_id){

        var quantity = $(this).prev().find('input')["0"].value
        
        quantity = parseInt(quantity)
        let formData = new FormData();
        var couleur = $(this).closest('form').find('select[name="couleur"]').val();
        console.log('Color:', couleur);
        var taille = $(this).closest('form').find('select[name="taille"]').val();
        console.log('taille:', taille);
        formData.append('couleur', couleur);
        formData.append('taille', taille);
        formData.append('quantity', quantity);
        formData.append('product_id', item_id);
        let csrfTokenValue = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var updateURL = "/add_to_cart/";
        const request = new Request(updateURL, {
          method: 'POST',
          body: formData,
          headers: {'X-CSRFToken': csrfTokenValue}  // On ajoute le token dans l'en-tête
    });
        console.log(request)
        // Effectuer une requête AJAX pour ajouter le produit au panier
        fetch(request)
        .then(response => {
          console.log(response.status)
          if (response.ok) {
            console.log(response.status)
            return response.json();
          } else if (response.status === 400) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Erreur 400: Bad Request');
            });
          } 
          else if (response.status === 403) {
            return response.json().then(errorData => {
              throw new Error(errorData.message ||'Erreur 403: Forbidden');
            });
          } else if (response.status === 401) {
            return Promise.reject('Erreur 401: Unauthorized');
          } else if (response.status === 404) {
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
          swal(nameProduct, "is added to cart !", "success");
        })
        .catch(error => {
          console.error('Erreur:', error.message);
          console.log('Erreur:', error.message);
          if (error.message === 'Le repas n\'existe pas') {
            swal(nameProduct, "Le repas n'existe pas ou est en rupture de stock !", "error");
          } 
          else if (error.message.includes("Nous pouvons seulement vous servir")) {
            swal(nameProduct, error.message, "error");
          } else if (error.message === "choisissez une taille et une couleur") {
            swal(nameProduct, error.message, "error");
          }else if (error.message === "Nous pouvons seulement vous servir") {
            swal(nameProduct, error.message, "error");
          } else if (error.message === "l'article n'existe plus en stock") {
            console.log("pb swal")
            swal(nameProduct, "Le repas est en rupture de stock !", "error");
          } else if (error.message === "Connecter vous en tant que client") {
            swal(nameProduct, "Connecter vous en tant que client", "error");
          } else {
            swal(nameProduct, "Impossible d'ajouter le produit au panier !", "error");
          }
        });
      
      
      
        }
        else {
          $(this).closest("span")
          
          console.log("ok")
        }

				
			});
		});
    function parcourirDictionnaire(dictionnaire, prefix = "") {
      for (const cle in dictionnaire) {
          if (dictionnaire.hasOwnProperty(cle)) {
              const valeur = dictionnaire[cle];
              if (typeof valeur === "object" && valeur !== null) {
                  // Si la valeur est un objet, on appelle la fonction récursivement
                  parcourirDictionnaire(valeur, prefix + cle + ".");
              } else {
                  // Sinon, on affiche la clé et la valeur
                  console.log(`${prefix}${cle}: ${valeur}`);
              }
          }
      }
  }
  

  /*
    $('.rs1-select2').each(function(){
			$(this).on('click', function(event){
        event.preventDefault()
        id = $(this).find('select').attr('id');
        selectElement = $(this).find('select')["0"];
        console.log(selectElement)
        console.log(id)
        tab=id.split("-")
        tache = tab[1]
        item_id = tab[2] 
        if (item_id){
          if (tache==="couleur"){
            var urlTemplate = "/get-color/item_id/";
          }
          else if (tache==="taille"){
            var urlTemplate = "/get-size/item_id/";
          }
          else {
            console.log("erreur")
          }
        var updateURL = urlTemplate.replace('item_id', parseInt(item_id)  );
        const request = new Request(updateURL, { method: 'GET', });
        console.log(request)
        // Effectuer une requête AJAX pour ajouter le produit au panier
        fetch(request)
        .then(response => {
          console.log(response.status)
          if (response.ok) {
            console.log(response.status)
            return response.json();
          } else if (response.status === 400) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Erreur 400: Bad Request');
            });
          } else if (response.status === 403) {
            return response.json().then(errorData => {
              throw new Error(errorData.message ||'Erreur 403: Forbidden');
            });
          } else if (response.status === 401) {
            return Promise.reject('Erreur 401: Unauthorized');
          } else if (response.status === 404) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Le repas n\'existe pas ou est en rupture de stock');
            });
          } else {
            return Promise.reject('Erreur inconnue: ' + response.status);
          }
        })
        .then(data => {
          console.log(data)
          if (selectElement) {
            // Vider les options existantes
            selectElement.innerHTML = '';
    
            // Ajouter l'option par défaut
            const defaultOption = document.createElement('option');
            defaultOption.textContent = 'Choisir une option';
            selectElement.appendChild(defaultOption);
    
            // Ajouter les nouvelles options à partir de la liste de dictionnaires
            data.forEach(dictionnaire => {
                if (dictionnaire.fields && dictionnaire.fields.valeur) {
                    const option = document.createElement('option');
                    option.textContent = dictionnaire.fields.valeur;
                    selectElement.appendChild(option);
                }
            });
          }
   
        })
        .catch(error => {
          console.error('Erreur:', error.message);
         
       
        });
        }
        else {
          $(this).closest("span")
          
          console.log("ok")
        }
			});
		});
	
*/