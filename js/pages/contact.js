
// button
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
// header
let headerr = document.getElementById("header");

window.addEventListener("scroll",function(){
  if(window.scrollY >= 100){
    headerr.classList.add("header-fixed")
  }
  else{
    headerr.classList.remove("header-fixed")
  }
})