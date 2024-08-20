total_button = document.getElementById('shipping-total')

shipping_loc = document.getElementById('id_delivery_adress')
shipping_tel = document.getElementById('id_delivery_contact')


$('#shipping-total').on('click', function(){
  var subTotalCart= document.getElementById("sub_total_cart").innerText;
  console.log(subTotalCart)
  var totalCart = parseInt(subTotalCart) + 500
  document.getElementById("total_cart").innerHTML = totalCart;

});

