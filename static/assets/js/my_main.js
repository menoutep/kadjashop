const close_icon = '/static/coza/images/icons/icon-close.png'
const heart_icon_01 = '/static/coza/images/icons/icon-heart-01.png'
const heart_icon_02 = '/static/coza/images/icons/icon-heart-02.png'
function createSizeSelector(id, sizes) {
    console.log('function create size')
  const select = document.createElement('select');
  select.className = 'js-select2';
  select.name = 'taille';
  select.id = `select-taille-${id}`;

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Choisir une taille';
  select.appendChild(defaultOption);

  sizes.forEach(size => {
      const option = document.createElement('option');
      option.textContent = size;
      select.appendChild(option);
  });

  const mainDiv = document.createElement('div');
  mainDiv.className = 'rs1-select2 bor8 bg0';

  const dropDownDiv = document.createElement('div');
  dropDownDiv.className = 'dropDownSelect2';

  mainDiv.appendChild(select);
  mainDiv.appendChild(dropDownDiv);

  return mainDiv;
}
function createColorSelector(id, colors) {
    console.log('function create colors')
  const select = document.createElement('select');
  select.className = 'js-select2';
  select.name = 'couleur';
  select.id = `select-couleur-${id}`;

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Choisir une couleur';
  select.appendChild(defaultOption);

  colors.forEach(color => {
      const option = document.createElement('option');
      option.textContent = color;
      select.appendChild(option);
  });

  const mainDiv = document.createElement('div');
  mainDiv.className = 'rs1-select2 bor8 bg0';

  const dropDownDiv = document.createElement('div');
  dropDownDiv.className = 'dropDownSelect2';

  mainDiv.appendChild(select);
  mainDiv.appendChild(dropDownDiv);

  return mainDiv;
}
function createProductHTML(product) {
    console.log('function create product')
  const productHTML = `
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category}">
                <!-- Block2 -->
                <div class="block2 ">
                    <div class="block2-pic hov-img0">
                        <img src="${product.imgP}" alt="IMG-PRODUCT">

                        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal" id="modal-button-${product.id}">
                            Quick View
                        </a>
                    </div>

                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                            <a href="/products/${product.id}/" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${product.name}
                            </a>

                            <span class="stext-105 cl3 product-price-c" data-promo="${product.is_promo}">
                                    <span class="price-c">${product.price}</span>  <span class="price-barrer-c">${product.second_price}</span>
                            </span>
                           
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                <img class="icon-heart1 dis-block trans-04" src="${heart_icon_01}" alt="ICON">
                                <img class="icon-heart2 dis-block trans-04 ab-t-l" src="${heart_icon_02}" alt="ICON">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap-modal js-modal${product.id} p-t-60 p-b-20">
                <div class="overlay-modal js-hide-modal"></div>
        
                <div class="container">
                    <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                        <button class="how-pos3 hov3 trans-04 js-hide-modal" id="modal-button-close-${product.id}">
                            <img src="${close_icon}" alt="CLOSE">
                        </button>
        
                        <div class="row">
                            <div class="col-md-6 col-lg-7 p-b-30">
                                <div class="p-l-25 p-r-30 p-lr-0-lg">
                                    <div class="wrap-slick3 flex-sb flex-w">
                                        <div class="wrap-slick3-dots"></div>
                                        <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
        
                                        <div class="slick3 gallery-lb">
                                            <div class="item-slick3" data-thumb="${product.imgP}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${product.imgP}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${product.imgP}">
                                                        <i class="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
        
                                            <div class="item-slick3" data-thumb="${product.imgS}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${product.imgS}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${product.imgS}">
                                                        <i class="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
        
                                            <div class="item-slick3" data-thumb="${product.imgT}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${product.imgT}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${product.imgT}">
                                                        <i class="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6 col-lg-5 p-b-30">
                                <div class="p-r-50 p-t-5 p-lr-0-lg">
                                    <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                                    ${product.name}
                                    </h4>
        
                                    <span class="mtext-106 cl2 product-price-c" data-promo="${product.is_promo}">
                                        <span class="price-c">${product.price}</span>  <span class="price-barrer-c">${product.second_price}</span>
                                    </span>
                                    <p class="stext-102 cl3 p-t-23">
                                        Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                                    </p>
                                    
                                    <!--  -->
                                    <div class="p-t-33">
                                        <form method="POST" >
                                            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-203 flex-c-m respon6">
                                                Taille
                                            </div>
            
                                            <div class="size-204 respon6-next">
          
                                                ${createSizeSelector(product.id, product.size).outerHTML}
                                            </div>
                                           
                                        </div>
            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-203 flex-c-m respon6">
                                                Couleur
                                            </div>
            
                                            <div class="size-204 respon6-next">
                                                ${createColorSelector(product.id, product.color).outerHTML}
                                            
                                            </div>
                                        </div>
            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-204 flex-w flex-m respon6-next">
                                                <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                                                    <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i class="fs-16 zmdi zmdi-minus"></i>
                                                    </div>
            
                                                    <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" data-name="${product.name}" data-id="${product.id}">

                                                    <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i class="fs-16 zmdi zmdi-plus"></i>
                                                    </div>
                                                </div>
            
                                                <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" id="add_to_cart_button_${product.id}">
                                                    ajouter au panier
                                                </button>
                                            </div>
                                        </div>	
                                    </form>
                                    </div>
        
                                    <!--  -->
                                    <div class="flex-w flex-m p-l-100 p-t-40 respon7">
                                        <div class="flex-m bor9 p-r-10 m-r-11">
                                            <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                                                <i class="zmdi zmdi-favorite"></i>
                                            </a>
                                        </div>
        
                                        <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                                            <i class="fa fa-facebook"></i>
                                        </a>
        
                                        <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                                            <i class="fa fa-twitter"></i>
                                        </a>
        
                                        <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                                            <i class="fa fa-google-plus"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
  `;
  return productHTML;
}
function addProductsToPage(productsData) {
    console.log('function add product to page')
    console.log(productsData)
  const container = document.getElementsByClassName('row isotope-grid')[0];
  container.innerHTML = '';
  
  for (const id in productsData) {
      if (productsData.hasOwnProperty(id)) {
          const productHTML = createProductHTML(productsData[id]);
          container.insertAdjacentHTML('beforeend', productHTML);
      }
  }
}
console.log('Tous les cookies:', document.cookie);
// Fonction pour récupérer la valeur d'un cookie spécifique
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
$('#id_keyword').on('change', function(event){
    event.preventDefault()
    var keyword = document.getElementById("id_keyword").value;
    console.log(keyword)
    
    if (keyword===''){
      console.log('keyword')
      swal("Aucun keyword !", "Veuillez entrez un mot clé");
    }
    else {
      const csrfTokenValue  = getCookie('csrftoken');
      if (csrfTokenValue ) {
            console.log('User ID:', csrfTokenValue );
        } else {
            console.log('Cookie userId non trouvé');
        }
     
    let formData = new FormData();
    formData.append('keyword', keyword);
      
    var updateURL = "/search/";
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
        console.log(data)
        

        addProductsToPage(data);
        $(".js-select2").each(function(){
			$(this).select2({
				placeholder: "Select an option",
				minimumResultsForSearch: 20,
				dropdownParent: $(this).next('.dropDownSelect2')
			});
			
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
            }
        });  
        $('.product-price-c').each(function(){
            console.log('test')
            console.log($(this).attr('class'));
            var prix_normale = $(this).children('.price-c')[0]
            console.log(prix_normale)
            
            var prix_barrer = $(this).children('.price-barrer-c')[0];
            console.log(prix_barrer)
            //prix_barrer.style.display = 'none';
            
            var is_promo =  $(this).data('promo');
            console.log(is_promo);
            console.log(typeof(is_promo))
            if(is_promo===true){

                console.log('hhzedghyhuiuhhhhgtghjffffddddddddddddddddfvvvvvvvvv');
                console.log(prix_barrer.style)
                prix_barrer.style.display = "block";
                prix_normale.style.textDecoration = "line-through"; 
            }
            else{
                prix_barrer.style.display = 'none';
            }
        
        });
        $('.js-show-modal').on('click', function(e) {
            console.log('modal modal')
            e.preventDefault();
            console.log(this.id)
            var modalId = '.js-modal' + this.id.substring(13); // récupère l'ID du modal correspondant
            console.log(modalId);
            $(modalId).addClass('show-modal');
        });
        
        $('button.js-hide-modal').on('click', function() {
            var modalId = '.js-modal' + this.id.substring(19); // récupère l'ID du modal correspondant
            $(modalId).removeClass('show-modal');
        });
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
              let csrfTokenValue = getCookie("csrftoken");
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

            })
            .catch(error => {
               
          if (error.message === 'Nous sommes désolé, maisaucun produit ne correspond à votre demande') {
            swal(keyword, "Nous sommes désolé, mais aucun produit ne correspond à votre demande!", "error");
          } 
           else if (error.message === "Une erreur est survenue lors du traitement de votre keyword promo") {
            swal(keyword, error.message, "error");
          }
          else if (error.message === "Probleme inconnue !") {
            swal(keyword, error.message, "error");
          }
          else if (error.message === "Ce keyword promo à déja été utilisé !") {
            swal(keyword, error.message, "error");
          }
          else if (error.message === "keyword promo invalide !") {
            swal(keyword, error.message, "error");
          } 
           else {
            swal(keyword, "Veuillez rafraichir la page !", "error");
            console.log(error)
          }
        });
     
    }
    
    //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
  
    
  }); 

console.log(document.getElementsByClassName('.product-price-c'));
$('.product-price-c').each(function(){
    console.log('rrrrrrrrr')
    console.log($(this).attr('class'));
   	var prix_normale = $(this).children('.price-c')[0]
    var prix_barrer = $(this).children('.price-barrer-c')[0];
    //prix_barrer.style.display = 'none';
    
    var is_promo =  $(this).data('promo');
    console.log(is_promo);
    if(is_promo==='True'){
        console.log(is_promo);
        console.log(prix_barrer.style)
        prix_barrer.style.display = "block";
        prix_normale.style.textDecoration = "line-through"; 
    }
    else{
        prix_barrer.style.display = 'none';
    }

});

const filterLinks = document.querySelectorAll('.filter-link');
filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const filterType = this.dataset.size ? 'size' : 'color';
        const filterValue = this.dataset.size || this.dataset.color;

        // Retirer la classe active de tous les liens du même type de filtre
        document.querySelectorAll(`.filter-link[data-${filterType}]`).forEach(el => {
            el.classList.remove('filter-link-active');
        });

        // Ajouter la classe active au lien cliqué
        this.classList.add('filter-link-active');
    }) 
});