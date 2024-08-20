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
			var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
			$(this).on('click', function(){
        var item_id = this.id.toString().substring(19);
        console.log(this)

        if (item_id){

        var quantity = $(this).prev().find('input')["0"].value
        quantity = parseInt(quantity)
        var urlTemplate = "/add_to_cart/item_id/quantity";
        var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', quantity);
        const request = new Request(updateURL, {method: 'GET'});
        console.log(request)
        // Effectuer une requête AJAX pour ajouter le produit au panier
        fetch(request)
        .then(async response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur 400: Bad Request');
          } else if (response.status === 401) {
            return Promise.reject('Erreur 401: Unauthorized');
          } else if (response.status === 403) {
            const errorData_2 = await response.json();
            console.log(errorData_2);
            console.log("tetstvs")
            console.log("tetstvs")
            throw new Error('Erreur 403: Forbidden');
          } else if (response.status === 404) {
            const errorData_1 = await response.json();
            throw new Error(errorData_1.message || 'Le repas n\'existe pas ou est en rupture de stock');
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
          console.log(error.message);
          if (error.message === 'Le repas n\'existe pas') {
            swal(nameProduct, "Le repas n'existe pas ou est en rupture de stock !", "error");
          } else if (error.message.includes("Nous pouvons seulement vous servir")) {
            swal(nameProduct, error.message, "error");
          } else if (error === "Vous n'avez pas la permission d'accéder à cette page.") {
            swal(nameProduct, "Veuillez vous connecter pour pouvoir commander", "error");
          } else if (error.message === "l'article n'existe plus en stock") {
            swal(nameProduct, "Le repas est en rupture de stock !", "error");
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
	
