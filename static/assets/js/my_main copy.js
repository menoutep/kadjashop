const close_icon = '/static/coza/images/icons/icon-close.png'
const heart_icon_01 = '/static/coza/images/icons/icon-heart-01.png'
const heart_icon_02 = '/static/coza/images/icons/icon-heart-02.png'
function createSizeSelector(id, sizes) {
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
                            <a href="{% url 'base:product_detail' ${product.id} %}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
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
                                        </div>
            
                                        <div class="flex-w flex-r-m p-b-10">
                                            <div class="size-203 flex-c-m respon6">
                                                Couleur
                                            </div>
            
                                            <div class="size-204 respon6-next">
                                            ${createColorSelector(product.id, product.color).outerHTML}
                                            </div>
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
  const container = document.getElementById('row isotope-grid');
  
  for (const id in productsData) {
      if (productsData.hasOwnProperty(id)) {
          const productHTML = createProductHTML(productsData[id]);
          container.insertAdjacentHTML('beforeend', productHTML);
      }
  }
}

// Fonction pour charger les données depuis le backend
function loadProducts() {
  fetch('/url-de-votre-api') // Remplacez par l'URL correcte de votre API
      .then(response => response.json())
      .then(data => {
          addProductsToPage(data);
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
      .catch(error => console.error('Erreur lors du chargement des produits:', error));
}

// Appeler cette fonction lorsque la page est chargée
document.addEventListener('DOMContentLoaded', loadProducts);