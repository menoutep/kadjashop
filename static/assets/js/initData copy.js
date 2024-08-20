const updateURL = "/getcart";
const UpdateRequest = new Request(updateURL, {method: 'GET'});
let Mypanier = JSON.parse(localStorage.getItem('Mypanier')) || {
    'total': 0,
    'total_price': 0,
  };

console.log(Mypanier)

// Effectuer une requête GET à l'API pour récupérer le Mypanier de l'utilisateur connecté
fetch(UpdateRequest)
    .then(response => response.json())
    .then(data => {
        document.getElementById('totalPanier').innerHTML=data.quantity;
        Mypanier['total'] = data.quantity;
        
        
        Mypanier['total_price'] = data.total;
        // Parcourir les éléments du Mypanier récupéré via l'API
        console.log(data)
        data.panier_items.forEach(item => {
            console.log(item.product)
            let item_id = item.product.id;
            // Si l'élément existe déjà dans le Mypanier, mettre à jour la quantité et le prix
            var prix_article = 0
            if (item.product.is_promo){
                prix_article = parseFloat(item.product.second_price)
            }
            else {
                prix_article = parseFloat(item.product.price) 
            }
            if (Mypanier[item_id]) {
                Mypanier[item_id][0] = item.quantity;
                Mypanier[item_id][2] = parseFloat(item.product.price);
            } else {
                // Sinon, ajouter l'élément au Mypanier
                Mypanier[item_id] = [item.quantity, item.product.name, prix_article, item.product.image];
            }
            // Mettre à jour le total et le prix total du Mypanier
            //Mypanier['total'] += item.quantity;
            //console.log(Mypanier['total'])
            //Mypanier['total_price'] += item.quantity * parseFloat(item.product.price);
        });
        // Enregistrer le Mypanier mis à jour dans le local storage
        

        localStorage.setItem('Mypanier', JSON.stringify(Mypanier));
    });
    document.getElementById('totalPanier').innerHTML=Mypanier['total'];
    //console.log(document.getElementById('totalpanier'));