/*=============================================================
************************* SPLIDER *****************************
===============================================================*/
var splide = new Splide( '.splide', {
  type  : 'fade',
  rewind: true,
} );
splide.mount();
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
/*=============================================================
************************* API *********************************
===============================================================*/
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];
let sales = [];
const getApi = async function(){
  let response = await fetch("../../API.json");
  let data = await response.json();
   displayProduct(data.product);
   displayBanner2(data.banner2);
   displaySale(data.sale);
   displayBlog(data.blog);
   products = data.product;
   sales = data.sale;
}
getApi()
/*=============================================================
 ************************** PRODUCT ***************************
===============================================================*/
function displayProduct(product){
  var list = ``;
  for(let i=0; i<product.length; i++){
    list+=`  
    <div class="col-lg-3 col-md-4">
    <div class="box">
    <div class="product-sale">
              <span class="new">New</span>
              <span class="percent">-8%</span>
     </div>
      <div class="images">
         <a href="" >
          <img src="${product[i].image_url}" alt="product-img"  onclick="imagees1(${i})" >
        </a>
      </div>
        <h4>${product[i].title}</h4>
         <div class="product-price d-flex">
          <span class="pe-2 span1">$${product[i].discount}</span>
          <span class="pe-2 span2">$${product[i].price}</span>
        </div> 
        <div class="add-cart">
          <a onclick="addToCart(${i})"> ${product[i].add_cart}</a>
        </div>
    </div>
  </div>
    `
  }
  document.getElementById("row1").innerHTML = list;
}
/*=============================================================
 ************************** BANNER2 ***************************
===============================================================*/
function displayBanner2(product){
  var list = ``;
  for(let i=0; i<product.length; i++){
    list+=`  
    <div class="col-lg-6">
          <div class="banner-thumb">
            <div class="image">
              <img src="${product[i].image_url}" alt="">
            </div>
            <div class="content">
              <span>${product[i].title1}</span>
              <h4>${product[i].title2}</h4>
              <a href="#" class="main-btn">buy now /<span class="price">${product[i].price}</span></a>
            </div>
          </div>
        </div>
    `
  }
  document.getElementById("row2").innerHTML = list;
}
/*=============================================================
 ************************** SALE ******************************
===============================================================*/
function displaySale(product){
  var list = ``;
  for(let i=0; i<product.length; i++){
    list+=`  
    <div class="col-lg-2 col-md-4 col-sm-6">
            <div class="box">
              <div class="product-sale">
                <span class="new">New</span>
                <span class="percent">-8%</span>
              </div>
              <a href="Product.html" >
                <img src="${product[i].image_url}" alt="" onclick="imagees2(${i})">
              </a>
                <h4>${product[i].title}</h4>
                <div class="product-price d-flex">
                  <span class="pe-2 span1">$${product[i].discount}</span>
                  <span class="pe-2 span2">$${product[i].price}</span>
                </div>
                <div class="add-cart">
                  <a onclick="addToCart2(${i})"> ${product[i].add_cart} </a>
                </div>
            </div>
          </div>
    `
  }
  document.getElementById("row3").innerHTML = list;
}
/*=============================================================
 ************************** BLOG ******************************
===============================================================*/
function displayBlog(product){
  var list = ``;
  for(let i=0; i<product.length; i++){
    list+=` 
    <div class="col-lg-4 col-md-6">
            <div class="box">
              <div class="image">
                <img src="${product[i].image_url}" alt="">
              </div>
              <div class="content">
                <h4>${product[i].title}</h4>
                <div class="blog-meta">
                  <span>By <a href="#">${product[i].name}</a></span>
                  <span>/ ${product[i].date}</span>
                </div>
                <p>${product[i].pragraph}</p>
                <a href="#" class="main-btn">read more</a>
              </div>
            </div>
          </div>

    `
  }
  document.getElementById("row4").innerHTML = list;
}

/*=============================================================
************************* ADD TO CART **************************
===============================================================*/
function addToCart(index){
  let foundedCart = products[index];
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
function addToCart2(index){
  // document.getElementById("soppingCount").innerHTML=cart.length;
  let foundedCart2 = sales[index]
  let choosenCart2 = cart.find((element) => element.id == foundedCart2.id)
  if(choosenCart2){
    choosenCart2.count++;
  }
  else{
    cart.push({...foundedCart2, count:1});
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
/*========================================================================
 ****************** send image page home to page product  ****************
========================================================================*/
let images=[];
function imagees1(index){
  images = products[index].image_url;
  localStorage.setItem('cartimages',images);
  }
function imagees2(index){
  images = sales[index].image_url;
  localStorage.setItem('cartimages',images);
  }


