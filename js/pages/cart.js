/*=============================================================
************************* BUTTON *****************************
===============================================================*/
let btn = document.querySelector(".btn-fixed");
window.onscroll=function(){
  let query = window.matchMedia("(min-width:767px)");
  if(window.scrollY >= 200 && query.matches){
    btn.style.display = "block";
  } else{
    btn.style.display = "none";
  }
}
btn.onclick =function(){
  window.scrollTo({
    top:0,
    left:0,
    behavior:"smooth",
  });
}

/*=============================================================
************************* HEADER ******************************
===============================================================*/

let headerr = document.getElementById("header");
window.addEventListener("scroll",function(){
  if(window.scrollY >= 100){
    headerr.classList.add("header-fixed")
  }
  else{
    headerr.classList.remove("header-fixed")
  }
})



/*===============================================================================================
*************************************************************************************************
=================================================================================================*/







/*=============================================================
************************* CART ********************************
===============================================================*/
let tableBody = document.getElementById("tbody");
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
/*=============================================================
************************* DISPLAY CART **************************
===============================================================*/
function render(){
  let list =''
  for(let i = 0 ; i<cartData.length ; i++){
    list+=`
                <tr>
                  <td class="product-thumbnail d-flex align-items-center justify-content-center">
                    <a href="/shop/shop-details/4">
                    <img alt="product-img" src="${cartData[i].image_url}"> 
                    </a>
                  </td>
                  <td class="product-name">
                      <a href="#">${cartData[i].title}</a>
                  </td>
                  <td class="product-price">
                    <span class="amount">$${cartData[i].discount}</span>
                  </td>
                  <td class="product-quantity">
                      <div class="product-quantityy d-flex justify-content-center align-items-center">
                        <span onclick="minus(${i})" class="minus">-</span>
                        <span class="num num2">${cartData[i].count}</span>
                        <span onclick="plus(${i})" class="plus">+</span>
                    </div>
                  </td>
                  <td class="product-subtotal">
                    <span class="amount">$${cartData[i].discount * cartData[i].count}</span>
                  </td>
                  <td class="product-remove">
                    <a onclick="deletecart(${i})"><i class="fa fa-times"></i></a>
                  </td>
                </tr>
    `
  }
  tableBody.innerHTML=list;
}
render();
/*=============================================================
************************* PRODUCT QUANTITY ********************
===============================================================*/
 function plus(a){
  cartData[a].count++;
  localStorage.setItem("cart",JSON.stringify(cartData));
  render();
  TOTALPRICE();
    // plus cart number
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
   localStorage.setItem('cartNumbers',productNumbers+1);
   onLoadCartNumbers();
 }
function minus(a){
  if (cartData[a].count > 1) {
    cartData[a].count--;
    localStorage.setItem("cart",JSON.stringify(cartData));
    render();
    TOTALPRICE();

      // minus cart number
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
   localStorage.setItem('cartNumbers',productNumbers-1);
   onLoadCartNumbers();
  } 



  
}
/*=============================================================
 ********************* ADD PRODUCT TO CART  *******************
===============================================================*/
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent=productNumbers;
  }
}
function cartNumber(){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
    
  }else{
    localStorage.setItem("cartNumbers",1);
    document.querySelector('.cart span').textContent=1;
  }
}
onLoadCartNumbers();
/*=============================================================
 ******************** No Cart Items Found *********************
===============================================================*/
function NoCartItemsFound(){
  if(cartData.length==0){
    container2.style.display="block";
  }else{
    container1.style.display="block";
  }
}
NoCartItemsFound();
/*=============================================================
 ********************** Total Price carts *********************
===============================================================*/
function TOTALPRICE() {
  let Subtotal = document.getElementById("Subtotal");
  let Total = document.getElementById("Total");
  let TotalPrice =0;
  for (let i = 0; i < cartData.length; i++) {
    TotalPrice+= (cartData[i].discount * cartData[i].count);
  }
  Total.textContent = `$ ${TotalPrice}`;
  Subtotal.textContent = `$ ${TotalPrice}`;
}
TOTALPRICE();
/*=============================================================
************************* DELETE CART **************************
===============================================================*/
function deletecart(a){
  // delete cart
 
  if (cartData[a].count == 1) {
   cartData.splice(a,1);
  } else{
    cartData[a].count--;
  }
  localStorage.setItem("cart",JSON.stringify(cartData));
  render();
  TOTALPRICE();
  // delete section
  if(cartData.length==0){
    container1.style.display="none";
  }else{
    container2.style.display="block";
  }
  // delete cart number
  let productNumbers = localStorage.getItem('cartNumbers');
  localStorage.setItem('cartNumbers',productNumbers - 1);
  onLoadCartNumbers();
}
/*=============================================================
********************** DELETE ALL PRODUCT *********************
===============================================================*/
let deleteAll = document.getElementById("clear");
function deleteAllProduct() {
  cartData.splice(0);
  localStorage.setItem("cart",JSON.stringify(cartData));
  render();
  // delete cart number
  let productNumbers = localStorage.getItem('cartNumbers');
  localStorage.setItem('cartNumbers',productNumbers=0);
  onLoadCartNumbers();
    // display sections
     container1.style.display = "none";
     container2.style.display = "block";
}
