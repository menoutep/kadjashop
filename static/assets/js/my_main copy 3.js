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
        let productHtml = ``;
        var close_icon = '/static/coza/images/icons/icon-close.png'
        var heart_icon_01 = '/static/coza/images/icons/icon-heart-01.png'
        var heart_icon_02 = '/static/coza/images/icons/icon-heart-02.png'
        Object.keys(data).forEach(function(key) {
            
            
        console.log(data[key].id);
        let product_attr_size = ``;
        let product_attr_color = ``;

        for (var i = 0; i< data[key]["size"].length;i++){
            product_attr_size += `<option>${data[key]["size"][i]}</option>`;
        }
        
        for (var i = 0; i< data[key]["color"].length;i++){
            product_attr_color += `<option>${data[key]["size"][i]}</option>`;
        }
        
            productHtml += `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${data[key]["category"]}">
                <!-- Block2 -->
                <div class="block2 ">
                    <div class="block2-pic hov-img0">
                        <img src="${data[key]["imgP"]}" alt="IMG-PRODUCT">

                        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal" id="modal-button-${data[key]["id"]}">
                            Quick View
                        </a>
                    </div>

                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                            <a href="{% url 'base:product_detail' ${data[key]["id"]} %}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${data[key]["name"]}
                            </a>

                            <span class="stext-105 cl3 product-price-c" data-promo="${data[key]["is_promo"]}">
                                    <span class="price-c">${data[key]["price"]}</span>  <span class="price-barrer-c">${data[key]["second_price"]}</span>
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
            <div class="wrap-modal js-modal${data[key]["id"]} p-t-60 p-b-20">
                <div class="overlay-modal js-hide-modal"></div>
        
                <div class="container">
                    <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                        <button class="how-pos3 hov3 trans-04 js-hide-modal" id="modal-button-close-${data[key]["id"]}">
                            <img src="${close_icon}" alt="CLOSE">
                        </button>
        
                        <div class="row">
                            <div class="col-md-6 col-lg-7 p-b-30">
                                <div class="p-l-25 p-r-30 p-lr-0-lg">
                                    <div class="wrap-slick3 flex-sb flex-w">
                                        <div class="wrap-slick3-dots"></div>
                                        <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
        
                                        <div class="slick3 gallery-lb">
                                            <div class="item-slick3" data-thumb="${data[key]["imgP"]}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${data[key]["imgP"]}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${data[key]["imgP"]}">
                                                        <i class="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
        
                                            <div class="item-slick3" data-thumb="${data[key]["imgS"]}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${data[key]["imgS"]}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${data[key]["imgS"]}">
                                                        <i class="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
        
                                            <div class="item-slick3" data-thumb="${data[key]["imgT"]}">
                                                <div class="wrap-pic-w pos-relative">
                                                    <img src="${data[key]["imgT"]}" alt="IMG-PRODUCT">
        
                                                    <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${data[key]["imgT"]}">
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
                                    ${data[key]["name"]}
                                    </h4>
        
                                    <span class="mtext-106 cl2 product-price-c" data-promo="${data[key]["is_promo"]}">
                                        <span class="price-c">${data[key]["price"]}</span>  <span class="price-barrer-c">${data[key]["second_price"]}</span>
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
                                                <div class="rs1-select2 bor8 bg0">
                                                    <select class="js-select2" name="taille" id="select-taille-${data[key]["id"]}">
                                                    
                                                        <option>Choisir une taille</option>
                                                        
                                            
                                                        
                                                    </select>
                                                    <div class="dropDownSelect2"></div>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-203 flex-c-m respon6">
                                                Couleur
                                            </div>
            
                                            <div class="size-204 respon6-next">
                                                <div class="rs1-select2 bor8 bg0">
                                                    <select class="js-select2" name="couleur" id="select-couleur-${data[key]["id"]}">
                                                        
                                                        <option>Choisir une couleur</option>
                                                        
                                                    
                                            
                                                    </select>
                                                    <div class="dropDownSelect2"></div>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-204 flex-w flex-m respon6-next">
                                                <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                                                    <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i class="fs-16 zmdi zmdi-minus"></i>
                                                    </div>
            
                                                    <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" data-name="${data[key]["name"]}" data-id="${data[key]["id"]}">

                                                    <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i class="fs-16 zmdi zmdi-plus"></i>
                                                    </div>
                                                </div>
            
                                                <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" id="add_to_cart_button_${data[key]["id"]}">
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
            </div>`;
        
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrj')
        console.log(document.getElementsByClassName('row isotope-grid')[0])
        $('.js-select2').each(function(){
            console.log("testtaille")
            console.log(typeof($(this).attr('name')))
            if ($(this).attr('name')==='taille'){
                console.log(product_attr_size)
                console.log($(this)[0]);
                $(this)[0].innerHTML += product_attr_size;
                console.log($(this)[0]);
            }
            else if ($(this).attr('name')==='couleur'){
                $(this)[0].innerHTML += product_attr_color;
            }

        });
        
            
        });

        var content = document.getElementsByClassName('row isotope-grid');
        var my_content = content[0]
        my_content.innerHTML = productHtml;

        console.log(document.getElementsByClassName('.product-price-c'));
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
          }
        });
     
    }
    
    //panier[item_id]=[new_quantity,old_item[1],old_item[2],old_item[3]];
  
    
  }); 
    
// Pour récupérer tous les cookies

console.log(document.getElementsByClassName('.product-price-c'));
$('.product-price-c').each(function(){

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
