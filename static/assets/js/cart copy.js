

function getTotalPrice(cart) {
  var total = 0;
  for (var id in cart) {
  
      if (id === 'total' || id === 'total_price') {
        console.log(panier['total'] + ' est un entier');
      } else {
      if (cart.hasOwnProperty(id)) {
        var item = cart[id];
        console.log('iii')
          console.log(item)
        // Ajouter le prix de l'élément au total
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
        console.log(panier['total'] + ' est un entier');
      } else {
      if (cart.hasOwnProperty(id)) {
        var item = cart[id];
        console.log('iii')
          console.log(item)
        // Ajouter le prix de l'élément au total
        total += parseInt(item[0])
      }
    }
  }
  return total;
}

let panier = JSON.parse(localStorage.getItem('panier')) || {
  'total': 0,
  'total_price': 0,
};
console.log("****************panier panier ")
console.log(panier)
console.log("****************panier panier ")
var total_price = getTotalPrice(panier)
document.getElementById('sub_total_cart').innerHTML=total_price + ' cfa';
document.getElementById('total_cart').innerHTML=total_price + ' cfa';
document.getElementById('totalPanier').innerHTML=panier['total'];
for (var item_id in panier) {
    if (item_id === 'total' || item_id === 'total_price') {
      console.log(panier['total'] + ' est un entier');
    } else {
      var item = panier[item_id];

    // Créer une nouvelle ligne pour l'élément du panier
    var row = document.createElement('tr');
    row.className = 'table-body-row';

    // Ajouter les cellules pour chaque information de l'élément
    var removeCell = document.createElement('td');
    removeCell.className = 'product-remove';
    removeCell.innerHTML = '<a href="#" id="remove-from-cart-' + item_id + '"><i class="far fa-window-close"></i></a>';
    row.appendChild(removeCell);

    //var imageCell = document.createElement('td');
    //imageCell.className = 'product-image-cart';
    //imageCell.innerHTML = '<img src="' + item[3] + '" alt="">';
    //row.appendChild(imageCell);
    var imageCell = document.createElement('td');
    imageCell.className = 'product-image-cart';

    var img = document.createElement('img');
    img.src = item[3];
    img.alt = '';
    img.style.width = '100%';
    img.style.height = 'auto';

    imageCell.appendChild(img);
    row.appendChild(imageCell);

    var nameCell = document.createElement('td');
    nameCell.className = 'product-name';
    nameCell.textContent = item[1];
    row.appendChild(nameCell);

    var priceCell = document.createElement('td');
    priceCell.className = 'product-price';
    
    priceCell.textContent =  parseInt(item[2]) + 'cfa';
    row.appendChild(priceCell);

// Créer l'élément <input>
    var quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.name = 'quantity';
    quantityInput.value = item[0];
    quantityInput.min = 1;
    quantityInput.className = 'rounded-input ted';
    quantityInput.id = 'quantity-input-' + item_id;

    // Créer la cellule de quantité
    var quantityCell = document.createElement('td');
    quantityCell.className = 'product-quantity';

    // Ajouter l'élément <input> à la cellule de quantité
    quantityCell.appendChild(quantityInput);

    // Ajouter la cellule de quantité à la ligne du panier
    row.appendChild(quantityCell);


    var totalCell = document.createElement('td');
    totalCell.className = 'product-total';
    totalCell.id = 'product_total-' + item_id;
    const price_total_product = parseInt(item[2]) * parseInt(item[0])
    totalCell.textContent =  price_total_product + 'cfa';
    row.appendChild(totalCell);

    // Ajouter la ligne au tableau
    document.getElementById('myCart').appendChild(row);
    


    
    }
  
}


console.log(panier)


document.querySelectorAll('td.product-remove a').forEach(function(element) {
  element.addEventListener('click', function(event) {
      //console.log(element.closest('a'));
      const item_id = element.id.toString().substring(17);
      const item = panier[item_id];
      const quantite = item[0];
      panier['total'] = panier['total'] - quantite;
      document.getElementById('totalPanier').innerHTML=panier['total'];
      delete panier[item_id];
      element.closest('td').parentNode.remove();
      localStorage.setItem('panier', JSON.stringify(panier));
      var total_price = getTotalPrice(panier) 
      document.getElementById('sub_total_cart').innerHTML=total_price + ' cfa';
      document.getElementById('total_cart').innerHTML=total_price + ' cfa';
      var urlTemplate = "/remove_from_cart/item_id";
      var updateURL = urlTemplate.replace('item_id', item_id);
      const request = new Request(updateURL, {method: 'GET'});
      console.log(request)
      fetch(request)
        .then(response => {
          console.log("element supprimer avec succès")
        })
        .catch(error => {
          console.error('Erreur lors de la suppression  :', error);
        });
      event.preventDefault();
    });
  }
);
  test = document.querySelectorAll('.product-quantity input');
  console.log(test);
  
  document.querySelectorAll('.product-quantity input').forEach(function(element) {
    element.addEventListener('input', function(event) {
      console.log("valeur input  :" +element.value)
      //console.log(element.closest('a'));
      var new_quantity = element.value.trim();
      const item_id = element.id.toString().substring(15);
      const  old_item = panier[item_id];
      const prix_unitaire = parseInt(old_item[2]) ;
      if (new_quantity === "") {
          new_quantity = 0;
          panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
          confirm("attention cette action ne supprimera pas l'objet de votre panier. \nSi vous voulez supprimer l'objet de votre panier vous devez cliquez sur la croix rouge.\nLa quantité avant suppression sera conservé si le champs quantité reste vide.\nNous vous remercions.")
          
      }
      else{
        panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
        var urlTemplate = "/update_cart/item_id/quantity";
        var updateURL = urlTemplate.replace('item_id', item_id).replace('quantity', new_quantity);
        const request = new Request(updateURL, {method: 'GET'});
        console.log(request)
        fetch(request)
          .then(response => {
            console.log("element update avec succès")
          })
          .catch(error => {
            console.error('Erreur lors de la mise a jour  :', error);
          });
      }
      const total = getTotal(panier);
      const total_price = getTotalPrice(panier)
      panier['total'] = total;
      panier['total_price']  = total_price;
      localStorage.setItem('panier', JSON.stringify(panier));
      document.getElementById('product_total-'+item_id).innerHTML= parseInt(panier[item_id][2]) * parseInt(panier[item_id][0]) + 'cfa'
      document.getElementById('totalPanier').innerHTML=panier['total'];
      document.getElementById('sub_total_cart').innerHTML=panier['total_price'] + ' cfa';
      document.getElementById('total_cart').innerHTML=panier['total_price'] + ' cfa';
      //make_cart(panier);


      
    });
  });
    
 