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
************************* API *********************************
===============================================================*/
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shops = [];
const getApi = async function(){
  let response = await fetch("../../API.json");
  let data = await response.json();
   displayshop(data.shop);
   shops = data.shop;
}
getApi()

/*=============================================================
************************* SHOP *********************************
===============================================================*/
function displayshop(product){
  var list = ``;
  for(let i=0; i<product.length; i++){
    list+=`  
    <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="box">
                                <div class="product-sale">
                                  <span class="new">New</span>
                                  <span class="percent">-8%</span>
                                </div>
                                <img src="${product[i].image_url}" alt="">
                                  <h4>${product[i].title}</h4>
                                  <div class="shop-price d-flex">
                                    <span class="pe-2 span1">$${product[i].discount}</span>
                                    <span class="pe-2 span2">$${product[i].price}</span>
                                  </div>
                                  <div class="add-cart">
                                    <a onclick="addToCart(${i})">  ${product[i].add_cart} </a>
                                  </div>
                              </div>
                        </div>
    `
  }
  document.getElementById("row1").innerHTML = list;
}

/*=============================================================
************************* ADD TO CART **************************
===============================================================*/
function addToCart(index){
  let foundedCart = shops[index];
  let choosenCart = cart.find((element) => element.id == foundedCart.id)
  if(choosenCart){
    choosenCart.count++;
  }
  else{
    cart.push({...foundedCart, count:1});
  }
  localStorage.setItem("cart",JSON.stringify(cart));
  cartNumber();
}

/*=============================================================
************************* ADD TO CART Number ******************
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

