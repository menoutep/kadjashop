



let panier = JSON.parse(localStorage.getItem('panier')) || {
  'total': 0,
  'total_price': 0,
};
console.log("****************panier panier ")
console.log(panier)
console.log("****************panier panier ")


document.querySelectorAll('div.how-itemcart1').forEach(function(element) {
  element.addEventListener('click', function(event) {
      console.log(element);
      const item_id = element.dataset.id.toString().substring(15);
      console.log(item_id)
      const row = element.closest('tr');
      const prix_unitaire = row.querySelector('.column-3').textContent;
      console.log("test prix "+prix_unitaire)
      element.closest('td').parentNode.remove();
      var urlTemplate = "/remove_from_cart/item_id";
      var updateURL = urlTemplate.replace('item_id', item_id);
      const request = new Request(updateURL, {method: 'GET'});
      console.log(request)
      fetch(request)
      .then(response => response.json())
        .then(data => {
          //document.getElementById('totalPanier').innerHTML=data.quantity;
          const showCartBtns = document.querySelectorAll('.js-show-cart');
          showCartBtns.forEach(btn => {
            btn.setAttribute('data-notify', data.quantity);
             // Affiche la valeur de data-notify pour chaque bouton dans la console
          });
          // Parcourir les éléments du Mypanier récupéré via l'API
          document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
          document.getElementById('total_cart').innerHTML=data.total + ' cfa';
  
          // Enregistrer le Mypanier mis à jour dans le local storage
          
  
          //localStorage.setItem('panier', JSON.stringify(Mypanier));
      })
        .catch(error => {
          console.error('Erreur lors de la mise a jour  :', error);
        });
      event.preventDefault();
    });
  }
);

  test = document.querySelectorAll('input.num-product');

  console.log(test);
  document.querySelectorAll('input.num-product').forEach(function(element) {
    console.log(element)

    element.addEventListener('change', function(event) {
      console.log("valeur input  :" +element.value)
      var new_quantity = element.value.trim();
      const item_id = element.dataset.id.toString().substring(15);
      
      const row = element.closest('tr');
      const prix_unitaire = row.querySelector('.column-3').textContent;
      console.log(prix_unitaire);
      if (new_quantity === "") {
          new_quantity = 0;
          //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
          confirm("attention cette action ne supprimera pas l'objet de votre panier. \nSi vous voulez supprimer l'objet de votre panier vous devez cliquez sur la croix rouge.\nLa quantité avant suppression sera conservé si le champs quantité reste vide.\nNous vous remercions.")
          
      }
      else{
        //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
        var urlTemplate = "/update_cart/item_id/quantity";
        var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', new_quantity);
        const request = new Request(updateURL, {method: 'GET'});
        console.log(request)
        fetch(request)
        .then(response => response.json())
          .then(data => {
            //document.getElementById('totalPanier').innerHTML=data.quantity;
            const showCartBtns = document.querySelectorAll('.js-show-cart');
            showCartBtns.forEach(btn => {
              btn.setAttribute('data-notify', data.quantity);
               // Affiche la valeur de data-notify pour chaque bouton dans la console
            });
            // Parcourir les éléments du Mypanier récupéré via l'API
            document.getElementById('product_total-'+item_id).innerHTML= parseInt(prix_unitaire) * parseInt(new_quantity)  + 'cfa'
            document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
            document.getElementById('total_cart').innerHTML=data.total + ' cfa';
    
            // Enregistrer le Mypanier mis à jour dans le local storage
            
    
            //localStorage.setItem('panier', JSON.stringify(Mypanier));
        })
          .catch(error => {
            console.error('Erreur lors de la mise a jour  :', error.message);
          });
      }

      //make_cart(panier);


      
    });


  });


$('.btn-num-product-down').on('click', function(){
  console.log("moiiiiiiiiiiiiiiiiiiiiiiiiii")
    var numProduct = Number($(this).next().val());
    var element = $(this).next()["0"]
    console.log(element);
    if(numProduct > 0) {
      $(this).next().val(numProduct - 1);
      //new_quantity = numProduct - 1;
      
        console.log("valeur input  :" +element.value)
        var new_quantity = element.value.trim();
        const item_id = element.dataset.id.toString().substring(15);

        const row = element.closest('tr');
        if (row){
          const prix_unitaire = row.querySelector('.column-3').textContent;
          console.log(prix_unitaire);
          if (new_quantity === "") {
              new_quantity = 0;
              //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
              confirm("attention cette action ne supprimera pas l'objet de votre panier. \nSi vous voulez supprimer l'objet de votre panier vous devez cliquez sur la croix rouge.\nLa quantité avant suppression sera conservé si le champs quantité reste vide.\nNous vous remercions.")
              
          }
          else{
            //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
            var urlTemplate = "/update_cart/item_id/quantity";
            var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', new_quantity);
            const request = new Request(updateURL, {method: 'GET'});
            console.log(request)
            fetch(request)
            .then(response => response.json())
              .then(data => {
                //document.getElementById('totalPanier').innerHTML=data.quantity;
                const showCartBtns = document.querySelectorAll('.js-show-cart');
                showCartBtns.forEach(btn => {
                  btn.setAttribute('data-notify', data.quantity);
                  // Affiche la valeur de data-notify pour chaque bouton dans la console
                });
                console.log("data total",data.total)
                // Parcourir les éléments du Mypanier récupéré via l'API
                document.getElementById('product_total-'+item_id).innerHTML= parseInt(prix_unitaire) * parseInt(new_quantity)  + 'cfa'
                document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
                document.getElementById('total_cart').innerHTML=data.total + ' cfa';
        
                // Enregistrer le Mypanier mis à jour dans le local storage
                
        
                //localStorage.setItem('panier', JSON.stringify(Mypanier));
            })
              .catch(error => {
                console.error('Erreur lors de la mise a jour  :', error.message);
              });
          }
        }

    }
    
      
});

$('.btn-num-product-up').on('click', function(){
    var numProduct = Number($(this).prev().val());
    var element = $(this).prev()["0"];
    console.log(element);

    $(this).prev().val(numProduct + 1);
     //const new_quantity = numProduct + 1;
   
      console.log("valeur input  :" +element.value)
      var new_quantity = element.value.trim();
      const item_id = element.dataset.id.toString().substring(15);
      const row = element.closest('tr');
      if (row){
        const prix_unitaire = row.querySelector('.column-3').textContent;
        console.log(prix_unitaire);
        if (new_quantity === "") {
            new_quantity = 0;
            //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
            confirm("attention cette action ne supprimera pas l'objet de votre panier. \nSi vous voulez supprimer l'objet de votre panier vous devez cliquez sur la croix rouge.\nLa quantité avant suppression sera conservé si le champs quantité reste vide.\nNous vous remercions.")
            
        }
        else{
          //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
          var urlTemplate = "/update_cart/item_id/quantity";
          var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', new_quantity);
          const request = new Request(updateURL, {method: 'GET'});
          console.log(request)
          fetch(request)
          .then(response => response.json())
            .then(data => {
              //document.getElementById('totalPanier').innerHTML=data.quantity;
              const showCartBtns = document.querySelectorAll('.js-show-cart');
              showCartBtns.forEach(btn => {
                btn.setAttribute('data-notify', data.quantity);
                 // Affiche la valeur de data-notify pour chaque bouton dans la console
              });
              // Parcourir les éléments du Mypanier récupéré via l'API
              document.getElementById('product_total-'+item_id).innerHTML= parseInt(prix_unitaire) * parseInt(new_quantity)  + 'cfa'
              document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
              document.getElementById('total_cart').innerHTML=data.total + ' cfa';
      
              // Enregistrer le Mypanier mis à jour dans le local storage
              
      
              //localStorage.setItem('panier', JSON.stringify(Mypanier));
          })
          .catch(error => {
              console.error('Erreur lors de la mise a jour  :', error);
            });
        }

      }
      else {
          
      }
      //make_cart(panier);


      
   
});
  

  
$('#shipping-total').on('click', function(){
  var shipping_loc = document.getElementById('id_delivery_address')
  console.log(shipping_loc.value)
  var shipping_tel = document.getElementById('id_delivery_contact')
  if (shipping_loc.value===""){
    swal("information incomplete !", "Veuillez entrez une adresse de livraison");
  }
  else if (shipping_tel.value===""){
    swal("information incomplete !", "Veuillez entrez une adresse de livraison");
  }
  
  else {
    console.log(shipping_tel.value)
    var subTotalCart= document.getElementById("sub_total_cart").innerText;
    console.log(subTotalCart)
    var totalCart = parseInt(subTotalCart) + 500
    document.getElementById("total_cart").innerHTML = totalCart;
  }


});

$('#checkout').on('click', function(){
  var totalCart = document.getElementById("total_cart").innerText;
  shipping_loc = document.getElementById('id_delivery_adress')
  if (shipping_loc===null){
    console.log('okokokok')
  }
  shipping_tel = document.getElementById('id_delivery_contact')
  console.log()
  //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
  form = document.getElementById("monFormulaire");
  t=form.submit()
  console.log(t)
  
}); 

$('#submitCoupon').on('click', function(event){
  event.preventDefault()
  var code = document.getElementById("id_code").value;
  console.log(code)
  
  if (code===''){
    console.log('code')
    swal("Aucun code !", "Veuillez entrez un code de reduction");
  }
  else {
    let csrfTokenValue = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let form = document.getElementById("couponFormulaire");
    let formData= new FormData(form)
    var updateURL = "/promo/";
    const request = new Request(updateURL, {
      method: 'POST',
      body: formData,
      headers: {'X-CSRFToken': csrfTokenValue}  // On ajoute le token dans l'en-tête
      });
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
        });
        // Parcourir les éléments du Mypanier récupéré via l'API
        document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
        document.getElementById('total_cart').innerHTML=data.total + ' cfa';
        swal(code, "Le code promo à été pris en compte", "success");
      })
      .catch(error => {
        if (error.message === 'Code promo inactif') {
          swal(code, "Code promo inactif !", "error");
        } 
         else if (error.message === "Une erreur est survenue lors du traitement de votre code promo") {
          swal(code, error.message, "error");
        }
        else if (error.message === "Probleme inconnue !") {
          swal(code, error.message, "error");
        }
        else if (error.message === "Ce code promo à déja été utilisé !") {
          swal(code, error.message, "error");
        }
        else if (error.message === "Code promo invalide !") {
          swal(code, error.message, "error");
        } 
         else {
          swal(code, "Veuillez rafraichir la page !", "error");
        }
      });
   
  }
  
  //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];

  
}); 
  