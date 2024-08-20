var newQuantity = 0;
                                    
                                      
// Écoutez l'événement de modification de la quantité
/*
document.getElementById("quantity-input-{{ item.product.id }}").addEventListener("change", function (event) {
    event.preventDefault();
    newQuantity = document.getElementById("quantity-input-{{ item.product.id }}").value;
    console.log('essai'+newQuantity)
    const updateURL = `{% url 'base:update_cart' item.product.id 0 %}`.replace('0', newQuantity);
    // Soumettez le formulaire lorsque la quantité est modifiée
    fetch(updateURL)
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur (par exemple, mettre à jour l'affichage du panier)
            
            document.getElementById("product_total-{{ item.product.id }}").textContent = data.item_total;
            document.getElementById("total_cart").textContent = data.cart_total;
            document.getElementById("sub_total_cart").textContent = data.cart_total;

        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout au panier :', error);
        });
});

*/
document.querySelectorAll('.product-quantity input').forEach(function(element) {
    element.addEventListener('input', function(event) {
      console.log("valeur input  :" +element.value)
      //console.log(element.closest('a'));
      var new_quantity = element.value.trim();
      const item_id = element.id.toString().substring(15);
      if (new_quantity === "") {
          new_quantity = 0;
          //confirm("attention cette action ne supprimera pas l'objet de votre panier. \nSi vous voulez supprimer l'objet de votre panier vous devez cliquez sur la croix rouge.\nLa quantité avant suppression sera conservé si le champs quantité reste vide.\nNous vous remercions.") 
      }
        var urlTemplate = "/update_cart/item_id/quantity";
        var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', new_quantity);
        const request = new Request(updateURL, {method: 'GET'});
        console.log(request)
        fetch(request)
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalPanier').innerHTML=data.quantity;
            data.panier_items.forEach(item => {
                let item_id = item.product.id;
                // Si l'élément existe déjà dans le Mypanier, mettre à jour la quantité et le prix
                var prix_article = 0
                if (item.product.is_promo){
                    prix_article = parseInt(item.product.second_price)
                }
                else {
                    prix_article = parseInt(item.product.price) 
                }
                document.getElementById('product_total-'+item_id).innerHTML= parseInt(item.quantity) * parseInt(prix_article) + ' cfa'
                document.getElementById('totalPanier').innerHTML=data.quantity
                document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
                document.getElementById('total_cart').innerHTML=data.total + ' cfa';
           

            });

        })
          .catch(error => {
            console.error('Erreur lors de la mise a jour  :', error);
          });
      

    });
  });



/*
document.getElementById('remove-from-cart-{{ item.product.id }}').addEventListener('click', function (event) {
    event.preventDefault();
    fetch(`{% url 'base:remove_from_cart' item.product.id %}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("total_cart").textContent = data.cart_total;
            document.getElementById("sub_total_cart").textContent = data.cart_total;
            const row = this.closest('tr'); // Trouvez l'élément tr parent
            row.remove(); // Supprimez la ligne du panier du DOM
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout au panier :', error);
        });										
});
*/

document.querySelectorAll('td.product-remove a').forEach(function(element) {
    element.addEventListener('click', function(event) {
        const item_id = element.id.toString().substring(17);
        element.closest('td').parentNode.remove();
        var urlTemplate = "/remove_from_cart/item_id";
        var updateURL = urlTemplate.replace('item_id', item_id);
        const request = new Request(updateURL, {method: 'GET'});
        console.log(request)
        fetch(request)
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalPanier').innerHTML=data.quantity;
            data.panier_items.forEach(item => {
                let item_id = item.product.id;
                // Si l'élément existe déjà dans le Mypanier, mettre à jour la quantité et le prix
                var prix_article = 0
                if (item.product.is_promo){
                    prix_article = parseInt(item.product.second_price)
                }
                else {
                    prix_article = parseInt(item.product.price) 
                }
                document.getElementById('product_total-'+item_id).innerHTML= parseInt(item.quantity) * parseInt(prix_article) + ' cfa'
                document.getElementById('totalPanier').innerHTML=data.quantity
                document.getElementById('sub_total_cart').innerHTML=data.total + ' cfa';
                document.getElementById('total_cart').innerHTML=data.total + ' cfa';
           

            });

        })
          .catch(error => {
            console.error('Erreur lors de la suppression  :', error);
          });
        event.preventDefault();
      });
    }
  );