var panier = JSON.parse(localStorage.getItem('panier'))
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


var total_price = getTotalPrice(panier)
//document.getElementById('sub_total_cart').innerHTML=total_price + ' cfa';
//document.getElementById('total_cart').innerHTML=total_price + ' cfa';
document.getElementById('totalPanier').innerHTML=panier['total'];
for (var item_id in panier) {
    if (item_id === 'total' || item_id === 'total_price') {
      console.log(panier['total'] + ' est un entier');
    } else {
      var item = panier[item_id];

    // Créer une nouvelle ligne pour l'élément du panier
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.textContent = item[1];
    row.appendChild(nameCell);


    var totalCell = document.createElement('td');
    totalCell.textContent =  item[2] + 'cfa';
    row.appendChild(totalCell);

    // Ajouter la ligne au tableau
    document.getElementById('order-details-body').appendChild(row);

    }
    
  }


var sub_total_price = document.getElementById('sub_total');
sub_total_price.textContent = total_price + 'cfa';
var total = document.getElementById('total');
total.textContent = total_price + 'cfa';

document.addEventListener('DOMContentLoaded', function () {
  const isDeliveryCheckbox = document.querySelector('#id_is_delivery');
  const deliveryAddressField = document.querySelector('#id_delivery_address');
  deliveryAddressField.style.display = "none";

  const pickupTimeField = document.querySelector('#id_pickup_time');
  const isPieceCheckbox = document.querySelector('#id_is_piece');
  const monnaieField = document.querySelector('#id_monnaie');
  const orderTotalInput = document.getElementById("order-total");
  const total = document.getElementById("total");
  const livraison = document.getElementById("livraison");
  var totalActuelle = parseFloat(total.textContent.replace("cfa", ""));
  const montantAjout = 500;
  var nouveauTotal = 0;
 

  // Désactiver initialement le champ delivery_address
  deliveryAddressField.disabled = true;

  // Écouter les changements de la case à cocher
  isDeliveryCheckbox.addEventListener('change', function () {
      if (isDeliveryCheckbox.checked) {
          // Si la case à cocher est cochée, désactiver le champ pickup_time et activer delivery_address
          deliveryAddressField.disabled = false;
          pickupTimeField.disabled = true;
          nouveauTotal = totalActuelle + montantAjout;
          livraison.textContent = montantAjout + "cfa"
          total.textContent = nouveauTotal + "cfa";
          

          var map = L.map('map').setView([5.217667827913414,-3.7607097752205902], 13);
          var deliveryMarker = L.marker([0, 0], { draggable: true }).addTo(map);
              

              // Obtenez la géolocalisation de l'utilisateur
              navigator.geolocation.getCurrentPosition(function(position) {
                  var userLat = position.coords.latitude;
                  var userLng = position.coords.longitude;
                  document.getElementById('id_delivery_address').value = userLat + ',' + userLng;
                  // Placez un marqueur pour indiquer la position de l'utilisateur
                  var userMarker = L.marker([userLat, userLng]).addTo(map);
                  userMarker.bindPopup("Votre position").openPopup();

                  map.setView([userLat, userLng], 13);  // Centrez la carte sur la position de l'utilisateur
                  map.on('click', function(e) {
                              var latlng = e.latlng;
                              deliveryMarker.setLatLng(latlng);

                              // Mettez à jour le champ de formulaire avec les nouvelles coordonnées
                              document.getElementById('id_delivery_address').value = latlng.lat + ',' + latlng.lng;
                          });
                      });
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: 'OpenStreetMap'
              }).addTo(map);

      } else {
          // Sinon, désactiver delivery_address et activer le champ pickup_time
          deliveryAddressField.disabled = true;
          pickupTimeField.disabled = false;
          //orderTotalInput.value = {{ order_total }};
          nouveauTotal = totalActuelle;
          total.textContent = nouveauTotal + "cfa";
          livraison.textContent = "0 cfa";
          
      }

  });
  isPieceCheckbox.addEventListener('change', function () {
      if (isPieceCheckbox.checked) {
          // Si la case à cocher est cochée, désactiver le champ pickup_time et activer delivery_address
          monnaieField.disabled = true;
          
      } else {
          // Sinon, désactiver delivery_address et activer le champ pickup_time
      monnaieField.disabled = false;
      }});
});
$(document).ready(function() {
  $('#id_pickup_time').on('blur', function() {
      var pickupTime = $(this).val();
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var currentTimeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes;

      if (pickupTime < currentTimeString) {
          alert("L'heure de prise de repas ne peut pas être antérieure à l'heure actuelle.");
          $(this).val(''); // Effacez la valeur du champ
      }
  });
});
function toggleMapVisibility() {
  var isDeliveryCheckbox = document.getElementById('id_is_delivery');
  var mapContainer = document.getElementById('map');
  var deliveryLabel = document.getElementById("livraison-label");

  if (isDeliveryCheckbox.checked) {
  // Case à cocher cochée : afficher la carte
  mapContainer.classList.remove('hidden-map');
  deliveryLabel.classList.remove('hidden-map');
  } else {
  // Case à cocher décochée : masquer la carte
  mapContainer.classList.add('hidden-map');
  deliveryLabel.classList.add('hidden-map');
  }
}
var isDeliveryCheckbox = document.getElementById('id_is_delivery');
isDeliveryCheckbox.addEventListener('change', toggleMapVisibility);
toggleMapVisibility();
var lienSoumettre = document.getElementById("lienSoumettre");
var monFormulaire = document.getElementById("monFormulaire");
lienSoumettre.addEventListener("click", function(event) {
event.preventDefault();
monFormulaire.submit();
const originalLogo = document.getElementById("logo");
const stickyLogo = document.getElementById("sticky-logo");

window.addEventListener("scroll", function() {
    if (window.scrollY > 0) { // Vous pouvez ajuster cette valeur en fonction de la position de défilement où vous voulez changer le logo.
        originalLogo.style.display = "none";
        stickyLogo.style.display = "block";
    } else {
        originalLogo.style.display = "block";
        stickyLogo.style.display = "none";
    }
});
});

    
  /*document.querySelectorAll.on('click', 'td .product-remove a', function(){

    console.log('this')

  });*/
    // Ajouter l'écouteur d'événement pour le bouton de suppression
    /*
    document.getElementById('remove-from-cart-' + item_id).addEventListener('click', function(event) {
      event.preventDefault();

      // Supprimer l'élément du panier
      delete panier[item_id];
      localStorage.setItem('panier', JSON.stringify(panier));

      // Supprimer la ligne du tableau 
      document.getElementById('product_total-' + item_id).parentNode.remove();
      
      // Mettre à jour le total du panier
      document.getElementById('totalPanier').innerHTML=panier['total'];
      //document.getElementById('totalPanier').textContent = Object.values(panier).reduce((total, item) => total + item[0], 0);
    });

    // Ajouter l'écouteur d'événement pour la mise à jour de la quantité
    document.getElementById('quantity-input-' + item_id).addEventListener('change', function(event) {
      event.preventDefault();

      // Mettre à jour la quantité dans le panier
      panier[item_id][0] = this.value;
      localStorage.setItem('panier', JSON.stringify(panier));

      // Mettre à jour le total de l'élément
      document.getElementById('product_total-' + item_id).textContent = (panier[item_id][0] * panier[item_id][2]) + 'cfa';

      // Mettre à jour le total du panier
      document.getElementById('totalPanier').textContent = Object.values(panier).reduce((total, item) => total + item[0], 0);
    });

    */